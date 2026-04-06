import type { Conversation, Message, User } from '../types';

const STORAGE_PREFIX = 'athlixir.messaging';
const VERSION = 'v1';

function key(...parts: string[]) {
  return `${STORAGE_PREFIX}.${VERSION}.${parts.join('.')}`;
}

function safeParseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function makeInitials(name: string): string {
  const words = name
    .split(' ')
    .map((w) => w.trim())
    .filter(Boolean);

  if (words.length === 0) return 'U';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function normalizeUser(input: Partial<User> & { id: string; name: string }): User {
  return {
    id: input.id,
    name: input.name,
    initials: input.initials ?? makeInitials(input.name),
    role: input.role,
    isOnline: input.isOnline ?? false,
    avatar: input.avatar,
    avatarBg: input.avatarBg,
  };
}

export function getConversations(userId: string): Conversation[] {
  if (typeof window === 'undefined') return [];
  return safeParseJson<Conversation[]>(
    window.localStorage.getItem(key('conversations', userId)),
    [],
  );
}

export function saveConversations(userId: string, conversations: Conversation[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    key('conversations', userId),
    JSON.stringify(conversations),
  );
}

export function getMessages(userId: string, conversationId: string): Message[] {
  if (typeof window === 'undefined') return [];
  return safeParseJson<Message[]>(
    window.localStorage.getItem(key('messages', userId, conversationId)),
    [],
  );
}

export function saveMessages(userId: string, conversationId: string, messages: Message[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    key('messages', userId, conversationId),
    JSON.stringify(messages),
  );
}

export function upsertConversation(userId: string, conversation: Conversation): Conversation[] {
  const prev = getConversations(userId);
  const next = prev.some((c) => c.id === conversation.id)
    ? prev.map((c) => (c.id === conversation.id ? conversation : c))
    : [conversation, ...prev];

  saveConversations(userId, next);
  return next;
}

export function makeConversationId(a: string, b: string): string {
  const [x, y] = [a, b].sort();
  return `conv_${x}_${y}`;
}
