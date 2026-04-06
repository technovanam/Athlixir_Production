'use client';

import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Conversation, User } from '../types';

interface ChatListProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
  selectedId?: string;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  discoveredUsers?: User[];
  onSelectUser: (user: User) => void;
}

export function ChatList({ 
  conversations, 
  onSelectConversation, 
  selectedId,
  searchTerm,
  onSearchChange,
  discoveredUsers = [],
  onSelectUser
}: ChatListProps) {
  const totalNew = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d0f] border-r border-[#1a1a1c]">
      {/* Header */}
      <div className="p-4 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#f25c2d]" />
          <h1 className="text-white text-xl font-bold tracking-tight bg-clip-text">Messages</h1>
        </div>
        {totalNew > 0 && (
          <span className="text-[#f25c2d] text-xs font-medium px-2 py-0.5 rounded-full bg-[#351c14]">
            {totalNew} new
          </span>
        )}
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative flex items-center w-full h-10 rounded-xl bg-[#1a1a1c] overflow-hidden border border-transparent focus-within:border-[#2a2a2e] transition-colors">
          <div className="pl-3 pr-2 flex items-center justify-center">
            <Search className="w-4 h-4 text-[#73737a]" />
          </div>
          <input
            type="text"
            placeholder="Search athletes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 h-full bg-transparent text-[#e0e0e0] text-sm placeholder:text-[#5c5c63] focus:outline-none"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto mt-2 custom-scrollbar">
        {conversations.length > 0 && (
          <>
            {searchTerm && <div className="px-4 py-2 text-[11px] font-bold text-[#5c5c63] uppercase tracking-wider">Conversations</div>}
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedId;
              
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`group relative flex items-center justify-between p-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#1a1a1c] border-l-[3px] border-l-[#f25c2d]' : 'bg-[#0d0d0f] hover:bg-[#1a1a1c] border-l-[3px] border-l-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors ${
                          isSelected ? 'text-white bg-[#f25c2d]' : 'text-[#a1a1aa] bg-[#2a2a2e]'
                        }`}
                      >
                        {conv.user.initials}
                      </div>
                      {conv.user.isOnline && (
                        <div className={`absolute -bottom-0 -right-0.5 w-[12px] h-[12px] bg-[#00c853] border-[2px] rounded-full transition-colors ${
                          isSelected ? 'border-[#1a1a1c]' : 'border-[#0d0d0f] group-hover:border-[#1a1a1c]'
                        }`}></div>
                      )}
                    </div>
    
                    {/* Info */}
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-white text-[14px] font-medium truncate leading-tight mt-0.5">
                        {conv.user.name}
                      </span>
                      <span className={`text-[12px] truncate leading-tight mt-1 ${isSelected ? 'text-[#6e7681]' : 'text-[#5c5c63]'}`}>
                        {conv.lastMessage}
                      </span>
                    </div>
                  </div>
    
                  {/* Meta */}
                  <div className="flex flex-col items-end flex-shrink-0 ml-3">
                    <span className={`text-[10px] font-medium leading-tight mb-1.5 ${isSelected ? 'text-[#6e7681]' : 'text-[#5c5c63]'}`}>
                      {conv.lastMessageTime}
                    </span>
                    {conv.unreadCount > 0 && (
                      <div className="w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#f25c2d]">
                        <span className="text-white text-[10px] font-bold leading-none">
                          {conv.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Global Discovery Results */}
        {searchTerm && discoveredUsers.length > 0 && (
          <div className="mt-4">
            <div className="px-4 py-2 text-[11px] font-bold text-[#5c5c63] uppercase tracking-wider">Discover Athletes</div>
            {discoveredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="group relative flex items-center gap-3 p-3 cursor-pointer hover:bg-[#1a1a1c] transition-colors"
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium text-[#a1a1aa] bg-[#2a2a2e]">
                    {user.initials}
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-0 -right-0.5 w-[12px] h-[12px] bg-[#00c853] border-[2px] border-[#0d0d0f] group-hover:border-[#1a1a1c] rounded-full transition-colors"></div>
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-white text-[14px] font-medium truncate leading-tight mt-0.5">
                    {user.name}
                  </span>
                  <span className="text-[12px] text-primary font-medium tracking-tight">Start Conversation</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchTerm && conversations.length === 0 && discoveredUsers.length === 0 && (
          <div className="p-10 text-center">
            <div className="text-[#5c5c63] text-sm">No athletes found matching &quot;{searchTerm}&quot;</div>
          </div>
        )}
      </div>
    </div>
  );
}
