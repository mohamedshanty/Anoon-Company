"use client";

import InfoSection from "@/components/common/InfoSection";

const SpaceNoonProblemSection = () => {
  return (
    <InfoSection
      id="space-noon-problem"
      layout="image-right"
      backgroundGlow="orange"
      image="/images/problem.png"
      imageAlt="Problem illustration"
    >
      <InfoSection.Header>
        <InfoSection.Title>
          {/* تنسيق مطابق للصورة - كل كلمة في سطر منفصل */}
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
        We Don't have the place that have all what student & Freelancer needs
        starting from quite place, to standard electricity, we don't have the
        networking event in good prices
      </InfoSection.Description>
    </InfoSection>
  );
};

export default SpaceNoonProblemSection;
