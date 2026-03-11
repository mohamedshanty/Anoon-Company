"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Link from "next/link";

export default function TamkeenHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <Hero className="animate-fade-in">
      <Hero.Title className="gap-y-1 md:gap-y-6">
        <span>{t("tamkeen.hero.title_part1", "Enabling")}</span>
        <span className="text-brand-orange">
          {t("tamkeen.hero.title_highlight", "The Future Generation")}
        </span>
        <span className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <span>{t("tamkeen.hero.title_part2", "With")}</span>
          <div className="relative w-24 h-10 md:w-48 md:h-20">
            <Image
              src="/images/tamkeen-image.png"
              alt={t("tamkeen.hero.logo_alt", "Tamkeen")}
              fill
              className="object-contain"
              priority
            />
          </div>
        </span>
      </Hero.Title>

      <Hero.Subtitle className="tracking-[0.15px] my-4 md:my-10 md:mb-10">
        <p className="text-sm md:text-base text-white/80 text-center leading-relaxed px-2 md:px-0">
          {t(
            "tamkeen.hero.subtitle",
            "Buildings can be broken, but the human Spirit remain Ignited. We didn't wait, We just did it because while aid sustains the body, knowledge reclaims the future. The war took Everything, but couldn't take our skills. We are building the minds that will rebuild this land.",
          )}
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Link
          href="https://tamkeeninsan.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" color="orange">
            {t("tamkeen.hero.button1", "Visit Our Website")}
          </Button>
        </Link>
        <Link
          href="https://donate.stripe.com/dRm8wQ6V2bu9anlfQn1gs00"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" color="sky">
            {t("tamkeen.hero.button2", "Donate Now")}
          </Button>
        </Link>
      </Hero.Buttons>
    </Hero>
  );
}
