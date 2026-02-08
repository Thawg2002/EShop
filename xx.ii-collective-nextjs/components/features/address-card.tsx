'use client';

import { Address } from '@/types';

interface AddressCardProps {
    address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
    return (
        <div className="border border-black/[0.05] dark:border-dark-border p-10 relative hover:shadow-premium transition-all duration-700 bg-white dark:bg-dark-card group overflow-hidden">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="font-serif-display text-3xl italic text-dark-text dark:text-dark-text-primary mb-2 tracking-tight">{address.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Shipping Destination</p>
                </div>
                {address.isDefault && (
                    <span className="bg-black text-white px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">Mặc Định</span>
                )}
            </div>

            <address className="not-italic text-luxury-slate-grey dark:text-dark-text-secondary text-sm mb-10 leading-relaxed font-serif-display">
                {address.street}<br />
                {address.city}, {address.state} {address.zip}<br />
                Vietnam
            </address>

            <div className="flex items-center gap-3 mb-12">
                <span className="material-symbols-outlined text-[18px] text-luxury-slate-grey/40">call</span>
                <p className="text-[11px] font-bold tracking-widest text-dark-text dark:text-dark-text-primary">{address.phone}</p>
            </div>

            <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold pt-10 border-t border-black/[0.03] dark:border-dark-border">
                <button className="text-luxury-slate-grey hover:text-dark-text transition-colors flex items-center gap-2 group/edit">
                    Chỉnh Sửa
                    <span className="material-symbols-outlined text-[14px] group-hover/edit:translate-y-[-1px] transition-transform">edit</span>
                </button>
                <button className="text-luxury-slate-grey hover:text-red-500 transition-colors flex items-center gap-2 group/remove">
                    Gỡ Bỏ
                    <span className="material-symbols-outlined text-[14px] group-hover/remove:scale-110 transition-transform">delete</span>
                </button>
            </div>
        </div>
    );
}
