import HeroSection, {
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
} from "@/components/common/HeroSection";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function MainHeroServer({ t }) {
  return (
    <HeroSection>
      <HeroTitle
        className={`mb-3 flex flex-col items-center font-semibold ${t.lang === "ar" ? "text-[30px] sm:text-4xl md:text-5xl lg:text-5xl leading-10 sm:leading-15 md:leading-20 lg:leading-25" : ""}`}
      >
        <span>{t.title_rising}</span>
        <span className="block text-brand-orange">{t.title_ashes}</span>
        <span className="block">
          {t.title_build}{" "}
          <span className="text-brand-sky">{t.title_future}</span>
        </span>
      </HeroTitle>

      <HeroSubtitle className={`mb-10`}>
        <p className="text-subtitle font-light text-white/90 text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {t.subtitle_spirit}{" "}
          <span className="text-brand-orange text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {t.subtitle_spirit_highlight}
          </span>
        </p>
        <p className="text-subtitle font-light text-white/90 text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {t.subtitle_ours}{" "}
          <span className="text-brand-orange text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {t.subtitle_ours_highlight}
          </span>
        </p>
        <p className="text-subtitle font-light text-white/90 text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {t.subtitle_rise}{" "}
          <span className="text-brand-orange text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {t.subtitle_rise_highlight}
          </span>
        </p>
      </HeroSubtitle>

      <HeroButtons>
        <Link href="/noonHub">
          <Button variant="outline" color="orange">
            {t.button_services}
          </Button>
        </Link>

        <Link href="/#contact">
          <Button variant="outline" color="sky">
            {t.button_meeting}
          </Button>
        </Link>
      </HeroButtons>
    </HeroSection>
  );
}
