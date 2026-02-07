'use client';

import { cn } from '@/lib/utils';
import { MAX_WIDTH_CLASSES } from '@/lib/constants';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

type MaxWidthType = keyof typeof MAX_WIDTH_CLASSES;

interface PageLayoutProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: MaxWidthType;
    /** Add top padding for navbar (default: true) */
    withNavbarPadding?: boolean;
    /** Show navbar (default: true) */
    showNavbar?: boolean;
    /** Show footer (default: true) */
    showFooter?: boolean;
}

/**
 * Common page layout wrapper with Navbar and Footer.
 * Use this instead of manually adding Navbar/Footer to each page.
 * 
 * @example
 * <PageLayout maxWidth="lg">
 *   <PageHeader title="Shop" subtitle="Browse our collection" />
 *   <ProductGrid products={products} />
 * </PageLayout>
 */
export function PageLayout({
    children,
    className,
    maxWidth = 'lg',
    withNavbarPadding = true,
    showNavbar = true,
    showFooter = true,
}: PageLayoutProps) {
    return (
        <>
            {showNavbar && <Navbar />}
            <main
                className={cn(
                    "flex-1 w-full bg-white dark:bg-dark-bg",
                    withNavbarPadding && "pt-24",
                    "pb-16",
                    className
                )}
            >
                <div className={MAX_WIDTH_CLASSES[maxWidth]}>
                    {children}
                </div>
            </main>
            {showFooter && <Footer />}
        </>
    );
}
