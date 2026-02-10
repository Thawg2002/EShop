'use client';

import { ProductCard } from '@/components/features/product-card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Product, Category } from '@/types';

interface ProductListingViewProps {
    category: Category;
    products: Product[];
}

export function ProductListingView({ category, products }: ProductListingViewProps) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-dark-bg">
            <aside className="hidden lg:flex flex-col w-[280px] fixed h-full pt-20 px-8 pb-8 border-r border-black/5 dark:border-dark-border overflow-y-auto no-scrollbar bg-white dark:bg-dark-bg z-10">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-[#86868b]">Danh Mục</h2>
                        <ul className="space-y-4">
                            <li><a href="/cua-hang" className="block text-sm font-medium text-[#1d1d1f] transition-all pl-4 border-l-2 border-[#0071e3]">Tất Cả</a></li>
                            {((category as any).children || []).map((child: any) => (
                                <li key={child._id}><a href={`/${child.slug}`} className="block text-sm font-normal text-[#86868b] hover:text-[#0071e3] transition-all pl-4 hover:pl-5">{child.name}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            <main className="flex-1 w-full lg:pl-[280px] pt-10 min-h-screen flex flex-col overflow-x-hidden">
                <section className="flex-1 px-6 md:px-12 max-w-[1600px] mx-auto w-full py-12">
                    <div className="mb-20 mt-16">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b] mb-6">Danh Mục / {category.name}</span>
                        <h1 className="text-5xl md:text-7xl font-sans font-semibold text-[#1d1d1f] dark:text-zinc-50 leading-tight tracking-tight mb-8">
                            {category.name}<br /><span className="opacity-40">{category.description || ''}</span>
                        </h1>
                    </div>

                    <div className="flex justify-between items-center mb-12 pb-4 border-b border-black/5 dark:border-dark-border">
                        <p className="text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary">
                            {products.length} Sản Phẩm
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <BlurFade key={product._id} delay={0.1 + idx * 0.05} inView>
                                <ProductCard product={product} />
                            </BlurFade>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="py-24 text-center">
                            <p className="text-zinc-500 italic">Chưa có sản phẩm nào trong danh mục này.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
