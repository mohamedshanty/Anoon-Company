// components/home/WhoWeAre.jsx

import InfoSection from "../common/WhoWeAre";

export default function WhoWeAre() {
  return (
    <InfoSection
      id="about"
      subtitle="Who We Are"
      headingLines={[
        {
          text: "We Don't Just Build",
          highlight: "Software",
          color: "text-brand-sky",
          highlightColor: "text-brand-orange",
        },
        {
          text: "We Help People",
          highlight: "Dream",
          color: "text-brand-sky",
          highlightColor: "text-brand-orange",
        },
      ]}
      description="Anoon LLC doesn't just build software. When the world went dark, we stayed. We met our mission head-on in Gaza by offering a future. We equipped students with the technical mastery to rise, because they can take everything else, but they can't take what you know."
      image="/images/whoWeAre.png"
      features={[
        {
          title: "Tech Solution",
          text: "We deliver scalable, secure & impact-oriented systems.",
          icon: "/images/missile.png",
          color: "text-brand-orange",
        },
        {
          title: "Social",
          text: "Our Programs provide infrastructure and skills.",
          icon: "/images/Lump.png",
          color: "text-brand-sky",
          offset: "lg:-mr-12 xl:-mr-16",
        },
      ]}
      layout="image-right"
      backgroundGlow="default"
      patternDirection="default"
      showFeatures={true}
    />
  );
}
