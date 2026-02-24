"use client"

import { LineChart, Briefcase, Star, User } from "lucide-react";
import Impact from "@/components/common/Impact";
import { useTranslation } from "react-i18next";

export default function ImpactSection() {
  const { t } = useTranslation();

  const mainPageStats = [
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
      value: "3",
      label: t("stats.courses"),
    },
    {
      id: "workspace",
      icon: <Briefcase className="text-brand-orange" />,
      value: "11",
      label: t("stats.workspace"),
    },
  ];

  return (
    <Impact patternDirection="diagonal" className="pt-10">
      <Impact.Title>
        <span className="text-brand-sky">{t("impact_page.title.first_word")}</span>
        <span className="text-brand-orange">{t("impact_page.title.second_word")}</span>
      </Impact.Title>

      <Impact.AdditionalText>
        {t("impact_page.additional_text")}
      </Impact.AdditionalText>

      <Impact.Subtitle>
        <div>{t("impact_page.subtitle.line1")}</div>
        <div className="text-brand-orange">{t("impact_page.subtitle.line2.highlight")}</div>
      </Impact.Subtitle>

      <Impact.Description>
        {t("impact_page.description")}
      </Impact.Description>

      <Impact.Stats stats={mainPageStats} />
    </Impact>
  );
}