import React from "react";

const Button = ({
  children,
  variant = "filled", // 'filled' | 'outline' | 'outline-dark'
  color = "orange", // 'orange' | 'green' | 'blue'
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-10 py-4 font-bold rounded-xl transition-all duration-300 cursor-pointer text-center inline-flex items-center justify-center";

  const colors = {
    orange: {
      filled:
        "bg-brand-orange hover:opacity-90 text-white shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-0.5",
      outline:
        "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white shadow-lg shadow-brand-orange/5 hover:shadow-brand-orange/20 hover:-translate-y-0.5",
      "outline-plain":
        "border-2 border-brand-orange text-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 hover:-translate-y-0.5",
    },
    green: {
      filled:
        "bg-brand-green hover:opacity-90 text-white shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40 hover:-translate-y-0.5",
      outline:
        "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white shadow-lg shadow-brand-green/5 hover:shadow-brand-green/20 hover:-translate-y-0.5",
      "outline-plain":
        "border-2 border-brand-green text-brand-green hover:shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5",
    },
    blue: {
      filled:
        "bg-brand-blue hover:opacity-90 text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:-translate-y-0.5",
      outline:
        "border-2 border-brand-blue text-white hover:bg-brand-blue shadow-lg shadow-brand-blue/5 hover:shadow-brand-blue/20 hover:-translate-y-0.5",
      "outline-plain":
        "border-2 border-brand-blue text-white hover:shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5",
    },
    white: {
      filled:
        "bg-brand-white hover:bg-white/90 text-black shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5",
      outline:
        "border-2 border-brand-white text-brand-white hover:bg-brand-white hover:text-black shadow-lg shadow-white/5 hover:shadow-white/20 hover:-translate-y-0.5",
      "outline-plain":
        "border-2 border-brand-white text-brand-white hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5",
    },
    sky: {
      filled:
        "bg-brand-sky hover:opacity-90 text-white shadow-lg shadow-brand-sky/30 hover:shadow-brand-sky/50 hover:-translate-y-0.5",
      outline:
        "border-2 border-brand-sky text-white hover:bg-brand-sky/10 shadow-lg shadow-brand-sky/10 hover:shadow-brand-sky/30 hover:-translate-y-0.5",
      "outline-plain":
        "border-2 border-brand-sky text-white hover:shadow-lg hover:shadow-brand-sky/20 hover:-translate-y-0.5",
    },
  };

  const variantStyles = colors[color]?.[variant] || colors.orange.filled;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
