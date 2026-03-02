"use client";

import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function NavActions({ scrolled }) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link
                href="https://donate.stripe.com/dRm8wQ6V2bu9anlfQn1gs00"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:inline-block px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 border-2 font-medium rounded-lg lg:rounded-xl transition-all duration-500 text-xs lg:text-sm whitespace-nowrap ${scrolled
                    ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-blue"
                    : "border-[#3b82f6] text-white hover:bg-[#3b82f6] shadow-lg shadow-blue-600/20"
                    }`}
            >
                {t("nav.support")}
            </Link>
            <LanguageSwitcher />
        </div>
    );
}
