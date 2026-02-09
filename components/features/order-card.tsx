'use client';

import Image from 'next/image';
import { Order } from '@/types';

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const getStatusStyles = (status: Order['status']) => {
        switch (status) {
            case 'Delivered':
                return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            case 'Processing':
                return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'Shipped':
                return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            case 'Cancelled':
                return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
            case 'Returned':
                return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
            default:
                return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
        }
    };

    const getStatusText = (status: Order['status']) => {
        switch (status) {
            case 'Processing': return 'Đang xử lý';
            case 'Shipped': return 'Đang giao hàng';
            case 'Delivered': return 'Giao thành công';
            case 'Cancelled': return 'Đã hủy';
            case 'Returned': return 'Hoàn trả';
            default: return status;
        }
    };

    return (
        <div className="relative overflow-hidden bg-off-white/40 dark:bg-dark-card/40 backdrop-blur-md border border-black/[0.03] dark:border-white/[0.03] rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 group">
            {/* Top Bar */}
            <div className="px-8 py-5 border-b border-black/[0.03] dark:border-white/[0.03] flex justify-between items-center bg-white/40 dark:bg-dark-card/20">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-luxury-slate-grey/40 uppercase tracking-widest mb-1">Đơn hàng</span>
                        <span className="text-sm font-bold text-dark-text dark:text-dark-text-primary tracking-tight font-mono">{order.id}</span>
                    </div>
                    <div className="hidden md:flex flex-col border-l border-black/[0.05] dark:border-white/[0.05] pl-8">
                        <span className="text-[10px] font-bold text-luxury-slate-grey/40 uppercase tracking-widest mb-1">Ngày mua</span>
                        <span className="text-sm font-medium text-dark-text/80 dark:text-dark-text-secondary">{order.date}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusStyles(order.status)} animate-in fade-in zoom-in duration-500`}>
                        <span className="relative flex h-2 w-2">
                            {(order.status === 'Processing' || order.status === 'Shipped') && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                            )}
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{getStatusText(order.status)}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col lg:flex-row gap-10 items-center justify-between">
                <div className="flex items-center gap-10 w-full lg:w-auto">
                    {/* Visual Stack */}
                    <div className="relative flex items-center justify-center p-2">
                        <div className="flex -space-x-12 group-hover:-space-x-2 transition-all duration-700 ease-out">
                            {order.items.length > 0 ? (
                                order.items.slice(0, 3).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-20 h-28 rounded-xl overflow-hidden shadow-xl border border-white/20 dark:border-black/20 ring-1 ring-black/5 transform transition-all duration-500 group-hover:rotate-0 hover:!scale-110 hover:!z-50"
                                        style={{
                                            zIndex: 30 - idx,
                                            transform: `rotate(${(idx - 1) * 6}deg) translateY(${Math.abs(idx - 1) * 4}px)`
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="w-20 h-28 rounded-xl bg-black/5 dark:bg-white/5 border border-dashed border-black/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-gray-300">image</span>
                                </div>
                            )}
                            {order.items.length > 3 && (
                                <div className="relative w-12 h-12 flex items-center justify-center bg-white dark:bg-dark-surface rounded-full shadow-lg border border-black/5 z-40 -ml-4 self-center">
                                    <span className="text-xs font-bold">+{order.items.length - 3}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-dark-text dark:text-dark-text-primary tracking-tight mb-2">
                            {order.items.length > 0 ? order.items[0].name : 'Đơn hàng trống'}
                            {order.items.length > 1 && <span className="text-luxury-slate-grey/40 font-medium ml-2">& {order.items.length - 1} sản phẩm khác</span>}
                        </h3>
                        <div className="flex items-center gap-4 text-xs font-medium text-luxury-slate-grey/60">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">payments</span>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-black/10"></span>
                            <span>{order.status === 'Processing' ? 'Dự kiến 2-3 ngày' : 'Giao qua Express'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none px-8 py-3.5 bg-dark-text dark:bg-dark-text-primary text-white dark:text-dark-bg rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all shadow-lg shadow-black/5 hover:shadow-primary/20 scale-100 hover:scale-[1.02] active:scale-95">
                        Theo dõi đơn hàng
                    </button>
                    <button className="p-3.5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                        <span className="material-symbols-outlined text-xl">more_horiz</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
