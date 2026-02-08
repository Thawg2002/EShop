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
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Initialize theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { name: 'Phụ Nữ', href: '/cua-hang?cat=women' },
        { name: 'Nam Giới', href: '/cua-hang?cat=men' },
        { name: 'Đồ Da', href: '/cua-hang?cat=leather' },
        { name: 'Trang Sức', href: '/cua-hang?cat=jewelry' },
        { name: 'Phụ Kiện', href: '/cua-hang?cat=accessories' },
        { name: 'Cảm Hứng', href: '/cam-hung' },
        { name: 'Sale', href: '/cua-hang?cat=sale', isSale: true },
        { name: 'Về XX.II', href: '/lien-he' },
    ];

    return (
        <>
            <header className={`fixed top-0 z-50 w-full transition-all duration-700 ease-in-out ${isScrolled
                ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05] py-2 shadow-premium'
                : 'bg-transparent border-transparent py-1.5'
                }`}>
                <div className={`relative flex items-center justify-between px-6 lg:px-12 transition-all duration-700 ${isScrolled ? 'h-12' : 'h-14'}`}>
                    {/* Left: Branding & Search */}
                    <div className={`flex items-center transition-all duration-700 ${isScrolled ? 'w-auto gap-8' : 'flex-1'}`}>
                        {/* Logo in Scrolled State (Left-aligned) */}
                        {isScrolled && (
                            <Link href="/" className="flex flex-col items-center group/logo flex-shrink-0">
                                <span className="font-serif-display font-medium uppercase text-luxury-onyx dark:text-dark-text text-xl tracking-[0.2em]">XX.II</span>
                            </Link>
                        )}

                        {/* Search Bar - Back on the left */}
                        <div className={`hidden lg:flex items-center transition-all duration-700 ${isScrolled ? 'w-40' : 'w-48'}`}>
                            <div className="flex items-center gap-2 border-b border-black/20 dark:border-white/20 pb-1 w-full group focus-within:border-black dark:focus-within:border-white transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-gray-400">search</span>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className="bg-transparent text-[10px] uppercase tracking-widest outline-none w-full placeholder:text-gray-500 font-medium dark:text-dark-text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Center: Logo (Only when NOT scrolled) or Nav (Only when scrolled) */}
                    <div className={`transition-all duration-700 ${isScrolled ? 'flex-1 flex justify-center px-4' : 'flex-shrink-0'}`}>
                        {!isScrolled ? (
                            <Link href="/" className="flex flex-col items-center group/logo">
                                <span className="font-serif-display font-medium uppercase text-luxury-onyx dark:text-dark-text text-2xl tracking-[0.5em]">XX.II</span>
                                <span className="text-[8px] tracking-[0.6em] uppercase text-luxury-warm-grey dark:text-dark-text-secondary mt-1">Collective</span>
                            </Link>
                        ) : (
                            <nav className="hidden lg:flex items-center gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`group relative text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-70 ${link.isSale ? 'text-red-700 dark:text-red-500' : 'text-luxury-onyx dark:text-dark-text'} scale-90`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className={`flex items-center justify-end gap-5 transition-all duration-700 ${isScrolled ? 'w-auto' : 'flex-1'}`}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-1.5 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-luxury-onyx dark:text-dark-text"
                            title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        <Link href="/ho-so" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white hover:opacity-60 transition-opacity">
                            <span className="material-symbols-outlined text-[20px]">person</span>
                            <span className={isScrolled ? 'hidden xl:inline' : 'hidden lg:inline'}>Tài khoản</span>
                        </Link>

                        <Link href="/gio-hang" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white hover:opacity-60 transition-opacity">
                            <span className="relative">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black dark:bg-white text-[8px] text-white dark:text-black">
                                        {itemCount}
                                    </span>
                                )}
                            </span>
                            <span className={isScrolled ? 'hidden xl:inline' : 'hidden lg:inline'}>Giỏ hàng</span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-black dark:text-white">
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
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
