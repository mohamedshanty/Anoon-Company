"use client";

import Hero from "@/components/common/Hero";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { useChat } from "@/context/ChatContext";
import { Bot } from "lucide-react";
import Button from "../ui/Button";

export default function TechAgencyHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const { openChat } = useChat();

  return (
    <Hero>
      <Hero.Title className="-mt-13">
        <div className={`flex flex-col gap-3 ${isRTL ? 'text-right' : ''}`}>
          <span className="text-sm tracking-wider text-brand-white bg-brand-white/8 py-3 px-4 sm:px-8 md:px-20 rounded-full w-max mx-auto font-light border border-white/10">
            {t("tech_agency.hero.badge", "The New Area Of Technology")}
          </span>

          <div className="text-center items-center flex flex-col gap-7">
            <span className="mt-4 font-semibold">
              {t("tech_agency.hero.title_part1", "Creating")}
            </span>

            <span className="font-semibold text-brand-sky">
              {t("tech_agency.hero.title_part2", "Next Generation Solution")}
            </span>

            <span className="font-semibold">
              {t("tech_agency.hero.title_part3_prefix", "With")}{" "}
              <span className="text-brand-orange">
                {t("tech_agency.hero.title_highlight", "Tech Agency")}
              </span>
            </span>
          </div>
        </div>
      </Hero.Title>

      <Hero.Actions>
        <Button
          variant="premium"
          color="sky"
          onClick={openChat}
          className="text-lg px-10"
        >
          <div className="p-2 bg-white/10 rounded-lg">
            <Bot size={22} className="group-hover:rotate-12 transition-transform animate-pulse" />
          </div>
          <span>{t("tech_agency.hero.ask_ai_button", "Ask Ai")}</span>
        </Button>
      </Hero.Actions>
    </Hero>
  );
}