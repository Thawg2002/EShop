'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    className?: string;
}

/**
 * Horizontal category filter with badge-style buttons.
 * "All" option is handled internally.
 */
export function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange,
    className,
}: CategoryFilterProps) {
    const allCategories = ['Tất Cả', ...categories];

    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {allCategories.map((category) => {
                const isActive = activeCategory === category ||
                    (category === 'Tất Cả' && activeCategory === '');

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category === 'Tất Cả' ? '' : category)}
                        className={cn(
                            "px-4 py-2 text-[11px] uppercase tracking-widest font-bold rounded-full transition-all",
                            "border",
                            isActive
                                ? "bg-primary text-white border-primary"
                                : "bg-transparent text-muted-text dark:text-dark-text-secondary border-gray-200 dark:border-dark-border hover:border-primary hover:text-primary"
                        )}
                    >
                        {category}
                        {isActive && (
                            <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-[9px]">
                                ✓
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
