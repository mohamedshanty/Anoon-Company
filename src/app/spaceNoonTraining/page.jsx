import Hero from "@/components/common/Hero";
import GetInTouch from "@/components/home/GetInTouch";
import Partners from "@/components/home/Partners";
import TrainingPrograms from "@/components/spaceNoonTraining/TrainingPrograms";
import ImpactSection from "@/components/noonSpace/Impact";
import SpaceNoonTrainingHero from "@/components/spaceNoonTraining/Hero";
import SpaceNoonTrainingProblemSection from "@/components/spaceNoonTraining/SpaceNoonTrainingProblem";

const SpaceNoonTraining = () => {
  return (
    <>
      <SpaceNoonTrainingHero />
      <SpaceNoonTrainingProblemSection />
      <TrainingPrograms />
      <ImpactSection />
      <Partners />
      <GetInTouch />
    </>
  );
};

export default SpaceNoonTraining;
