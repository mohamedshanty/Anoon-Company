'use client';

import React from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useChat } from '@/context/ChatContext';
import { useTranslation } from "react-i18next";
import { cn } from '@/lib/utils';

const ChatWidget = () => {
  const { t, i18n } = useTranslation();
  const { isOpen, toggleChat, closeChat } = useChat();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={cn(
      "fixed bottom-6 z-50 flex flex-col items-end gap-4 overflow-visible transition-all duration-300",
      isRTL ? "left-6" : "right-6"
    )}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2 animate-in fade-in slide-in-from-bottom-10 zoom-in duration-300">
          <ChatWindow onClose={closeChat} />
        </div>
      )}

      {/* Floating Button with Modern Design */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="group relative z-50 cursor-pointer"
      >
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full bg-brand-orange/30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-brand-orange/20 animate-pulse"></div>

        {/* Main button */}
        <div className={cn(
          "relative bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300",
          isOpen ? "rotate-90 scale-110" : "hover:scale-110 active:scale-95"
        )}>
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {isOpen ? (
            <X size={28} className="relative z-10 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
          ) : (
            <div className="relative">
              <MessageCircle size={28} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          )}
        </div>

        {/* Tooltip on hover (when closed) */}
        {!isOpen && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[60]",
            isRTL ? "left-full ml-4" : "right-full mr-4"
          )}>
            <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm py-2.5 px-5 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-white/10">
              <Sparkles size={16} className="text-yellow-400 shrink-0" />
              <span className="font-medium tracking-wide">{t("chatbot.tooltip")}</span>

              {/* Tooltip arrow */}
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45",
                isRTL ? "-left-[6px]" : "-right-[6px]"
              )}></div>
            </div>
          </div>
        )}
      </button>

    </div>
  );
};

export default ChatWidget;