'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, X, Loader2, MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('chatbot.welcome'), id: 'welcome' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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

  const isRTL = i18n.language === 'ar';

  return (
    <div
      className="flex flex-col h-[500px] w-[350px] md:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="bg-brand-blue p-4 flex justify-between items-center text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold opacity-100 m-0 leading-none">
              {t('chatbot.title')}
            </h3>
            <span className="text-[10px] opacity-80 flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.content}
            isUser={msg.role === 'user'}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-100 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chatbot.placeholder')}
          className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-orange/20 focus:bg-white transition-all outline-none text-gray-800"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-brand-orange text-white p-2 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-orange/20 flex items-center justify-center cursor-pointer"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} className={isRTL ? 'rotate-180' : ''} />
          )}
        </button>
      </form>
      
      {/* Footer Branding */}
      <div className="px-4 py-2 bg-white border-t border-gray-50 text-[10px] text-center text-gray-400">
        Powered by Anoon AI
      </div>
    </div>
  );
};

export default ChatWindow;
