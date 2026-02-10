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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useAdminStore } from '@/lib/stores/use-admin-store';
import { cn, formatCurrency, getImageUrl } from '@/lib/utils';
import { Order } from '@/types';
import {
    CheckCircle,
    Clock,
    CreditCard,
    Eye,
    Package,
    Search,
    Truck,
    User,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
    const {
        orders,
        ordersLoading,
        fetchOrders,
        updateOrderStatus
    } = useAdminStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const handleStatusChange = async (newStatus: string) => {
        if (selectedOrder?._id) {
            await updateOrderStatus(selectedOrder._id, newStatus);
            // Refresh local selected order to show updated status in dialog
            const updated = orders.find(o => o._id === selectedOrder._id);
            if (updated) setSelectedOrder(updated);
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending': return { label: 'Chờ xử lý', color: 'bg-orange-100 text-orange-700', icon: Clock };
            case 'processing': return { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700', icon: Package };
            case 'shipped': return { label: 'Đang giao', color: 'bg-purple-100 text-purple-700', icon: Truck };
            case 'delivered': return { label: 'Thành công', color: 'bg-green-100 text-green-700', icon: CheckCircle };
            case 'cancelled': return { label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: XCircle };
            default: return { label: status, color: 'bg-zinc-100 text-zinc-700', icon: Clock };
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter">Đơn hàng</h1>
                    <p className="text-zinc-500 font-medium">Theo dõi và quản lý các giao dịch từ khách hàng</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-2xl border-zinc-200 font-bold h-12 px-6">Báo cáo đơn</Button>
                    <Button className="rounded-2xl bg-black text-white hover:bg-zinc-800 font-bold h-12 px-6 shadow-lg shadow-black/10 transition-all active:scale-95">Xuất Excel</Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-black transition-colors cursor-pointer hover:scale-110 active:scale-95"
                        size={20}
                        onClick={handleSearch}
                    />
                    <Input
                        placeholder="Tìm theo mã đơn hoặc tên khách..."
                        className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl focus-visible:ring-black transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[240px] h-12 rounded-2xl border-none shadow-sm bg-white font-bold px-6 focus:ring-black">
                        <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl p-1 bg-white/95 backdrop-blur-xl">
                        <SelectItem value="all" className="rounded-xl p-3 font-medium">Tất cả trạng thái</SelectItem>
                        <SelectItem value="pending" className="rounded-xl p-3 font-medium text-orange-600">Chờ xử lý</SelectItem>
                        <SelectItem value="processing" className="rounded-xl p-3 font-medium text-blue-600">Đang xử lý</SelectItem>
                        <SelectItem value="shipped" className="rounded-xl p-3 font-medium text-purple-600">Đang giao</SelectItem>
                        <SelectItem value="delivered" className="rounded-xl p-3 font-medium text-green-600">Thành công</SelectItem>
                        <SelectItem value="cancelled" className="rounded-xl p-3 font-medium text-red-600">Đã hủy</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="bg-white border-none shadow-sm rounded-[2rem] overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50/50">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="pl-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Mã đơn</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Khách hàng</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Ngày đặt</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Tổng tiền</TableHead>
                            <TableHead className="h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400">Trạng thái</TableHead>
                            <TableHead className="pr-8 h-14 uppercase text-[10px] font-black tracking-widest text-zinc-400 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ordersLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="size-8 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
                                        <span className="text-sm font-medium text-zinc-500">Đang tải dữ liệu...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-20 text-zinc-400">
                                    Không có đơn hàng nào
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => {
                                const statusInfo = getStatusInfo(order.status);
                                return (
                                    <TableRow key={order._id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors duration-200 group">
                                        <TableCell className="pl-8">
                                            <Badge variant="outline" className="font-mono text-[10px] font-black border-zinc-200 bg-white shadow-sm uppercase">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-xs font-black shadow-inner border border-zinc-50">
                                                    {(order.user as any)?.name?.slice(0, 1).toUpperCase() || 'K'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-zinc-900 group-hover:text-black transition-colors">{(order.user as any)?.name || 'Khách vãng lai'}</div>
                                                    <div className="text-[10px] font-bold text-zinc-400 tracking-tight">{(order.user as any)?.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-500 font-bold text-xs uppercase">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'}
                                        </TableCell>
                                        <TableCell className="font-black text-black">
                                            {formatCurrency(order.pricing?.total)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-sm",
                                                statusInfo.color.replace('bg-', 'border-').replace('100', '200'),
                                                statusInfo.color
                                            )}>
                                                <statusInfo.icon size={12} strokeWidth={3} />
                                                {statusInfo.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-8 text-right">
                                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-zinc-100 transition-colors" onClick={() => handleViewOrder(order)}>
                                                <Eye size={20} className="text-zinc-400 hover:text-black transition-colors" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Order Detail Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-6xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-[3rem] max-h-[90dvh]">
                    <DialogHeader className="px-10 pt-10 pb-6 border-b border-zinc-50 flex flex-row items-center justify-between">
                        <div>
                            <DialogTitle className="flex items-center gap-3 text-3xl font-black tracking-tighter">
                                Chi tiết đơn hàng
                                <span className="text-zinc-400 font-mono text-xl opacity-50 tracking-normal">#{selectedOrder?._id.slice(-8).toUpperCase()}</span>
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400 font-medium text-base mt-1">
                                Xem thông tin vận chuyển, sản phẩm và cập nhật trạng thái đơn hàng.
                            </DialogDescription>
                        </div>
                        {selectedOrder && (
                            <Badge className={cn(
                                "px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg",
                                getStatusInfo(selectedOrder.status).color
                            )}>
                                {getStatusInfo(selectedOrder.status).label}
                            </Badge>
                        )}
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto max-h-[calc(90dvh-140px)]">
                            {/* Items List - Column 1 (Large) */}
                            <div className="lg:col-span-7 p-10 space-y-8 bg-zinc-50/30 border-r border-zinc-50">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Danh mục sản phẩm</h3>
                                        <span className="text-xs font-bold text-zinc-500 bg-white px-3 py-1 rounded-full shadow-sm">
                                            {selectedOrder.items?.length} sản phẩm
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedOrder.items?.map((item: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-white rounded-3xl flex gap-6 shadow-sm border border-zinc-50 hover:shadow-md transition-shadow">
                                                <div className="w-20 h-24 bg-zinc-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner border border-zinc-50">
                                                    <img
                                                        src={getImageUrl(item.product?.thumbnail || item.product?.images?.[0])}
                                                        alt={item.product?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                    <p className="font-black text-lg text-zinc-900 leading-tight truncate">{item.product?.name}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {item.color && (
                                                            <Badge variant="outline" className="text-[10px] font-bold border-zinc-100 bg-zinc-50/50 uppercase">
                                                                Màu: {item.color}
                                                            </Badge>
                                                        )}
                                                        {item.size && (
                                                            <Badge variant="outline" className="text-[10px] font-bold border-zinc-100 bg-zinc-50/50 uppercase">
                                                                Size: {item.size}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-between items-end mt-4">
                                                        <span className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Số lượng: <span className="text-black">{item.quantity}</span></span>
                                                        <span className="font-black text-lg text-black">{formatCurrency(item.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pricing Summary */}
                                <div className="bg-white p-8 rounded-[2.5rem] space-y-4 border border-zinc-50 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                        <CreditCard size={100} />
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-zinc-500">
                                        <span>Tổng giá sản phẩm</span>
                                        <span className="text-zinc-900">{formatCurrency(selectedOrder.pricing?.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-zinc-500">
                                        <span>Phí giao hàng</span>
                                        <span className="text-zinc-900">{formatCurrency(selectedOrder.pricing?.shippingFee)}</span>
                                    </div>
                                    {selectedOrder.pricing?.discount > 0 && (
                                        <div className="flex justify-between text-sm font-bold text-red-500 bg-red-50 p-3 rounded-2xl">
                                            <span>Ưu đãi giảm giá</span>
                                            <span>-{formatCurrency(selectedOrder.pricing?.discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-black text-2xl pt-4 border-t border-zinc-50">
                                        <span className="tracking-tighter uppercase text-zinc-900">Tổng thanh toán</span>
                                        <span className="text-black font-black">{formatCurrency(selectedOrder.pricing?.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Sidebar - Column 2 (Small) */}
                            <div className="lg:col-span-5 p-10 space-y-10 bg-white scrollbar-hide">
                                {/* Status Update Section */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Cập nhật trạng thái</Label>
                                    <Select
                                        value={selectedOrder.status}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger className={cn(
                                            "h-14 rounded-2xl border-none shadow-lg text-base font-black px-6 focus:ring-black",
                                            getStatusInfo(selectedOrder.status).color
                                        )}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                            <SelectItem value="pending" className="rounded-xl p-3 font-bold text-orange-600">CHỜ XỬ LÝ</SelectItem>
                                            <SelectItem value="processing" className="rounded-xl p-3 font-bold text-blue-600">ĐANG XỬ LÝ</SelectItem>
                                            <SelectItem value="shipped" className="rounded-xl p-3 font-bold text-purple-600">ĐANG GIAO</SelectItem>
                                            <SelectItem value="delivered" className="rounded-xl p-3 font-bold text-green-600">THÀNH CÔNG</SelectItem>
                                            <SelectItem value="cancelled" className="rounded-xl p-3 font-bold text-red-600">YÊU CẦU HỦY</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Customer Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 flex items-center gap-2">
                                        <User size={14} className="text-zinc-300" /> Thông tin khách
                                    </h3>
                                    <div className="bg-zinc-50/50 p-6 rounded-3xl border border-zinc-50 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl font-black">
                                                {(selectedOrder.user as any)?.name?.slice(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-black text-lg">{(selectedOrder.user as any)?.name}</p>
                                                <p className="text-xs font-bold text-zinc-400">Thành viên đối tác</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-2 border-t border-white">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-500 font-bold">Email</span>
                                                <span className="font-bold">{(selectedOrder.user as any)?.email}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-500 font-bold">Số điện thoại</span>
                                                <span className="font-bold">{(selectedOrder.user as any)?.phone || '—'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 flex items-center gap-2">
                                        <Truck size={14} className="text-zinc-300" /> Giao hàng đến
                                    </h3>
                                    <div className="bg-zinc-50/50 p-6 rounded-3xl border border-zinc-50">
                                        <p className="font-black text-black">🏠 {selectedOrder.shippingAddress?.fullName}</p>
                                        <p className="text-sm font-bold text-zinc-500 mt-3 leading-relaxed">
                                            {selectedOrder.shippingAddress?.street}, <br />
                                            {selectedOrder.shippingAddress?.ward}, {selectedOrder.shippingAddress?.district}, <br />
                                            <span className="text-black font-black uppercase tracking-tight">{selectedOrder.shippingAddress?.province}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 flex items-center gap-2">
                                        <CreditCard size={14} className="text-zinc-300" /> Thanh toán
                                    </h3>
                                    <div className="bg-zinc-900 p-6 rounded-3xl flex items-center justify-between text-white shadow-xl shadow-black/10">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Phương thức</p>
                                            <p className="font-black uppercase">{selectedOrder.payment?.method || 'COD'}</p>
                                        </div>
                                        <Badge variant="outline" className={cn(
                                            "rounded-xl px-4 py-1 font-black",
                                            selectedOrder.payment?.status === 'paid' ? "bg-green-500 text-white border-none" : "border-zinc-700 text-zinc-500"
                                        )}>
                                            {selectedOrder.payment?.status === 'paid' ? 'ĐÃ TRẢ' : 'KHI NHẬN HÀNG'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="px-10 py-6 bg-zinc-50 border-t border-zinc-100">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-12 px-8 font-black border-zinc-200 bg-white hover:bg-zinc-100 transition-all">
                            Đóng cửa sổ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
