"use client";

import React, { useState } from "react";
import { Check, Zap, Star, Crown } from "lucide-react";
import Button from "../ui/Button";

const plans = [
    {
        id: "starter",
        icon: Zap,
        label: "Starter",
        price: { monthly: 29, yearly: 19 },
        description: "Perfect for individuals and small projects.",
        accent: "#4dabff",
        features: [
            "Up to 5 projects",
            "10 GB storage",
            "Basic analytics",
            "Email support",
            "API access",
        ],
        cta: "Get Started",
    },
    {
        id: "pro",
        icon: Star,
        label: "Pro",
        price: { monthly: 79, yearly: 59 },
        description: "Ideal for growing teams and businesses.",
        accent: "#f99d1b",
        popular: true,
        features: [
            "Unlimited projects",
            "100 GB storage",
            "Advanced analytics",
            "Priority support",
            "API access",
            "Custom integrations",
            "Team collaboration",
        ],
        cta: "Start Free Trial",
    },
    {
        id: "enterprise",
        icon: Crown,
        label: "Enterprise",
        price: { monthly: 199, yearly: 149 },
        description: "For large organizations with custom needs.",
        accent: "#4dabff",
        features: [
            "Unlimited projects",
            "1 TB storage",
            "Custom analytics",
            "24/7 dedicated support",
            "Full API access",
            "White-label solution",
            "SLA guarantee",
            "On-premise option",
        ],
        cta: "Contact Sales",
    },
];

export default function PricingSection({ t, isRTL }) {
    const [billing, setBilling] = useState("monthly");

    return (
        <section dir={isRTL ? "rtl" : "ltr"} className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
            <div className="main-container relative z-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="section-title">
                        {t?.badge || "Pricing Plans"}
                    </span>
                    <h2 className="section-heading mb-4">
                        {t?.title || "Simple, Transparent Pricing"}
                    </h2>
                    <p className="card-description mx-auto text-center">
                        {t?.description ||
                            "Choose the plan that fits your needs. Upgrade or downgrade anytime."}
                    </p>

                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        const price = plan.price[billing];

                        return (
                            <div
                                key={plan.id}
                                className="relative rounded-xl overflow-hidden flex flex-col h-full pt-8!"
                                style={{
                                    background: "#010057",
                                    boxShadow: plan.popular
                                        ? "0 0 6px rgba(255,255,255,0.6)"
                                        : "0 0 6px rgba(255,255,255,0.2)",
                                }}
                            >
                                {/* Popular Badge - Absolutely Positioned */}
                                {plan.popular && (
                                    <div
                                        className="absolute top-0 left-0 w-full text-center text-xs font-bold tracking-widest uppercase py-2 z-10"
                                        style={{ background: "#f99d1b", color: "#0a1f44" }}
                                    >
                                        ✦ {t?.popular || "Most Popular"}
                                    </div>
                                )}

                                <div className="p-6 sm:p-8 flex flex-col flex-1">
                                    {/* Icon + Title */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                            }}
                                        >
                                            <Icon size={18} style={{ color: plan.accent }} />
                                        </div>
                                        <h5 className="font-bold" style={{ color: plan.accent }}>
                                            {plan.label}
                                        </h5>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-5">
                                        <div className="flex items-end gap-1 mb-1">
                                            <span className="text-5xl font-extrabold text-white tracking-tight">
                                                ${price}
                                            </span>
                                            <span className="text-white/40 text-sm mb-2">
                                                /{billing === "monthly" ? "mo" : "yr"}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-6">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div
                                        className="my-5 h-px w-full"
                                        style={{ background: "rgba(255,255,255,0.08)" }}
                                    />

                                    {/* Features */}
                                    <ul className="flex flex-col gap-3 flex-1 mb-8">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-3 text-gray-300 text-sm leading-6"
                                            >
                                                <span
                                                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                    style={{
                                                        background: "rgba(255,255,255,0.05)",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                    }}
                                                >
                                                    <Check
                                                        size={11}
                                                        style={{ color: plan.accent }}
                                                        strokeWidth={3}
                                                    />
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Button
                                        variant={plan.popular ? "filled" : "outline"}
                                        color={plan.popular ? "orange" : "sky"}
                                        className="w-full px-0! py-3! text-sm"
                                    >
                                        {plan.cta}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom note */}
                <p className="text-center text-white/30 text-sm mt-10">
                    {t?.note ||
                        "No credit card required · Cancel anytime · Free 14-day trial on Pro"}
                </p>
            </div>
        </section>
    );
}