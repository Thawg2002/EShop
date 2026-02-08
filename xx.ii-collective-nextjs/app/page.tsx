import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProductSection } from '@/components/features/product-section';
import { HeroSlider } from '@/components/features/hero-slider';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg overflow-x-hidden">
                {/* Hero Slider */}
                <HeroSlider />

                <section className="relative px-6 py-16 lg:px-12 min-h-[85vh] flex items-center">

                    <div className="mx-auto max-w-[1400px] w-full relative">
                        <div className="flex flex-col items-center mb-12 space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-luxury-warm-grey">The Discovery</span>
                            <h2 className="font-serif-display text-4xl md:text-6xl text-luxury-onyx leading-tight text-center italic">Sự Khởi Đầu Mới</h2>
                            <div className="w-12 h-[1px] bg-black/10"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                            {/* Main Luminous Banner (Left) */}
                            <div className="group relative lg:col-span-8">
                                <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-black/5">
                                    <img
                                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
                                        alt="Luminous Promotion"
                                        className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700"></div>
                                </div>
                                {/* Editorial Card - Always Visible */}
                                <div className="absolute -bottom-12 left-[-20px] bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:translate-y-[-20px] z-10 max-w-sm md:max-w-md">
                                    <div className="transition-transform duration-500 group-hover:scale-105 origin-left">
                                        <h3 className="text-3xl font-serif-display italic text-luxury-onyx mb-4">Ánh Sáng Champagne</h3>
                                        <p className="text-[11px] font-medium tracking-[0.2em] text-luxury-slate-grey uppercase leading-relaxed mb-8">Khám phá vẻ đẹp vĩnh cửu trong từng đường nét thiết kế mới nhấn mạnh vào sự sang trọng và lôi cuốn.</p>
                                        <Link href="/cua-hang" className="inline-block relative overflow-hidden group/btn px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-dark-text border border-black/10">
                                            <span className="relative z-10 transition-colors group-hover/btn:text-white">Khám phá ngay</span>
                                            <div className="absolute inset-0 bg-dark-text translate-y-full transition-transform duration-500 group-hover/btn:translate-y-0"></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Accented Banner (Right) */}
                            <div className="group relative lg:col-span-4 mt-12 lg:mt-32">
                                <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl border border-black/5">
                                    <img
                                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974"
                                        alt="Celestial Detail"
                                        className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700"></div>
                                    <div className="absolute -bottom-10 right-[-20px] bg-luxury-cream p-12 shadow-2xl transition-transform duration-700 group-hover:translate-y-[-20px] z-10">
                                        <div className="transition-transform duration-500 group-hover:scale-110 origin-right">
                                            <h4 className="text-xl font-serif-display text-luxury-onyx mb-2 italic">Signature Style</h4>
                                            <p className="text-[11px] font-medium tracking-[0.2em] text-luxury-slate-grey uppercase">Chi tiết tạo nên đẳng cấp</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Legacy - Pure Silhouette (typography & Overlap Redesigned) */}
                <section className="bg-luxury-black text-white min-h-[90vh] lg:min-h-screen flex items-center relative overflow-hidden group/legacy">
                    {/* Background Decorative Text */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[22vw] font-serif-display italic text-white/[0.03] whitespace-nowrap pointer-events-none select-none z-0">
                        TIMLESS ELEGANCE
                    </div>

                    <div className="mx-auto max-w-[1400px] px-6 lg:px-12 w-full relative z-10 py-20 lg:py-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32">
                            {/* Left Content */}
                            <div className="space-y-10 order-2 lg:order-1">
                                <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-serif-display leading-none tracking-tighter">
                                    <span className="block italic text-luxury-warm-grey transition-all duration-1000 group-hover/legacy:translate-x-4">Hành Trình</span>
                                    <span className="block ml-8 md:ml-16 lg:ml-24 transition-all duration-1000 group-hover/legacy:-translate-x-4">Vĩnh Cửu</span>
                                </h2>
                                <div className="space-y-8 ml-8 md:ml-16 lg:ml-24">
                                    <p className="max-w-md text-[13px] md:text-sm font-light leading-relaxed tracking-[0.2em] text-luxury-warm-grey border-l border-white/20 pl-8 uppercase italic">
                                        XX.II Collective định nghĩa lại sự sang trọng qua lăng kính của nghệ thuật và di sản. Mỗi sản phẩm là sự kết giao giữa truyền thống hàng trăm năm và tư duy thiết kế đương đại.
                                    </p>
                                    <Link href="/cua-hang" className="inline-flex items-center gap-8 group/btn transition-transform hover:translate-x-4 duration-500">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Khám phá di sản</span>
                                        <div className="h-[1px] w-12 bg-white/40 group-hover/btn:w-24 transition-all duration-700"></div>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Imagery */}
                            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-[500px] aspect-[4/5] group/img">
                                    {/* Main Image */}
                                    <div className="absolute inset-0 overflow-hidden shadow-2xl transition-all duration-1000 group-hover/img:scale-95 group-hover/img:brightness-75 opacity-80">
                                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070" className="h-full w-full object-cover" alt="Main Silhouette" />
                                    </div>
                                    {/* Overlap Focus Image */}
                                    <div className="absolute top-0 right-0 w-[85%] aspect-[3/4] overflow-hidden border-[12px] border-luxury-black shadow-2xl translate-x-12 translate-y-[-10%] transition-all duration-1000 group-hover/img:translate-x-4 group-hover/img:translate-y-4 group-hover/img:scale-105 z-20">
                                        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070" className="h-full w-full object-cover" alt="Focus Silhouette" />
                                    </div>
                                    {/* Floating Branding Element */}
                                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white p-6 flex flex-col items-center justify-center rounded-full shadow-2xl z-30 transition-transform duration-700 group-hover/img:-translate-y-4 group-hover/img:rotate-12">
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-black text-center mb-1 leading-none">Established</span>
                                        <span className="text-xl font-serif-display italic text-black">1886</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Celestial Collection - Featured Trio (Viewport Optimized) */}
                <section className="bg-white min-h-[80vh] flex items-center px-6 lg:px-12 relative overflow-hidden group/section">
                    {/* Background Editorial Watermark */}
                    <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 text-[25vw] font-serif-display italic text-black/[0.02] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter">
                        BỘ SƯU TẬP
                    </div>

                    <div className="mx-auto max-w-[1400px] w-full relative z-10 pt-10 lg:pt-14 pb-12 lg:pb-16">
                        {/* Featured Header */}
                        <div className="flex flex-col items-center mb-6 space-y-2 text-center">
                            <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-luxury-slate-grey">Hào Quang Của Sự Hoàn Mỹ</span>
                            <h2 className="font-serif-display text-3xl md:text-5xl text-luxury-onyx italic leading-tight">Tinh Hoa Hội Tụ</h2>
                            <div className="w-10 h-[1px] bg-black/5"></div>
                        </div>

                        {/* Featured Trio (The Highlights) */}
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {PRODUCTS.slice(4, 7).map((product, index) => (
                                <div
                                    key={product.id}
                                    className="group relative transition-all duration-1000"
                                >
                                    {/* Card Container - Tighter Aspect for Viewport Fitting */}
                                    <div className="relative aspect-[10/12] w-full overflow-hidden bg-white shadow-sm transition-shadow duration-700 hover:shadow-2xl">
                                        {/* Background Image Layer */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition-all duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                        {/* Floating Glassmorphism Info Card - Editorial Redesign */}
                                        <div className="absolute bottom-4 left-4 right-4 p-6 bg-black/20 backdrop-blur-3xl border border-white/10 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-1000">
                                            <div className="relative">
                                                {/* Background Number Accent */}
                                                <span className="absolute -top-4 -left-2 text-6xl font-serif-display text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                                                    0{index + 1}
                                                </span>

                                                <div className="relative z-10 flex flex-col gap-4">
                                                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                                        <div className="space-y-1">
                                                            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 mb-1 block">Selected Piece</span>
                                                            <h3 className="text-xl md:text-2xl font-serif-display italic text-white leading-tight tracking-wide">{product.name}</h3>
                                                        </div>
                                                        <div className="text-right pb-1">
                                                            <p className="text-lg md:text-xl font-medium tracking-tighter text-white/90">
                                                                <span className="text-[10px] uppercase tracking-widest text-white/40 mr-2">VND</span>
                                                                {product.price.toLocaleString('vi-VN')}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></div>
                                                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">Limited Release</span>
                                                        </div>
                                                        <Link href={`/cua-hang/${product.id}`} className="flex items-center gap-3 group/btn">
                                                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white hover:text-gold-400 transition-colors">Details</span>
                                                            <span className="material-symbols-outlined text-[14px] text-white/40 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Premium Tag */}
                                        <div className="absolute top-6 right-6 w-10 h-10 border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-sm">
                                            <span className="text-[9px] font-bold text-white tracking-widest vertical-text rotate-180 uppercase">Highlight</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 px-2 flex items-center justify-between group/h-label cursor-default">
                                        <div className="flex items-center gap-4">
                                            <div className="h-[1px] w-12 bg-black/10 transition-all duration-1000 group-hover/section:w-20 group-hover/section:bg-gold-600"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-luxury-onyx/40 group-hover/section:text-luxury-onyx transition-colors duration-700">
                                                Archive <span className="text-gold-600 ml-1">0{index + 1}</span>
                                            </span>
                                        </div>
                                        <span className="text-[8px] font-medium uppercase tracking-widest text-black/20 opacity-0 group-hover/section:opacity-100 transition-all duration-1000 delay-300">Highlight Piece</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Discover More CTA - Linked to top section */}
                        <div className="text-center">
                            <Link href="/cua-hang" className="inline-flex items-center gap-6 group">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-onyx">Khám phá toàn bộ bộ sưu tập</span>
                                <div className="h-[1px] w-16 bg-black/20 transition-all duration-500 group-hover:w-32 origin-left"></div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 3B: Extended Collection (Common Component) */}
                <section className="bg-gray-50/50 min-h-[80vh] flex items-center px-6 lg:px-12 relative overflow-hidden">
                    <div className="mx-auto max-w-[1400px] w-full pt-10 lg:pt-14 pb-12 lg:pb-16">
                        <ProductSection
                            title="Bộ Sưu Tập Mở Rộng"
                            products={[...PRODUCTS.slice(0, 4), ...PRODUCTS.slice(7)]}
                        />
                    </div>
                </section>

                <div className="relative overflow-hidden bg-luxury-black py-12 text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                    </div>
                    <h4 className="text-xl font-serif-display italic text-white mb-6">Trải nghiệm dịch vụ cá nhân hóa dành riêng cho bạn</h4>
                    <Link href="/cua-hang" className="inline-block bg-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black hover:bg-gray-100 transition-all shadow-xl">
                        Đặt lịch tư vấn ngay
                    </Link>
                </div>

                {/* Section 4: Elite Services (Editorial Narrative) */}
                <section className="bg-white min-h-[85vh] flex items-center px-6 lg:px-12 relative overflow-hidden">
                    <div className="mx-auto max-w-[1400px] w-full py-12 lg:py-16">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                            {/* Narrative Column */}
                            <div className="lg:w-1/3 flex flex-col justify-center space-y-10">
                                <div className="space-y-4">
                                    <div className="text-6xl font-serif-display text-black/10">01.</div>
                                    <h3 className="text-4xl md:text-5xl font-serif-display italic text-luxury-onyx leading-tight">Trải Nghiệm Thượng Lưu</h3>
                                    <p className="text-[11px] font-medium text-luxury-slate-grey leading-relaxed tracking-widest uppercase">
                                        Chúng tôi không chỉ bán sản phẩm, chúng tôi mang tới một phong cách sống. Những đặc quyền dành riêng cho thành viên XX.II Collective.
                                    </p>
                                </div>
                                <div className="h-[1px] w-full bg-black/10"></div>
                                <div className="space-y-4">
                                    <div className="text-6xl font-serif-display text-black/10">02.</div>
                                    <h3 className="text-4xl md:text-5xl font-serif-display italic text-luxury-onyx leading-tight">Di Sản Toàn Cầu</h3>
                                    <p className="text-[11px] font-medium text-luxury-slate-grey leading-relaxed tracking-widest uppercase">
                                        Mạng lưới showroom và đối tác chiến lược tại các kinh đô thời trang lớn nhất thế giới, sẵn sàng phục vụ bạn.
                                    </p>
                                </div>
                            </div>

                            {/* visual Column (Asymmetrical Grid) */}
                            <div className="lg:w-2/3 grid grid-cols-12 gap-8 items-start">
                                <div className="col-span-12 md:col-span-7 group relative aspect-[4/5] overflow-hidden shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070" className="h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="Collection 1" />
                                    <div className="absolute inset-0 bg-gold-900/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                                    <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 glassmorphism-card translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                        <p className="text-xs font-bold text-white uppercase tracking-[0.4em]">Membership Program</p>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 mt-12 group relative aspect-[4/5] overflow-hidden shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070" className="h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="Collection 2" />
                                    <div className="absolute inset-0 bg-gold-900/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                                    <div className="absolute top-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 glassmorphism-card -translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                        <p className="text-xs font-bold text-white uppercase tracking-[0.4em]">International Stores</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Heritage (Artistic Narrative) */}
                <section className="bg-white min-h-[85vh] flex items-center px-6 lg:px-12 relative overflow-hidden text-black">
                    {/* Artistic Watermark */}
                    <div className="absolute top-[20%] left-[-5%] text-[30vw] font-serif-display italic text-gray-50/50 pointer-events-none select-none z-0">
                        Heritage
                    </div>

                    <div className="mx-auto max-w-[1400px] w-full relative z-10 py-12 lg:py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
                            <div className="lg:col-span-7 relative">
                                <div className="relative group overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070" alt="Heritage" className="w-full h-[500px] lg:h-[600px] object-cover rounded-sm shadow-2xl transition-transform duration-[3000ms] group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gold-900/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                                </div>
                                {/* Layered Secondary Image */}
                                <div className="absolute -bottom-12 -right-12 w-1/2 overflow-hidden border-[15px] border-white shadow-2xl hidden lg:block">
                                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" alt="Heritage Detail" className="w-full object-cover" />
                                </div>
                                {/* Artistic Founding Year */}
                                <div className="absolute -top-12 -left-12 text-[10rem] font-serif-display text-gold-100/40 select-none hidden lg:block">1886</div>
                            </div>
                            <div className="lg:col-span-5 space-y-12">
                                <div className="space-y-4">
                                    <div className="w-12 h-[1px] bg-black/20"></div>
                                    <h2 className="font-serif-display text-5xl md:text-7xl leading-tight italic text-luxury-onyx">Hành Trình<br />Vĩnh Cửu</h2>
                                </div>
                                <div className="space-y-8">
                                    <p className="text-sm font-medium text-luxury-slate-grey leading-relaxed tracking-[0.2em] relative uppercase">
                                        <span className="absolute -left-12 top-2 w-8 h-[1px] bg-black/20"></span>
                                        XX.II Collective định nghĩa lại sự sang trọng qua lăng kính của nghệ thuật và di sản. Mỗi sản phẩm là sự kết giao giữa truyền thống hàng trăm năm và tư duy thiết kế đương đại.
                                    </p>
                                    <p className="text-sm font-medium text-luxury-slate-grey leading-relaxed tracking-[0.2em] uppercase">
                                        Chúng tôi tin rằng sự hoàn mỹ nằm ở những chi tiết nhỏ nhất, những đường kim mũi chỉ mang theo tâm hồn của người nghệ nhân.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-12 pt-8">
                                    <Link href="/lien-he" className="group relative px-16 py-6 overflow-hidden bg-black">
                                        <span className="relative z-10 text-xs font-bold uppercase tracking-[0.6em] text-white">Khám phá di sản</span>
                                        <div className="absolute inset-0 bg-luxury-onyx translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
                                    </Link>
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 overflow-hidden transition-all duration-700">
                                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-black/80">Joined by 5k+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 6: Signature Trust (Redesigned Editorial Full-Screen) */}
                <section className="bg-white min-h-[80vh] flex items-center px-6 lg:px-12 relative overflow-hidden">
                    {/* Large Editorial Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif-display italic text-gray-50/70 pointer-events-none select-none z-0 whitespace-nowrap">
                        AUTHENTICITY
                    </div>

                    <div className="mx-auto max-w-[1400px] w-full relative z-10 py-12 lg:py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-32">
                            {/* Left Column: Narrative Hub */}
                            <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-luxury-warm-grey">Premium Assurance</span>
                                    <h2 className="text-5xl md:text-6xl font-serif-display italic leading-tight text-luxury-onyx">Niềm Tin<br />Tuyệt Đối</h2>
                                </div>
                                <p className="text-sm font-medium text-luxury-slate-grey leading-relaxed tracking-widest uppercase italic max-w-md mx-auto lg:mx-0">
                                    "Mỗi sản phẩm là một lời cam kết về chất lượng và sự tận tâm dành cho những quý chủ nhân xứng tầm."
                                </p>
                                <div className="h-[1px] w-24 bg-black/10 mx-auto lg:mx-0"></div>
                            </div>

                            {/* Right Column: Balanced Badge Grid */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20 lg:gap-y-24">
                                {/* Badge 1 */}
                                <div className="flex items-center gap-8 group">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl text-black/60 transition-all duration-700 group-hover:scale-125">lock</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-serif-display italic text-luxury-onyx">Giao dịch Bảo mật</h4>
                                        <p className="text-[10px] font-bold text-luxury-slate-grey uppercase tracking-[0.2em] leading-snug">Mã hóa chuẩn quốc tế</p>
                                    </div>
                                </div>

                                {/* Badge 2 */}
                                <div className="flex items-center gap-8 group md:translate-y-8">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-[225deg] transition-transform duration-[2500ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-[135deg] transition-transform duration-[2500ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl text-black/60 transition-all duration-700 group-hover:scale-125">card_giftcard</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-serif-display italic text-luxury-onyx">Đóng gói Nghệ thuật</h4>
                                        <p className="text-[10px] font-bold text-luxury-slate-grey uppercase tracking-[0.2em] leading-snug">Hộp quà bespoke cao cấp</p>
                                    </div>
                                </div>

                                {/* Badge 3 */}
                                <div className="flex items-center gap-8 group lg:-translate-x-12">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl text-black/60 transition-all duration-700 group-hover:scale-125">history_edu</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-serif-display italic text-luxury-onyx">Di sản Độc bản</h4>
                                        <p className="text-[10px] font-bold text-luxury-slate-grey uppercase tracking-[0.2em] leading-snug">Chứng nhận sở hữu cá nhân</p>
                                    </div>
                                </div>

                                {/* Badge 4 */}
                                <div className="flex items-center gap-8 group md:translate-y-8 lg:translate-x-8">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-180 transition-transform duration-[3000ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-180 transition-transform duration-[3000ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl text-black/60 transition-all duration-700 group-hover:scale-125">contact_support</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-serif-display italic text-luxury-onyx">Hỗ trợ 24/7</h4>
                                        <p className="text-[10px] font-bold text-luxury-slate-grey uppercase tracking-[0.2em] leading-snug">Trợ lý trợ lý cá nhân</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
