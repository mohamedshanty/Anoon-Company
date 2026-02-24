"use client";

import Hero from "@/components/common/Hero";
import AiPrompt from "@/components/ui/AiPrompt";
import { useTranslation } from "react-i18next";

export default function TechAgencyHero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Hero>
      <Hero.Title className="-mt-13">
        <div className={`flex flex-col gap-3 ${isRTL ? 'text-right' : ''}`}>
          <span className="text-sm tracking-wider text-brand-white bg-brand-white/8 py-3 px-4 sm:px-8 md:px-20 rounded-full w-max mx-auto font-light">
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
        <AiPrompt
          placeholder={t("tech_agency.hero.prompt_placeholder", "Ask about our services, projects, or how we can help you!")}
          buttonText={t("tech_agency.hero.prompt_button", "Ask Now")}
        />
      </Hero.Actions>
    </Hero>
  );
}