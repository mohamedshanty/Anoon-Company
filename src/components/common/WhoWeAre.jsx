"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";
import Button from "../ui/Button";

export default function InfoSection({
  id,
  title,
  subtitle,
  headingLines,
  description,
  description2,
  image,
  features,
  patternDirection = "default",
  layout = "image-right",
  showPattern = true,
  backgroundGlow = "default",
  titleColor = "text-brand-white",
  subtitleColor = "text-brand-white",
  descriptionColor = "text-brand-white",
  customClass = "",
  ctaText = "Know More",
  showCta = false,
  showFeatures = true,
  customButton = false,
  onCtaClick,
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

  // الـ button المخصص
  const CustomButton = () => (
    <Button variant="outline" color="sky">
      <span className="relative z-10 flex items-center gap-2">{ctaText}</span>
    </Button>
  );

  return (
    <section
      id={id}
      className={`pb-24 relative overflow-hidden ${glowClasses[backgroundGlow]} ${customClass}`}
    >
      {showPattern && <PatternBackground direction={patternDirection} />}

      <div className="main-container">
        <div
          className={`flex ${layoutClasses[layout]} items-center gap-12 lg:gap-16`}
        >
          {/* النص الرئيسي */}
          <div
            ref={textRef}
            className={`space-y-8 ${layout === "centered" ? "lg:w-3/4 mx-auto" : "lg:w-1/2"}`}
          >
            <div className="space-y-4">
              {subtitle && (
                <h2 className={`font-bold tracking-[1px] ${subtitleColor}`}>
                  {subtitle}
                </h2>
              )}

              {title && (
                <h2 className={`font-bold tracking-[1px] ${titleColor}`}>
                  {title}
                </h2>
              )}

              {headingLines && (
                <div className="space-y-1">
                  {headingLines.map((line, i) => (
                    <h3
                      key={i}
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight`}
                    >
                      {/* النص قبل الـ highlight */}
                      {line.text && (
                        <span className={line.color || "text-brand-sky"}>
                          {line.text}{" "}
                        </span>
                      )}

                      {/* الكلمة المميزة */}
                      {line.highlight && (
                        <span
                          className={line.highlightColor || "text-brand-orange"}
                        >
                          {line.highlight}
                        </span>
                      )}

                      {/* النص بعد الـ highlight */}
                      {line.textAfter && (
                        <span className={line.color || "text-brand-sky"}>
                          {" "}
                          {line.textAfter}
                        </span>
                      )}
                    </h3>
                  ))}
                </div>
              )}
            </div>

            {description && (
              <p
                className={`text-lg leading-[1.6] max-w-xl ${descriptionColor} ${layout === "centered" ? "mx-auto" : ""}`}
              >
                {description}
              </p>
            )}

            {/* عرض CTA منفصل */}
            {showCta && !showFeatures && (
              <div ref={ctaRef} className="pt-4">
                {customButton ? (
                  <CustomButton />
                ) : (
                  <button
                    onClick={onCtaClick}
                    className="font-bold text-brand-orange text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer"
                  >
                    {ctaText} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* عرض features إذا كانت مفعلة */}
            {features && showFeatures && (
              <div
                ref={featuresRef}
                className={`grid sm:grid-cols-2 gap-8 pt-4 ${layout === "centered" ? "text-left" : ""}`}
              >
                {features.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-8 ${item.offset || ""}`}
                  >
                    {item.icon && (
                      <div className="mt-1 pt-4 shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={60}
                          height={60}
                        />
                      </div>
                    )}

                    <div>
                      <h4
                        className={`text-xl font-bold mb-2 ${item.color || "text-brand-sky"}`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-brand-white/70 text-sm mb-4">
                        {item.text}
                      </p>
                      <button
                        onClick={() => onCtaClick && onCtaClick(item)}
                        className={`font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer ${item.color || "text-brand-sky"}`}
                      >
                        {ctaText} <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* الصورة */}
          {image && layout !== "centered" && (
            <div ref={imageRef} className="lg:w-1/2 flex justify-start">
              <div className="relative w-[550px] h-[550px] xl:w-[600px] xl:h-[600px]">
                <Image
                  src={image}
                  alt={title || subtitle || "Section image"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* قسم split */}
          {layout === "split" && description2 && (
            <div ref={secondTextRef} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-sky">
                {subtitle}
              </h3>
              <p className="text-brand-white/80 text-lg leading-relaxed">
                {description2}
              </p>
              {features && features.length > 0 && showFeatures && (
                <div className="space-y-4 mt-8">
                  {features.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={40}
                          height={40}
                        />
                      )}
                      <div>
                        <h4
                          className={`font-bold ${item.color || "text-brand-sky"}`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-brand-white/70 text-sm">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
