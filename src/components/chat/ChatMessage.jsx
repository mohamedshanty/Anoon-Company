import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const ChatMessage = ({ message, isUser }) => {
    const { t } = useTranslation();

    return (
        <div
            className={cn(
                'mb-4 flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300',
                isUser ? 'justify-end' : 'justify-start'
            )}
        >
            {/* Avatar for assistant */}
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue/80 flex items-center justify-center text-white text-[10px] font-bold shadow-md mr-2 flex-shrink-0">
                    {t('chatbot.assistant')}
                </div>
            )}

            <div
                className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base shadow-sm transition-all duration-300 hover:shadow-md',
                    isUser
                        ? 'bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                )}
            >
                <p className="whitespace-pre-wrap leading-relaxed">{message}</p>

                {/* Timestamp (optional) */}
                <span className={cn(
                    'text-[10px] mt-1 block opacity-70',
                    isUser ? 'text-white/70' : 'text-gray-400'
                )}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {/* Avatar for user */}
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-[10px] font-bold shadow-md ml-2 flex-shrink-0">
                    {t('chatbot.user')}
                </div>
            )}
        </div>
    );
};

export default ChatMessage;