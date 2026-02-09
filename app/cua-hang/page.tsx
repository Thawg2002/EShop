import Link from 'next/link';
import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/features/product-card';
import { BlurFade } from '@/components/magicui/blur-fade';

export const metadata: Metadata = {
    title: 'Cửa Hàng | XX.II Collective',
    description: 'Khám phá các thiết kế mới nhất được định nghĩa bởi sự thanh lịch và chất lượng cao cấp.',
    openGraph: {
        title: 'Cửa Hàng | XX.II Collective',
        description: 'Duyệt bộ sưu tập của chúng tôi',
    },
};

export default function ShopPage() {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-white dark:bg-dark-bg">
                {/* Sidebar Filter */}
                <aside className="hidden lg:flex flex-col w-[280px] fixed h-full pt-20 px-8 pb-8 border-r border-black/5 dark:border-dark-border overflow-y-auto no-scrollbar bg-white dark:bg-dark-bg z-10">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-zinc-400 dark:text-zinc-500 italic">Danh Mục</h2>
                            <ul className="space-y-6">
                                <li><a href="#" className="block text-sm font-medium text-zinc-950 dark:text-zinc-50 border-l border-zinc-950 dark:border-white pl-4 transition-all">Tất Cả</a></li>
                                <li><a href="#" className="block text-sm font-normal text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all pl-4 hover:pl-6">Váy</a></li>
                                <li><a href="#" className="block text-sm font-normal text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all pl-4 hover:pl-6">Áo Khoác</a></li>
                                <li><a href="#" className="block text-sm font-normal text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all pl-4 hover:pl-6">Áo & Blouse</a></li>
                                <li><a href="#" className="block text-sm font-normal text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all pl-4 hover:pl-6">Quần</a></li>
                                <li><a href="#" className="block text-sm font-normal text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all pl-4 hover:pl-6">Phụ Kiện</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 text-zinc-400 dark:text-zinc-500 italic">Bộ Lọc</h2>
                            <div className="mb-8">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-400 mb-4">Kích Thước</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                        <button key={size} className="w-10 h-10 flex items-center justify-center border border-zinc-100 dark:border-zinc-900 text-[10px] font-bold transition-all hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary mb-3">Màu Sắc</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { name: 'Đen', color: 'bg-black' },
                                        { name: 'Trắng', color: 'bg-white border-2' },
                                        { name: 'Tím', color: 'bg-primary' },
                                        { name: 'Be', color: 'bg-[#887f63]' }
                                    ].map((item, i) => (
                                        <button
                                            key={i}
                                            className={`w-8 h-8 rounded-full ${item.color} border border-slate-200 dark:border-dark-border hover:scale-110 transition-transform`}
                                            title={item.name}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary mb-2">Giá</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="block text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary hover:text-black dark:hover:text-white transition-colors">Dưới $100</a></li>
                                    <li><a href="#" className="block text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary hover:text-black dark:hover:text-white transition-colors">$100 - $300</a></li>
                                    <li><a href="#" className="block text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary hover:text-black dark:hover:text-white transition-colors">Trên $300</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full lg:pl-[280px] pt-20 min-h-screen flex flex-col overflow-x-hidden">
                    <section className="flex-1 px-6 md:px-12 max-w-[1600px] mx-auto w-full py-12">
                        {/* Header */}
                        <div className="mb-24 mt-16">
                            <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 italic mb-6">Xuân Hè / 2025</span>
                            <h1 className="text-6xl md:text-[8vw] font-serif font-medium text-zinc-950 dark:text-zinc-50 leading-[0.85] tracking-tight mb-8">
                                Thời Trang<br /><span className="italic opacity-30">Của Bạn</span>
                            </h1>
                            <p className="text-base font-normal leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm italic">
                                Khám phá các thiết kế mới nhất được định nghĩa bởi sự thanh lịch và chất lượng cao cấp.
                            </p>
                        </div>

                        {/* Sorting Bar */}
                        <div className="flex justify-between items-center mb-12 pb-4 border-b border-black/5 dark:border-dark-border">
                            <p className="text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary">
                                {PRODUCTS.length} Sản Phẩm
                            </p>
                            <select className="text-xs uppercase tracking-wider bg-transparent border-none focus:ring-0 cursor-pointer text-dark-text dark:text-dark-text-primary">
                                <option>Sắp Xếp: Nổi Bật</option>
                                <option>Giá: Thấp → Cao</option>
                                <option>Giá: Cao → Thấp</option>
                                <option>Mới Nhất</option>
                            </select>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {PRODUCTS.map((product, idx) => (
                                <BlurFade key={product.id} delay={0.1 + idx * 0.05} inView>
                                    <ProductCard product={product} />
                                </BlurFade>
                            ))}
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
        </>
    );
}
