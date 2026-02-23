"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";

export default function MainHero() {
  return (
    <Hero>
      <Hero.Title>
        <span>Rising</span>
        <span className="text-brand-orange">From The Ashes</span>
        <span>
          To Build <span className="text-brand-sky">Better Future</span>
        </span>
      </Hero.Title>

      <Hero.Subtitle>
        <p className="text-subtitle">
          We Don't Just Build Software,{" "}
          <span className="text-brand-orange">We Build The Human Spirit</span>
        </p>
        <p className="text-subtitle">
          The <span className="text-brand-orange">Past</span> is behind and the{" "}
          <span className="text-brand-orange">Future Is Ours</span>
        </p>
        <p className="text-subtitle">
          We Don't make excuses{" "}
          <span className="text-brand-orange">We Rise</span>
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Button variant="outline" color="orange">
          Explore Our Services
        </Button>
        <Button variant="outline" color="sky">
          Book A Free Meeting
        </Button>
      </Hero.Buttons>
    </Hero>
  );
}
