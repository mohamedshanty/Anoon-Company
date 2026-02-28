import Stars from "../ui/Stars";
import Reveal from "../ui/Reveal";
import PartnersClient from "./PartnersClient";

const partners = [
    { name: "SHELLS", image: "/images/partner1.png" },
    { name: "SmartFinder", image: "/images/partner2.png" },
    { name: "Zoomerr", image: "/images/partner3.png" },
    { name: "ArtVenue", image: "/images/partner4.png" },
];

export default function PartnersServer({ t, isRTL }) {
    return (
        <section id="partner" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
            <Stars count={30} />

            <div className="main-container">
                <Reveal type="slide-up">
                    <div className="text-center mb-12 md:mb-16 px-4">
                        <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
                            {t.title || "Our Partner"}
                        </h2>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#6EC1FF] mb-4">
                            {t.subtitle || "Working Together to Make Progress"}
                        </h3>
                    </div>
                </Reveal>

                <PartnersClient partners={partners} isRTL={isRTL} />
            </div>
        </section>
    );
}
