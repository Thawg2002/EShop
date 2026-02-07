import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
    return (
        <footer className="bg-off-white dark:bg-dark-bg border-t border-black/5 dark:border-dark-border pt-16 pb-8 transition-colors">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Link href="/" className="text-2xl font-serif-display font-medium tracking-widest italic text-dark-text dark:text-dark-text-primary inline-block mb-4">
                            XX.II
                        </Link>
                        <p className="text-sm text-muted-text dark:text-dark-text-secondary max-w-sm leading-relaxed font-light">
                            Nâng tầm phong cách hàng ngày với chất lượng, bền vững và thiết kế vượt thời gian. Tham gia cùng chúng tôi.
                        </p>
                        <div className="mt-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 dark:text-dark-text-primary">Giảm 10% Cho Đơn Hàng Đầu Tiên</h3>
                            <div className="flex gap-2 max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="flex-1 bg-white dark:bg-dark-card dark:text-dark-text-primary border border-gray-200 dark:border-dark-border px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                                />
                                <Button size="sm" className="px-6 py-2 text-xs font-bold uppercase tracking-wider">Đăng Ký</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 dark:text-dark-text-primary">Mua Sắm</h3>
                            <ul className="space-y-3 text-sm text-muted-text dark:text-dark-text-secondary">
                                <li><Link href="/cua-hang" className="hover:text-primary dark:hover:text-primary transition-colors">Sản Phẩm Mới</Link></li>
                                <li><Link href="/cua-hang" className="hover:text-primary dark:hover:text-primary transition-colors">Bán Chạy</Link></li>
                                <li><Link href="/cua-hang" className="hover:text-primary dark:hover:text-primary transition-colors">Phụ Kiện</Link></li>
                                <li><Link href="/cua-hang" className="hover:text-primary dark:hover:text-primary transition-colors">Sale</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 dark:text-dark-text-primary">Công Ty</h3>
                            <ul className="space-y-3 text-sm text-muted-text dark:text-dark-text-secondary">
                                <li><Link href="/lien-he" className="hover:text-primary dark:hover:text-primary transition-colors">Về Chúng Tôi</Link></li>
                                <li><Link href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Tuyển Dụng</Link></li>
                                <li><Link href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Phát Triển Bền Vững</Link></li>
                                <li><Link href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 dark:text-dark-text-primary">Pháp Lý</h3>
                            <ul className="space-y-3 text-sm text-muted-text dark:text-dark-text-secondary">
                                <li><Link href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Điều Khoản</Link></li>
                                <li><Link href="/chinh-sach-bao-mat" className="hover:text-primary dark:hover:text-primary transition-colors">Quyền Riêng Tư</Link></li>
                                <li><Link href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Đổi Trả</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-black/5 dark:border-dark-border text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-muted-text dark:text-dark-text-secondary">© 2024 XX.II FASHION. BẢN QUYỀN THUỘC VỀ XX.II.</p>
                </div>
            </div>
        </footer>
    );
}
