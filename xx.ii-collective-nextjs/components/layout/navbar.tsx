'use client';

import Link from 'next/link';
import { ShoppingBagIcon, SearchIcon, UserIcon, MenuIcon, DiamondIcon } from '@/components/icons';
import { useCartStore } from '@/lib/store';

export function Navbar() {
    const itemCount = useCartStore((state) => state.getItemCount());

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex lg:hidden">
                    <button className="text-secondary"><MenuIcon /></button>
                </div>

                <Link href="/" className="flex items-center gap-2">
                    <DiamondIcon className="text-primary w-6 h-6" />
                    <span className="text-2xl font-serif font-bold tracking-widest text-secondary">XX.II</span>
                </Link>

                <nav className="hidden gap-8 lg:flex">
                    <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
                        Shop
                    </Link>
                    <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
                        Collections
                    </Link>
                    <Link href="/journal" className="text-sm font-medium hover:text-primary transition-colors">
                        Journal
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-6">
                    <button className="hover:text-primary transition-colors"><SearchIcon /></button>
                    <Link href="/login" className="hover:text-primary transition-colors">
                        <UserIcon />
                    </Link>
                    <Link href="/cart" className="relative hover:text-primary transition-colors">
                        <ShoppingBagIcon />
                        {itemCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
