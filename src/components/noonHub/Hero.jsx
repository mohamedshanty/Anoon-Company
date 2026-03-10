"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Link from "next/link";
import Image from "next/image";

export default function NoonHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <Hero>
      <Hero.Title className="gap-y-2 md:gap-y-6">
        <span className="font-semibold">
          {t("noon_hub.hero.title_part1", "Providing")}
        </span>
        <span className="font-semibold text-brand-orange">
          {t("noon_hub.hero.title_part2_prefix", "A")}{" "}
          <span className="text-brand-sky">
            {t("noon_hub.hero.title_highlight1", "Safe Place")}
          </span>{" "}
          {t("noon_hub.hero.title_part2_middle", "For")}{" "}
          <span className="text-brand-orange">
            {t("noon_hub.hero.title_part2", "Everyone")}
          </span>
        </span>

        <div className="font-semibold flex items-center gap-4 flex-wrap justify-center">
          <span>{t("noon_hub.hero.title_part3", "With")} </span>
          <div className="relative w-32 h-12 md:w-48 md:h-20">
            <Image
              src="/images/spaceNoonLogo1.png"
              alt={t("space_noon.hero.logo_alt", "Space Noon Logo")}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Hero.Title>

      <Hero.Subtitle className="tracking-[0.15px] md:my-10 md:mb-10">
        <p className={`text-subtitle text-white/80`}>
          {t(
            "noon_hub.hero.subtitle",
            "Noon Hub is a place Designed for your needs, the friends you know the people you admire, Every body focusing on get things done, Learn more, network more and Focus With Us",
          )}
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
