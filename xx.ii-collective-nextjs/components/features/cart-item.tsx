'use client';

import Image from 'next/image';
import { CartItem } from '@/types';
import { useCartStore } from '@/lib/store';

interface CartItemProps {
    item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <div className="py-8 first:pt-0 flex flex-col sm:flex-row gap-6 border-b border-gray-100 dark:border-dark-border last:border-0">
            <div className="relative w-full sm:w-28 h-36 bg-gray-100 dark:bg-dark-card overflow-hidden flex-shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-4">
                        <h3 className="font-serif-display text-base sm:text-lg font-medium dark:text-dark-text tracking-wide">
                            {item.name}
                        </h3>
                        <p className="font-bold text-base sm:text-lg dark:text-dark-text whitespace-nowrap">
                            ${item.price * item.quantity}
                        </p>
                    </div>
                    <p className="text-[11px] text-luxury-slate-grey dark:text-dark-text-secondary uppercase tracking-wider font-medium">
                        Kích thước: {item.selectedSize} | Màu: {item.color}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 dark:border-dark-border h-10">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-dark-text transition-colors"
                            aria-label="Giảm số lượng"
                        >
                            <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="w-12 text-center text-sm font-medium dark:text-dark-text">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-dark-text transition-colors"
                            aria-label="Tăng số lượng"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1.5 text-[11px] text-luxury-slate-grey hover:text-red-500 transition-colors uppercase tracking-wider font-bold group"
                        aria-label="Xóa sản phẩm"
                    >
                        <span className="material-symbols-outlined text-[16px] group-hover:scale-110 transition-transform">
                            delete
                        </span>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}
