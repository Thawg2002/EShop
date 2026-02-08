'use client';

import Image from 'next/image';

import { Order } from '@/types';

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const badgeStyles =
        order.status === 'Delivered'
            ? 'bg-black text-white dark:bg-dark-text-primary dark:text-dark-bg'
            : 'border border-black text-black bg-transparent dark:border-dark-text-primary dark:text-dark-text-primary';

    return (
        <div className="border border-black/[0.05] dark:border-dark-border overflow-hidden bg-white dark:bg-dark-card transition-all duration-700 hover:shadow-premium group">
            {/* Header Metadata */}
            <div className="px-10 py-8 border-b border-black/[0.03] dark:border-dark-border flex flex-wrap justify-between items-center gap-8">
                <div className="flex gap-12 text-[11px] uppercase tracking-[0.2em] font-medium">
                    <div>
                        <p className="text-luxury-slate-grey mb-2 font-bold opacity-60">Đặt ngày</p>
                        <p className="text-dark-text dark:text-dark-text-primary">{order.date}</p>
                    </div>
                    <div>
                        <p className="text-luxury-slate-grey mb-2 font-bold opacity-60">Tổng tiền</p>
                        <p className="text-dark-text dark:text-dark-text-primary">${order.total}.00</p>
                    </div>
                    <div>
                        <p className="text-luxury-slate-grey mb-2 font-bold opacity-60">Mã đơn #</p>
                        <p className="text-dark-text dark:text-dark-text-primary font-mono tracking-tighter">{order.id}</p>
                    </div>
                </div>
                <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-dark-text dark:text-dark-text-primary hover:text-primary transition-colors underline underline-offset-8 decoration-black/10 hover:decoration-primary">
                    Chi Tiết Đơn Hàng
                </button>
            </div>

            {/* Content Preview */}
            <div className="p-10 flex flex-col md:flex-row gap-12 justify-between items-center bg-off-white/10">
                <div className="flex gap-8 items-center">
                    <div className="flex -space-x-6 hover:space-x-4 transition-all duration-700">
                        {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="relative w-24 h-32 bg-white dark:bg-dark-surface border border-black/[0.03] shadow-md overflow-hidden transition-all duration-1000 transform hover:scale-105 hover:z-10">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-serif-display text-2xl italic text-dark-text dark:text-dark-text-primary">{order.status}</h4>
                        <p className="text-[11px] text-luxury-slate-grey dark:text-dark-text-secondary mt-2 font-medium uppercase tracking-[0.2em]">
                            {order.status === 'Processing'
                                ? 'Dự kiến: 16/02 - 18/02'
                                : `Cập nhật ngày ${order.date}`}
                        </p>
                    </div>
                </div>
                <div className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] ${badgeStyles} shadow-sm group-hover:shadow-md transition-all duration-700`}>
                    {order.status}
                </div>
            </div>
        </div>
    );
}
