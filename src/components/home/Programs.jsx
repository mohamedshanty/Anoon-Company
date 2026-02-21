"use client";

import { useRef } from "react";
import { Sparkles, Terminal } from "lucide-react";
import Button from "../ui/Button";
import Sparks from "../ui/Sparks";
import ProgramCard from "../ui/ProgramCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Stars from "../ui/Stars";

export default function Programs() {
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useScrollReveal({
    ref: headerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.15,
  });

  useScrollReveal({
    ref: cardsContainerRef,
    animation: "slide-up",
    isChildren: true,
    stagger: 0.3,
    start: "top 75%",
  });

  const cards = [
    {
      logo: {
        src: "/images/tamkeen-image.png",
        alt: "Tamkeen Logo",
        width: 150,
        height: 80,
      },
      title: (
        <>
          The Future is <span className="text-brand-green">Built</span> by
          <br />
          Those Who <span className="text-brand-green">Learn</span>
        </>
      ),
      description:
        "We Believe That Knowledge can't be taken away and student is the future With Our Work & our partner We make a change and still do",
      primaryBtnText: "Support Us",
      primaryBtnColor: "green",
      accentGlowClass: "from-green-500/5",
    },
    {
      logo: {
        src: "/images/noon-hub.png",
        alt: "Noon Hub Logo",
        width: 250,
        height: 100,
      },
      title: (
        <>
          The Building Can <span className="text-red-500">Fall</span> But
          <br />
          your Skills <span className="text-brand-orange">Won't</span>
        </>
      ),
      description:
        "Knowledge is the only thing that they can't take away from us , we can be destroyed but our mind will shape the future , our thought fly high without a limit",
      primaryBtnText: "Book A meeting",
      primaryBtnColor: "orange",
      accentGlowClass: "from-brand-orange/5",
      logoContainerClassName: "pb-8 mb-3",
    },
  ];

  return (
    <section
      id="programs"
      className="py-24 bg-transparent relative overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-brand-orange/5 blur-[100px] rounded-full" />
      </div>

      <div className="main-container">
        <div
          ref={headerRef}
          className="text-center max-w-4xl mx-auto mb-20 relative"
        >
          <Stars count={25} zIndex={-5} opacity={0.8} />

          <h1 className="text-brand-white font-bold text-6xl md:text-5xl mb-6 block tracking-tight">
            Our Programs
          </h1>
          <h3 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight whitespace-nowrap">
            <span className="text-brand-sky">Tailor</span>{" "}
            <span className="text-brand-orange">Crafted</span>{" "}
            <span className="text-brand-sky">For The</span>{" "}
            <span className="text-brand-orange">Tech Sector</span>
          </h3>
          <p className="text-brand-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            At Anoon LLC, we believe there is no shame in falling
            <br className="hidden md:block" />
            only in staying down , We help people rise by giving them the skills
            to build again.
            <br className="hidden md:block" />
            We don't just offer a second chance, we offer the tools to create a
            new life.
          </p>
        </div>

        <div
          ref={cardsContainerRef}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {cards.map((card, idx) => (
            <div key={idx} className="h-full">
              <ProgramCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
