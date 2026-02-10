import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tin Tức & Cảm Hứng',
    description: 'Xu hướng thời trang mới nhất, bài viết phong cách và cảm hứng sáng tạo từ XX.II Collective.',
    openGraph: {
        title: 'Tin Tức & Cảm Hứng | XX.II Collective',
        description: 'Xu hướng thời trang mới nhất và bài viết phong cách từ XX.II Collective.',
    },
};

export default function TinTucLayout({ children }: { children: React.ReactNode }) {
    return children;
}
