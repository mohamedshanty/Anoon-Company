// components/home/WhoWeAreSecond.jsx

import InfoSection from "@/components/common/WhoWeAre";

export default function WhoWeAreSecond() {
  return (
    <InfoSection
      id="mission"
      subtitle="Who We Are"
      headingLines={[
        {
          text: "When",
          highlight: "Everybody",
          textAfter: "Needed Help",
          color: "text-brand-sky", // لون النص العادي
          highlightColor: "text-brand-orange", // لون الكلمة المميزة
        },
        {
          text: "We",
          highlight: "Where",
          textAfter: "There",
          color: "text-brand-sky", // لون النص العادي
          highlightColor: "text-brand-orange", // لون الكلمة المميزة
        },
      ]}
      description="Tamkeen is dedicated to providing clarity and hope. We strive to help every student recognize their worth go beyond their limits and become the best version of themselves for the sake of a better future by providing work space that is modern, high quality and save their time & money."
      image="/images/whoWeAre.png"
      layout="image-right"
      backgroundGlow="default"
      patternDirection="default"
      showFeatures={false}
      showCta={true}
      ctaText="Know More"
      customButton={true}
    />
  );
}
