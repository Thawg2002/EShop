'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Section } from '@/components/ui/section';
import { MagicCard } from '@/components/magicui/magic-card';
import { TextAnimate } from '@/components/magicui/text-animate';
import { getStaggerDelay } from '@/lib/utils';

interface Pin {
    id: string;
    url: string;
    title: string;
    link?: string;
}

export default function InspirationPage() {
    const [searchQuery, setSearchQuery] = useState('thời trang');
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Search Pinterest pins
    const searchPins = async (query: string) => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/pinterest/search?q=${encodeURIComponent(query)}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to search');
            }

            setPins(result.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle search form submit
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        searchPins(searchQuery);
    };

    return (
        <PageLayout>
            <Section className="py-20">
                <div className="text-center mb-16">
                    <BlurFade delay={0.1}>
                        <h1 className="text-5xl md:text-6xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-4">
                            <TextAnimate animation="blurInUp" by="word">
                                Cảm Hứng Thời Trang
                            </TextAnimate>
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <div className="flex flex-col items-center gap-6 mb-12">
                            <p className="text-muted-text dark:text-dark-text-secondary text-lg max-w-2xl mx-auto">
                                Khám phá những hình ảnh thời trang tinh tuyển từ Pinterest để tìm thấy phong cách riêng cho bạn.
                            </p>

                            <a
                                href="/api/auth/pinterest"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-[#E60023] text-white rounded-full font-bold text-sm hover:bg-[#ad001a] transition-colors shadow-lg"
                            >
                                <span className="material-symbols-outlined text-lg">link</span>
                                Kết nối Pinterest
                            </a>
                        </div>
                    </BlurFade>

                    {/* Search Input */}
                    <BlurFade delay={0.3}>
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tìm kiếm cảm hứng... (ví dụ: thời trang, minimalist, street style)"
                                    className="w-full px-6 py-4 pr-32 text-sm border border-gray-200 dark:border-dark-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-card dark:text-dark-text-primary"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-primary-hover transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Đang tìm...' : 'Tìm kiếm'}
                                </button>
                            </div>
                        </form>
                    </BlurFade>
                </div>

                {/* Error Message */}
                {error && (
                    <BlurFade delay={0.4}>
                        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-center">
                            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                        </div>
                    </BlurFade>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-muted-text dark:text-dark-text-secondary">Đang tải cảm hứng...</p>
                    </div>
                )}

                {/* Pinterest Pins Grid */}
                {!loading && pins.length > 0 && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {pins.map((pin, idx) => (
                            <BlurFade key={pin.id} delay={getStaggerDelay(idx, 0.4, 0.05)}>
                                <div className="break-inside-avoid">
                                    <MagicCard disableSpotlight={true} className="p-0 border-none bg-transparent">
                                        <a
                                            href={pin.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative group cursor-pointer overflow-hidden rounded-xl block"
                                        >
                                            <img
                                                src={pin.url}
                                                alt={pin.title}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <p className="text-white font-medium text-sm line-clamp-2">{pin.title}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-white text-[14px]">push_pin</span>
                                                    </div>
                                                    <span className="text-white/80 text-[10px] uppercase tracking-widest">Xem trên Pinterest</span>
                                                </div>
                                            </div>
                                        </a>
                                    </MagicCard>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && pins.length === 0 && searchQuery && (
                    <BlurFade delay={0.4}>
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-muted-text dark:text-dark-text-secondary mb-4">search_off</span>
                            <p className="text-muted-text dark:text-dark-text-secondary">
                                Không tìm thấy kết quả cho "{searchQuery}". Hãy thử từ khóa khác!
                            </p>
                        </div>
                    </BlurFade>
                )}

                {/* Info Section */}
                <BlurFade delay={0.8}>
                    <div className="mt-20 p-8 border border-dashed border-gray-200 dark:border-dark-border rounded-xl text-center max-w-3xl mx-auto">
                        <span className="material-symbols-outlined text-3xl text-primary mb-4">info</span>
                        <h3 className="text-lg font-medium text-dark-text dark:text-dark-text-primary mb-2">Kết nối Pinterest API</h3>
                        <p className="text-muted-text dark:text-dark-text-secondary text-sm">
                            Trang này hiển thị kết quả tìm kiếm thực từ Pinterest API. Bạn có thể tìm kiếm bất kỳ từ khóa nào về thời trang, phong cách sống, hoặc cảm hứng thiết kế.
                        </p>
                    </div>
                </BlurFade>
            </Section>
        </PageLayout>
    );
}
