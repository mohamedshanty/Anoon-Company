"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";
import Button from "../ui/Button";

export default function InfoSection({
  children,
  id,
  patternDirection = "default",
  layout = "image-right",
  showPattern = true,
  backgroundGlow = "default",
  customClass = "",
  image,
  imageAlt = "Section image",
}) {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const secondTextRef = useRef(null);
  const ctaRef = useRef(null);

  useScrollReveal({
    ref: textRef,
    animation: layout === "image-left" ? "slide-right" : "slide-left",
  });
  useScrollReveal({
    ref: imageRef,
    animation: layout === "image-left" ? "slide-left" : "slide-right",
  });
  useScrollReveal({
    ref: featuresRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.2,
    start: "top 70%",
  });
  useScrollReveal({ ref: secondTextRef, animation: "fade-in", delay: 0.3 });
  useScrollReveal({ ref: ctaRef, animation: "fade-in", delay: 0.4 });

  const glowClasses = {
    default:
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-blue/5 before:to-transparent",
    orange:
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-orange/5 before:to-transparent",
    blue: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-sky/5 before:to-transparent",
    none: "",
  };

  const layoutClasses = {
    "image-right": "flex-col lg:flex-row",
    "image-left": "flex-col lg:flex-row-reverse",
    centered: "flex-col items-center text-center",
    split: "grid lg:grid-cols-2 gap-12",
  };

  return (
    <section
      id={id}
      className={`pb-24 pt-12 relative overflow-hidden ${glowClasses[backgroundGlow]} ${customClass}`}
    >
      {showPattern && <PatternBackground direction={patternDirection} />}

      <div className="main-container">
        <div
          className={`flex ${layoutClasses[layout]} items-start gap-12 lg:gap-16`}
        >
          {/* النص الرئيسي */}
          <div
            ref={textRef}
            className={`space-y-6 pt-10 ${layout === "centered" ? "lg:w-3/4 mx-auto" : "lg:w-1/2"}`}
            data-info="text-content"
          >
            {React.Children.map(children, (child) => {
              if (child?.type === InfoSection.Features) {
                return React.cloneElement(child, { ref: featuresRef });
              }
              if (child?.type === InfoSection.CTA) {
                return React.cloneElement(child, { ctaRef });
              }
              return child;
            })}
          </div>

          {/* الصورة */}
          {image && layout !== "centered" && (
            <div ref={imageRef} className="lg:w-1/2 flex justify-start">
              <div className="relative w-[550px] h-[550px] xl:w-[600px] xl:h-[600px]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    console.log("Error loading image:", image);
                    console.log("Image path:", e.target.src);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Sub-components
InfoSection.Header = function InfoHeader({ children, className = "" }) {
  return (
    <div data-info="header" className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
};

InfoSection.Subtitle = function InfoSubtitle({ children, className = "" }) {
  return (
    <h2
      data-info="subtitle"
      className={`font-semibold tracking-[1px] text-brand-orange ${className}`}
    >
      {children}
    </h2>
  );
};

InfoSection.Title = function InfoTitle({ children, className = "" }) {
  return (
    <div data-info="title" className={`space-y-1 ${className}`}>
      {children}
    </div>
  );
};

InfoSection.TitleLine = function InfoTitleLine({
  children,
  text,
  highlight,
  highlightColor = "text-brand-orange",
  textAfter,
  color = "text-brand-sky",
  className = "",
}) {
  return (
    <h4 className={`font-bold leading-tight text-4xl ${className}`}>
      {text && <span className={color}>{text} </span>}
      {highlight && <span className={highlightColor}>{highlight}</span>}
      {textAfter && <span className={color}> {textAfter}</span>}
      {children}
    </h4>
  );
};

InfoSection.Description = function InfoDescription({
  children,
  className = "",
}) {
  return (
    <p
      data-info="description"
      className={`text-lg leading-[1.6] max-w-xl text-white/80 ${className}`}
    >
      {children}
    </p>
  );
};

InfoSection.Features = React.forwardRef(function InfoFeatures(
  { children, className = "" },
  ref,
) {
  return (
    <div
      data-info="features"
      ref={ref}
      className={`grid sm:grid-cols-2 gap-8 pt-4 ${className}`}
    >
      {children}
    </div>
  );
});

InfoSection.Feature = function InfoFeature({
  icon,
  title,
  text,
  color = "text-brand-sky",
  ctaText = "Know More",
  onCtaClick,
  className = "",
}) {
  return (
    <div className={`flex items-start gap-8 ${className}`}>
      {icon && (
        <div className="mt-1 pt-4 shrink-0">
          <Image src={icon} alt={title} width={60} height={60} />
        </div>
      )}
      <div>
        <h4 className={`text-xl font-bold mb-2 ${color}`}>{title}</h4>
        <p className="text-brand-white/70 text-sm mb-4">{text}</p>
        <button
          onClick={onCtaClick}
          className={`font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer ${color}`}
        >
          {ctaText} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

InfoSection.CTA = function InfoCTA({
  children,
  ctaText = "Know More",
  variant = "outline",
  color = "sky",
  onClick,
  className = "",
  ctaRef,
}) {
  return (
    <div data-info="cta" ref={ctaRef} className={`pt-4 ${className}`}>
      {variant === "outline" ? (
        <Button variant="outline" color={color} onClick={onClick}>
          <span className="relative z-10 flex items-center gap-2">
            {ctaText}
          </span>
        </Button>
      ) : variant === "link" ? (
        <button
          onClick={onClick}
          className={`font-bold text-base flex items-center gap-2 hover:gap-3 transition-all cursor-pointer ${
            color === "orange" ? "text-brand-orange" : "text-brand-sky"
          }`}
        >
          {ctaText} <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onClick}
          className={`font-bold text-brand-orange text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer ${className}`}
        >
          {ctaText} <ChevronRight className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  );
};
