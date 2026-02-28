"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ChatProvider } from "@/context/ChatContext";

const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
    ssr: false,
});

export default function ClientWrapper({ children }) {
    return (
        <ChatProvider>
            <Navbar />
            <main className="relative z-10">{children}</main>
            <ChatWidget />
            <Footer />
        </ChatProvider>
    );
}
