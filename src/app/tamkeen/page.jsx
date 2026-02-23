import GetInTouch from "@/components/home/GetInTouch";
import Partners from "@/components/home/Partners";
import SuccessStories from "@/components/home/SuccessStories";
import Newsletter from "@/components/home/Newsletter";
import ImpactSection from "@/components/home/tamkeen/Impact";
import TamkeenHero from "@/components/home/tamkeen/Hero";
import TamkeenInfoSection from "@/components/home/tamkeen/TamkeenInfo";

const tamkeen = () => {
  return (
    <>
      <TamkeenHero />
      <TamkeenInfoSection />
      <SuccessStories />
      <ImpactSection />
      <Partners />
      <GetInTouch />
      <Newsletter />
    </>
  );
};

export default tamkeen;
