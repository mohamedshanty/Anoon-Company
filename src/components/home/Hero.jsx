"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function MainHero() {
  const { t } = useTranslation();

  return (
    <Hero>
      <Hero.Title>
        <span>{t("hero.title_rising")}</span>
        <span className="text-brand-orange">{t("hero.title_ashes")}</span>
        <span>
          {t("hero.title_build")} <span className="text-brand-sky">{t("hero.title_future")}</span>
        </span>
      </Hero.Title>

      <Hero.Subtitle>
        <p className="text-subtitle">
          {t("hero.subtitle_spirit")}
          <span className="text-brand-orange">{t("hero.subtitle_spirit_highlight")}</span>
        </p>
        <p className="text-subtitle">
          {t("hero.subtitle_ours")}
          <span className="text-brand-orange">{t("hero.subtitle_ours_highlight")}</span>
        </p>
        <p className="text-subtitle">
          {t("hero.subtitle_rise")}
          <span className="text-brand-orange">{t("hero.subtitle_rise_highlight")}</span>
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Link href="/techAgency" >
          <Button variant="outline" color="orange">
            {t("hero.button_services")}
          </Button>
        </Link>

        <Link href="https://meet.google.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" color="sky">
            {t("hero.button_meeting")}
          </Button>
        </Link>
      </Hero.Buttons>
    </Hero>
  );
}