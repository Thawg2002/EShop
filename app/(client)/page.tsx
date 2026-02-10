// app/page.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroSlider } from '@/components/features/hero-slider';
import { FeaturedProductsGrid } from '@/components/features/featured-products-grid';

// Server-side fetching for SEO
async function getFeaturedProducts() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
        const res = await fetch(`${baseUrl}/products/featured?limit=4`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}

export default async function HomePage() {
    const featuredProducts = await getFeaturedProducts();

    return (
        <div className="bg-background">
            {/* Hero Section (Client Component for animations) */}
            <HeroSlider />

            {/* Featured Products */}
            <section className="py-32 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Sản phẩm nổi bật</h2>
                        <div className="h-1 w-20 bg-primary mt-4" />
                    </div>
                    <Link
                        href="/cua-hang"
                        className="text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors flex items-center group"
                    >
                        Xem tất cả
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid (Client Component for hover effects and interactivity) */}
                <FeaturedProductsGrid initialProducts={featuredProducts} />
            </section>

            {/* Introduction Section (Server-side for SEO) */}
            <section className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary mb-8 block">XX.II Collective</span>
                    <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Nghệ thuật của sự <span className="italic">tối giản</span> & chất lượng vượt thời gian</h2>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
                        Chúng tôi tin rằng cái đẹp thực sự nằm ở sự tinh giản. Mỗi sản phẩm trong bộ sưu tập của XX.II Collective
                        đều được tuyển chọn kỹ lưỡng, tập trung vào chất liệu bền vững và thiết kế mang tính di sản.
                    </p>
                    <Link
                        href="/introduction"
                        className="inline-block border-b-2 border-primary pb-1 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        Về chúng tôi
                    </Link>
                </div>
            </section>
        </div>
    );
}
