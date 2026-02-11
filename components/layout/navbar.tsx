'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store';

export function Navbar() {
    const pathname = usePathname();
    const itemCount = useCartStore((state) => state.getItemCount());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const isTransparentPage = pathname === '/';

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

    // Lock scroll when menu is open
    useEffect(() => {
        const body = document.body;
        if (isMenuOpen) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }

        return () => {
            body.style.overflow = '';
        };
    }, [isMenuOpen]);

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
        { name: 'Phụ Nữ', href: '/women' },
        { name: 'Nam Giới', href: '/men' },
        { name: 'Đồ Da', href: '/leather' },
        { name: 'Trang Sức', href: '/jewelry' },
        { name: 'Phụ Kiện', href: '/accessories' },
        { name: 'Tin Tức', href: '/tin-tuc' },
        { name: 'Sale', href: '/sale', isSale: true },
        { name: 'Về XX.II', href: '/lien-he' },
    ];

    return (
        <>
            <header className={`fixed top-0 z-50 w-full transition-all duration-700 ease-in-out ${isScrolled
                ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05] py-2 shadow-premium'
                : isTransparentPage ? 'bg-transparent border-transparent py-1.5' : 'bg-white dark:bg-dark-bg border-b border-black/[0.05] dark:border-white/[0.05] py-1.5'
                }`}>
                <div className={`relative flex items-center justify-between px-6 lg:px-12 transition-all duration-700 ${isScrolled ? 'h-12' : 'h-14'}`}>
                    {/* Left: Branding & Search */}
                    <div className={`flex items-center transition-all duration-700 ${isScrolled ? 'w-auto gap-8' : 'flex-1'}`}>
                        {/* Logo in Scrolled State (Left-aligned) or Non-scrolled non-transparent state */}
                        {(isScrolled || !isTransparentPage) && (
                            <Link href="/" className="flex flex-col items-center group/logo flex-shrink-0">
                                <span className={"font-serif text-2xl tracking-tight text-zinc-950 dark:text-zinc-50"}>
                                    XX.II
                                </span>
                            </Link>
                        )}

                        {/* Search Bar */}
                        <div className={`hidden lg:flex items-center transition-all duration-700 ${isScrolled ? 'w-40' : 'w-48'}`}>
                            <div className={`flex items-center gap-2 border-b pb-1 w-full group transition-colors ${(isScrolled || !isTransparentPage)
                                ? 'border-black/20 dark:border-white/20 focus-within:border-black dark:focus-within:border-white'
                                : 'border-white/40 focus-within:border-white'
                                }`}>
                                <span className={`material-symbols-outlined text-[18px] transition-colors ${(isScrolled || !isTransparentPage) ? 'text-gray-400' : 'text-white/70'}`}>search</span>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className={`bg-transparent text-[10px] uppercase tracking-widest outline-none w-full font-medium transition-colors ${(isScrolled || !isTransparentPage)
                                        ? 'placeholder:text-gray-500 dark:text-dark-text text-luxury-onyx'
                                        : 'placeholder:text-white/60 text-white'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Center: Logo (Only when NOT scrolled AND transparent) or Nav (else) */}
                    <div className={`transition-all duration-700 ${(isScrolled || !isTransparentPage) ? 'flex-1 flex justify-center px-4' : 'flex-shrink-0'}`}>
                        {(!isScrolled && isTransparentPage) ? (
                            <Link href="/" className="flex flex-col items-center group/logo">
                                <span className={"font-serif text-2xl tracking-tight text-white"}>
                                    XX.II
                                </span>
                                <span className="text-[9px] tracking-[0.4em] text-white/70 mt-0.5 font-bold">Collective</span>
                            </Link>
                        ) : (
                            <nav className="hidden lg:flex items-center gap-10">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "text-[11px] text-nowrap font-bold uppercase tracking-[0.14em] transition-all duration-300 relative group py-2",
                                            link.isSale ? "text-red-500" : "text-[#1d1d1f] hover:text-[#0071e3]",
                                            isActive(link.href) ? "text-[#0071e3]" : ""
                                        )}
                                    >
                                        {link.name}
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0071e3] origin-left transition-transform duration-500",
                                            isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )} />
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className={`flex items-center justify-end gap-5 transition-all duration-700 ${(isScrolled || !isTransparentPage) ? 'w-auto' : 'flex-1'}`}>

                        <Link href="/gio-hang" className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-all ${(isScrolled || !isTransparentPage) ? 'text-black dark:text-white' : 'text-white'
                            }`}>
                            <span className="relative">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                {itemCount > 0 && (
                                    <span className={`absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] ${(isScrolled || !isTransparentPage) ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white text-black'
                                        }`}>
                                        {itemCount}
                                    </span>
                                )}
                            </span>
                            <span className={(isScrolled || !isTransparentPage) ? 'hidden xl:inline' : 'hidden lg:inline'}>Giỏ hàng</span>
                        </Link>

                        <Link href="/ho-so" className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-all ${(isScrolled || !isTransparentPage) ? 'text-black dark:text-white' : 'text-white'
                            }`}>
                            <span className="material-symbols-outlined text-[20px]">person</span>
                            <span className={(isScrolled || !isTransparentPage) ? 'hidden xl:inline' : 'hidden lg:inline'}>Tài khoản</span>
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`p-1.5 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${(isScrolled || !isTransparentPage) ? 'text-luxury-onyx dark:text-dark-text' : 'text-white'
                                }`}
                            title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`lg:hidden p-2 transition-colors ${(isScrolled || !isTransparentPage) ? 'text-black dark:text-white' : 'text-white'
                            }`}>
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-[#0a0a0a] lg:hidden flex flex-col"
                    >
                        {/* Custom Header for Mobile Menu */}
                        <div className="flex items-center justify-between px-6 h-14 border-b border-black/[0.03] dark:border-white/[0.03]">
                            <span className="font-serif text-xl tracking-tight text-black dark:text-white">XX.II</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-black dark:text-white">
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-10 py-12 flex flex-col justify-between scrollbar-hide">
                            <motion.nav
                                className="space-y-1"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                                    hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Mobile Search */}
                                <motion.div
                                    variants={{
                                        visible: { opacity: 1, x: 0 },
                                        hidden: { opacity: 0, x: -10 }
                                    }}
                                    className="mb-10 relative group"
                                >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-400 text-lg">search</span>
                                    <input
                                        type="text"
                                        placeholder="TÌM KIẾM SẢN PHẨM"
                                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 pl-8 text-[9px] font-black tracking-[0.3em] uppercase outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-zinc-300"
                                    />
                                </motion.div>

                                {navLinks.map((link) => (
                                    <motion.div
                                        key={link.name}
                                        variants={{
                                            visible: { opacity: 1, x: 0 },
                                            hidden: { opacity: 0, x: -10 }
                                        }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cn(
                                                "block py-3.5 text-[15px] font-light tracking-[0.15em] uppercase transition-all duration-300",
                                                link.isSale ? "text-red-500" : "text-black dark:text-white",
                                                isActive(link.href) ? "opacity-100 font-medium" : "opacity-60"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    variants={{
                                        visible: { opacity: 1 },
                                        hidden: { opacity: 0 }
                                    }}
                                    className="pt-10 space-y-5"
                                >
                                    <div className="h-[1px] w-full bg-black/[0.05] dark:bg-white/[0.05]" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link
                                            href="/ho-so"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40"
                                        >
                                            Hồ Sơ
                                        </Link>
                                        <Link
                                            href="/gio-hang"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40"
                                        >
                                            Giỏ Hàng ({itemCount})
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.nav>

                            {/* Mobile Menu Footer Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-20 pt-8 border-t border-black/[0.03] dark:border-white/[0.03] flex justify-between items-end"
                            >
                                <div className="space-y-2">
                                    <div className="flex gap-4">
                                        <a href="#" className="text-[9px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">Instagram</a>
                                        <a href="#" className="text-[9px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">Facebook</a>
                                    </div>
                                    <p className="text-[8px] tracking-[0.3em] uppercase text-black/20 dark:text-white/20 font-medium">
                                        XX.II / TOKYO - PARIS - HN
                                    </p>
                                </div>
                                <span className="text-[14px] font-serif italic text-black/10 dark:text-white/10">Collective</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
