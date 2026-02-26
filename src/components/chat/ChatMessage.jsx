import React from 'react';
import { cn } from '@/lib/utils';

const ChatMessage = ({ message, isUser }) => {
    return (
        <div
            className={cn(
                'mb-4 flex w-full',
                isUser ? 'justify-end' : 'justify-start'
            )}
        >
            <div
                className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2 text-sm md:text-base shadow-sm transition-all duration-300',
                    isUser
                        ? 'bg-brand-orange text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                )}
            >
                <p className="whitespace-pre-wrap leading-relaxed">{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
