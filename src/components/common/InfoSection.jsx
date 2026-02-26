"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useAnimation } from "@/hooks/useAnimation";
import Button from "../ui/Button";
import PatternBackground from "../ui/PatternBackground";

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
  const ctaRef = useRef(null);

  useAnimation({
    ref: textRef,
    type: layout === "image-left" ? "slide-right" : "slide-left",
  });
  useAnimation({
    ref: imageRef,
    type: layout === "image-left" ? "slide-left" : "slide-right",
  });
  useAnimation({
    ref: featuresRef,
    type: "slide-up",
    stagger: 0.2,
    start: "top 70%",
  });
  useAnimation({ ref: ctaRef, type: "fade", delay: 0.4 });

  const layoutClasses = {
    "image-right": "flex-col lg:flex-row",
    "image-left": "flex-col lg:flex-row-reverse",
    centered: "flex-col items-center text-center",
  };
  // Define background glow classes
  const glowClasses = {
    default: "bg-glow-default",
    orange: "bg-glow-orange",
    blue: "bg-glow-blue",
    // Add more as needed
  };

  return (
    <section
      id={id}
      className={`pb-16 md:pb-20 lg:pb-24 pt-8 md:pt-10 lg:pt-12 relative overflow-hidden ${glowClasses[backgroundGlow]} ${customClass}`}
    >
      {showPattern && <PatternBackground direction={patternDirection} />}

      <div className="main-container">
        <div
          className={`flex ${layoutClasses[layout]} items-center xl:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-16`}
        >
          {/* Main text */}
          <div
            ref={textRef}
            className={`space-y-4 md:space-y-5 lg:space-y-6 pt-4 md:pt-6 lg:pt-8 xl:pt-10 ${
              layout === "centered" ? "lg:w-3/4 mx-auto" : "w-full lg:w-1/2"
            }`}
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

          {/* Image */}
          {image && layout !== "centered" && (
            <div
              ref={imageRef}
              className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            >
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, (max-width: 1536px) 500px, 550px"
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
    <div
      data-info="header"
      className={`space-y-2 md:space-y-3 lg:space-y-4 ${className}`}
    >
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
    <h4
      className={`font-bold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl ${className}`}
    >
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
      className={`text-sm sm:text-base md:text-lg leading-[1.6] max-w-xl text-white/80 ${className}`}
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
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-8 pt-3 md:pt-4 ${className}`}
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
  href,
}) {
  return (
    <div
      className={`flex items-start gap-3 md:gap-4 lg:gap-5 xl:gap-8 ${className}`}
    >
      {icon && (
        <div className="mt-1 pt-1 md:pt-2 lg:pt-3 xl:pt-4 shrink-0">
          <Image
            src={icon}
            alt={title}
            width={35}
            height={35}
            className="md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        {" "}
        {/* min-w-0 لمنع تجاوز النص */}
        <h4
          className={`text-base md:text-lg lg:text-xl font-bold mb-0.5 md:mb-1 lg:mb-2 ${color}`}
        >
          {title}
        </h4>
        <p className="text-brand-white/70 text-xs md:text-sm mb-1 md:mb-2 lg:mb-4 line-clamp-2">
          {text}
        </p>
        <button
          href={href || "#"}
          onClick={onCtaClick}
          className={`font-bold text-xs md:text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer ${color}`}
        >
          {ctaText} <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
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
  const buttonSize =
    "px-4 md:px-6 lg:px-8 xl:px-10 py-1.5 md:py-2 lg:py-2.5 xl:py-3 text-xs md:text-sm lg:text-base";

  return (
    <div data-info="cta" ref={ctaRef} className={`pt-3 md:pt-4 ${className}`}>
      {variant === "outline" ? (
        <Button
          variant="outline"
          color={color}
          onClick={onClick}
          className={buttonSize}
        >
          <span className="relative z-10 flex items-center gap-1 md:gap-2">
            {ctaText}
          </span>
        </Button>
      ) : variant === "link" ? (
        <button
          onClick={onClick}
          className={`font-bold text-sm md:text-base flex items-center gap-1 md:gap-2 hover:gap-2 transition-all cursor-pointer ${
            color === "orange" ? "text-brand-orange" : "text-brand-sky"
          }`}
        >
          {ctaText} <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      ) : (
        <button
          onClick={onClick}
          className={`font-bold text-brand-orange text-sm md:text-base flex items-center gap-1 md:gap-2 hover:gap-2 transition-all cursor-pointer ${className}`}
        >
          {ctaText} <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      )}
      {children}
    </div>
  );
};
