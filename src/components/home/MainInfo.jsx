"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";

export default function MianInfoSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <InfoSection
      id="about"
      layout="image-right"
      backgroundGlow="default"
      image="/images/whoWeAre.png"
      imageAlt={t("who_we_are_page.subtitle")}
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          {t("who_we_are_page.subtitle")}
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine
            text={t("who_we_are_page.title_line1_text")}
            highlight={t("who_we_are_page.title_line1_highlight")}
            color="text-brand-sky"
            highlightColor="text-brand-orange"
            className={`${isRTL ? "mb-5" : ""}`}
          />
          <InfoSection.TitleLine
            text={t("who_we_are_page.title_line2_text")}
            highlight={t("who_we_are_page.title_line2_highlight")}
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description>
        {t("who_we_are_page.description")}
      </InfoSection.Description>

      <InfoSection.Features className={isRTL ? "rtl-gap" : ""}>
        <InfoSection.Feature
          icon="/images/missile.png"
          title={t("who_we_are_page.feature1_title")}
          text={t("who_we_are_page.feature1_desc")}
          color="text-brand-orange"
          ctaText={t("who_we_are_page.feature1_cta") || "Know More"}
          href="/techAgency"
        />

        <InfoSection.Feature
          icon="/images/Lump.png"
          title={t("who_we_are_page.feature2_title")}
          text={t("who_we_are_page.feature2_desc")}
          color="text-brand-sky"
          className={isRTL ? "" : "lg:-mr-12 xl:-mr-16"}
          ctaText={t("who_we_are_page.feature2_cta") || "Know More"}
          href="/techAgency"
        />

      </InfoSection.Features>
    </InfoSection>
  );
}