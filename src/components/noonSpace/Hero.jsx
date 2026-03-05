"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Link from "next/link";

export default function SpaceNoonHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <Hero>
      <Hero.Title className="gap-y-6">
        <span>{t("space_noon.hero.title_part1", "Enabling")}</span>
        <span className="text-brand-orange">
          {t("space_noon.hero.title_highlight", "The Future Generation")}
        </span>
        <span className="flex items-center gap-4 flex-wrap justify-center">
          <span>{t("space_noon.hero.title_part2", "With")}</span>
          <span className="font-thin">
            <span className="text-brand-orange">
              {t("space_noon.hero.title_brand", "Space Noon")}
            </span>
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle className="tracking-[0.5px]">
        <p className={`text-subtitle text-white/80`}>
          {t(
            "space_noon.hero.subtitle",
            "Empowering students and professionals with the tools and the platform by providing a co-working space that they can work in safe, quiet space with the ability to network",
          )}
        </p>
      </Hero.Subtitle>

      <Hero.Buttons className="mt-10">
        <Link href="/spaceNoonTraining">
          <Button variant="outline" color="orange">
            {t("space_noon.hero.button1", "Explore Our Services")}
          </Button>
        </Link>
        <Link
          href="https://maps.app.goo.gl/G4uycW6GEBeUjnMv7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" color="sky">
            {t("space_noon.hero.button2", "Visit Our Space")}
          </Button>
        </Link>
      </Hero.Buttons>
    </Hero>
  );
}
