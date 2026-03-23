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

  // Only run animations after mount — but refs are always attached to the DOM
  // so stats are never hidden waiting for animation setup
  useAnimation({
    ref: leftSide,
    type: mounted ? "slide-up" : "none",
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
  const additionalTextChild = childrenArray.find(
    (c) => c.type === Impact.AdditionalText,
  );
  const subtitleChild = childrenArray.find((c) => c.type === Impact.Subtitle);
  const descriptionChild = childrenArray.find(
    (c) => c.type === Impact.Description,
  );
  const statsChild = childrenArray.find((c) => c.type === Impact.Stats);

  const finalTitle = title || titleChild;
  const finalSubtitle = subtitle || subtitleChild;
  const finalDescription = description || descriptionChild;
  const finalAdditionalText = additionalText || additionalTextChild;
  const finalStats = stats || statsChild;

  // Single render path — refs always attach to real DOM nodes.
  // Pattern + animations are skipped pre-mount but content is always visible.
  return (
    <section
      id="impact"
      className={`relative overflow-hidden ${className}`}
      suppressHydrationWarning
    >
      {/* Pattern only after mount to avoid SSR mismatch */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
          <PatternBackground
            direction={patternDirection}
            translateY={patternTranslateY}
            opacity={patternOpacity}
          />
        </div>
      )}

      <div className="main-container" suppressHydrationWarning>
        {/* Title & Additional Text */}
        <div
          className={`mb-12 md:mb-16 lg:mb-20 ${isRTL ? "text-right" : "text-left"}`}
          suppressHydrationWarning
        >
          {finalTitle && (
            <div className={`${titleClassName} text-center md:text-start`}>
              {finalTitle}
            </div>
          )}
          <div className="text-center md:text-start">{finalAdditionalText}</div>
        </div>

        <div
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-10 lg:gap-12"
          suppressHydrationWarning
        >
          {/* Left: Subtitle & Description — ref always attached */}
          <div
            ref={leftSide}
            className={`w-full lg:w-1/2 ${isRTL ? "text-right" : "text-left"}`}
            suppressHydrationWarning
          >
            {finalSubtitle && (
              <div className={subtitleClassName}>{finalSubtitle}</div>
            )}
            {finalDescription && (
              <div
                className={`${descriptionClassName} text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8 max-w-xl`}
              >
                {finalDescription}
              </div>
            )}
          </div>

          {/* Right: Stats — ref always attached, never conditionally hidden */}
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

// ── Sub-components ────────────────────────────────────────────────────────────

Impact.Title = function ImpactTitle({ children, className = "" }) {
  return (
    <h2 className={`font-bold tracking-tight ${className}`}>{children}</h2>
  );
};

Impact.AdditionalText = function ImpactAdditionalText({
  children,
  className = "",
}) {
  return (
    <h3
      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mt-3 md:mt-4 lg:mt-5 ${className}`}
    >
      {children}
    </h3>
  );
};

Impact.Subtitle = function ImpactSubtitle({ children, className = "" }) {
  const { isRTL } = useRTL();
  return (
    <h3 className={`mb-4 md:mb-6 lg:mb-8 ${className}`}>
      <div
        className={`text-white font-medium text-lg md:text-xl lg:text-2xl ${isRTL ? "space-y-8 leading-8" : "space-y-4"}`}
      >
        {children}
      </div>
    </h3>
  );
};

Impact.Description = function ImpactDescription({ children, className = "" }) {
  return (
    <p
      className={`text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-8 max-w-xl ${className}`}
    >
      {children}
    </p>
  );
};

const parseStatValue = (value) => {
  const raw = String(value ?? "");
  const match = raw.match(/-?\d[\d,.]*/);

  if (!match) {
    return null;
  }

  const numericText = match[0];
  const normalized = numericText.replace(/,/g, "");
  const target = Number(normalized);

  if (!Number.isFinite(target)) {
    return null;
  }

  const decimalPart = normalized.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;

  return {
    raw,
    prefix: raw.slice(0, match.index),
    suffix: raw.slice((match.index || 0) + numericText.length),
    target,
    decimals,
  };
};

const formatAnimatedStatValue = (parsed, currentValue, language) => {
  if (!parsed) {
    return String(currentValue ?? "");
  }

  const roundedValue =
    parsed.decimals > 0
      ? Number(currentValue.toFixed(parsed.decimals))
      : Math.round(currentValue);

  const formattedNumber = new Intl.NumberFormat(language || "en", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  }).format(roundedValue);

  return `${parsed.prefix}${formattedNumber}${parsed.suffix}`;
};

Impact.Stats = function ImpactStats({ stats, className = "" }) {
  const { i18n } = useTranslation();
  const statsRef = useRef(null);
  const rafRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [displayValues, setDisplayValues] = useState(() =>
    (stats || []).map((stat) => String(stat?.value ?? "")),
  );

  useEffect(() => {
    setDisplayValues((stats || []).map((stat) => String(stat?.value ?? "")));
    hasAnimatedRef.current = false;
  }, [stats]);

  useEffect(() => {
    const parsedStats = (stats || []).map((stat) =>
      parseStatValue(stat?.value),
    );

    const hasNumericStats = parsedStats.some(Boolean);
    if (!hasNumericStats || !statsRef.current) {
      return;
    }

    const durationMs = 1400;

    const animateCount = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const nextValues = (stats || []).map((stat, index) => {
          const parsed = parsedStats[index];

          if (!parsed) {
            return String(stat?.value ?? "");
          }

          const current = parsed.target * easedProgress;
          return formatAnimatedStatValue(parsed, current, i18n?.language);
        });

        setDisplayValues(nextValues);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }

        setDisplayValues(
          (stats || []).map((stat) => String(stat?.value ?? "")),
        );
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        animateCount();
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(statsRef.current);

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [stats, i18n?.language]);

  return (
    <section
      ref={statsRef}
      className={`grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-5 pb-16 md:pb-20 lg:pb-24 pt-8 md:pt-10 lg:pt-12 relative overflow-hidden ${className}`}
    >
      {stats?.map((stat, index) => (
        <div key={stat.id} className="flex items-center gap-3 md:gap-4">
          <div className="text-brand-orange shrink-0">
            {React.cloneElement(stat.icon, {
              className:
                "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10",
            })}
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-brand-orange">
              {displayValues[index] ?? stat.value}
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
