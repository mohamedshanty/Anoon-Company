import "./globals.css";
import { Alexandria } from "next/font/google";
import { PREMIUM_GRADIENT } from "@/lib/constants";
import { ChatProvider } from "@/context/ChatContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProviders } from "./providers";
import "../i18n";
import ChatWidgetClient from "@/components/chat/ChatWidgetClient";

// Only load font weights that are actually used — eliminates ~60% of font data
const alexandria = Alexandria({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-alexandria",
  preload: true,
});

export const metadata = {
  title: "Anoon Solutions",
  description:
    "Welcome to Anoon Solutions, a simple and anonymous pastebin service.",
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
    <html lang="en" dir="ltr" className={alexandria.variable}>
      <head>
        {/* Preload the LCP image — pattern background */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fpattern-v2.webp&w=750&q=50"
          fetchPriority="high"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body
        className={`${alexandria.className} antialiased overflow-x-hidden`}
        style={backgroundStyle}
      >
        <AppProviders>
          <ChatProvider>
            <Navbar />
            <main className="relative z-10">{children}</main>
            <ChatWidgetClient />
            <Footer />
          </ChatProvider>
        </AppProviders>
      </body>
    </html>
  );
}
