'use client';

import { Product } from '@/types';
import { ProductCard } from './product-card';

interface ProductSectionProps {
    title: string;
    subtitle?: string;
    products: Product[];
    className?: string;
    gridClassName?: string;
}

export function ProductSection({
    title,
    subtitle,
    products,
    className = '',
    gridClassName = 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'
}: ProductSectionProps) {
    return (
        <section className={`${className}`}>
            {/* Section Header */}
            <div className="flex flex-col items-center mb-10 space-y-3 text-center">
                {subtitle && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-luxury-warm-grey dark:text-dark-text-secondary">
                        {subtitle}
                    </span>
                )}
                <h2 className="font-serif-display text-3xl md:text-5xl text-luxury-onyx dark:text-dark-text leading-tight italic">
                    {title}
                </h2>
                <div className="w-12 h-[1px] bg-black/10 dark:bg-white/10"></div>
            </div>

            {/* Product Grid */}
            <div className={gridClassName}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
