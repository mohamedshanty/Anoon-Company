"use client";

import InfoSection from "@/components/common/InfoSection";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";

const SpaceNoonProblemSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <InfoSection
      id="space-noon-problem"
      layout="image-left"
      backgroundGlow="orange"
      image="/images/problem.png"
      imageAlt={t("space_noon.problem.image_alt", "Problem illustration")}
    >
      <InfoSection.Header>
        <InfoSection.Title>
          <div className={`space-y-6 pt-10 ${isRTL ? 'text-right' : ''}`}>
            <h1 className={`text-5xl md:text-6xl font-semibold leading-17 text-brand-sky ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? (
                <>
                  <span className="text-red-400">{t("space_noon.problem.highlight", "المشكلة")}</span>{" "}
                  {t("space_noon.problem.title_line2_part1", "التي")}{" "}
                  {t("space_noon.problem.title_line2_part2", "تواجهنا")}
                  {t("space_noon.problem.question_mark", "؟؟")}
                </>
              ) : (
                <>
                  {t("space_noon.problem.title_line2_part1", "The")}{" "}
                  <span className="text-red-400">{t("space_noon.problem.highlight", "Problem")}</span>{" "}
                  {t("space_noon.problem.title_line2_part2", "That Face Us")}
                  {t("space_noon.problem.question_mark", "??")}
                </>
              )}
            </h1>
          </div>
        </InfoSection.Title>
      </InfoSection.Header>

      <InfoSection.Description className={`text-white/80 max-w-2xl mt-8 text-xl leading-relaxed ${isRTL ? 'text-right' : ''}`}>
        {t("space_noon.problem.description", "We don't have the place that have all what student & Freelancer needs, starting from quiet place, to standard electricity, we don't have the networking event in good prices")}
      </InfoSection.Description>
    </InfoSection>
  );
};

export default SpaceNoonProblemSection;