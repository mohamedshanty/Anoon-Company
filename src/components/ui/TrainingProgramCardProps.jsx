import React from "react";
import Button from "../ui/Button";
import Image from "next/image";

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
}) => {
  const renderTitle = () => {
    if (titleLines && titleLines.length > 0) {
      return (
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
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
      <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        {title}
      </h4>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-8 p-10">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 text-white h-full flex flex-col justify-between">
            <div>
              {renderTitle()}

              <p className="text-gray-300 text-lg leading-8 max-w-[415px]">
                {description}
              </p>
            </div>

            <div className="mt-10">
              <Button
                variant={buttonVariant}
                color={buttonColor}
                className="px-8 py-3 rounded-full"
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramCard;
