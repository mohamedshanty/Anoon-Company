"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { useEffect } from "react";

export default function TamkeenHelpSection() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useRTL();

  const provideItems = t("tamkeen.who_we_are.provide_items", {
    returnObjects: true,
    defaultValue: [],
  });

  const provideList = Array.isArray(provideItems) ? provideItems : [];

  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById("contact");
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
      image="/images/tamkeen-info.png"
      imageAlt={t("tamkeen.who_we_are.image_alt")}
      className="animate-fade-in"
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t("tamkeen.who_we_are.subtitle")}
          </span>
        </InfoSection.Subtitle>
        <InfoSection.Title className="">
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

      <InfoSection.Description
        className={`text-white/80 max-w-xl mt-10 text-base ${isRTL ? "text-right" : ""}`}
      >
        {t("tamkeen.who_we_are.description")}
      </InfoSection.Description>

      <div
        className={`mt-6 text-white max-w-xl ${isRTL ? "text-right" : "text-left"}`}
      >
        <h3 className="text-brand-orange text-2xl md:text-3xl font-bold mb-4">
          {t("tamkeen.who_we_are.provide_title")}
        </h3>
        <ol className="space-y-2 text-base text-white/90 list-decimal list-inside">
          {provideList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>

      <InfoSection.CTA
        ctaText={t("tamkeen.who_we_are.cta")}
        variant="outline"
        color="sky"
        href="https://tamkeeninsan.org/"
        target="_blank"
        rel="noopener noreferrer"
      />
    </InfoSection>
  );
}
