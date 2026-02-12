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
        <div className="relative h-screen w-full flex flex-col md:flex-row bg-white selection:bg-black selection:text-white font-sans overflow-hidden">
            {/* --- Left Side: Editorial Banner --- */}
            <div className="relative w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden group bg-neutral-100">
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={{
                        x: mousePos.x * 0.5,
                        y: mousePos.y * 0.5,
                        scale: 1.05
                    }}
                    transition={{ type: 'spring', damping: 50, stiffness: 200 }}
                >
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920)',
                        }}
                    />
                </motion.div>

                {/* Image Overlays */}
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                {/* Left Side Content (Editorial) */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-12 md:p-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white uppercase leading-tight">
                            XX.II<br />
                            <span className="font-extrabold text-white/50">Collective</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="flex flex-col gap-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-white/40"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">
                                2024 Collection / Limited Edition
                            </span>
                        </div>
                        <p className="text-white/60 text-xs max-w-xs leading-relaxed font-light italic">
                            Experience the intersection of modern art and contemporary fashion. Built for the elite, designed for the bold.
                        </p>
                    </motion.div>
                </div>

                {/* Branding Detail */}
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 hidden xl:block">
                    <span className="text-[120px] font-black text-white/5 cursor-default select-none pointer-events-none">EST. 2024</span>
                </div>
            </div>

            {/* --- Right Side: Minimalist Form --- */}
            <div className="relative w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 bg-white">
                {/* Floating "Back" Navigation */}
                <Link
                    href="/"
                    className="absolute top-12 right-12 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-black/30 hover:text-black transition-all group"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
                    Quay lại cửa hàng
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[400px] py-10"
                >
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-[1px] bg-black/10"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
                                {isSignIn ? 'Quyền truy cập thành viên' : 'Đăng ký thành viên'}
                            </span>
                        </div>
                        <h1 className="text-3xl font-light tracking-tight text-black flex items-center gap-4">
                            {isSignIn ? 'Đăng nhập' : 'Tạo tài khoản'}
                        </h1>
                    </div>

                    {/* Form Toggle Tabs (Minimal) */}
                    <div className="flex gap-10 mb-10 border-b border-black/5">
                        <button
                            onClick={() => setIsSignIn(true)}
                            className={`pb-4 text-[11px] font-bold uppercase tracking-widest transition-all relative ${isSignIn ? 'text-black' : 'text-black/20 hover:text-black/40'
                                }`}
                        >
                            Đăng nhập
                            {isSignIn && <motion.div layoutId="auth-tab" className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black"></motion.div>}
                        </button>
                        <button
                            onClick={() => setIsSignIn(false)}
                            className={`pb-4 text-[11px] font-bold uppercase tracking-widest transition-all relative ${!isSignIn ? 'text-black' : 'text-black/20 hover:text-black/40'
                                }`}
                        >
                            Đăng ký
                            {!isSignIn && <motion.div layoutId="auth-tab" className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black"></motion.div>}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isSignIn ? 'login' : 'register'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                {!isSignIn && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Họ tên</Label>
                                            <Input
                                                placeholder="FULL NAME"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-12 bg-neutral-50 border-transparent focus:bg-white focus:border-black/10 rounded-xl text-black text-xs tracking-wider uppercase font-medium px-4 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Số điện thoại</Label>
                                            <Input
                                                placeholder="PHONE"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="h-12 bg-neutral-50 border-transparent focus:bg-white focus:border-black/10 rounded-xl text-black text-xs tracking-wider uppercase font-medium px-4 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Địa chỉ Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="EMAIL ADDRESS"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 bg-neutral-50 border-transparent focus:bg-white focus:border-black/10 rounded-xl text-black text-xs tracking-wider uppercase font-medium px-4 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between ml-1">
                                        <Label className="text-[9px] font-bold uppercase tracking-widest text-black/40">Mật khẩu</Label>
                                        {isSignIn && (
                                            <Link href="/quen-mat-khau" className="text-[9px] font-bold uppercase tracking-widest text-black/20 hover:text-black transition-colors">
                                                Quên mật khẩu?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="PASSWORD"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-12 bg-neutral-50 border-transparent focus:bg-white focus:border-black/10 rounded-xl text-black text-xs tracking-widest uppercase font-medium px-4 pr-12 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/10 hover:text-black transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {showPassword ? 'visibility' : 'visibility_off'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {!isSignIn && (
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Xác nhận mật khẩu</Label>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="CONFIRM PASSWORD"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="h-12 bg-neutral-50 border-transparent focus:bg-white focus:border-black/10 rounded-xl text-black text-xs tracking-widest uppercase font-medium px-4 transition-all"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 bg-black text-white hover:bg-neutral-800 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all group relative overflow-hidden active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        {isSignIn ? 'Đăng nhập ngay' : 'Tạo tài khoản'}
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Social Auth (Coming soon placeholder aesthetic) */}
                    <div className="mt-10 pt-10 border-t border-black/5">
                        <p className="text-center text-[8px] font-black uppercase tracking-[0.3em] text-black/20 mb-6">Hoặc tiếp tục với</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 h-12 border border-black/5 rounded-xl hover:bg-neutral-50 transition-colors">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 h-12 border border-black/5 rounded-xl hover:bg-neutral-50 transition-colors">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Apple</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-[9px] leading-relaxed text-black/30 font-medium">
                        Bằng cách đăng nhập, bạn đồng ý với <Link href="/terms" className="underline hover:text-black">Điều khoản</Link> & <Link href="/privacy" className="underline hover:text-black">Chính sách</Link> của chúng tôi.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
