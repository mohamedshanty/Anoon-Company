import ProgramCard from "../ui/ProgramCard";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

export default function ProgramsServer({ t }) {
  const cards = [
    {
      logo: {
        src: "/images/tamkeen-image.png",
        alt: t.cards[0].logo_alt,
        width: 220,
        height: 100,
      },
      title: (
        <>
          {t.cards[0].title_prefix}{" "}
          <span className="text-brand-green">
            {t.cards[0].title_highlight1}
          </span>{" "}
          {t.cards[0].title_middle}{" "}
          <span className="text-brand-green">
            {t.cards[0].title_highlight2}
          </span>
        </>
      ),
      description: t.cards[0].description,
      primaryBtnText: t.cards[0].primary_btn,
      primaryBtnColor: "green",
      primaryBtnHref: "https://donate.stripe.com/dRm8wQ6V2bu9anlfQn1gs00",
      primaryBtnExternal: true,
      accentGlowClass: "from-green-500/5",
      secondaryBtnText: t.cards[0].secondary_btn,
      secondaryBtnHref: "/tamkeen",
    },
    {
      logo: {
        src: "/images/spaceNoonLogo1.webp",
        alt: t.cards[1].logo_alt,
        width: 200,
        height: 100,
      },
      title: (
        <>
          {t.cards[1].title_prefix}{" "}
          <span className="text-red-500">{t.cards[1].title_highlight1}</span>{" "}
          {t.cards[1].title_middle}{" "}
          <span className="text-brand-orange">
            {t.cards[1].title_highlight2}
          </span>
        </>
      ),
      description: t.cards[1].description,
      primaryBtnText: t.cards[1].primary_btn,
      primaryBtnColor: "orange",
      primaryBtnHref: "/#contact",
      primaryBtnExternal: false,
      accentGlowClass: "from-brand-orange/5",
      logoContainerClassName: "pb-8 mb-3",
      secondaryBtnText: t.cards[1].secondary_btn,
      secondaryBtnHref: "/noonHub",
    },
  ];

  const subtitleWordsArray = t.subtitle_words || [];
  const descriptionLines = t.description || [];

  return (
    <section
      id="programs"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="main-container">
        <Reveal type="slide-up">
          <SectionHeader
            title={t.title}
            subtitle={{ highlightedWords: subtitleWordsArray }}
            description={descriptionLines}
            starsCount={25}
            maxWidth="4xl"
            align="center"
            className="mb-8 md:mb-12 lg:mb-20"
            descriptionClassName="px-4 md:px-0 lg:w-[90%] mx-auto"
          />
        </Reveal>

        <Reveal
          type="slide-up"
          stagger={0.3}
          start="top 75%"
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {cards.map((card, idx) => (
            <div key={idx} className="h-full">
              <ProgramCard {...card} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
