// app/thanh-toan/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/use-cart';
import { useAuth } from '@/lib/use-auth';
import apiClient from '@/lib/api-client';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { CreditCard, Truck, MapPin, Receipt, CheckCircle, ChevronLeft, ShieldCheck, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, fetchCart } = useCart();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.name || '',
        phone: '',
        street: '',
        province: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setIsProcessing(true);
        try {
            const orderData = {
                shippingAddress,
                paymentMethod,
                shippingMethod: 'standard',
                customerNote: '',
            };

            const res: any = await apiClient.post('/orders', orderData);
            toast.success('Đặt hàng thành công!');

            // Navigate to success page or profile
            router.push(`/ho-so`);
        } catch (error: any) {
            toast.error(error.message || 'Lỗi khi đặt hàng');
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-40 flex flex-col items-center justify-center">
                <p className="text-muted-text mb-6">Giỏ hàng của bạn đang trống.</p>
                <Link href="/cua-hang" className="luxury-gradient text-white px-8 py-3 rounded-full uppercase text-xs font-bold">Quay lại cửa hàng</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <Link href="/gio-hang" className="text-xs uppercase tracking-widest text-primary font-bold flex items-center mb-8">
                        <ChevronLeft size={14} className="mr-1" /> Quay lại giỏ hàng
                    </Link>

                    <h1 className="text-5xl font-serif font-bold mb-12">Thanh toán</h1>

                    <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left: Shipping & Payment Info */}
                        <div className="lg:col-span-7 space-y-12">

                            {/* Shipping Address */}
                            <section className="space-y-8">
                                <div className="flex items-center space-x-3 text-primary">
                                    <MapPin size={24} />
                                    <h3 className="text-xl font-serif font-bold">Địa chỉ giao hàng</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-muted-text">Họ và tên</label>
                                        <input
                                            name="fullName"
                                            value={shippingAddress.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Nguyễn Văn A"
                                            className="w-full bg-muted/30 border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-muted-text">Số điện thoại</label>
                                        <input
                                            name="phone"
                                            value={shippingAddress.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="091 234 5678"
                                            className="w-full bg-muted/30 border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-muted-text">Địa chỉ (Số nhà, Tên đường)</label>
                                        <input
                                            name="street"
                                            value={shippingAddress.street}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="123 Lê Lợi"
                                            className="w-full bg-muted/30 border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-muted-text">Quận/Huyện, Tỉnh/Thành phố</label>
                                        <input
                                            name="province"
                                            value={shippingAddress.province}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Quận 1, TP. Hồ Chí Minh"
                                            className="w-full bg-muted/30 border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Methods */}
                            <section className="space-y-8">
                                <div className="flex items-center space-x-3 text-primary">
                                    <CreditCard size={24} />
                                    <h3 className="text-xl font-serif font-bold">Phương thức thanh toán</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border grayscale hover:grayscale-0'}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Truck size={24} />
                                            <div className="text-left">
                                                <p className="font-bold text-sm">Thanh toán tại chỗ (COD)</p>
                                                <p className="text-[10px] text-muted-text uppercase">Trả tiền mặt khi giao hàng</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'cod' && <CheckCircle className="text-primary" size={20} />}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('stripe')}
                                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'border-border grayscale hover:grayscale-0'}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <CreditCard size={24} />
                                            <div className="text-left">
                                                <p className="font-bold text-sm">Thẻ Tín dụng / Ghi nợ</p>
                                                <p className="text-[10px] text-muted-text uppercase">Xử lý bảo mật qua Stripe</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'stripe' && <CheckCircle className="text-primary" size={20} />}
                                    </button>
                                </div>
                            </section>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-muted/30 rounded-3xl p-8 sticky top-32 space-y-8 border border-border/50 shadow-sm">
                                <h4 className="text-xl font-serif font-bold flex items-center">
                                    <ShoppingBag size={20} className="mr-3 text-primary" /> Tóm tắt đơn hàng
                                </h4>

                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                    {items.map((item) => (
                                        <div key={item._id} className="flex justify-between items-start">
                                            <div className="flex space-x-4">
                                                <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                                    <img src={getImageUrl(item.product.featuredImage)} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold line-clamp-1">{item.product.name}</p>
                                                    <p className="text-[10px] text-muted-text font-bold uppercase tracking-wider">Số lượng: {item.quantity}</p>
                                                    {item.variant && <p className="text-[10px] text-muted-text uppercase">{item.variant.size} / {item.variant.color}</p>}
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold">{formatCurrency(item.subtotal)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-border pt-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-text">Tạm tính</span>
                                        <span className="font-bold">{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-text">Phí giao hàng (GHTK)</span>
                                        <span className="text-primary font-bold">Miễn phí</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-border">
                                        <span className="text-lg font-serif font-bold">Tổng cộng</span>
                                        <span className="text-2xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full luxury-gradient text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-premium transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                                >
                                    {isProcessing ? 'Đang xử lý đơn hàng...' : (
                                        <>
                                            <span>Xác nhận Đặt hàng</span>
                                            <CheckCircle size={18} />
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-center space-x-2 text-muted-text">
                                    <ShieldCheck size={16} />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Đảm bảo bảo mật & Quyền lợi khách hàng</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
