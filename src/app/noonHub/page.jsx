import GetInTouch from "@/components/common/GetInTouch";
import NoonHero from "@/components/noonHub/Hero";
import ImpactSection from "@/components/noonHub/Impact";
import NoonInfoSection from "@/components/noonHub/NoonInfoSection";
import OurSpace from "@/components/common/OurSpace";
import TrainingPrograms from "@/components/noonHub/TrainingPrograms";

const page = () => {
  return (
    <>
      <NoonHero />
      <NoonInfoSection />
      <OurSpace />
      <TrainingPrograms />
      <ImpactSection />
      <GetInTouch />
    </>
  );
};

export default page;
