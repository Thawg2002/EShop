'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';

export function Navbar() {
    const pathname = usePathname();
    const itemCount = useCartStore((state) => state.getItemCount());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path ? "text-primary" : "text-dark-text hover:text-primary";

    return (
        <>
            <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/5 transition-all duration-300">
                <div className="flex h-20 items-center justify-between px-6 lg:px-12">
                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>

                    {/* Desktop Left Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/cua-hang" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive('/cua-hang')}`}>
                            Cửa Hàng
                        </Link>
                        <Link href="/nhat-ky" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive('/nhat-ky')}`}>
                            Bộ Sưu Tập
                        </Link>
                        <Link href="/cam-hung" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive('/cam-hung')}`}>
                            Cảm Hứng
                        </Link>
                        <Link href="/lien-he" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive('/lien-he')}`}>
                            Liên Hệ
                        </Link>
                    </div>

                    {/* Logo Center */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <Link href="/" className="text-3xl font-serif-display font-medium tracking-widest italic text-dark-text">
                            XX.II
                        </Link>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-6">
                        <button className="hidden sm:block text-dark-text hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[22px]">search</span>
                        </button>
                        <Link href="/ho-so" className={`hidden sm:block transition-colors ${isActive('/ho-so')}`}>
                            <span className="material-symbols-outlined text-[22px]">person</span>
                        </Link>
                        <Link href="/gio-hang" className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase hover:underline">
                            <span className="hidden sm:inline">Giỏ Hàng</span>
                            <span className="relative">
                                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-white">
                                        {itemCount}
                                    </span>
                                )}
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:hidden pt-24 px-8 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <nav className="flex flex-col gap-6">
                    <Link href="/cua-hang" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif-display italic">Cửa Hàng</Link>
                    <Link href="/nhat-ky" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif-display italic">Bộ Sưu Tập</Link>
                    <Link href="/cam-hung" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif-display italic">Cảm Hứng</Link>
                    <Link href="/ho-so" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif-display italic">Hồ Sơ</Link>
                    <Link href="/lien-he" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif-display italic">Liên Hệ</Link>
                </nav>
            </div>
        </>
    );
}
