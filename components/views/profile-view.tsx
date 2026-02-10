'use client';

import { useState } from 'react';
import Image from 'next/image';
import { OrderCard } from '@/components/features/order-card';
import { AddressCard } from '@/components/features/address-card';
import { ORDERS, ADDRESSES } from '@/lib/data';

type TabType = 'info' | 'orders' | 'addresses' | 'payment';

const navItems = [
    { id: 'info' as const, label: 'Thông Tin Cá Nhân', icon: 'person' },
    { id: 'orders' as const, label: 'Lịch Sử Đơn Hàng', icon: 'shopping_bag' },
    { id: 'addresses' as const, label: 'Sổ Địa Chỉ', icon: 'location_on' },
    { id: 'payment' as const, label: 'Phương Thức Thanh Toán', icon: 'credit_card' }
];

export function ProfileView() {
    const [activeTab, setActiveTab] = useState<TabType>('orders');

    return (
        <main className="flex-1 w-full bg-white dark:bg-dark-bg transition-colors duration-500 overflow-x-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    <aside className="lg:w-80 flex-shrink-0">
                        <div className="sticky top-32 space-y-10">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative bg-white/50 dark:bg-dark-card/50 backdrop-blur-xl border border-black/[0.03] dark:border-white/[0.03] rounded-2xl p-6 flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white dark:ring-black shadow-2xl">
                                            <Image
                                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop"
                                                alt="Avatar"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary border-2 border-white dark:border-dark-card rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[10px] text-white">bolt</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-foreground tracking-tight">Isabella Ross</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 bg-black/[0.05] dark:bg-white/[0.05] rounded text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Tier: Platinum</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group ${activeTab === item.id
                                            ? 'bg-foreground text-background dark:bg-foreground dark:text-background shadow-xl shadow-black/10'
                                            : 'text-muted-foreground/60 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-foreground'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`material-symbols-outlined text-xl transition-colors ${activeTab === item.id ? 'text-background' : 'text-muted-foreground/30 group-hover:text-foreground'}`}>
                                                {item.icon}
                                            </span>
                                            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{item.label}</span>
                                        </div>
                                        {activeTab === item.id && (
                                            <span className="material-symbols-outlined text-sm animate-in fade-in slide-in-from-left-2">arrow_forward_ios</span>
                                        )}
                                    </button>
                                ))}

                                <div className="pt-6 mt-6 border-t border-border">
                                    <button className="w-full flex items-center gap-4 px-5 py-3.5 text-muted-foreground/60 hover:text-red-500 transition-colors group">
                                        <span className="material-symbols-outlined text-xl text-muted-foreground/30 group-hover:text-red-500">logout</span>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Đăng Xuất</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    <div className="flex-1 max-w-4xl">
                        {activeTab === 'orders' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="mb-10">
                                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 leading-tight tracking-tight">Lịch Sử Đơn Hàng</h1>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4 pb-6 border-b border-border">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Danh sách giao dịch mua hàng</p>
                                        <div className="relative group w-full md:w-80">
                                            <input
                                                type="text"
                                                placeholder="TÌM KIẾM ĐƠN HÀNG..."
                                                className="w-full pl-10 pr-4 py-3 border border-border bg-muted/20 text-[9px] uppercase tracking-[0.15em] focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground font-bold placeholder:text-muted-foreground/40 rounded-xl"
                                            />
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-lg">search</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    {ORDERS.map(order => <OrderCard key={order._id} order={order} />)}
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="mb-10">
                                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 leading-tight tracking-tight">Sổ Địa Chỉ</h1>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-4">Quản lý các địa điểm giao nhận hàng</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {ADDRESSES.map(addr => <AddressCard key={addr._id} address={addr} />)}
                                    <button className="border border-dashed border-border p-8 flex flex-col items-center justify-center min-h-[240px] bg-muted/10 hover:bg-background hover:shadow-2xl transition-all duration-700 group rounded-2xl text-foreground">
                                        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all">
                                            <span className="material-symbols-outlined text-2xl text-muted-foreground group-hover:text-white">add</span>
                                        </div>
                                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-foreground">Thêm Địa Chỉ Mới</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="mb-10">
                                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 leading-tight tracking-tight">Thanh Toán</h1>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-4">Thông tin phương thức thanh toán bảo mật</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="border border-border p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-white/50 dark:bg-dark-card/50 backdrop-blur-md rounded-2xl hover:shadow-2xl transition-all duration-700 group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-10 border border-border bg-background flex items-center justify-center font-bold text-blue-900 italic text-base tracking-tighter shadow-sm rounded-lg">VISA</div>
                                            <div>
                                                <p className="font-bold text-foreground flex items-center gap-3 text-[11px] uppercase tracking-wide">
                                                    Visa kết thúc bằng 4242
                                                    <span className="bg-primary text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] rounded-sm shadow-sm">Mặc Định</span>
                                                </p>
                                                <p className="text-[9px] text-muted-foreground mt-1 font-bold uppercase tracking-[0.2em]">Hết hạn 12 / 26</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                                            <button className="hover:text-foreground transition-colors">Sửa</button>
                                            <button className="hover:text-red-500 transition-colors">Gỡ bỏ</button>
                                        </div>
                                    </div>
                                    <button className="w-full border border-dashed border-border py-8 text-center bg-muted/10 hover:bg-background hover:shadow-2xl transition-all duration-700 flex items-center justify-center gap-3 group rounded-2xl">
                                        <span className="material-symbols-outlined text-muted-foreground group-hover:text-foreground">add</span>
                                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-foreground">Thêm Phương Thức Mới</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'info' && (
                            <div className="max-w-2xl space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                <div className="mb-10">
                                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 leading-tight tracking-tight">Hồ Sơ Cá Nhân</h1>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-4">Cập nhật thông tin nhận diện tài khoản</p>
                                </div>
                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 pl-1">Họ</label>
                                            <input defaultValue="Isabella" className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary py-4 text-sm font-medium transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 pl-1">Tên</label>
                                            <input defaultValue="Ross" className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary py-4 text-sm font-medium transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 pl-1">Email</label>
                                        <input defaultValue="isabella.ross@example.com" disabled className="w-full bg-transparent border-0 border-b border-border py-4 text-sm font-medium opacity-50 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 pl-1">Số Điện Thoại</label>
                                        <input defaultValue="+84 123 456 789" className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary py-4 text-sm font-medium transition-all" />
                                    </div>
                                    <div className="pt-10">
                                        <button className="bg-foreground text-background dark:bg-foreground dark:text-background px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-all shadow-xl rounded-xl">
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
    );
}
