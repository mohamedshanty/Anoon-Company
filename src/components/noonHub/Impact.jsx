"use client";

import Impact from "@/components/common/Impact";
import { Users, TrendingUp, MapPin, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const ImpactSection = () => {
  const { t } = useTranslation();

  const impactStats = [
    {
      id: "freelancer-student",
      icon: <Users className="text-brand-orange" />,
      value: "11,000",
      label: t("stats.freelancers"),
    },
    {
      id: "freelancer-success",
      icon: <TrendingUp className="text-brand-orange" />,
      value: "50 %",
      label: t("stats.success"),
    },
    {
      id: "roadmap-courses",
      icon: <MapPin className="text-brand-orange" />,
      value: "3",
      label: t("stats.courses"),
    },
    {
      id: "yearly-student",
      icon: <Award className="text-brand-orange" />,
      value: "400",
      label: t("tamkeen.impact.stats.yearly_student"),
    },
  ];

  return (
    <Impact patternDirection="grid" patternOpacity="opacity-75">
      <Impact.Title>
        <span className="text-brand-sky">
          {t("impact_page.title.first_word")}
        </span>{" "}
        <span className="text-brand-orange">
          {t("impact_page.title.second_word")}
        </span>
      </Impact.Title>

      <Impact.AdditionalText>
        {t("impact_page.additional_text")}
      </Impact.AdditionalText>

      <Impact.Subtitle>
        <h4>{t("impact_page.subtitle.line1")}</h4>
        <h4 className="text-brand-orange">
          {t("impact_page.subtitle.line2.highlight")}
        </h4>
      </Impact.Subtitle>

      <Impact.Description>
        {t("noon_hub_impact.description")}
      </Impact.Description>

      <Impact.Stats stats={impactStats} />
    </Impact>
  );
};

export default ImpactSection;
