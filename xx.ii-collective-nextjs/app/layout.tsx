import type { Metadata } from 'next';
import { Bodoni_Moda, Inter } from 'next/font/google';
import './globals.css';

const bodoniModa = Bodoni_Moda({
    subsets: ['latin'],
    variable: '--font-bodoni',
    display: 'swap',
    style: ['normal', 'italic'],
    weight: ['400', '500', '600', '700', '800', '900'],
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
        <html lang="vi" className={`${bodoniModa.variable} ${inter.variable}`} suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col font-sans text-dark-text dark:text-dark-text-primary antialiased selection:bg-primary/20 bg-white dark:bg-dark-bg transition-colors" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
