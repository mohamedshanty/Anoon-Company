"use client";

import { useRef } from "react";
import { Sparkles, Terminal } from "lucide-react";
import Button from "../ui/Button";
import Sparks from "../ui/Sparks";
import ProgramCard from "../ui/ProgramCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Stars from "../ui/Stars";
import SectionHeader from "../ui/SectionHeader";

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
      <div className="main-container">
        <SectionHeader
          title="Our Programs"
          subtitle={{
            highlightedWords: [
              { text: "Tailor", color: "text-brand-sky" },
              { text: "Crafted", color: "text-brand-orange" },
              { text: "For The", color: "text-brand-sky" },
              { text: "Tech Sector", color: "text-brand-orange" },
            ],
          }}
          description={[
            "At Anoon LLC, we believe there is no shame in falling",
            "only in staying down , We help people rise by giving them the skills",
            "to build again.",
            "We don't just offer a second chance, we offer the tools to create a",
            "new life.",
          ]}
          starsCount={25}
          maxWidth="4xl"
          align="center"
        />

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
