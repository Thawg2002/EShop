import Image from 'next/image';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Journal | XX.II Collective',
    description: 'Stories of craftsmanship, heritage, and the art of modern living.',
    openGraph: {
        title: 'The Journal | XX.II Collective',
        description: 'Editorial stories and insights',
    },
};

const articles = [
    {
        id: 1,
        title: 'Volume & Structure: SS24 Forecast',
        category: 'Trends',
        date: 'Oct 24, 2023',
        excerpt: 'Wide silhouettes are here to stay. Discover how to style the season\'s most commanding look with effortless sophistication.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'XX.II Archives: Since 2004',
        category: 'Heritage',
        date: 'Oct 18, 2023',
        excerpt: 'A retrospective look at the defining moments that shaped our design philosophy over two decades of minimalist excellence.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    },
];

export default function JournalPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Editorial</span>
                        <h1 className="text-5xl font-serif mt-3 mb-6">The Journal</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Stories of craftsmanship, heritage, and the art of modern living.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {articles.map(article => (
                            <article key={article.id} className="group cursor-pointer">
                                <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-6 relative">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold uppercase text-gray-500 mb-3">
                                    <span className="text-primary">{article.category}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>
                                <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-500 line-clamp-3">{article.excerpt}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
