import React from 'react';

const Sparks = ({ count = 6, className = "" }) => {
    // Fixed positions and delays to match the visual design while allowing flexibility
    const sparks = [
        { top: '-40%', left: '10%', delay: '0s', opacity: 'opacity-60' },
        { top: '10%', left: '-10%', delay: '0.7s', opacity: 'opacity-40' },
        { top: '-60%', right: '30%', delay: '0.3s', opacity: 'opacity-50' },
        { top: '0%', right: '-15%', delay: '1s', opacity: 'opacity-60' },
        { bottom: '-50%', left: '15%', delay: '0.5s', opacity: 'opacity-50' },
        { bottom: '-40%', right: '40%', delay: '1.2s', opacity: 'opacity-40' },
    ];

    return (
        <div className={`absolute inset-0 pointer-events-none -z-10 overflow-visible ${className}`}>
            {sparks.slice(0, count).map((spark, i) => (
                <div
                    key={i}
                    className={`absolute star-particle ${spark.opacity} shrink-0`}
                    style={{
                        top: spark.top,
                        left: spark.left,
                        right: spark.right,
                        bottom: spark.bottom,
                        animationDelay: spark.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default Sparks;
