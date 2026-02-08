"use client"

import { BlogPost } from "@/types"
import { cn } from "@/lib/utils"

interface BlogSidebarProps {
    post: BlogPost
    className?: string
}

export function BlogSidebar({ post, className }: BlogSidebarProps) {
    return (
        <aside className={cn("space-y-12", className)}>
            {/* Author Section */}
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">Tác Giả</h4>
                <div className="flex items-center gap-4">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-14 h-14 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                    />
                    <div>
                        <p className="text-lg font-bold tracking-tight">{post.author.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{post.author.role}</p>
                    </div>
                </div>
                <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Chuyên gia nội dung tại XX.II Collective, đam mê thời trang bền vững và thiết kế tối giản.
                </p>
            </div>

            {/* Table of Contents - Mock */}
            <div className="sticky top-24">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">Mục Lục</h4>
                <nav className="space-y-4">
                    <a href="#" className="block text-[11px] font-bold uppercase tracking-widest text-black dark:text-white hover:opacity-70 transition-opacity">
                        01. Giới thiệu
                    </a>
                    <a href="#" className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                        02. Chất liệu là chìa khóa
                    </a>
                    <a href="#" className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                        03. Bảng màu trung tính
                    </a>
                    <a href="#" className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                        04. Kết luận
                    </a>
                </nav>

                {/* Newsletter Signup Overlay */}
                <div className="mt-12 p-8 bg-black dark:bg-zinc-900 border border-zinc-800 dark:border-zinc-800 text-white rounded-sm overflow-hidden relative group">
                    <div className="relative z-10">
                        <h5 className="text-xl font-bold mb-2 tracking-tight">Đăng ký bản tin</h5>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-6">Nhận thông tin mới nhất về các bộ sưu tập.</p>
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            className="w-full bg-transparent border-b border-zinc-800 py-2 px-0 text-sm placeholder:text-zinc-600 outline-none focus:border-zinc-400 transition-colors mb-4"
                        />
                        <button className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white/70 transition-colors">Tham gia ngay →</button>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -mr-12 -mt-12"></div>
                </div>
            </div>
        </aside>
    )
}
