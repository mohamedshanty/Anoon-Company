"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import Stars from "@/components/ui/Stars";
import { MoveLeft, Home } from "lucide-react";
import { useRTL } from "@/hooks/useRTL";

export default function NotFound() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6 gap-y-6"
      dir={dir}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-brand-sky/10 blur-[120px] rounded-full animate-float opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-brand-orange/10 blur-[100px] rounded-full animate-float-reverse opacity-50" />
        <Stars count={30} opacity={0.6} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none select-none tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky via-white to-brand-orange animate-pulse">
            404
          </span>
        </h1>

        {/* Glitch Effect Content */}
        <div className="mt-[-2rem] mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("errors.404.title", "Lost in the Digital Void?")}
          </h2>
          <p className="text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
            {t(
              "errors.404.description",
              "The page you're looking for has vanished into thin air. Don't worry, even the best astronauts get lost sometimes.",
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/">
            <Button
              variant="filled"
              color="sky"
              className="px-8 py-4 text-lg rounded-2xl group"
            >
              <Home
                className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"} transition-transform group-hover:scale-110`}
              />
              {t("errors.404.back_home", "Back to Base")}
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors py-3 px-6 group"
          >
            <MoveLeft
              className={`w-5 h-5 ${isRTL ? "rotate-180 order-last" : "group-hover:-translate-x-1"} transition-transform`}
            />
            <span className="text-lg font-medium">
              {t("errors.404.previous_page", "Go Back")}
            </span>
          </button>
        </div>
      </div>

      {/* Futuristic Accents */}
      <div className="absolute border border-white/5 rounded-full w-[80vw] h-[80vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute border border-white/5 rounded-full w-[60vw] h-[60vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
