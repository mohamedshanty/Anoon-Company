import { cookies } from "next/headers";
import GetInTouch from "@/components/common/GetInTouch";
import PartnersServer from "@/components/common/PartnersServer";
import TrainingPrograms from "@/components/spaceNoonTraining/TrainingPrograms";
import ImpactSection from "@/components/noonSpace/Impact";
import SpaceNoonTrainingHero from "@/components/spaceNoonTraining/Hero";
import SpaceNoonTrainingProblemSection from "@/components/spaceNoonTraining/SpaceNoonTrainingProblem";
import { getTranslations } from "@/lib/i18n-server";

const SpaceNoonTraining = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18next')?.value || 'en';
  const trans = await getTranslations(lang);
  const isRTL = lang === 'ar';

  return (
    <>
      <SpaceNoonTrainingHero />
      <SpaceNoonTrainingProblemSection />
      <TrainingPrograms />
      <ImpactSection />
      <PartnersServer t={trans.partners} isRTL={isRTL} />
      <GetInTouch />
    </>
  );
};

export default SpaceNoonTraining;
