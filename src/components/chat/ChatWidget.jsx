'use client';

import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useChat } from '@/context/ChatContext';

const ChatWidget = () => {
  const { isOpen, toggleChat, closeChat } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4 overflow-visible">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2">
          <ChatWindow onClose={closeChat} />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-brand-orange text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group relative z-[1000] cursor-pointer"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        {isOpen ? (
          <X size={28} className="transition-transform duration-300 rotate-0" />
        ) : (
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Optional: Tooltip or welcome bubble here if needed */}
    </div>
  );
};

export default ChatWidget;
