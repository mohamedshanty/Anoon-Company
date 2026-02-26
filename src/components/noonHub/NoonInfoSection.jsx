"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";

export default function AnoonInfoSection() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <InfoSection
      id="network"
      layout="image-right"
      backgroundGlow="none"
      image="/images/noonHub.png"
      imageAlt={t("noon_hub.info.image_alt", "Network illustration")}
      customClass={`flex flex-col items-start justify-start ${isRTL ? 'rtl' : ''}`}
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          <p className={`text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug ${isRTL ? 'text-right' : ''}`}>
            {t("noon_hub.info.title_line1", "We Provide More")} <br />
            {t("noon_hub.info.title_line2_prefix", "Than A")}{" "}
            <span className="text-brand-orange">{t("noon_hub.info.title_highlight", "Space")}</span>{" "}
            {t("noon_hub.info.title_line2_suffix", "We Offer")}
          </p>
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine>
            <p className={`text-3xl md:text-4xl lg:text-5xl text-brand-sky font-semibold ${isRTL ? 'text-right' : ''}`}>
              {t("noon_hub.info.title_line3", "Your Future Network")}
            </p>
          </InfoSection.TitleLine>
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className={`text-white/80 max-w-md my-10 text-base ${isRTL ? 'text-right' : ''}`}>
        {t("noon_hub.info.description", "Your Network is everything, no matter how Professional you are if you don't have the right people it doesn't matter, with us we give you the network of your dream")}
      </InfoSection.Description>

      <InfoSection.CTA
        ctaText={t("noon_hub.info.cta", "Visit Our Location")}
        variant="outline"
        color="sky"
      />
    </InfoSection>
  );
}