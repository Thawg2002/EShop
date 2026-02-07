'use client';

import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/lib/constants';
import { BlurFade } from '@/components/magicui/blur-fade';

interface PageHeaderProps {
    /** Page title - can be string or React node for special effects */
    title: React.ReactNode;
    /** Optional subtitle below title */
    subtitle?: string;
    /** Text alignment (default: left) */
    align?: 'left' | 'center';
    /** Animation delay (default: 0.1) */
    delay?: number;
    /** Additional className for container */
    className?: string;
    /** Additional className for title */
    titleClassName?: string;
}

/**
 * Common page header with title and optional subtitle.
 * Includes BlurFade animation by default.
 * 
 * @example
 * <PageHeader 
 *   title="Giỏ Hàng" 
 *   subtitle="3 Sản Phẩm" 
 * />
 * 
 * // With AnimatedGradientText:
 * <PageHeader 
 *   title={<AnimatedGradientText>Shop</AnimatedGradientText>} 
 * />
 */
export function PageHeader({
    title,
    subtitle,
    align = 'left',
    delay = 0.1,
    className,
    titleClassName,
}: PageHeaderProps) {
    return (
        <BlurFade delay={delay}>
            <div className={cn("mb-12", align === 'center' && "text-center", className)}>
                <h1 className={cn(
                    TYPOGRAPHY.pageTitle,
                    "text-dark-text dark:text-dark-text-primary mb-2",
                    titleClassName
                )}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={cn(
                        TYPOGRAPHY.subtitle,
                        "text-muted-text dark:text-dark-text-secondary"
                    )}>
                        {subtitle}
                    </p>
                )}
            </div>
        </BlurFade>
    );
}
