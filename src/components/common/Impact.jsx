"use client";

import React, { useRef, useState, useEffect } from "react";
import { useAnimation } from "@/hooks/useAnimation";
import { useRTL } from "@/hooks/useRTL";
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
  const { i18n, ready } = useTranslation();
  const { isRTL, dir } = useRTL();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leftSide = useRef(null);
  const statsContainerRef = useRef(null);

  // استخدام useAnimation بشكل آمن
  useAnimation({
    ref: leftSide,
    type: "slide-up",
    stagger: 0.15,
    disabled: !mounted, // أضف disabled option في hook
  });

  useAnimation({
    ref: statsContainerRef,
    type: mounted ? (isRTL ? "slide-right" : "slide-left") : "none",
    stagger: 0.15,
    start: "top 70%",
    disabled: !mounted,
  });

  // Find components
  const childrenArray = React.Children.toArray(children);
  const title = childrenArray.find((c) => c.type === Impact.Title);
  const additionalText = childrenArray.find(
    (c) => c.type === Impact.AdditionalText
  );
  const subtitle = childrenArray.find((c) => c.type === Impact.Subtitle);
  const description = childrenArray.find((c) => c.type === Impact.Description);
  const stats = childrenArray.find((c) => c.type === Impact.Stats);

  // أثناء التحميل، اعرض نفس الهيكل ولكن بدون كلاسات RTL
  if (!mounted || !ready) {
    return (
      <section className={`relative overflow-hidden ${className}`}>
        <div className="main-container">
          <div className="mb-12 md:mb-16 lg:mb-20 text-left">
            {title}
            {additionalText}
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-12">
            <div className="w-full lg:w-1/2 text-left">
              {subtitle}
              {description}
            </div>
            <div className="w-full lg:w-1/2">
              {stats}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="impact"
      className={`relative overflow-hidden ${className}`}
      suppressHydrationWarning
    >
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction={patternDirection}
          translateY={patternTranslateY}
          opacity={patternOpacity}
        />
      </div>

      <div className="main-container" suppressHydrationWarning>
        {/* Title & Additional Text Section */}
        <div
          className={`mb-12 md:mb-16 lg:mb-20 ${isRTL ? "text-right" : "text-left"
            }`}
          suppressHydrationWarning
        >
          {title
            ? React.cloneElement(title, {
              className: `${titleClassName} ${title.props.className || ""} text-center md:text-start`,
              suppressHydrationWarning: true,
            })
            : null}
          <div className="text-center md:text-start">
            {additionalText}
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-12"
          suppressHydrationWarning
        >
          {/* Main Content Side (Subtitle & Description) */}
          <div
            ref={leftSide}
            className={`w-full lg:w-1/2 ${isRTL ? "text-right" : "text-left"
              }`}
            suppressHydrationWarning
          >
            {subtitle
              ? React.cloneElement(subtitle, {
                className: `${subtitleClassName} ${subtitle.props.className || ""}`,
                suppressHydrationWarning: true,
              })
              : null}
            {description
              ? React.cloneElement(description, {
                className: `${descriptionClassName} ${description.props.className || ""}`,
                suppressHydrationWarning: true,
              })
              : null}
          </div>

          {/* Stats Side */}
          <div
            ref={statsContainerRef}
            className="w-full lg:w-1/2"
            suppressHydrationWarning
          >
            {stats}
          </div>
        </div>
      </div>
    </section>
  );
}

Impact.Title = function ImpactTitle({ children, className = "" }) {
  return (
    <h2
      data-impact="title"
      className={`font-bold tracking-tight ${className}`}
      suppressHydrationWarning
    >
      {children}
    </h2>
  );
};

Impact.AdditionalText = function ImpactAdditionalText({
  children,
  className = "",
}) {
  return (
    <h2
      data-impact="additional"
      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mt-3 md:mt-4 lg:mt-5 ${className}`}
      suppressHydrationWarning
    >
      {children}
    </h2>
  );
};

Impact.Subtitle = function ImpactSubtitle({ children, className = "" }) {
  return (
    <h4 data-impact="subtitle" className={`mb-4 md:mb-6 lg:mb-8 ${className}`} suppressHydrationWarning>
      <div className="text-white font-medium text-lg md:text-xl lg:text-2xl" suppressHydrationWarning>
        {children}
      </div>
    </h4>
  );
};

Impact.Description = function ImpactDescription({ children, className = "" }) {
  return (
    <p
      data-impact="description"
      className={`text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8 max-w-xl ${className}`}
      suppressHydrationWarning
    >
      {children}
    </p>
  );
};

Impact.Stats = function ImpactStats({ stats, className = "" }) {
  return (
    <section
      data-impact="stats"
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-5 pb-16 md:pb-20 lg:pb-24 pt-8 md:pt-10 lg:pt-12 relative overflow-hidden ${className}`}
      suppressHydrationWarning
    >
      {stats &&
        stats.map((stat) => (
          <div
            key={stat.id}
            data-impact="stat"
            className="flex items-center gap-3 md:gap-4"
            suppressHydrationWarning
          >
            <div className="text-brand-orange shrink-0">
              {React.cloneElement(stat.icon, {
                className:
                  "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10",
              })}
            </div>
            <div suppressHydrationWarning>
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