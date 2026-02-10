import Image from 'next/image';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Nhật Ký | XX.II Collective',
    description: 'Stories of craftsmanship, heritage, and the art of modern living.',
};

const articles = [
    {
        id: 1,
        title: 'Volume & Structure: SS24 Forecast',
        category: 'Trends',
        date: 'Oct 24, 2023',
        excerpt: 'Wide silhouettes are here to stay. Discover how to style the season\'s most commanding look with effortless sophistication.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070',
    },
    {
        id: 2,
        title: 'XX.II Archives: Since 2004',
        category: 'Heritage',
        date: 'Oct 18, 2023',
        excerpt: 'A retrospective look at the defining moments that shaped our design philosophy over two decades of minimalist excellence.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
    },
];

export default function JournalPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16 overflow-x-hidden">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-28">
                    <div className="text-center mb-32 md:mb-48">
                        <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase text-[11px] tracking-[0.15em] mb-8 block italic">Editorial</span>
                        <h1 className="text-6xl md:text-[10vw] font-serif font-medium text-zinc-950 dark:text-zinc-50 mb-12 leading-[0.85] tracking-tight">
                            Nhật Ký <br /> <span className="italic opacity-30">Tương Lai</span>
                        </h1>
                        <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed italic">
                            Stories of craftsmanship, heritage, and the art of modern living.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        {articles.map(article => (
                            <article key={article.id} className="group cursor-pointer">
                                <div className="aspect-[4/5] bg-off-white dark:bg-dark-card overflow-hidden mb-10 relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>

                                <div className="flex items-center gap-6 mb-6 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 italic">
                                    <span className="text-zinc-950 dark:text-zinc-50">{article.category}</span>
                                    <span>{article.date}</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors leading-tight tracking-tight">
                                    {article.title}
                                </h2>

                                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 line-clamp-3 font-normal">
                                    {article.excerpt}
                                </p>

                                <button className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-dark-text dark:text-dark-text-primary group-hover:text-black dark:group-hover:text-white transition-all">
                                    Đọc Bài Viết
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
