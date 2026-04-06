'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatList } from './ChatList';
import { ChatArea } from './ChatArea';
import { useMessagingWebSocket } from '../hooks/useMessagingWebSocket';
import type { Conversation, Message, User } from '../types';
import {
  getConversations,
  getMessages,
  makeConversationId,
  makeInitials,
  normalizeUser,
  saveConversations,
  saveMessages,
  upsertConversation,
} from '../storage/localMessagingStorage';

function nowTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function enrichConversation(
  conv: Conversation,
  convMessages: Message[],
  currentUserId: string,
  onlineUsers: string[],
): Conversation {
  const lastMsg = convMessages[convMessages.length - 1];
  const unreadCount = convMessages.filter(
    (m) => m.senderId !== currentUserId && !m.isRead,
  ).length;

  return {
    ...conv,
    user: {
      ...conv.user,
      isOnline: onlineUsers.includes(conv.user.id),
    },
    lastMessage: lastMsg?.text ?? '',
    lastMessageTime: lastMsg?.timestamp ?? '',
    unreadCount,
  };
}

function readQueryUser(searchParams: ReturnType<typeof useSearchParams>): User | null {
  const id = searchParams.get('userId');
  const name = searchParams.get('userName');
  if (!id || !name) return null;

  const initials = searchParams.get('userInitials') ?? makeInitials(name);
  return normalizeUser({ id, name, initials, isOnline: true });
}

function readQueryPeer(searchParams: ReturnType<typeof useSearchParams>): User | null {
  const id = searchParams.get('withId');
  const name = searchParams.get('withName');
  if (!id || !name) return null;

  const initials = searchParams.get('withInitials') ?? makeInitials(name);
  return normalizeUser({ id, name, initials, isOnline: false });
}

