"use client";

import Hero from "@/components/common/Hero";
import AiPrompt from "@/components/ui/AiPrompt";

export default function TechAgencyHero() {
  return (
    <Hero>
      <Hero.Title>
        <div className="flex flex-col gap-3">
          <span className="text-sm tracking-wider text-brand-white bg-brand-white/8 py-3 px-20 rounded-full w-max mx-auto font-light">
            The New Area Of Technology
          </span>

          <span className="mt-4 font-semibold">Creating</span>

          <span className="font-semibold text-brand-sky">
            Next Generation Solution
          </span>

          <span className="font-semibold">
            With <span className="text-brand-orange">Tech Agency</span>
          </span>
        </div>
      </Hero.Title>

      <Hero.Actions>
        <AiPrompt
          placeholder="Ask about our services, projects, or how we can help you!"
          buttonText="Ask Now"
        />
      </Hero.Actions>
    </Hero>
  );
}
