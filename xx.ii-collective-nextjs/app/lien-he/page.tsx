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
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                        {/* Info Section */}
                        <div>
                            <span className="text-primary font-bold uppercase text-[10px] tracking-widest mb-6 block">Liên Hệ</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-8 leading-[0.95]">
                                Dịch Vụ<br />Khách Hàng
                            </h1>
                            <p className="text-sm text-muted-text dark:text-dark-text-secondary mb-12 max-w-md leading-relaxed font-serif-display">
                                Đội ngũ tư vấn chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn về phong cách, giao hàng và quản lý đơn hàng.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-primary">storefront</span>
                                        <h3 className="text-xs uppercase tracking-widest font-bold text-dark-text dark:text-dark-text-primary">Showroom</h3>
                                    </div>
                                    <p className="text-sm text-muted-text dark:text-dark-text-secondary pl-9">
                                        152 Wooster Street<br />
                                        SoHo, New York, NY 10012
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-primary">mail</span>
                                        <h3 className="text-xs uppercase tracking-widest font-bold text-dark-text dark:text-dark-text-primary">Email</h3>
                                    </div>
                                    <p className="text-sm text-muted-text dark:text-dark-text-secondary pl-9">
                                        concierge@xxii.com
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-primary">call</span>
                                        <h3 className="text-xs uppercase tracking-widest font-bold text-dark-text dark:text-dark-text-primary">Điện Thoại</h3>
                                    </div>
                                    <p className="text-sm text-muted-text dark:text-dark-text-secondary pl-9">
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
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-text dark:text-dark-text-secondary mb-3">Họ</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent dark:text-dark-text-primary border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-primary px-0 py-3 text-sm"
                                            placeholder="Nguyễn"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-text dark:text-dark-text-secondary mb-3">Tên</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent dark:text-dark-text-primary border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-primary px-0 py-3 text-sm"
                                            placeholder="Văn A"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-text dark:text-dark-text-secondary mb-3">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent dark:text-dark-text-primary border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-primary px-0 py-3 text-sm"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-text dark:text-dark-text-secondary mb-3">Tin Nhắn</label>
                                    <textarea
                                        rows={5}
                                        className="w-full bg-transparent dark:text-dark-text-primary border-0 border-b border-black/10 dark:border-dark-border focus:ring-0 focus:border-primary px-0 py-3 text-sm resize-none"
                                        placeholder="Chúng tôi có thể giúp gì cho bạn?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-14 bg-dark-text dark:bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary dark:hover:bg-primary-hover transition-colors flex items-center justify-center gap-3"
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
