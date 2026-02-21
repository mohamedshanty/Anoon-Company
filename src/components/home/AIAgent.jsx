"use client";
import { useRef } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";

export default function AIAgent() {
  const leftSide = useRef(null);
  const rightSide = useRef(null);
  const featuresRef = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-left",
  });

  useScrollReveal({
    ref: rightSide,
    animation: "slide-right",
  });

  useScrollReveal({
    ref: featuresRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
    start: "top 75%",
  });

  const features = [
    "Quick Service",
    "AI Agent Development",
    "Data-driven decision support",
  ];

  return (
    <section id="ai-agent" className="py-24 relative overflow-hidden">
      {/* Global Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-sky/20 to-transparent transform -skew-y-12" />
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-brand-sky/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Background Pattern */}
      <PatternBackground direction="default" translateY="-translate-y-30" />


      <div className="main-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content - The Text Side (Extended & Not Compressed) */}
          <div ref={leftSide} className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="font-semibold leading-[1.1] tracking-tight whitespace-normal md:whitespace-nowrap">
                <span className="text-brand-orange">AI Agent</span>{" "}
                <span className="text-brand-sky opacity-80">Development</span>
              </h2>
              <div className="space-y-2">
                <h3 className="font-light leading-tight tracking-[0.05em] text-white/90">
                  <span className="text-brand-orange/80">Intelligent</span>{" "}
                  <span className="text-brand-sky/60">Software</span>
                </h3>
                <h3 className="font-light leading-tight tracking-[0.05em] text-white/90">
                  <span className="text-brand-sky/60">For Better</span>{" "}
                  <span className="text-brand-orange/80 font-medium tracking-[0.02em]">
                    Business
                  </span>
                </h3>
              </div>
            </div>

            <div ref={featuresRef} className="space-y-6 pt-2">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-brand-sky flex items-center justify-center shadow-[0_0_20px_rgba(96,180,255,0.3)]">
                    <Check
                      className="w-5 h-5 text-brand-blue"
                      strokeWidth={4}
                    />
                  </div>
                  <span className="text-xl md:text-2xl text-brand-sky font-medium tracking-[0.03em] opacity-90">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-6">
              <Button variant="filled" color="sky">
                Book A meeting
              </Button>
              <Button variant="outline" color="sky">
                Know More
              </Button>
            </div>
          </div>

          {/* Right Content - Now the Image Group */}
          <div
            ref={rightSide}
            className="w-full lg:w-[50%] relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-[550px] h-[550px] flex items-center justify-center">
              {/* Light Glow */}
              {/* CSS Glow Background */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(120,200,255,0.4)_0%,rgba(40,120,255,0.5)_50%,transparent_70%)] blur-[90px] animate-pulse" />
              </div>

              {/* Rotating Circle */}
              <div className="absolute inset-0 animate-spin-slow">
                <Image
                  src="/images/Circle.png"
                  alt="Rotating Circle"
                  fill
                  className="object-contain"
                />
              </div>

              {/* AI Brain */}
              <div className="relative w-[62%] h-[62%] z-10">
                <Image
                  src="/images/Ai.png"
                  alt="AI Brain"
                  fill
                  className="object-contain drop-shadow-[0_0_45px_rgba(96,180,255,0.55)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
