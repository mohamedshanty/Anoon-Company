"use client";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NavDesktop({ navLinks, handleSectionClick, handleProgramClick }) {
    const { t } = useTranslation();

    return (
        <div className="hidden 2xl:flex flex-1 items-center justify-center gap-1 xl:gap-2 mx-4 lg:mx-8">
            {navLinks.map((link) =>
                link.name === t("nav.programs") ? (
                    <div className="relative group flex-1" key={link.name}>
                        <button className="text-white text-sm xl:text-base font-medium hover:text-white/90 transition-colors duration-200 flex items-center justify-center whitespace-nowrap px-2 py-2 min-w-[80px] lg:min-w-[100px] w-full cursor-pointer">
                            <span>{link.name}</span>
                            <ChevronDown className="w-3.5 h-3.5 ltr:ml-1 rtl:mr-1 shrink-0" />
                        </button>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-40 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <button
                                    onClick={(e) => handleProgramClick(e, "/tamkeen")}
                                    className="block w-full px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm text-center cursor-pointer transition-colors"
                                >
                                    {t("nav.dropdown.tamkeen")}
                                </button>
                                <button
                                    onClick={(e) => handleProgramClick(e, "/noonHub")}
                                    className="block w-full px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm text-center cursor-pointer transition-colors"
                                >
                                    {t("nav.dropdown.anoon")}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        key={link.name}
                        onClick={(e) => link.isPage ? handleProgramClick(e, link.href) : handleSectionClick(e, link.sectionId)}
                        className="text-white/80 hover:text-white font-normal transition-colors duration-200 text-sm xl:text-base whitespace-nowrap px-2 py-2 text-center flex-1 min-w-[60px] lg:min-w-[80px] cursor-pointer"
                    >
                        {link.name}
                    </button>
                )
            )}
        </div>
    );
}
