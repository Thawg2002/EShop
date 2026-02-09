'use client';

import { Product } from '@/types';
import { ProductCard } from './product-card';
import { useRef } from 'react';

interface ProductSectionProps {
    title: string;
    subtitle?: string;
    products: Product[];
    className?: string;
    gridClassName?: string;
    mode?: 'grid' | 'slider'; // New prop for layout mode
}

export function ProductSection({
    title,
    subtitle,
    products,
    className = '',
    gridClassName = 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4',
    mode = 'grid' // Default to grid
}: ProductSectionProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={`${className} relative`}>
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

            {/* Product Grid or Slider */}
            {mode === 'slider' ? (
                <div className="relative group">
                    <div
                        ref={sliderRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
                    >
                        {products.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-card/90 border border-black/10 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-10"
                    >
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-card/90 border border-black/10 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-10"
                    >
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                </div>
            ) : (
                <div className={gridClassName}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}
