import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import MainHero from "@/components/home/MainHeroServer";
import MainInfoSection from "@/components/home/MainInfoServer";
import ProgramsServer from "@/components/home/ProgramsServer";
import { getTranslations } from "@/lib/i18n-server";
// Swiper-heavy — client wrapper performs ssr:false dynamic internally
import TeamsClientLoader from "@/components/home/TeamsClientLoader";
// GetInTouch has GSAP + reCAPTCHA — client wrapper performs ssr:false dynamic internally
import GetInTouchLoader from "@/components/common/GetInTouchLoader";

// Below-fold server components: lazy-loaded to reduce initial JS bundle
const AIAgentServer = dynamic(() => import("@/components/home/AIAgentServer"));
const ImpactSectionServer = dynamic(
  () => import("@/components/home/ImpactServer"),
);
const PartnersServer = dynamic(
  () => import("@/components/common/PartnersServer"),
);
const FAQServer = dynamic(() => import("@/components/home/FAQServer"));

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("i18next")?.value || "en";
  const trans = await getTranslations(lang);
  const isRTL = lang === "ar";

  return (
    <div className="relative">
      <div className="relative z-10">
        <MainHero t={{ ...trans.hero, lang }} isRTL={isRTL} />
        <MainInfoSection t={trans.who_we_are_page} isRTL={isRTL} />
        <ProgramsServer t={trans.programs_page} isRTL={isRTL} />
        <AIAgentServer t={trans.ai_agent} isRTL={isRTL} />
        <ImpactSectionServer
          t={trans.impact_page}
          statsTrans={trans.stats}
          isRTL={isRTL}
        />
        <TeamsClientLoader t={trans.teams} locale={lang} isRTL={isRTL} />
        <PartnersServer t={trans.partners} isRTL={isRTL} />
        <FAQServer t={trans.faq} isRTL={isRTL} />
        <GetInTouchLoader />
      </div>
    </div>
  );
}
