import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProductListingView } from '@/components/views/product-listing-view';
import apiClient from '@/lib/api-client';

export const metadata: Metadata = {
    title: 'Cửa Hàng | XX.II Collective',
    description: 'Khám phá các thiết kế mới nhất được định nghĩa bởi sự thanh lịch và chất lượng cao cấp.',
};

export default async function ShopPage() {
    let products = [];
    let categories = [];

    try {
        const prodRes = await apiClient.get('/products', { params: { limit: 50 } });
        products = prodRes.data.products || [];

        const catRes = await apiClient.get('/categories');
        categories = catRes.data || [];
    } catch (error) {
        console.error("Failed to fetch shop data:", error);
    }

    // Creating a virtual "Shop" category for the view
    const shopCategory = {
        name: 'Tất Cả Sản Phẩm',
        description: 'Bộ sưu tập mới nhất',
        slug: 'cua-hang',
        children: categories.filter((c: any) => !c.parent)
    };

    return (
        <>
            <ProductListingView
                category={shopCategory as any}
                products={products}
            />
        </>
    );
}
