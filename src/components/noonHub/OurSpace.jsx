"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Stars from "../ui/Stars";

const OurSpace = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // جلب مصفوفة الكلمات المميزة
  const subtitleWords = t("space_noon.our_space.subtitle_words", {
    returnObjects: true,
    defaultValue: ["Your", "Future", "Network"]
  });

  // التأكد من أن subtitleWords هي مصفوفة
  const wordsArray = Array.isArray(subtitleWords) ? subtitleWords : ["Your", "Future", "Network"];

  // بناء highlightedWords بشكل ديناميكي
  const highlightedWords = [
    ...(wordsArray[0] ? [{ text: wordsArray[0], color: "text-brand-sky" }] : []),
    ...(wordsArray[1] ? [{ text: wordsArray[1], color: "text-brand-orange" }] : []),
    ...(wordsArray[2] ? [{ text: wordsArray[2], color: "text-brand-sky" }] : []),
  ].filter(item => item.text); // إزالة أي عناصر فارغة

  return (
    <section className="relative py-24 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <Stars count={20} zIndex={-5} opacity={0.8} />

      <div className="main-container flex flex-col items-center">
        <SectionHeader
          title={t("space_noon.our_space.title", "Our Space")}
          subtitle={{
            highlightedWords: highlightedWords,
          }}
          description={[
            t("space_noon.our_space.description", "We provide everything your need in our space. We give you the skill you have to acquire to get in the digital work space with professional guidance regarding Freelancing & Networking, and the platform to be able to achieve it."),
          ]}
          starsCount={20}
          maxWidth="3xl"
          align="center"
          titleClassName="text-5xl md:text-6xl"
        />
        <div className="mt-12">
          <Button variant="outline" color="sky" className="px-8 py-3 text-lg">
            {t("space_noon.our_space.button", "Visit Our Location")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurSpace;