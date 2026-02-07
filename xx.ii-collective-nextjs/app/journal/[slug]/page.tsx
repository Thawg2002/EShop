'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES } from '@/lib/data';
import { PageLayout } from '@/components/layout/page-layout';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShineBorder } from '@/components/magicui/shine-border';
import { SHINE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Table of Contents Component
function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0% -35% 0%' }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    return (
        <nav className="space-y-2">
            <p className="text-[11px] uppercase tracking-widest font-bold text-muted-text dark:text-dark-text-secondary mb-4">
                Mục Lục
            </p>
            {items.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                        "block text-sm py-1.5 transition-colors border-l-2 pl-4",
                        activeId === item.id
                            ? "border-primary text-primary font-medium"
                            : "border-transparent text-muted-text dark:text-dark-text-secondary hover:text-dark-text dark:hover:text-dark-text-primary"
                    )}
                >
                    {item.title}
                </a>
            ))}
        </nav>
    );
}

// Scroll Progress Bar
function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress((scrollTop / docHeight) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100 dark:bg-dark-border">
            <div
                className="h-full bg-primary transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

export default function ArticleDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const article = ARTICLES.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <>
            <ScrollProgress />
            <PageLayout>
                {/* Breadcrumb */}
                <BlurFade delay={0.1}>
                    <div className="flex items-center gap-3 mb-8 text-[11px] uppercase tracking-widest">
                        <Link href="/journal" className="text-muted-text dark:text-dark-text-secondary hover:text-primary transition-colors">
                            ← Nhật Ký
                        </Link>
                        <span className="text-muted-text/50">|</span>
                        <span className="bg-gray-100 dark:bg-dark-card px-3 py-1 rounded-full text-muted-text dark:text-dark-text-secondary">
                            {article.category}
                        </span>
                        <span className="text-muted-text/50">|</span>
                        <span className="text-muted-text dark:text-dark-text-secondary">{article.date}</span>
                    </div>
                </BlurFade>

                <div className="grid lg:grid-cols-[1fr_320px] gap-12">
                    {/* Main Content */}
                    <div>
                        {/* Title */}
                        <BlurFade delay={0.2}>
                            <h1 className="text-4xl md:text-5xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-6 leading-tight">
                                {article.title}
                            </h1>
                            <p className="text-lg text-muted-text dark:text-dark-text-secondary mb-8 max-w-2xl">
                                {article.excerpt}
                            </p>
                        </BlurFade>

                        {/* Hero Image */}
                        <BlurFade delay={0.3}>
                            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-12">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </BlurFade>

                        {/* Article Content */}
                        <BlurFade delay={0.4}>
                            <div className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-serif-display prose-headings:text-dark-text dark:prose-headings:text-dark-text-primary
                                prose-p:text-muted-text dark:prose-p:text-dark-text-secondary
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-dark-text dark:prose-strong:text-dark-text-primary
                                prose-li:text-muted-text dark:prose-li:text-dark-text-secondary
                            ">
                                {article.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2 id="').replace(/<br\/><br\/>/g, '">').replace(/<h2 id="([^"]+)">/g, '<h2 id="$1" class="text-2xl font-serif-display mt-8 mb-4">') }} />
                                ) : (
                                    <p>Nội dung bài viết đang được cập nhật...</p>
                                )}
                            </div>
                        </BlurFade>
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 space-y-8">
                            {/* Author Card */}
                            <BlurFade delay={0.3}>
                                <ShineBorder
                                    borderRadius={8}
                                    borderWidth={1}
                                    color={SHINE_COLORS}
                                    className="w-full p-0"
                                >
                                    <div className="p-6 bg-white dark:bg-dark-card rounded-lg">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                <Image
                                                    src={article.author.avatar}
                                                    alt={article.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-dark-text dark:text-dark-text-primary">
                                                    {article.author.name}
                                                </p>
                                                <p className="text-xs text-muted-text dark:text-dark-text-secondary">
                                                    {article.author.role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-text dark:text-dark-text-secondary">
                                            <span className="material-symbols-outlined text-sm align-middle mr-1">schedule</span>
                                            {article.readTime}
                                        </div>
                                    </div>
                                </ShineBorder>
                            </BlurFade>

                            {/* Table of Contents */}
                            {article.tableOfContents && article.tableOfContents.length > 0 && (
                                <BlurFade delay={0.4}>
                                    <div className="bg-off-white/50 dark:bg-dark-card/50 rounded-lg p-6">
                                        <TableOfContents items={article.tableOfContents} />
                                    </div>
                                </BlurFade>
                            )}

                            {/* CTA */}
                            <BlurFade delay={0.5}>
                                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 text-center">
                                    <p className="text-[11px] uppercase tracking-widest font-bold text-primary mb-2">
                                        Khám Phá Bộ Sưu Tập
                                    </p>
                                    <p className="text-sm text-muted-text dark:text-dark-text-secondary mb-4">
                                        Xem các sản phẩm mới nhất từ XX.II Collective
                                    </p>
                                    <Link
                                        href="/shop"
                                        className="inline-block bg-primary text-white text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-primary/90 transition-colors"
                                    >
                                        Xem Shop →
                                    </Link>
                                </div>
                            </BlurFade>
                        </div>
                    </aside>
                </div>
            </PageLayout>
        </>
    );
}
