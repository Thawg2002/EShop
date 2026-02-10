'use client';

import { useState } from 'react';

export function ContactView() {
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
        <main className="flex-1 w-full bg-background text-foreground pt-24 pb-16 overflow-x-hidden transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                    <div>
                        <span className="text-muted-foreground font-bold uppercase text-[11px] tracking-[0.15em] mb-8 block">Liên Hệ</span>
                        <h1 className="text-6xl md:text-[8vw] font-bold text-foreground mb-12 leading-[0.85] tracking-tight">
                            Dịch Vụ <br /> <span className="opacity-30">Khách Hàng</span>
                        </h1>
                        <p className="text-base text-muted-foreground mb-12 max-w-sm leading-relaxed font-normal">
                            Đội ngũ tư vấn chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn về phong cách, giao hàng và quản lý đơn hàng.
                        </p>

                        <div className="space-y-10">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="material-symbols-outlined text-muted-foreground/40">storefront</span>
                                    <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-muted-foreground italic">Showroom</h3>
                                </div>
                                <p className="text-sm text-foreground pl-9 font-bold">
                                    152 Wooster Street<br />
                                    SoHo, New York, NY 10012
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="material-symbols-outlined text-muted-foreground/40">mail</span>
                                    <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-muted-foreground italic">Email</h3>
                                </div>
                                <p className="text-sm text-foreground pl-10 font-medium">
                                    concierge@xxii.com
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="material-symbols-outlined text-muted-foreground/40">call</span>
                                    <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-muted-foreground italic">Điện Thoại</h3>
                                </div>
                                <p className="text-sm text-foreground pl-10 font-medium">
                                    +1 (212) 555-0199
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 backdrop-blur-sm border border-border p-8 md:p-12 lg:p-16 rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Họ</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-foreground border-0 border-b border-border focus:ring-0 focus:border-primary px-0 py-3 text-sm font-bold uppercase tracking-wider transition-all"
                                        placeholder="Nguyễn"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Tên</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-foreground border-0 border-b border-border focus:ring-0 focus:border-primary px-0 py-3 text-sm font-bold uppercase tracking-wider transition-all"
                                        placeholder="Văn A"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent text-foreground border-0 border-b border-border focus:ring-0 focus:border-primary px-0 py-3 text-sm font-bold uppercase tracking-wider transition-all"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4 italic">Tin Nhắn</label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-transparent text-foreground border-0 border-b border-border focus:ring-0 focus:border-primary px-0 py-4 text-sm resize-none font-normal tracking-wide placeholder:text-muted-foreground/30 transition-all"
                                    placeholder="Chúng tôi có thể giúp gì cho bạn?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-14 bg-foreground text-background dark:bg-foreground dark:text-background text-[11px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-3 rounded-xl"
                            >
                                <span className="material-symbols-outlined text-lg">send</span>
                                Gửi Tin Nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
