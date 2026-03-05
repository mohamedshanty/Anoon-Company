import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import MainHero from "@/components/home/MainHeroServer";
import MainInfoSection from "@/components/home/MainInfoServer";
import AIAgentServer from "@/components/home/AIAgentServer";
import ImpactSectionServer from "@/components/home/ImpactServer";
import ProgramsServer from "@/components/home/ProgramsServer";
import TeamsServer from "@/components/home/TeamsServer";
import FAQServer from "@/components/home/FAQServer";
import PartnersServer from "@/components/common/PartnersServer";
import { getTranslations } from "@/lib/i18n-server";

// Dynamic imports only for heavy components or those with lower priority
const GetInTouch = dynamic(() => import("@/components/common/GetInTouch"), { ssr: true });

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18next')?.value || 'en';
  const trans = await getTranslations(lang);
  const isRTL = lang === 'ar';

  return (
    <div className="relative">
      <div className="relative z-10">
        <MainHero t={{...trans.hero, lang}} isRTL={isRTL} />
        <MainInfoSection t={trans.who_we_are_page} isRTL={isRTL} />
        <ProgramsServer t={trans.programs_page} isRTL={isRTL} />
        <AIAgentServer t={trans.ai_agent} isRTL={isRTL} />
        <ImpactSectionServer t={trans.impact_page} statsTrans={trans.stats} isRTL={isRTL} />
        <TeamsServer t={trans.teams} locale={lang} isRTL={isRTL} />
        <PartnersServer t={trans.partners} isRTL={isRTL} />
        <FAQServer t={trans.faq} isRTL={isRTL} />
        <GetInTouch />
      </div>
    </div>
  );
}