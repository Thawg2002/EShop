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
    ExternalLink
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

    useEffect(() => {
        fetchBanners();
    }, []);

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Banner quảng cáo</h1>
                    <p className="text-zinc-500">Quản lý các banner hiển thị trên trang chủ</p>
                </div>
                <Button onClick={() => handleOpenDialog('create')} className="bg-black text-white hover:bg-zinc-800 gap-2">
                    <Plus size={18} />
                    Thêm banner
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50">
                        <TableRow>
                            <TableHead className="w-[200px]">Hình ảnh</TableHead>
                            <TableHead>Thông tin banner</TableHead>
                            <TableHead>Loại</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bannersLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">Đang tải...</TableCell>
                            </TableRow>
                        ) : banners.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-zinc-500">Không tìm thấy banner</TableCell>
                            </TableRow>
                        ) : (
                            banners.map((banner) => (
                                <TableRow key={banner._id} className="hover:bg-zinc-50">
                                    <TableCell>
                                        <div className="w-full aspect-[21/9] bg-zinc-100 rounded overflow-hidden">
                                            <img
                                                src={getImageUrl(banner.image)}
                                                alt={banner.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold">{banner.title}</div>
                                        <div className="text-xs text-zinc-500">{banner.subtitle}</div>
                                        <div className="text-[10px] text-blue-600 mt-1 truncate max-w-[200px]">{banner.link}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {banner.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                banner.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-100"
                                            )}
                                        >
                                            {banner.isActive ? 'Đang bật' : 'Đang tắt'}
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
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', banner)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => deleteBanner(banner._id)}
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === 'create' ? 'Thêm banner mới' : 'Chỉnh sửa banner'}
                        </DialogTitle>
                        <DialogDescription>
                            Cấu hình slide quảng cáo và banner sự kiện.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tiêu đề chính</Label>
                                <Input
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ví dụ: BST Xuân Hè 2024"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Loại banner</Label>
                                <Input
                                    value={formData.type || 'main'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    placeholder="main, event, side"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Tiêu đề phụ / Mô tả ngắn</Label>
                            <Input
                                value={formData.subtitle || ''}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="Viết vài dòng giới thiệu..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Đường dẫn (Link)</Label>
                            <Input
                                value={formData.link || ''}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="/cua-hang/giay-snearker"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border">
                            <div className="space-y-0.5">
                                <Label className="text-base">Kích hoạt banner</Label>
                                <p className="text-xs text-zinc-500">Cho phép hiển thị ngoài trang chủ</p>
                            </div>
                            <Switch
                                checked={formData.isActive}
                                onCheckedChange={(val) => setFormData({ ...formData, isActive: val })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Hình ảnh banner</Label>
                            <div
                                className={cn(
                                    "aspect-[21/9] border-2 border-dashed rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-zinc-50 cursor-pointer group",
                                    isUploading && "animate-pulse"
                                )}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.image ? (
                                    <>
                                        <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Plus size={32} className="text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="text-zinc-300 mb-2" size={32} />
                                        <span className="text-sm text-zinc-400">{isUploading ? 'Đang tải...' : 'Tải ảnh banner lên (Khuyên dùng: 1920x800)'}</span>
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
                        <Button onClick={handleSave} className="bg-black text-white hover:bg-zinc-800">
                            {mode === 'create' ? 'Tạo banner' : 'Lưu thay đổi'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
