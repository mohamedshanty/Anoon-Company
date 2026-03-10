"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Stars from "../ui/Stars";
import Link from "next/link";

const OurSpace = () => {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();

  const subtitleWords = t("space_noon.our_space.subtitle_words", {
    returnObjects: true,
    defaultValue: ["Your", "Future", "Network"],
  });

  const wordsArray = Array.isArray(subtitleWords)
    ? subtitleWords
    : ["Your", "Future", "Network"];

  const highlightedWords = [
    ...(wordsArray[0]
      ? [{ text: wordsArray[0], color: "text-brand-sky" }]
      : []),
    ...(wordsArray[1]
      ? [{ text: wordsArray[1], color: "text-brand-orange" }]
      : []),
    ...(wordsArray[2]
      ? [{ text: wordsArray[2], color: "text-brand-sky" }]
      : []),
  ].filter((item) => item.text);

  return (
    <section
      className="relative overflow-hidden bg-no-repeat bg-center"
      style={{ minHeight: "120svh" }}
      dir={dir}
    >
      {/* Background image — cover on mobile so cards don't spill over text,
          contain on larger screens to show the full fan layout */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url(/images/vist-space.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // cover on mobile keeps cards behind content; switch to contain ≥ md
          backgroundSize: "cover",
        }}
      />
      {/* Extra dark scrim on mobile so text stays readable over the image */}
      <div className="absolute inset-0 -z-10 md:bg-transparent" />

      <Stars count={20} zIndex={-5} opacity={0.8} />

      {/* Generous vertical padding: more on mobile, less on desktop */}
      <div className="main-container flex flex-col items-center py-20 sm:py-24 md:py-28 lg:py-32 px-5 sm:px-6">
        <SectionHeader
          title={t("space_noon.our_space.title", "Our Space")}
          subtitle={{ highlightedWords }}
          description={[
            t(
              "space_noon.our_space.description",
              "We provide everything your need in our space. We give you the skill you have to acquire to get in the digital work space with professional guidance regarding Freelancing & Networking, and the platform to be able to achieve it.",
            ),
          ]}
          starsCount={20}
          maxWidth="3xl"
          align="center"
          // Smaller title on mobile, scale up from sm onward
          titleClassName="text-4xl sm:text-5xl md:text-6xl"
        />

        <div className="mt-8 sm:mt-10 md:mt-12 w-full flex justify-center">
          <Link
            href="https://maps.app.goo.gl/G4uycW6GEBeUjnMv7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              color="sky"
              // Full-width button on very small screens, auto on sm+
              className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg"
            >
              {t("space_noon.our_space.button", "Visit Our Location")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurSpace;
