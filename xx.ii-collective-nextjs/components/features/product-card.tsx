'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
    product: Product;
    showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
    };

    return (
        <Link href={`/shop/${product.id}`} className="group cursor-pointer block">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-dark-card relative mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                />
                {showQuickAdd && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={handleQuickAdd}
                            className="w-full bg-white/95 backdrop-blur-sm text-dark-text py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">shopping_bag</span>
                            Thêm vào giỏ
                        </button>
                    </div>
                )}
                {product.id === 1 && (
                    <div className="absolute top-3 left-3 bg-dark-text text-white text-[9px] font-bold uppercase px-2.5 py-1.5 tracking-[0.15em]">
                        Best Seller
                    </div>
                )}
            </div>
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                    <h3 className="font-serif-display text-sm font-medium group-hover:text-primary transition-colors dark:text-dark-text tracking-wide">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 dark:text-dark-text-secondary text-[11px] mt-1 uppercase tracking-wider">
                        {product.color}
                    </p>
                </div>
                <p className="font-bold text-sm text-primary whitespace-nowrap">${product.price}</p>
            </div>
        </Link>
    );
}
