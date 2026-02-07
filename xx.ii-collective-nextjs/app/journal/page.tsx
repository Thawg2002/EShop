'use client';

import { useState, useMemo } from 'react';
import { ARTICLES, ARTICLE_CATEGORIES } from '@/lib/data';
import { getStaggerDelay } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { ArticleCard } from '@/components/features/article-card';
import { CategoryFilter } from '@/components/features/category-filter';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TextAnimate } from '@/components/magicui/text-animate';

export default function JournalPage() {
    const [activeCategory, setActiveCategory] = useState('');

    const filteredArticles = useMemo(() => {
        if (!activeCategory) return ARTICLES;
        return ARTICLES.filter(article => article.category === activeCategory);
    }, [activeCategory]);

    return (
        <PageLayout>
            {/* Header */}
            <div className="text-center mb-12">
                <BlurFade delay={0.1}>
                    <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4">
                        <TextAnimate animation="blurInUp" by="word">
                            Nhật Ký Thời Trang
                        </TextAnimate>
                    </h1>
                </BlurFade>
                <BlurFade delay={0.2}>
                    <p className="text-muted-text dark:text-dark-text-secondary text-lg max-w-2xl mx-auto">
                        Những bài viết mới nhất về xu hướng, phong cách và kiến thức thời trang từ XX.II Collective.
                    </p>
                </BlurFade>
            </div>

            {/* Category Filter */}
            <BlurFade delay={0.3}>
                <div className="flex justify-center mb-12">
                    <CategoryFilter
                        categories={ARTICLE_CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>
            </BlurFade>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, idx) => (
                    <BlurFade key={article.id} delay={getStaggerDelay(idx, 0.4, 0.1)}>
                        <ArticleCard article={article} />
                    </BlurFade>
                ))}
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
                <BlurFade delay={0.4}>
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 block">article</span>
                        <p className="text-muted-text dark:text-dark-text-secondary">
                            Chưa có bài viết nào trong danh mục này.
                        </p>
                    </div>
                </BlurFade>
            )}
        </PageLayout>
    );
}
