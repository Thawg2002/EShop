// components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary text-off-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Logo & About */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold tracking-tighter">
                            XX.II<span className="text-primary italic">.</span>
                        </h2>
                        <p className="text-muted-text max-w-xs leading-relaxed">
                            Elevating your lifestyle through curated fashion and timeless design. Join our collective journey.
                        </p>
                        <div className="flex space-x-5">
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm uppercase tracking-widest font-bold text-primary">Khám phá</h4>
                        <ul className="space-y-4">
                            <li><Link href="/shop" className="text-muted-text hover:text-off-white transition-colors">Cửa hàng</Link></li>
                            <li><Link href="/collections" className="text-muted-text hover:text-off-white transition-colors">Bộ sưu tập</Link></li>
                            <li><Link href="/blog" className="text-muted-text hover:text-off-white transition-colors">Nhật ký</Link></li>
                            <li><Link href="/about" className="text-muted-text hover:text-off-white transition-colors">Về chúng tôi</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div className="space-y-6">
                        <h4 className="text-sm uppercase tracking-widest font-bold text-primary">Hỗ trợ</h4>
                        <ul className="space-y-4">
                            <li><Link href="/contact" className="text-muted-text hover:text-off-white transition-colors">Liên hệ</Link></li>
                            <li><Link href="/shipping" className="text-muted-text hover:text-off-white transition-colors">Giao hàng & Trả hàng</Link></li>
                            <li><Link href="/privacy" className="text-muted-text hover:text-off-white transition-colors">Chính sách bảo mật</Link></li>
                            <li><Link href="/faq" className="text-muted-text hover:text-off-white transition-colors">Câu hỏi thường gặp</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-sm uppercase tracking-widest font-bold text-primary">Bản tin</h4>
                        <p className="text-muted-text text-sm">Đăng ký để nhận thông tin về các bộ sưu tập mới nhất.</p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-off-white transition-colors">
                                <Mail size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-xs text-muted-text">
                        © {currentYear} XX.II Collective. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-muted-text">
                        <span>Powered by Next.js & Antigravity</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
