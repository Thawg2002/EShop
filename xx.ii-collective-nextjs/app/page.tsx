import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSlider } from '@/components/features/hero-slider';

export default function HomePage() {

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg overflow-x-hidden">
                {/* Hero Slider */}
                <HeroSlider />

                {/* Section 1: Luminous Discovery (Clean & Focused) */}
                <section className="relative px-6 py-32 lg:px-12">

                    <div className="mx-auto max-w-[1400px] relative">
                        <div className="flex flex-col items-center mb-24 space-y-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-luxury-warm-grey">The Discovery</span>
                            <h2 className="font-serif-display text-5xl md:text-7xl text-luxury-onyx leading-tight text-center italic">Sự Khởi Đầu Mới</h2>
                            <div className="w-24 h-[1px] bg-black/10"></div>
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
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
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
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
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

                {/* Section 2: Signature Silhouette (Typography & Overlap) */}
                <section className="py-40 bg-luxury-black text-white relative overflow-hidden">
                    {/* Background Decorative Text */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-serif-display italic text-white/[0.03] whitespace-nowrap pointer-events-none select-none">
                        TIMLESS ELEGANCE
                    </div>

                    <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative flex flex-col lg:flex-row items-center gap-24">
                        <div className="lg:w-1/2 space-y-12 relative z-10">
                            <h2 className="text-7xl md:text-9xl font-serif-display leading-none">
                                <span className="block italic text-luxury-warm-grey">Pure</span>
                                <span className="block ml-12 md:ml-32">Silhouete</span>
                            </h2>
                            <p className="max-w-md text-sm font-light leading-relaxed tracking-widest text-luxury-warm-grey border-l border-white/20 pl-8 ml-12 md:ml-32">
                                Những thiết kế tôn vinh vóc dáng người phụ nữ hiện đại, tối giản nhưng chứa đựng sự tinh tế tuyệt đối. Mỗi trang phục là một tác phẩm hội họa sống động.
                            </p>
                            <Link href="/cua-hang" className="inline-flex items-center gap-6 ml-12 md:ml-32 group">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white group-hover:text-luxury-warm-grey transition-colors">Xem bộ sưu tập</span>
                                <div className="h-[1px] w-24 bg-white/20 transition-all duration-500 group-hover:w-40"></div>
                            </Link>
                        </div>

                        <div className="lg:w-1/2 relative">
                            {/* Artistic Overlap Images */}
                            <div className="relative z-10 w-full aspect-[3/4] overflow-hidden translate-x-8 translate-y-8">
                                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070" className="h-full w-full object-cover" alt="Overlap 1" />
                            </div>
                            <div className="absolute top-0 right-8 z-20 w-3/4 aspect-[3/4] overflow-hidden border-[15px] border-luxury-black shadow-2xl translate-x-[-20%] translate-y-[-10%] group">
                                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Overlap 2" />
                            </div>
                            {/* Floating Champagne Element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white p-8 flex items-center justify-center rounded-full shadow-2xl z-30">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black text-center">New Season 2024</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Celestial Collection (High-end Product Grid) */}
                <section className="bg-white py-32 px-6 lg:px-12 relative">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col items-start mb-20 space-y-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-warm-grey">Celestial Selection</span>
                            <h2 className="font-serif-display text-4xl md:text-6xl text-luxury-onyx italic">Tinh Hoa Hội Tụ</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            {PRODUCTS.slice(4, 7).map((product) => (
                                <div key={product.id} className="group relative bg-white border border-gray-100 p-[1px] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(197,160,89,0.15)]">
                                    {/* Animated Gold Border */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-gold-300/0 via-gold-300/30 to-gold-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                    <div className="bg-white p-10 relative z-10 flex flex-col h-full">
                                        <div className="relative aspect-[3/4] w-full mb-10 overflow-hidden bg-gray-50">
                                            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            <div className="absolute top-4 right-4 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">Limited</div>
                                        </div>

                                        <div className="space-y-4 mb-10">
                                            <h3 className="text-lg font-bold uppercase tracking-widest text-luxury-onyx group-hover:text-black transition-colors">{product.name}</h3>
                                            <div className="flex items-center gap-4 text-[11px] text-luxury-slate-grey uppercase tracking-widest">
                                                <span>Handcrafted</span>
                                                <div className="w-1 h-1 bg-black/20 rounded-full"></div>
                                                <span>Silk & Wool</span>
                                            </div>
                                            <p className="text-2xl font-serif-display text-luxury-onyx">${product.price}</p>
                                        </div>

                                        <div className="mt-auto space-y-4">
                                            <div className="h-[1px] w-full bg-gray-100"></div>
                                            <Link href={`/cua-hang/${product.id}`} className="flex items-center justify-between group/link">
                                                <span className="text-[11px] font-bold uppercase tracking-widest text-luxury-onyx group-hover/link:translate-x-2 transition-transform">Sở hữu ngay</span>
                                                <span className="material-symbols-outlined text-lg text-black/60">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-24 relative overflow-hidden bg-luxury-black p-16 text-center">
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                            </div>
                            <h4 className="text-2xl font-serif-display italic text-white mb-8">Trải nghiệm dịch vụ cá nhân hóa dành riêng cho bạn</h4>
                            <Link href="/cua-hang" className="inline-block bg-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] text-black hover:bg-gray-100 transition-all shadow-xl">
                                Đặt lịch tư vấn ngay
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 4: Elite Services (Editorial Narrative) */}
                <section className="py-40 px-6 lg:px-12 bg-white relative overflow-hidden">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col lg:flex-row gap-32">
                            {/* Narrative Column */}
                            <div className="lg:w-1/3 flex flex-col justify-center space-y-12">
                                <div className="space-y-6">
                                    <div className="text-6xl font-serif-display text-black/10">01.</div>
                                    <h3 className="text-5xl font-serif-display italic text-luxury-onyx leading-tight">Trải Nghiệm Thượng Lưu</h3>
                                    <p className="text-sm font-medium text-luxury-slate-grey leading-relaxed tracking-widest uppercase">
                                        Chúng tôi không chỉ bán sản phẩm, chúng tôi mang tới một phong cách sống. Những đặc quyền dành riêng cho thành viên XX.II Collective.
                                    </p>
                                </div>
                                <div className="h-[1px] w-full bg-black/10"></div>
                                <div className="space-y-6">
                                    <div className="text-6xl font-serif-display text-black/10">02.</div>
                                    <h3 className="text-5xl font-serif-display italic text-luxury-onyx leading-tight">Di Sản Toàn Cầu</h3>
                                    <p className="text-sm font-medium text-luxury-slate-grey leading-relaxed tracking-widest uppercase">
                                        Mạng lưới showroom và đối tác chiến lược tại các kinh đô thời trang lớn nhất thế giới, sẵn sàng phục vụ bạn.
                                    </p>
                                </div>
                            </div>

                            {/* visual Column (Asymmetrical Grid) */}
                            <div className="lg:w-2/3 grid grid-cols-12 gap-8 items-start">
                                <div className="col-span-12 md:col-span-7 group relative aspect-[3/4] overflow-hidden shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070" className="h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="Collection 1" />
                                    <div className="absolute inset-0 bg-gold-900/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                                    <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 glassmorphism-card translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                        <p className="text-xs font-bold text-white uppercase tracking-[0.4em]">Membership Program</p>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 mt-20 group relative aspect-[3/5] overflow-hidden shadow-2xl">
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
                <section className="bg-white py-60 px-6 lg:px-12 relative overflow-hidden text-black">
                    {/* Artistic Watermark */}
                    <div className="absolute top-[20%] left-[-5%] text-[30vw] font-serif-display italic text-gray-50/50 pointer-events-none select-none z-0">
                        Heritage
                    </div>

                    <div className="mx-auto max-w-[1400px] relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                            <div className="lg:col-span-7 relative">
                                <div className="relative group overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070" alt="Heritage" className="w-full h-[700px] object-cover rounded-sm shadow-2xl transition-transform duration-[3000ms] group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gold-900/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                                </div>
                                {/* Layered Secondary Image */}
                                <div className="absolute -bottom-20 -right-20 w-1/2 overflow-hidden border-[20px] border-white shadow-2xl hidden lg:block">
                                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" alt="Heritage Detail" className="w-full object-cover grayscale" />
                                </div>
                                {/* Artistic Founding Year */}
                                <div className="absolute -top-16 -left-16 text-[15rem] font-serif-display text-gold-100/40 select-none hidden lg:block">1886</div>
                            </div>
                            <div className="lg:col-span-5 space-y-16">
                                <div className="space-y-6">
                                    <div className="w-12 h-[1px] bg-black/20"></div>
                                    <h2 className="font-serif-display text-6xl md:text-8xl leading-tight italic text-luxury-onyx">Hành Trình<br />Vĩnh Cửu</h2>
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
                                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
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

                {/* Section 6: Signature Trust (Editorial Asymmetrical Layout) */}
                <section className="bg-white py-60 px-6 lg:px-12 relative overflow-hidden">
                    {/* Large Editorial Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif-display italic text-gray-50/70 pointer-events-none select-none z-0 whitespace-nowrap">
                        AUTHENTICITY
                    </div>

                    <div className="mx-auto max-w-[1400px] relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-40">
                            {/* Left Column: Narrative Hub */}
                            <div className="lg:w-1/3 space-y-12 text-center lg:text-left">
                                <div className="space-y-6">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-luxury-warm-grey">Premium Assurance</span>
                                    <h2 className="text-5xl md:text-7xl font-serif-display italic leading-tight text-luxury-onyx">Niềm Tin<br />Tuyệt Đối</h2>
                                </div>
                                <p className="text-sm font-medium text-luxury-slate-grey leading-relaxed tracking-widest uppercase italic">
                                    "Mỗi sản phẩm là một lời cam kết về chất lượng và sự tận tâm dành cho những quý chủ nhân xứng tầm."
                                </p>
                                <div className="h-[1px] w-24 bg-black/10 mx-auto lg:mx-0"></div>
                            </div>

                            {/* Right Column: Asymmetrical Floating Badges */}
                            <div className="lg:w-2/3 grid grid-cols-12 gap-y-24 lg:gap-y-32">
                                {/* Badge 1: Top Left */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-12 flex items-center gap-12 group">
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-black/60 transition-all duration-700 group-hover:scale-125">lock</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xl font-serif-display italic text-luxury-onyx">Giao dịch Bảo mật</h4>
                                        <p className="text-[11px] font-bold text-luxury-slate-grey uppercase tracking-[0.3em]">Mã hóa SSL 256-bit chuẩn quốc tế</p>
                                    </div>
                                </div>

                                {/* Badge 2: Mid Right (Pushed) */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-12 flex lg:justify-end items-center gap-12 group lg:translate-x-20">
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-[225deg] transition-transform duration-[2500ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-[135deg] transition-transform duration-[2500ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-black/60 transition-all duration-700 group-hover:scale-125">card_giftcard</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-left">
                                        <h4 className="text-xl font-serif-display italic text-luxury-onyx">Đóng gói Nghệ thuật</h4>
                                        <p className="text-[11px] font-bold text-luxury-slate-grey uppercase tracking-[0.3em]">Hộp quà bespoke cao cấp</p>
                                    </div>
                                </div>

                                {/* Badge 3: Bottom Left (Lowered) */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-12 flex items-center gap-12 group lg:-translate-x-12">
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-90 transition-transform duration-[2000ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-black/60 transition-all duration-700 group-hover:scale-125">history_edu</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xl font-serif-display italic text-luxury-onyx">Di sản Độc bản</h4>
                                        <p className="text-[11px] font-bold text-luxury-slate-grey uppercase tracking-[0.3em]">Chứng nhận sở hữu cá nhân</p>
                                    </div>
                                </div>

                                {/* Badge 4: Deep Right */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-12 flex lg:justify-end items-center gap-12 group lg:translate-x-40">
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <div className="absolute inset-0 border border-black/20 rotate-45 group-hover:rotate-180 transition-transform duration-[3000ms]"></div>
                                        <div className="absolute inset-2 border border-black/5 -rotate-45 group-hover:-rotate-180 transition-transform duration-[3000ms]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-black/60 transition-all duration-700 group-hover:scale-125">contact_support</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-left">
                                        <h4 className="text-xl font-serif-display italic text-luxury-onyx">Hỗ trợ 24/7</h4>
                                        <p className="text-[11px] font-bold text-luxury-slate-grey uppercase tracking-[0.3em]">Đội ngũ chuyên gia trợ lý cá nhân</p>
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
