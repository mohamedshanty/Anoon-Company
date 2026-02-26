"use client";

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
  isRTL = false,
}) => {

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      <div className="main-container flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={{
            highlightedWords: subtitleHighlightedWords,
          }}
          description={description}
          starsCount={starsCount}
          maxWidth={maxWidth}
          align={align}
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <div className="mt-8 sm:mt-10 md:mt-12">
          <TrainingProgramCard
            {...cardProps}
            isRTL={isRTL}
          />
        </div>
      </div>
    </section>
  );
};

export default TrainingProgramsSection;