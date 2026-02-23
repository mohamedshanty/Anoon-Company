import React from "react";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Stars from "../ui/Stars";

const OurSpace = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <Stars count={20} zIndex={-5} opacity={0.8} />

      <div className="main-container flex flex-col items-center">
        <SectionHeader
          title="Our Space"
          subtitle={{
            highlightedWords: [
              { text: "Your", color: "text-brand-sky" },
              { text: "Future", color: "text-brand-orange" },
              { text: "Network", color: "text-brand-sky" },
            ],
          }}
          description={[
            "We provide everything your need is our space we give you the skill you have to acquire to get in the digital work space with professional guidance regarding Freelancer & Networking, and the platform to be able to achieve it",
          ]}
          starsCount={20}
          maxWidth="3xl"
          align="center"
          titleClassName="text-5xl md:text-6xl"
        />
        <div className="mt-12">
          <Button variant="outline" color="sky" className="px-8 py-3 text-lg">
            Visit Our Location
          </Button>
        </div>
      </div>
    </section>
  );
};
export default OurSpace;
