"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Stars from "./Stars";
import { cn } from "@/lib/utils";

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  full: "max-w-full",
};

const alignClasses = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export default function SectionHeader({
  title,
  subtitle,
  description,
  starsCount = 25,
  maxWidth = "4xl",
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  withAnimation = true,
  animationDelay = 0,
}) {
  const headerRef = useRef(null);

  useScrollReveal({
    ref: headerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
    delay: animationDelay,
    disabled: !withAnimation,
  });

  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (typeof subtitle === "string") {
      return (
        <h3
          className={cn(
            "font-bold mb-6 md:mb-8 lg:mb-10 leading-tight",
            subtitleClassName,
          )}
        >
          {subtitle}
        </h3>
      );
    }

    // معالجة highlightedWords إذا كانت مصفوفة من الكائنات
    if (subtitle.highlightedWords && Array.isArray(subtitle.highlightedWords)) {
      return (
        <h3
          className={cn(
            "font-bold mb-6 md:mb-8 lg:mb-10 leading-tight text-xl md:text-2xl lg:text-3xl",
            subtitleClassName,
          )}
        >
          {subtitle.prefix && <span>{subtitle.prefix} </span>}
          {subtitle.highlightedWords.map((word, idx) => (
            <span
              key={idx}
              className={`${word.color || 'text-brand-sky'} text-3xl md:text-4xl lg:text-5xl font-bold`}
            >
              {word.text}{" "}
            </span>
          ))}
          {subtitle.suffix && <span>{subtitle.suffix}</span>}
        </h3>
      );
    }

    return null;
  };

  return (
    <div
      ref={headerRef}
      className={cn(
        "relative w-full",
        alignClasses[align],
        maxWidthClasses[maxWidth],
        className,
      )}
    >
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      {/* العنوان الرئيسي */}
      <h2
        className={cn(
          "text-brand-white font-bold mb-3 md:mb-4 tracking-wide",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {/* العنوان الفرعي */}
      {renderSubtitle()}

      {/* الوصف */}
      {description && (
        <div className={cn("relative w-full", descriptionClassName)}>
          <div className="space-y-2 md:space-y-3">
            {Array.isArray(description) ? (
              description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}