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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Danh mục</h1>
                    <p className="text-zinc-500">Quản lý các nhóm sản phẩm</p>
                </div>
                <Button onClick={() => handleOpenDialog('create')} className="bg-black text-white hover:bg-zinc-800 gap-2">
                    <Plus size={18} />
                    Thêm danh mục
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                        placeholder="Tìm theo tên danh mục..."
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
                            <TableHead className="w-[60px]">Icon</TableHead>
                            <TableHead>Tên danh mục</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoriesLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">Đang tải...</TableCell>
                            </TableRow>
                        ) : filteredCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">Không tìm thấy danh mục</TableCell>
                            </TableRow>
                        ) : (
                            filteredCategories.map((category) => (
                                <TableRow key={category._id} className="hover:bg-zinc-50">
                                    <TableCell>
                                        <div className="w-10 h-10 bg-zinc-100 rounded-lg overflow-hidden flex items-center justify-center text-zinc-400">
                                            {category.image ? (
                                                <img src={getImageUrl(category.image)} className="w-full h-full object-cover" alt={category.name} />
                                            ) : (
                                                <Folder size={20} />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell className="text-zinc-500 font-mono text-xs">{category.slug}</TableCell>
                                    <TableCell className="max-w-xs truncate">{category.description || 'Không có mô tả'}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('view', category)}>
                                                    <Eye className="mr-2 h-4 w-4" /> Chi tiết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', category)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => deleteCategory(category._id)}
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
                            {mode === 'create' ? 'Thêm danh mục mới' : mode === 'edit' ? 'Chỉnh sửa danh mục' : 'Chi tiết danh mục'}
                        </DialogTitle>
                        <DialogDescription>
                            Quản lý thông tin phân loại sản phẩm.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Tên danh mục</Label>
                                <Input
                                    disabled={mode === 'view'}
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ví dụ: Áo Hoodie"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (Đường dẫn)</Label>
                                <Input
                                    disabled={mode === 'view'}
                                    value={formData.slug || ''}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="ví-du-ao-hoodie"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Mô tả</Label>
                                <Textarea
                                    disabled={mode === 'view'}
                                    className="min-h-[100px]"
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Mô tả ngắn gọn về danh mục này..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Ảnh đại diện</Label>
                            <div
                                className={cn(
                                    "aspect-square w-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-zinc-50 cursor-pointer group",
                                    isUploading && "animate-pulse"
                                )}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.image ? (
                                    <>
                                        <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                                        {mode !== 'view' && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Plus size={24} className="text-white" />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Folder className="text-zinc-300 mb-2" size={32} />
                                        <span className="text-[10px] text-zinc-400">{isUploading ? 'Đang tải...' : 'Tải lên'}</span>
                                    </>
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
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Đóng</Button>
                        {mode !== 'view' && (
                            <Button onClick={handleSave} className="bg-black text-white hover:bg-zinc-800">
                                {mode === 'create' ? 'Tạo danh mục' : 'Lưu thay đổi'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
}
