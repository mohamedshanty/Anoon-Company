// components/ui/Stars.jsx
export default function Stars({
    count = 20,
    className = "",
    zIndex = -10,
    opacity = 1
}) {
    // Basic pseudo-random generator to avoid hydration mismatch
    const getStarData = (idx) => {
        const seed = idx * 1.5;
        const x = (Math.sin(seed) * 10000) % 100;
        const y = (Math.cos(seed) * 10000) % 100;
        const s = 2 + (idx % 10);
        const d = (idx % 4) * 0.5;
        const dur = 3 + (idx % 5);
        return { x: Math.abs(x), y: Math.abs(y), s, d, dur };
    };

    const stars = Array.from({ length: count }).map((_, i) => getStarData(i));

    return (
        <div
            className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
            style={{ zIndex }}
            aria-hidden="true"
        >
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute bg-brand-orange rounded-full blur-[3px] animate-pulse"
                    style={{
                        top: `${star.y}%`,
                        left: `${star.x}%`,
                        width: `${star.s}px`,
                        height: `${star.s}px`,
                        opacity: opacity * 0.9,
                        animationDelay: `${star.d}s`,
                        animationDuration: `${star.dur}s`,
                    }}
                />
            ))}
        </div>
    );
}