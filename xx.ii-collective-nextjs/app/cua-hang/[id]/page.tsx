'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProductSection } from '@/components/features/product-section';
import { formatPrice } from '@/lib/utils';

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
                    <div className="text-center">
                        <h1 className="text-4xl font-serif-display italic mb-6 text-dark-text dark:text-dark-text-primary">Không Tìm Thấy</h1>
                        <Link href="/cua-hang" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">← Quay Lại Cửa Hàng</Link>
                    </div>
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
        router.push('/gio-hang');
    };

    const sections = [
        {
            title: 'Chi Tiết Sản Phẩm',
            content: product.materials || 'Được chế tác từ cotton Ý cao cấp, sản phẩm này mang đến sự thoải mái tối đa với form dáng thanh lịch. Thiết kế thoáng khí, phù hợp cho cả văn phòng lẫn dạo phố.'
        },
        {
            title: 'Vận Chuyển & Đổi Trả',
            content: 'Miễn phí vận chuyển cho đơn hàng trên 5.000.000 VNĐ. Đổi trả trong vòng 30 ngày. Chính sách đổi trả linh hoạt, không cần lý do.'
        },
        {
            title: 'Chất Liệu & Bảo Quản',
            content: '100% Cotton Ý. Giặt máy ở nhiệt độ thấp. Không sử dụng chất tẩy. Phơi khô tự nhiên. Là ở nhiệt độ trung bình.'
        }
    ];

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16 overflow-x-hidden">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    {/* Back Link */}
                    <Link href="/cua-hang" className="inline-flex items-center text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary transition-colors mb-12">
                        <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
                        Quay Lại
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Image Gallery - 7 columns, Sticky */}
                        <div className="lg:col-span-7 lg:sticky lg:top-32 lg:self-start">
                            <div className="max-h-[calc(100vh-10rem)] flex flex-col">
                                {/* Main Image - Optimized for viewport */}
                                <div className="relative aspect-square bg-off-white dark:bg-dark-card mb-4 overflow-hidden group flex-shrink-0">
                                    <img
                                        src={images[selectedImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-all duration-[1.5s]"
                                    />
                                    {product.isBestSeller && (
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="inline-block px-4 py-2 bg-white/90 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm text-black">Bán Chạy</span>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Gallery - Horizontal Slider */}
                                <div className="grid grid-cols-4 gap-3 flex-shrink-0">
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`aspect-square cursor-pointer overflow-hidden transition-all border-2 ${idx === selectedImageIndex
                                                ? 'border-primary opacity-100'
                                                : 'border-transparent opacity-60 hover:opacity-100 hover:border-black/10'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover transition-all duration-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Info - 5 columns */}
                        <div className="lg:col-span-5">
                            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">{product.category}</span>
                            <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary leading-[0.95] mb-6">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-bold text-dark-text dark:text-dark-text-primary">{formatPrice(product.price)}</span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-primary text-sm">★</span>)}
                                    <span className="text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary ml-2">(124)</span>
                                </div>
                            </div>

                            <p className="text-sm font-medium leading-relaxed text-luxury-slate-grey dark:text-dark-text-secondary mb-12 font-serif-display">
                                {product.description || "Được chế tác từ cotton Ý cao cấp, sản phẩm này mang đến sự thoải mái tối đa với form dáng thanh lịch. Thiết kế thoáng khí, phù hợp cho cả văn phòng lẫn dạo phố."}
                            </p>

                            {/* Color Selection */}
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

                            {/* Size Selection */}
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

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full h-14 bg-dark-text dark:bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary dark:hover:bg-primary-hover transition-colors mb-4 flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                                Thêm Vào Giỏ
                            </button>
                            <p className="text-[11px] text-center text-luxury-slate-grey dark:text-dark-text-secondary uppercase tracking-widest font-medium">Miễn phí vận chuyển cho đơn hàng trên $300</p>

                            {/* Accordion Sections */}
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
                                            <div className="pb-6 text-sm font-medium leading-relaxed text-luxury-slate-grey dark:text-dark-text-secondary animate-in fade-in duration-300">
                                                {section.content}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related Products (Common Component) */}
                    <ProductSection
                        title="Có Thể Bạn Thích"
                        products={PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)}
                        className="mt-32"
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
