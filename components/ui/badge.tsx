import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'dark';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em]',
                {
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': variant === 'default',
                    'bg-primary/10 text-primary': variant === 'primary',
                    'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400': variant === 'success',
                    'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400': variant === 'warning',
                    'bg-dark-text text-white': variant === 'dark',
                },
                className
            )}
            {...props}
        />
    );
}
