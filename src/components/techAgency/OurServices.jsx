"use client";
import { useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";
import Stars from "../ui/Stars";

export default function OurServices() {
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
      {/* Background Pattern */}
      <PatternBackground direction="default" translateY="-translate-y-30" />

      <div className="main-container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content - Image Side */}
          <div
            ref={leftSide}
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
          >
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              {/* AI Brain Image */}
              <div className="relative w-full h-full z-10">
                <Image
                  src="/images/ourServices.png"
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
                <span className="text-brand-white">Our</span>{" "}
                <span className="text-brand-orange">Services</span>
                <br />
                <span className="text-brand-sky">AI Agents Development</span>
              </h3>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl">
                As business complexity grows, developing AI agents has become
                essential for building scalable and efficient operations.
                Investing in AI agent development enables organizations to
                automate tasks, optimize decision-making, and create sustainable
                competitive advantages.
              </p>
            </div>

            {/* Button */}
            <div ref={buttonRef} className="pt-4">
              <Button
                variant="outline"
                color="sky"
                className="text-lg px-8 py-4"
              >
                Book A Meeting
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
