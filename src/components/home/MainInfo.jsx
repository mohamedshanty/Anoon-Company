"use client";

import InfoSection from "@/components/common/InfoSection";

export default function MianInfoSection() {
  return (
    <InfoSection
      id="anoon"
      layout="image-right"
      backgroundGlow="default"
      image="/images/whoWeAre.png"
      imageAlt="Anoon illustration"
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          Who We Are
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine
            text="We Don't Just Build"
            highlight="Software"
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
          <InfoSection.TitleLine
            text="We Help People"
            highlight="Dream"
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description>
        Anoon LLC doesn't just build software. When the world went dark, we
        stayed. We met our mission head-on in Gaza by offering a future. We
        equipped students with the technical mastery to rise, because they can
        take everything else, but they can't take what you know.
      </InfoSection.Description>

      <InfoSection.Features>
        <InfoSection.Feature
          icon="/images/missile.png"
          title="Tech Solution"
          text="We deliver scalable, secure & impact-oriented systems."
          color="text-brand-orange"
        />
        <InfoSection.Feature
          icon="/images/Lump.png"
          title="Social"
          text="Our Programs provide infrastructure and skills."
          color="text-brand-sky"
          className="lg:-mr-12 xl:-mr-16"
        />
      </InfoSection.Features>
    </InfoSection>
  );
}
