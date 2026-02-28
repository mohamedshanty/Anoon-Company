"use client";

import { Menu, X } from "lucide-react";

export default function NavMobileToggle({ mobileMenuOpen, setMobileMenuOpen }) {
    return (
        <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer 2xl:hidden flex"
            aria-label="Toggle menu"
        >
            {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
        </button>
    );
}
