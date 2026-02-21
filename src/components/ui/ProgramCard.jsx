import React from 'react';
import Image from "next/image";
import Button from "./Button";

const ProgramCard = ({
    logo,
    title,
    description,
    primaryBtnText,
    primaryBtnColor = "green",
    secondaryBtnText = "Know More",
    accentGlowClass = "from-green-500/5",
    secondaryBtnVariant = "outline-plain",
    logoContainerClassName = "mb-3"
}) => {
    return (
        <div className="relative group h-full rounded-[20px] bg-[#14235d] p-10 lg:p-14 border border-white/10 shadow-[0_0_6px_rgba(255,255,255,0.6)] flex flex-col items-center text-center overflow-hidden transition-all duration-500">
            {/* Subtle Inner Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${accentGlowClass} to-transparent pointer-events-none`} />

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

                {/* Heading - Now supports JSX for complex highlighting */}
                <div className="text-[24px] md:text-[28px] font-bold text-white leading-[1.15]">
                    {title}
                </div>

                {/* Description - Uses consolidated card-description class */}
                <p className="card-description mb-4">
                    {description}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex flex-col sm:flex-row gap-4 w-full">
                    <Button variant="filled" color={primaryBtnColor} className="flex-1 w-full whitespace-nowrap">
                        {primaryBtnText}
                    </Button>
                    <Button variant={secondaryBtnVariant} color={primaryBtnColor === 'green' ? 'green' : 'orange'} className="flex-1 w-full whitespace-nowrap">
                        {secondaryBtnText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProgramCard;
