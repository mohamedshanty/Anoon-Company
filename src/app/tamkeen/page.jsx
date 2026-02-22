import GetInTouch from "@/components/home/GetInTouch";
import Hero from "@/components/home/tamkeen/Hero";
import Impact from "@/components/home/Impact";
import Partners from "@/components/home/Partners";
import SuccessStories from "@/components/home/SuccessStories";
import WhoWeAre from "@/components/home/tamkeen/WhoWeAre";
import Newsletter from "@/components/home/Newsletter";
import ImpactSection from "@/components/home/tamkeen/Impact";

const tamkeen = () => {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <SuccessStories />
      <ImpactSection />
      <Partners />
      <GetInTouch />
      <Newsletter />
    </>
  );
};

export default tamkeen;
