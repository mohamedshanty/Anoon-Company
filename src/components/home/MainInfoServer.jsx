import InfoSection from "@/components/common/InfoSection";

export default function MainInfoServer({ t }) {
  const isRTL = false; // Initial SSR is LTR unless we detect it server-side

  return (
    <InfoSection
      id="about"
      layout="image-right"
      backgroundGlow="default"
      image="/images/whoWeAre1.png"
      imageAlt={t.subtitle}
      imagePriority={true}
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          <h2>{t.subtitle}</h2>
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine
            text={t.title_line1_text}
            highlight={t.title_line1_highlight}
            color="text-brand-sky"
            highlightColor="text-brand-orange"
            className={`${isRTL ? "mb-5" : ""}`}
          />
          <InfoSection.TitleLine
            text={t.title_line2_text}
            highlight={t.title_line2_highlight}
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description>{t.description}</InfoSection.Description>

      <InfoSection.Features className={isRTL ? "rtl-gap" : ""}>
        <InfoSection.Feature
          icon="/images/missile.png"
          title={t.feature1_title}
          text={t.feature1_desc}
          color="text-brand-orange"
          ctaText={t.feature1_cta || "Know More"}
          href="/techAgency"
        />

        <InfoSection.Feature
          icon="/images/Lump.png"
          title={t.feature2_title}
          text={t.feature2_desc}
          color="text-brand-sky"
          className={isRTL ? "" : "lg:-mr-12 xl:-mr-16"}
          ctaText={t.feature2_cta || "Know More"}
          href="/noonHub"
        />
      </InfoSection.Features>
    </InfoSection>
  );
}
