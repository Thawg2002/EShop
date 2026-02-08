import Link from 'next/link';
import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { formatPrice } from '@/lib/utils';

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
                            <h2 className="font-serif-display text-2xl italic mb-6 text-dark-text dark:text-dark-text-primary">Danh Mục</h2>
                            <ul className="space-y-4">
                                <li><a href="#" className="block text-xs uppercase tracking-widest font-bold text-black dark:text-dark-text-primary border-l-2 border-primary pl-4">Tất Cả</a></li>
                                <li><a href="#" className="block text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary hover:pl-2 transition-all">Váy</a></li>
                                <li><a href="#" className="block text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary hover:pl-2 transition-all">Áo Khoác</a></li>
                                <li><a href="#" className="block text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary hover:pl-2 transition-all">Áo & Blouse</a></li>
                                <li><a href="#" className="block text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary hover:pl-2 transition-all">Quần</a></li>
                                <li><a href="#" className="block text-xs uppercase tracking-widest text-muted-text dark:text-dark-text-secondary hover:text-primary hover:pl-2 transition-all">Phụ Kiện</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-serif-display text-xl italic mb-4 text-dark-text dark:text-dark-text-primary">Bộ Lọc</h2>
                            <div className="mb-8">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary mb-3">Kích Thước</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                        <button key={size} className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-dark-border text-xs hover:bg-black hover:text-white dark:hover:bg-primary transition-colors">
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
                                    <li><a href="#" className="block text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary hover:text-black dark:hover:text-primary transition-colors">Dưới $100</a></li>
                                    <li><a href="#" className="block text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary hover:text-black dark:hover:text-primary transition-colors">$100 - $300</a></li>
                                    <li><a href="#" className="block text-xs font-medium text-luxury-slate-grey dark:text-dark-text-secondary hover:text-black dark:hover:text-primary transition-colors">Trên $300</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full lg:pl-[280px] pt-20 min-h-screen flex flex-col overflow-x-hidden">
                    <section className="flex-1 px-6 md:px-12 max-w-[1600px] mx-auto w-full py-12">
                        {/* Header */}
                        <div className="mb-16 mt-12">
                            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">Bộ Sưu Tập / 2024</span>
                            <h1 className="text-6xl md:text-7xl font-serif-display italic text-dark-text dark:text-dark-text-primary leading-[0.9] tracking-tight mb-6">
                                Thời Trang<br />Xuân Hè
                            </h1>
                            <p className="text-sm font-light leading-relaxed text-muted-text dark:text-dark-text-secondary max-w-md">
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

                        {/* Masonry Grid */}
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {PRODUCTS.map((product, idx) => (
                                <Link
                                    href={`/cua-hang/${product.id}`}
                                    key={product.id}
                                    className={`block break-inside-avoid group relative cursor-pointer ${idx % 3 === 1 ? 'md:pt-12' : ''}`}
                                >
                                    <div className="relative overflow-hidden w-full bg-off-white dark:bg-dark-card">
                                        <div className={`w-full ${idx % 5 === 0 ? 'aspect-[4/5]' : idx % 5 === 2 ? 'aspect-square' : idx % 5 === 3 ? 'aspect-[2/3]' : 'aspect-[3/4]'}`}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Overlays */}
                                        {product.isBestSeller && (
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="inline-block px-3 py-1 bg-white/90 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm text-black">Bán Chạy</span>
                                            </div>
                                        )}

                                        {product.videoOverlay && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10">
                                                <span className="text-4xl font-serif-display italic text-white mix-blend-overlay">Chuyển Động</span>
                                            </div>
                                        )}

                                        {product.description && (
                                            <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-black/10 flex items-center justify-center p-8">
                                                <p className="text-white font-serif-display text-2xl italic text-center translate-y-4 transition-all duration-500 group-hover:translate-y-0">{product.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity">
                                        <div>
                                            <h3 className="text-lg font-serif-display italic text-dark-text dark:text-dark-text-primary">{product.name}</h3>
                                            <p className="text-[11px] font-medium uppercase tracking-widest text-luxury-slate-grey dark:text-dark-text-secondary">{product.category}</p>
                                        </div>
                                        <span className="font-mono text-[13px] font-bold text-luxury-onyx dark:text-dark-text-primary tracking-tight">{formatPrice(product.price)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
        </>
    );
}
