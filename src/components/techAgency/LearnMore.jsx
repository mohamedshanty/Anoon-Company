"use client";
import { useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";

export default function LearnMore() {
  const leftSide = useRef(null);
  const rightSide = useRef(null);
  const buttonRef = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-left",
  });

  useScrollReveal({
    ref: rightSide,
    animation: "slide-right",
  });

  useScrollReveal({
    ref: buttonRef,
    animation: "slide-up",
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left Content - Image Side */}
        <div
          ref={leftSide}
          className="w-full lg:w-1/2 flex justify-center lg:justify-start"
        >
          <div className="relative w-[600px] h-[600px] flex items-center justify-center">
            {/* AI Brain Image */}
            <div className="relative w-full h-full z-10">
              <Image
                src="/images/knowladge-book.png"
                alt="Our Services"
                fill
                className="object-contain drop-shadow-[0_0_45px_rgba(96,180,255,0.55)]"
              />
            </div>
          </div>
        </div>

        {/* Right Content - Text Side */}
        <div
          ref={rightSide}
          className="w-full lg:w-1/2 space-y-6 lg:space-y-8 lg:-ml-30"
        >
          <div className="space-y-4 lg:space-y-6">
            {/* AI Agent Development Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              <span className="text-brand-white">Learn More About</span>
              <br />
              <span className="text-brand-sky">Artificial Intelligent</span>
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-[600px]">
              Want to understand how AI is shaping the future of business? Our
              AI Development Blog breaks down the latest trends, tools, and
              real-world strategies behind building powerful AI systems and
              intelligent agents. Whether you're a founder, developer, or tech
              enthusiast, discover practical insights that help you stay ahead
              in the AI revolution.
              <br />
              Read, learn, and build smarter with AI.
            </p>
          </div>

          {/* Button */}
          <div ref={buttonRef} className="pt-4">
            <Button variant="outline" color="sky" className="text-lg px-8 py-4">
              Read Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
