"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";

export default function Impact({
  title = {
    firstWord: "Our",
    secondWord: "Impact",
  },
  subtitle = {
    line1: "Our 2 years of",
    line2: {
      prefix: "",
      highlight: "Achievements",
    },
  },
  description = "We didn't wait for permission. While the world watched in silence, we chose to build. Alongside those who truly stood by us, we carved a path through the impossible. We didn't just bring frameworks; we brought the tools for our people to reclaim their own future. We are still here, we are still building, and our will is stronger than any struggle.",
  stats,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  descriptionClassName = "",
  patternDirection = "diagonal",
  patternOpacity = "opacity-100",
  patternTranslateY = "-translate-y-30",
}) {
  const container = useRef(null);
  const leftSide = useRef(null);
  const statsContainerRef = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
  });

  useScrollReveal({
    ref: statsContainerRef,
    animation: "slide-right",
    isChildren: true,
    stagger: 0.15,
    start: "top 70%",
  });

  return (
    <section
      id="impact"
      ref={container}
      className={`relative py-24 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction={patternDirection}
          translateY={patternTranslateY}
          opacity={patternOpacity}
        />
      </div>

      <div className="main-container">
        {/* Our Impact - في سطر منفصل */}
        <div className="text-left mb-16">
          <h2
            className={`font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl ${titleClassName}`}
          >
            <span className="text-brand-sky">{title.firstWord}</span>{" "}
            <span className="text-brand-orange">{title.secondWord}</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Headings and Paragraph */}
          <div ref={leftSide} className="flex-1">
            {subtitle.line1 && (
              <h3
                className={`font-medium text-white mb-2 ${subtitleClassName}`}
              >
                {subtitle.line1}
              </h3>
            )}
            {subtitle.line2 && (
              <h3 className={`font-light mb-8 ${subtitleClassName}`}>
                {subtitle.line2.prefix && (
                  <span className="text-white ">{subtitle.line2.prefix} </span>
                )}
                <span className="text-brand-orange font-medium">
                  {subtitle.line2.highlight}
                </span>
              </h3>
            )}
            <p
              className={`text-white/80 text-lg md:text-lg font-light leading-relaxed mb-8 max-w-xl ${descriptionClassName}`}
            >
              {description}
            </p>
          </div>

          {/* Right Side: Stats */}
          <div
            ref={statsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-5 flex-1"
          >
            {stats &&
              stats.map((stat) => (
                <div key={stat.id} className="flex items-center gap-4">
                  <div className="text-brand-orange">{stat.icon}</div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                      {stat.value}
                    </div>
                    <div className="text-lg font-medium text-brand-sky">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
