"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { ComponentPropsWithoutRef } from "react";

interface AnimatedGradientTextProps
    extends Omit<ComponentPropsWithoutRef<"span">, keyof MotionProps> {
    children: React.ReactNode;
    className?: string;
}

export function AnimatedGradientText({
    children,
    className,
    ...props
}: AnimatedGradientTextProps) {
    return (
        <motion.span
            className={cn(
                "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%]",
                className
            )}
            {...props}
        >
            {children}
        </motion.span>
    );
}
