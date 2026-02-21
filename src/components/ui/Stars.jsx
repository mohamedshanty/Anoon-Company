// components/ui/Stars.tsx
"use client";

import { useEffect, useRef } from "react";



export default function Stars({
    count = 20,
    className = "",
    zIndex = -10,
    opacity = 1
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const stars = [];

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');

            const top = Math.random() * 100;
            const left = Math.random() * 100;

            const delay = Math.random() * 2;

            star.className = `star-particle absolute`;
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.opacity = String(opacity * (0.5 + Math.random() * 0.5));

            stars.push(star);
        }

        stars.forEach(star => container.appendChild(star));

        return () => {
            stars.forEach(star => star.remove());
        };
    }, [count, opacity]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex }}
        />
    );
}