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
    DropdownMenuTrigger,
    DropdownMenuSeparator
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
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter">Khách hàng</h1>
                    <p className="text-zinc-500 font-medium">Quản lý cơ sở dữ liệu người dùng và hạng thành viên</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-2xl border-zinc-200 font-bold h-12 px-6 hover:bg-zinc-50 transition-all">Xuất báo cáo</Button>
                    <Button className="bg-black text-white hover:bg-zinc-800 h-12 px-8 rounded-2xl font-black shadow-lg shadow-black/10 transition-all active:scale-95">Thêm người dùng</Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-black transition-colors" size={20} />
                    <Input
                        placeholder="Tìm theo tên, email hoặc số điện thoại..."
                        className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl focus-visible:ring-black transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border-none shadow-sm rounded-[2rem] overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50/50">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-[300px] pl-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Thành viên</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Liên hệ</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Quyền hạn</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Xếp hạng</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-center">Trạng thái</TableHead>
                            <TableHead className="pr-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-24 text-zinc-400 italic font-medium">Đang tải dữ liệu...</TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-24 text-zinc-400 italic font-medium">Không tìm thấy kết quả phù hợp</TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user._id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors duration-200 group">
                                    <TableCell className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative group/avatar">
                                                <Avatar className="w-12 h-12 rounded-2xl shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform duration-500">
                                                    <AvatarImage src={getImageUrl(user.avatar)} alt={user.name} />
                                                    <AvatarFallback className="bg-zinc-100 text-zinc-400 font-black text-xs">
                                                        {user.name?.slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {user.isActive && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />}
                                            </div>
                                            <div>
                                                <div className="font-black text-zinc-900 leading-tight group-hover:text-black transition-colors">{user.name || 'Người dùng mới'}</div>
                                                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter mt-1">ID: #{user._id.slice(-6).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                                                <Mail size={12} className="text-zinc-400" /> {user.email}
                                            </div>
                                            {user.phone && (
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                                                    <Phone size={12} /> {user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize gap-1.5 px-3 py-1 rounded-xl bg-white border-zinc-200 font-bold text-[10px] tracking-wider shadow-sm">
                                            <Shield size={10} strokeWidth={3} />
                                            {typeof user.role === 'string' ? user.role : (user.role as any)?.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "capitalize px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm",
                                                user.membershipTier === 'platinum' ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                                    user.membershipTier === 'gold' ? "bg-yellow-50 text-yellow-600 border border-yellow-100" :
                                                        user.membershipTier === 'silver' ? "bg-zinc-100 text-zinc-500 border border-zinc-200" :
                                                            "bg-orange-50 text-orange-600 border border-orange-100"
                                            )}
                                        >
                                            {user.membershipTier || 'Member'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            className={cn(
                                                "px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm",
                                                user.isActive ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
                                            )}
                                        >
                                            {user.isActive ? 'ACTIVE' : 'LOCKED'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="pr-8 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-zinc-100 transition-colors">
                                                    <MoreHorizontal size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                                                <DropdownMenuItem className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Eye className="mr-3 h-4 w-4 text-zinc-400" /> Xem hồ sơ
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Edit className="mr-3 h-4 w-4 text-zinc-400" /> Phân quyền
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1 bg-zinc-50" />
                                                <DropdownMenuItem className="rounded-xl p-3 focus:bg-red-50 text-red-600 font-bold cursor-pointer">
                                                    <XCircle className="mr-3 h-4 w-4" /> Khóa tài khoản
                                                </DropdownMenuItem>
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
