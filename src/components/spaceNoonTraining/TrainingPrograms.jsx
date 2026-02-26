"use client";

import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import TrainingProgramsSection from "../common/TrainingProgramsSection";

const TrainingPrograms = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <TrainingProgramsSection
      title={t("tech_training.training.title", "Our Training Programs")}
      subtitleHighlightedWords={[
        { text: t("tech_training.training.subtitle_words.0", "Tailor"), color: "text-brand-sky" },
        { text: t("tech_training.training.subtitle_words.1", "Crafted"), color: "text-brand-orange" },
        { text: t("tech_training.training.subtitle_words.2", "For The"), color: "text-brand-sky" },
        { text: t("tech_training.training.subtitle_words.3", "Tech Sector"), color: "text-brand-orange" },
      ]}
      description={[
        t("tech_training.training.description", "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software for the business, and we give you the guidance for showcasing your portfolio and the freelance to start your journey not just a skills."),
      ]}
      cardProps={{
        title: t("tech_training.training.card.title", "Graphic Design Course"),
        description: t("tech_training.training.card.description", "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software for the business, and we give you the guidance for showcasing your portfolio and the freelance to start your journey not just a skills."),
        imageSrc: "/images/trainingPrograms.png",
        imageAlt: t("tech_training.training.card.image_alt", "Graphic Design Course"),
        buttonText: t("tech_training.training.card.button", "Visit Us"),
        buttonColor: "sky",
        buttonHref: "/spaceNoonTraining",
      }}
      isRTL={isRTL}
    />
  );
};

export default TrainingPrograms;