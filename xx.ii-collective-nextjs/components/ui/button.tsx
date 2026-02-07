import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.15em] transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        // Variants
                        'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl': variant === 'primary',
                        'border border-gray-300 text-dark-text hover:bg-gray-50 dark:border-dark-border dark:text-dark-text dark:hover:bg-gray-800': variant === 'outline',
                        'text-gray-600 hover:text-primary hover:bg-gray-50 dark:text-dark-text-secondary dark:hover:bg-gray-800': variant === 'ghost',
                        'p-2 hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'icon',
                        // Sizes
                        'px-4 py-2 text-[10px]': size === 'sm' && variant !== 'icon',
                        'px-8 py-3 text-xs': size === 'md' && variant !== 'icon',
                        'px-10 py-4 text-sm': size === 'lg' && variant !== 'icon',
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
