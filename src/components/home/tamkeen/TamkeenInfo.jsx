"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function TamkeenHelpSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // تشخيص المشكلة
  useEffect(() => {
    console.log('=== تشخيص الترجمة ===');
    console.log('Current language:', i18n.language);
    console.log('tamkeen.who_we_are exists:', t('tamkeen.who_we_are', { returnObjects: true }));
    console.log('title_line1.text:', t('tamkeen.who_we_are.title_line1.text'));
    console.log('title_line1.highlight:', t('tamkeen.who_we_are.title_line1.highlight'));
    console.log('title_line1.after:', t('tamkeen.who_we_are.title_line1.after'));
    console.log('title_line2.text:', t('tamkeen.who_we_are.title_line2.text'));
    console.log('title_line2.highlight:', t('tamkeen.who_we_are.title_line2.highlight'));
    console.log('title_line2.after:', t('tamkeen.who_we_are.title_line2.after'));
  }, [i18n.language, t]);

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
          {t("tamkeen.who_we_are.subtitle")}
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

      <InfoSection.Description className={`text-white/80 max-w-[150px] mt-10 text-base ${isRTL ? 'text-right' : ''}`}>
        {t("tamkeen.who_we_are.description")}
      </InfoSection.Description>

      <InfoSection.CTA
        ctaText={t("tamkeen.who_we_are.cta")}
        variant="outline"
        color="sky"
      />
    </InfoSection>
  );
}