import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ShopContent } from '@/components/features/shop-content';

export const metadata: Metadata = {
    title: 'Cửa Hàng | XX.II Collective',
    description: 'Khám phá các thiết kế mới nhất được định nghĩa bởi sự thanh lịch và chất lượng cao cấp.',
    openGraph: {
        title: 'Cửa Hàng | XX.II Collective',
        description: 'Duyệt bộ sưu tập của chúng tôi',
    },
};

export default function ShopPage() {
    return (
        <>
            <Navbar />
            <ShopContent products={PRODUCTS} />
            <Footer />
        </>
    );
}
