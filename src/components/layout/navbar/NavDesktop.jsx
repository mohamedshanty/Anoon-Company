"use client";

import { ChevronDown } from "lucide-react";

export default function NavDesktop({
    navLinks,
    handleSectionClick,
    handlePageClick,
    aboutDropdownOpen,
    setAboutDropdownOpen,
    workDropdownOpen,
    setWorkDropdownOpen,
}) {
    const getDropdownState = (key) => {
        if (key === "about") return [aboutDropdownOpen, setAboutDropdownOpen];
        if (key === "work") return [workDropdownOpen, setWorkDropdownOpen];
        return [false, () => { }];
    };

    return (
        <div className="hidden 2xl:flex flex-1 items-center justify-center gap-1 xl:gap-2 mx-4 lg:mx-8">
            {navLinks.map((link) => {
                if (link.hasDropdown) {
                    const [open, setOpen] = getDropdownState(link.dropdownKey);
                    const isWork = link.dropdownKey === "work";

                    return (
                        <div
                            key={link.name}
                            className="relative flex-1"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button className="text-white text-sm xl:text-base font-medium hover:text-white/90 transition-colors duration-200 flex items-center justify-center whitespace-nowrap px-2 py-2 w-full cursor-pointer">
                                <span>{link.name}</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 ltr:ml-1 rtl:mr-1 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown Panel */}
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 transition-all duration-200 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                                    } ${isWork ? "w-64" : "w-48"}`}
                            >
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                    {isWork ? (
                                        /* Grouped dropdown for OUR WORK */
                                        link.items.map((group) => (
                                            <div key={group.groupLabel}>
                                                <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-100">
                                                    {group.groupLabel}
                                                </div>
                                                {group.children.map((child) => (
                                                    <button
                                                        key={child.name}
                                                        onClick={(e) => handlePageClick(e, child.href)}
                                                        className="block w-full px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm text-left cursor-pointer transition-colors"
                                                    >
                                                        {child.name}
                                                    </button>
                                                ))}
                                            </div>
                                        ))
                                    ) : (
                                        /* Simple dropdown for ABOUT */
                                        link.items.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={(e) =>
                                                    item.isPage
                                                        ? handlePageClick(e, item.href)
                                                        : handleSectionClick(e, item.sectionId)
                                                }
                                                className="block w-full px-4 py-2.5 text-brand-blue hover:bg-blue-50 font-medium text-sm text-left cursor-pointer transition-colors"
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
                        className="text-white/80 hover:text-white font-normal transition-colors duration-200 text-sm xl:text-base whitespace-nowrap px-2 py-2 text-center flex-1 min-w-[60px] lg:min-w-[80px] cursor-pointer"
                    >
                        {link.name}
                    </button>
                );
            })}
        </div>
    );
}