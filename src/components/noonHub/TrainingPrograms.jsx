"use client";

import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import TrainingProgramsSection from "../common/TrainingProgramsSection";

const TrainingPrograms = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  // ✅ أضف كل دورة جديدة هنا — ستظهر تلقائياً في الـ Swiper
  const courses = [
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

    // ── أضف الدورات الجديدة هنا ──────────────────────────────────────────
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
    // ─────────────────────────────────────────────────────────────────────
  ];

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
      showOnlyFirstCard={true} // 👈 أضف هذا السطر لعرض بطاقة واحدة فقط
    />
  );
};

export default TrainingPrograms;
