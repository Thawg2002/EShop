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
        <div className="py-8 first:pt-0 flex gap-6">
            <div className="relative w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="font-medium text-lg">${item.price * item.quantity}.00</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                        Size: {item.selectedSize} | Color: {item.color}
                    </p>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-lg h-9">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-full flex items-center justify-center hover:bg-gray-50"
                        >
                            -
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-full flex items-center justify-center hover:bg-gray-50"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
