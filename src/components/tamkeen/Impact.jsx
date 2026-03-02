"use client"

import { LineChart, Briefcase, Star, User } from "lucide-react";
import Impact from "@/components/common/Impact";
import { useTranslation } from "react-i18next";

const ImpactSection = () => {
  const { t } = useTranslation();

  const secondPageStats = [
    {
      id: "freelancers",
      icon: <User className="text-brand-orange" />,
      value: "11,000",
      label: t("stats.freelancers"),
    },
    {
      id: "success",
      icon: <Star className="text-brand-orange" />,
      value: "50 %",
      label: t("stats.success"),
    },
    {
      id: "courses",
      icon: <LineChart className="text-brand-orange" />,
      value: "3 ",
      label: t("stats.courses"),
    },
    {
      id: "workspace",
      icon: <Briefcase className="text-brand-orange" />,
      value: "400",
      label: t("tamkeen.impact.stats.yearly_student"),
    },
  ];

  return (
    <Impact patternDirection="grid" patternOpacity="opacity-75" className="pt-10">
      <Impact.Title>
        <span className="text-brand-sky">{t("impact_page.title.first_word")}</span>{" "}
        <span className="text-brand-orange">{t("impact_page.title.second_word")}</span>
      </Impact.Title>

      <Impact.Subtitle>
        <h4>{t("impact_page.subtitle.line1")}</h4>
        <h4 className="text-brand-orange">{t("impact_page.subtitle.line2.highlight")}</h4>
      </Impact.Subtitle>

      <Impact.Description>
        {t("tamkeen_impact.description")}
      </Impact.Description>

      <Impact.Stats stats={secondPageStats} />
    </Impact>
  );
};

export default ImpactSection;
