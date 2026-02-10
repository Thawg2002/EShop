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
import { formatCurrency } from '@/lib/utils';
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
    <Card className="hover:shadow-md transition-shadow relative overflow-hidden group border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{title}</CardTitle>
            <div className={`p-2 rounded-lg bg-zinc-50 text-zinc-900`}>
                <Icon size={18} />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center gap-2 mt-1">
                {trend && (
                    <span className={`text-xs font-bold flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(trend)}%
                    </span>
                )}
                <span className="text-[10px] text-zinc-400 font-medium uppercase">{label}</span>
            </div>
        </CardContent>
    </Card>
);

export default function AdminDashboard() {
    // In a real app, we'd have a separate stats store or query
    // For this redesign, we'll use mocked logic based on current data
    const { products, orders, categories, users } = useAdminStore();

    const statItems = [
        {
            title: 'Tổng doanh thu',
            value: formatCurrency(orders.reduce((acc, o) => acc + (o.pricing?.total || 0), 0)),
            icon: DollarSign,
            trend: 12.5,
            label: 'So với tháng trước',
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
            label: 'Trong kho hàng',
        },
        {
            title: 'Khách hàng',
            value: users?.length || 0,
            icon: Users,
            trend: -2.4,
            label: 'Người dùng mới',
        },
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tổng quan</h1>
                <p className="text-zinc-500">Chào mừng trở lại! Đây là tóm tắt hoạt động kinh doanh hôm nay.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((item, idx) => (
                    <StatCard key={idx} {...item} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <Card className="lg:col-span-2 border-zinc-200">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Đơn hàng gần đây</CardTitle>
                            <CardDescription>Danh sách 5 đơn hàng mới nhất</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/orders" className="gap-1">
                                Xem tất cả <ChevronRight size={14} />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-zinc-50">
                                <TableRow>
                                    <TableHead>Mã đơn</TableHead>
                                    <TableHead>Khách hàng</TableHead>
                                    <TableHead>Tổng tiền</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10 text-zinc-500 italic">Chưa có đơn hàng nào</TableCell>
                                    </TableRow>
                                ) : (
                                    recentOrders.map((order) => (
                                        <TableRow key={order._id}>
                                            <TableCell className="font-mono text-xs font-bold uppercase">#{order._id.slice(-6)}</TableCell>
                                            <TableCell className="font-medium">{(order.user as any)?.name || 'Khách'}</TableCell>
                                            <TableCell className="font-bold">{formatCurrency(order.pricing?.total)}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="capitalize text-[10px]">
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
                <div className="space-y-6">
                    <Card className="border-zinc-200">
                        <CardHeader>
                            <CardTitle>Hành động nhanh</CardTitle>
                            <CardDescription>Truy cập nhanh các chức năng chính</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="flex flex-col h-24 gap-2 border-dashed" asChild>
                                <Link href="/admin/products">
                                    <Plus size={20} />
                                    <span className="text-xs">Thêm SP</span>
                                </Link>
                            </Button>
                            <Button variant="outline" className="flex flex-col h-24 gap-2 border-dashed" asChild>
                                <Link href="/admin/categories">
                                    <Layers size={20} />
                                    <span className="text-xs">Danh mục</span>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-200">
                        <CardHeader>
                            <CardTitle>Hệ thống</CardTitle>
                            <CardDescription>Trạng thái máy chủ</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">API Gateway</span>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Hoạt động</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Cơ sở dữ liệu</span>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ổn định</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-500">Bộ nhớ đệm</span>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Tốt</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
