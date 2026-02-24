import { Alexandria } from "next/font/google";
import "./globals.css";
import { PREMIUM_GRADIENT } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { I18nProvider } from "./providers";
import "../i18n";

const alexandria = Alexandria({
  subsets: ["latin", "arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata = {
  title: "annon",
  description: "Welcome to annon, a simple and anonymous pastebin service.",
};

export default function RootLayout({ children }) {
  const backgroundStyle = {
    background: `
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
        className={`${alexandria.variable} antialiased`}
        style={backgroundStyle}
      >
        <I18nProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
