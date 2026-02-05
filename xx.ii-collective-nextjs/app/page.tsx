import Link from 'next/link';
import { Metadata } from 'next';
import { ProductCard } from '@/components/features/product-card';
import { PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { TruckIcon, RefreshIcon, SupportIcon, ChevronRightIcon } from '@/components/icons';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'XX.II Collective | Luxury Fashion & Timeless Design',
    description: 'Discover the  new collection defined by breathable fabrics and effortless silhouettes tailored for the modern muse.',
    openGraph: {
        title: 'XX.II Collective | Home',
        description: 'Luxury fashion with timeless design',
    },
};

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                {/* Hero Section */}
                <section className="relative w-full h-[80vh] bg-stone-200 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                        <span className="text-white/90 text-sm font-bold tracking-[0.2em] uppercase mb-4">Since 2004</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-widest uppercase mb-6">
                            XX.II<br /><span className="text-white/80">Collective</span>
                        </h1>
                        <p className="text-white/90 text-lg max-w-lg font-light mb-8">
                            Discover the new collection defined by breathable fabrics and effortless silhouettes tailored for the modern muse.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild>
                                <Link href="/shop">Shop Collection</Link>
                            </Button>
                            <Button variant="outline">View Lookbook</Button>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-20 px-6 max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                            <p className="text-gray-500">Curated selections for the modern wardrobe.</p>
                        </div>
                        <Link href="/shop" className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            View all <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCTS.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="border-y border-gray-100 bg-light-bg py-16">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <TruckIcon />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Free Global Shipping</h3>
                            <p className="text-sm text-gray-500">Complimentary shipping on all international orders over $300.</p>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <RefreshIcon />
                            </div>
                            <h3 className="font-bold text-lg mb-2">30-Day Returns</h3>
                            <p className="text-sm text-gray-500">Hassle-free returns policy. If it doesn't fit, send it back.</p>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <SupportIcon />
                            </div>
                            <h3 className="font-bold text-lg mb-2">24/7 Concierge</h3>
                            <p className="text-sm text-gray-500">Our dedicated support team is available anytime to assist you.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
