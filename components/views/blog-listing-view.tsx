'use client';

import { useState } from "react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data";
import { BlogCard } from "@/components/features/blog-card";
import { CategoryFilter } from "@/components/features/category-filter";
import { BlurFade } from "@/components/magicui/blur-fade";

export function BlogListingView() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const blogPostsCount = BLOG_POSTS.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const filteredPosts = selectedCategory === "all"
        ? BLOG_POSTS
        : BLOG_POSTS.filter((post) => post.category === BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.name);

    return (
        <main className="relative min-h-screen bg-background text-foreground pt-32 pb-24 overflow-hidden transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-20 text-center lg:text-left">
                    <BlurFade delay={0.1}>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-[0.9]">
                            Tin Tức & <br /> <span className="opacity-40">Cảm Hứng</span>
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <p className="text-base md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed tracking-tight">
                            Khám phá những xu hướng mới nhất, nghệ thuật sống tối giản và những câu chuyện đằng sau các bộ sưu tập của XX.II Collective.
                        </p>
                    </BlurFade>
                </div>

                <BlurFade delay={0.3}>
                    <CategoryFilter
                        categories={BLOG_CATEGORIES}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        blogPostsCount={blogPostsCount}
                    />
                </BlurFade>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, idx) => (
                        <BlurFade key={post.id} delay={0.4 + idx * 0.05} inView>
                            <BlogCard post={post} />
                        </BlurFade>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-muted-foreground font-medium tracking-tight">Chưa có bài viết nào trong danh mục này.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
