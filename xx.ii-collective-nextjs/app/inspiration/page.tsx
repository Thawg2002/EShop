'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Section } from '@/components/ui/section';
import { MagicCard } from '@/components/magicui/magic-card';
import { TextAnimate } from '@/components/magicui/text-animate';
import Image from 'next/image';
import { getStaggerDelay } from '@/lib/utils';

// Mock data for Pinterest pins
const PINS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', title: 'Minimalist Style' },
    { id: 2, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', title: 'Urban Chic' },
    { id: 3, url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800', title: 'Summer Collection' },
    { id: 4, url: 'https://images.unsplash.com/photo-1475180098004-ca77a66827ae?w=800', title: 'Vintage Vibes' },
    { id: 5, url: 'https://images.unsplash.com/photo-1539109132314-34a9c6689711?w=800', title: 'Evening Wear' },
    { id: 6, url: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=800', title: 'Boho Aesthetics' },
    { id: 7, url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800', title: 'Clean Lines' },
    { id: 8, url: 'https://images.unsplash.com/photo-1581067727543-3e0815156010?w=800', title: 'Street Style' },
    { id: 9, url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', title: 'Cozy Winter' },
    { id: 10, url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800', title: 'Workwear Inspiration' },
    { id: 11, url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800', title: 'Accessories' },
    { id: 12, url: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800', title: 'Autumn Palettes' },
];

export default function InspirationPage() {
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
                        <p className="text-muted-text dark:text-dark-text-secondary text-lg max-w-2xl mx-auto">
                            Khám phá những hình ảnh thời trang tinh tuyển từ Pinterest để tìm thấy phong cách riêng cho bạn.
                        </p>
                    </BlurFade>
                </div>

                {/* Pinterest Style Masonry Grid (Approximated with CSS Columns) */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {PINS.map((pin, idx) => (
                        <BlurFade key={pin.id} delay={getStaggerDelay(idx, 0.3, 0.05)}>
                            <div className="break-inside-avoid">
                                <MagicCard disableSpotlight={true} className="p-0 border-none bg-transparent">
                                    <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                                        <img
                                            src={pin.url}
                                            alt={pin.title}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <p className="text-white font-medium text-sm">{pin.title}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white text-[14px]">push_pin</span>
                                                </div>
                                                <span className="text-white/80 text-[10px] uppercase tracking-widest">Pin it</span>
                                            </div>
                                        </div>
                                    </div>
                                </MagicCard>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                {/* API Disclaimer for User */}
                <BlurFade delay={0.8}>
                    <div className="mt-20 p-8 border border-dashed border-gray-200 dark:border-dark-border rounded-xl text-center max-w-3xl mx-auto">
                        <span className="material-symbols-outlined text-3xl text-primary mb-4">info</span>
                        <h3 className="text-lg font-medium text-dark-text dark:text-dark-text-primary mb-2">Thông báo kết nối API</h3>
                        <p className="text-muted-text dark:text-dark-text-secondary text-sm">
                            Hiện tại trang này đang hiển thị dữ liệu mẫu. Để kết nối thật với Pinterest, bạn cần cung cấp <strong>App ID</strong> và <strong>App Secret</strong> từ Pinterest Developer Portal và cấu hình OAuth trong dự án.
                        </p>
                    </div>
                </BlurFade>
            </Section>
        </PageLayout>
    );
}
