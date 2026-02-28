"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { useEffect } from "react";

export default function TamkeenHelpSection() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useRTL();

  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <InfoSection
      id="tamkeen"
      layout="image-right"
      backgroundGlow="default"
      image="/images/whoWeAre.png"
      imageAlt={t("tamkeen.who_we_are.image_alt")}
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          <h2>
            {t("tamkeen.who_we_are.subtitle")}
          </h2>
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine
            text={t("tamkeen.who_we_are.title_line1.text")}
            highlight={t("tamkeen.who_we_are.title_line1.highlight")}
            textAfter={t("tamkeen.who_we_are.title_line1.after")}
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
          <InfoSection.TitleLine
            text={t("tamkeen.who_we_are.title_line2.text")}
            highlight={t("tamkeen.who_we_are.title_line2.highlight")}
            textAfter={t("tamkeen.who_we_are.title_line2.after")}
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className={`text-white/80 max-w-xl mt-10 text-base ${isRTL ? 'text-right' : ''}`}>
        {t("tamkeen.who_we_are.description")}
      </InfoSection.Description>

      <InfoSection.CTA
        ctaText={t("tamkeen.who_we_are.cta")}
        variant="outline"
        color="sky"
        href="#contact"
        onClick={handleScroll}
      />
    </InfoSection>
  );
}