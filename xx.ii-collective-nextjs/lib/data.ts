import { Product, Order, Address } from '@/types';

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Silk Slip Dress',
        price: 240,
        category: 'Dresses',
        color: 'Ivory',
        description: 'Expertly tailored from Italian silk, this slip dress offers a relaxed fit with a refined finish.',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1000&auto=format&fit=crop',
        ]
    },
    {
        id: 2,
        name: 'Linen Blazer',
        price: 350,
        category: 'Outerwear',
        color: 'Sand',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Wide Leg Trousers',
        price: 180,
        category: 'Trousers',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Leather Mules',
        price: 210,
        category: 'Shoes',
        color: 'Tan',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Structured Coat',
        price: 420,
        category: 'Outerwear',
        color: 'Oatmeal',
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Evening Slip',
        price: 260,
        category: 'Dresses',
        color: 'Champagne',
        image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1000&auto=format&fit=crop'
    }
];

export const ORDERS: Order[] = [
    {
        id: '204-99812-XX',
        date: 'February 12, 2024',
        total: 590.00,
        status: 'Processing',
        items: []
    },
    {
        id: '204-88123-XX',
        date: 'January 24, 2024',
        total: 210.00,
        status: 'Delivered',
        items: []
    },
    {
        id: '204-77210-XX',
        date: 'January 10, 2024',
        total: 180.00,
        status: 'Shipped',
        items: []
    }
];

export const ADDRESSES: Address[] = [
    {
        id: 1,
        name: 'Eleanor Pena',
        type: 'Home',
        street: '4517 Washington Ave.',
        city: 'Manchester',
        state: 'Kentucky',
        zip: '39495',
        phone: '+1 (202) 555-0133',
        isDefault: true
    },
    {
        id: 2,
        name: 'Eleanor Pena (Office)',
        type: 'Office',
        street: '3891 Ranchview Dr.',
        city: 'Richardson',
        state: 'California',
        zip: '62639',
        phone: '+1 (219) 555-0114',
        isDefault: false
    },
];
