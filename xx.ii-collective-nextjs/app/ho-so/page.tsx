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
            <main className="flex-1 w-full bg-white dark:bg-dark-bg transition-colors duration-500 overflow-x-hidden">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
                    <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 min-h-[600px]">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-80 flex-shrink-0">
                            <div className="sticky top-40">
                                {/* Profile Header */}
                                <div className="flex items-center gap-6 mb-12 pb-10 border-b border-black/5 dark:border-dark-border">
                                    <div className="relative w-20 h-20 bg-off-white dark:bg-dark-card overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                                            alt="Profile"
                                            fill
                                            className="object-cover transition-all duration-700 hover:scale-110"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-serif-display italic text-dark-text dark:text-dark-text-primary">Isabella Ross</h2>
                                        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold mt-1">Diamond Member</p>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <nav className="flex flex-col">
                                    {[
                                        { id: 'info' as const, label: 'Thông Tin', icon: 'person' },
                                        { id: 'orders' as const, label: 'Đơn Hàng', icon: 'shopping_bag' },
                                        { id: 'addresses' as const, label: 'Địa Chỉ', icon: 'location_on' },
                                        { id: 'payment' as const, label: 'Thanh Toán', icon: 'credit_card' }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-4 py-5 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 border-l-2 ${activeTab === item.id
                                                ? 'border-dark-text text-dark-text font-bold pl-8 bg-off-white/30'
                                                : 'border-transparent text-luxury-slate-grey dark:text-dark-text-secondary hover:text-dark-text hover:pl-8 pl-6'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                            {item.label}
                                        </button>
                                    ))}
                                    <button className="w-full flex items-center gap-4 py-5 text-[11px] uppercase tracking-[0.2em] text-luxury-slate-grey hover:text-red-500 transition-all duration-500 border-t border-black/5 dark:border-dark-border mt-12 pt-10 pl-6">
                                        <span className="material-symbols-outlined text-[20px]">logout</span>
                                        Đăng Xuất
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <div className="flex-1">
                            {activeTab === 'orders' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="mb-16">
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4 leading-tight">Đơn Hàng</h1>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-6">
                                            <p className="text-xs uppercase tracking-[0.2em] text-luxury-slate-grey dark:text-dark-text-secondary font-medium">Lịch sử giao dịch & acquisitions</p>
                                            <div className="relative group w-full md:w-96">
                                                <input
                                                    type="text"
                                                    placeholder="Tìm kiếm đơn hàng..."
                                                    className="w-full pl-12 pr-6 py-4 border border-black/5 dark:border-dark-border bg-off-white/20 dark:bg-dark-card/20 text-[11px] uppercase tracking-widest focus:ring-0 focus:border-black transition-all dark:text-dark-text-primary font-medium"
                                                />
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-luxury-slate-grey text-xl opacity-40">search</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-10">
                                        {ORDERS.map(order => <OrderCard key={order.id} order={order} />)}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="mb-16">
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4 leading-tight">Địa Chỉ</h1>
                                        <p className="text-xs uppercase tracking-[0.2em] text-luxury-slate-grey dark:text-dark-text-secondary font-medium mt-6">Quản lý các node giao nhận</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                                        {ADDRESSES.map(addr => <AddressCard key={addr.id} address={addr} />)}
                                        <button className="border border-dashed border-black/10 dark:border-dark-border p-12 flex flex-col items-center justify-center min-h-[300px] bg-off-white/10 hover:bg-off-white/50 transition-all duration-700 group">
                                            <div className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-3xl text-luxury-slate-grey group-hover:text-dark-text">add</span>
                                            </div>
                                            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey group-hover:text-dark-text">Thêm Địa Chỉ Mới</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'payment' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="mb-16">
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4 leading-tight">Thanh Toán</h1>
                                        <p className="text-xs uppercase tracking-[0.2em] text-luxury-slate-grey dark:text-dark-text-secondary font-medium mt-6">Thông tin danh tính tài chính</p>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="border border-black/[0.05] dark:border-dark-border p-10 flex flex-col md:flex-row md:justify-between md:items-center gap-8 bg-white dark:bg-dark-card hover:shadow-premium transition-all duration-700 group">
                                            <div className="flex items-center gap-8">
                                                <div className="w-20 h-12 border border-black/5 dark:border-dark-border bg-white dark:bg-dark-surface flex items-center justify-center font-bold text-blue-900 italic text-lg tracking-tighter">VISA</div>
                                                <div>
                                                    <p className="font-bold text-dark-text dark:text-dark-text-primary flex items-center gap-4 text-sm uppercase tracking-wide">
                                                        Visa ending in 4242
                                                        <span className="bg-black text-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em]">Mặc Định</span>
                                                    </p>
                                                    <p className="text-[11px] text-luxury-slate-grey dark:text-dark-text-secondary mt-2 font-medium uppercase tracking-[0.2em]">Hết hạn 12 / 26</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey dark:text-dark-text-secondary">
                                                <button className="hover:text-dark-text transition-colors">Sửa</button>
                                                <button className="hover:text-red-500 transition-colors">Xóa</button>
                                            </div>
                                        </div>
                                        <button className="w-full border border-dashed border-black/10 dark:border-dark-border py-12 text-center bg-off-white/10 hover:bg-off-white/50 transition-all duration-700 flex items-center justify-center gap-4 group">
                                            <span className="material-symbols-outlined text-luxury-slate-grey group-hover:text-dark-text">add</span>
                                            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey group-hover:text-dark-text">Thêm Phương Thức Thanh Toán</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'info' && (
                                <div className="max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="mb-16">
                                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4 leading-tight">Hồ Sơ</h1>
                                        <p className="text-xs uppercase tracking-[0.2em] text-luxury-slate-grey dark:text-dark-text-secondary font-medium mt-6">Cập nhật siêu dữ liệu cá nhân</p>
                                    </div>
                                    <div className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey/60 pl-1">Họ</label>
                                                <input defaultValue="Isabella" className="w-full bg-transparent border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-black py-4 text-sm font-medium transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey/60 pl-1">Tên</label>
                                                <input defaultValue="Ross" className="w-full bg-transparent border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-black py-4 text-sm font-medium transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey/60 pl-1">Email</label>
                                            <input defaultValue="isabella.ross@example.com" disabled className="w-full bg-transparent border-0 border-b border-black/5 dark:border-dark-border py-4 text-sm font-medium opacity-50 cursor-not-allowed" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-slate-grey/60 pl-1">Số Điện Thoại</label>
                                            <input defaultValue="+84 123 456 789" className="w-full bg-transparent border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-black py-4 text-sm font-medium transition-all" />
                                        </div>
                                        <div className="pt-10">
                                            <button className="bg-dark-text text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl">
                                                Lưu Thay Đổi
                                            </button>
                                        </div>
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
