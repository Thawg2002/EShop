'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';

export function Navbar() {
    const pathname = usePathname();
    const itemCount = useCartStore((state) => state.getItemCount());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <header className={`fixed top-0 z-50 w-full transition-all duration-1000 ease-in-out ${isScrolled
                ? 'bg-white/70 backdrop-blur-xl border-b border-black/[0.05] py-2 shadow-premium'
                : 'bg-transparent border-transparent py-6'
                }`}>
                {/* Top Utility Bar */}
                <div className="flex h-16 items-center justify-between px-6 lg:px-12 border-b border-black/[0.03]">
                    {/* Left: Search */}
                    <div className="flex-1 hidden lg:flex items-center">
                        <div className="flex items-center gap-2 border-b border-black/20 pb-1 w-48 group focus-within:border-black transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-gray-400">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="bg-transparent text-xs uppercase tracking-widest outline-none w-full placeholder:text-gray-500 font-medium"
                            />
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div className={`flex-shrink-0 text-center transition-all duration-700 ${isScrolled ? 'scale-100' : 'scale-110'}`}>
                        <Link href="/" className="flex flex-col items-center group/logo">
                            <span className={`text-3xl font-serif-display font-medium tracking-[0.3em] uppercase text-luxury-onyx leading-none transition-all duration-1000 ${isScrolled ? 'tracking-[0.2em]' : 'tracking-[0.4em]'}`}>XX.II</span>
                            <span className={`text-[8px] tracking-[0.5em] uppercase text-luxury-warm-grey mt-1 transition-all duration-1000 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-40 -translate-y-1'}`}>Collective</span>
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-1 flex items-center justify-end gap-6">
                        <div className="hidden sm:flex items-center gap-6">
                            <Link href="/ho-so" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:opacity-60 transition-opacity">
                                <span className="material-symbols-outlined text-[20px]">person</span>
                                <span className="hidden lg:inline">Tài khoản</span>
                            </Link>
                            <Link href="/gio-hang" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:opacity-60 transition-opacity">
                                <span className="relative">
                                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                    {itemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[8px] text-white">
                                            {itemCount}
                                        </span>
                                    )}
                                </span>
                                <span className="hidden lg:inline">Giỏ hàng</span>
                            </Link>
                        </div>
                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-black">
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation Menu */}
                <nav className={`hidden lg:flex h-12 items-center justify-center transition-all duration-1000 ${isScrolled ? 'opacity-100 max-h-12 translate-y-0' : 'opacity-0 max-h-0 -translate-y-4 overflow-hidden'}`}>
                    <div className="flex items-center gap-10">
                        <Link href="/cua-hang?cat=women" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Phụ Nữ
                        </Link>
                        <Link href="/cua-hang?cat=men" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Nam Giới
                        </Link>
                        <Link href="/cua-hang?cat=leather" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Đồ Da
                        </Link>
                        <Link href="/cua-hang?cat=jewelry" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Trang Sức
                        </Link>
                        <Link href="/cua-hang?cat=accessories" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Phụ Kiện
                        </Link>
                        <Link href="/cam-hung" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Cảm Hứng
                        </Link>
                        <Link href="/cua-hang?cat=sale" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-red-800 hover:opacity-70 transition-opacity">
                            Sale
                        </Link>
                        <Link href="/lien-he" className="group relative text-xs font-bold uppercase tracking-[0.2em] text-luxury-onyx hover:opacity-70 transition-opacity">
                            Về XX.II
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-[#fdf8f4] transform transition-transform duration-500 lg:hidden pt-32 px-10 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <nav className="flex flex-col gap-8">
                    <Link href="/cua-hang?cat=women" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif-display uppercase tracking-widest border-b border-black/5 pb-2">Phụ Nữ</Link>
                    <Link href="/cua-hang?cat=men" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif-display uppercase tracking-widest border-b border-black/5 pb-2">Nam Giới</Link>
                    <Link href="/cua-hang?cat=leather" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif-display uppercase tracking-widest border-b border-black/5 pb-2">Đồ Da</Link>
                    <Link href="/cua-hang?cat=jewelry" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif-display uppercase tracking-widest border-b border-black/5 pb-2">Trang Sức</Link>
                    <Link href="/cam-hung" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif-display uppercase tracking-widest border-b border-black/5 pb-2">Cảm Hứng</Link>
                    <Link href="/ho-so" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif-display uppercase tracking-widest border-b border-black/5 pb-2">Hồ Sơ</Link>
                    <div className="mt-4 flex gap-6">
                        <Link href="/gio-hang" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-black underline">Giỏ hàng</Link>
                        <Link href="/lien-he" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-500 underline">Liên hệ</Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
