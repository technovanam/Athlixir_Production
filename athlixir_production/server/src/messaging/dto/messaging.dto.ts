// DTOs for WebSocket messaging events
// No database storage — messages are relayed in real-time only

export interface JoinPayload {
  userId: string;
  userName: string;
}

export interface SendMessagePayload {
  conversationId: string;
  recipientId: string;
  text: string;
  senderId: string;
  senderName: string;
  clientMessageId: string;
}

export interface MessageDelivered {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface TypingPayload {
  conversationId: string;
  recipientId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface ReadReceiptPayload {
  conversationId: string;
  recipientId: string;
  messageId: string;
  readBy: string;
}

export interface UserStatusPayload {
  userId: string;
  userName: string;
  isOnline: boolean;
}
