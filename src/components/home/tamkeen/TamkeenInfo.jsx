"use client";

import InfoSection from "@/components/common/InfoSection";

export default function TamkeenHelpSection() {
  return (
    <InfoSection
      id="tamkeen"
      layout="image-right"
      backgroundGlow="default"
      image="/images/whoWeAre.png"
      imageAlt="Tamkeen illustration"
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          Who We Are
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine
            text="When"
            highlight="Everybody"
            textAfter="Needed Help"
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
          <InfoSection.TitleLine
            text="We"
            highlight="Where"
            textAfter="There"
            color="text-brand-sky"
            highlightColor="text-brand-orange"
          />
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className="text-white/80 max-w-[150px] mt-10 text-base">
        Tamkeen is dedicated to providing clarity and hope. We strive to help
        every student recognize their worth go beyond their limits and become
        the best version of themselves for the sake of a better future by
        providing work space that is modern, high quality and save their time &
        money.
      </InfoSection.Description>

      <InfoSection.CTA ctaText="Know More" variant="outline" color="sky" />
    </InfoSection>
  );
}
