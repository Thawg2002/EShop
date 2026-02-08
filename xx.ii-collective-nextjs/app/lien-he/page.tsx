'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16 overflow-x-hidden">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                        {/* Info Section */}
                        <div>
                            <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase text-[11px] tracking-[0.15em] mb-8 block italic">Liên Hệ</span>
                            <h1 className="text-6xl md:text-[8vw] font-serif font-medium text-zinc-950 dark:text-zinc-50 mb-12 leading-[0.85] tracking-tight">
                                Dịch Vụ <br /> <span className="italic opacity-30">Khách Hàng</span>
                            </h1>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-12 max-w-sm leading-relaxed font-normal">
                                Đội ngũ tư vấn chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn về phong cách, giao hàng và quản lý đơn hàng.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="material-symbols-outlined text-zinc-300">storefront</span>
                                        <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-zinc-400 dark:text-zinc-500 italic">Showroom</h3>
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 pl-9 font-bold">
                                        152 Wooster Street<br />
                                        SoHo, New York, NY 10012
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="material-symbols-outlined text-zinc-300">mail</span>
                                        <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-zinc-400 dark:text-zinc-500 italic">Email</h3>
                                    </div>
                                    <p className="text-sm text-zinc-950 dark:text-zinc-50 pl-10 font-medium">
                                        concierge@xxii.com
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="material-symbols-outlined text-zinc-300">call</span>
                                        <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-zinc-400 dark:text-zinc-500 italic">Điện Thoại</h3>
                                    </div>
                                    <p className="text-sm text-zinc-950 dark:text-zinc-50 pl-10 font-medium">
                                        +1 (212) 555-0199
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-off-white/50 dark:bg-dark-card/50 backdrop-blur-sm border border-black/5 dark:border-dark-border p-8 md:p-12 lg:p-16">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">Họ</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-zinc-950 dark:text-zinc-50 border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-zinc-950 dark:focus:border-white px-0 py-3 text-sm font-bold uppercase tracking-wider"
                                            placeholder="Nguyễn"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">Tên</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-zinc-950 dark:text-zinc-50 border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-zinc-950 dark:focus:border-white px-0 py-3 text-sm font-bold uppercase tracking-wider"
                                            placeholder="Văn A"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent text-zinc-950 dark:text-zinc-50 border-0 border-b border-zinc-200 dark:border-zinc-800 focus:ring-0 focus:border-zinc-950 dark:focus:border-white px-0 py-3 text-sm font-bold uppercase tracking-wider"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4 italic">Tin Nhắn</label>
                                    <textarea
                                        rows={5}
                                        className="w-full bg-transparent text-zinc-950 dark:text-zinc-50 border-0 border-b border-zinc-100 dark:border-zinc-900 focus:ring-0 focus:border-zinc-950 dark:focus:border-white px-0 py-4 text-sm resize-none font-normal tracking-wide placeholder:text-zinc-300"
                                        placeholder="Chúng tôi có thể giúp gì cho bạn?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-14 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-lg">send</span>
                                    Gửi Tin Nhắn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
