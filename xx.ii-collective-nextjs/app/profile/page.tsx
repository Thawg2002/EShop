'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ORDERS, ADDRESSES } from '@/lib/data';
import { SHINE_COLORS, PRIMARY_BG } from '@/lib/constants';
import { getStaggerDelay } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { OrderCard } from '@/components/features/order-card';
import { AddressCard } from '@/components/features/address-card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShineBorder } from '@/components/magicui/shine-border';
import { MagicCard } from '@/components/magicui/magic-card';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

type TabType = 'orders' | 'addresses' | 'payment' | 'info';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('orders');

    const tabs: { id: TabType; label: string; icon: string }[] = [
        { id: 'orders', label: 'Đơn Hàng', icon: 'shopping_bag' },
        { id: 'addresses', label: 'Địa Chỉ', icon: 'location_on' },
        { id: 'payment', label: 'Thanh Toán', icon: 'credit_card' },
        { id: 'info', label: 'Thông Tin', icon: 'person' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div className="space-y-4">
                        {ORDERS.map((order, idx) => (
                            <BlurFade key={order.id} delay={getStaggerDelay(idx, 0.2)}>
                                <MagicCard className="bg-white dark:bg-dark-card">
                                    <OrderCard order={order} />
                                </MagicCard>
                            </BlurFade>
                        ))}
                    </div>
                );
            case 'addresses':
                return (
                    <div className="grid md:grid-cols-2 gap-4">
                        {ADDRESSES.map((address, idx) => (
                            <BlurFade key={address.id} delay={getStaggerDelay(idx, 0.2)}>
                                <MagicCard className="bg-white dark:bg-dark-card">
                                    <AddressCard address={address} />
                                </MagicCard>
                            </BlurFade>
                        ))}
                    </div>
                );
            case 'payment':
                return (
                    <BlurFade delay={0.2}>
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 block">credit_card</span>
                            <p className="text-sm text-muted-text dark:text-dark-text-secondary">Chưa có phương thức thanh toán nào được lưu.</p>
                        </div>
                    </BlurFade>
                );
            case 'info':
                return (
                    <BlurFade delay={0.2}>
                        <div className="space-y-6 max-w-md">
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Họ và Tên</label>
                                <input type="text" defaultValue="Nguyễn Văn An" className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm" />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Email</label>
                                <input type="email" defaultValue="an.nguyen@email.com" className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm" />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Số Điện Thoại</label>
                                <input type="tel" defaultValue="+84 909 123 456" className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm" />
                            </div>
                            <ShimmerButton
                                className="h-12 px-8 text-white mt-4"
                                shimmerColor="#ffffff"
                                background={PRIMARY_BG}
                            >
                                <span className="material-symbols-outlined text-sm mr-2">save</span>
                                Lưu Thay Đổi
                            </ShimmerButton>
                        </div>
                    </BlurFade>
                );
        }
    };

    return (
        <PageLayout>
            {/* Profile Header */}
            <BlurFade delay={0.1}>
                <ShineBorder
                    borderRadius={0}
                    borderWidth={1}
                    color={SHINE_COLORS}
                    className="w-full min-w-full p-0 mb-12"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-off-white/50 dark:bg-dark-card/50">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-serif-display text-dark-text dark:text-dark-text-primary mb-1">Nguyễn Văn An</h1>
                            <p className="text-xs text-muted-text dark:text-dark-text-secondary uppercase tracking-widest">Thành viên VIP</p>
                        </div>
                    </div>
                </ShineBorder>
            </BlurFade>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <BlurFade delay={0.2}>
                    <div className="md:w-64 flex-shrink-0">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${activeTab === tab.id
                                        ? 'bg-primary text-white font-medium'
                                        : 'text-muted-text dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-card'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                    <span className="uppercase tracking-wider text-[11px] font-bold">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </BlurFade>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>
            </div>
        </PageLayout>
    );
}
