'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold ${className}`}>
            <Link
                href="/"
                className="flex items-center gap-1.5 text-muted-text dark:text-dark-text-secondary hover:text-black dark:hover:text-white transition-colors"
            >
                <span className="material-symbols-outlined text-[14px]">home</span>
                <span>Trang Chủ</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[12px] text-gray-300 dark:text-gray-600">chevron_right</span>
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-muted-text dark:text-dark-text-secondary hover:text-black dark:hover:text-white transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-black/40 dark:text-white/40 cursor-default">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
