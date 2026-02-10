'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/use-auth';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Mail, Lock, User, Phone, Sparkles, ChevronRight } from 'lucide-react';

export function AuthView({ defaultMode = 'login' }: { defaultMode?: 'login' | 'register' }) {
    const router = useRouter();
    const [isSignIn, setIsSignIn] = useState(defaultMode === 'login');
    const [showPassword, setShowPassword] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { login, register, isLoading } = useAuth();

    // Mouse Parallax Effect
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignIn) {
                await login({ email, password });
                toast.success('Chào mừng bạn quay trở lại!');
                router.push('/ho-so');
            } else {
                await register({ email, password, name, phone, confirmPassword });
                toast.success('Chào mừng thành viên mới!');
                router.push('/ho-so');
            }
        } catch (error: any) {
            toast.error(error.message || 'Thao tác thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-sans selection:bg-white selection:text-black">
            {/* Cinematic Background with Parallax */}
            <motion.div
                className="absolute inset-0 z-0 opacity-60 scale-110"
                animate={{
                    x: mousePos.x,
                    y: mousePos.y,
                }}
                transition={{ type: 'spring', damping: 50, stiffness: 200 }}
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            {/* Deep Overlays */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            <div className="absolute inset-0 z-[1] backdrop-blur-[2px]"></div>

            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-12 left-12 z-50 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-all group"
            >
                <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-white transition-all"></div>
                Quay lại
            </Link>

            {/* Editorial Decoration (Vertical Text) */}
            <div className="fixed right-12 bottom-12 z-50 hidden xl:flex flex-col items-end gap-4 pointer-events-none">
                <span className="text-[100px] font-black leading-none text-white/5 select-none origin-bottom-right">01</span>
                <span className="text-[10px] font-black uppercase tracking-[1em] text-white/20 [writing-mode:vertical-rl]">EST. 2024 / XX.II</span>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-[480px] px-6 py-20"
            >
                {/* Brand Identity */}
                <div className="text-center mb-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="inline-block mb-6 opacity-80"
                    >
                        <Sparkles className="w-10 h-10 text-white" strokeWidth={1} />
                    </motion.div>
                    <h1 className="text-5xl font-extralight tracking-[0.3em] text-white uppercase mb-4 leading-none">
                        XX.II
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 bg-white/20"></div>
                        <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">
                            Luxury Collective
                        </p>
                        <div className="h-[1px] w-8 bg-white/20"></div>
                    </div>
                </div>

                {/* The Refractive Glass Card */}
                <div className="relative">
                    {/* Glowing highlight */}
                    <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[40px] p-10 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                        {/* Glass Reflections */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                        {/* Mode Switcher */}
                        <div className="flex gap-8 mb-12 border-b border-white/5">
                            <button
                                onClick={() => setIsSignIn(true)}
                                className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${isSignIn ? 'text-white' : 'text-white/20 hover:text-white/40'
                                    }`}
                            >
                                Đăng nhập
                                {isSignIn && <motion.div layoutId="elite-tab" className="absolute bottom-0 left-0 w-full h-[1px] bg-white"></motion.div>}
                            </button>
                            <button
                                onClick={() => setIsSignIn(false)}
                                className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${!isSignIn ? 'text-white' : 'text-white/20 hover:text-white/40'
                                    }`}
                            >
                                Đăng ký
                                {!isSignIn && <motion.div layoutId="elite-tab" className="absolute bottom-0 left-0 w-full h-[1px] bg-white"></motion.div>}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isSignIn ? 'signin' : 'signup'}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-8"
                                >
                                    {!isSignIn && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Danh tính</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="NAME"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="h-14 bg-white/5 border-white/5 focus:border-white/20 focus:ring-0 rounded-2xl text-white placeholder:text-white/10 text-xs tracking-widest uppercase"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Liên lạc</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="PHONE"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="h-14 bg-white/5 border-white/5 focus:border-white/20 focus:ring-0 rounded-2xl text-white placeholder:text-white/10 text-xs tracking-widest uppercase"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Tài khoản (Email)</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="EMAIL ADDRESS"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-14 bg-white/5 border-white/5 focus:border-white/20 focus:ring-0 rounded-2xl text-white placeholder:text-white/10 text-xs tracking-widest uppercase"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Mật mã bảo mật</Label>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="PASSWORD"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-14 bg-white/5 border-white/5 focus:border-white/20 focus:ring-0 rounded-2xl text-white placeholder:text-white/10 text-xs tracking-widest uppercase pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {showPassword ? 'visibility' : 'visibility_off'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {!isSignIn && (
                                        <div className="space-y-3">
                                            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Xác nhận mật mã</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="CONFIRM PASSWORD"
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="h-14 bg-white/5 border-white/5 focus:border-white/20 focus:ring-0 rounded-2xl text-white placeholder:text-white/10 text-xs tracking-widest uppercase pr-12"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="relative w-full h-16 bg-white text-black hover:bg-neutral-200 rounded-2xl font-black tracking-[0.4em] uppercase text-[11px] transition-all active:scale-[0.98] group overflow-hidden"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-6 w-6 animate-spin" strokeWidth={3} />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            {isSignIn ? 'XÁC NHẬN TRUY CẬP' : 'TẠO TÀI KHOẢN MỚI'}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Elite Footer */}
                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 leading-relaxed italic">
                                Built for the modern aesthetic. Powered by XX.II.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style jsx global>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
