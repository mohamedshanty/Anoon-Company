"use client";
import { useRef } from "react";
import AIAgentImage from "../ui/AIAgentImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Stars from "../ui/Stars";

const TechBlogHero = () => {
  const leftSide = useRef(null);
  const rightSide = useRef(null);

  useScrollReveal({
    ref: leftSide,
    animation: "slide-left",
    start: "top 80%",
  });

  useScrollReveal({
    ref: rightSide,
    animation: "slide-right",
    start: "top 80%",
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <Stars />
      <div className="main-container">
        <div className="flex items-center justify-between">
          {/* Left Side Content */}
          <div className="w-1/2 pr-8">
            <h2 className="font-semibold mb-4 leading-tight">
              Learn More <br /> Everyday About
            </h2>
            <h1 className="bg-linear-to-t from-[#3C6F99] to-[#64B9FF] bg-clip-text text-transparent tracking-[1px] font-black leading-tight italic">
              Artificial Intelligence
            </h1>
          </div>
          {/* Right Side Content */}
          <div
            ref={rightSide}
            className="w-full lg:w-[50%] relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <AIAgentImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechBlogHero;
