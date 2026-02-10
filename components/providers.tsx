// src/components/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from '@/lib/use-auth';
import { useCart } from '@/lib/use-cart';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    const { checkAuth } = useAuth();
    const { fetchCart, items } = useCart();

    useEffect(() => {
        // Initial data fetch
        checkAuth();
        fetchCart();
    }, [checkAuth, fetchCart]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#141415',
                        color: '#fcfcfc',
                        border: '1px solid #1f1f21',
                    },
                }}
            />
        </QueryClientProvider>
    );
}
