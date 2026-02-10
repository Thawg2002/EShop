// app/auth/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/use-auth';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ChevronLeft, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password });
            toast.success('Đăng nhập thành công!');
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Email hoặc mật khẩu không chính xác');
            toast.error('Đăng nhập thất bại');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: Visual */}
            <div className="hidden lg:block relative overflow-hidden bg-secondary">
                <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
                    alt="Login"
                    className="w-full h-full object-cover opacity-50 shadow-2xl scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-5xl font-serif font-bold mb-6 italic">Welcome Back.</h2>
                        <p className="text-lg text-white/70 tracking-wide font-light">
                            Join the collective. Experience curated fashion and exclusive updates.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-background">
                <div className="max-w-md w-full mx-auto space-y-10">
                    <div className="space-y-4">
                        <Link href="/" className="text-xs uppercase tracking-widest text-primary font-bold flex items-center hover:translate-x-[-4px] transition-transform">
                            <ChevronLeft size={14} className="mr-1" /> Trang chủ
                        </Link>
                        <h1 className="text-4xl font-serif font-bold">Đăng nhập</h1>
                        <p className="text-muted-text">Vui lòng điền thông tin tài khoản của bạn.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl flex items-center space-x-3 border border-destructive/20"
                            >
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted-text">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                    className="w-full bg-muted/30 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs uppercase tracking-widest font-bold text-muted-text">Mật khẩu</label>
                                <Link href="/auth/forgot-password" title="Quên mật khẩu?" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-foreground transition-colors">Quên mật khẩu?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-muted/30 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full luxury-gradient text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-premium flex items-center justify-center space-x-3 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Đang lý...' : (
                                <>
                                    <span>Tiếp tục</span>
                                    <LogIn size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-muted-text">
                            Chưa có tài khoản?{' '}
                            <Link href="/auth/register" className="text-primary font-bold hover:underline transition-all">Đăng ký ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
