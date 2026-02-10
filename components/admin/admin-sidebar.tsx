'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Layers,
    Users,
    Image as ImageIcon,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Search,
    ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface AdminSidebarProps {
    className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        {
            title: 'Dashboard',
            href: '/admin',
            icon: LayoutDashboard,
        },
        {
            title: 'Sản phẩm',
            href: '/admin/products',
            icon: Package,
        },
        {
            title: 'Đơn hàng',
            href: '/admin/orders',
            icon: ShoppingBag,
        },
        {
            title: 'Danh mục',
            href: '/admin/categories',
            icon: Layers,
        },
        {
            title: 'Thương hiệu',
            href: '/admin/brands',
            icon: ShieldCheck,
        },
        {
            title: 'Banners',
            href: '/admin/banners',
            icon: ImageIcon,
        },
        {
            title: 'Khách hàng',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Cấu hình',
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-50 h-[100dvh] bg-zinc-950 text-white transition-all duration-300 border-r border-zinc-800",
                    collapsed ? "w-[70px]" : "w-[260px]",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
                    {!collapsed && (
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold font-serif text-xl">
                                X
                            </div>
                            <span className="font-bold text-lg tracking-tight">TailAdmin</span>
                        </Link>
                    )}
                    {collapsed && (
                        <div className="w-full flex justify-center">
                            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold font-serif text-xl">
                                X
                            </div>
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden text-zinc-400 hover:text-white"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Nav Items */}
                <ScrollArea className="h-[calc(100vh-64px-64px)] py-4">
                    <nav className="space-y-1 px-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                    pathname === item.href
                                        ? "bg-zinc-800 text-white font-medium shadow-sm"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        pathname === item.href ? "text-white" : "text-zinc-500 group-hover:text-white"
                                    )}
                                />
                                {!collapsed && (
                                    <span>{item.title}</span>
                                )}
                                {collapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                        {item.title}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </nav>
                </ScrollArea>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-zinc-950">
                    <button className={cn(
                        "flex items-center gap-3 w-full text-zinc-400 hover:text-red-400 transition-colors",
                        collapsed ? "justify-center" : "px-2"
                    )}>
                        <LogOut size={20} />
                        {!collapsed && <span className="text-sm font-medium">Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Toggle Button (Visible when sidebar is closed on mobile) */}
            {!mobileOpen && (
                <div className="fixed top-4 left-4 z-40 lg:hidden">
                    <Button
                        variant="outline"
                        size="icon"
                        className="shadow-md bg-white text-black border-zinc-200"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={20} />
                    </Button>
                </div>
            )}
        </>
    );
}
