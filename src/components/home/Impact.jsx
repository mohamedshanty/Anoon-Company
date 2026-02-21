"use client";

import { useRef } from "react";
import {
  User,
  GraduationCap,
  Users,
  Map,
  Briefcase,
  LineChart,
  Star,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PatternBackground from "../ui/PatternBackground";

export default function Impact() {
  const container = useRef(null);
  const leftSide = useRef(null);
  const statsContainerRef = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
  });

  useScrollReveal({
    ref: statsContainerRef,
    animation: "slide-right",
    isChildren: true,
    stagger: 0.15,
    start: "top 70%",
  });
  return (
    <section
      id="impact"
      ref={container}
      className="relative py-24 overflow-hidden"
    >

      <div className="absolute inset-0 pointer-events-none -z-20 opacity-100">
        <PatternBackground
          direction="diagonal"
          translateY="-translate-y-30"
          opacity="opacity-100"
        />
      </div>

      <div className="main-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Headings and Paragraph */}
          <div ref={leftSide} className="flex-1">
            <h2 className="font-semibold tracking-tight mb-8">
              <span className="text-brand-sky">Our</span>{" "}
              <span className="text-brand-orange">Impact</span>
            </h2>
            <h4 className="font-medium text-white mb-2">
              Our <span className="text-white">2 years of</span>
            </h4>
            <h4 className="font-medium mb-6">
              <span className="text-brand-orange">Achievements</span>
            </h4>
            <p className="text-white/95 text-lg md:text-xl font-extralight leading-relaxed mb-8">
              We didn’t wait for permission. While the world watched in silence,
              we chose to build. Alongside those who truly stood by us, we
              carved a path through the impossible. We didn’t just bring
              frameworks; we brought the tools for our people to reclaim their
              own future. We are still here, we are still building, and our will
              is stronger than any struggle.
            </p>
          </div>

          {/* Right Side: Stats */}
          <div
            ref={statsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-5"
          >
            {/* 11,000 Freelancer & Student */}
            <div className="flex items-center gap-4">
              <div>
                <User className="w-10 h-10 text-brand-orange" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-brand-orange">
                  11,000
                </div>
                <div className="text-lg font-light text-brand-sky">
                  Freelancer & Student
                </div>
              </div>
            </div>
            {/* 50% Freelancer Success */}
            <div className="flex items-center gap-4">
              <div>
                <Star className="w-10 h-10 text-brand-orange" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-brand-orange">
                  50 %
                </div>
                <div className="text-lg font-light text-brand-sky">
                  Freelancer Success
                </div>
              </div>
            </div>
            {/* 3 Roadmap Technical Courses */}
            <div className="flex items-center gap-4">
              <div>
                <LineChart className="w-10 h-10 text-brand-orange" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-brand-orange">
                  3 Roadmap
                </div>
                <div className="text-lg font-light text-brand-sky">
                  Technical Courses
                </div>
              </div>
            </div>
            {/* 11 Work Space */}
            <div className="flex items-center gap-4">
              <div>
                <Briefcase className="w-10 h-10 text-brand-orange" />
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-brand-orange">
                  11
                </div>
                <div className="text-lg font-light text-brand-sky">
                  Work Space
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
