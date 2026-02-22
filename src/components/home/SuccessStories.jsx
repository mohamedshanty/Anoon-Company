import Testimonials from "../common/Testimonials";
import SectionHeader from "../ui/SectionHeader";

const SuccessStories = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="main-container">
        <SectionHeader
          title="Success Stories"
          subtitle={{
            highlightedWords: [
              { text: "From The", color: "text-brand-sky" },
              { text: "Ashes", color: "text-brand-orange" },
              { text: "We", color: "text-brand-sky" },
              { text: "Rise Again", color: "text-brand-orange" },
            ],
          }}
          description={[
            "Because it's important to celebrate our student & freelancer who have suffered",
            "but kept going and surpass their limit and kept moving toward the light",
            "in the dark days",
          ]}
          starsCount={20}
          maxWidth="3xl"
          align="center"
          titleClassName="text-5xl md:text-6xl"
        />

        <Testimonials />
      </div>
    </section>
  );
};

export default SuccessStories;
