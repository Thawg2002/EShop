import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Giỏ Hàng',
    description: 'Xem và quản lý giỏ hàng của bạn tại XX.II Collective. Thanh toán nhanh chóng và bảo mật.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function GioHangLayout({ children }: { children: React.ReactNode }) {
    return children;
}
