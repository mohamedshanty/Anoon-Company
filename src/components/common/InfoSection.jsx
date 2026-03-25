import React from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "../ui/Button";
import PatternBackground from "../ui/PatternBackground";
import Reveal from "../ui/Reveal";
import Link from "next/link";

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
  imagePriority = false,
}) {
  const layoutClasses = {
    "image-right": "flex-col lg:flex-row",
    "image-left": "flex-col lg:flex-row-reverse",
    centered: "flex-col items-center text-center",
  };

  const glowClasses = {
    default: "bg-glow-default",
    orange: "bg-glow-orange",
    blue: "bg-glow-blue",
  };

  return (
    <section
      id={id}
      className={`pb-16 md:pb-20 lg:pb-24 pt-8 md:pt-10 lg:pt-12 relative overflow-hidden ${glowClasses[backgroundGlow]} ${customClass}`}
    >
      {showPattern && (
        <PatternBackground
          direction={patternDirection}
          priority={imagePriority}
        />
      )}

      <div className="main-container">
        <div
          className={`flex ${layoutClasses[layout]} items-center xl:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-16`}
        >
          {/* Main text */}
          <Reveal
            type={layout === "image-left" ? "slide-right" : "slide-left"}
            className={`space-y-4 md:space-y-5 lg:space-y-6 pt-4 md:pt-6 lg:pt-8 xl:pt-10 ${layout === "centered" ? "lg:w-3/4 mx-auto" : "w-full lg:w-1/2"}`}
          >
            {children}
          </Reveal>

          {/* Image */}
          {image && layout !== "centered" && (
            <Reveal
              type={layout === "image-left" ? "slide-left" : "slide-right"}
              className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            >
              <div className="relative w-70 h-70 sm:w-87.5 sm:h-87.5 md:w-100 md:h-100 lg:w-112.5 lg:h-112.5 xl:w-125 xl:h-125 2xl:w-137.5 2xl:h-137.5">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, (max-width: 1536px) 500px, 550px"
                  priority={imagePriority}
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

// Sub-components as individual Server Components
InfoSection.Header = ({ children, className = "" }) => (
  <div className={`space-y-2 md:space-y-3 lg:space-y-4 ${className}`}>
    {children}
  </div>
);

InfoSection.Subtitle = ({ children, className = "" }) => (
  <p
    className={`font-semibold tracking-[1px] text-brand-orange text-sm md:text-base ${className}`}
  >
    {children}
  </p>
);

InfoSection.Title = ({ children, className = "" }) => (
  <div className={`space-y-1 ${className}`}>{children}</div>
);

InfoSection.TitleLine = ({
  children,
  text,
  highlight,
  highlightColor = "text-brand-orange",
  textAfter,
  color = "text-brand-sky",
  className = "",
}) => (
  <h2
    className={`font-semibold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-3xl ${className}`}
  >
    {text && <span className={color}>{text} </span>}
    {highlight && <span className={highlightColor}>{highlight}</span>}
    {textAfter && <span className={color}> {textAfter}</span>}
    {children}
  </h2>
);

InfoSection.Description = ({ children, className = "" }) => (
  <p
    className={`text-sm sm:text-base md:text-lg leading-[1.6] max-w-xl text-white/80 ${className}`}
  >
    {children}
  </p>
);

InfoSection.Features = ({ children, className = "" }) => (
  <Reveal type="slide-up" stagger={0.2}>
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-8 pt-3 md:pt-4 ${className}`}
    >
      {children}
    </div>
  </Reveal>
);

InfoSection.Feature = ({
  icon,
  title,
  text,
  color = "text-brand-sky",
  ctaText = "Know More",
  onCtaClick,
  className = "",
  href,
  isRTL = false,
}) => (
  <div
    className={`flex items-start gap-3 md:gap-4 lg:gap-5 xl:gap-8 ${className}`}
  >
    {icon && (
      <div className="mt-1 pt-1 md:pt-2 lg:pt-3 xl:pt-4 shrink-0">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="md:w-10 md:h-10 lg:w-12.5 lg:h-12.5 xl:w-15 xl:h-15"
        />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <h3
        className={`text-base md:text-lg lg:text-xl font-bold mb-0.5 md:mb-1 lg:mb-2 ${color}`}
      >
        {title}
      </h3>
      <p className="text-brand-white/70 text-xs mb-1 md:mb-2 lg:mb-4">{text}</p>
      <Link
        href={href || "#"}
        className={`font-bold text-xs md:text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer ${color}`}
      >
        {ctaText}{" "}
        {isRTL ? (
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
        ) : (
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        )}
      </Link>
    </div>
  </div>
);

InfoSection.CTA = ({
  children,
  ctaText = "Know More",
  variant = "outline",
  color = "sky",
  className = "",
  href,
  onClick,
  delay = 0.4,
}) => {
  const buttonSize =
    "px-4 md:px-6 lg:px-8 xl:px-10 py-1.5 md:py-2 lg:py-2.5 xl:py-3 text-xs md:text-sm lg:text-base";

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Reveal type="fade" delay={delay} className={`pt-3 md:pt-4 ${className}`}>
      {variant === "outline" ? (
        <Link href={href || "#"} onClick={handleClick}>
          <Button variant="outline" color={color} className={buttonSize}>
            {ctaText}
          </Button>
        </Link>
      ) : (
        <Link
          href={href || "#"}
          onClick={handleClick}
          className={`font-bold text-sm md:text-base flex items-center gap-1 md:gap-2 hover:gap-2 transition-all cursor-pointer ${color === "orange" ? "text-brand-orange" : "text-brand-sky"}`}
        >
          {ctaText} <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      )}
      {children}
    </Reveal>
  );
};

InfoSection.Header.displayName = "InfoSection.Header";
InfoSection.Subtitle.displayName = "InfoSection.Subtitle";
InfoSection.Title.displayName = "InfoSection.Title";
InfoSection.TitleLine.displayName = "InfoSection.TitleLine";
InfoSection.Description.displayName = "InfoSection.Description";
InfoSection.Features.displayName = "InfoSection.Features";
InfoSection.Feature.displayName = "InfoSection.Feature";
InfoSection.CTA.displayName = "InfoSection.CTA";
