// components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        discover: [
            { name: 'Bộ sưu tập mới', href: '/women' },
            { name: 'Sản phẩm nam', href: '/men' },
            { name: 'Đồ da cao cấp', href: '/leather' },
            { name: 'Trang sức', href: '/jewelry' },
        ],
        support: [
            { name: 'Liên hệ', href: '/lien-he' },
            { name: 'Giao hàng & Trả hàng', href: '/lien-he' },
            { name: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
            { name: 'Điều khoản sử dụng', href: '/chinh-sach-bao-mat' },
        ],
        company: [
            { name: 'Về XX.II Collective', href: '/lien-he' },
            { name: 'Tin tức & Nhật ký', href: '/tin-tuc' },
            { name: 'Cửa hàng', href: '/cua-hang' },
            { name: 'Tuyển dụng', href: '/lien-he' },
        ]
    };

    return (
        <footer className="bg-white dark:bg-[#0a0a0a] border-t border-black/[0.03] dark:border-white/[0.03] pt-28 pb-12 transition-all duration-700">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-serif tracking-tight text-black dark:text-white">
                                XX.II<span className="italic opacity-20"> Collective</span>
                            </h2>
                            <p className="text-[13px] text-zinc-500 max-w-sm leading-[1.8] font-medium tracking-tight">
                                Nâng tầm phong cách sống qua thời trang được tuyển chọn và thiết kế vượt thời gian. Một biểu tượng của sự tinh tế và đẳng cấp đương đại.
                            </p>
                        </div>
                        <div className="flex space-x-8">
                            <Link href="#" className="text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-500"><Instagram size={18} strokeWidth={1.5} /></Link>
                            <Link href="#" className="text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-500"><Facebook size={18} strokeWidth={1.5} /></Link>
                            <Link href="#" className="text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-500"><Twitter size={18} strokeWidth={1.5} /></Link>
                            <Link href="#" className="text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-500"><Youtube size={18} strokeWidth={1.5} /></Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 dark:text-white/30">Khám phá</h4>
                        <ul className="space-y-4">
                            {footerLinks.discover.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[13px] font-medium tracking-tight text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 dark:text-white/30">Hỗ trợ</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[13px] font-medium tracking-tight text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 dark:text-white/30">Bản tin</h4>
                        <div className="space-y-6">
                            <p className="text-[12px] text-zinc-500 font-medium leading-relaxed">
                                Đăng ký để nhận thông tin về các bộ sưu tập sớm nhất.
                            </p>
                            <form className="relative group max-w-[240px]">
                                <input
                                    type="email"
                                    placeholder="ĐỊA CHỈ EMAIL"
                                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 px-0 py-3 text-[10px] font-bold tracking-[0.2em] outline-none focus:border-black dark:focus:border-white transition-all duration-500 placeholder:text-zinc-300"
                                />
                                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white transition-all">
                                    <ArrowRight size={16} strokeWidth={1.5} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/[0.03] dark:border-white/[0.03] pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-8">
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                            © {currentYear} XX.II COLLECTIVE
                        </p>
                        <div className="hidden md:flex gap-6">
                            <Link href="#" className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-300 hover:text-zinc-500 transition-colors">Privacy</Link>
                            <Link href="#" className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-300 hover:text-zinc-500 transition-colors">Terms</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-zinc-200 dark:text-zinc-800 italic">
                            Architecture in Fashion
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
