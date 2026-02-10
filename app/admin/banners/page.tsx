'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAdminStore } from '@/lib/stores/use-admin-store';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Image as ImageIcon,
    ExternalLink,
    Link as LinkIcon
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
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
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Banner } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

type CRUDMode = 'create' | 'edit' | 'view';

export default function AdminBannersPage() {
    const {
        banners,
        bannersLoading,
        fetchBanners,
        createBanner,
        updateBanner,
        deleteBanner,
        uploadImage
    } = useAdminStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mode, setMode] = useState<CRUDMode>('view');
    const [selectedBanner, setSelectedBanner] = useState<Partial<Banner> | null>(null);
    const [formData, setFormData] = useState<Partial<Banner>>({
        title: '',
        subtitle: '',
        link: '',
        image: '',
        isActive: true,
        type: 'main'
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleSearch = () => {
        fetchBanners({ search: searchTerm || undefined });
    };

    const handleOpenDialog = (mode: CRUDMode, banner?: Banner) => {
        setMode(mode);
        if (mode === 'create') {
            setFormData({
                title: '',
                subtitle: '',
                link: '',
                image: '',
                isActive: true,
                type: 'main'
            });
        } else {
            setFormData(banner || {});
            setSelectedBanner(banner || null);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            if (mode === 'create') {
                await createBanner(formData);
            } else if (mode === 'edit' && selectedBanner?._id) {
                await updateBanner(selectedBanner._id, formData);
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadImage(file, 'banners');
            setFormData({ ...formData, image: url });
            toast.success("Tải banner thành công");
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter">Banners</h1>
                    <p className="text-zinc-500 font-medium">Quản lý các slide quảng cáo và banner sự kiện trang chủ</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog('create')}
                    className="bg-black text-white hover:bg-zinc-800 gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-black/10 transition-all active:scale-95"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    <span className="font-bold">Thêm banner mới</span>
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-black transition-colors cursor-pointer hover:scale-110 active:scale-95"
                        size={20}
                        onClick={handleSearch}
                    />
                    <Input
                        placeholder="Tìm kiếm banner..."
                        className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl focus-visible:ring-black transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border-none shadow-sm rounded-[2rem] overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50/50">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-[300px] pl-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Hình ảnh</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Thông tin banner</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Loại</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-center">Trạng thái</TableHead>
                            <TableHead className="pr-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bannersLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-zinc-400 italic font-medium">Đang tải...</TableCell>
                            </TableRow>
                        ) : banners.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-zinc-400 italic font-medium">Không tìm thấy banner</TableCell>
                            </TableRow>
                        ) : (
                            banners.map((banner) => (
                                <TableRow key={banner._id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors duration-200 group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="w-full aspect-[21/9] bg-zinc-100 rounded-2xl overflow-hidden shadow-sm border border-zinc-50 group-hover:shadow-md group-hover:scale-[1.02] transition-all">
                                            <img
                                                src={getImageUrl(banner.image)}
                                                alt={banner.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-black text-lg text-zinc-900 leading-tight">{banner.title}</div>
                                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-tight">{banner.subtitle}</div>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-black opacity-50 truncate max-w-[200px]">
                                                <ExternalLink size={12} /> {banner.link || '—'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize px-3 py-1 rounded-xl bg-white border-zinc-200 font-bold text-[10px] tracking-wider">
                                            {banner.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            className={cn(
                                                "px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm",
                                                banner.isActive ? "bg-green-50 text-green-600 border border-green-100" : "bg-zinc-100 text-zinc-400 border border-zinc-200"
                                            )}
                                        >
                                            {banner.isActive ? 'ACTIVE' : 'OFF'}
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
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', banner)} className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Edit className="mr-3 h-4 w-4 text-zinc-400" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1 bg-zinc-50" />
                                                <DropdownMenuItem
                                                    className="rounded-xl p-3 focus:bg-red-50 text-red-600 font-bold cursor-pointer"
                                                    onClick={() => deleteBanner(banner._id)}
                                                >
                                                    <Trash2 className="mr-3 h-4 w-4" /> Xóa banner
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

            {/* Smart CRUD Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-[2.5rem]">
                    <DialogHeader className="px-8 pt-8 pb-4">
                        <DialogTitle className="text-2xl font-black tracking-tighter">
                            {mode === 'create' ? 'Tạo banner quảng bá' : 'Cập nhật banner'}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 font-medium text-base">
                            Tùy chỉnh hình ảnh và nội dung xuất hiện trên slide trang chủ.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 gap-0 border-t border-zinc-50">
                        {/* Image Preview (Wide 21:9) */}
                        <div className="p-8 bg-zinc-50/50 flex flex-col items-center justify-center border-b border-zinc-50">
                            <Label className="w-full text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 text-center">Bản xem trước hình ảnh (21:9)</Label>
                            <div
                                className={cn(
                                    "aspect-[21/9] w-full border-none rounded-3xl flex flex-col items-center justify-center relative overflow-hidden bg-white shadow-2xl shadow-zinc-200 cursor-pointer group transition-all duration-500 hover:shadow-black/5",
                                    isUploading && "animate-pulse"
                                )}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.image ? (
                                    <>
                                        <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                <Plus size={24} className="text-white" />
                                            </div>
                                            <span className="text-white text-xs font-bold uppercase tracking-wider">Đổi hình nền</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-zinc-900">{isUploading ? 'Đang tải...' : 'Tải ảnh banner'}</p>
                                            <p className="text-[10px] text-zinc-400 font-medium tracking-wide">Kích thước tối ưu: 1920x820px</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleUpload}
                            />
                        </div>

                        {/* Form Section */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                            <div className="space-y-6">
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Tiêu đề chính (Title)</Label>
                                    <Input
                                        className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-black text-xl px-4"
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ví dụ: NEW COLLECTION 2024"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Tiêu đề phụ (Subtitle)</Label>
                                    <Input
                                        className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-bold text-zinc-600 px-4"
                                        value={formData.subtitle || ''}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        placeholder="Ví dụ: Sale up to 50%"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Đường dẫn (Link)</Label>
                                    <div className="relative group">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 size-4 group-focus-within:text-black transition-colors" />
                                        <Input
                                            className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-medium pl-11"
                                            value={formData.link || ''}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            placeholder="/products/category-id"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2.5">
                                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Loại Banner</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(val) => setFormData({ ...formData, type: val as any })}
                                        >
                                            <SelectTrigger className="h-12 rounded-2xl border-none shadow-sm bg-zinc-50/50 font-bold px-4">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl border-none shadow-2xl p-1 bg-white/95 backdrop-blur-xl">
                                                <SelectItem value="main" className="rounded-xl p-3 font-medium">Main Slider</SelectItem>
                                                <SelectItem value="promo" className="rounded-xl p-3 font-medium">Promotional</SelectItem>
                                                <SelectItem value="event" className="rounded-xl p-3 font-medium">Special Event</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2.5 flex flex-col">
                                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1 mb-3">Hiển thị</Label>
                                        <div className="flex items-center gap-3 h-10 px-1">
                                            <Switch
                                                checked={formData.isActive}
                                                onCheckedChange={(val) => setFormData({ ...formData, isActive: val })}
                                            />
                                            <span className="text-sm font-black uppercase tracking-tighter text-zinc-400">
                                                {formData.isActive ? 'Bật' : 'Tắt'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-8 py-6 bg-zinc-50 border-t border-zinc-50 gap-3">
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-6 font-bold hover:bg-white border-zinc-100 shadow-sm transition-all active:scale-95">Hủy bỏ</Button>
                        <Button
                            onClick={handleSave}
                            className="bg-black text-white hover:bg-zinc-800 rounded-xl px-10 font-black shadow-lg shadow-black/10 transition-all active:scale-95"
                        >
                            {mode === 'create' ? 'Tạo banner ngay' : 'Cập nhật ngay'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
