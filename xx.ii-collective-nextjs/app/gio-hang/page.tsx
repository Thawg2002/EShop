'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { CartItemComponent } from '@/components/features/cart-item';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function CartPage() {
    const { items, getTotal } = useCartStore();
    const subtotal = getTotal();

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4">Giỏ Hàng</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary mb-12">{items.length} Sản Phẩm</p>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Cart Items */}
                        <div className="flex-1">
                            {items.length === 0 ? (
                                <div className="text-center py-24">
                                    <p className="text-sm text-muted-text dark:text-dark-text-secondary mb-8 font-serif-display">Giỏ hàng của bạn đang trống.</p>
                                    <Link
                                        href="/cua-hang"
                                        className="inline-block px-10 py-4 bg-dark-text dark:bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary dark:hover:bg-primary-hover transition-colors"
                                    >
                                        Tiếp Tục Mua Sắm
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {items.map(item => <CartItemComponent key={item.id} item={item} />)}
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        {items.length > 0 && (
                            <div className="lg:w-[420px] flex-shrink-0">
                                <div className="bg-off-white/50 dark:bg-dark-card/50 backdrop-blur-sm border border-black/5 dark:border-dark-border p-8 sticky top-32">
                                    <h2 className="text-xs uppercase tracking-widest font-bold mb-8 text-dark-text dark:text-dark-text-primary">Tổng Đơn Hàng</h2>

                                    <div className="space-y-4 mb-8 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-text dark:text-dark-text-secondary">Tạm Tính</span>
                                            <span className="font-mono text-dark-text dark:text-dark-text-primary">${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-text dark:text-dark-text-secondary">Vận Chuyển</span>
                                            <span className="text-primary font-medium">Miễn Phí</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-text dark:text-dark-text-secondary">Thuế</span>
                                            <span className="text-xs italic text-muted-text dark:text-dark-text-secondary">Tính tại thanh toán</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-black/5 dark:border-dark-border pt-6 mb-8">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs uppercase tracking-widest font-bold">Tổng Cộng</span>
                                            <span className="text-3xl font-light text-dark-text dark:text-dark-text-primary">${subtotal}</span>
                                        </div>
                                    </div>

                                    <button className="w-full h-14 bg-dark-text dark:bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary dark:hover:bg-primary-hover transition-colors mb-6">
                                        Thanh Toán
                                    </button>

                                    <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary">
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                            Bảo Mật
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">autorenew</span>
                                            Đổi Trả 30 Ngày
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
