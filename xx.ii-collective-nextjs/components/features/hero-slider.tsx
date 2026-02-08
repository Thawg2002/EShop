'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import { Particles } from '@/components/magicui/particles';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShinyButton } from '@/components/magicui/shiny-button';

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
                            <div className="absolute inset-0 z-10 bg-black/20"></div>
                            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/60 via-black/10 to-transparent"></div>
                            <Particles
                                className="absolute inset-0 z-10"
                                quantity={100}
                                staticity={30}
                                ease={50}
                                color="#ffffff"
                                refresh={true}
                            />
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{ backgroundImage: `url("${slide.image}")` }}
                            />
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-20 flex h-full w-full items-end justify-start px-6 pb-24 md:px-12 md:pb-32 pt-24 md:pt-32">
                            <div className="flex flex-col items-center text-center px-6">
                                <BlurFade delay={0.2}>
                                    <span className={"block text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 mb-6"}>
                                        {slide.tag}
                                    </span>
                                </BlurFade>
                                <BlurFade delay={0.4}>
                                    <h2 className={"font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight text-white mb-8"}>
                                        {slide.title}
                                    </h2>
                                </BlurFade>
                                <BlurFade delay={0.6}>
                                    <p className={"mb-12 max-w-lg text-sm md:text-base font-normal uppercase tracking-[0.2em] leading-relaxed text-white/70 italic serif"}>
                                        {slide.description}
                                    </p>
                                </BlurFade>
                                <BlurFade delay={0.8}>
                                    <div className="flex items-center gap-6">
                                        <Link
                                            href="/cua-hang"
                                            className="group relative h-14 px-10 bg-white text-zinc-950 text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-zinc-100"
                                        >
                                            <span className="relative z-10">Khám Phá</span>
                                        </Link>
                                    </div>
                                </BlurFade>
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
