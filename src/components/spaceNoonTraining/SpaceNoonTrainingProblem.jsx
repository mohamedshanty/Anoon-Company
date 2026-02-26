"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";

const SpaceNoonTrainingProblemSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <InfoSection
      id="space-noon-problem"
      layout="image-right"
      backgroundGlow="orange"
      image="/images/SpaceNoonTraining.png"
      imageAlt={t("tech_training.problem.image_alt", "Problem illustration")}
    >
      <InfoSection.Header>
        <InfoSection.Title>
          <div className={`space-y-6 pt-10 ${isRTL ? 'text-right' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-semibold text-brand-white">
              {t("tech_training.problem.title_line1", "What is")}
            </h1>
            <h1 className={`text-5xl md:text-6xl font-semibold leading-17 text-brand-sky ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? (
                // ترتيب عربي: المشكلة التي تواجهنا؟؟
                <>
                  <span className="text-red-400">{t("tech_training.problem.highlight", "المشكلة")}</span>{" "}
                  {t("tech_training.problem.title_line2_part1", "التي")}{" "}
                  {t("tech_training.problem.title_line2_part2", "تواجهنا")}
                  {t("tech_training.problem.question_mark", "؟؟")}
                </>
              ) : (
                // ترتيب إنجليزي: The Problem That Face Us ??
                <>
                  {t("tech_training.problem.title_line2_part1", "The")}{" "}
                  <span className="text-red-400">{t("tech_training.problem.highlight", "Problem")}</span>{" "}
                  {t("tech_training.problem.title_line2_part2", "That Face Us")}
                  {t("tech_training.problem.question_mark", "??")}
                </>
              )}
            </h1>
          </div>
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className={`text-white/80 max-w-2xl mt-8 text-xl leading-relaxed ${isRTL ? 'text-right' : ''}`}>
        {t("tech_training.problem.description", "We have a generation that have suffered from the war financially and don't have any skill but the desire and the capability to learn.")}
      </InfoSection.Description>
    </InfoSection>
  );
};

export default SpaceNoonTrainingProblemSection;