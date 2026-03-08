"use client";

import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // Pending message to auto-send when chat opens
  const [pendingMessage, setPendingMessage] = useState(null);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  // Open chat and queue a message to be sent automatically
  const openChatWithMessage = (message) => {
    setPendingMessage(message);
    setIsOpen(true);
  };

  const clearPendingMessage = () => setPendingMessage(null);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        toggleChat,
        openChatWithMessage,
        pendingMessage,
        clearPendingMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
