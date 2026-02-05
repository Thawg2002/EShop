'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { CartItemComponent } from '@/components/features/cart-item';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function CartPage() {
    const { items, getTotal } = useCartStore();
    const subtotal = getTotal();

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-3xl font-serif mb-10">Your Cart ({items.length} items)</h1>
                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                        <div className="flex-1 divide-y divide-gray-100">
                            {items.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-gray-500 mb-6">Your cart is empty.</p>
                                    <Link
                                        href="/shop"
                                        className="inline-flex items-center justify-center gap-2 font-bold tracking-wider transition-all bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 px-8 py-3 text-sm rounded"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            ) : (
                                items.map(item => <CartItemComponent key={item.id} item={item} />)
                            )}
                        </div>
                        <div className="lg:w-[400px] flex-shrink-0">
                            <div className="bg-light-bg rounded-2xl p-8 sticky top-28">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-secondary">${subtotal}.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxes</span>
                                        <span className="italic">Calculated at checkout</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 my-6"></div>
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold">${subtotal}.00</span>
                                </div>
                                <Button className="w-full py-4 mb-6">
                                    Proceed to Checkout
                                </Button>
                                <div className="flex justify-center gap-6 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">Secure Checkout</span>
                                    <span className="flex items-center gap-1">30-Day Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
