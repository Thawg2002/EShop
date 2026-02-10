// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
    display: 'swap',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
    display: 'swap',
});


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xxii-collective.com';

// 1. Cấu hình Viewport (Tách riêng từ Next.js 14+)
export const viewport: Viewport = {
    themeColor: 'black',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

// 2. Cấu hình Metadata Full Option
export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),

    title: {
        default: 'XX.II Collective - Thời trang thiết kế cao cấp',
        template: '%s | XX.II Collective',
    },
    description: 'Khám phá bộ sưu tập thời trang, phụ kiện, giày dép chất lượng cao tại XX.II Collective. Phong cách hiện đại, thanh lịch.',

    keywords: ['thời trang', 'quần áo nam', 'giày dép', 'phụ kiện', 'streetwear', 'local brand', 'thời trang cao cấp'],

    authors: [{ name: 'XX.II Team', url: baseUrl }],
    creator: 'Xuan Thang',
    publisher: 'XX.II Collective',

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    openGraph: {
        title: 'XX.II Collective - Thời trang thiết kế',
        description: 'Mua sắm các sản phẩm thời trang xu hướng mới nhất.',
        url: baseUrl,
        siteName: 'XX.II Collective',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'XX.II Collective Banner',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'XX.II Collective',
        description: 'Thời trang thiết kế cao cấp.',
        site: '@xxiicollective',
        creator: '@xuanthang',
        images: ['/og-image.jpg'],
    },

    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',

    alternates: {
        canonical: './',
        languages: {
            'vi-VN': '/',
        },
    },

    verification: {
        google: 'google-site-verification-code-here',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
                <OrganizationJsonLd />
                <WebSiteJsonLd />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-[#1d1d1f] bg-white`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
