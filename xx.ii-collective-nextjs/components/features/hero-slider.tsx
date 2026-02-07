'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
    {
        id: 1,
        title: 'BỘ SƯU TẬP',
        subtitle: 'XUÂN',
        description: 'Tuyển tập những thiết kế tối giản tiên phong. Dành cho nàng thơ kỹ thuật số hiện đại.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
        tag: 'Thành lập 2004'
    },
    {
        id: 2,
        title: 'CẤU TRÚC',
        subtitle: 'MỀM MẠI',
        description: 'Sự kết hợp giữa chất liệu lụa satin cao cấp và phom dáng tailoring hiện đại.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070',
        tag: 'Bộ sưu tập 2024'
    },
    {
        id: 3,
        title: 'SẮC TRẮNG',
        subtitle: 'THUẦN KHIẾT',
        description: 'Vẻ đẹp của sự tối giản được định nghĩa lại qua gam màu ngà voi ivory.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070',
        tag: 'Ivory Collection'
    },
    {
        id: 4,
        title: 'THÀNH THỊ',
        subtitle: 'PHÓNG KHOÁNG',
        description: 'Vượt qua những giới hạn của thời trang truyền thống cho nhịp sống hiện đại.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2070',
        tag: 'Urban Nomad'
    }
];

export function HeroSlider() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-white/50 !opacity-100',
                    bulletActiveClass: 'swiper-pagination-bullet-active !w-8 !h-2 !rounded-full !bg-primary',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/* Background Image */}
                        <div className="absolute inset-0 h-full w-full">
                            <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/20"></div>
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-white dark:from-dark-bg via-transparent to-transparent"></div>
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{ backgroundImage: `url("${slide.image}")` }}
                            />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-20 flex h-full w-full items-center justify-center px-4 pt-20">
                            <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
                                <span className="mb-6 bg-white/80 dark:bg-dark-card/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.6em] text-primary backdrop-blur-sm md:text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    {slide.tag}
                                </span>

                                <div className="relative mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                    <h1 className="pointer-events-none select-none font-serif-display text-[12vw] font-black leading-[0.8] tracking-tight text-transparent opacity-20 blur-[1px]"
                                        style={{ WebkitTextStroke: '2px white' }}>
                                        {slide.title}
                                    </h1>
                                    <h2 className="absolute inset-0 font-serif-display text-6xl font-medium italic leading-[0.9] tracking-tighter text-white mix-blend-hard-light drop-shadow-xl md:text-8xl lg:text-9xl">
                                        {slide.title}<br />
                                        <span className="text-[1.2em] font-light not-italic text-white">{slide.subtitle}</span>
                                    </h2>
                                </div>

                                <p className="mb-14 max-w-lg border-l-2 border-primary pl-6 text-left text-sm font-medium leading-relaxed text-white backdrop-blur-[2px] drop-shadow-md md:text-base animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                                    {slide.description}
                                </p>

                                <div className="flex flex-col gap-6 sm:flex-row animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
                                    <Link
                                        href="/shop"
                                        className="transform bg-primary px-12 py-5 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-[0_10px_30px_rgba(94,58,115,0.4)]"
                                    >
                                        Khám phá ngay
                                    </Link>
                                    <Link
                                        href="/journal"
                                        className="group flex items-center justify-center gap-3 border border-white/30 bg-black/20 px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-primary"
                                    >
                                        <span>Xem Lookbook</span>
                                        <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
                <div className="h-16 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Cuộn</span>
            </div>

            {/* Custom Pagination Container */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 80px !important;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                }
                .swiper-pagination-bullet {
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
}
