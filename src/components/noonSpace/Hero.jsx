"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import Link from "next/link";
import Image from "next/image";

export default function SpaceNoonHero() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <Hero>
      <Hero.Title className="gap-y-1 md:gap-y-6 md:-mt-7">
        <span>{t("space_noon.hero.title_part1", "Enabling")}</span>
        <span className="text-brand-orange">
          {t("space_noon.hero.title_highlight", "The Future Generation")}
        </span>
        <span className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <span className="text-brand-sky">{t("space_noon.hero.title_part2", "With")}</span>
          <span className="font-thin">

            <div className="relative w-24 h-10 md:w-48 md:h-20">
              <Image
                src="/images/spaceNoonLogo1.webp"
                alt={t("space_noon.hero.logo_alt", "Space Noon Logo")}
                fill
                className="object-contain"
                priority
              />
            </div>
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle className="tracking-[0.15px] my-4 md:my-10 md:mb-10">
        <p className="text-sm md:text-base text-white/80 text-center leading-relaxed px-2 md:px-0">
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
