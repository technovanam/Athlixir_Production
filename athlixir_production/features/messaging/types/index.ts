export interface User {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  avatarBg?: string;
  role?: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  conversationId: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
  isDelivered?: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isSelected?: boolean;
}
