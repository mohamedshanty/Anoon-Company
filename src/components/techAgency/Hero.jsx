"use client";

import HeroSection, {
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
} from "@/components/common/HeroSection";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { useChat } from "@/context/ChatContext";
import { Bot, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function TechAgencyHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { openChatWithMessage } = useChat();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    openChatWithMessage(trimmed);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestions = [
    isRTL
      ? "ما هي الخدمات التي تقدمها؟"
      : t("tech_agency.hero.suggestion1", "What services do you offer?"),
    isRTL
      ? "كيف يمكنني التواصل معكم؟"
      : t("tech_agency.hero.suggestion2", "How can I contact you?"),
    isRTL
      ? "أخبرني عن الأسعار"
      : t("tech_agency.hero.suggestion3", "Tell me about pricing"),
  ];

  return (
    <HeroSection>
      <HeroTitle className="gap-1 md:gap-4 mb-4 md:mb-8 text-center">
        {/* Badge */}
        <span className="text-xs md:text-sm tracking-wider text-brand-white bg-brand-white/8 py-2 px-4 md:px-8 rounded-full w-max mx-auto font-light border border-white/10 mb-2 md:mb-4">
          {t("tech_agency.hero.badge", "The New Area Of Technology")}
        </span>

        <span className="font-semibold block">
          {t("tech_agency.hero.title_part1", "Creating")}
        </span>

        <span className="font-semibold text-brand-sky block">
          {t("tech_agency.hero.title_part2", "Next Generation Solution")}
        </span>

        {/* Merged "With Tech Solutions" into the title so it flows naturally */}
        <span className="font-semibold block">
          {t("tech_agency.hero.title_part3_prefix", "With")}{" "}
          <span className="text-brand-orange">
            {t("tech_agency.hero.title_highlight", "Tech Solutions")}
          </span>
        </span>
      </HeroTitle>

      <HeroButtons className="mt-4 md:mt-10 w-full flex flex-col items-center gap-4 md:gap-5">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-lg flex flex-col gap-4 md:gap-7"
        >
          <div
            className="relative flex items-center group rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.11)",
            }}
          >
            {/* Sky glow on focus */}
            <div
              className="absolute -inset-px rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(0,191,255,0.35), 0 0 28px rgba(0,191,255,0.1)",
              }}
            />

            {/* Bot icon */}
            <div className="flex-shrink-0 flex items-center gap-2 pl-3 pr-2 md:pl-4 md:pr-3 border-r border-white/10 py-3">
              <Bot size={15} className="text-brand-sky" />
              <span className="text-[11px] font-medium text-white/40 hidden sm:block tracking-widest uppercase">
                AI
              </span>
            </div>

            {/* Text input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isRTL
                  ? "اسأل عن خدماتنا…"
                  : t(
                      "tech_agency.hero.input_placeholder",
                      "Ask about our services…",
                    )
              }
              dir={/^[\u0600-\u06FF]/.test(inputValue) ? "rtl" : "ltr"}
              className="flex-1 min-w-0 bg-transparent text-white text-xs md:text-sm py-3 px-2 md:px-4 outline-none border-none focus:ring-0 placeholder-white/25 font-alexandria"
            />

            {/* Ask button */}
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="flex-shrink-0 flex items-center gap-1.5 m-1.5 px-3 md:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                background: "rgba(0,191,255,0.15)",
                border: "1px solid rgba(0,191,255,0.28)",
                color: "rgba(0,191,255,0.9)",
              }}
            >
              <span className="hidden sm:block">Ask</span>
              <ArrowRight
                size={13}
                style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
              />
            </button>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openChatWithMessage(suggestion)}
                className="text-[11px] text-white/40 hover:text-white/70 px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </HeroButtons>
    </HeroSection>
  );
}
