"use client"

import { BlogCategory } from "@/types"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
    categories: BlogCategory[]
    selectedCategory: string
    onCategoryChange: (id: string) => void
    blogPostsCount: Record<string, number>
}

export function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
    blogPostsCount
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-[0.2em] transition-all",
                        selectedCategory === category.id
                            ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white"
                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                    )}
                >
                    {category.name}
                    <span className={cn(
                        "inline-flex items-center justify-center min-w-[18px] h-4.5 px-1.5 rounded-full text-[9px]",
                        selectedCategory === category.id
                            ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
                    )}>
                        {category.id === 'all' ? categories.find(c => c.id === 'all')?.count : blogPostsCount[category.name] || 0}
                    </span>
                </button>
            ))}
        </div>
    )
}
