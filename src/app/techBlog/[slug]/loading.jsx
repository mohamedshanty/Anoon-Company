"use client";

import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen pb-20">
      {/* Hero Skeleton */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-white/5 animate-pulse">
        <div className="relative z-10 container mx-auto px-6 text-center space-y-6">
          <div className="mx-auto w-24 h-6 rounded-full bg-white/10" />
          <div className="mx-auto w-3/4 h-12 md:h-16 rounded-xl bg-white/10" />
          <div className="flex justify-center gap-6">
            <div className="w-20 h-4 rounded-full bg-white/10" />
            <div className="w-20 h-4 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <div className="h-4 bg-white/5 rounded-full w-full" />
            <div className="h-4 bg-white/5 rounded-full w-full" />
            <div className="h-4 bg-white/5 rounded-full w-5/6" />
          </div>
          <div className="h-[400px] bg-white/5 rounded-3xl w-full" />
          <div className="space-y-4">
            <div className="h-4 bg-white/5 rounded-full w-full" />
            <div className="h-4 bg-white/5 rounded-full w-full" />
            <div className="h-4 bg-white/5 rounded-full w-4/6" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
             <div className="h-10 bg-white/10 rounded-xl w-full" />
             <div className="h-10 bg-white/10 rounded-xl w-full" />
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-6">
             <div className="h-6 bg-white/10 rounded-md w-1/2" />
             <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded-full w-full" />
                <div className="h-4 bg-white/5 rounded-full w-full" />
                <div className="h-4 bg-white/5 rounded-full w-2/3" />
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
