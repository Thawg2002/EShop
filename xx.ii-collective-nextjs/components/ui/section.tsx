'use client';

import { cn } from '@/lib/utils';
import { MAX_WIDTH_CLASSES } from '@/lib/constants';
import { BlurFade } from '@/components/magicui/blur-fade';

type MaxWidthType = keyof typeof MAX_WIDTH_CLASSES;

interface SectionProps {
    children: React.ReactNode;
    /** Section ID for anchor links */
    id?: string;
    /** Max width variant */
    maxWidth?: MaxWidthType;
    /** Additional className */
    className?: string;
    /** Padding y-axis (default: py-16) */
    paddingY?: string;
    /** Background classes */
    background?: string;
    /** Animation delay (set to null to disable animation) */
    delay?: number | null;
    /** As element (default: section) */
    as?: 'section' | 'div' | 'article';
}

/**
 * Common section wrapper with optional animation and responsive container.
 * 
 * @example
 * // Simple section
 * <Section maxWidth="lg">
 *   <h2>Featured Products</h2>
 *   <ProductGrid />
 * </Section>
 * 
 * // With custom background and no animation
 * <Section background="bg-off-white dark:bg-dark-card" delay={null}>
 *   <StatsSection />
 * </Section>
 */
export function Section({
    children,
    id,
    maxWidth,
    className,
    paddingY = "py-16",
    background,
    delay = 0.1,
    as: Tag = 'section',
}: SectionProps) {
    const content = (
        <Tag
            id={id}
            className={cn(
                "relative w-full",
                paddingY,
                background,
                maxWidth && MAX_WIDTH_CLASSES[maxWidth],
                className
            )}
        >
            {children}
        </Tag>
    );

    if (delay !== null) {
        return <BlurFade delay={delay}>{content}</BlurFade>;
    }

    return content;
}
