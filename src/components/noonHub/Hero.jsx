"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";

export default function NoonHero() {
  return (
    <Hero>
      <Hero.Title>
        <span className="font-semibold">Providing</span>
        <span className="font-semibold">
          A <span className="text-brand-sky">Safe Place</span> For{" "}
          <span className="text-brand-orange">Everyone</span>
        </span>

        <span className="font-semibold">
          With{" "}
          <span className="text-brand-sky">
            N<span className="text-brand-orange">oo</span>n Hub
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle>
        <p className="text-subtitle text-white/80">
          Noon Hub is a place Designed for your needs, the friends you know the
          people you admire, Every body focusing on get things done, Learn more,
          network more and Focus With Us
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Button variant="outline" color="orange">
          Explore Our Services
        </Button>
      </Hero.Buttons>
    </Hero>
  );
}
