"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SpaceNoonTrainingHero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Hero>
      <Hero.Title className={`${isRTL ? "gap-y-2 md:gap-y-8" : "gap-y-3"}`}>
        <span>{t("tech_training.hero.title_part1", "Enabling")}</span>
        <span className="text-brand-orange">
          {t("tech_training.hero.title_highlight", "The Future Generation")}
        </span>
        <span className="flex items-center gap-4 flex-wrap justify-center">
          <span>{t("tech_training.hero.title_part2", "With")}</span>
          <span className="font-thin">
            <span className="text-brand-orange">
              {t("tech_training.hero.title_brand", "Tech Training")}
            </span>
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle className={`tracking-[0.5px] ${isRTL ? "my-10" : ""}`}>
        <p className={`text-subtitle text-white/80`}>
          {t(
            "tech_training.hero.subtitle",
            "Empowering students and professionals with cutting-edge skills to shape the digital future inside Palestine & Gaza . ",
          )}
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Link href="/spaceNoonTraining#tech">
          <Button variant="outline" color="orange">
            {t("tech_training.hero.button1", "Explore Our Services")}
          </Button>
        </Link>
        <Link
          href="https://maps.app.goo.gl/G4uycW6GEBeUjnMv7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" color="sky">
            {t("tech_training.hero.button2", "Visit Our Space")}
          </Button>
        </Link>
      </Hero.Buttons>
    </Hero>
  );
}
