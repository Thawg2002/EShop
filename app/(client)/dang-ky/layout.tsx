import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng Ký',
    description: 'Đăng ký tài khoản XX.II Collective để nhận ưu đãi đặc biệt và theo dõi đơn hàng dễ dàng.',
};

export default function DangKyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
