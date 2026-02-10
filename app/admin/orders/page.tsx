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

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (o.user as any)?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Đơn hàng</h1>
                    <p className="text-zinc-500">Theo dõi và quản lý đơn đặt hàng từ khách hàng</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input
                        placeholder="Tìm theo mã đơn hoặc tên khách..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="processing">Đang xử lý</SelectItem>
                        <SelectItem value="shipped">Đang giao</SelectItem>
                        <SelectItem value="delivered">Thành công</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="bg-white border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50">
                        <TableRow>
                            <TableHead>Mã đơn</TableHead>
                            <TableHead>Khách hàng</TableHead>
                            <TableHead>Ngày đặt</TableHead>
                            <TableHead>Tổng tiền</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ordersLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">Đang tải...</TableCell>
                            </TableRow>
                        ) : filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">Không tìm thấy đơn hàng</TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => {
                                const statusInfo = getStatusInfo(order.status);
                                return (
                                    <TableRow key={order._id} className="hover:bg-zinc-50">
                                        <TableCell className="font-mono text-xs font-bold uppercase">
                                            #{order._id.slice(-6)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{(order.user as any)?.name || 'Khách vãng lai'}</div>
                                            <div className="text-xs text-zinc-500">{(order.user as any)?.email}</div>
                                        </TableCell>
                                        <TableCell className="text-zinc-500">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                                        </TableCell>
                                        <TableCell className="font-bold text-black">
                                            {formatCurrency(order.pricing?.total)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn("gap-1.5", statusInfo.color)}>
                                                <statusInfo.icon size={12} />
                                                {statusInfo.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                                                <Eye size={18} />
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
                <DialogContent className="max-w-4xl max-h-[90dvh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            Chi tiết đơn hàng <span className="text-zinc-400 font-mono">#{selectedOrder?._id.slice(-8).toUpperCase()}</span>
                        </DialogTitle>
                        <DialogDescription>
                            Xem thông tin chi tiết và cập nhật trạng thái đơn hàng.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                            {/* Items List */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="bg-zinc-50 px-4 py-2 border-b font-medium text-sm">Sản phẩm đã đặt</div>
                                    <div className="divide-y">
                                        {selectedOrder.items?.map((item: any, idx: number) => (
                                            <div key={idx} className="p-4 flex gap-4">
                                                <div className="w-16 h-20 bg-zinc-100 rounded overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={getImageUrl(item.product?.thumbnail || item.product?.images?.[0])}
                                                        alt={item.product?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm truncate">{item.product?.name}</p>
                                                    <div className="flex gap-2 mt-1">
                                                        {item.color && <Badge variant="outline" className="text-[10px]">{item.color}</Badge>}
                                                        {item.size && <Badge variant="outline" className="text-[10px]">{item.size}</Badge>}
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-zinc-500 text-sm">Số lượng: {item.quantity}</span>
                                                        <span className="font-bold">{formatCurrency(item.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-zinc-50 p-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-500">Tạm tính</span>
                                            <span>{formatCurrency(selectedOrder.pricing?.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-500">Phí vận chuyển</span>
                                            <span>{formatCurrency(selectedOrder.pricing?.shippingFee)}</span>
                                        </div>
                                        {selectedOrder.pricing?.discount > 0 && (
                                            <div className="flex justify-between text-sm text-red-500">
                                                <span>Giảm giá</span>
                                                <span>-{formatCurrency(selectedOrder.pricing?.discount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                            <span>Tổng cộng</span>
                                            <span className="text-black">{formatCurrency(selectedOrder.pricing?.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                {/* Status Update */}
                                <div className="space-y-2">
                                    <Label>Trạng thái đơn hàng</Label>
                                    <Select
                                        value={selectedOrder.status}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger className={cn("font-bold", getStatusInfo(selectedOrder.status).color)}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Chờ xử lý</SelectItem>
                                            <SelectItem value="processing">Đang xử lý</SelectItem>
                                            <SelectItem value="shipped">Đang giao</SelectItem>
                                            <SelectItem value="delivered">Thành công</SelectItem>
                                            <SelectItem value="cancelled">Hủy đơn</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Customer Info */}
                                <div className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-sm">
                                        <User size={16} /> Thông tin khách hàng
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium">{(selectedOrder.user as any)?.name}</p>
                                        <p className="text-zinc-500">{(selectedOrder.user as any)?.email}</p>
                                        <p className="text-zinc-500">{(selectedOrder.user as any)?.phone}</p>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-sm">
                                        <Truck size={16} /> Địa chỉ giao hàng
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">{selectedOrder.shippingAddress?.fullName}</p>
                                        <p className="text-zinc-500 mt-1">
                                            {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.ward}, {selectedOrder.shippingAddress?.district}, {selectedOrder.shippingAddress?.province}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-sm">
                                        <CreditCard size={16} /> Thanh toán
                                    </div>
                                    <div className="text-sm flex justify-between items-center">
                                        <span className="capitalize">{selectedOrder.payment?.method || 'COD'}</span>
                                        <Badge variant={selectedOrder.payment?.status === 'paid' ? 'secondary' : 'outline'} className={selectedOrder.payment?.status === 'paid' ? 'bg-green-100 text-green-700' : ''}>
                                            {selectedOrder.payment?.status === 'paid' ? 'Đã trả' : 'Chờ thu'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
