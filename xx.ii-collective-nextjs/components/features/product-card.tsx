'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
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
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 relative mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {showQuickAdd && (
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                            onClick={handleQuickAdd}
                            className="w-full bg-white text-secondary py-3 text-xs hover:bg-primary hover:text-white"
                        >
                            Quick Add
                        </Button>
                    </div>
                )}
                {product.id === 1 && (
                    <div className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider">
                        Best Seller
                    </div>
                )}
            </div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{product.color}</p>
                </div>
                <p className="font-bold text-sm text-primary">${product.price}</p>
            </div>
        </Link>
    );
}
