'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 transition-colors duration-700 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-100 dark:bg-zinc-900/20 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-8"
            >
                <div className="space-y-6 flex flex-col items-center">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-20 h-20 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-black/[0.03] dark:border-white/[0.03] shadow-premium-sm"
                    >
                        <Compass className="w-10 h-10 text-black/20 dark:text-white/20" strokeWidth={1} />
                    </motion.div>

                    <div className="space-y-2 relative">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="text-[100px] font-serif leading-none text-black dark:text-white opacity-[0.03] select-none absolute -top-20 left-1/2 -translate-x-1/2"
                        >
                            404
                        </motion.h1>
                        <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-black/30 dark:text-white/30 mb-2">
                            Error Occurred
                        </h2>
                        <p className="text-2xl md:text-3xl font-medium text-black dark:text-white leading-snug">
                            Trang bạn tìm <span className="inline-block">kiếm</span> không <span className="inline-block">tồn</span> tại
                        </p>
                    </div>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] max-w-md mx-auto leading-relaxed font-light tracking-tight px-4">
                    Có vẻ như địa chỉ bạn truy cập đã bị thay đổi hoặc không còn tồn tại trong bộ sưu tập của XX.II Collective.
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all rounded-full"
                    >
                        <span>Trở về Trang chủ</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Bottom Slogan */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <span className="text-[9px] font-black tracking-[0.5em] uppercase italic">
                    Architecture in Fashion
                </span>
            </motion.div>
        </div>
    );
}
