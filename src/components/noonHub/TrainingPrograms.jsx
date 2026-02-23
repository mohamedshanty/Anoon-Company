import TrainingProgramsSection from "../common/TrainingProgramsSection";

const TrainingPrograms = () => {
  return (
    <TrainingProgramsSection
      title="Training Programs"
      subtitleHighlightedWords={[
        { text: "Your", color: "text-brand-sky" },
        { text: "Way", color: "text-brand-orange" },
        { text: "For The", color: "text-brand-sky" },
        { text: "Market Need", color: "text-brand-orange" },
      ]}
      description={[
        "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software",
      ]}
      cardProps={{
        title: "Graphic Design Course",
        description:
          "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software for the business, and we give you the guidance for showcasing your portfolio and the freelance to start your journey not just a skills.",
        imageSrc: "/images/trainingPrograms.png",
        imageAlt: "Graphic Design Course",
        buttonText: "Visit Us",
        buttonColor: "sky",
      }}
    />
  );
};

export default TrainingPrograms;
