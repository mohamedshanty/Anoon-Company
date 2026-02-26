import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const ProgramCard = ({
  logo,
  title,
  description,
  primaryBtnText,
  primaryBtnColor = "green",
  primaryBtnHref,
  primaryBtnOnClick,
  primaryBtnExternal = false, // للروابط الخارجية
  secondaryBtnText = "Know More",
  secondaryBtnHref,
  secondaryBtnOnClick,
  secondaryBtnExternal = false, // للروابط الخارجية
  accentGlowClass = "from-green-500/5",
  secondaryBtnVariant = "outline-plain",
  logoContainerClassName = "mb-3",
}) => {
  // دالة لعرض الزر المناسب
  const renderButton = ({ text, color, variant, href, onClick, external }) => {
    const buttonElement = (
      <Button
        variant={variant || "filled"}
        color={color}
        onClick={onClick}
        className="w-full whitespace-nowrap"
      >
        {text}
      </Button>
    );

    if (href) {
      if (external) {
        // رابط خارجي
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 w-full"
          >
            {buttonElement}
          </a>
        );
      } else {
        // رابط داخلي
        return (
          <Link href={href} className="flex-1 w-full">
            {buttonElement}
          </Link>
        );
      }
    }

    // بدون رابط، فقط زر عادي
    return <div className="flex-1 w-full">{buttonElement}</div>;
  };

  return (
    <div className="relative group h-full rounded-[20px] bg-[#14235d] p-10 lg:p-14 border border-white/10 shadow-[0_0_6px_rgba(255,255,255,0.6)] flex flex-col items-center text-center overflow-hidden transition-all duration-500">
      {/* Subtle Inner Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${accentGlowClass} to-transparent pointer-events-none`}
      />

      <div className="relative z-10 w-full flex-1 flex flex-col items-center gap-6">
        {/* Logo */}
        <div className={logoContainerClassName}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-[24px] md:text-[28px] font-bold text-white leading-[1.15]">
          {title}
        </div>

        {/* Description */}
        <p className="card-description mb-4">{description}</p>

        {/* Buttons */}
        <div className="mt-auto flex flex-col xl:flex-row gap-4 w-full">
          {/* Primary Button */}
          {renderButton({
            text: primaryBtnText,
            color: primaryBtnColor,
            variant: "filled",
            href: primaryBtnHref,
            onClick: primaryBtnOnClick,
            external: primaryBtnExternal,
          })}

          {/* Secondary Button */}
          {renderButton({
            text: secondaryBtnText,
            color: primaryBtnColor === "green" ? "green" : "orange",
            variant: secondaryBtnVariant,
            href: secondaryBtnHref,
            onClick: secondaryBtnOnClick,
            external: secondaryBtnExternal,
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;