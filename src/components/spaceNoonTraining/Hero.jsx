"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SpaceNoonTrainingHero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const scrollToSection = (e) => {
    e.preventDefault();
    const el = document.getElementById("tech");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Hero>
      <Hero.Title className="gap-y-1 md:gap-y-6">
        <span>{t("tech_training.hero.title_part1", "Enabling")}</span>
        <span className="text-brand-orange">
          {t("tech_training.hero.title_highlight", "The Future Generation")}
        </span>
        <span className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <span>{t("tech_training.hero.title_part2", "With")}</span>
          <span className="font-thin">
            <span className="text-brand-orange">
              {t("tech_training.hero.title_brand", "Tech Training")}
            </span>
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle className="tracking-[0.5px] my-4 md:my-10 md:mb-10">
        <p className="text-sm md:text-base text-white/80 text-center leading-relaxed px-2 md:px-0">
          {t(
            "tech_training.hero.subtitle",
            "Empowering students and professionals with cutting-edge skills to shape the digital future inside Palestine & Gaza.",
          )}
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Link href="/spaceNoonTraining#tech" onClick={scrollToSection}>
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
