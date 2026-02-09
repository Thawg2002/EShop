import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 transition-colors border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Link href="/" className="text-3xl font-bold tracking-tighter text-white inline-block mb-6 uppercase">
                            XX.II
                        </Link>
                        <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-normal">
                            Nâng tầm phong cách hàng ngày với chất lượng, bền vững và thiết kế vượt thời gian. Tham gia cùng chúng tôi để nhận những cập nhật mới nhất.
                        </p>
                        <div className="mt-10">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4 text-zinc-200">Giảm 10% Cho Đơn Hàng Đầu Tiên</h3>
                            <div className="flex gap-0 max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600"
                                />
                                <Button className="bg-white text-black hover:bg-zinc-200 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.3em] rounded-none h-auto">Đăng Ký</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7 pt-2">
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-500">Mua Sắm</h3>
                            <ul className="space-y-4 text-xs tracking-widest text-zinc-300 font-bold uppercase">
                                <li><Link href="/cua-hang" className="hover:text-white transition-colors">Sản Phẩm Mới</Link></li>
                                <li><Link href="/cua-hang" className="hover:text-white transition-colors">Bán Chạy</Link></li>
                                <li><Link href="/cua-hang" className="hover:text-white transition-colors">Phụ Kiện</Link></li>
                                <li><Link href="/cua-hang" className="hover:text-white transition-colors">Sale</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-500">Công Ty</h3>
                            <ul className="space-y-4 text-xs tracking-widest text-zinc-300 font-bold uppercase">
                                <li><Link href="/lien-he" className="hover:text-white transition-colors">Về Chúng Tôi</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Tuyển Dụng</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Phát Triển Bền Vững</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-500">Pháp Lý</h3>
                            <ul className="space-y-4 text-xs tracking-widest text-zinc-300 font-bold uppercase">
                                <li><Link href="#" className="hover:text-white transition-colors">Điều Khoản</Link></li>
                                <li><Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">Quyền Riêng Tư</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Đổi Trả</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center">
                    <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-zinc-500">© 2026 XX.II FASHION. BẢN QUYỀN THUỘC VỀ XX.II.</p>
                </div>
            </div>
        </footer>
    );
}
