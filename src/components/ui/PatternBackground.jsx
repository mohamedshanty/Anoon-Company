// components/ui/PatternBackground.tsx
import Image from "next/image";

export default function PatternBackground({
    direction = 'default',
    opacity = 'opacity-70',
    className = '',
    translateY = '-translate-y-30',
    priority = false
}) {

    const directionClass = direction === 'diagonal'
        ? 'rotate-[160deg]'
        : '';

    return (
        <div className={`absolute inset-0 pointer-events-none -z-20 ${opacity} overflow-hidden ${className}`}>
            <div className={`relative w-full h-full ${directionClass}`}>
                <Image
                    src="/images/pattern.png"
                    alt="Background Pattern"
                    fill
                    className={`object-cover ${translateY}`}
                    priority={priority}
                />
            </div>
        </div>
    );
}