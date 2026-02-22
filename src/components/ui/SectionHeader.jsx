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

    return (
      <h3
        className={cn(
          "text-2xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight whitespace-nowrap",
          subtitleClassName,
        )}
      >
        {subtitle.prefix && <span>{subtitle.prefix} </span>}
        {subtitle.highlightedWords.map((word, idx) => (
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
        "mb-20 relative",
        alignClasses[align],
        maxWidthClasses[maxWidth],
        className,
      )}
    >
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      <h1
        className={cn(
          "text-brand-white font-bold text-6xl md:text-5xl mb-6 block tracking-tight",
          titleClassName,
        )}
      >
        {title}
      </h1>

      {renderSubtitle()}

      <div
        className={cn(
          "text-brand-white/80 text-lg md:text-xl font-medium leading-relaxed",
          descriptionClassName,
        )}
      >
        {description.map((line, idx) => (
          <p key={idx} className={idx < description.length - 1 ? "mb-2" : ""}>
            {line}
            {idx < description.length - 1 && <br className="hidden md:block" />}
          </p>
        ))}
      </div>
    </div>
  );
}
