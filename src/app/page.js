import Programs from "@/components/home/Programs";
import AIAgent from "@/components/home/AIAgent";
import Teams from "@/components/home/Teams";
import Partners from "@/components/home/Partners";
import FAQ from "@/components/home/FAQ";
import GetInTouch from "@/components/home/GetInTouch";
import ImpactSection from "@/components/home/Impact";
import MainHero from "@/components/home/Hero";
import MainInfoSection from "@/components/home/MainInfo";

export default function Home() {
  return (
    <div className="relative">
      {/* Global Background Glows */}

      <div className="relative z-10">
        <MainHero />
        <MainInfoSection />
        <Programs />
        <AIAgent />
        <ImpactSection />
        <Teams />
        <Partners />
        <FAQ />
        <GetInTouch />
      </div>
    </div>
  );
}
