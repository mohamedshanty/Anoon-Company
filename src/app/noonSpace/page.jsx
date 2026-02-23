import GetInTouch from "@/components/home/GetInTouch";
import Partners from "@/components/home/Partners";
import OurSpace from "@/components/noonHub/OurSpace";
import SpaceNoonHero from "@/components/noonSpace/Hero";
import ImpactSection from "@/components/noonSpace/Impact";
import SpaceNoonProblemSection from "@/components/noonSpace/SpaceNoonProblem";
import React from "react";

const NoonSapce = () => {
  return (
    <>
      <SpaceNoonHero />
      <SpaceNoonProblemSection />
      <OurSpace />
      <ImpactSection />
      <Partners />
      <GetInTouch />
    </>
  );
};

export default NoonSapce;
