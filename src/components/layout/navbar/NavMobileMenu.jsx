"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PREMIUM_GRADIENT } from "@/lib/constants";
import { useTranslation } from "react-i18next";

export default function NavMobileMenu({
    navLinks,
    mobileMenuOpen,
    setMobileMenuOpen,
    programsDropdownOpen,
    setProgramsDropdownOpen,
    handleSectionClick,
    handleProgramClick,
    scrolled
}) {
    const { t } = useTranslation();

    return (
        <div
            className={`fixed inset-x-0 top-[49px] sm:top-[53px] md:top-[61px] transition-all duration-300 ease-in-out ${mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            style={
                { background: PREMIUM_GRADIENT }
            }
        >
            <div className="flex flex-col p-4 md:p-6 max-h-[calc(100vh-49px)] sm:max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-61px)] overflow-y-auto">
                {navLinks.map((link) =>
                    link.name === t("nav.programs") ? (
                        <div key={link.name} className="mb-1 md:mb-2">
                            <button
                                onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                                className="flex items-center justify-between w-full text-left rtl:text-right text-white/90 hover:text-white py-2.5 md:py-3 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base cursor-pointer"
                            >
                                <span>{link.name}</span>
                                <ChevronDown
                                    className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${programsDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-200 ${programsDropdownOpen ? "max-h-40" : "max-h-0"
                                    }`}
                            >
                                <div className="ltr:pl-6 rtl:pr-6 mt-1 space-y-1">
                                    <button
                                        onClick={(e) => handleProgramClick(e, "/tamkeen")}
                                        className="block w-full text-left rtl:text-right text-white/70 hover:text-white py-2 md:py-2.5 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base cursor-pointer"
                                    >
                                        {t("nav.dropdown.tamkeen")}
                                    </button>
                                    <button
                                        onClick={(e) => handleProgramClick(e, "/noonHub")}
                                        className="block w-full text-left rtl:text-right text-white/70 hover:text-white py-2 md:py-2.5 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base cursor-pointer"
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
                            className="text-left rtl:text-right text-white/90 hover:text-white py-2.5 md:py-3 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base mb-1 md:mb-2 w-full cursor-pointer"
                        >
                            {link.name}
                        </button>
                    )
                )}

                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
                    <Link
                        href="https://donate.stripe.com/dRm8wQ6V2bu9anlfQn1gs00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-4 py-2.5 md:py-3 border-2 border-[#3b82f6] text-white hover:bg-[#3b82f6] rounded-lg transition-all duration-500 text-sm md:text-base font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t("nav.support")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
