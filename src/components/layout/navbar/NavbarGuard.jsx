"use client";
// components/layout/navbar/NavbarGuard.jsx
// Renders children (Navbar or Footer) only when NOT on a /dashboard route.

import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/dashboard"];

export default function NavbarGuard({ children }) {
  const pathname = usePathname();

  const isHidden = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isHidden) return null;
  return children;
}
