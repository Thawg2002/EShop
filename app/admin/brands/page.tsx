'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useAdminStore } from '@/lib/stores/use-admin-store';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Globe,
    Link as LinkIcon,
    Image as ImageIcon
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
import { Textarea } from '@/components/ui/textarea';
import { Brand } from '@/types';
import { getImageUrl, cn } from '@/lib/utils';

type CRUDMode = 'create' | 'edit' | 'view';

export default function AdminBrandsPage() {
    const {
        brands,
        brandsLoading,
        fetchBrands,
        createBrand,
        updateBrand,
        deleteBrand,
        uploadImage
    } = useAdminStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mode, setMode] = useState<CRUDMode>('view');
    const [selectedBrand, setSelectedBrand] = useState<Partial<Brand> | null>(null);
    const [formData, setFormData] = useState<Partial<Brand>>({
        name: '',
        description: '',
        website: '',
        logo: ''
    });

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleOpenDialog = (mode: CRUDMode, brand?: Brand) => {
        setMode(mode);
        if (mode === 'create') {
            setFormData({
                name: '',
                description: '',
                website: '',
                logo: ''
            });
        } else {
            setFormData(brand || {});
            setSelectedBrand(brand || null);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            if (mode === 'create') {
                await createBrand(formData);
            } else if (mode === 'edit' && selectedBrand?._id) {
                await updateBrand(selectedBrand._id, formData);
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
            const url = await uploadImage(file, 'brands');
            setFormData({ ...formData, logo: url });
            toast.success("Tải logo thành công");
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    // Filters...

    const handleSearch = () => {
        fetchBrands({ search: searchTerm || undefined });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter">Thương hiệu</h1>
                    <p className="text-zinc-500 font-medium">Quản lý các thương hiệu đối tác và nhãn hàng phân phối</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog('create')}
                    className="bg-black text-white hover:bg-zinc-800 gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-black/10 transition-all active:scale-95"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    <span className="font-bold">Thêm đối tác</span>
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
                        placeholder="Tìm kiếm thương hiệu..."
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
                            <TableHead className="w-[120px] pl-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-center">Logo</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Tên thương hiệu</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Website</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Mô tả</TableHead>
                            <TableHead className="pr-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brandsLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-zinc-400 italic font-medium">Đang tải...</TableCell>
                            </TableRow>
                        ) : brands.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-zinc-400 italic font-medium">Không tìm thấy thương hiệu</TableCell>
                            </TableRow>
                        ) : (
                            brands.map((brand) => (
                                <TableRow key={brand._id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors duration-200">
                                    <TableCell className="pl-8 py-4 flex justify-center">
                                        <div className="w-16 h-12 bg-white border border-zinc-50 rounded-xl flex items-center justify-center overflow-hidden p-1 shadow-sm group-hover:scale-105 transition-transform">
                                            {brand.logo ? (
                                                <img
                                                    src={getImageUrl(brand.logo)}
                                                    alt={brand.name}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            ) : (
                                                <Globe className="text-zinc-200" size={24} />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold text-zinc-900">{brand.name}</TableCell>
                                    <TableCell>
                                        {brand.website ? (
                                            <a
                                                href={brand.website}
                                                target="_blank"
                                                className="text-black hover:underline flex items-center gap-1.5 font-bold text-xs"
                                            >
                                                <LinkIcon size={12} className="text-zinc-400" />
                                                <span className="opacity-70">{new URL(brand.website).hostname.replace('www.', '')}</span>
                                            </a>
                                        ) : (
                                            <span className="text-zinc-300 text-[10px] font-black uppercase tracking-tighter">MISSING</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate text-zinc-500 font-medium">{brand.description || '—'}</TableCell>
                                    <TableCell className="pr-8 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-zinc-100 transition-colors">
                                                    <MoreHorizontal size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('view', brand)} className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Eye className="mr-3 h-4 w-4 text-zinc-400" /> Chi tiết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', brand)} className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Edit className="mr-3 h-4 w-4 text-zinc-400" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1 bg-zinc-50" />
                                                <DropdownMenuItem
                                                    className="rounded-xl p-3 focus:bg-red-50 text-red-600 font-bold cursor-pointer"
                                                    onClick={() => deleteBrand(brand._id)}
                                                >
                                                    <Trash2 className="mr-3 h-4 w-4" /> Xóa thương hiệu
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
                            {mode === 'create' ? 'Thêm thương hiệu mới' : mode === 'edit' ? 'Chỉnh sửa thương hiệu' : 'Chi tiết thương hiệu'}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 font-medium text-base">
                            Quản lý thông tin đối tác và nhãn hàng phân phối chính thức.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-zinc-50">
                        {/* Image Section */}
                        <div className="md:col-span-2 p-8 bg-zinc-50/50 flex flex-col items-center justify-center border-r border-zinc-50">
                            <Label className="w-full text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 text-center">Logo thương hiệu</Label>
                            <div
                                className={cn(
                                    "aspect-square w-full max-w-[200px] border-none rounded-3xl flex flex-col items-center justify-center relative overflow-hidden bg-white shadow-2xl shadow-zinc-200 cursor-pointer group transition-all duration-500 hover:scale-[1.02]",
                                    isUploading && "animate-pulse"
                                )}
                                onClick={() => mode !== 'view' && fileInputRef.current?.click()}
                            >
                                {formData.logo ? (
                                    <>
                                        <img src={getImageUrl(formData.logo)} alt="Preview" className="w-[80%] h-[80%] object-contain" />
                                        {mode !== 'view' && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                    <Plus size={24} className="text-white" />
                                                </div>
                                                <span className="text-white text-xs font-bold uppercase tracking-wider">Đổi Logo</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-zinc-900">{isUploading ? 'Đầy một chút...' : 'Tải lên'}</p>
                                            <p className="text-[10px] text-zinc-400 font-medium">PNG trong suốt khuyên dùng</p>
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
                        <div className="md:col-span-3 p-8 space-y-6 bg-white">
                            <div className="space-y-4">
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Tên thương hiệu</Label>
                                    <Input
                                        disabled={mode === 'view'}
                                        className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-bold text-lg px-4"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ví dụ: Nike, Jordan, ..."
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Website chính thức</Label>
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 size-4 group-focus-within:text-black transition-colors" />
                                        <Input
                                            disabled={mode === 'view'}
                                            className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-medium pl-11"
                                            value={formData.website || ''}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Mô tả nhãn hàng</Label>
                                    <Textarea
                                        disabled={mode === 'view'}
                                        className="min-h-[140px] rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-medium p-4 resize-none leading-relaxed"
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Giới thiệu về lịch sử hoặc đặc điểm nổi bật của thương hiệu..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-8 py-6 bg-zinc-50/80 border-t border-zinc-50 gap-3">
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-6 font-bold hover:bg-white border-zinc-100 shadow-sm transition-all active:scale-95">Đóng</Button>
                        {mode !== 'view' && (
                            <Button
                                onClick={handleSave}
                                className="bg-black text-white hover:bg-zinc-800 rounded-xl px-8 font-black shadow-lg shadow-black/10 transition-all active:scale-95"
                            >
                                {mode === 'create' ? 'Tạo thương hiệu ngay' : 'Lưu thay đổi'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
