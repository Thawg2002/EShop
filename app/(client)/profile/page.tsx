// app/profile/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/use-auth';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { formatCurrency } from '@/lib/utils';
import { User, Package, Heart, LogOut, ChevronRight, Settings, CreditCard, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, logout } = useAuth();

    const { data: orders, isLoading: ordersLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res: any = await apiClient.get('/orders/my-orders?limit=3');
            return res.data;
        }
    });

    const { data: loyalty } = useQuery({
        queryKey: ['loyalty'],
        queryFn: async () => {
            const res: any = await apiClient.get('/loyalty/balance');
            return res.data;
        }
    });

    if (!user) return <div className="pt-40 text-center">Vui lòng đăng nhập</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar Menu */}
                    <aside className="lg:col-span-3 space-y-8">
                        <div className="flex items-center space-x-4 mb-10">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold">{user.name}</h2>
                                <p className="text-xs text-muted-text">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-4">
                            {[
                                { name: 'Đơn hàng của tôi', href: '/profile/orders', icon: Package },
                                { name: 'Sản phẩm yêu thích', href: '/profile/wishlist', icon: Heart },
                                { name: 'Ví của bạn', href: '/profile/wallet', icon: CreditCard },
                                { name: 'Ưu đãi & Voucher', href: '/profile/vouchers', icon: Gift },
                                { name: 'Cài đặt tài khoản', href: '/profile/settings', icon: Settings },
                            ].map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className="flex items-center justify-between p-4 rounded-xl border border-border group hover:border-primary/50 hover:bg-primary/5 transition-all"
                                >
                                    <div className="flex items-center space-x-3 text-muted-text group-hover:text-primary">
                                        <item.icon size={20} />
                                        <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-muted-text group-hover:text-primary" />
                                </Link>
                            ))}
                            <button
                                onClick={() => logout()}
                                className="w-full flex items-center space-x-3 p-4 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 transition-all"
                            >
                                <LogOut size={20} />
                                <span className="text-sm font-bold uppercase tracking-widest">Đăng xuất</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-12">

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass p-8 rounded-3xl border-primary/20 space-y-4">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-text">Loyalty Points</p>
                                <p className="text-4xl font-serif font-bold text-primary">{loyalty?.balance || 0}</p>
                                <p className="text-[10px] text-muted-text">Tương đương {formatCurrency((loyalty?.balance || 0) * 1000)} giảm giá</p>
                            </div>
                            <div className="glass p-8 rounded-3xl space-y-4">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-text">Total Orders</p>
                                <p className="text-4xl font-serif font-bold">{(orders as any)?.length || 0}</p>
                                <p className="text-[10px] text-muted-text">Trong năm {new Date().getFullYear()}</p>
                            </div>
                            <div className="luxury-gradient p-8 rounded-3xl text-white space-y-4 shadow-premium">
                                <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-80">Premium Status</p>
                                <p className="text-4xl font-serif font-bold italic">Gold Member</p>
                                <p className="text-[10px] opacity-80 uppercase font-bold">Exclusive Access</p>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-serif font-bold">Đơn hàng gần nhất</h3>
                                <Link href="/profile/orders" className="text-xs font-bold text-primary hover:underline">Xem tất cả</Link>
                            </div>

                            <div className="space-y-4">
                                {ordersLoading ? (
                                    <div className="h-40 bg-muted animate-pulse rounded-2xl" />
                                ) : (orders as any)?.length === 0 ? (
                                    <div className="p-10 border border-dashed border-border rounded-2xl text-center">
                                        <p className="text-muted-text italic">Bạn chưa đặt đơn hàng nào.</p>
                                    </div>
                                ) : (
                                    (orders as any)?.map((order: any) => (
                                        <div key={order._id} className="p-6 rounded-2xl border border-border flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/50 transition-all">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                    <Package size={20} className="text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">Đơn hàng #{order.orderNumber}</p>
                                                    <p className="text-[10px] text-muted-text uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-12">
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase font-bold text-muted-text mb-1">Trạng thái</p>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase font-bold text-muted-text mb-1">Tổng cộng</p>
                                                    <p className="text-sm font-bold text-primary">{formatCurrency(order.pricing.total)}</p>
                                                </div>
                                                <ChevronRight className="text-muted-text" size={20} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </main>

                </div>
            </div>
        </div>
    );
}
