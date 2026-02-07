"use client";

import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    animate?: boolean;
    delay?: number;
    id?: string;
}

/**
 * Common Section wrapper with built-in responsive padding and optional animation.
 */
export function Section({
    children,
    className,
    containerClassName,
    animate = true,
    delay = 0,
    id,
}: SectionProps) {
    const Content = (
        <section
            id={id}
            className={cn("w-full py-12 md:py-20", className)}
        >
            <div className={cn("max-width-container", containerClassName)}>
                {children}
            </div>
        </section>
    );

    if (animate) {
        return (
            <BlurFade delay={delay} className="w-full">
                {Content}
            </BlurFade>
        );
    }

    return Content;
}
