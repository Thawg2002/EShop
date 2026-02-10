// app/shop/page.tsx
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { ProductCard } from '@/components/features/ProductCard';
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShopPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('-createdAt');
    const [page, setPage] = useState(1);

    // Fetch Products with filters
    const { data, isLoading } = useQuery({
        queryKey: ['products', search, category, sort, page],
        queryFn: async () => {
            const res: any = await apiClient.get('/products', {
                params: { search, category, sort, page, limit: 12 }
            });
            return res.data;
        }
    });

    // Fetch Categories for Sidebar
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res: any = await apiClient.get('/categories');
            return res.data;
        }
    });

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Shop Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-bold mb-4">Cửa hàng</h1>
                    <p className="text-muted-text">Khám phá bộ sưu tập phong cách hiện đại của chúng tôi.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 flex-shrink-0 space-y-10">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-muted/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Danh mục</h4>
                            <ul className="space-y-4">
                                <li>
                                    <button
                                        onClick={() => setCategory('')}
                                        className={cn(
                                            "text-sm transition-colors hover:text-primary",
                                            category === '' ? "text-primary font-bold" : "text-muted-text"
                                        )}
                                    >
                                        Tất cả sản phẩm
                                    </button>
                                </li>
                                {categories?.map((cat: any) => (
                                    <li key={cat._id}>
                                        <button
                                            onClick={() => setCategory(cat.slug)}
                                            className={cn(
                                                "text-sm transition-colors hover:text-primary",
                                                category === cat.slug ? "text-primary font-bold" : "text-muted-text"
                                            )}
                                        >
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-grow">
                        {/* Controls */}
                        <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
                            <p className="text-sm text-muted-text">
                                Hiển thị <span className="font-bold text-foreground">{data?.length || 0}</span> sản phẩm
                            </p>

                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="appearance-none bg-muted/30 border border-border rounded-full py-2 px-6 pr-10 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary transition-colors cursor-pointer"
                                    >
                                        <option value="-createdAt">Mới nhất</option>
                                        <option value="price">Giá thấp - cao</option>
                                        <option value="-price">Giá cao - thấp</option>
                                        <option value="-rating">Đánh giá cao</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-text" />
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-2xl" />
                                ))
                            ) : data?.length === 0 ? (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-muted-text">Không tìm thấy sản phẩm nào.</p>
                                </div>
                            ) : (
                                data?.map((product: any) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            )}
                        </div>

                        {/* Pagination Placeholder */}
                        {data?.length > 0 && (
                            <div className="mt-20 flex justify-center">
                                <button
                                    className="bg-muted text-foreground px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
