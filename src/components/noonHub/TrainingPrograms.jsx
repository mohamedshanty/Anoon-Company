"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import TrainingProgramsSection from "../common/TrainingProgramsSection";

const TrainingPrograms = () => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useRTL();
  const [dbCourses, setDbCourses] = useState(null);

  useEffect(() => {
    fetch("/api/admin/training-programs")
      .then((r) => r.json())
      .then((json) => setDbCourses(json.programs || []))
      .catch(() => setDbCourses([]));
  }, []);

  const fallbackCourses = [
    {
      title: t(
        "noon_hub.tech_training.training.card.title",
        "Graphic Design Course",
      ),
      description: t(
        "noon_hub.tech_training.training.card.description",
        "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software for the business.",
      ),
      imageSrc: "/images/trainingPrograms.png",
      imageAlt: t(
        "noon_hub.tech_training.training.card.image_alt",
        "Graphic Design Course",
      ),
      buttonText: t("noon_hub.tech_training.training.card.button", "Visit Us"),
      buttonColor: "sky",
      buttonHref: "/spaceNoonTraining",
    },
    {
      title: t(
        "noon_hub.tech_training.training.card.title",
        "Graphic Design Course",
      ),
      description: t(
        "noon_hub.tech_training.training.card.description",
        "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software for the business.",
      ),
      imageSrc: "/images/webDev.png",
      imageAlt: "Web Development Course",
      buttonText: t("noon_hub.tech_training.training.card2.button", "Visit Us"),
      buttonColor: "sky",
      buttonHref: "/webDevTraining",
    },
  ];

  const courses =
    dbCourses && dbCourses.length > 0
      ? dbCourses.map((program) => ({
          title: isRTL && program.title_ar ? program.title_ar : program.title,
          description:
            isRTL && program.description_ar
              ? program.description_ar
              : program.description,
          imageSrc: program.image_url || "/images/trainingPrograms.png",
          imageAlt: program.title,
          buttonText:
            (isRTL && program.button_text_ar
              ? program.button_text_ar
              : program.button_text) ||
            t("noon_hub.tech_training.training.card.button", "Visit Us"),
          buttonColor: "sky",
          buttonHref: program.button_href || "/spaceNoonTraining",
        }))
      : fallbackCourses;

  return (
    <TrainingProgramsSection
      title={t("noon_hub.tech_training.training.title", "Training Programs")}
      subtitleHighlightedWords={[
        {
          text: t("noon_hub.tech_training.training.subtitle_words.0", "Your"),
          color: "text-brand-sky",
        },
        {
          text: t("noon_hub.tech_training.training.subtitle_words.1", "Way"),
          color: "text-brand-orange",
        },
        {
          text: t(
            "noon_hub.tech_training.training.subtitle_words.2",
            "For The",
          ),
          color: "text-brand-sky",
        },
        {
          text: t(
            "noon_hub.tech_training.training.subtitle_words.3",
            "Market Need",
          ),
          color: "text-brand-orange",
        },
      ]}
      description={[
        t(
          "noon_hub.tech_training.training.description",
          "We give you the tools you need to start your journey as graphic design, from the design fundamental, using the professional software.",
        ),
      ]}
      cards={courses}
      isRTL={isRTL}
    />
  );
};

export default TrainingPrograms;
