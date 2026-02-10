'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function AuthView({ defaultMode = 'login' }: { defaultMode?: 'login' | 'register' }) {
    const router = useRouter();
    const [isSignIn, setIsSignIn] = useState(defaultMode === 'login');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Giả lập đăng nhập thành công
        router.push('/ho-so');
    };

    return (
        <div className="flex min-h-screen w-full bg-background text-foreground">
            {/* Left Side - Image Section (Hidden on mobile) */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden bg-muted">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070)'
                    }}
                />
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Bottom Text */}
                <div className="absolute bottom-12 left-12 text-white p-6 border-l-2 border-white/30 backdrop-blur-sm bg-black/10">
                    <h3 className="font-sans text-2xl tracking-widest uppercase mb-2 font-bold">Bộ Sưu Tập Mới</h3>
                    <p className="font-light text-sm text-white/80 tracking-wide max-w-md">
                        Khám phá sự giao thoa giữa nghệ thuật đương đại và thời trang cao cấp của XX.II Collective.
                    </p>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col h-full bg-background relative overflow-y-auto">
                {/* Back to Home Link */}
                <div className="absolute top-8 left-8 lg:left-12 z-20">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1 duration-300">
                            arrow_back
                        </span>
                        <span className="uppercase tracking-widest text-[10px] font-bold">TRANG CHỦ</span>
                    </Link>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-32 py-12 animate-in fade-in duration-1000">
                    {/* Logo & Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-foreground text-[28px]">diamond</span>
                            <span className="text-4xl font-bold tracking-[0.25em] text-foreground">XX.II</span>
                        </div>
                        <h2 className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase border-b border-border pb-4 inline-block px-4">
                            Quyền Truy Cập Thành Viên
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-12 relative border-b border-border">
                        <button
                            onClick={() => setIsSignIn(true)}
                            className={`flex-1 pb-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors relative ${isSignIn ? 'text-foreground' : 'text-muted-foreground/40 hover:text-muted-foreground'
                                }`}
                        >
                            Đăng Nhập
                            {isSignIn && (
                                <motion.span layoutId="auth-tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"></motion.span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsSignIn(false)}
                            className={`flex-1 pb-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors relative ${!isSignIn ? 'text-foreground' : 'text-muted-foreground/40 hover:text-muted-foreground'
                                }`}
                        >
                            Đăng Ký
                            {!isSignIn && (
                                <motion.span layoutId="auth-tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"></motion.span>
                            )}
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="peer block w-full border-0 border-b border-border bg-transparent py-4 text-foreground focus:border-primary focus:ring-0 text-sm transition-all duration-300"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-0 block text-[10px] tracking-widest uppercase text-muted-foreground transition-all duration-300 pointer-events-none ${email ? '-top-2 text-[8px] text-primary font-bold' : 'top-4'
                                    }`}
                            >
                                Email
                            </label>
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mật khẩu"
                                required
                                className="peer block w-full border-0 border-b border-border bg-transparent py-4 text-foreground focus:border-primary focus:ring-0 text-sm transition-all duration-300 pr-10"
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-0 block text-[10px] tracking-widest uppercase text-muted-foreground transition-all duration-300 pointer-events-none ${password ? '-top-2 text-[8px] text-primary font-bold' : 'top-4'
                                    }`}
                            >
                                Mật khẩu
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-4 text-muted-foreground/40 hover:text-foreground transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showPassword ? 'visibility' : 'visibility_off'}
                                </span>
                            </button>
                        </div>

                        {isSignIn && (
                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-0" />
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">Ghi nhớ đăng nhập</span>
                                </label>
                                <a href="#" className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">Quên mật khẩu?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-foreground text-background py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl hover:opacity-90 transition-all duration-300"
                        >
                            {isSignIn ? 'Đăng Nhập' : 'Đăng Ký'}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                            <div className="relative flex justify-center text-[8px] uppercase tracking-widest bg-background px-4 text-muted-foreground/40 font-bold">Hoặc tiếp tục với</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-3 py-3 border border-border rounded-xl hover:bg-muted/30 transition-all group">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-3 py-3 border border-border rounded-xl hover:bg-muted/30 transition-all group">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Facebook</span>
                            </button>
                        </div>
                    </form>

                    <p className="mt-12 text-center text-[8px] text-muted-foreground/40 uppercase tracking-[0.1em] leading-relaxed">
                        Bằng cách đăng nhập, bạn đồng ý với <a href="#" className="underline hover:text-foreground">Điều khoản</a> & <a href="#" className="underline hover:text-foreground">Chính sách bảo mật</a> của XX.II Collective.
                    </p>
                </div>
            </div>
        </div>
    );
}
