import { Metadata } from 'next';
import { ProductCard } from '@/components/features/product-card';
import { PRODUCTS } from '@/lib/data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Shop Collection | XX.II Collective',
    description: 'Explore the latest silhouettes defined by effortless elegance and premium craftsmanship.',
    openGraph: {
        title: 'Shop | XX.II Collective',
        description: 'Browse our curated collection',
    },
};

export default function ShopPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                <div className="pt-10 pb-20 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Collection 2024</p>
                        <h1 className="text-5xl font-serif font-normal tracking-widest mb-4">SPRING ARCHIVE</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Explore the latest silhouettes defined by effortless elegance and premium craftsmanship.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
                            <div>
                                <h3 className="font-serif text-sm font-bold uppercase tracking-wider mb-4">Category</h3>
                                <ul className="space-y-3 text-sm text-gray-500">
                                    <li className="flex justify-between items-center text-primary font-medium cursor-pointer">
                                        View All <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    </li>
                                    <li className="hover:text-primary cursor-pointer">Dresses</li>
                                    <li className="hover:text-primary cursor-pointer">Outerwear</li>
                                    <li className="hover:text-primary cursor-pointer">Tops & Blouses</li>
                                    <li className="hover:text-primary cursor-pointer">Trousers</li>
                                    <li className="hover:text-primary cursor-pointer">Accessories</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-serif text-sm font-bold uppercase tracking-wider mb-4">Size</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {['XS', 'S', 'M', 'L'].map(size => (
                                        <button
                                            key={size}
                                            className={`text-xs border rounded py-2 hover:border-primary hover:text-primary transition-colors ${size === 'S' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-serif text-sm font-bold uppercase tracking-wider mb-4">Color</h3>
                                <div className="flex gap-3">
                                    {['bg-black', 'bg-stone-100', 'bg-[#5e3a73]', 'bg-[#887f63]'].map((bg, i) => (
                                        <div
                                            key={i}
                                            className={`w-6 h-6 rounded-full ${bg} border border-gray-200 cursor-pointer hover:scale-110 transition-transform ${i === 2 ? 'ring-2 ring-offset-2 ring-primary' : ''
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                <p className="text-sm text-gray-500">Showing {PRODUCTS.length} results</p>
                                <select className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer">
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {PRODUCTS.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
