// app/shop/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { useCart } from '@/lib/use-cart';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Heart, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [activeImage, setActiveImage] = useState(0);

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            const res: any = await apiClient.get(`/products/${slug}`);
            const prod = res.data;
            if (prod.variants?.length > 0) {
                setSelectedVariant(prod.variants[0]);
            }
            return prod;
        }
    });

    const handleAddToCart = async () => {
        try {
            await addItem(product._id, selectedVariant?._id, quantity);
            toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    const images = [product.featuredImage, ...(product.gallery || [])];

    return (
        <div className="pt-32 pb-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Product Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-premium">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    src={getImageUrl(images[activeImage])}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>

                        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                                >
                                    <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4">
                            <Link href="/shop" className="text-xs uppercase tracking-widest text-primary font-bold flex items-center">
                                <ChevronLeft size={14} className="mr-1" /> Quay lại cửa hàng
                            </Link>
                            <h1 className="text-5xl font-serif font-bold leading-tight">{product.name}</h1>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center text-yellow-500">
                                    <Star fill="currentColor" size={16} />
                                    <span className="ml-2 text-sm font-bold text-foreground">{product.rating || '5.0'}</span>
                                    <span className="ml-1 text-xs text-muted-text">(24 Đánh giá)</span>
                                </div>
                                <span className="text-muted-text">|</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">Trong kho</span>
                            </div>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</p>
                        </div>

                        <p className="text-muted-text leading-relaxed">
                            {product.description || 'Sản phẩm thời trang cao cấp từ bộ sưu tập mới nhất của XX.II Collective. Thiết kế tinh tế, chất liệu thượng hạng mang lại sự thoải mái và phong cách riêng biệt.'}
                        </p>

                        {/* Variants Selection */}
                        {product.variants?.length > 0 && (
                            <div className="space-y-6">
                                <h4 className="text-sm uppercase tracking-widest font-bold">Kích thước & Màu sắc</h4>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v: any) => (
                                        <button
                                            key={v._id}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all ${selectedVariant?._id === v._id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-text hover:border-primary/50'}`}
                                        >
                                            {v.size} - {v.color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div className="space-y-8 pt-4">
                            <div className="flex items-center space-x-8">
                                <div className="flex items-center bg-muted/50 rounded-full px-6 py-2 border border-border">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted-text hover:text-primary transition-colors">
                                        <Minus size={18} />
                                    </button>
                                    <span className="mx-6 font-bold w-4 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="text-muted-text hover:text-primary transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <button className="text-muted-text hover:text-primary transition-colors">
                                    <Heart size={24} strokeWidth={1.5} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full luxury-gradient text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-premium flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                <ShoppingBag size={20} />
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                        </div>

                        {/* Shipping Info */}
                        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-border">
                            <div className="flex items-start space-x-3">
                                <Truck className="text-primary" size={20} />
                                <div>
                                    <h5 className="text-xs font-bold uppercase">Giao hàng miễn phí</h5>
                                    <p className="text-[10px] text-muted-text">Cho đơn hàng từ 1tr VNĐ</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <RefreshCw className="text-primary" size={20} />
                                <div>
                                    <h5 className="text-xs font-bold uppercase">Hỗ trợ 24/7</h5>
                                    <p className="text-[10px] text-muted-text">Mọi lúc, mọi nơi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
