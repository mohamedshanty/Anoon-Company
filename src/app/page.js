import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import MainHero from "@/components/home/MainHeroServer";
import MainInfoSection from "@/components/home/MainInfoServer";
import ProgramsServer from "@/components/home/ProgramsServer";
import { getTranslations } from "@/lib/i18n-server";

// Below-fold: lazy-loaded to reduce initial JS
const AIAgentServer = dynamic(() => import("@/components/home/AIAgentServer"));
const ImpactSectionServer = dynamic(
  () => import("@/components/home/ImpactServer"),
);
const TeamsServer = dynamic(() => import("@/components/home/TeamsServer"));
const PartnersServer = dynamic(
  () => import("@/components/common/PartnersServer"),
);
const FAQServer = dynamic(() => import("@/components/home/FAQServer"));
const GetInTouch = dynamic(() => import("@/components/common/GetInTouch"), {
  ssr: true,
});

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
        <TeamsServer t={trans.teams} locale={lang} isRTL={isRTL} />
        <PartnersServer t={trans.partners} isRTL={isRTL} />
        <FAQServer t={trans.faq} isRTL={isRTL} />
        <GetInTouch />
      </div>
    </div>
  );
}
