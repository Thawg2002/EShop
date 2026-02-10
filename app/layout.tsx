// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

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

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'XX.II Collective | Luxury Fashion & Timeless Design',
    description: 'Elevating everyday essentials with a focus on quality, sustainability, and timeless design. Discover curated collections for the modern wardrobe.',
    keywords: ['fashion', 'luxury', 'sustainable fashion', 'timeless design', 'modern wardrobe'],
    authors: [{ name: 'XX.II Collective' }],
    openGraph: {
        title: 'XX.II Collective | Luxury Fashion',
        description: 'Curated collections for the modern wardrobe.',
        type: 'website',
        siteName: 'XX.II Collective',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'XX.II Collective' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'XX.II Collective | Luxury Fashion',
        description: 'Curated collections for the modern wardrobe.',
        images: ['/og-image.jpg'],
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
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
