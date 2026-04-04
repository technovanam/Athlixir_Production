import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';

interface UseMessagingWebSocketOptions {
  onMessageReceive?: (message: {
    id: string;
    senderId: string;
    senderName?: string;
    conversationId: string;
    text: string;
    timestamp: string;
  }) => void;
  onMessageDelivered?: (payload: { messageId: string; conversationId: string }) => void;
  onMessageOffline?: (payload: { conversationId: string; recipientId: string; messageId: string }) => void;
  onReadReceipt?: (payload: { conversationId: string; messageId: string; readBy: string }) => void;
  onDiscoverList?: (users: { id: string; name: string; isOnline: boolean }[]) => void;
}

interface UseMessagingWebSocketReturn {
  isConnected: boolean;
  onlineUsers: string[];
  discoveredUsers: { id: string; name: string; isOnline: boolean }[];
  typingUsers: Map<string, string>; // conversationId -> userName
  emitMessage: (payload: {
    conversationId: string;
    recipientId: string;
    text: string;
    senderId: string;
    senderName: string;
    clientMessageId: string;
  }) => void;
  emitTyping: (payload: {
    conversationId: string;
    recipientId: string;
    userId: string;
    userName: string;
    isTyping: boolean;
  }) => void;
  emitReadReceipt: (payload: {
    conversationId: string;
    recipientId: string;
    messageId: string;
    readBy: string;
  }) => void;
}

export function useMessagingWebSocket(
  userId: string,
  userName: string,
  options: UseMessagingWebSocketOptions = {}
): UseMessagingWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [discoveredUsers, setDiscoveredUsers] = useState<{ id: string; name: string; isOnline: boolean }[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
  const socketRef = useRef<Socket | null>(null);
  const optionsRef = useRef<UseMessagingWebSocketOptions>(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!userId || !userName) {
      return;
    }
    // Connect to the NestJS WebSocket server
    const socket = io(`${SOCKET_URL}/messaging`, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    // ─── Connection Events ───────────────────────
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Connected to messaging server');

      // Register this athlete with the server
      socket.emit('user:join', { userId, userName });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Disconnected from messaging server');
    });

    socket.on('connect_error', (err) => {
      console.log('⚠️ Connection error:', err.message);
      setIsConnected(false);
    });

    // ─── Message Events ──────────────────────────

    socket.on('message:receive', (message: any) => {
      optionsRef.current.onMessageReceive?.(message);
    });

    socket.on('message:delivered', (payload: any) => {
      optionsRef.current.onMessageDelivered?.(payload);
    });

    socket.on('message:offline', (payload: any) => {
      optionsRef.current.onMessageOffline?.(payload);
    });

    socket.on('message:read-receipt', (payload: any) => {
      optionsRef.current.onReadReceipt?.(payload);
    });

    // ─── User Status Events ──────────────────────

    socket.on('user:online-list', (userIds: string[]) => {
      setOnlineUsers(userIds);
    });
    
    socket.on('user:discover-list', (users: { id: string; name: string; isOnline: boolean }[]) => {
      setDiscoveredUsers(users);
      optionsRef.current.onDiscoverList?.(users);
    });

    socket.on('user:status', ({ userId: uid, isOnline }: any) => {
      setOnlineUsers((prev) =>
        isOnline
          ? [...new Set([...prev, uid])]
          : prev.filter((id) => id !== uid)
      );
    });

    // ─── Typing Events ──────────────────────────

    socket.on('typing:status', ({ conversationId, userName: name, isTyping }: any) => {
      setTypingUsers((prev) => {
        const next = new Map(prev);
        if (isTyping) {
          next.set(conversationId, name);
        } else {
          next.delete(conversationId);
        }
        return next;
      });
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, userName]);

  const emitMessage = useCallback(
    (payload: {
      conversationId: string;
      recipientId: string;
      text: string;
      senderId: string;
      senderName: string;
      clientMessageId: string;
    }) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit('message:send', payload);
      }
    },
    [],
  );

  const emitTyping = useCallback(
    (payload: {
      conversationId: string;
      recipientId: string;
      userId: string;
      userName: string;
      isTyping: boolean;
    }) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit('typing:update', payload);
      }
    },
    [],
  );

  const emitReadReceipt = useCallback(
    (payload: {
      conversationId: string;
      recipientId: string;
      messageId: string;
      readBy: string;
    }) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit('message:read', payload);
      }
    },
    [],
  );

  return { isConnected, onlineUsers, discoveredUsers, typingUsers, emitMessage, emitTyping, emitReadReceipt };
}
