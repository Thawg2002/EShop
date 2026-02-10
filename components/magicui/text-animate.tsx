"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type AnimationType = "blurInUp" | "fadeIn" | "slideUp" | "scaleUp";

interface TextAnimateProps {
    children: string;
    animation?: AnimationType;
    by?: "word" | "character" | "line";
    className?: string;
    delay?: number;
    duration?: number;
}

const animations: Record<AnimationType, Variants> = {
    blurInUp: {
        hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

export function TextAnimate({
    children,
    animation = "fadeIn",
    by = "word",
    className,
    delay = 0,
    duration = 0.5,
}: TextAnimateProps) {
    const segments = useMemo(() => {
        if (by === "word") return children.split(" ");
        if (by === "character") return children.split("");
        return [children];
    }, [children, by]);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: by === "character" ? 0.02 : 0.1,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = animations[animation];

    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={cn("inline-flex flex-wrap", className)}
        >
            {segments.map((segment, idx) => (
                <motion.span
                    key={idx}
                    variants={itemVariants}
                    transition={{ duration }}
                    className={by === "word" ? "mr-[0.25em]" : ""}
                >
                    {segment}
                </motion.span>
            ))}
        </motion.span>
    );
}
