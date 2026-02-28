import "./globals.css";
import { PREMIUM_GRADIENT } from "@/lib/constants";
import { ChatProvider } from "@/context/ChatContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { I18nProvider } from "./providers";
import "../i18n";
import ChatWidgetClient from "@/components/chat/ChatWidgetClient";

// Custom font variable for fallback
const alexandria = {
  variable: "font-alexandria",
};

export const metadata = {
  title: "Anoon",
  description: "Welcome to Anoon, a simple and anonymous pastebin service.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  const backgroundStyle = {
    backgroundImage: `
    ${PREMIUM_GRADIENT},
    repeating-linear-gradient(45deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 2px)
  `,
    backgroundBlendMode: "overlay",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <html lang="en" dir="ltr">
      <body
        className="antialiased overflow-x-hidden"
        style={backgroundStyle}
      >
        <I18nProvider>
          <ChatProvider>
            <Navbar />
            <main className="relative z-10">{children}</main>
            <ChatWidgetClient />
            <Footer />
          </ChatProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
