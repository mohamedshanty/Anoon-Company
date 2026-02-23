"use client";

import InfoSection from "@/components/common/InfoSection";

const SpaceNoonTrainingProblemSection = () => {
  return (
    <InfoSection
      id="space-noon-problem"
      layout="image-right"
      backgroundGlow="orange"
      image="/images/SpaceNoonTraining.png"
      imageAlt="Problem illustration"
    >
      <InfoSection.Header>
        <InfoSection.Title>
          <div className="space-y-6 pt-10">
            <h1 className="text-5xl md:text-6xl font-semibold text-brand-white">
              What is
            </h1>
            <h1 className="text-5xl md:text-6xl font-semibold leading-17 text-brand-sky">
              The <span className="text-red-400">Problem </span> That Face Us ??
            </h1>
          </div>
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className="text-white/80 max-w-2xl mt-8 text-xl leading-relaxed">
        we have a generation that have suffered from the war finicial and don’t
        have any skill but the desire and the capability to learn
      </InfoSection.Description>
    </InfoSection>
  );
};

export default SpaceNoonTrainingProblemSection;
