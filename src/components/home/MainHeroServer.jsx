import HeroSection, { HeroTitle, HeroSubtitle, HeroButtons } from "@/components/common/HeroSection";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function MainHeroServer({ t }) {
    return (
        <HeroSection>
            <HeroTitle className="md:leading-27">
                <span>{t.title_rising}</span>
                <span className="text-brand-orange"> {t.title_ashes}</span>
                <span>
                    {" "}{t.title_build} <span className="text-brand-sky">{t.title_future}</span>
                </span>
            </HeroTitle>

            <HeroSubtitle className="mb-10">
                <p className="text-subtitle font-light text-white/90">
                    {t.subtitle_spirit}
                    <span className="text-brand-orange">{t.subtitle_spirit_highlight}</span>
                </p>
                <p className="text-subtitle font-light text-white/90">
                    {t.subtitle_ours}
                    <span className="text-brand-orange">{t.subtitle_ours_highlight}</span>
                </p>
                <p className="text-subtitle font-light text-white/90">
                    {t.subtitle_rise}
                    <span className="text-brand-orange">{t.subtitle_rise_highlight}</span>
                </p>
            </HeroSubtitle>

            <HeroButtons>
                <Link href="/noonHub">
                    <Button variant="outline" color="orange">
                        {t.button_services}
                    </Button>
                </Link>

                <Link href="/#contact" >
                    <Button variant="outline" color="sky">
                        {t.button_meeting}
                    </Button>
                </Link>
            </HeroButtons>
        </HeroSection>
    );
}
