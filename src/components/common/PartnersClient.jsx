"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-setup";

export default function PartnersClient({ partners, isRTL }) {
    const scrollRef = useRef(null);
    const animationRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 150, height: 150 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setImageSize({ width: 100, height: 100 });
            else if (width < 768) setImageSize({ width: 120, height: 120 });
            else if (width < 1024) setImageSize({ width: 150, height: 150 });
            else setImageSize({ width: 180, height: 180 });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!scrollRef.current) return;

        const getDuration = () => {
            const width = window.innerWidth;
            if (width < 640) return 25;
            if (width < 1024) return 20;
            return 18;
        };

        const xPercent = isRTL ? 50 : -50;

        animationRef.current = gsap.to(scrollRef.current, {
            xPercent: xPercent,
            repeat: -1,
            duration: getDuration(),
            ease: "linear",
        });

        return () => {
            if (animationRef.current) animationRef.current.kill();
        };
    }, [isRTL]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        animationRef.current?.pause();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        animationRef.current?.resume();
    };

    return (
        <div className="w-full flex justify-center px-4 sm:px-6">
            <div
                className="relative w-full max-w-4xl overflow-hidden group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={scrollRef}
                    className={`flex items-center w-[200%] mt-10 ${isRTL ? "flex-row" : ""}`}
                    style={{ willChange: "transform" }}
                >
                    {[...partners, ...partners].map((partner, idx) => (
                        <div
                            key={`${partner.name}-${idx}`}
                            className="flex flex-col items-center transition-all duration-300 hover:scale-110 min-w-[120px] sm:min-w-[150px] md:min-w-[180px] lg:min-w-[200px]"
                        >
                            <Image
                                src={partner.image}
                                alt={partner.name}
                                width={imageSize.width}
                                height={imageSize.height}
                                className="mb-2 object-contain w-auto h-auto"
                                loading="lazy"
                            />
                            <span className="sr-only">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
