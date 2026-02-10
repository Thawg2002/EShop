import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hồ Sơ Cá Nhân',
    description: 'Quản lý thông tin cá nhân, đơn hàng và sở thích tại XX.II Collective.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function HoSoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
