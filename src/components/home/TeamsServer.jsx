import SectionHeader from "../ui/SectionHeader";
import TeamsClient from "./TeamsClient";
import Reveal from "../ui/Reveal";

const members = [
    { name: "Majd", role: "CTO", image: "/images/teem/majd1.png" },
    { name: "amani", role: "CTO", image: "/images/teem/amani1.png" },
    { name: "hazem", role: "CEO", image: "/images/teem/hazem1.png" },
    { name: "Alla", role: "Lead Developer", image: "/images/teem/alla1.png" },
    { name: "Abdllah", role: "Designer", image: "/images/teem/abdalla1.png" },
    { name: "ghida", role: "Marketing", image: "/images/teem/ghida1.png" },
    { name: "Ihab", role: "Product Manager", image: "/images/teem/Ihab1.png" },
    { name: "Reem", role: "Developer", image: "/images/teem/reem2.png" },
    { name: "Abd El-Moniem", role: "Developer", image: "/images/teem/abdelmoniem1.png" },
];

export default function TeamsServer({ t }) {
    const tRoles = {
        CTO: t.roles?.cto || "CTO",
        CEO: t.roles?.ceo || "CEO",
        "Lead Developer": t.roles?.lead_developer || "Lead Developer",
        Designer: t.roles?.designer || "Designer",
        Marketing: t.roles?.marketing || "Marketing",
        "Product Manager": t.roles?.product_manager || "Product Manager",
        Developer: t.roles?.developer || "Developer",
    };

    return (
        <section id="teams" className="py-24 relative overflow-hidden">
            <div className="main-container relative z-10">
                <Reveal type="slide-up">
                    <SectionHeader
                        title={t.title || "Our Teams"}
                        subtitle={{
                            highlightedWords: [
                                { text: t.subtitle_word1 || "When", color: "text-brand-sky" },
                                { text: t.subtitle_word2 || "Everything", color: "text-brand-orange" },
                                { text: t.subtitle_word3 || "Fell,", color: "text-brand-sky" },
                                { text: t.subtitle_word4 || "We", color: "text-brand-orange" },
                                { text: t.subtitle_word5 || "Stood", color: "text-brand-sky" },
                                { text: t.subtitle_word6 || "Up.", color: "text-brand-orange" },
                            ],
                        }}
                        maxWidth="4xl"
                        align="center"
                        starsCount={0}
                        subtitleClassName="mt-4"
                    />
                </Reveal>

                <Reveal type="fade" delay={0.4}>
                    <TeamsClient members={members} tRoles={tRoles} />
                </Reveal>
            </div>
        </section>
    );
}
