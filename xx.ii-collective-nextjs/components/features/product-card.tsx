'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { MagicCard } from '@/components/magicui/magic-card';
import { ShineBorder } from '@/components/magicui/shine-border';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
    const isFeatured = product.price > 2000000; // Example condition

    return (
        <MagicCard
            className={cn(
                "group relative overflow-hidden transition-all duration-700 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 shadow-sm hover:shadow-2xl",
                className
            )}
            gradientColor={isFeatured ? "#c5a059" : "#262626"}
        >
            {isFeatured && (
                <ShineBorder
                    borderWidth={1}
                    duration={14}
                    shineColor={["#c5a059", "#e5c17e", "#9c713a"]}
                    className="z-20"
                />
            )}
            <div className="p-3 relative z-10 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full mb-3 overflow-hidden bg-gray-50 dark:bg-dark-bg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {product.isBestSeller && (
                        <div className="absolute top-2 left-2 z-20">
                            <span className="inline-block px-2 py-0.5 bg-white/90 text-[8px] font-bold uppercase tracking-widest backdrop-blur-sm text-black rounded-sm border border-black/5">
                                Best Seller
                            </span>
                        </div>
                    )}
                </div>

                {/* Info Container */}
                <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="text-[9px] font-bold uppercase tracking-widest text-luxury-onyx dark:text-dark-text leading-tight line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-xs font-serif-display font-bold text-luxury-onyx dark:text-dark-text-primary">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                    <p className="text-[7px] text-luxury-slate-grey dark:text-dark-text-secondary uppercase tracking-widest">
                        {product.category}
                    </p>
                </div>

                {/* Footer Link */}
                <div className="mt-3">
                    <Link href={`/cua-hang/${product.id}`} className="flex items-center justify-between group/link">
                        <span className="text-[7px] font-bold uppercase tracking-widest text-luxury-onyx dark:text-dark-text border-b border-black/10 dark:border-white/10 pb-1 group-hover/link:border-black dark:group-hover/link:border-white transition-all">
                            Chi tiết
                        </span>
                        <span className="material-symbols-outlined text-[12px] text-black/40 dark:text-white/40 group-hover/link:translate-x-1 transition-transform">
                            east
                        </span>
                    </Link>
                </div>
            </div>
        </MagicCard>
    );
}
