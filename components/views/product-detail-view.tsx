'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { ProductSection } from '@/components/features/product-section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { formatCurrency, getImageUrl, cn } from '@/lib/utils';
import { Product } from '@/types';
import { toast } from 'react-hot-toast';

interface ProductDetailViewProps {
    product: Product;
    relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
    const addItem = useCartStore((state) => state.addItem);

    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const images = product.images && product.images.length > 0
        ? product.images
        : [product.thumbnail || '/placeholder-image.png'];

    const colors = [
        { name: 'Default', hex: '#ccc' }
    ];

    const breadcrumbItems = [
        { label: 'Cửa Hàng', href: '/cua-hang' },
        { label: typeof product.category === 'string' ? product.category : product.category.name, href: `/${typeof product.category === 'string' ? '' : product.category.slug}` },
        { label: product.name }
    ];

    const handleAddToCart = () => {
        addItem(product, selectedSize, colors[selectedColor].name);
        toast.success("Đã thêm vào giỏ hàng");
    };

    const sections = [
        {
            title: 'Mô Tả Sản Phẩm',
            content: product.description || "Đang cập nhật..."
        },
        {
            title: 'Kích Thước & Phom Dáng',
            content: product.specifications?.origin ? `Xuất xứ: ${product.specifications.origin}. Phom dáng suông rộng thoải mái.` : 'Người mẫu cao 175cm mặc size S. Phom dáng suông rộng thoải mái.'
        },
        {
            title: 'Chất Liệu & Bảo Quản',
            content: product.specifications?.careInstructions || 'Giặt máy ở nhiệt độ thấp. Không sử dụng chất tẩy. Phơi khô tự nhiên. Là ở nhiệt độ trung bình.'
        }
    ];

    return (
        <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-16 pb-16 overflow-x-hidden">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="mb-6">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-0">
                    <div className="lg:col-span-7 lg:sticky lg:top-14 lg:self-start">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] scroll-smooth scrollbar-hide pb-2 lg:pb-0">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`flex-shrink-0 w-20 h-20 cursor-pointer overflow-hidden transition-all border-2 ${idx === selectedImageIndex
                                            ? 'border-primary opacity-100'
                                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-black/10'
                                            }`}
                                    >
                                        <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover transition-all duration-700" />
                                    </div>
                                ))}
                            </div>

                            <div className="order-1 lg:order-2 flex-1 relative group">
                                <div className="relative aspect-square bg-off-white dark:bg-dark-card overflow-hidden">
                                    <img
                                        src={getImageUrl(images[selectedImageIndex])}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-all duration-[1.5s]"
                                    />
                                    {product.isBestSeller && (
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="inline-block px-4 py-2 bg-white/90 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm text-black">Bán Chạy</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-card/90 border border-black/10 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-10"
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-card/90 border border-black/10 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-10"
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <span className="block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
                            {typeof product.category === 'string' ? product.category : product.category.name}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-sans font-semibold text-[#1d1d1f] dark:text-zinc-50 leading-tight mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-bold text-dark-text dark:text-dark-text-primary">
                                {formatCurrency(product.price)}
                            </span>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className={cn("text-sm", (product.rating?.average || 5) >= i ? "text-primary" : "text-zinc-300")}>★</span>
                                ))}
                                <span className="text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary ml-2">({product.rating?.count || 0})</span>
                            </div>
                        </div>

                        <p className="text-base font-normal leading-relaxed text-[#86868b] dark:text-dark-text-secondary mb-12">
                            {product.description || "Được chế tác từ chất liệu cao cấp, sản phẩm này mang đến sự thoải mái tối đa với form dáng thanh lịch. Thiết kế tối giản, phù hợp cho mọi hoàn cảnh."}
                        </p>

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

                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs uppercase tracking-widest font-bold">Kích Thước</span>
                                <button className="text-xs text-muted-text dark:text-dark-text-secondary underline hover:text-black dark:hover:text-white transition-colors">Hướng Dẫn</button>
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

                        <button
                            onClick={handleAddToCart}
                            className="w-full h-14 bg-dark-text dark:bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary dark:hover:bg-primary-hover transition-colors mb-4 flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined text-lg">shopping_bag</span>
                            Thêm Vào Giỏ
                        </button>
                        <p className="text-[11px] text-center text-luxury-slate-grey dark:text-dark-text-secondary uppercase tracking-widest font-medium">Miễn phí vận chuyển cho đơn hàng trên $300</p>

                        <div className="mt-12 border-t border-black/5 dark:border-dark-border">
                            {sections.map((section, idx) => (
                                <div key={idx} className="border-b border-black/5 dark:border-dark-border">
                                    <button
                                        onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                                        className="w-full py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className="text-xs uppercase tracking-widest font-bold text-dark-text dark:text-dark-text-primary">{section.title}</span>
                                        <span className="material-symbols-outlined text-muted-text dark:text-dark-text-secondary group-hover:text-black dark:group-hover:text-white transition-colors">
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

                <ProductSection
                    title="Có Thể Bạn Thích"
                    products={relatedProducts}
                    className="mt-32"
                    mode="slider"
                />
            </div>
        </main>
    );
}
