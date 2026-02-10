'use client';

import React, { useEffect, useState } from 'react';
import { useAdminStore } from '@/lib/stores/use-admin-store';
import {
    Search,
    MoreHorizontal,
    User as UserIcon,
    Mail,
    Phone,
    Shield,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function AdminUsersPage() {
    const {
        users,
        usersLoading,
        fetchUsers
    } = useAdminStore();

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Khách hàng</h1>
                    <p className="text-zinc-500">Quản lý người dùng và quyền truy cập hệ thống</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                        placeholder="Tìm theo tên hoặc email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50">
                        <TableRow>
                            <TableHead className="w-[80px]">Thành viên</TableHead>
                            <TableHead>Email & SĐT</TableHead>
                            <TableHead>Vai trò</TableHead>
                            <TableHead>Hạng</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">Đang tải...</TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">Không tìm thấy người dùng</TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user._id} className="hover:bg-zinc-50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={getImageUrl(user.avatar)} alt={user.name} />
                                                <AvatarFallback className="bg-zinc-100 text-zinc-500 font-bold">
                                                    {user.name?.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium whitespace-nowrap">{user.name || 'N/A'}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                                                <Mail size={12} /> {user.email}
                                            </div>
                                            {user.phone && (
                                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                    <Phone size={12} /> {user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize gap-1.5">
                                            <Shield size={12} />
                                            {typeof user.role === 'string' ? user.role : (user.role as any)?.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "capitalize",
                                                user.membershipTier === 'platinum' ? "bg-purple-100 text-purple-700" :
                                                    user.membershipTier === 'gold' ? "bg-yellow-100 text-yellow-700" :
                                                        user.membershipTier === 'silver' ? "bg-zinc-200 text-zinc-700" :
                                                            "bg-orange-100 text-orange-700"
                                            )}
                                        >
                                            {user.membershipTier}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.isActive ? (
                                            <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 gap-1">
                                                <CheckCircle2 size={12} /> Hoạt động
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100 gap-1">
                                                <XCircle size={12} /> Đã khóa
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Khóa tài khoản</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
