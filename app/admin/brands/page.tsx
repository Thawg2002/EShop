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
import { getImageUrl } from '@/lib/utils';

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

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Thương hiệu</h1>
                    <p className="text-zinc-500">Quản lý các thương hiệu đối tác và nhãn hàng</p>
                </div>
                <Button onClick={() => handleOpenDialog('create')} className="bg-black text-white hover:bg-zinc-800 gap-2">
                    <Plus size={18} />
                    Thêm thương hiệu
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                        placeholder="Tìm theo tên thương hiệu..."
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
                            <TableHead className="w-[100px]">Logo</TableHead>
                            <TableHead>Tên thương hiệu</TableHead>
                            <TableHead>Website</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brandsLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">Đang tải...</TableCell>
                            </TableRow>
                        ) : filteredBrands.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">Không tìm thấy thương hiệu</TableCell>
                            </TableRow>
                        ) : (
                            filteredBrands.map((brand) => (
                                <TableRow key={brand._id} className="hover:bg-zinc-50">
                                    <TableCell>
                                        <div className="w-16 h-12 bg-white border rounded flex items-center justify-center overflow-hidden p-1">
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
                                    <TableCell className="font-medium">{brand.name}</TableCell>
                                    <TableCell>
                                        {brand.website ? (
                                            <a
                                                href={brand.website}
                                                target="_blank"
                                                className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                                            >
                                                <LinkIcon size={12} /> {new URL(brand.website).hostname}
                                            </a>
                                        ) : (
                                            <span className="text-zinc-400 text-xs italic font-serif">N/A</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{brand.description || 'Không có mô tả'}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('view', brand)}>
                                                    <Eye className="mr-2 h-4 w-4" /> Chi tiết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', brand)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => deleteBrand(brand._id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Xóa
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {mode === 'create' ? 'Thêm thương hiệu mới' : mode === 'edit' ? 'Chỉnh sửa thương hiệu' : 'Chi tiết thương hiệu'}
                        </DialogTitle>
                        <DialogDescription>
                            Thông tin thương hiệu và nhãn hàng phân phối.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Tên thương hiệu</Label>
                            <Input
                                disabled={mode === 'view'}
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ví dụ: Nike, Gucci, ..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                                disabled={mode === 'view'}
                                value={formData.website || ''}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Mô tả</Label>
                            <Textarea
                                disabled={mode === 'view'}
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Mô tả về thương hiệu..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Logo</Label>
                            <div className="flex gap-4 items-center">
                                <div className="w-20 h-20 border rounded-lg flex items-center justify-center overflow-hidden bg-zinc-50">
                                    {formData.logo ? (
                                        <img src={getImageUrl(formData.logo)} alt="Logo" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <ImageIcon className="text-zinc-300" />
                                    )}
                                </div>
                                {mode !== 'view' && (
                                    <Button variant="outline" size="sm">Tải ảnh lên</Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Đóng</Button>
                        {mode !== 'view' && (
                            <Button onClick={handleSave} className="bg-black text-white hover:bg-zinc-800">
                                {mode === 'create' ? 'Tạo thương hiệu' : 'Lưu thay đổi'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
