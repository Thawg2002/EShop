import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nhật Ký',
    description: 'Câu chuyện về nghệ thuật thời trang, quá trình sáng tạo và cảm hứng đằng sau mỗi thiết kế của XX.II Collective.',
    openGraph: {
        title: 'Nhật Ký | XX.II Collective',
        description: 'Câu chuyện về nghệ thuật thời trang và quá trình sáng tạo.',
    },
};

export default function NhatKyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
