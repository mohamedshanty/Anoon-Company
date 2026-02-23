"use client";

import InfoSection from "@/components/common/InfoSection";

export default function AnoonInfoSection() {
  return (
    <InfoSection
      id="network"
      layout="image-right"
      backgroundGlow="none"
      image="/images/whoWeAre.png"
      imageAlt="Network illustration"
      customClass="flex flex-col items-start justify-start"
    >
      <InfoSection.Header>
        <InfoSection.Subtitle className="text-brand-white">
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug">
            We Provide More <br /> Than A{" "}
            <span className="text-brand-orange">Space</span> We Offer
          </p>
        </InfoSection.Subtitle>
        <InfoSection.Title>
          <InfoSection.TitleLine>
            <p className="text-3xl md:text-4xl lg:text-5xl text-brand-sky font-semibold">
              Your Future Network
            </p>
          </InfoSection.TitleLine>
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className="text-white/80 max-w-md my-10 text-base">
        Your Network is everything, no matter how Professional you are if you
        don't have the right people it doesn't matter, with us we give you the
        network of your dream
      </InfoSection.Description>

      <InfoSection.CTA
        ctaText="Visit Our Location"
        variant="outline"
        color="sky"
      />
    </InfoSection>
  );
}
