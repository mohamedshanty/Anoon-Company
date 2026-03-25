import { cookies } from "next/headers";
import GetInTouch from "@/components/common/GetInTouch";
import PartnersServer from "@/components/common/PartnersServer";
import OurSpace from "@/components/common/OurSpace";
import SpaceNoonHero from "@/components/noonSpace/Hero";
import ImpactSection from "@/components/noonSpace/Impact";
import SpaceNoonProblemSection from "@/components/noonSpace/SpaceNoonProblem";
import { getTranslations } from "@/lib/i18n-server";
import React from "react";
import WorkSpace from "@/components/noonSpace/WorkSpace";
import PricingSection from "@/components/noonSpace/Price";

const NoonSapce = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18next')?.value || 'en';
  const trans = await getTranslations(lang);
  const isRTL = lang === 'ar';

  return (
    <>
      <SpaceNoonHero />
      <SpaceNoonProblemSection />
      <WorkSpace />
      <OurSpace />
      <PricingSection />
      <ImpactSection />
      {/* <PartnersServer t={trans.partners} isRTL={isRTL} /> */}
      <GetInTouch />
    </>
  );
};

export default NoonSapce;
