'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminStore } from '@/lib/stores/use-admin-store';
import { cn, formatCurrency, getImageUrl } from '@/lib/utils';
import { Product } from '@/types';
import {
    Check,
    Edit,
    Eye,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
    Image as ImageIcon,
    Info,
    Tag,
    Boxes,
    BarChart3
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

type CRUDMode = 'create' | 'edit' | 'view';

export default function AdminProductsPage() {
    const {
        products,
        productsLoading,
        categories,
        brands,
        fetchProducts,
        fetchCategories,
        fetchBrands,
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
        costPrice: 0,
        stock: 0,
        status: 'draft',
        isFeatured: false,
        isNewArrival: false,
        isBestSeller: false,
        category: '',
        brand: '',
        sku: '',
        description: '',
        shortDescription: '',
        specifications: {
            material: '',
            weight: '',
            origin: '',
            careInstructions: ''
        },
        images: [],
        thumbnail: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchBrands();
    }, []);

    const handleOpenDialog = (mode: CRUDMode, product?: Product) => {
        setMode(mode);
        if (mode === 'create') {
            setFormData({
                name: '',
                price: 0,
                comparePrice: 0,
                costPrice: 0,
                stock: 0,
                status: 'draft',
                isFeatured: false,
                isNewArrival: false,
                isBestSeller: false,
                category: '',
                brand: '',
                sku: '',
                description: '',
                shortDescription: '',
                specifications: {
                    material: '',
                    weight: '',
                    origin: '',
                    careInstructions: ''
                },
                images: [],
                thumbnail: ''
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
                thumbnail: formData.thumbnail || url
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
        const categoryId = typeof p.category === 'string' ? p.category : (p.category as any)?._id;
        const matchesCategory = categoryFilter === 'all' || categoryId === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cửa hàng</h1>
                    <p className="text-zinc-500">Quản lý kho hàng và sản phẩm của bạn</p>
                </div>
                <Button onClick={() => handleOpenDialog('create')} className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2 rounded-xl shadow-lg shadow-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <Plus size={18} />
                    Thêm sản phẩm
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" size={18} />
                    <Input
                        placeholder="Tìm theo tên hoặc SKU..."
                        className="pl-10 h-11 rounded-xl bg-white border-zinc-200 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[220px] h-11 rounded-xl bg-white border-zinc-200">
                        <SelectValue placeholder="Tất cả danh mục" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-zinc-200">
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        {categories.map(cat => (
                            <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-zinc-200/60 overflow-hidden shadow-sm bg-white">
                <Table>
                    <TableHeader className="bg-zinc-50/50">
                        <TableRow className="hover:bg-transparent border-b border-zinc-100">
                            <TableHead className="w-[80px] font-bold text-zinc-900">Ảnh</TableHead>
                            <TableHead className="font-bold text-zinc-900">Tên sản phẩm</TableHead>
                            <TableHead className="font-bold text-zinc-900">Giá & Lợi nhuận</TableHead>
                            <TableHead className="font-bold text-zinc-900">Phân loại</TableHead>
                            <TableHead className="font-bold text-zinc-900">Kho & Trạng thái</TableHead>
                            <TableHead className="text-right font-bold text-zinc-900">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="size-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
                                        <span className="text-sm font-medium text-zinc-500">Đang đồng bộ dữ liệu...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-2 opacity-40">
                                        <Boxes size={48} />
                                        <span className="text-sm font-medium">Không tìm thấy sản phẩm nào</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product._id} className="hover:bg-zinc-50/50 transition-colors border-b border-zinc-50 last:border-0 group">
                                    <TableCell>
                                        <div className="w-12 h-16 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-100 group-hover:border-zinc-200 transition-all">
                                            <img
                                                src={getImageUrl(product.thumbnail || product.images?.[0])}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-zinc-900">{product.name}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{product.sku || 'N/A'}</span>
                                            {product.isFeatured && <Badge className="h-4 text-[9px] bg-amber-50 text-amber-600 border-amber-200 uppercase font-bold px-1.5 shadow-none">HOT</Badge>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-zinc-900">{formatCurrency(product.price)}</div>
                                        {product.costPrice ? (
                                            <div className="text-[10px] text-zinc-400 font-medium">Vốn: {formatCurrency(product.costPrice)}</div>
                                        ) : (
                                            <div className="text-[10px] text-zinc-300 italic">Chưa nhập giá vốn</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-medium text-zinc-600">{typeof product.category === 'object' ? (product.category as any)?.name : 'Danh mục'}</div>
                                        <div className="text-[10px] text-zinc-400">{typeof product.brand === 'object' ? (product.brand as any)?.name : 'Thương hiệu'}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "size-1.5 rounded-full shadow-sm",
                                                    product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"
                                                )}></div>
                                                <span className="text-xs font-bold text-zinc-700">{product.stock} trong kho</span>
                                            </div>
                                            <Badge
                                                className={cn(
                                                    "w-fit text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 rounded-md shadow-none",
                                                    product.status === 'active' ? "bg-green-50 text-green-700 border-green-100" :
                                                        product.status === 'draft' ? "bg-zinc-100 text-zinc-700 border-zinc-200" :
                                                            "bg-red-50 text-red-700 border-red-100",
                                                    "border"
                                                )}
                                            >
                                                {product.status}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-zinc-200 transition-all">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44 p-1.5 rounded-xl border-zinc-200 shadow-xl">
                                                <DropdownMenuItem className="rounded-lg h-9 gap-2 cursor-pointer" onClick={() => handleOpenDialog('view', product)}>
                                                    <Eye className="size-4 text-zinc-400" /> <span className="font-medium">Xem chi tiết</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-lg h-9 gap-2 cursor-pointer text-zinc-900" onClick={() => handleOpenDialog('edit', product)}>
                                                    <Edit className="size-4 text-zinc-400" /> <span className="font-medium">Chỉnh sửa</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1.5 bg-zinc-100" />
                                                <DropdownMenuItem
                                                    className="rounded-lg h-9 gap-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                                                    onClick={() => {
                                                        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) deleteProduct(product._id);
                                                    }}
                                                >
                                                    <Trash2 className="size-4 opacity-70" /> <span className="font-medium">Gỡ bỏ sản phẩm</span>
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-6xl h-[95dvh] p-0 overflow-y-auto bg-white border-none shadow-2xl rounded-3xl">
                    <div className="flex flex-col h-full bg-white">
                        <DialogHeader className="p-6 pb-2 bg-zinc-50/50">
                            <div className="flex items-center gap-3">
                                <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
                                    <Package size={20} className="fill-white" />
                                </div>
                                <div className="space-y-0.5">
                                    <DialogTitle className="text-2xl font-black tracking-tight uppercase">
                                        {mode === 'create' ? 'Tạo Sản Phẩm Mới' : mode === 'edit' ? 'Hiệu Chỉnh Sản Phẩm' : 'Dữ Liệu Sản Phẩm'}
                                    </DialogTitle>
                                    <DialogDescription className="text-xs font-medium text-zinc-500">
                                        {mode === 'view' ? 'Xem các thuộc tính và thông số của sản phẩm.' : 'Cung cấp thông tin chi tiết để đồng bộ với cửa hàng.'}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <Tabs defaultValue="info" className="flex-1 flex flex-col overflow-hidden">
                            <div className="px-6 border-b border-zinc-100 bg-zinc-50/50">
                                <TabsList className="bg-transparent h-12 p-0 gap-8">
                                    <TabsTrigger value="info" className="data-[state=active]:bg-transparent data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 h-full gap-2 text-zinc-400 font-bold transition-all">
                                        <Info size={16} /> Thông tin chung
                                    </TabsTrigger>
                                    <TabsTrigger value="pricing" className="data-[state=active]:bg-transparent data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 h-full gap-2 text-zinc-400 font-bold transition-all">
                                        <Tag size={16} /> Giá & Kho
                                    </TabsTrigger>
                                    <TabsTrigger value="specs" className="data-[state=active]:bg-transparent data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 h-full gap-2 text-zinc-400 font-bold transition-all">
                                        <BarChart3 size={16} /> Thông số & SEO
                                    </TabsTrigger>
                                    <TabsTrigger value="images" className="data-[state=active]:bg-transparent data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 h-full gap-2 text-zinc-400 font-bold transition-all">
                                        <ImageIcon size={16} /> Hình ảnh
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 overflow-y-auto px-10 py-10 pb-20">
                                <TabsContent value="info" className="m-0 space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Tên sản phẩm</Label>
                                                <Input
                                                    disabled={mode === 'view'}
                                                    value={formData.name || ''}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Ví dụ: Áo thun XX.II Lux Edition"
                                                    className="h-12 text-base font-bold rounded-xl bg-zinc-50/50 border-zinc-200 focus:bg-white focus:ring-2 focus:ring-zinc-900 transition-all"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2.5">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Mã SKU</Label>
                                                    <Input
                                                        disabled={mode === 'view'}
                                                        value={formData.sku || ''}
                                                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                                        placeholder="XXII-PROD-01"
                                                        className="h-10 rounded-xl bg-zinc-50/50 border-zinc-200 focus:bg-white font-mono"
                                                    />
                                                </div>
                                                <div className="space-y-2.5">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Trạng thái</Label>
                                                    <Select
                                                        disabled={mode === 'view'}
                                                        value={formData.status}
                                                        onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                                                    >
                                                        <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 border-zinc-200">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl">
                                                            <SelectItem value="draft" className="font-bold">Bản nháp</SelectItem>
                                                            <SelectItem value="active" className="text-green-600 font-bold">Đang bán</SelectItem>
                                                            <SelectItem value="inactive" className="text-zinc-600 font-bold">Ngừng bán</SelectItem>
                                                            <SelectItem value="out_of_stock" className="text-amber-600 font-bold">Hết hàng</SelectItem>
                                                            <SelectItem value="archived" className="text-red-600 font-bold">Lưu trữ</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2.5">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Danh mục</Label>
                                                    <Select
                                                        disabled={mode === 'view'}
                                                        value={typeof formData.category === 'string' ? formData.category : (formData.category as any)?._id}
                                                        onValueChange={(val) => setFormData({ ...formData, category: val })}
                                                    >
                                                        <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 border-zinc-200 font-medium">
                                                            <SelectValue placeholder="Chọn danh mục" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl">
                                                            {categories.map(cat => (
                                                                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Thương hiệu</Label>
                                                    <Select
                                                        disabled={mode === 'view'}
                                                        value={typeof formData.brand === 'string' ? formData.brand : (formData.brand as any)?._id}
                                                        onValueChange={(val) => setFormData({ ...formData, brand: val })}
                                                    >
                                                        <SelectTrigger className="h-10 rounded-xl bg-zinc-50/50 border-zinc-200 font-medium">
                                                            <SelectValue placeholder="Chọn thương hiệu" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl">
                                                            {brands.map(brand => (
                                                                <SelectItem key={brand._id} value={brand._id}>{brand.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Mô tả ngắn</Label>
                                                <Textarea
                                                    disabled={mode === 'view'}
                                                    placeholder="Tóm tắt ngắn về sản phẩm để hiện thị nhanh..."
                                                    className="h-28 rounded-xl bg-zinc-50/50 border-zinc-200 focus:bg-white resize-none"
                                                    value={formData.shortDescription || ''}
                                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Tiêu điểm sản phẩm</Label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div onClick={() => !mode.includes('view') && setFormData({ ...formData, isFeatured: !formData.isFeatured })} className={cn("flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer", formData.isFeatured ? "bg-amber-50 border-amber-200" : "bg-white border-zinc-100 opacity-60")}>
                                                        <span className={cn("text-xs font-black uppercase tracking-tighter", formData.isFeatured ? "text-amber-700" : "text-zinc-400")}>Nổi bật (HOT)</span>
                                                        <div className={cn("size-2 rounded-full", formData.isFeatured ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-zinc-200")}></div>
                                                    </div>
                                                    <div onClick={() => !mode.includes('view') && setFormData({ ...formData, isNewArrival: !formData.isNewArrival })} className={cn("flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer", formData.isNewArrival ? "bg-blue-50 border-blue-200" : "bg-white border-zinc-100 opacity-60")}>
                                                        <span className={cn("text-xs font-black uppercase tracking-tighter", formData.isNewArrival ? "text-blue-700" : "text-zinc-400")}>Mới về (NEW)</span>
                                                        <div className={cn("size-2 rounded-full", formData.isNewArrival ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-zinc-200")}></div>
                                                    </div>
                                                    <div onClick={() => !mode.includes('view') && setFormData({ ...formData, isBestSeller: !formData.isBestSeller })} className={cn("flex items-center justify-between p-3 rounded-xl md:col-span-2 border transition-all cursor-pointer", formData.isBestSeller ? "bg-green-50 border-green-200" : "bg-white border-zinc-100 opacity-60")}>
                                                        <span className={cn("text-xs font-black uppercase tracking-tighter", formData.isBestSeller ? "text-green-700" : "text-zinc-400")}>Bán chạy (BEST SELLER)</span>
                                                        <div className={cn("size-2 rounded-full", formData.isBestSeller ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-zinc-200")}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Mô tả đầy đủ (HTML/Markdown)</Label>
                                            <Textarea
                                                disabled={mode === 'view'}
                                                className="min-h-[150px] rounded-2xl bg-zinc-50/50 border-zinc-200 focus:bg-white p-4"
                                                placeholder="Viết nội dung giới thiệu chi tiết về sản phẩm..."
                                                value={formData.description || ''}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="pricing" className="m-0 space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Giá bán lẻ (VNĐ)</Label>
                                            <div className="relative">
                                                <Input
                                                    disabled={mode === 'view'}
                                                    type="number"
                                                    value={formData.price || 0}
                                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                                    className="h-12 pl-12 rounded-xl bg-zinc-50 border-zinc-200 text-lg font-black text-black"
                                                />
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">₫</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Giá niêm yết/Cũ (VNĐ)</Label>
                                            <div className="relative">
                                                <Input
                                                    disabled={mode === 'view'}
                                                    type="number"
                                                    value={formData.comparePrice || 0}
                                                    onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                                                    className="h-12 pl-12 rounded-xl bg-white border-zinc-200 text-lg font-bold text-zinc-400 line-through"
                                                />
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400 italic">₫</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic text-zinc-500">Giá vốn/Nhập (VNĐ)</Label>
                                            <div className="relative">
                                                <Input
                                                    disabled={mode === 'view'}
                                                    type="number"
                                                    value={formData.costPrice || 0}
                                                    onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                                                    className="h-12 pl-12 rounded-xl bg-zinc-100/50 border-dashed border-zinc-300 text-lg font-bold text-zinc-500"
                                                />
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-300">₫</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-400 font-medium">Giá vốn dùng để tính toán lợi nhuận, không hiện trên web.</p>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-zinc-900">Số lượng có sẵn</Label>
                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        disabled={mode === 'view'}
                                                        type="number"
                                                        value={formData.stock || 0}
                                                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                                        className="h-12 w-32 rounded-xl border-zinc-300 bg-white text-center text-xl font-bold"
                                                    />
                                                    <div className="flex-1 space-y-1">
                                                        <span className="text-xs font-bold text-zinc-500 block uppercase tracking-tighter">Cảnh báo hết hàng</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className="size-2 rounded-full bg-amber-500"></div>
                                                            <span className="text-xs font-medium text-zinc-400">Hệ thống sẽ chuyển trạng thái khi số lượng dưới 5.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="specs" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Chất liệu</Label>
                                            <Input
                                                disabled={mode === 'view'}
                                                value={formData.specifications?.material || ''}
                                                onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications!, material: e.target.value } })}
                                                placeholder="Ví dụ: Cotton 100%"
                                                className="h-11 rounded-xl bg-zinc-50/50 border-zinc-200"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Xuất xứ</Label>
                                            <Input
                                                disabled={mode === 'view'}
                                                value={formData.specifications?.origin || ''}
                                                onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications!, origin: e.target.value } })}
                                                placeholder="Ví dụ: Việt Nam"
                                                className="h-11 rounded-xl bg-zinc-50/50 border-zinc-200"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Trọng lượng (g)</Label>
                                            <Input
                                                disabled={mode === 'view'}
                                                value={formData.specifications?.weight || ''}
                                                onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications!, weight: e.target.value } })}
                                                placeholder="Ví dụ: 250"
                                                className="h-11 rounded-xl bg-zinc-50/50 border-zinc-200 px-4"
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-2.5">
                                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Hướng dẫn bảo quản</Label>
                                            <Input
                                                disabled={mode === 'view'}
                                                value={formData.specifications?.careInstructions || ''}
                                                onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications!, careInstructions: e.target.value } })}
                                                placeholder="Ủi ở nhiệt độ thấp, không dùng chất tẩy..."
                                                className="h-11 rounded-xl bg-zinc-50/50 border-zinc-200"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="images" className="m-0 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-900">Bộ sưu tập hình ảnh</Label>
                                        <p className="text-[11px] text-zinc-400 font-medium italic">Ảnh đầu tiên hoặc ảnh được đánh dấu sẽ làm đại diện.</p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                        {formData.images?.map((img, idx) => (
                                            <div key={idx} className="relative aspect-[3/4] rounded-2xl border-2 border-zinc-100 overflow-hidden group shadow-sm transition-all hover:border-zinc-300">
                                                <img src={getImageUrl(img)} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={`Product ${idx}`} />
                                                {mode !== 'view' && (
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <Button size="icon" variant="destructive" className="h-9 w-9 rounded-xl shadow-lg" onClick={() => removeImage(idx)}>
                                                            <Trash2 size={16} />
                                                        </Button>
                                                        <Button size="icon" variant="secondary" className="h-9 w-9 rounded-xl shadow-lg bg-white text-black hover:bg-zinc-100" onClick={() => setAsThumbnail(img)}>
                                                            <Check size={16} />
                                                        </Button>
                                                    </div>
                                                )}
                                                {formData.thumbnail === img && (
                                                    <div className="absolute top-2 left-2 bg-black text-white text-[9px] font-black uppercase px-2 py-1 rounded-lg shadow-xl tracking-tighter">THUMBNAIL</div>
                                                )}
                                            </div>
                                        ))}

                                        {mode !== 'view' && (
                                            <div
                                                className={cn(
                                                    "aspect-[3/4] border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-300 hover:border-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 transition-all cursor-pointer group",
                                                    isUploading && "animate-pulse pointer-events-none"
                                                )}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <div className="size-10 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-zinc-900 transition-all">
                                                    <Plus size={24} />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-widest mt-3">{isUploading ? 'ĐANG TẢI...' : 'THÊM ẢNH'}</span>
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
                                </TabsContent>
                            </div>
                        </Tabs>

                        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Info size={14} className="text-zinc-400" />
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">AUTOSAVED AT {new Date().toLocaleTimeString()}</span>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold text-zinc-500 hover:bg-white">
                                    Đóng cửa sổ
                                </Button>
                                {mode !== 'view' && (
                                    <Button onClick={handleSave} className="bg-zinc-900 text-white hover:bg-black rounded-xl px-8 h-11 font-black shadow-xl shadow-zinc-200 tracking-tight transition-all active:scale-95">
                                        {mode === 'create' ? 'PHÁT HÀNH SẢN PHẨM' : 'CẬP NHẬT DỮ LIỆU'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const Package = ({ size, className }: { size: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16.5 9.4 7.5 4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
);
