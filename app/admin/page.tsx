'use client';

import React from 'react';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    Clock,
    Plus,
    Layers,
    ChevronRight
} from 'lucide-react';
import { useAdminStore } from '@/lib/stores/use-admin-store';
import { formatCurrency, cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const StatCard = ({ title, value, icon: Icon, trend, label, color }: any) => (
    <Card className="hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group border-none shadow-sm rounded-[2rem] bg-white p-2 border border-zinc-50/50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50/50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-zinc-100/80 transition-colors duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{title}</CardTitle>
            <div className="p-3 rounded-2xl bg-zinc-50 text-zinc-900 group-hover:bg-black group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm">
                <Icon size={20} strokeWidth={2.5} />
            </div>
        </CardHeader>
        <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tighter text-zinc-900">{value}</div>
            <div className="flex items-center gap-2 mt-4">
                {trend && (
                    <span className={cn(
                        "text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm",
                        trend > 0 ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    )}>
                        {trend > 0 ? <ArrowUpRight size={12} strokeWidth={4} /> : <ArrowDownRight size={12} strokeWidth={4} />}
                        {Math.abs(trend)}%
                    </span>
                )}
                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{label}</span>
            </div>
        </CardContent>
    </Card>
);

export default function AdminDashboard() {
    const { products, orders, categories, users } = useAdminStore();

    const statItems = [
        {
            title: 'Tổng doanh thu',
            value: formatCurrency(orders.reduce((acc, o) => acc + (o.pricing?.total || 0), 0)),
            icon: DollarSign,
            trend: 12.5,
            label: 'Tháng này',
        },
        {
            title: 'Đơn hàng',
            value: orders.length,
            icon: ShoppingBag,
            trend: 8.2,
            label: 'Đang hoạt động',
        },
        {
            title: 'Sản phẩm',
            value: products.length,
            icon: Package,
            trend: 5.4,
            label: 'Trong kho',
        },
        {
            title: 'Khách hàng',
            value: users?.length || 0,
            icon: Users,
            trend: 10.2,
            label: 'Thành viên mới',
        },
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 p-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-5xl font-black tracking-tighter">Tổng quan</h1>
                    <p className="text-zinc-500 font-medium text-lg">Chào mừng trở lại! Phân tích hoạt động kinh doanh hôm nay.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-zinc-200 h-12 px-6 font-bold hover:bg-zinc-50 transition-all">Báo cáo phân tích</Button>
                    <Button className="rounded-2xl bg-black text-white hover:bg-zinc-800 h-12 px-8 font-black shadow-lg shadow-black/10 transition-all active:scale-95">Xuất dữ liệu</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statItems.map((item, idx) => (
                    <StatCard key={idx} {...item} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Orders */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-50 pb-8 px-10 pt-10">
                        <div>
                            <CardTitle className="text-2xl font-black tracking-tighter">Đơn hàng mới</CardTitle>
                            <CardDescription className="text-zinc-400 font-medium">Theo dõi các giao dịch vừa phát sinh</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild className="rounded-xl hover:bg-zinc-50 px-4 h-10">
                            <Link href="/admin/orders" className="gap-2 font-black text-xs uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                                Xem tất cả <ChevronRight size={14} strokeWidth={3} />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-zinc-50/50">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="pl-10 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Mã đơn</TableHead>
                                    <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Khách hàng</TableHead>
                                    <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Thanh toán</TableHead>
                                    <TableHead className="pr-10 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-right">Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-24 text-zinc-400 italic font-medium">Chưa có dữ liệu đơn hàng</TableCell>
                                    </TableRow>
                                ) : (
                                    recentOrders.map((order) => (
                                        <TableRow key={order._id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors duration-200 group">
                                            <TableCell className="pl-10 py-6">
                                                <Badge variant="outline" className="font-mono text-[10px] font-black border-zinc-200 bg-white shadow-sm px-2 py-0.5 rounded-lg">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-xs font-black shadow-inner border border-zinc-50">
                                                        {(order.user as any)?.name?.slice(0, 1).toUpperCase() || 'K'}
                                                    </div>
                                                    <div className="font-bold text-zinc-900 group-hover:text-black transition-colors">
                                                        {(order.user as any)?.name || 'Khách vãng lai'}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-black text-lg text-black">{formatCurrency(order.pricing?.total)}</TableCell>
                                            <TableCell className="pr-10 text-right">
                                                <Badge className={cn(
                                                    "capitalize text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm",
                                                    order.status === 'delivered' ? "bg-green-50 text-green-600 border border-green-100" :
                                                        order.status === 'pending' ? "bg-orange-50 text-orange-600 border border-orange-100" : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                                                )}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-8">
                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-black text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Plus size={100} />
                        </div>
                        <CardHeader className="pb-6 px-8 pt-8">
                            <CardTitle className="text-xl font-black tracking-tighter">Hành động nhanh</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium">Lối tắt quản lý hệ thống</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4 px-8 pb-8 relative z-10">
                            <Button variant="ghost" className="flex flex-col h-32 gap-3 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-3xl transition-all duration-300 group/btn" asChild>
                                <Link href="/admin/products">
                                    <div className="p-3 rounded-2xl bg-zinc-800 group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                                        <Plus size={24} strokeWidth={3} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Sản phẩm</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" className="flex flex-col h-32 gap-3 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-3xl transition-all duration-300 group/btn" asChild>
                                <Link href="/admin/categories">
                                    <div className="p-3 rounded-2xl bg-zinc-800 group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                                        <Layers size={24} strokeWidth={3} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Danh mục</span>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <TrendingUp size={80} />
                        </div>
                        <CardHeader className="pb-6 px-8 pt-8">
                            <CardTitle className="text-xl font-black tracking-tighter">Hệ thống</CardTitle>
                            <CardDescription className="text-zinc-400 font-medium">Trình trạng hạ tầng kỹ thuật</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 space-y-6">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-zinc-600 font-black text-xs uppercase tracking-wider">Gateway</span>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-black border-green-100 text-green-600 bg-green-50/50 px-2 py-0.5 rounded-lg shadow-sm">STABLE</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-zinc-600 font-black text-xs uppercase tracking-wider">Database</span>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-black border-green-100 text-green-600 bg-green-50/50 px-2 py-0.5 rounded-lg shadow-sm">SYNCED</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        <span className="text-zinc-600 font-black text-xs uppercase tracking-wider">Storage</span>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-black border-blue-100 text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded-lg shadow-sm">CDN OK</Badge>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-zinc-50">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">
                                    <span>Last sync: Just now</span>
                                    <div className="flex items-center gap-1">
                                        <Clock size={10} strokeWidth={3} />
                                        <span>v2.1.0</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
