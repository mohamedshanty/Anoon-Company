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
            "text-2xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight whitespace-nowrap",
            subtitleClassName,
          )}
        >
          {subtitle}
        </h3>
      );
    }

    return (
      <h3
        className={cn(
          "text-2xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight whitespace-nowrap",
          subtitleClassName,
        )}
      >
        {subtitle.prefix && <span>{subtitle.prefix} </span>}
        {subtitle.highlightedWords?.map((word, idx) => (
          <span key={idx} className={word.color}>
            {word.text}{" "}
          </span>
        ))}
        {subtitle.suffix && <span>{subtitle.suffix}</span>}
      </h3>
    );
  };

  return (
    <div
      ref={headerRef}
      className={cn(
        "relative",
        alignClasses[align],
        maxWidthClasses[maxWidth],
        className,
      )}
    >
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      {/* العنوان الرئيسي - Our Space */}
      <h2
        className={cn(
          "text-brand-white font-bold text-2xl md:text-3xl mb-4 tracking-wide",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {/* العنوان الفرعي - Your Future Network */}
      {renderSubtitle()}

      {/* الوصف مع تأثير التدرج */}
      {description && (
        <div className={cn("relative max-w-2xl mx-auto", descriptionClassName)}>
          {/* النص مع التدرج */}
          <div className="relative">
            {Array.isArray(description) ? (
              description.map((line, idx) => (
                <p
                  key={idx}
                  className={cn(
                    "text-base md:text-lg",
                    idx < description.length - 1 ? "mb-4" : "",
                  )}
                >
                  {line}
                </p>
              ))
            ) : (
              <p
                className={cn(
                  "text-base md:text-lg",
                  "bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent",
                )}
              >
                {description}
              </p>
            )}
          </div>

          {/* طبقة تدرج إضافية في الأسفل لمزيد من التأثير */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  );
}
