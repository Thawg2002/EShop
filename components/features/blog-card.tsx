"use client"

import Link from "next/link"
import { BlogPost } from "@/types"
import { MagicCard } from "@/components/magicui/magic-card"
import { cn } from "@/lib/utils"

interface BlogCardProps {
    post: BlogPost
    className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
    return (
        <Link href={`/${post.slug}`} className={cn("block group", className)}>
            <MagicCard
                className="flex flex-col h-full overflow-hidden transition-all duration-500 border-zinc-200 dark:border-zinc-800"
                gradientColor="rgba(0,0,0,0.02)"
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-3 mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-sm">
                                {typeof post.category === 'string' ? post.category : post.category.name}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
                            <span>{new Date(post.createdAt || (post as any).date || '').toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between p-8 h-full">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-4 block">
                        {typeof post.category === 'string' ? post.category : post.category.name}
                    </span>
                    <h3 className="text-xl md:text-2xl font-sans font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                    </h3>
                    <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-8">
                        {post?.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-900">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                            {new Date(post.createdAt || (post as any).date || '').toLocaleDateString('vi-VN')}
                        </span>
                        <Link
                            href={`/${post.slug}`}
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-primary-hover transition-colors"
                        >
                            Read More
                            <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                        </Link>
                    </div>
                </div>
            </MagicCard>
        </Link>
    )
}
