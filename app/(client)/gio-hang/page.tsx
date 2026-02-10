// app/gio-hang/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/use-cart';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function CartPage() {
    const { items, totalPrice, fetchCart, removeItem, updateQuantity, isLoading } = useCart();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemove = async (itemId: string) => {
        try {
            await removeItem(itemId);
            toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
        } catch (error) {
            toast.error('Không thể xóa sản phẩm');
        }
    };

    if (items.length === 0 && !isLoading) {
        return (
            <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center space-y-8 container mx-auto px-6 text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-muted-text">
                    <ShoppingBag size={40} />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-serif font-bold">Giỏ hàng của bạn đang trống</h1>
                    <p className="text-muted-text max-w-sm mx-auto">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và thêm chúng vào giỏ hàng.</p>
                </div>
                <Link
                    href="/cua-hang"
                    className="luxury-gradient text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
                >
                    Quay lại cửa hàng
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-serif font-bold mb-12">Giỏ hàng của bạn</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-[10px] uppercase font-bold tracking-widest text-muted-text">
                            <div className="col-span-6">Sản phẩm</div>
                            <div className="col-span-2 text-center">Số lượng</div>
                            <div className="col-span-2 text-right">Giá</div>
                            <div className="col-span-2 text-right">Tổng</div>
                        </div>

                        <div className="space-y-10">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-border/50 pb-10 group"
                                    >
                                        {/* Product Info */}
                                        <div className="col-span-1 md:col-span-6 flex items-center space-x-6">
                                            <div className="relative w-24 md:w-32 aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden bg-muted">
                                                <img
                                                    src={getImageUrl(item.product.featuredImage)}
                                                    className="w-full h-full object-cover"
                                                    alt={item.product.name}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-serif font-bold hover:text-primary transition-colors">
                                                    <Link href={`/cua-hang/${item.product._id}`}>{item.product.name}</Link>
                                                </h3>
                                                {item.variant && (
                                                    <p className="text-xs text-muted-text">
                                                        Size: <span className="text-foreground font-bold">{item.variant.size}</span> /
                                                        Color: <span className="text-foreground font-bold">{item.variant.color}</span>
                                                    </p>
                                                )}
                                                <div className="flex items-center space-x-4 pt-2">
                                                    <button className="text-[10px] uppercase tracking-widest font-bold text-muted-text hover:text-primary transition-colors flex items-center">
                                                        <Heart size={12} className="mr-1" /> Yêu thích
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemove(item._id)}
                                                        className="text-[10px] uppercase tracking-widest font-bold text-destructive hover:text-red-600 transition-colors flex items-center"
                                                    >
                                                        <Trash2 size={12} className="mr-1" /> Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity Control */}
                                        <div className="col-span-1 md:col-span-2 flex justify-center">
                                            <div className="flex items-center bg-muted/30 rounded-full px-4 py-2 border border-border">
                                                <button
                                                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                    className="text-muted-text hover:text-primary p-1"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="mx-4 font-bold text-sm w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="text-muted-text hover:text-primary p-1"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Pricing */}
                                        <div className="hidden md:block col-span-2 text-right">
                                            <p className="text-sm font-medium text-muted-text">{formatCurrency(item.price)}</p>
                                        </div>

                                        <div className="col-span-1 md:col-span-2 text-right">
                                            <p className="text-lg font-bold text-primary">{formatCurrency(item.subtotal)}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-muted/30 rounded-3xl p-8 sticky top-32 space-y-8 border border-border/50">
                            <h4 className="text-xl font-serif font-bold">Tổng đơn hàng</h4>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-text">Tạm tính</span>
                                    <span className="font-bold">{formatCurrency(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-text">Phí vận chuyển</span>
                                    <span className="text-green-500 font-bold">Miễn phí</span>
                                </div>
                                {/* Coupon Input placeholder */}
                                <div className="pt-4 space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-muted-text">Mã giảm giá</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Mã dự thưởng"
                                            className="flex-grow bg-white dark:bg-dark-surface border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                        <button className="bg-secondary text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border pt-6 flex justify-between items-end">
                                <span className="text-lg font-serif font-bold">Tổng cộng</span>
                                <span className="text-3xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
                            </div>

                            <Link
                                href="/thanh-toan"
                                className="w-full luxury-gradient text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-premium transition-all hover:-translate-y-1 active:scale-95"
                            >
                                <span>Tiến hành thanh toán</span>
                                <ArrowRight size={18} />
                            </Link>

                            <div className="flex items-center justify-center space-x-2 text-muted-text">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Thanh toán bảo mật 100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
