import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cửa Hàng',
    description: 'Khám phá bộ sưu tập thời trang cao cấp XX.II Collective. Chất lượng vượt trội, thiết kế vượt thời gian cho phong cách sống hiện đại.',
    openGraph: {
        title: 'Cửa Hàng | XX.II Collective',
        description: 'Khám phá bộ sưu tập thời trang cao cấp XX.II Collective.',
    },
};

export default function CuaHangLayout({ children }: { children: React.ReactNode }) {
    return children;
}
