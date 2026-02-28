import { cookies } from "next/headers";
import GetInTouch from "@/components/common/GetInTouch";
import PartnersServer from "@/components/common/PartnersServer";
import SuccessStories from "@/components/tamkeen/SuccessStories";
import Newsletter from "@/components/common/Newsletter";
import ImpactSection from "@/components/tamkeen/Impact";
import TamkeenHero from "@/components/tamkeen/Hero";
import TamkeenInfoSection from "@/components/tamkeen/TamkeenInfo";
import { getTranslations } from "@/lib/i18n-server";

export default async function TamkeenPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18next')?.value || 'en';
  const trans = await getTranslations(lang);
  const isRTL = lang === 'ar';

  return (
    <>
      <TamkeenHero />
      <TamkeenInfoSection />
      <SuccessStories />
      <ImpactSection />
      <PartnersServer t={trans.partners} isRTL={isRTL} />
      <GetInTouch />
      <Newsletter />
    </>
  );
}
