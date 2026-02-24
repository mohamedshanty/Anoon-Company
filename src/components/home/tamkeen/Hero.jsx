"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function TamkeenHero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Hero>
      <Hero.Title>
        <span>{t("tamkeen.hero.title_part1", "Enabling")}</span>
        <span className="text-brand-orange">
          {t("tamkeen.hero.title_highlight", "The Future Generation")}
        </span>
        <span className="flex items-center gap-4 flex-wrap justify-center">
          <span>{t("tamkeen.hero.title_part2", "With")}</span>
          <Image
            src="/images/tamkeen-image.png"
            alt={t("tamkeen.hero.logo_alt", "Tamkeen")}
            width={200}
            height={80}
            className="object-contain"
            priority
          />
        </span>
      </Hero.Title>

      <Hero.Subtitle>
        <p className={`text-subtitle text-white/80 ${isRTL ? 'rtl text-right' : ''}`}>
          {t("tamkeen.hero.subtitle", "Buildings can be broken, but the human Spirit remain Ignited. We didn't wait, We just did it because while aid sustains the body, knowledge reclaims the future. The war took Everything, but couldn't take our skills. We are building the minds that will rebuild this land.")}
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Button variant="outline" color="orange">
          {t("tamkeen.hero.button1", "Visit Our Website")}
        </Button>
        <Button variant="outline" color="sky">
          {t("tamkeen.hero.button2", "Donate Now")}
        </Button>
      </Hero.Buttons>
    </Hero>
  );
}