'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ShoppingBagIcon, ChevronRightIcon } from '@/components/icons';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const product = PRODUCTS.find(p => p.id === parseInt(params.id));

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                        <Link href="/shop" className="text-primary hover:underline">Back to Shop</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const images = product.images || [product.image, product.image, product.image];

    const handleAddToCart = () => {
        addItem(product, selectedSize);
        router.push('/cart');
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <Link href="/shop" className="flex items-center text-sm text-gray-500 hover:text-primary mb-8">
                        <ChevronRightIcon className="w-4 h-4 rotate-180 mr-1" /> Back to Shop
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Gallery */}
                        <div className="lg:col-span-7 flex gap-4">
                            <div className="hidden lg:flex flex-col gap-4">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`w-20 aspect-[3/4] cursor-pointer hover:opacity-80 border rounded overflow-hidden ${idx === selectedImageIndex ? 'border-primary' : 'border-transparent'
                                            }`}
                                    >
                                        <Image src={img} alt="" width={80} height={107} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                                <Image src={images[selectedImageIndex]} alt={product.name} fill className="object-cover" />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Best Seller
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="lg:col-span-5 flex flex-col">
                            <nav className="flex items-center text-xs text-gray-500 mb-4">
                                <span>Home</span> <span className="mx-2">/</span> <span>Women</span> <span className="mx-2">/</span>
                                <span className="text-secondary">{product.category}</span>
                            </nav>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">{product.name}</h1>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-2xl font-medium">${product.price}.00</span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-primary text-sm">★</span>)}
                                    <span className="text-xs text-gray-500 ml-2 underline">124 Reviews</span>
                                </div>
                            </div>
                            <p className="text-gray-500 leading-relaxed mb-8">
                                {product.description || "Expertly tailored from Italian cotton, this piece offers a relaxed fit with a refined finish. A breathable staple designed for the modern wardrobe that transitions seamlessly from office to evening."}
                            </p>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <span className="text-sm font-bold block mb-3">Color: <span className="font-normal text-gray-500">{product.color}</span></span>
                                    <div className="flex gap-3">
                                        <button className="w-10 h-10 rounded-full bg-[#d2b48c] ring-2 ring-offset-2 ring-primary"></button>
                                        <button className="w-10 h-10 rounded-full bg-[#1c2841] hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"></button>
                                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"></button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <span className="text-sm font-bold">Size: <span className="font-normal text-gray-500">{selectedSize}</span></span>
                                        <button className="text-xs underline text-gray-500">Size Guide</button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {['S', 'M', 'L', 'XL'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`h-12 border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-all ${size === selectedSize ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleAddToCart} className="w-full h-14 mb-4">
                                Add to Cart <ShoppingBagIcon className="w-5 h-5" />
                            </Button>
                            <p className="text-xs text-center text-gray-400">Free shipping on orders over $300</p>

                            <div className="mt-8 border-t border-gray-100 divide-y divide-gray-100">
                                {['Product Details', 'Shipping & Returns', 'Material & Care'].map(item => (
                                    <div key={item} className="py-4 flex items-center justify-between cursor-pointer group">
                                        <span className="font-medium text-sm">{item}</span>
                                        <span className="text-gray-400 group-hover:text-primary transition-colors">+</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
