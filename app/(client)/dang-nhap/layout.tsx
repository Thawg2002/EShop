import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng Nhập',
    description: 'Đăng nhập hoặc đăng ký tài khoản XX.II Collective để trải nghiệm mua sắm thời trang cao cấp.',
};

export default function DangNhapLayout({ children }: { children: React.ReactNode }) {
    return children;
}