export function ChatLayout() {
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [isMdUp, setIsMdUp] = useState(false);

  const [baseConversations, setBaseConversations] = useState<Conversation[]>([]);
  const [messagesByConversation, setMessagesByConversation] = useState<Record<string, Message[]>>({});
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setIsMdUp(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const isChatAreaVisible = isMdUp || !isMobileListVisible;

  // Current user is provided via query params (no DB for auth yet)
  useEffect(() => {
    setCurrentUser(readQueryUser(searchParams));
  }, [searchParams]);

  const {
    isConnected,
    onlineUsers,
    discoveredUsers,
    typingUsers,
    emitMessage,
    emitTyping,
    emitReadReceipt,
  } = useMessagingWebSocket(currentUser?.id ?? '', currentUser?.name ?? '', {
    onMessageReceive: (message) => {
      if (!currentUser) return;

      const convId = message.conversationId;
      const isActiveConversation = isChatAreaVisible && selectedConvId === convId;
      setMessagesByConversation((prev) => {
        const nextList = [...(prev[convId] ?? []), {
          id: message.id,
          senderId: message.senderId,
          conversationId: convId,
          text: message.text,
          timestamp: message.timestamp,
          isRead: isActiveConversation ? true : false,
          isDelivered: true,
        } satisfies Message];

        saveMessages(currentUser.id, convId, nextList);
        return { ...prev, [convId]: nextList };
      });

      if (isActiveConversation) {
        emitReadReceipt({
          conversationId: convId,
          recipientId: message.senderId,
          messageId: message.id,
          readBy: currentUser.id,
        });
      }

      // Ensure conversation exists in local storage
      const peerUser = normalizeUser({
        id: message.senderId,
        name: message.senderName ?? message.senderId,
        initials: makeInitials(message.senderName ?? message.senderId),
        isOnline: true,
      });

      const conv: Conversation = {
        id: convId,
        user: peerUser,
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0,
      };

      const nextConvs = upsertConversation(currentUser.id, conv);
      setBaseConversations(nextConvs);
    },
    onMessageDelivered: ({ messageId, conversationId }) => {
      if (!currentUser) return;
      setMessagesByConversation((prev) => {
        const list = prev[conversationId] ?? [];
        const nextList = list.map((m) => (m.id === messageId ? { ...m, isDelivered: true } : m));
        saveMessages(currentUser.id, conversationId, nextList);
        return { ...prev, [conversationId]: nextList };
      });
    },
    onReadReceipt: ({ conversationId, messageId }) => {
      if (!currentUser) return;
      setMessagesByConversation((prev) => {
        const list = prev[conversationId] ?? [];
        const nextList = list.map((m) => (m.id === messageId ? { ...m, isRead: true } : m));
        saveMessages(currentUser.id, conversationId, nextList);
        return { ...prev, [conversationId]: nextList };
      });
    },
  });

  // Load conversations + messages from localStorage once we know current user
  useEffect(() => {
    if (!currentUser) return;

    const storedConvs = getConversations(currentUser.id);
    const nextMessagesByConv: Record<string, Message[]> = {};
    for (const conv of storedConvs) {
      nextMessagesByConv[conv.id] = getMessages(currentUser.id, conv.id);
    }

    // If URL specifies a peer, ensure a conversation exists
    const peer = readQueryPeer(searchParams);
    if (peer && peer.id !== currentUser.id) {
      const convId = makeConversationId(currentUser.id, peer.id);
      const conv: Conversation = {
        id: convId,
        user: peer,
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0,
      };

      const nextConvs = storedConvs.some((c) => c.id === convId)
        ? storedConvs.map((c) => (c.id === convId ? conv : c))
        : [conv, ...storedConvs];

      saveConversations(currentUser.id, nextConvs);
      nextMessagesByConv[convId] = nextMessagesByConv[convId] ?? getMessages(currentUser.id, convId);
      setBaseConversations(nextConvs);
      setSelectedConvId((prev) => prev ?? convId);
    } else {
      setBaseConversations(storedConvs);
      setSelectedConvId((prev) => prev ?? storedConvs[0]?.id ?? null);
    }

    setMessagesByConversation(nextMessagesByConv);
  }, [currentUser, searchParams]);

  const displayConversations = currentUser
    ? baseConversations
        .filter((c) => c.user.id !== currentUser.id)
        .map((conv) => enrichConversation(
          conv,
          messagesByConversation[conv.id] ?? [],
          currentUser.id,
          onlineUsers,
        ))
        .filter((c) => 
          !searchTerm || 
          c.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  const availableToDiscover = currentUser
    ? discoveredUsers
        .filter(u => u.id !== currentUser.id) // Not me
        .filter(u => !baseConversations.some(c => c.user.id === u.id)) // Not already in conversations
        .filter(u => !searchTerm || u.name.toLowerCase().includes(searchTerm.toLowerCase())) // Matches search
        .map(u => normalizeUser({ ...u, initials: makeInitials(u.name) }))
    : [];

  const selectedConversation = selectedConvId
    ? displayConversations.find((c) => c.id === selectedConvId) ?? displayConversations[0]
    : undefined;

  const activeMessages = currentUser && selectedConversation
    ? (messagesByConversation[selectedConversation.id] ?? [])
    : [];

  // Mark messages as read when opening a conversation and emit read receipts
  useEffect(() => {
    if (!currentUser || !selectedConversation) return;
    if (!isChatAreaVisible) return;

    const convId = selectedConversation.id;
    const existing = messagesByConversation[convId] ?? [];
    const toMark = existing.filter(
      (m) => m.senderId !== currentUser.id && !m.isRead,
    );
    if (toMark.length === 0) return;

    setMessagesByConversation((prev) => {
      const list = prev[convId] ?? [];
      const nextList = list.map((m) =>
        m.senderId !== currentUser.id && !m.isRead ? { ...m, isRead: true } : m,
      );
      saveMessages(currentUser.id, convId, nextList);
      return { ...prev, [convId]: nextList };
    });

    for (const m of toMark) {
      emitReadReceipt({
        conversationId: convId,
        recipientId: selectedConversation.user.id,
        messageId: m.id,
        readBy: currentUser.id,
      });
    }
  }, [currentUser, selectedConversation?.id, messagesByConversation, emitReadReceipt, selectedConversation]);

  const handleSendMessage = (text: string) => {
    if (!currentUser || !selectedConversation) return;

    const convId = selectedConversation.id;
    const clientMessageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const newMessage: Message = {
      id: clientMessageId,
      senderId: currentUser.id,
      conversationId: convId,
      text,
      timestamp: nowTimestamp(),
      isRead: false,
      isDelivered: false,
    };

    setMessagesByConversation((prev) => {
      const nextList = [...(prev[convId] ?? []), newMessage];
      saveMessages(currentUser.id, convId, nextList);
      return { ...prev, [convId]: nextList };
    });

    emitMessage({
      conversationId: convId,
      recipientId: selectedConversation.user.id,
      text,
      senderId: currentUser.id,
      senderName: currentUser.name,
      clientMessageId,
    });
  };

  const handleTyping = (isTyping: boolean) => {
    if (!currentUser || !selectedConversation) return;
    emitTyping({
      conversationId: selectedConversation.id,
      recipientId: selectedConversation.user.id,
      userId: currentUser.id,
      userName: currentUser.name,
      isTyping,
    });
  };

  const handleSelectUser = (user: User) => {
    if (!currentUser) return;
    
    const convId = makeConversationId(currentUser.id, user.id);
    const conv: Conversation = {
      id: convId,
      user,
      lastMessage: '',
      lastMessageTime: '',
      unreadCount: 0,
    };

    const nextConvs = upsertConversation(currentUser.id, conv);
    setBaseConversations(nextConvs);
    setSelectedConvId(convId);
    setSearchTerm(''); // Clear search after selection
    setIsMobileListVisible(false);
  };

  return (
    <div className="flex h-full w-full bg-transparent overflow-hidden font-sans">
      <div className={`h-full w-full md:w-75 shrink-0 ${isMobileListVisible ? 'block' : 'hidden md:block'}`}> 
        <ChatList
          conversations={displayConversations}
          onSelectConversation={(id) => {
            setSelectedConvId(id);
            setIsMobileListVisible(false);
          }}
          selectedId={selectedConvId ?? undefined}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          discoveredUsers={availableToDiscover}
          onSelectUser={handleSelectUser}
        />
      </div>
      <div className={`flex-1 h-full min-h-0 min-w-0 ${!isMobileListVisible ? 'block' : 'hidden md:block'}`}>
        {currentUser && selectedConversation ? (
          <ChatArea
            conversation={selectedConversation}
            messages={activeMessages}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            typingUserName={typingUsers.get(selectedConversation.id) ?? null}
            onBack={() => setIsMobileListVisible(true)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center h-full text-[#73737a] bg-[#131316]">
            {!currentUser ? (
              <div className="max-w-130 px-6 text-center space-y-2">
                <div className="text-white text-[16px] font-medium">Messaging needs a user in the URL</div>
                <div className="text-[#73737a] text-[13px] leading-relaxed">
                  Open this page with query params like:
                  <div className="mt-2 text-[12px] text-[#a1a1aa] break-all">
                    ?userId=me&userName=Vikram%20Singh&withId=user_ar&withName=Arjun%20Reddy
                  </div>
                </div>
                <div className="text-[#73737a] text-[12px]">Socket: {isConnected ? 'connected' : 'disconnected'}</div>
              </div>
            ) : displayConversations.length === 0 ? (
              <div className="max-w-130 px-6 text-center space-y-2">
                <div className="text-white text-[16px] font-medium">No conversations yet</div>
                <div className="text-[#73737a] text-[13px] leading-relaxed">
                  Start one by providing <span className="text-[#a1a1aa]">withId</span> and <span className="text-[#a1a1aa]">withName</span> in the URL.
                </div>
                <div className="text-[#73737a] text-[12px]">Socket: {isConnected ? 'connected' : 'disconnected'}</div>
              </div>
            ) : (
              'Select a conversation to start messaging'
            )}
          </div>
        )}
      </div>
    </div>
  );
}
