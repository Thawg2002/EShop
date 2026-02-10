'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Bell, Search, Command, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-zinc-50/80 font-sans antialiased text-zinc-900">
                <AppSidebar />
                <SidebarInset className="bg-white m-2 ml-0 rounded-3xl shadow-[0_0_1px_rgba(0,0,0,0.1),0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-200/50 flex flex-col relative transition-all duration-300">
                    {/* Inset Header */}
                    <header className="flex h-16 shrink-0 items-center justify-between px-6 sticky top-0 bg-white/80 backdrop-blur-md z-5 border-b border-zinc-100">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1 text-zinc-500 hover:text-zinc-900" />
                            <Separator orientation="vertical" className="h-4 bg-zinc-200" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/admin" className="text-zinc-400 hover:text-zinc-900 transition-colors text-xs font-medium uppercase tracking-wider">Dashboard</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {segments.length > 1 && (
                                        <>
                                            <BreadcrumbSeparator className="text-zinc-300" />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage className="capitalize font-bold text-zinc-900 text-xs uppercase tracking-wider">
                                                    {segments[segments.length - 1].replace(/-/g, ' ')}
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </>
                                    )}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        {/* Right Content */}
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex relative items-center group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" size={14} />
                                <Input
                                    placeholder="Search command... (⌘K)"
                                    className="h-9 w-64 pl-10 bg-zinc-100/50 border-transparent focus:bg-white focus:border-zinc-200 transition-all text-[13px] rounded-xl font-medium"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-200 bg-white text-[10px] text-zinc-400 font-bold">
                                    <Command size={10} /> K
                                </div>
                            </div>
                            <Separator orientation="vertical" className="h-4 bg-zinc-200 hidden md:block" />
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-all relative">
                                    <Bell size={18} />
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>
                                <button className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-all">
                                    <Settings size={18} />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto bg-zinc-50/20">
                        <div className="p-6 lg:p-10 mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
