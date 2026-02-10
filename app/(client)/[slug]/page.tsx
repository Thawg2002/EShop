import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { ProductDetailView } from '@/components/views/product-detail-view';
import { BlogDetailView } from '@/components/views/blog-detail-view';
import { ProductListingView } from '@/components/views/product-listing-view';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getSlugData(slug: string) {
    try {
        const res = await apiClient.get(`/resolve-slug/${slug}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const resolved = await getSlugData(slug);

    if (!resolved) return {};

    const { type, data } = resolved;
    const previousImages = (await parent).openGraph?.images || [];

    if (slug === 'cua-hang') {
        return {
            title: 'Cửa Hàng',
            description: 'Khám phá bộ sưu tập thời trang cao cấp XX.II Collective. Chất lượng vượt trội, thiết kế vượt thời gian cho phong cách sống hiện đại.',
            openGraph: {
                title: 'Cửa Hàng | XX.II Collective',
                description: 'Khám phá bộ sưu tập thời trang cao cấp XX.II Collective.',
            },
            alternates: {
                canonical: '/cua-hang',
            },
        };
    }

    if (type === 'product') {
        const product = data;
        return {
            title: product.name,
            description: product.description,
            openGraph: {
                title: product.name,
                description: product.description,
                images: [
                    {
                        url: product.thumbnail || product.images?.[0] || '/og-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: product.name,
                    },
                    ...previousImages,
                ],
                type: 'article',
            },
            alternates: {
                canonical: `/${slug}`,
            },
        };
    }

    if (type === 'blog') {
        const blog = data;
        return {
            title: blog.title,
            description: blog.excerpt || blog.metaDescription,
            openGraph: {
                title: blog.title,
                description: blog.excerpt,
                images: [
                    {
                        url: blog.thumbnail || '/og-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                    ...previousImages,
                ],
                type: 'article',
            },
            alternates: {
                canonical: `/${slug}`,
            },
        };
    }

    if (type === 'category') {
        const category = data;
        return {
            title: category.metaTitle || category.name,
            description: category.metaDescription || category.description,
            openGraph: {
                title: category.name,
                description: category.description,
                images: [
                    {
                        url: category.image || '/og-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: category.name,
                    },
                    ...previousImages,
                ],
            },
            alternates: {
                canonical: `/${slug}`,
            },
        };
    }

    return {};
}

export default async function DynamicSlugPage({ params }: Props) {
    const { slug } = await params;

    if (slug === 'cua-hang') {
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

        const shopCategory = {
            name: 'Tất Cả Sản Phẩm',
            description: 'Bộ sưu tập mới nhất',
            slug: 'cua-hang',
            children: categories.filter((c: any) => !c.parent)
        };

        return <ProductListingView category={shopCategory as any} products={products} />;
    }

    const resolved = await getSlugData(slug);

    if (!resolved) {
        notFound();
    }

    const { type, data } = resolved;

    let additionalData: any = {};

    if (type === 'product') {
        try {
            const res = await apiClient.get(`/products/${data._id}/related`);
            additionalData.relatedProducts = res.data;
        } catch (e) {
            additionalData.relatedProducts = [];
        }
    }

    if (type === 'blog') {
        try {
            const res = await apiClient.get('/blogs', { params: { limit: 3 } });
            additionalData.relatedPosts = res.data.blogs || [];
        } catch (e) {
            additionalData.relatedPosts = [];
        }
    }

    if (type === 'category') {
        try {
            const res = await apiClient.get('/products', { params: { category: data._id, limit: 12 } });
            additionalData.products = res.data.products || [];
        } catch (e) {
            additionalData.products = [];
        }
    }

    return (
        <>
            {/* Navbar is inside views or layout */}
            {type === 'product' && (
                <ProductDetailView
                    product={data}
                    relatedProducts={additionalData.relatedProducts}
                />
            )}
            {type === 'blog' && (
                <BlogDetailView
                    post={data}
                    relatedPosts={additionalData.relatedPosts}
                />
            )}
            {type === 'category' && (
                <ProductListingView
                    category={data}
                    products={additionalData.products}
                />
            )}
        </>
    );
}
