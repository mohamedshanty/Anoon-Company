"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";

export default function WhoWeAre() {
  const textContent = useRef(null);
  const imageContent = useRef(null);
  const featuresContainerRef = useRef(null);

  useScrollReveal({
    ref: textContent,
    animation: "slide-left",
  });

  useScrollReveal({
    ref: imageContent,
    animation: "slide-right",
  });

  useScrollReveal({
    ref: featuresContainerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.2,
    start: "top 70%",
  });
  return (
    <section
      id="about"
      className="pb-24 relative overflow-hidden border-none outline-none"
    >
      {/* Background Pattern*/}
      <PatternBackground direction="default" translateY="-translate-y-30" />


      <div className="main-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side */}
          <div ref={textContent} className="space-y-8 lg:w-1/2">
            <div className="space-y-4">
              <h2 className="font-bold tracking-[1px] text-brand-white">
                Who We Are
              </h2>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-sky leading-tight">
                  We Don't Just Build{" "}
                  <span className="text-brand-orange">Software</span>
                </h3>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-sky leading-tight">
                  We Help People{" "}
                  <span className="text-brand-orange">Dream</span>
                </h3>
              </div>
            </div>

            <p className="text-brand-white text-lg leading-[1.6] max-w-xl">
              Anoon LLC doesn't just build software. When the world went dark,
              we stayed. We met our mission head-on in Gaza by offering a
              future. We equipped students with the technical mastery to rise,
              because they can take everything else, but they can't take what
              you know
            </p>

            <div
              ref={featuresContainerRef}
              className="grid sm:grid-cols-2 gap-8 pt-4"
            >
              {/* Tech Solution */}
              <div className="flex items-start gap-8">
                <div className="mt-1 pt-4 relative shrink-0">
                  <Image
                    src="/images/missile.png"
                    alt="Missile Icon"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-orange mb-2">
                    Tech Solution
                  </h4>
                  <p className="text-brand-white/70 text-sm leading-relaxed mb-4">
                    We deliver scalable, secure & impact-oriented digital
                    systems specializing in AI Agent
                  </p>
                  <button className="text-brand-orange font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                    Know More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Social - MODIFIED SECTION */}
              <div className="flex items-start gap-8 lg:-mr-12 xl:-mr-16 2xl:-mr-24">
                <div className="mt-1 pt-4 relative shrink-0">
                  <Image
                    src="/images/Lump.png"
                    alt="Lightbulb Icon"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-sky mb-2">
                    Social
                  </h4>
                  <p className="text-brand-white/70 text-sm leading-relaxed mb-4">
                    Our Programs Provides the infrastructure and skills
                    freelancers need to remain economically active.
                  </p>
                  <button className="text-brand-sky font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                    Know More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side  */}
          <div ref={imageContent} className="lg:w-1/2 flex justify-start">
            <div className="relative w-[600px] h-[600px] lg:w-[550px] lg:h-[550px] xl:w-[600px] xl:h-[600px]">
              <Image
                src="/images/whoWeAre.png"
                alt="Who We Are"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
