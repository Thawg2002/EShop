'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignIn) {
            router.push('/profile');
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Image Section (Hidden on mobile) */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden bg-gray-100">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070)'
                    }}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Bottom Text */}
                <div className="absolute bottom-12 left-12 text-white p-6 border-l-2 border-white/30 backdrop-blur-sm bg-black/10">
                    <h3 className="font-serif-display text-2xl tracking-widest uppercase mb-2">Bộ Sưu Tập Mới</h3>
                    <p className="font-light text-sm text-white/80 tracking-wide max-w-md">
                        Khám phá sự giao thoa giữa nghệ thuật đương đại và thời trang cao cấp.
                    </p>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col h-full bg-white relative overflow-y-auto">
                {/* Back to Shop Link */}
                <div className="absolute top-8 left-8 lg:left-12 z-20">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors duration-300"
                    >
                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1 duration-300">
                            arrow_back
                        </span>
                        <span className="uppercase tracking-widest text-[10px] font-bold">QUAY LẠI CỬA HÀNG</span>
                    </Link>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-32 py-12 animate-in fade-in duration-1000">
                    {/* Logo & Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-[28px]">diamond</span>
                            <span className="text-4xl font-serif-display font-bold tracking-[0.25em] text-gray-900">XX.II</span>
                        </div>
                        <h2 className="text-sm font-medium tracking-[0.3em] text-gray-500 uppercase border-b border-gray-100 pb-4 inline-block px-4">
                            Quyền Truy Cập Thành Viên
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-12 relative border-b border-gray-100">
                        <button
                            onClick={() => setIsSignIn(true)}
                            className={`flex-1 pb-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors relative ${isSignIn ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Đăng Nhập
                            {isSignIn && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsSignIn(false)}
                            className={`flex-1 pb-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors relative ${!isSignIn ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Đăng Ký
                            {!isSignIn && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>
                            )}
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Input with Floating Label */}
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                autoComplete="email"
                                className="peer block w-full border-0 border-b border-gray-300 bg-transparent py-2.5 text-gray-900 focus:border-primary focus:ring-0 sm:text-sm transition-all duration-300"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-0 block text-[11px] tracking-widest uppercase text-gray-500 transition-all duration-300 cursor-text pointer-events-none ${email ? '-top-4 text-[9px] text-primary font-bold' : 'top-2.5 text-[11px]'
                                    }`}
                            >
                                Email
                            </label>
                        </div>

                        {/* Password Input with Floating Label */}
                        <div className="relative group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mật khẩu"
                                required
                                autoComplete="current-password"
                                className="peer block w-full border-0 border-b border-gray-300 bg-transparent py-2.5 text-gray-900 focus:border-primary focus:ring-0 sm:text-sm transition-all duration-300 pr-8"
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-0 block text-[11px] tracking-widest uppercase text-gray-500 transition-all duration-300 cursor-text pointer-events-none ${password ? '-top-4 text-[9px] text-primary font-bold' : 'top-2.5 text-[11px]'
                                    }`}
                            >
                                Mật khẩu
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-primary transition-colors focus:outline-none"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showPassword ? 'visibility' : 'visibility_off'}
                                </span>
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        {isSignIn && (
                            <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center group cursor-pointer">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-3.5 w-3.5 rounded-sm border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-[10px] text-gray-500 group-hover:text-primary transition-colors uppercase tracking-wider cursor-pointer font-medium"
                                    >
                                        Ghi nhớ đăng nhập
                                    </label>
                                </div>
                                <div className="text-[10px]">
                                    <a
                                        href="#"
                                        className="font-medium text-gray-500 hover:text-primary transition-colors uppercase tracking-wider border-b border-transparent hover:border-primary/30 pb-0.5"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="relative w-full overflow-hidden bg-primary text-white py-4 px-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl hover:bg-primary-hover transition-all duration-300 group rounded-sm"
                            >
                                <span className="relative z-10 group-hover:tracking-[0.25em] transition-all duration-300">
                                    {isSignIn ? 'Đăng Nhập' : 'Đăng Ký'}
                                </span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative mt-8">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                                <span className="bg-white px-3 text-gray-400 font-medium">Hoặc tiếp tục với</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 rounded-sm border border-gray-200 bg-white py-2.5 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-300 group"
                            >
                                <svg
                                    className="h-4 w-4 fill-current opacity-60 group-hover:opacity-100 transition-opacity"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12.0003 20.45c-4.6666 0-8.4499-3.7833-8.4499-8.4499S7.3336 3.55 12.0003 3.55c2.3083 0 4.3833.85 5.9916 2.2417l-1.8083 1.8083c-1.0083-.8833-2.4583-1.475-4.1833-1.475-3.325 0-6.025 2.7-6.025 6.025s2.7 6.025 6.025 6.025c2.9083 0 5.125-1.95 5.5166-4.6917H12.0003v-2.5h8.0833c.0917.5167.1417 1.05.1417 1.625 0 4.6917-3.1417 7.9667-8.225 7.9667z"></path>
                                </svg>
                                <span className="text-[10px] font-bold tracking-widest uppercase">Google</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 rounded-sm border border-gray-200 bg-white py-2.5 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-300 group"
                            >
                                <svg
                                    className="h-4 w-4 fill-current opacity-60 group-hover:opacity-100 transition-opacity"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.6823 10.6218h-2.3668v-3.67c0-.9087.6312-1.121 1.0254-1.121.3944 0 2.3883 0 2.3883 0V2.2694C14.3052 2.2285 12.9238 2.1152 11.4582 2.1152c-3.1205 0-5.1843 1.902-5.1843 5.3353v3.1713H4.0195V14.8h2.2544v10.9565h4.4363V14.8h3.3338l.4983-4.1782z"></path>
                                </svg>
                                <span className="text-[10px] font-bold tracking-widest uppercase">Facebook</span>
                            </button>
                        </div>
                    </form>

                    {/* Footer Terms */}
                    <div className="mt-12 text-center">
                        <p className="text-[9px] text-gray-400 uppercase tracking-[0.1em]">
                            Bằng cách đăng nhập, bạn đồng ý với{' '}
                            <a href="#" className="underline hover:text-primary transition-colors">Điều khoản</a> &{' '}
                            <a href="#" className="underline hover:text-primary transition-colors">Chính sách bảo mật</a>{' '}
                            của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
