'use client';

import Link from 'next/link';
import { BlogSidebar } from '@/components/features/blog-sidebar';
import { BlogCard } from '@/components/features/blog-card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BlogPost } from '@/types';

interface BlogDetailViewProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
    return (
        <main className="relative min-h-screen bg-white dark:bg-dark-bg transition-colors pt-32 pb-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <BlurFade delay={0.1}>
                    <nav className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Trang chủ</Link>
                        <span>/</span>
                        <Link href="/tin-tuc" className="hover:text-black dark:hover:text-white transition-colors">Tin tức</Link>
                        <span>/</span>
                        <span className="text-[#1d1d1f] dark:text-white truncate max-w-[200px]">{post.title}</span>
                    </nav>
                </BlurFade>

                <div className="max-w-4xl mb-16">
                    <BlurFade delay={0.2}>
                        <h1 className="text-5xl md:text-7xl font-sans font-semibold mb-8 leading-tight tracking-tight text-[#1d1d1f] dark:text-zinc-50">
                            {post.title}
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.3}>
                        <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b] dark:text-zinc-500">
                            <span>{new Date(post.createdAt || (post as any).date || '').toLocaleDateString('vi-VN')}</span>
                            <span>{(post as any).readTime || '5 min'} reading time</span>
                            <span className="opacity-60">{typeof post.category === 'string' ? post.category : post.category.name}</span>
                        </div>
                    </BlurFade>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <BlurFade delay={0.4}>
                            <div className="aspect-video mb-12 overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.5}>
                            <article className="prose prose-zinc prose-lg dark:prose-invert max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tighter prose-headings:text-black dark:prose-headings:text-white
                                prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50
                                prose-blockquote:py-1 prose-blockquote:px-8 prose-blockquote:not-italic
                                prose-img:rounded-sm prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
                                text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </article>
                        </BlurFade>

                        {post.tags && post.tags.length > 0 && (
                            <BlurFade delay={0.6}>
                                <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-3">
                                    {post.tags.map((tag: string) => (
                                        <span key={tag} className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest border border-zinc-100 dark:border-zinc-800 rounded-full text-zinc-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </BlurFade>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <BlurFade delay={0.7}>
                            <BlogSidebar post={post} />
                        </BlurFade>
                    </div>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-zinc-100 dark:border-zinc-800">
                        <BlurFade delay={0.8}>
                            <h2 className="text-3xl font-bold mb-12 tracking-tight">Bài viết liên quan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <BlogCard key={relatedPost._id} post={relatedPost} />
                                ))}
                            </div>
                        </BlurFade>
                    </div>
                )}
            </div>
        </main>
    );
}
