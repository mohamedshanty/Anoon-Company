import SectionHeader from "../ui/SectionHeader";
import Stars from "../ui/Stars";
import TrainingProgramCard from "../ui/TrainingProgramCardProps";

const TrainingProgramsSection = ({
  title,
  subtitleHighlightedWords,
  description,
  cardProps,
  starsCount = 20,
  maxWidth = "3xl",
  align = "center",
}) => {
  return (
    <section className="relative py-24 overflow-hidden">
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      <div className="main-container flex flex-col items-center">
        <SectionHeader
          title={title}
          subtitle={{
            highlightedWords: subtitleHighlightedWords,
          }}
          description={description}
          starsCount={starsCount}
          maxWidth={maxWidth}
          align={align}
          titleClassName="text-5xl md:text-6xl"
        />

        <div className="mt-12 w-full">
          <TrainingProgramCard {...cardProps} />
        </div>
      </div>
    </section>
  );
};

export default TrainingProgramsSection;
