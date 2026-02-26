"use client";

import React from "react";

const Loader = ({ size = "md", color = "sky" }) => {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-3",
        lg: "w-16 h-16 border-4",
    };

    const colorClasses = {
        sky: "border-brand-sky/20 border-t-brand-sky",
        orange: "border-brand-orange/20 border-t-brand-orange",
        white: "border-white/20 border-t-white",
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
            />
        </div>
    );
};

export default Loader;
