import Image from 'next/image';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const badgeVariant =
        order.status === 'Delivered' ? 'default' :
            order.status === 'Processing' ? 'primary' : 'warning';

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-light-bg px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8 text-sm">
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Placed</p>
                        <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Total</p>
                        <p className="font-medium">${order.total}.00</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Order #</p>
                        <p className="font-medium">{order.id}</p>
                    </div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">
                    Manage Order
                </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row gap-6 justify-between items-center">
                <div className="flex gap-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="relative w-16 h-20 bg-gray-100 rounded border border-gray-100 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                    <div>
                        <h4 className="font-bold">{order.status}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                            {order.status === 'Processing'
                                ? 'Expected: Feb 16 - Feb 18'
                                : `Updated on ${order.date}`}
                        </p>
                    </div>
                </div>
                <Badge variant={badgeVariant}>{order.status}</Badge>
            </div>
        </div>
    );
}
