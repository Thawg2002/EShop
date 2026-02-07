import { Address } from '@/types';
import { Badge } from '@/components/ui/badge';

interface AddressCardProps {
    address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
    return (
        <div className="border border-gray-200 rounded-lg p-6 relative hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-lg">{address.name}</h3>
                {address.isDefault && (
                    <Badge variant="primary">Default</Badge>
                )}
            </div>
            <address className="not-italic text-gray-600 text-sm mb-4 leading-relaxed">
                {address.street}<br />
                {address.city}, {address.state} {address.zip}<br />
                United States
            </address>
            <p className="text-sm font-medium mb-6">{address.phone}</p>
            <div className="flex gap-4 text-sm font-medium pt-4 border-t border-gray-100">
                <button className="hover:text-primary">Edit</button>
                <span className="text-gray-300">|</span>
                <button className="text-gray-400 hover:text-red-500">Remove</button>
            </div>
        </div>
    );
}
