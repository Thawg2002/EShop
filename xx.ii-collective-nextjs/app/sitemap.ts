import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://xxii-collective.com';

    // Static routes
    const staticRoutes = [
        '',
        '/shop',
        '/cart',
        '/profile',
        '/login',
        '/journal',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic product routes
    const productRoutes = PRODUCTS.map((product) => ({
        url: `${baseUrl}/shop/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    return [...staticRoutes, ...productRoutes];
}
