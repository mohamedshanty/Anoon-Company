"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PREMIUM_GRADIENT } from "@/lib/constants";

export default function NavMobileMenu({
    navLinks,
    mobileMenuOpen,
    setMobileMenuOpen,
    aboutDropdownOpen,
    setAboutDropdownOpen,
    workDropdownOpen,
    setWorkDropdownOpen,
    handleSectionClick,
    handlePageClick,
    scrolled,
}) {
    const getDropdownState = (key) => {
        if (key === "about") return [aboutDropdownOpen, setAboutDropdownOpen];
        if (key === "work") return [workDropdownOpen, setWorkDropdownOpen];
        return [false, () => { }];
    };

    return (
        <div
            className={`fixed inset-x-0 top-[49px] sm:top-[53px] md:top-[61px] transition-all duration-300 ease-in-out ${mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            style={{ background: PREMIUM_GRADIENT }}
        >
            <div className="flex flex-col p-4 md:p-6 max-h-[calc(100vh-49px)] sm:max-h-[calc(100vh-53px)] md:max-h-[calc(100vh-61px)] overflow-y-auto">
                {navLinks.map((link) => {
                    if (link.hasDropdown) {
                        const [open, setOpen] = getDropdownState(link.dropdownKey);
                        const isWork = link.dropdownKey === "work";

                        return (
                            <div key={link.name} className="mb-1 md:mb-2">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center justify-between w-full text-left rtl:text-right text-white/90 hover:text-white py-2.5 md:py-3 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base cursor-pointer"
                                >
                                    <span>{link.name}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96" : "max-h-0"}`}
                                >
                                    <div className="ltr:pl-4 rtl:pr-4 mt-1 space-y-1">
                                        {isWork ? (
                                            /* Grouped for OUR WORK */
                                            link.items.map((group) => (
                                                <div key={group.groupLabel}>
                                                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/40 px-3 pt-2 pb-1">
                                                        {group.groupLabel}
                                                    </p>
                                                    {group.children.map((child) => (
                                                        <button
                                                            key={child.name}
                                                            onClick={(e) => handlePageClick(e, child.href)}
                                                            className="block w-full text-left rtl:text-right text-white/70 hover:text-white py-2 px-3 hover:bg-white/10 rounded-lg transition-colors text-sm cursor-pointer"
                                                        >
                                                            {child.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            /* Simple for ABOUT */
                                            link.items.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={(e) =>
                                                        item.isPage
                                                            ? handlePageClick(e, item.href)
                                                            : handleSectionClick(e, item.sectionId)
                                                    }
                                                    className="block w-full text-left rtl:text-right text-white/70 hover:text-white py-2 md:py-2.5 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base cursor-pointer"
                                                >
                                                    {item.name}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Regular link
                    return (
                        <button
                            key={link.name}
                            onClick={(e) =>
                                link.isPage
                                    ? handlePageClick(e, link.href)
                                    : handleSectionClick(e, link.sectionId)
                            }
                            className="text-left rtl:text-right text-white/90 hover:text-white py-2.5 md:py-3 px-3 md:px-4 hover:bg-white/10 rounded-lg transition-colors text-sm md:text-base mb-1 md:mb-2 w-full cursor-pointer"
                        >
                            {link.name}
                        </button>
                    );
                })}

                {/* Support CTA */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
                    <Link
                        href="https://donate.stripe.com/dRm8wQ6V2bu9anlfQn1gs00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-4 py-2.5 md:py-3 border-2 border-[#3b82f6] text-white hover:bg-[#3b82f6] rounded-lg transition-all duration-500 text-sm md:text-base font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Support Tamkeen
                    </Link>
                </div>
            </div>
        </div>
    );
}