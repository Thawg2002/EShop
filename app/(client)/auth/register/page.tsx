// app/auth/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, CheckCircle, ChevronLeft, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        setIsLoading(true);
        try {
            await apiClient.post('/auth/register', formData);
            toast.success('Đăng ký thành công! Hãy đăng nhập.');
            router.push('/auth/login');
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra trong quá trình đăng ký');
            toast.error('Đăng ký thất bại');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            {/* Right Side: Form (Reversed layout for variety) */}
            <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-background order-2 lg:order-1">
                <div className="max-w-md w-full mx-auto space-y-10 py-10">
                    <div className="space-y-4">
                        <Link href="/" className="text-xs uppercase tracking-widest text-primary font-bold flex items-center hover:translate-x-[-4px] transition-transform">
                            <ChevronLeft size={14} className="mr-1" /> Trang chủ
                        </Link>
                        <h1 className="text-4xl font-serif font-bold">Tham gia Collective</h1>
                        <p className="text-muted-text">Khám phá vũ trụ thời trang cao cấp của chúng tôi.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-text ml-2">Họ và tên</label>
                            <div className="relative">
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nguyễn Văn A"
                                    required
                                    className="w-full bg-muted/30 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-text ml-2">Email</label>
                            <div className="relative">
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                    className="w-full bg-muted/30 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-text ml-2">Mật khẩu</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-muted/30 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-text ml-2">Xác nhận</label>
                                <div className="relative">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-muted/30 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full luxury-gradient text-white py-4 mt-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-premium flex items-center justify-center space-x-3 transition-all hover:-translate-y-1 disabled:opacity-50"
                        >
                            {isLoading ? 'Đang xử lý...' : (
                                <>
                                    <span>Tạo tài khoản</span>
                                    <CheckCircle size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-muted-text">
                            Bạn đã có tài khoản?{' '}
                            <Link href="/auth/login" className="text-primary font-bold hover:underline">Đăng nhập ngay</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Left Side: Visual */}
            <div className="hidden lg:block relative overflow-hidden bg-secondary order-1 lg:order-2">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
                    alt="Register"
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-70">The New Era</p>
                        <h2 className="text-6xl font-serif font-bold mb-6">Redefining Elegance.</h2>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
