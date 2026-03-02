"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Link from "next/link";

export default function NoonHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <Hero>
      <Hero.Title className="gap-y-6">
        <span className="font-semibold">{t("noon_hub.hero.title_part1", "Providing")}</span>
        <span className="font-semibold">
          {t("noon_hub.hero.title_part2_prefix", "A")}{" "}
          <span className="text-brand-sky">{t("noon_hub.hero.title_highlight1", "Safe Place")}</span>{" "}
          {t("noon_hub.hero.title_part2_middle", "For")}{" "}
          <span className="text-brand-orange">{t("noon_hub.hero.title_part2", "Everyone")}</span>
        </span>

        <span className="font-semibold">
          {t("noon_hub.hero.title_part3", "With")}{" "}
          <span className="text-brand-sky">
            {t("noon_hub.hero.title_highlight2_prefix", "N")}
            <span className="text-brand-orange">{t("noon_hub.hero.title_highlight2_middle", "oo")}</span>
            {t("noon_hub.hero.title_highlight2_suffix", "n Hub")}
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle className="mt-5 tracking-[1px]">
        <p className={`text-subtitle text-white/80 ${isRTL ? 'text-right' : ''}`}>
          {t("noon_hub.hero.subtitle", "Noon Hub is a place Designed for your needs, the friends you know the people you admire, Every body focusing on get things done, Learn more, network more and Focus With Us")}
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Link href="/noonSpace">
          <Button variant="outline" color="orange">
            {t("noon_hub.hero.button", "Explore Our Services")}
          </Button>
        </Link>
      </Hero.Buttons>
    </Hero>
  );
}