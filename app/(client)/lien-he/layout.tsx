import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Liên Hệ',
    description: 'Liên hệ với XX.II Collective. Hỗ trợ khách hàng, tư vấn thời trang và thông tin cửa hàng.',
    openGraph: {
        title: 'Liên Hệ | XX.II Collective',
        description: 'Liên hệ với chúng tôi để được hỗ trợ và tư vấn thời trang.',
    },
};

export default function LienHeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
