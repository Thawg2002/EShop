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
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 italic">
                            {product.category}
                        </span>
                        <div className="flex gap-1.5">
                            {['#000000', '#71717a', '#d4d4d8'].map((color, i) => (
                                <div
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full border border-black/5"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                    <Link href={`/cua-hang/${product.id}`} className="block group/link">
                        <h3 className="font-serif text-xl font-medium text-zinc-950 dark:text-zinc-50 group-hover/link:text-zinc-600 dark:group-hover/link:text-zinc-400 transition-colors mb-2 tracking-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-8">
                            {product.description}
                        </p>
                        <Link
                            href={`/cua-hang/${product.id}`}
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors border-b border-zinc-100 dark:border-zinc-800 pb-0.5"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </MagicCard>
    );
}
