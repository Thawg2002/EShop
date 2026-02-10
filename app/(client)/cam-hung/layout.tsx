import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cảm Hứng',
    description: 'Bảng cảm hứng thời trang và phong cách sống từ XX.II Collective. Khám phá xu hướng và ý tưởng mới.',
    openGraph: {
        title: 'Cảm Hứng | XX.II Collective',
        description: 'Bảng cảm hứng thời trang và phong cách sống.',
    },
};

export default function CamHungLayout({ children }: { children: React.ReactNode }) {
    return children;
}
