import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center gap-2 font-bold tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        // Variants
                        'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20': variant === 'primary',
                        'border border-white text-white hover:bg-white hover:text-secondary': variant === 'outline',
                        'text-gray-600 hover:text-primary hover:bg-light-bg': variant === 'ghost',
                        // Sizes
                        'px-4 py-2 text-xs rounded': size === 'sm',
                        'px-8 py-3 text-sm rounded': size === 'md',
                        'px-10 py-4 text-base rounded-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
