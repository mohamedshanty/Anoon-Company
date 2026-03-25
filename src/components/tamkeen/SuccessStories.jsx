"use client";

import Testimonials from "../common/Testimonials";
import SectionHeader from "../ui/SectionHeader";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";

const SuccessStories = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <section id="stories" className="py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden">
      <div className="main-container">
        <SectionHeader
          title={t("success_stories.title")}
          subtitle={{
            highlightedWords: [
              {
                text: t("success_stories.subtitle.from_the"),
                color: "text-brand-sky",
              },
              {
                text: t("success_stories.subtitle.ashes"),
                color: "text-brand-orange",
              },
              {
                text: t("success_stories.subtitle.we"),
                color: "text-brand-sky",
              },
              {
                text: t("success_stories.subtitle.rise_again"),
                color: "text-brand-orange",
              },
            ],
          }}
          description={t("success_stories.description", {
            returnObjects: true,
          })}
          starsCount={20}
          maxWidth="3xl"
          align="center"
          titleClassName="text-5xl md:text-6xl"
        />

        <div>
          <Testimonials lazyLoadImages />
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
