import Image from "next/image";
import {
    BarChart3,
    ShieldCheck,
    LayoutGrid,
    MessageSquare,
} from "lucide-react";
import Stars from "../ui/Stars";
import Reveal from "../ui/Reveal";

export default function HeroSection({ children, translations }) {
    const floatingIcons = [
        {
            Icon: ShieldCheck,
            color: "text-emerald-400",
            pos: "top-[20%] left-[15%]",
        },
        { Icon: BarChart3, color: "text-blue-400", pos: "top-[40%] left-[10%]" },
        { Icon: LayoutGrid, color: "text-amber-400", pos: "top-[25%] right-[15%]" },
        {
            Icon: MessageSquare,
            color: "text-orange-400",
            pos: "top-[45%] right-[10%]",
        },
    ];

    return (
        <section className="relative flex items-center justify-center py-36 overflow-hidden h-screen">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-10 right-10 w-[45%] h-[45%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-10 left-10 w-[35%] h-[35%] bg-brand-orange/5 blur-[100px] rounded-full" />
                <Stars count={15} zIndex={-5} opacity={0.6} />
            </div>

            {/* Floating Icons - Client reveal */}
            {floatingIcons.map((item, idx) => (
                <Reveal
                    key={idx}
                    type="scale-up"
                    delay={0.2 + idx * 0.05}
                    className={`absolute ${item.pos} hidden md:block animate-float`}
                >
                    <div className="p-3 glass-card">
                        <item.Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                </Reveal>
            ))}

            <div className="container mx-auto px-6 text-center relative z-10">
                {children}
            </div>
        </section>
    );
}

// Named exports for consistency
export const HeroTitle = ({ children, className = "" }) => (
    <Reveal type="slide-up" duration={0.6} stagger={0.1}>
        <h1 className={`font-bold text-white mb-5 flex flex-col items-center ${className}`}>
            {children}
        </h1>
    </Reveal>
);

export const HeroSubtitle = ({ children, className = "" }) => (
    <Reveal type="slide-up" delay={0.2} duration={0.5} stagger={0.05}>
        <div className={`max-w-3xl mx-auto space-y-4 mb-4 ${className}`}>
            {children}
        </div>
    </Reveal>
);

export const HeroButtons = ({ children, className = "" }) => (
    <Reveal type="scale-up" delay={0.5} duration={0.5} stagger={0.1}>
        <div className={`flex flex-col sm:flex-row gap-6 justify-center ${className}`}>
            {children}
        </div>
    </Reveal>
);
