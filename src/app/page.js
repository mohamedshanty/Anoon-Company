import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import WhoWeAre from "@/components/home/WhoWeAre";
import Programs from "@/components/home/Programs";
import AIAgent from "@/components/home/AIAgent";
import Impact from "@/components/home/Impact";
import Teams from "@/components/home/Teams";
import Partners from "@/components/home/Partners";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import GetInTouch from "@/components/home/GetInTouch";

export default function Home() {
  return (
    <div className="relative">
      {/* Global Background Glows */}

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <WhoWeAre />
        <Programs />
        <AIAgent />
        <Impact />
        <Teams />
        <Partners />
        <FAQ />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
}
