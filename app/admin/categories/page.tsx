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
    Folder
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
import { Category } from '@/types';
import { getImageUrl, cn } from '@/lib/utils';

type CRUDMode = 'create' | 'edit' | 'view';

export default function AdminCategoriesPage() {
    const {
        categories,
        categoriesLoading,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        uploadImage
    } = useAdminStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mode, setMode] = useState<CRUDMode>('view');
    const [selectedCategory, setSelectedCategory] = useState<Partial<Category> | null>(null);
    const [formData, setFormData] = useState<Partial<Category>>({
        name: '',
        description: '',
        slug: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenDialog = (mode: CRUDMode, category?: Category) => {
        setMode(mode);
        if (mode === 'create') {
            setFormData({
                name: '',
                description: '',
                slug: ''
            });
        } else {
            setFormData(category || {});
            setSelectedCategory(category || null);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            if (mode === 'create') {
                await createCategory(formData);
            } else if (mode === 'edit' && selectedCategory?._id) {
                await updateCategory(selectedCategory._id, formData);
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
            const url = await uploadImage(file, 'categories');
            setFormData({ ...formData, image: url });
            toast.success("Tải ảnh danh mục thành công");
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter">Danh mục</h1>
                    <p className="text-zinc-500 font-medium">Quản lý các nhóm sản phẩm và phân loại hệ thống</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog('create')}
                    className="bg-black text-white hover:bg-zinc-800 gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-black/10 transition-all active:scale-95"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    <span className="font-bold">Thêm danh mục</span>
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-black transition-colors" size={20} />
                    <Input
                        placeholder="Tìm kiếm danh mục..."
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
                            <TableHead className="w-[100px] pl-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-center">Icon</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Tên danh mục</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Slug</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Mô tả</TableHead>
                            <TableHead className="pr-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoriesLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-zinc-400 italic font-medium">Đang tải...</TableCell>
                            </TableRow>
                        ) : filteredCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-zinc-400 italic font-medium">Không tìm thấy danh mục</TableCell>
                            </TableRow>
                        ) : (
                            filteredCategories.map((category) => (
                                <TableRow key={category._id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors duration-200">
                                    <TableCell className="pl-8 flex justify-center py-4">
                                        <div className="w-12 h-12 bg-zinc-100 rounded-2xl overflow-hidden flex items-center justify-center text-zinc-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                            {category.image ? (
                                                <img src={getImageUrl(category.image)} className="w-full h-full object-cover" alt={category.name} />
                                            ) : (
                                                <Folder size={20} strokeWidth={2} />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold text-zinc-900">{category.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-mono border-zinc-200 bg-white">
                                            /{category.slug}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate text-zinc-500 font-medium">{category.description || '—'}</TableCell>
                                    <TableCell className="pr-8 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-zinc-100 transition-colors">
                                                    <MoreHorizontal size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('view', category)} className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Eye className="mr-3 h-4 w-4 text-zinc-400" /> Chi tiết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', category)} className="rounded-xl p-3 focus:bg-zinc-50 font-medium cursor-pointer">
                                                    <Edit className="mr-3 h-4 w-4 text-zinc-400" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1 bg-zinc-50" />
                                                <DropdownMenuItem
                                                    className="rounded-xl p-3 focus:bg-red-50 text-red-600 font-bold cursor-pointer"
                                                    onClick={() => deleteCategory(category._id)}
                                                >
                                                    <Trash2 className="mr-3 h-4 w-4" /> Xóa danh mục
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
                            {mode === 'create' ? 'Thêm danh mục mới' : mode === 'edit' ? 'Chỉnh sửa danh mục' : 'Chi tiết danh mục'}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 font-medium text-base">
                            Quản lý thông tin phân loại sản phẩm và hệ thống.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-zinc-50">
                        {/* Image Section */}
                        <div className="md:col-span-2 p-8 bg-zinc-50/50 flex flex-col items-center justify-center border-r border-zinc-50">
                            <Label className="w-full text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 text-center">Ảnh đại diện</Label>
                            <div
                                className={cn(
                                    "aspect-square w-full max-w-[240px] border-none rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden bg-white shadow-2xl shadow-zinc-200 cursor-pointer group transition-all duration-500 hover:scale-[1.02]",
                                    isUploading && "animate-pulse"
                                )}
                                onClick={() => mode !== 'view' && fileInputRef.current?.click()}
                            >
                                {formData.image ? (
                                    <>
                                        <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                                        {mode !== 'view' && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                    <Plus size={24} className="text-white" />
                                                </div>
                                                <span className="text-white text-xs font-bold uppercase tracking-wider">Đổi ảnh</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                                            <Folder size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-zinc-900">{isUploading ? 'Đang chuẩn bị...' : 'Tải ảnh lên'}</p>
                                            <p className="text-[10px] text-zinc-400 font-medium">PNG, JPG tối đa 5MB</p>
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
                        <div className="md:col-span-3 p-8 space-y-8 bg-white">
                            <div className="space-y-6">
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Tên danh mục</Label>
                                    <Input
                                        disabled={mode === 'view'}
                                        className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-bold text-lg px-4"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ví dụ: Áo Hoodie"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Slug (Đường dẫn)</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-sm">/</span>
                                        <Input
                                            disabled={mode === 'view'}
                                            className="h-12 rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-mono text-sm pl-8"
                                            value={formData.slug || ''}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="duong-dan-danh-muc"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Mô tả</Label>
                                    <Textarea
                                        disabled={mode === 'view'}
                                        className="min-h-[150px] rounded-2xl border-zinc-100 bg-zinc-50/30 focus-visible:ring-black font-medium p-4 resize-none leading-relaxed"
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Mô tả chi tiết về danh mục này để tối ưu SEO..."
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
                                className="bg-black text-white hover:bg-zinc-800 rounded-xl px-8 font-black shadow-lg shadow-black/10 transition-all active:scale-95 translate-y-0"
                            >
                                {mode === 'create' ? 'Tạo danh mục ngay' : 'Cập nhật thay đổi'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
}
