import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  JoinPayload,
  SendMessagePayload,
  MessageDelivered,
  TypingPayload,
  ReadReceiptPayload,
} from './dto/messaging.dto';

/**
 * MessagingGateway — Real-time WebSocket relay for athlete-to-athlete messaging
 *
 * Architecture: RELAY ONLY (no database storage)
 * - Messages are forwarded from sender → recipient in real-time
 * - If recipient is offline, the message is lost (no persistence)
 * - Chat history is stored client-side (IndexedDB/localStorage)
 * - This ensures full privacy — the server never stores message content
 */
@WebSocketGateway({
  namespace: '/messaging',
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Maps userId → socketId for routing messages to specific athletes
  private onlineUsers = new Map<string, string>();
  // Maps socketId → userId for cleanup on disconnect
  private socketToUser = new Map<string, string>();
  // Maps userId → userName (Persistent registry for discovery while server is running)
  private allRegisteredUsers = new Map<string, string>();

  // ─── CONNECTION LIFECYCLE ────────────────────────────────────

  handleConnection(client: Socket) {
    console.log(`🔌 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = this.socketToUser.get(client.id);
    if (userId) {
      this.onlineUsers.delete(userId);
      this.socketToUser.delete(client.id);

      // Broadcast that this user went offline
      this.server.emit('user:status', {
        userId,
        isOnline: false,
      });

      console.log(`❌ User disconnected: ${userId} (${client.id})`);
    }
  }

  // ─── EVENT: JOIN ─────────────────────────────────────────────
  // Athlete registers themselves when they open the messaging page

  @SubscribeMessage('user:join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinPayload,
  ) {
    const { userId, userName } = payload;

    // Register this user's socket
    this.onlineUsers.set(userId, client.id);
    this.socketToUser.set(client.id, userId);
    
    // Add to persistent registry for discovery (survives while server is running)
    if (userName) {
      this.allRegisteredUsers.set(userId, userName);
    }

    // Broadcast user online status to everyone
    this.server.emit('user:status', {
      userId,
      userName,
      isOnline: true,
    });

    // Send the current online users list back to the joining user
    const onlineUserIds = Array.from(this.onlineUsers.keys());
    client.emit('user:online-list', onlineUserIds);

    // Send the list of ALL registered users for discovery
    const discoveryList = Array.from(this.allRegisteredUsers.entries()).map(([id, name]) => ({
      id,
      name,
      isOnline: this.onlineUsers.has(id)
    }));
    client.emit('user:discover-list', discoveryList);

    console.log(`✅ User joined: ${userName} (${userId}) → socket ${client.id}`);
    console.log(`📊 Total Registered: ${this.allRegisteredUsers.size} | Online: ${onlineUserIds.length}`);
  }

  // ─── EVENT: SEND MESSAGE ────────────────────────────────────
  // Relay a message from sender to recipient — NO DATABASE STORAGE

  @SubscribeMessage('message:send')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessagePayload,
  ) {
    const { conversationId, recipientId, text, senderId, senderName, clientMessageId } = payload;

    // Create the message object to deliver
    const message: MessageDelivered = {
      id: clientMessageId,
      conversationId,
      senderId,
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Find recipient's socket
    const recipientSocketId = this.onlineUsers.get(recipientId);

    if (recipientSocketId) {
      // Recipient is online — relay the message directly
      this.server.to(recipientSocketId).emit('message:receive', message);
      // Confirm delivery to sender
      client.emit('message:delivered', { messageId: message.id, conversationId });
      console.log(`💬 ${senderName} → ${recipientId}: "${text.substring(0, 30)}..."`);
    } else {
      // Recipient is offline — notify sender
      client.emit('message:offline', {
        conversationId,
        recipientId,
        messageId: message.id,
      });
      console.log(`⚠️ ${recipientId} is offline. Message not delivered.`);
    }
  }

  // ─── EVENT: TYPING INDICATOR ────────────────────────────────
  // Show "typing..." when an athlete is composing a message

  @SubscribeMessage('typing:update')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    const { conversationId, recipientId, userId, userName, isTyping } = payload;

    const recipientSocketId = this.onlineUsers.get(recipientId);
    if (!recipientSocketId) return;

    this.server.to(recipientSocketId).emit('typing:status', {
      conversationId,
      userId,
      userName,
      isTyping,
    });
  }

  // ─── EVENT: READ RECEIPT ────────────────────────────────────
  // Notify the sender that their message was read (double blue tick)

  @SubscribeMessage('message:read')
  handleReadReceipt(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: ReadReceiptPayload,
  ) {
    const { conversationId, recipientId, messageId, readBy } = payload;

    const recipientSocketId = this.onlineUsers.get(recipientId);
    if (!recipientSocketId) return;

    this.server.to(recipientSocketId).emit('message:read-receipt', {
      conversationId,
      messageId,
      readBy,
    });
  }
}
