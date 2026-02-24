"use client";

import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProgramCard from "../ui/ProgramCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";

export default function Programs() {
  const { t, ready } = useTranslation();
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useScrollReveal({
    ref: headerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
  });

  useScrollReveal({
    ref: cardsContainerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.3,
    start: "top 75%",
  });

  if (!ready) {
    return null;
  }

  // استخدام القيم الثابتة مباشرة بدلاً من الترجمة للمسارات
  const cards = [
    {
      logo: {
        src: "/images/tamkeen-image.png",
        alt: t("programs_page.cards.0.logo_alt"),
        width: 150,
        height: 80,
      },
      title: (
        <>
          {t("programs_page.cards.0.title_prefix")}{" "}
          <span className="text-brand-green">{t("programs_page.cards.0.title_highlight1")}</span>{" "}
          {t("programs_page.cards.0.title_middle")}{" "}
          <span className="text-brand-green">{t("programs_page.cards.0.title_highlight2")}</span>
        </>
      ),
      description: t("programs_page.cards.0.description"),
      primaryBtnText: t("programs_page.cards.0.primary_btn"),
      primaryBtnColor: "green",
      accentGlowClass: "from-green-500/5",
      secondaryBtnText: t("programs_page.cards.0.secondary_btn"),
    },
    {
      logo: {
        src: "/images/noon-hub.png",
        alt: t("programs_page.cards.1.logo_alt"),
        width: 250,
        height: 100,
      },
      title: (
        <>
          {t("programs_page.cards.1.title_prefix")}{" "}
          <span className="text-red-500">{t("programs_page.cards.1.title_highlight1")}</span>{" "}
          {t("programs_page.cards.1.title_middle")}{" "}
          <span className="text-brand-orange">{t("programs_page.cards.1.title_highlight2")}</span>
        </>
      ),
      description: t("programs_page.cards.1.description"),
      primaryBtnText: t("programs_page.cards.1.primary_btn"),
      primaryBtnColor: "orange",
      accentGlowClass: "from-brand-orange/5",
      logoContainerClassName: "pb-8 mb-3",
      secondaryBtnText: t("programs_page.cards.1.secondary_btn"),
    },
  ];

  // جلب subtitle_words مع التأكد من وجودها
  const subtitleWords = t("programs_page.subtitle_words", { returnObjects: true });
  const subtitleWordsArray = Array.isArray(subtitleWords) ? subtitleWords : [
    { text: "Tailor", color: "text-brand-sky" },
    { text: "Crafted", color: "text-brand-orange" },
    { text: "For The", color: "text-brand-sky" },
    { text: "Tech Sector", color: "text-brand-orange" }
  ];

  // جلب description مع التأكد من وجودها
  const descriptionArray = t("programs_page.description", { returnObjects: true });
  const descriptionLines = Array.isArray(descriptionArray) ? descriptionArray : [
    "At Anoon LLC, we believe there is no shame in falling.",
    "only in staying down. We help people rise by giving them the skills to build again.",
    "We don't just offer a second chance, we offer the tools to create a new life."
  ];

  return (
    <section
      id="programs"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="main-container">
        <SectionHeader
          title={t("programs_page.title")}
          subtitle={{
            highlightedWords: subtitleWordsArray,
          }}
          description={descriptionLines}
          starsCount={25}
          maxWidth="4xl"
          align="center"
          className="mb-8 md:mb-12 lg:mb-20"
          descriptionClassName="px-4 md:px-0"
        />

        <div
          ref={cardsContainerRef}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {cards.map((card, idx) => (
            <div key={idx} className="h-full">
              <ProgramCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}