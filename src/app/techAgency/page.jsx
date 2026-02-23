import GetInTouch from "@/components/home/GetInTouch";
import Newsletter from "@/components/home/Newsletter";
import TechAgencyHero from "@/components/techAgency/Hero";
import IntelligentSolution from "@/components/techAgency/IntelligentSolution";
import LearnMore from "@/components/techAgency/LearnMore";
import OurServices from "@/components/techAgency/OurServices";

const TechAgencyPage = () => {
  return (
    <>
      <TechAgencyHero />
      <IntelligentSolution />
      <OurServices />
      <LearnMore />
      <GetInTouch />
      <Newsletter />
    </>
  );
};

export default TechAgencyPage;
