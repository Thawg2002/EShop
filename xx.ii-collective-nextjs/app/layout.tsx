import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
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
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
            <body className="min-h-screen flex flex-col font-sans text-secondary antialiased selection:bg-primary/20 bg-white">
                {children}
            </body>
        </html>
    );
}
