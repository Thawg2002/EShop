'use client';

import { useState } from 'react';
import Image from 'next/image';
import { OrderCard } from '@/components/features/order-card';
import { AddressCard } from '@/components/features/address-card';
import { ORDERS, ADDRESSES } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

type TabType = 'info' | 'orders' | 'addresses' | 'payment';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('orders');

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 min-h-[600px]">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-80 flex-shrink-0">
                            <div className="sticky top-32">
                                {/* Profile Header */}
                                <div className="flex items-center gap-4 mb-10 pb-8 border-b border-black/5 dark:border-dark-border">
                                    <div className="relative w-16 h-16 bg-off-white dark:bg-dark-card overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                                            alt="Profile"
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-serif-display italic text-dark-text dark:text-dark-text-primary">Isabella Ross</h2>
                                        <p className="text-[11px] uppercase tracking-widest text-primary font-bold">Diamond Member</p>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <nav className="space-y-2">
                                    {[
                                        { id: 'info' as const, label: 'Thông Tin', icon: 'person' },
                                        { id: 'orders' as const, label: 'Đơn Hàng', icon: 'shopping_bag' },
                                        { id: 'addresses' as const, label: 'Địa Chỉ', icon: 'location_on' },
                                        { id: 'payment' as const, label: 'Thanh Toán', icon: 'credit_card' }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === item.id
                                                ? 'bg-primary text-white'
                                                : 'text-muted-text dark:text-dark-text-secondary hover:bg-off-white dark:hover:bg-dark-card'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                            {item.label}
                                        </button>
                                    ))}
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 mt-8 border-t border-black/5 dark:border-dark-border pt-8">
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Đăng Xuất
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1">
                            {activeTab === 'orders' && (
                                <div className="space-y-10">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                                        <div>
                                            <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-2">Đơn Hàng</h1>
                                            <p className="text-xs uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary">Lịch sử mua hàng của bạn</p>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm đơn hàng..."
                                                className="pl-10 pr-4 py-3 border border-black/10 dark:border-dark-border text-sm focus:ring-1 focus:ring-primary focus:border-primary w-full md:w-80 bg-white dark:bg-dark-card dark:text-dark-text-primary"
                                            />
                                            <span className="material-symbols-outlined absolute left-3 top-3 text-muted-text dark:text-dark-text-secondary text-lg">search</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {ORDERS.map(order => <OrderCard key={order.id} order={order} />)}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div className="space-y-10">
                                    <div>
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-2">Địa Chỉ</h1>
                                        <p className="text-xs uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary">Quản lý địa chỉ giao hàng</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {ADDRESSES.map(addr => <AddressCard key={addr.id} address={addr} />)}
                                        <button className="border-2 border-dashed border-black/10 dark:border-dark-border p-8 flex flex-col items-center justify-center min-h-[240px] text-muted-text dark:text-dark-text-secondary hover:border-primary hover:text-primary hover:bg-off-white dark:hover:bg-dark-card transition-all">
                                            <span className="material-symbols-outlined text-5xl mb-4">add_circle</span>
                                            <span className="text-xs uppercase tracking-widest font-bold">Thêm Địa Chỉ Mới</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'payment' && (
                                <div className="space-y-10">
                                    <div>
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-2">Thanh Toán</h1>
                                        <p className="text-xs uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary">Quản lý phương thức thanh toán</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="border border-black/10 dark:border-dark-border p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-off-white/50 dark:bg-dark-card/50">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-10 border border-black/10 dark:border-dark-border bg-white dark:bg-dark-surface flex items-center justify-center font-bold text-blue-800 italic">VISA</div>
                                                <div>
                                                    <p className="font-bold flex items-center gap-2 text-dark-text dark:text-dark-text-primary">
                                                        Visa ending in 4242
                                                        <span className="bg-primary/10 text-primary text-[11px] px-2 py-1 font-bold uppercase tracking-widest">Mặc Định</span>
                                                    </p>
                                                    <p className="text-xs text-muted-text dark:text-dark-text-secondary mt-1">Hết hạn 12/26</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 text-xs uppercase tracking-widest font-bold text-muted-text dark:text-dark-text-secondary">
                                                <button className="hover:text-primary transition-colors">Sửa</button>
                                                <button className="hover:text-red-500 transition-colors">Xóa</button>
                                            </div>
                                        </div>
                                        <button className="w-full border-2 border-dashed border-black/10 dark:border-dark-border p-8 text-center bg-white dark:bg-dark-bg hover:bg-off-white dark:hover:bg-dark-card transition-colors flex items-center justify-center gap-3">
                                            <span className="material-symbols-outlined">add</span>
                                            <span className="text-xs uppercase tracking-widest font-bold">Thêm Phương Thức Thanh Toán</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'info' && (
                                <div className="max-w-2xl">
                                    <div className="mb-10">
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-2">Thông Tin</h1>
                                        <p className="text-xs uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary">Cập nhật thông tin cá nhân</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Họ" defaultValue="Isabella" />
                                            <Input label="Tên" defaultValue="Ross" />
                                        </div>
                                        <Input
                                            label="Email"
                                            type="email"
                                            defaultValue="isabella.ross@example.com"
                                            disabled
                                            className="bg-off-white dark:bg-dark-card text-muted-text dark:text-dark-text-secondary"
                                        />
                                        <Input label="Số Điện Thoại" defaultValue="+84 123 456 789" />
                                        <button className="w-full md:w-auto px-10 py-4 bg-dark-text dark:bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary dark:hover:bg-primary-hover transition-colors">
                                            Lưu Thay Đổi
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
