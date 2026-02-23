"use client";

import Hero from "@/components/common/Hero";
import Button from "@/components/ui/Button";
export default function SpaceNoonHero() {
  return (
    <Hero>
      <Hero.Title>
        <span>Enabling</span>
        <span className="text-brand-orange">The Future Generation</span>
        <span className="flex items-center gap-4 flex-wrap justify-center">
          <span>With</span>
          <span className="font-thin">
            <span className="text-brand-orange">Space Noon</span>
          </span>
        </span>
      </Hero.Title>

      <Hero.Subtitle>
        <p className="text-subtitle text-white/80">
          Empowering students and professionals with the tools and the platform
          by providing a co-working space that they can work in safe, quiet
          space with the ability to network
        </p>
      </Hero.Subtitle>

      <Hero.Buttons>
        <Button variant="outline" color="orange">
          Explore Our Services
        </Button>
        <Button variant="outline" color="sky">
          Visit Our Space
        </Button>
      </Hero.Buttons>
    </Hero>
  );
}
