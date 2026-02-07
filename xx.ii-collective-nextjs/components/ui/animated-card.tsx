'use client';

import { cn } from '@/lib/utils';
import { SHINE_COLORS } from '@/lib/constants';
import { BlurFade } from '@/components/magicui/blur-fade';
import { MagicCard as MagicCardBase } from '@/components/magicui/magic-card';
import { ShineBorder } from '@/components/magicui/shine-border';

type CardVariant = 'default' | 'magic' | 'shine';

interface AnimatedCardProps {
    children: React.ReactNode;
    /** Animation delay in seconds (default: 0.1) */
    delay?: number;
    /** Card variant: default, magic (spotlight), or shine (glowing border) */
    variant?: CardVariant;
    /** Additional className */
    className?: string;
    /** Background classes (default: bg-white dark:bg-dark-card) */
    background?: string;
    /** Shine border radius (only for 'shine' variant) */
    borderRadius?: number;
}

/**
 * Animated card wrapper with BlurFade animation.
 * Supports MagicCard (spotlight effect) and ShineBorder (glowing border) variants.
 * 
 * @example
 * // Default - just animation
 * <AnimatedCard delay={0.2}>
 *   <div>Content</div>
 * </AnimatedCard>
 * 
 * // Magic - spotlight effect on hover
 * <AnimatedCard variant="magic">
 *   <ProductCard product={product} />
 * </AnimatedCard>
 * 
 * // Shine - glowing border
 * <AnimatedCard variant="shine">
 *   <OrderSummary />
 * </AnimatedCard>
 */
export function AnimatedCard({
    children,
    delay = 0.1,
    variant = 'default',
    className,
    background = "bg-white dark:bg-dark-card",
    borderRadius = 0,
}: AnimatedCardProps) {
    const content = (() => {
        switch (variant) {
            case 'magic':
                return (
                    <MagicCardBase className={cn(background, className)}>
                        {children}
                    </MagicCardBase>
                );
            case 'shine':
                return (
                    <ShineBorder
                        borderRadius={borderRadius}
                        borderWidth={1}
                        color={SHINE_COLORS}
                        className={cn("w-full min-w-full p-0", className)}
                    >
                        <div className={cn(background, "w-full")}>
                            {children}
                        </div>
                    </ShineBorder>
                );
            default:
                return (
                    <div className={cn(background, className)}>
                        {children}
                    </div>
                );
        }
    })();

    return (
        <BlurFade delay={delay}>
            {content}
        </BlurFade>
    );
}
