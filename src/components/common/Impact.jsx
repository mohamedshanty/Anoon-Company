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

  title,
  subtitle,
  description,
  additionalText,
  stats,
}) {
  const { i18n, ready } = useTranslation();
  const { isRTL, dir } = useRTL();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leftSide = useRef(null);
  const statsContainerRef = useRef(null);

  useAnimation({
    ref: leftSide,
    type: "slide-up",
    stagger: 0.15,
    disabled: !mounted,
  });

  useAnimation({
    ref: statsContainerRef,
    type: mounted ? (isRTL ? "slide-right" : "slide-left") : "none",
    stagger: 0.15,
    start: "top 70%",
    disabled: !mounted,
  });

  const childrenArray = React.Children.toArray(children);
  const titleChild = childrenArray.find((c) => c.type === Impact.Title);
  const additionalTextChild = childrenArray.find((c) => c.type === Impact.AdditionalText);
  const subtitleChild = childrenArray.find((c) => c.type === Impact.Subtitle);
  const descriptionChild = childrenArray.find((c) => c.type === Impact.Description);
  const statsChild = childrenArray.find((c) => c.type === Impact.Stats);

  const finalTitle = title || titleChild;
  const finalSubtitle = subtitle || subtitleChild;
  const finalDescription = description || descriptionChild;
  const finalAdditionalText = additionalText || additionalTextChild;
  const finalStats = stats || statsChild;

  if (!mounted || !ready) {
    return (
      <section className={`relative overflow-hidden ${className}`}>
        <div className="main-container">
          <div className="mb-12 md:mb-16 lg:mb-20 text-left">
            {finalTitle}
            {finalAdditionalText}
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-12">
            <div className="w-full lg:w-1/2 text-left">
              {finalSubtitle}
              {finalDescription}
            </div>
            <div className="w-full lg:w-1/2">
              {finalStats}
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
          className={`mb-12 md:mb-16 lg:mb-20 ${isRTL ? "text-right" : "text-left"}`}
          suppressHydrationWarning
        >
          {finalTitle && (
            <div className={`${titleClassName} text-center md:text-start`}>
              {finalTitle}
            </div>
          )}
          <div className="text-center md:text-start">
            {finalAdditionalText}
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-12"
          suppressHydrationWarning
        >
          {/* Main Content Side (Subtitle & Description) */}
          <div
            ref={leftSide}
            className={`w-full lg:w-1/2 ${isRTL ? "text-right" : "text-left"}`}
            suppressHydrationWarning
          >
            {finalSubtitle && (
              <div className={subtitleClassName}>
                {finalSubtitle}
              </div>
            )}
            {finalDescription && (
              <div className={`${descriptionClassName} text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8 max-w-xl`}>
                {finalDescription}
              </div>
            )}
          </div>

          {/* Stats Side */}
          <div
            ref={statsContainerRef}
            className="w-full lg:w-1/2"
            suppressHydrationWarning
          >
            {finalStats}
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-components للتوافق مع الاستخدام القديم
Impact.Title = function ImpactTitle({ children, className = "" }) {
  return (
    <h2 className={`font-bold tracking-tight ${className}`}>
      {children}
    </h2>
  );
};

Impact.AdditionalText = function ImpactAdditionalText({ children, className = "" }) {
  return (
    <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mt-3 md:mt-4 lg:mt-5 ${className}`}>
      {children}
    </h3>
  );
};

Impact.Subtitle = function ImpactSubtitle({ children, className = "" }) {
  return (
    <h3 className={`mb-4 md:mb-6 lg:mb-8 ${className}`}>
      <div className="text-white font-medium text-lg md:text-xl lg:text-2xl">
        {children}
      </div>
    </h3>
  );
};

Impact.Description = function ImpactDescription({ children, className = "" }) {
  return (
    <p className={`text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8 max-w-xl ${className}`}>
      {children}
    </p>
  );
};

Impact.Stats = function ImpactStats({ stats, className = "" }) {
  return (
    <section className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-5 pb-16 md:pb-20 lg:pb-24 pt-8 md:pt-10 lg:pt-12 relative overflow-hidden ${className}`}>
      {stats?.map((stat) => (
        <div key={stat.id} className="flex items-center gap-3 md:gap-4">
          <div className="text-brand-orange shrink-0">
            {React.cloneElement(stat.icon, {
              className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10",
            })}
          </div>
          <div>
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