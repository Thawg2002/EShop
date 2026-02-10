import { redirect } from 'next/navigation';
import apiClient from '@/lib/api-client';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function LegacyProductRedirect({ params }: Props) {
    const { id } = await params;

    try {
        const res: any = await apiClient.get(`/products/${id}`);
        const product = res.data;
        if (product?.slug) {
            redirect(`/${product.slug}`);
        }
    } catch (error) {
        console.error("Redirect fetch failed:", error);
    }

    // Default to shop if not found or no slug
    redirect('/cua-hang');
}
