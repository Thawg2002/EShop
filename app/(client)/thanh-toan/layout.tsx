import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thanh Toán',
    description: 'Hoàn tất đơn hàng tại XX.II Collective. Thanh toán an toàn, giao hàng nhanh chóng.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function ThanhToanLayout({ children }: { children: React.ReactNode }) {
    return children;
}
