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
  title: "Anoon Solutions",
  description: "Welcome to Anoon Solutions, a simple and anonymous pastebin service.",
  icons: {
    icon: [
      {
        url: "/images/logo1.png",
        sizes: "32x32",  
        type: "image/png",
      },
      {
        url: "/images/logo1.png",  
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/logo1.png",
        sizes: "180x180",  
        type: "image/png",
      },
    ],
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
      <body className="antialiased overflow-x-hidden" style={backgroundStyle}>
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