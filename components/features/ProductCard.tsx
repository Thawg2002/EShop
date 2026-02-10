// components/features/ProductCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { useCart } from '@/lib/use-cart';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        price: number;
        featuredImage: string;
        slug: string;
        rating?: number;
        brand?: { name: string };
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await addItem(product._id);
            toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
        } catch (error) {
            toast.error('Không thể thêm vào giỏ hàng');
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500"
        >
            {/* Image Container */}
            <Link href={`/shop/${product.slug || product._id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                    src={getImageUrl(product.featuredImage)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.rating && product.rating >= 4.5 && (
                        <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                            Bán chạy
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex flex-col space-y-2">
                    <button className="bg-white/90 backdrop-blur-sm text-dark-bg p-2.5 rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors">
                        <Heart size={18} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Hover Add to Cart Button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-dark-bg dark:bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-2xl"
                    >
                        <ShoppingBag size={16} />
                        <span>Thêm vào giỏ</span>
                    </button>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 space-y-1">
                <div className="flex justify-between items-start">
                    <Link href={`/shop/${product.slug || product._id}`}>
                        <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center text-yellow-500 text-xs">
                        <Star size={12} fill="currentColor" />
                        <span className="ml-1 font-bold text-foreground">{product.rating || '5.0'}</span>
                    </div>
                </div>
                <p className="text-muted-text text-sm uppercase tracking-wide font-medium">{product.brand?.name || 'XX.II Originals'}</p>
                <div className="pt-2">
                    <p className="text-primary font-bold text-lg">{formatCurrency(product.price)}</p>
                </div>
            </div>
        </motion.div>
    );
}
