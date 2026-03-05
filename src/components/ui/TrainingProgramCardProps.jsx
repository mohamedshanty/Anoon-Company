"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TrainingProgramCard = ({
  title,
  titleLines,
  description,
  imageSrc,
  imageAlt,
  buttonText = "Visit Us",
  buttonVariant = "outline",
  buttonColor = "sky",
  onButtonClick,
  imageWidth = 400,
  imageHeight = 250,
  buttonHref,
  isRTL = false,
}) => {
  const { i18n } = useTranslation();
  const rtl = isRTL || i18n?.language === "ar";
  const pathname = usePathname();

  const isSpaceNoonTraining = pathname === "/spaceNoonTraining";
  const isNoonHub = pathname === "/noonHub";

  const renderTitle = () => {
    if (titleLines && titleLines.length > 0) {
      return (
        <h4
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${rtl ? "text-right" : ""}`}
        >
          {titleLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h4>
      );
    }

    return (
      <h4 className={` font-bold mb-4 sm:mb-6 ${rtl ? "text-right" : ""}`}>
        {title}
      </h4>
    );
  };

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 animate-fade-in"
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-xl overflow-hidden">
        <div
          className={`flex flex-col md:flex-row items-start gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10 ${
            rtl ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image - Responsive sizing */}
          <div className="flex justify-center w-full md:w-1/2">
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="rounded-xl object-cover w-full h-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px"
              />
            </div>
          </div>

          {/* Content - مع عرض أصغر للوصف */}
          <div
            className={`w-full md:w-1/2 text-white h-full flex flex-col justify-between ${
              rtl ? "text-right" : ""
            }`}
          >
            <div>
              {renderTitle()}
              <p
                className={`text-gray-300 text-sm sm:text-base leading-6 sm:leading-7 max-w-md ${
                  rtl ? "text-right mr-0" : "text-left ml-0"
                }`}
              >
                {description}
              </p>
            </div>

            <div className="mt-6 md:mt-8">
              {isSpaceNoonTraining ? (
                <Link
                  href="https://maps.app.goo.gl/G4uycW6GEBeUjnMv7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    color={buttonColor}
                    className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                  >
                    {buttonText}
                  </Button>
                </Link>
              ) : isNoonHub ? (
                <Link href="/spaceNoonTraining">
                  <Button
                    variant="outline"
                    color={buttonColor}
                    className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                  >
                    {buttonText}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  color={buttonColor}
                  onClick={onButtonClick}
                  className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramCard;
