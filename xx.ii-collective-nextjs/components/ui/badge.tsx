import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'success' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset',
                {
                    'bg-stone-100 text-stone-600 ring-stone-200': variant === 'default',
                    'bg-purple-50 text-primary ring-primary/20': variant === 'primary',
                    'bg-green-50 text-green-600 ring-green-200': variant === 'success',
                    'bg-gray-50 text-gray-600 ring-gray-200': variant === 'warning',
                },
                className
            )}
            {...props}
        />
    );
}
