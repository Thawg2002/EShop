'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShineBorder } from '@/components/magicui/shine-border';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { MagicCard } from '@/components/magicui/magic-card';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const product = PRODUCTS.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg transition-colors pt-24">
                    <BlurFade>
                        <div className="text-center">
                            <h1 className="text-4xl font-serif-display italic mb-6 text-dark-text dark:text-dark-text-primary">Không Tìm Thấy</h1>
                            <Link href="/shop" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">← Quay Lại Cửa Hàng</Link>
                        </div>
                    </BlurFade>
                </div>
                <Footer />
            </>
        );
    }

    const images = product.images || [product.image, product.image, product.image];
    const colors = [
        { name: 'Beige', hex: '#d2b48c' },
        { name: 'Navy', hex: '#1c2841' },
        { name: 'White', hex: '#ffffff' }
    ];

    const handleAddToCart = () => {
        addItem(product, selectedSize, colors[selectedColor].name);
        router.push('/cart');
    };

    const sections = [
        {
            title: 'Chi Tiết Sản Phẩm',
            content: product.materials || 'Được chế tác từ cotton Ý cao cấp, sản phẩm này mang đến sự thoải mái tối đa với form dáng thanh lịch. Thiết kế thoáng khí, phù hợp cho cả văn phòng lẫn dạo phố.'
        },
        {
            title: 'Vận Chuyển & Đổi Trả',
            content: 'Miễn phí vận chuyển cho đơn hàng trên $300. Đổi trả trong vòng 30 ngày. Chính sách đổi trả linh hoạt, không cần lý do.'
        },
        {
            title: 'Chất Liệu & Bảo Quản',
            content: '100% Cotton Ý. Giặt máy ở nhiệt độ thấp. Không sử dụng chất tẩy. Phơi khô tự nhiên. Là ở nhiệt độ trung bình.'
        }
    ];

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    {/* Back Link */}
                    <BlurFade delay={0.1}>
                        <Link href="/shop" className="inline-flex items-center text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary transition-colors mb-12">
                            <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
                            Quay Lại
                        </Link>
                    </BlurFade>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Image Gallery - 7 columns */}
                        <div className="lg:col-span-7">
                            {/* Main Image with ShineBorder */}
                            <BlurFade delay={0.2}>
                                <ShineBorder
                                    borderRadius={0}
                                    borderWidth={2}
                                    color={["#5e3a73", "#9c40ff", "#ffaa40"]}
                                    className="w-full p-0 min-w-full"
                                >
                                    <div className="relative aspect-[3/4] bg-off-white dark:bg-dark-card overflow-hidden group w-full">
                                        <img
                                            src={images[selectedImageIndex]}
                                            alt={product.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                                        />
                                        {product.isBestSeller && (
                                            <div className="absolute top-6 left-6 z-20">
                                                <SparklesText className="inline-block px-4 py-2 bg-primary/90 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm text-white">
                                                    Bán Chạy
                                                </SparklesText>
                                            </div>
                                        )}
                                    </div>
                                </ShineBorder>
                            </BlurFade>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {images.map((img, idx) => (
                                    <BlurFade key={idx} delay={0.3 + idx * 0.1}>
                                        <div
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`aspect-[3/4] cursor-pointer overflow-hidden transition-all ${idx === selectedImageIndex ? 'opacity-100 ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </BlurFade>
                                ))}
                            </div>
                        </div>

                        {/* Product Info - 5 columns, sticky */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
                            <BlurFade delay={0.2}>
                                <span className="block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">{product.category}</span>
                            </BlurFade>
                            <BlurFade delay={0.3}>
                                <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary leading-[0.95] mb-6">
                                    {product.name}
                                </h1>
                            </BlurFade>

                            <BlurFade delay={0.4}>
                                <div className="flex items-baseline gap-4 mb-8">
                                    <span className="text-3xl font-light text-dark-text dark:text-dark-text-primary">${product.price}</span>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-primary text-sm">★</span>)}
                                        <span className="text-xs text-muted-text dark:text-dark-text-secondary ml-2">(124)</span>
                                    </div>
                                </div>
                            </BlurFade>

                            <BlurFade delay={0.5}>
                                <p className="text-sm font-light leading-relaxed text-muted-text dark:text-dark-text-secondary mb-12 font-serif-display">
                                    {product.description || "Được chế tác từ cotton Ý cao cấp, sản phẩm này mang đến sự thoải mái tối đa với form dáng thanh lịch. Thiết kế thoáng khí, phù hợp cho cả văn phòng lẫn dạo phố."}
                                </p>
                            </BlurFade>

                            {/* Color Selection */}
                            <BlurFade delay={0.6}>
                                <div className="mb-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs uppercase tracking-widest font-bold">Màu Sắc</span>
                                        <span className="text-xs text-muted-text dark:text-dark-text-secondary">{colors[selectedColor].name}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        {colors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedColor(idx)}
                                                className={`w-12 h-12 rounded-full border-2 transition-all ${idx === selectedColor
                                                    ? 'ring-2 ring-offset-2 ring-primary scale-110'
                                                    : 'border-slate-200 dark:border-dark-border hover:scale-105'
                                                    }`}
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </BlurFade>

                            {/* Size Selection */}
                            <BlurFade delay={0.7}>
                                <div className="mb-12">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs uppercase tracking-widest font-bold">Kích Thước</span>
                                        <button className="text-xs text-muted-text dark:text-dark-text-secondary underline hover:text-primary transition-colors">Hướng Dẫn</button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {['S', 'M', 'L', 'XL'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`h-12 border text-sm font-medium transition-all ${size === selectedSize
                                                    ? 'border-primary bg-primary text-white'
                                                    : 'border-slate-200 dark:border-dark-border hover:border-primary dark:text-dark-text-primary'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </BlurFade>

                            {/* Add to Cart Button - ShimmerButton */}
                            <BlurFade delay={0.8}>
                                <ShimmerButton
                                    onClick={handleAddToCart}
                                    className="w-full h-14 text-white"
                                    shimmerColor="#ffffff"
                                    background="rgba(94, 58, 115, 1)"
                                >
                                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                                    Thêm Vào Giỏ
                                </ShimmerButton>
                                <p className="text-[10px] text-center text-muted-text dark:text-dark-text-secondary uppercase tracking-widest mt-4">Miễn phí vận chuyển cho đơn hàng trên $300</p>
                            </BlurFade>

                            {/* Accordion Sections */}
                            <BlurFade delay={0.9}>
                                <div className="mt-12 border-t border-black/5 dark:border-dark-border">
                                    {sections.map((section, idx) => (
                                        <div key={idx} className="border-b border-black/5 dark:border-dark-border">
                                            <button
                                                onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                                                className="w-full py-6 flex items-center justify-between text-left group"
                                            >
                                                <span className="text-xs uppercase tracking-widest font-bold text-dark-text dark:text-dark-text-primary">{section.title}</span>
                                                <span className="material-symbols-outlined text-muted-text dark:text-dark-text-secondary group-hover:text-primary transition-colors">
                                                    {expandedSection === section.title ? 'remove' : 'add'}
                                                </span>
                                            </button>
                                            {expandedSection === section.title && (
                                                <div className="pb-6 text-sm font-light leading-relaxed text-muted-text dark:text-dark-text-secondary animate-in fade-in duration-300">
                                                    {section.content}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </BlurFade>
                        </div>
                    </div>

                    {/* Related Products with MagicCard */}
                    <BlurFade delay={0.2}>
                        <div className="mt-32">
                            <h2 className="text-4xl md:text-5xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-12 text-center">
                                <SparklesText>Có Thể Bạn Thích</SparklesText>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct, idx) => (
                                    <BlurFade key={relatedProduct.id} delay={0.1 + idx * 0.1}>
                                        <Link href={`/shop/${relatedProduct.id}`} className="group block">
                                            <MagicCard className="aspect-[3/4] bg-off-white dark:bg-dark-card mb-4 overflow-hidden border-0">
                                                <img
                                                    src={relatedProduct.image}
                                                    alt={relatedProduct.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110"
                                                />
                                            </MagicCard>
                                            <h3 className="text-lg font-serif-display italic text-dark-text dark:text-dark-text-primary mb-1">{relatedProduct.name}</h3>
                                            <p className="text-xs text-primary font-bold">${relatedProduct.price}</p>
                                        </Link>
                                    </BlurFade>
                                ))}
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </main>
            <Footer />
        </>
    );
}
