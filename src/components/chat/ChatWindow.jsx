'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, X, Loader2, MessageSquare, Sparkles, Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { cn } from '@/lib/utils';

const ChatWindow = ({ onClose }) => {
  const { t, i18n, ready } = useTranslation('common');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Set initial message only when translation is ready
  useEffect(() => {
    if (ready && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('chatbot.welcome'), id: 'welcome' }]);
    }
  }, [ready, t]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Focus input when chat opens
    inputRef.current?.focus();
  }, []);

  // Update welcome message if language changes
  useEffect(() => {
    if (ready && messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([{ role: 'assistant', content: t('chatbot.welcome'), id: 'welcome' }]);
    }
  }, [i18n.language, t, ready]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input, id: Date.now().toString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message, id: Date.now().toString() },
      ]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: t('chatbot.error'),
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div
      className={cn(
        "flex flex-col h-[70vh] max-h-[600px] w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-10 backdrop-blur-lg",
        isRTL ? "font-alexandria" : ""
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-blue/95 to-brand-blue/90 p-5 flex justify-between items-center text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold opacity-100 m-0 leading-none">
                {t('chatbot.title')}
              </h3>
              <Sparkles size={14} className="text-yellow-300" />
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs opacity-90">{t('chatbot.status')}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="hover:bg-white/10 p-2 rounded-xl transition-all duration-200 cursor-pointer group relative z-10"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      {/* Messages Area with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50/80 to-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg.content}
            isUser={msg.role === 'user'}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue/80 flex items-center justify-center text-white text-xs font-bold shadow-md">
                AI
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-brand-orange/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-brand-orange/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-brand-orange/60 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area with Modern Design */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-200/50"
      >
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chatbot.placeholder')}
              rows="1"
              className="w-full bg-gray-100/80 border-2 border-transparent rounded-2xl px-5 py-3.5 text-sm focus:ring-0 focus:border-brand-orange/30 focus:bg-white transition-all outline-none text-gray-800 resize-none max-h-32 placeholder-gray-400"
              style={{ minHeight: '48px' }}
            />
            {/* Character count (optional) */}
            {input.length > 0 && (
              <span className="absolute right-3 bottom-2 text-[10px] text-gray-400">
                {input.length}/500
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white p-4 rounded-2xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/30 flex items-center justify-center group relative overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} className={cn(
                "group-hover:scale-110 transition-transform duration-200",
                isRTL ? 'rotate-180' : ''
              )} />
            )}
          </button>
        </div>

        {/* Quick actions suggestion */}
        {messages.length === 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              type="button"
              onClick={() => setInput(t("chatbot.actions.services"))}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
            >
              {t("chatbot.labels.services")}
            </button>
            <button
              type="button"
              onClick={() => setInput(t("chatbot.actions.contact"))}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
            >
              {t("chatbot.labels.contact")}
            </button>
            <button
              type="button"
              onClick={() => setInput(t("chatbot.actions.pricing"))}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
            >
              {t("chatbot.labels.pricing")}
            </button>
          </div>
        )}
      </form>

      {/* Footer with subtle branding */}
      <div className="px-5 py-2.5 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200/30 text-[10px] text-center text-gray-400 flex items-center justify-center gap-1.5">
        <span>⚡</span>
        <span>Powered by</span>
        <span className="font-semibold text-brand-blue/70">Anoon AI</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span className="text-gray-300">v2.0</span>
      </div>
    </div>
  );
};

export default ChatWindow;