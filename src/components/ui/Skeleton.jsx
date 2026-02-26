"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white/10 backdrop-blur-sm",
                className
            )}
            {...props}
        />
    );
};

const CardSkeleton = () => {
    return (
        <div className="glass-card p-6 rounded-2xl w-full max-w-sm space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-10 w-24 rounded-lg" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    );
};

export { Skeleton, CardSkeleton };
