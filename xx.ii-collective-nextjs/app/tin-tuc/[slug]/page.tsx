"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BLOG_POSTS } from "@/lib/data"
import { BlogSidebar } from "@/components/features/blog-sidebar"
import { BlogCard } from "@/components/features/blog-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import { DotPattern } from "@/components/magicui/dot-pattern"

export default function BlogDetailPage() {
    const params = useParams()
    const slug = params.slug

    const post = BLOG_POSTS.find((p) => p.slug === slug)

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-serif-display italic mb-4">Không tìm thấy bài viết</h1>
                <Link href="/tin-tuc" className="text-sm font-bold uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors">
                    ← Quay lại danh sách
                </Link>
            </div>
        )
    }

    const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3)

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen bg-white dark:bg-dark-bg transition-colors pt-32 pb-24 overflow-hidden">
                {/* Background (Clean Silk White) */}

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                    {/* Breadcrumbs */}
                    <BlurFade delay={0.1}>
                        <nav className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Trang chủ</Link>
                            <span>/</span>
                            <Link href="/tin-tuc" className="hover:text-black dark:hover:text-white transition-colors">Tin tức</Link>
                            <span>/</span>
                            <span className="text-black dark:text-white truncate max-w-[200px]">{post.title}</span>
                        </nav>
                    </BlurFade>

                    {/* Article Header */}
                    <div className="max-w-4xl mb-16">
                        <BlurFade delay={0.2}>
                            <h1 className="text-5xl md:text-8xl font-serif font-medium mb-8 leading-[1] tracking-tight text-zinc-950 dark:text-zinc-50">
                                {post.title}
                            </h1>
                        </BlurFade>
                        <BlurFade delay={0.3}>
                            <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 italic">
                                <span className="flex items-center gap-2">
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    {post.readTime} reading time
                                </span>
                                <span className="opacity-60">
                                    {post.category}
                                </span>
                            </div>
                        </BlurFade>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
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

                            {/* Tags */}
                            <BlurFade delay={0.6}>
                                <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-3">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest border border-zinc-100 dark:border-zinc-800 rounded-full text-zinc-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </BlurFade>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <BlurFade delay={0.7}>
                                <BlogSidebar post={post} />
                            </BlurFade>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-32 pt-16 border-t border-zinc-100 dark:border-zinc-800">
                        <BlurFade delay={0.8}>
                            <h2 className="text-3xl font-bold mb-12 tracking-tight">Bài viết liên quan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost, idx) => (
                                    <BlogCard key={relatedPost.id} post={relatedPost} />
                                ))}
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
