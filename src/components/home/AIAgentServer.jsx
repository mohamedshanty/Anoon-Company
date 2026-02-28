import { Check } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import PatternBackground from "../ui/PatternBackground";
import AIAgentImage from "../ui/AIAgentImage";
import Link from "next/link";

export default function AIAgentServer({ t }) {
    const features = t.features || [];

    return (
        <section
            id="ai-agent"
            className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
        >
            {/* Global Background Glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-sky/20 to-transparent transform -skew-y-12" />
                <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-brand-sky/5 blur-[120px] rounded-full animate-pulse" />
            </div>

            {/* Background Pattern */}
            <PatternBackground direction="default" translateY="-translate-y-30" />

            <div className="main-container">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12">
                    {/* Left Content - The Text Side */}
                    <Reveal
                        type="slide-left"
                        className="w-full space-y-6 md:space-y-8 lg:space-y-10 order-2 lg:order-1"
                    >
                        <div className="space-y-3 md:space-y-4">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1] tracking-tight">
                                <span className="text-brand-orange">{t.title_main}</span>{" "}
                                <span className="text-brand-sky opacity-80">{t.title_sub}</span>
                            </h2>
                            <div className="space-y-1 md:space-y-2">
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-snug tracking-[0.05em] text-white/90">
                                    <span className="text-brand-orange/80">{t.intelligent}</span>{" "}
                                    <span className="text-brand-sky/60">{t.software}</span>
                                    <br className="hidden sm:block" />
                                    <span className="text-brand-sky/60">{t.for_better}</span>{" "}
                                    <span className="text-brand-orange/80 font-medium tracking-[0.02em]">
                                        {t.business}
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <Reveal
                            type="slide-up"
                            stagger={0.15}
                            start="top 75%"
                            className="space-y-4 md:space-y-5 lg:space-y-6 pt-2"
                        >
                            {features.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 group"
                                >
                                    <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-brand-sky flex items-center justify-center shadow-[0_0_20px_rgba(96,180,255,0.3)]">
                                        <Check
                                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-brand-blue"
                                            strokeWidth={4}
                                        />
                                    </div>
                                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-brand-sky font-medium tracking-[0.03em] opacity-90">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </Reveal>

                        <div className="pt-4 md:pt-6 lg:pt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            <Link href={"https://meet.google.com"} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="filled"
                                    color="sky"
                                    className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg"
                                >
                                    {t.btn_meeting}
                                </Button>
                            </Link>
                            <Link href={"/techAgency"}>
                                <Button
                                    variant="outline"
                                    color="sky"
                                    className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg"
                                >
                                    {t.btn_more}
                                </Button>
                            </Link>
                        </div>
                    </Reveal>

                    {/* Right Content - Image */}
                    <Reveal
                        type="slide-right"
                        className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center"
                    >
                        <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]">
                            <AIAgentImage className="w-full h-full" />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
