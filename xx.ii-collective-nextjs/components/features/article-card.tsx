'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MagicCard } from '@/components/magicui/magic-card';

export interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    readTime: string;
    content?: string;
}

interface ArticleCardProps {
    article: Article;
    /** Layout variant: 'default' for grid, 'featured' for large */
    variant?: 'default' | 'featured';
    className?: string;
}

/**
 * Article card component for Journal listing page.
 * Inspired by Magic UI Blog design.
 */
export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
    const isFeatured = variant === 'featured';

    return (
        <MagicCard className={cn("bg-white dark:bg-dark-card overflow-hidden group", className)}>
            <Link href={`/journal/${article.slug}`} className="block">
                {/* Image */}
                <div className={cn(
                    "relative overflow-hidden",
                    isFeatured ? "aspect-[16/9]" : "aspect-[16/10]"
                )}>
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm text-dark-text dark:text-dark-text-primary text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={cn("p-6", isFeatured && "p-8")}>
                    {/* Title */}
                    <h3 className={cn(
                        "font-serif-display text-dark-text dark:text-dark-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2",
                        isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                    )}>
                        {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={cn(
                        "text-muted-text dark:text-dark-text-secondary mb-4 line-clamp-2",
                        isFeatured ? "text-base" : "text-sm"
                    )}>
                        {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary">
                        <span>{article.date}</span>
                        <span className="text-primary font-bold group-hover:underline">
                            Đọc Thêm →
                        </span>
                    </div>
                </div>
            </Link>
        </MagicCard>
    );
}
