"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
};

interface ShimmerButtonProps {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ShimmerButton = React.forwardRef<
    HTMLButtonElement,
    ShimmerButtonProps
>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "3s",
            borderRadius = "100px",
            background = "rgba(94, 58, 115, 1)",
            className,
            children,
            type = "button",
            disabled,
            onClick,
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                type={type}
                disabled={disabled}
                onClick={onClick}
                {...animationProps}
                className={cn(
                    "relative z-0 flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-white/10 px-8 py-4",
                    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
                    "uppercase tracking-[0.15em] text-xs font-bold",
                    className
                )}
                style={
                    {
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                    } as React.CSSProperties
                }
            >
                {/* spark container */}
                <div
                    className={cn(
                        "-z-30 blur-[2px]",
                        "absolute inset-0 overflow-visible [container-type:size]"
                    )}
                >
                    {/* spark */}
                    <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
                        {/* spark before */}
                        <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
                    </div>
                </div>
                {children}

                {/* Highlight */}
                <div
                    className={cn(
                        "insert-0 absolute size-full",
                        "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
                        "transform-gpu transition-all duration-300 ease-in-out",
                        "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
                        "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
                    )}
                />

                {/* backdrop */}
                <div
                    className={cn(
                        "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
                    )}
                />
            </motion.button>
        );
    }
);

ShimmerButton.displayName = "ShimmerButton";
