'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Phone, Video, MoreVertical, Paperclip, Image as ImageIcon, Smile, Send, ArrowLeft } from 'lucide-react';
import { Conversation, Message, User } from '../types';

interface ChatAreaProps {
  conversation: Conversation;
  messages: Message[];
  currentUser: User;
  onSendMessage: (text: string) => void;
  onTyping?: (isTyping: boolean) => void;
  typingUserName?: string | null;
  onBack?: () => void;
}

export function ChatArea({ conversation, messages, currentUser, onSendMessage, onTyping, typingUserName, onBack }: ChatAreaProps) {
  const [inputText, setInputText] = useState('');
  const typingTimeoutRef = useRef<number | null>(null);
  const isTypingRef = useRef(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
    if (isTypingRef.current) {
      isTypingRef.current = false;
      onTyping?.(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (value: string) => {
    setInputText(value);

    if (!onTyping) return;

    const hasText = value.trim().length > 0;
    if (hasText && !isTypingRef.current) {
      isTypingRef.current = true;
      onTyping(true);
    }

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        onTyping(false);
      }
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#131316] min-h-0 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#0d0d0f] border-b border-[#1a1a1c] h-19 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          {onBack && (
            <button onClick={onBack} className="md:hidden p-1.5 -ml-1 hover:bg-[#1a1a1c] rounded-full transition-colors text-[#5c5c63] hover:text-white">
              <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
          )}
          <div className="relative shrink-0">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium text-[#f25c2d] bg-[#2e1208]"
            >
              {conversation.user.initials}
            </div>
            {conversation.user.isOnline && (
              <div className="absolute bottom-0 -right-0.5 w-3 h-3 bg-[#00c853] border-2 border-[#0d0d0f] rounded-full"></div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-white text-[15px] font-medium leading-snug">
              {conversation.user.name}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[#5c6b7a] text-[12px] font-medium">
                {conversation.user.isOnline ? 'Online' : 'Offline'}
                {conversation.user.role && ` • ${conversation.user.role}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-5 text-[#8c8c93]">
          <button className="hover:text-white transition-colors">
            <Phone className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="hover:text-white transition-colors">
            <Video className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="hover:text-white transition-colors ml-0 md:ml-1 hidden sm:block">
            <MoreVertical className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 custom-scrollbar" 
        data-lenis-prevent="true"
      >
        <div className="flex justify-center mt-1 mb-1">
          <div className="bg-[#1a1a1c] text-[#5c5c63] text-[10px] font-medium px-3 py-1 rounded-full">
            Messages are end-to-end encrypted
          </div>
        </div>
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div 
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                  isMe 
                    ? 'bg-[#f25c2d] text-white rounded-br-sm' 
                    : 'bg-[#1e1e24] text-[#e0e0e0] rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                <span className="text-[#5c5c63] text-[9px] font-medium">{msg.timestamp}</span>
                {isMe && (
                  msg.isRead ? (
                    <div className="flex items-center">
                      <svg className="w-4 h-3 text-[#f25c2d]" fill="none" viewBox="0 0 24 16" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 9l4 4L15 3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 9l4 4L21 3" />
                      </svg>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator bubble (receiver side) */}
        {typingUserName ? (
          <div className="flex flex-col items-start">
            <div
              className="max-w-[75%] rounded-2xl px-3.5 py-2 shadow-sm bg-[#1e1e24] text-[#e0e0e0] rounded-tl-sm"
              aria-label="Typing"
              title="Typing"
            >
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#73737a] rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-[#73737a] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-[#73737a] rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 bg-[#131316] shrink-0">
        <div className="flex items-center gap-2 md:gap-3 bg-[#1e1e24] rounded-2xl p-2 px-3 md:px-4 shadow-lg border border-[#2a2a2e] focus-within:border-[#3a3a3e] transition-colors">
          <div className="flex items-center gap-1 md:gap-2 text-[#73737a]">
            <button className="p-1.5 md:p-2 hover:bg-[#2a2a2e] rounded-full transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-1.5 md:p-2 hover:bg-[#2a2a2e] rounded-full transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-1.5 md:p-2 hover:bg-[#2a2a2e] rounded-full transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 min-w-0 bg-transparent border-none focus:outline-none text-[#e0e0e0] placeholder:text-[#5c5c63] text-[14px] md:text-[15px]"
          />

          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-2 md:p-2.5 bg-[#f25c2d] hover:bg-[#e05023] disabled:bg-[#f25c2d]/50 disabled:cursor-not-allowed rounded-xl text-white transition-colors shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
