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
}) {
  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (typeof subtitle === "string") {
      return (
        <h3
          className={cn(
            "font-bold mb-6 md:mb-8 lg:mb-10 leading-tight",
            subtitleClassName,
          )}
        >
          {subtitle}
        </h3>
      );
    }

    if (subtitle.highlightedWords && Array.isArray(subtitle.highlightedWords)) {
      return (
        <h3
          className={cn(
            "font-bold mb-6 md:mb-8 lg:mb-10 leading-tight text-xl md:text-2xl lg:text-3xl",
            subtitleClassName,
          )}
        >
          {subtitle.prefix && <span>{subtitle.prefix} </span>}
          {subtitle.highlightedWords.map((word, idx) => (
            <span key={idx} className={word.color || "text-brand-sky"}>
              {word.text}{" "}
            </span>
          ))}
          {subtitle.suffix && <span>{subtitle.suffix}</span>}
        </h3>
      );
    }

    return null;
  };

  return (
    <div
      className={cn(
        "relative w-full animate-fade-in",
        alignClasses[align],
        maxWidthClasses[maxWidth],
        className,
      )}
    >
      <Stars count={starsCount} zIndex={-5} opacity={0.8} />

      <h2
        className={cn(
          "text-brand-white font-bold mb-3 md:mb-4 tracking-wide text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {renderSubtitle()}

      {description && (
        <div
          className={cn(
            "relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto px-4 sm:px-6",
            descriptionClassName,
          )}
        >
          <div className="space-y-2 md:space-y-3">
            {Array.isArray(description) ? (
              description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
