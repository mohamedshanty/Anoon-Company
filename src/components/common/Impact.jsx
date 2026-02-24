"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";
import { useTranslation } from "react-i18next";

export default function Impact({
  children,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  descriptionClassName = "",
  patternDirection = "diagonal",
  patternOpacity = "opacity-100",
  patternTranslateY = "-translate-y-30",
}) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const leftSide = useRef(null);
  const statsContainerRef = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
  });

  useScrollReveal({
    ref: statsContainerRef,
    // Symmetric animation: stats slide in from the outside edge
    animation: isRTL ? "slide-right" : "slide-left",
    isChildren: true,
    stagger: 0.15,
    start: "top 70%",
  });

  // Find components
  const childrenArray = React.Children.toArray(children);
  const title = childrenArray.find((c) => c.type === Impact.Title);
  const additionalText = childrenArray.find(
    (c) => c.type === Impact.AdditionalText,
  );
  const subtitle = childrenArray.find((c) => c.type === Impact.Subtitle);
  const description = childrenArray.find((c) => c.type === Impact.Description);
  const stats = childrenArray.find((c) => c.type === Impact.Stats);

  return (
    <section id="impact" className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction={patternDirection}
          translateY={patternTranslateY}
          opacity={patternOpacity}
        />
      </div>

      <div className="main-container">
        {/* Title & Additional Text Section */}
        <div
          className={`mb-12 md:mb-16 lg:mb-20 ${isRTL ? "text-right" : "text-left"}`}
        >
          {title
            ? React.cloneElement(title, {
              className: `${titleClassName} ${title.props.className || ""}`,
            })
            : null}
          {additionalText}
        </div>

        <div
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-12"
        >
          {/* Main Content Side (Subtitle & Description) */}
          <div
            ref={leftSide}
            className={`w-full lg:w-1/2 ${isRTL ? "text-right" : "text-left"}`}
          >
            {subtitle
              ? React.cloneElement(subtitle, {
                className: `${subtitleClassName} ${subtitle.props.className || ""
                  }`,
              })
              : null}
            {description
              ? React.cloneElement(description, {
                className: `${descriptionClassName} ${description.props.className || ""
                  }`,
              })
              : null}
          </div>

          {/* Stats Side */}
          <div ref={statsContainerRef} className="w-full lg:w-1/2">
            {stats}
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-components
Impact.Title = function ImpactTitle({ children, className = "" }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <h2
      data-impact="title"
      className={`font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${className} ${isRTL ? "rtl" : ""
        }`}
    >
      {children}
    </h2>
  );
};

Impact.AdditionalText = function ImpactAdditionalText({
  children,
  className = "",
}) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <h2
      data-impact="additional"
      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mt-3 md:mt-4 lg:mt-5 ${className} ${isRTL ? "rtl" : ""
        }`}
    >
      {children}
    </h2>
  );
};

Impact.Subtitle = function ImpactSubtitle({ children, className = "" }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <h4
      data-impact="subtitle"
      className={`mb-4 md:mb-6 lg:mb-8 ${className}`}
    >
      <div
        className={`text-white font-medium text-lg md:text-xl lg:text-2xl ${isRTL ? "text-right" : "text-left"}`}
      >
        {children}
      </div>
    </h4>
  );
};

Impact.Description = function ImpactDescription({ children, className = "" }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <p
      data-impact="description"
      className={`text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8 max-w-xl ${className} ${isRTL ? "rtl text-right" : ""
        }`}
    >
      {children}
    </p>
  );
};

Impact.Stats = function ImpactStats({ stats, className = "" }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section
      data-impact="stats"
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-5 pb-16 md:pb-20 lg:pb-24 pt-8 md:pt-10 lg:pt-12 relative overflow-hidden ${className}`}
    >
      {stats &&
        stats.map((stat) => (
          <div
            key={stat.id}
            data-impact="stat"
            className="flex items-center gap-3 md:gap-4"
          >
            <div className="text-brand-orange shrink-0">
              {React.cloneElement(stat.icon, {
                className:
                  "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10",
              })}
            </div>
            <div className={isRTL ? "text-right" : ""}>
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                {stat.value}
              </div>
              <div className="text-lg font-light text-brand-sky">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};
