import { LineChart, Briefcase, Star, User } from "lucide-react";
import Impact from "@/components/common/ImpactServer"; // I'll refactor Impact to be server-friendly
import Link from 'next/link';

export default function ImpactSectionServer({ t, statsTrans, isRTL }) {
    const mainPageStats = [
        {
            id: "freelancers",
            icon: <User className="text-brand-orange" />,
            value: "11,000",
            label: statsTrans.freelancers,
        },
        {
            id: "success",
            icon: <Star className="text-brand-orange" />,
            value: "50 %",
            label: statsTrans.success,
        },
        {
            id: "courses",
            icon: <LineChart className="text-brand-orange" />,
            value: "3",
            label: statsTrans.courses,
        },
        {
            id: "workspace",
            icon: <Briefcase className="text-brand-orange" />,
            value: "11",
            label: statsTrans.workspace,
        },
    ];

    return (
        <Impact patternDirection="diagonal" className="pt-10" isRTL={isRTL}>
            <Impact.Title>
                <span className="text-brand-sky">{t.title.first_word}</span>{" "}
                <span className="text-brand-orange">{t.title.second_word}</span>
            </Impact.Title>

            <Impact.AdditionalText>
                {t.additional_text}
            </Impact.AdditionalText>

            <Impact.Subtitle>
                <p>{t.subtitle.line1}</p>
                <p className="text-brand-orange">{t.subtitle.line2.highlight}</p>
            </Impact.Subtitle>

            <Impact.Description>
                {t.description}
            </Impact.Description>

            <Impact.Stats stats={mainPageStats} />
        </Impact>
    );
}
