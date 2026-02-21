// components/layout/PageWrapper.tsx
"use client";

import { useRef } from "react";
import PatternBackground from "../ui/PatternBackground";


export default function PageWrapper({ children }) {
    return (
        <PatternBackground
            direction="diagonal"
            opacity="opacity-30"
            translateY="-translate-y-50"
            zIndex={-5}
            className="min-h-screen"
        >
            {children}
        </PatternBackground>
    );
}