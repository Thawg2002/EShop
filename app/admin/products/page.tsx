'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAdminStore } from '@/lib/stores/use-admin-store';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Copy,
    ArrowUpDown,
    Check,
    X,
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
    DropdownMenuLabel,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { formatCurrency, getImageUrl, cn } from '@/lib/utils';
import { Product } from '@/types';

// Tự dưng thông minh: Một Dialog xử lý cả Create, Edit và View
type CRUDMode = 'create' | 'edit' | 'view';

export default function AdminProductsPage() {
    const {
        products,
        productsLoading,
        categories,
        fetchProducts,
        fetchCategories,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage
    } = useAdminStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // CRUD State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mode, setMode] = useState<CRUDMode>('view');
    const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        comparePrice: 0,
        stock: 0,
        status: 'draft',
        isFeatured: false,
        category: '',
        sku: '',
        description: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleOpenDialog = (mode: CRUDMode, product?: Product) => {
        setMode(mode);
        if (mode === 'create') {
            setFormData({
                name: '',
                price: 0,
                comparePrice: 0,
                stock: 0,
                status: 'draft',
                isFeatured: false,
                category: '',
                sku: '',
                description: ''
            });
        } else {
            setFormData(product || {});
            setSelectedProduct(product || null);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            if (mode === 'create') {
                await createProduct(formData);
            } else if (mode === 'edit' && selectedProduct?._id) {
                await updateProduct(selectedProduct._id, formData);
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
            const url = await uploadImage(file, 'products');
            const currentImages = formData.images || [];
            setFormData({
                ...formData,
                images: [...currentImages, url],
                thumbnail: formData.thumbnail || url // Auto-set thumbnail if empty
            });
            toast.success("Tải ảnh lên thành công");
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...(formData.images || [])];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };

    const setAsThumbnail = (url: string) => {
        setFormData({ ...formData, thumbnail: url });
        toast.success("Đã đặt làm ảnh đại diện");
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' ||
            (typeof p.category === 'string' ? p.category : (p.category as any)?._id) === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cửa hàng</h1>
                    <p className="text-zinc-500">Quản lý kho hàng và sản phẩm của bạn</p>
                </div>
                <Button onClick={() => handleOpenDialog('create')} className="bg-black text-white hover:bg-zinc-800 gap-2">
                    <Plus size={18} />
                    Thêm sản phẩm
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                        placeholder="Tìm theo tên hoặc SKU..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Tất cả danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        {categories.map(cat => (
                            <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="bg-white border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50">
                        <TableRow>
                            <TableHead className="w-[80px]">Ảnh</TableHead>
                            <TableHead>Tên sản phẩm</TableHead>
                            <TableHead>Giá</TableHead>
                            <TableHead>Tồn kho</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">Đang tải...</TableCell>
                            </TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">Không tìm thấy sản phẩm</TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product._id} className="hover:bg-zinc-50">
                                    <TableCell>
                                        <div className="w-12 h-16 bg-zinc-100 rounded overflow-hidden">
                                            <img
                                                src={getImageUrl(product.thumbnail || product.images?.[0])}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-xs text-zinc-500">{product.sku || 'Không có SKU'}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold">{formatCurrency(product.price)}</div>
                                        {product.comparePrice && product.comparePrice > product.price && (
                                            <div className="text-xs text-zinc-400 line-through">{formatCurrency(product.comparePrice)}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'} className="font-medium">
                                            {product.stock} trong kho
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "capitalize",
                                                product.status === 'active' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                                                    product.status === 'draft' ? "bg-zinc-100 text-zinc-700 hover:bg-zinc-100" :
                                                        "bg-red-100 text-red-700 hover:bg-red-100"
                                            )}
                                        >
                                            {product.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('view', product)}>
                                                    <Eye className="mr-2 h-4 w-4" /> Chi tiết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', product)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => deleteProduct(product._id)}
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
                <DialogContent className="max-w-3xl max-h-[90dvh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === 'create' ? 'Thêm sản phẩm mới' : mode === 'edit' ? 'Chỉnh sửa sản phẩm' : 'Chi tiết sản phẩm'}
                        </DialogTitle>
                        <DialogDescription>
                            {mode === 'view' ? 'Xem thông tin chi tiết của sản phẩm.' : 'Điền thông tin sản phẩm bên dưới.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        {/* Name & SKU */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Tên sản phẩm</Label>
                                <Input
                                    disabled={mode === 'view'}
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ví dụ: Áo thun XX.II Lux"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>SKU</Label>
                                <Input
                                    disabled={mode === 'view'}
                                    value={formData.sku || ''}
                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                    placeholder="Mã sản phẩm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Giá bán (VNĐ)</Label>
                                    <Input
                                        disabled={mode === 'view'}
                                        type="number"
                                        value={formData.price || 0}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Giá cũ (VNĐ)</Label>
                                    <Input
                                        disabled={mode === 'view'}
                                        type="number"
                                        value={formData.comparePrice || 0}
                                        onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category & Stock */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Danh mục</Label>
                                <Select
                                    disabled={mode === 'view'}
                                    value={typeof formData.category === 'string' ? formData.category : (formData.category as any)?._id}
                                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn danh mục" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Số lượng tồn kho</Label>
                                <Input
                                    disabled={mode === 'view'}
                                    type="number"
                                    value={formData.stock || 0}
                                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Nổi bật</Label>
                                    <p className="text-xs text-zinc-500">Hiển thị sản phẩm ở trang chủ</p>
                                </div>
                                <Switch
                                    disabled={mode === 'view'}
                                    checked={formData.isFeatured}
                                    onCheckedChange={(val) => setFormData({ ...formData, isFeatured: val })}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <Label>Mô tả sản phẩm</Label>
                            <Textarea
                                disabled={mode === 'view'}
                                className="min-h-[120px]"
                                placeholder="Viết vài dòng giới thiệu về sản phẩm..."
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* Images */}
                        <div className="md:col-span-2 space-y-4">
                            <Label>Hình ảnh sản phẩm</Label>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {formData.images?.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg border overflow-hidden group">
                                        <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={`Product ${idx}`} />
                                        {mode !== 'view' && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => removeImage(idx)}>
                                                    <Trash2 size={14} />
                                                </Button>
                                                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setAsThumbnail(img)}>
                                                    <Check size={14} />
                                                </Button>
                                            </div>
                                        )}
                                        {formData.thumbnail === img && (
                                            <Badge className="absolute top-1 left-1 bg-black text-white text-[10px]">Chính</Badge>
                                        )}
                                    </div>
                                ))}

                                {mode !== 'view' && (
                                    <div
                                        className={cn(
                                            "aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-zinc-400 hover:border-black hover:text-black transition-all cursor-pointer",
                                            isUploading && "animate-pulse pointer-events-none"
                                        )}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Plus size={24} />
                                        <span className="text-[10px] mt-2">{isUploading ? 'Đang tải...' : 'Thêm ảnh'}</span>
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
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Đóng</Button>
                        {mode !== 'view' && (
                            <Button onClick={handleSave} className="bg-black text-white hover:bg-zinc-800">
                                {mode === 'create' ? 'Tạo sản phẩm' : 'Lưu thay đổi'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
