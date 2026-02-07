import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSlider } from '@/components/features/hero-slider';

export default function HomePage() {
    const featuredProducts = PRODUCTS.slice(0, 5);

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg">
                {/* Hero Slider */}
                <HeroSlider />

                {/* Featured Products Section */}
                <section className="relative w-full bg-white dark:bg-dark-bg px-4 py-32 sm:px-6 lg:px-12">
                    {/* Decorative Blur */}
                    <div className="pointer-events-none absolute right-0 top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]"></div>

                    <div className="mx-auto max-w-[1600px]">
                        {/* Section Header */}
                        <div className="mb-24 flex flex-col justify-between border-b border-black/10 dark:border-dark-border pb-8 md:flex-row md:items-end">
                            <div>
                                <h2 className="font-serif-display text-5xl font-medium text-dark-text dark:text-dark-text-primary md:text-7xl">
                                    Sản phẩm tiêu biểu
                                </h2>
                                <p className="mt-4 font-serif-display text-xl italic text-primary">Volume II — Xuân/Hè</p>
                            </div>
                            <Link
                                href="/shop"
                                className="group mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-dark-text dark:text-dark-text-primary transition-colors hover:text-primary md:mt-0"
                            >
                                Xem tất cả
                                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-45">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Featured Products Grid */}
                        <div className="auto-rows-min grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-16">
                            {/* Large Featured Product - Left */}
                            {featuredProducts[0] && (
                                <div className="group relative cursor-pointer md:col-span-6 md:row-span-2 lg:col-span-5">
                                    <Link href={`/cua-hang/${featuredProducts[0].id}`}>
                                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-off-white dark:bg-dark-card shadow-2xl shadow-gray-200/50 dark:shadow-none">
                                            <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/10 transition-colors duration-500 group-hover:bg-transparent"></div>
                                            <img
                                                src={featuredProducts[0].image}
                                                alt={featuredProducts[0].name}
                                                className="h-full w-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                            />

                                            {/* Product Info Card */}
                                            <div className="absolute bottom-8 left-0 z-20 w-full pl-8 pr-6">
                                                <div className="bg-white/70 dark:bg-dark-card/70 backdrop-blur-md border border-black/5 dark:border-dark-border translate-y-4 opacity-0 p-8 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-serif-display text-2xl text-dark-text dark:text-dark-text-primary">{featuredProducts[0].name}</h3>
                                                            <p className="mt-2 text-xs uppercase tracking-wide text-muted-text dark:text-dark-text-secondary">{featuredProducts[0].category}</p>
                                                        </div>
                                                        <span className="font-serif-display text-lg italic text-primary">${featuredProducts[0].price}</span>
                                                    </div>
                                                    <button className="mt-6 w-full bg-dark-text dark:bg-primary py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-primary dark:hover:bg-primary-hover">
                                                        Thêm vào giỏ
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Medium Product - Top Right */}
                            {featuredProducts[1] && (
                                <div className="group relative cursor-pointer md:col-span-6 lg:col-span-5 lg:col-start-7 lg:mt-32">
                                    <Link href={`/cua-hang/${featuredProducts[1].id}`}>
                                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-off-white dark:bg-dark-card shadow-lg">
                                            <img
                                                src={featuredProducts[1].image}
                                                alt={featuredProducts[1].name}
                                                className="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                            />
                                            <div className="absolute right-6 top-6 z-20">
                                                <span className="block text-right font-serif-display text-4xl text-white mix-blend-exclusion">02</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 z-20 w-full bg-gradient-to-t from-white/90 dark:from-dark-bg/90 to-transparent p-8">
                                                <h3 className="font-serif-display text-3xl italic text-dark-text dark:text-dark-text-primary transition-colors group-hover:text-primary">{featuredProducts[1].name}</h3>
                                                <p className="mt-1 text-sm font-bold text-muted-text dark:text-dark-text-secondary">${featuredProducts[1].price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Medium Product - Bottom Left */}
                            {featuredProducts[2] && (
                                <div className="group relative cursor-pointer md:col-span-12 lg:col-span-4 lg:row-start-2 lg:mt-[-80px]">
                                    <Link href={`/cua-hang/${featuredProducts[2].id}`}>
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-off-white dark:bg-dark-card shadow-lg">
                                            <img
                                                src={featuredProducts[2].image}
                                                alt={featuredProducts[2].name}
                                                className="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-bg/80 opacity-0 backdrop-blur-[4px] transition-opacity duration-300 group-hover:opacity-100">
                                                <div className="text-center">
                                                    <h3 className="mb-3 font-serif-display text-3xl text-dark-text dark:text-dark-text-primary">{featuredProducts[2].name}</h3>
                                                    <button className="border-b border-primary pb-1 text-xs uppercase tracking-widest text-primary">Xem nhanh</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Circular Product - Bottom Right */}
                            {featuredProducts[3] && (
                                <div className="group relative cursor-pointer md:col-span-6 lg:col-span-3 lg:col-start-6 lg:row-start-2 lg:mt-24">
                                    <Link href={`/cua-hang/${featuredProducts[3].id}`}>
                                        <div className="relative aspect-square w-full overflow-hidden rounded-full border border-black/10 dark:border-dark-border bg-off-white dark:bg-dark-card shadow-xl transition-colors group-hover:border-primary">
                                            <img
                                                src={featuredProducts[3].image}
                                                alt={featuredProducts[3].name}
                                                className="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:rotate-6 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="mt-8 text-center">
                                            <h3 className="font-serif-display text-xl text-dark-text dark:text-dark-text-primary">{featuredProducts[3].name}</h3>
                                            <p className="mt-2 font-bold text-primary">${featuredProducts[3].price}</p>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="relative overflow-hidden border-t border-black/10 dark:border-dark-border bg-off-white dark:bg-dark-card/30 py-24">
                    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 divide-y divide-black/10 dark:divide-dark-border md:grid-cols-3 md:divide-x md:divide-y-0">
                            <div className="flex flex-col items-center px-6 pt-8 text-center md:pt-0">
                                <span className="material-symbols-outlined mb-6 text-4xl font-light text-primary">language</span>
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-dark-text dark:text-dark-text-primary">Giao Hàng Toàn Cầu</h3>
                                <p className="max-w-[220px] text-xs text-muted-text dark:text-dark-text-secondary">Miễn phí cho đơn trên $300. Vận chuyển toàn thế giới.</p>
                            </div>
                            <div className="flex flex-col items-center px-6 pt-8 text-center md:pt-0">
                                <span className="material-symbols-outlined mb-6 text-4xl font-light text-primary">published_with_changes</span>
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-dark-text dark:text-dark-text-primary">Đổi Trả 30 Ngày</h3>
                                <p className="max-w-[220px] text-xs text-muted-text dark:text-dark-text-secondary">Quy trình hoàn trả liền mạch. Cung cấp nhãn kỹ thuật số.</p>
                            </div>
                            <div className="flex flex-col items-center px-6 pt-8 text-center md:pt-0">
                                <span className="material-symbols-outlined mb-6 text-4xl font-light text-primary">diamond</span>
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-dark-text dark:text-dark-text-primary">Dịch Vụ Tư Vấn XX.II</h3>
                                <p className="max-w-[220px] text-xs text-muted-text dark:text-dark-text-secondary">Tư vấn phong cách chuyên nghiệp 24/7.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
