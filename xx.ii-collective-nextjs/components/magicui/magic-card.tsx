"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    gradientFrom?: string;
    gradientTo?: string;
    /** Disable the spotlight/cursor effect */
    disableSpotlight?: boolean;
}

export function MagicCard({
    children,
    className,
    gradientSize = 200,
    gradientColor = "#5e3a73",
    gradientOpacity = 0.8,
    gradientFrom = "#5e3a7330",
    gradientTo = "#5e3a7310",
    disableSpotlight = true,
}: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (cardRef.current && !disableSpotlight) {
                const { left, top } = cardRef.current.getBoundingClientRect();
                const clientX = e.clientX;
                const clientY = e.clientY;
                mouseX.set(clientX - left);
                mouseY.set(clientY - top);
            }
        },
        [mouseX, mouseY, disableSpotlight]
    );

    const handleMouseOut = useCallback(
        (e: MouseEvent) => {
            if (!e.relatedTarget && !disableSpotlight) {
                document.removeEventListener("mousemove", handleMouseMove);
                mouseX.set(-gradientSize);
                mouseY.set(-gradientSize);
            }
        },
        [handleMouseMove, mouseX, gradientSize, mouseY, disableSpotlight]
    );

    const handleMouseEnter = useCallback(() => {
        if (!disableSpotlight) {
            document.addEventListener("mousemove", handleMouseMove);
            mouseX.set(-gradientSize);
            mouseY.set(-gradientSize);
        }
    }, [handleMouseMove, mouseX, gradientSize, mouseY, disableSpotlight]);

    useEffect(() => {
        if (disableSpotlight) return;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseEnter, handleMouseMove, handleMouseOut, disableSpotlight]);

    useEffect(() => {
        if (!disableSpotlight) {
            mouseX.set(-gradientSize);
            mouseY.set(-gradientSize);
        }
    }, [gradientSize, mouseX, mouseY, disableSpotlight]);

    const background = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 65%)`;
    const border = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 80%)`;

    return (
        <div
            ref={cardRef}
            className={cn(
                "group relative flex size-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white",
                className
            )}
        >
            <div className="relative z-10 w-full">{children}</div>
            {!disableSpotlight && (
                <>
                    <motion.div
                        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background: border,
                        }}
                    />
                    <motion.div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background, opacity: gradientOpacity }}
                    />
                </>
            )}
        </div>
    );
}
