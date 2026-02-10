'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { Product } from '@/types';

interface FeaturedProductsGridProps {
    initialProducts: Product[];
}

export function FeaturedProductsGrid({ initialProducts }: FeaturedProductsGridProps) {
    if (!initialProducts || initialProducts.length === 0) {
        return (
            <div className="py-20 text-center text-muted-foreground">
                Đang cập nhật sản phẩm...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {initialProducts.map((product: any, idx: number) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-6">
                        <img
                            src={getImageUrl(product.featuredImage)}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 pb-6 pr-6 flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-white text-zinc-900 p-4 rounded-full shadow-xl hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                                <ShoppingBag size={20} />
                            </button>
                        </div>
                        {product.discount > 0 && (
                            <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                -{product.discount}%
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-primary font-bold text-lg">{formatCurrency(product.price)}</p>
                            {product.marketPrice > product.price && (
                                <p className="text-zinc-400 line-through text-sm">{formatCurrency(product.marketPrice)}</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
