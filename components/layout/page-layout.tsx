"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar as MainNavbar } from "@/components/layout/navbar";
import { Footer as MainFooter } from "@/components/layout/footer";
import { MAX_WIDTH_CLASSES } from "@/lib/constants";

interface PageLayoutProps {
    children: React.ReactNode;
    maxWidth?: keyof typeof MAX_WIDTH_CLASSES;
    showNavbar?: boolean;
    showFooter?: boolean;
    navbarPadding?: boolean;
}

/**
 * Common Page Layout wrapper that includes Navbar and Footer.
 * Reduces duplication across all pages.
 */
export function PageLayout({
    children,
    maxWidth = "lg",
    showNavbar = true,
    showFooter = true,
    navbarPadding = true,
}: PageLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {showNavbar && <MainNavbar />}
            <main
                className={cn(
                    "flex-1 w-full bg-white dark:bg-dark-bg",
                    navbarPadding && "pt-20",
                    MAX_WIDTH_CLASSES[maxWidth]
                )}
            >
                {children}
            </main>
            {showFooter && <MainFooter />}
        </div>
    );
}
