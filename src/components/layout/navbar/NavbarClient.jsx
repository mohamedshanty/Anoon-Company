"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PREMIUM_GRADIENT } from "@/lib/constants";

import NavBrand from "./NavBrand";
import NavDesktop from "./NavDesktop";
import NavMobileToggle from "./NavMobileToggle";
import NavMobileMenu from "./NavMobileMenu";
import NavActions from "./NavActions";

export default function NavbarClient() {
    const { t, i18n } = useTranslation();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [workDropdownOpen, setWorkDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        setAboutDropdownOpen(false);
        setWorkDropdownOpen(false);

        if (pathname === "/" || pathname === "/ar") {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        } else {
            router.push(`/#${sectionId}`);
        }
    };

    const handlePageClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        setAboutDropdownOpen(false);
        setWorkDropdownOpen(false);
        router.push(href);
    };

    const navLinks = [
        {
            name: t("nav.home"),
            href: "/",
            isPage: true,
        },
        {
            name: t("nav.about"),
            hasDropdown: true,
            dropdownKey: "about",
            items: [
                { name: t("nav.dropdown.mission"), sectionId: "about" },
                { name: t("nav.dropdown.impact"), sectionId: "impact" },
                { name: t("nav.dropdown.team"), sectionId: "teams" },
                { name: t("nav.dropdown.partners"), sectionId: "partner" },
                { name: t("nav.dropdown.stories"), href: "/tamkeen#stories", isPage: true },
            ],
        },
        {
            name: t("nav.ourWork"),
            hasDropdown: true,
            dropdownKey: "work",
            items: [
                {
                    groupLabel: t("nav.dropdown.forBusinesses"),
                    children: [
                        { name: t("nav.dropdown.aiAgent"), href: "/techAgency", isPage: true },
                    ],
                },
                {
                    groupLabel: t("nav.dropdown.forStudents"),
                    children: [
                        { name: t("nav.dropdown.tamkeen"), href: "/tamkeen", isPage: true },
                        { name: t("nav.dropdown.spaceNoon"), href: "/noonSpace", isPage: true },
                        { name: t("nav.dropdown.training"), href: "/spaceNoonTraining", isPage: true },
                    ],
                },
            ],
        },
        { name: t("nav.impact"), href: "#impact", sectionId: "impact" },
        { name: t("nav.blog"), href: "/techBlog", isPage: true },
        { name: t("nav.contact"), href: "#contact", sectionId: "contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                    ? "backdrop-blur-xl border-b border-white/10 py-2 md:py-3 shadow-2xl"
                    : "bg-transparent py-3 md:py-5"
                }`}
            style={scrolled ? { background: PREMIUM_GRADIENT } : {}}
        >
            <div className="main-container flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <NavBrand scrolled={scrolled} />

                <NavDesktop
                    navLinks={navLinks}
                    handleSectionClick={handleSectionClick}
                    handlePageClick={handlePageClick}
                    aboutDropdownOpen={aboutDropdownOpen}
                    setAboutDropdownOpen={setAboutDropdownOpen}
                    workDropdownOpen={workDropdownOpen}
                    setWorkDropdownOpen={setWorkDropdownOpen}
                />

                <div className="flex-1 2xl:hidden h-px" />

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <NavActions scrolled={scrolled} />
                    <NavMobileToggle
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />
                </div>
            </div>

            <NavMobileMenu
                navLinks={navLinks}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                aboutDropdownOpen={aboutDropdownOpen}
                setAboutDropdownOpen={setAboutDropdownOpen}
                workDropdownOpen={workDropdownOpen}
                setWorkDropdownOpen={setWorkDropdownOpen}
                handleSectionClick={handleSectionClick}
                handlePageClick={handlePageClick}
                scrolled={scrolled}
            />
        </nav>
    );
}