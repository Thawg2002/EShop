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
            <main className="flex-1 w-full bg-white dark:bg-dark-bg pt-24 pb-16">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-28">
                    <div className="text-center mb-24 md:mb-32">
                        <span className="text-primary font-bold uppercase text-[10px] tracking-[0.6em] mb-6 block">Editorial</span>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif-display italic text-dark-text dark:text-dark-text-primary mb-8 leading-[0.9]">
                            Nhật Ký
                        </h1>
                        <p className="text-sm text-muted-text dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed font-serif-display">
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
                                        className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{article.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-black/10 dark:bg-dark-border"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-text dark:text-dark-text-secondary">{article.date}</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif-display italic mb-6 text-dark-text dark:text-dark-text-primary group-hover:text-primary transition-colors leading-tight">
                                    {article.title}
                                </h2>

                                <p className="text-sm text-muted-text dark:text-dark-text-secondary leading-relaxed mb-8 line-clamp-3 font-serif-display">
                                    {article.excerpt}
                                </p>

                                <button className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-dark-text dark:text-dark-text-primary group-hover:text-primary transition-all">
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
