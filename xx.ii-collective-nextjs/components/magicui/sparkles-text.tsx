"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface SparklesTextProps {
    children: React.ReactNode;
    className?: string;
    sparklesCount?: number;
    colors?: {
        first: string;
        second: string;
    };
}

interface Sparkle {
    id: number;
    x: string;
    y: string;
    color: string;
    delay: number;
    scale: number;
    duration: number;
}

export function SparklesText({
    children,
    className,
    sparklesCount = 10,
    colors = { first: "#A07CFE", second: "#FE8FB5" },
}: SparklesTextProps) {
    // Initialize with empty array to avoid hydration mismatch
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    // Generate sparkles only on client side to avoid hydration mismatch
    useEffect(() => {
        const newSparkles = Array.from({ length: sparklesCount }).map((_, i) => ({
            id: i,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            color: i % 2 === 0 ? colors.first : colors.second,
            delay: Math.random() * 2,
            scale: Math.random() * 1 + 0.3,
            duration: Math.random() * 2 + 1,
        }));
        setSparkles(newSparkles);
    }, [sparklesCount, colors.first, colors.second]);

    return (
        <span className={cn("relative inline-block", className)}>
            <span className="relative z-10">{children}</span>
            {sparkles.map((sparkle) => (
                <motion.svg
                    key={sparkle.id}
                    className="pointer-events-none absolute z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, sparkle.scale, 0],
                    }}
                    transition={{
                        duration: sparkle.duration,
                        repeat: Infinity,
                        delay: sparkle.delay,
                    }}
                    style={{
                        left: sparkle.x,
                        top: sparkle.y,
                        width: 16,
                        height: 16,
                    }}
                    viewBox="0 0 160 160"
                >
                    <path
                        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                        fill={sparkle.color}
                    />
                </motion.svg>
            ))}
        </span>
    );
}
