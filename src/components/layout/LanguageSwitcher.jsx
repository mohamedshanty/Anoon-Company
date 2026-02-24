"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "../../i18n";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language || "en");

    useEffect(() => {
        const lang = i18n.language || "en";
        setCurrentLang(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);

    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label={currentLang === "en" ? "Switch to Arabic" : "Switch to English"}
        >
            {currentLang === "en" ? (
                /* UK Flag */
                <svg
                    className="w-6 h-4 lg:w-7 lg:h-5 rounded-[2px] shadow-lg"
                    viewBox="0 0 60 30"
                >
                    <clipPath id="s">
                        <path d="M0,0 v30 h60 v-30 z" />
                    </clipPath>
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                    <path
                        d="M0,0 L60,30 M60,0 L0,30"
                        stroke="#C8102E"
                        strokeWidth="4"
                    />
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
                </svg>
            ) : (
                /* Palestinian Flag */
                <svg
                    className="w-6 h-4 lg:w-7 lg:h-5 rounded-[2px] shadow-lg"
                    viewBox="0 0 60 30"
                >
                    <rect width="60" height="10" fill="black" />
                    <rect y="10" width="60" height="10" fill="white" />
                    <rect y="20" width="60" height="10" fill="#007A3D" />
                    <polygon points="0,0 20,15 0,30" fill="#EE2A35" />
                </svg>
            )}
        </button>
    );
}
