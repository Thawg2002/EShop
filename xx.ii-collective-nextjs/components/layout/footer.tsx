import Link from 'next/link';
import { DiamondIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-2 mb-4">
                            <DiamondIcon className="text-primary w-5 h-5" />
                            <span className="text-xl font-serif font-bold tracking-widest">XX.II</span>
                        </div>
                        <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                            Elevating everyday essentials with a focus on quality, sustainability, and timeless design. Join our world.
                        </p>
                        <div className="mt-6">
                            <h3 className="text-sm font-semibold mb-2">Unlock 10% Off Your First Order</h3>
                            <div className="flex gap-2 max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-light-bg border-none rounded px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
                                />
                                <Button size="sm" className="px-4 py-2">Subscribe</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7">
                        <div>
                            <h3 className="text-sm font-semibold mb-4">Shop</h3>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li><Link href="/shop" className="hover:text-primary">New Arrivals</Link></li>
                                <li><Link href="/shop" className="hover:text-primary">Best Sellers</Link></li>
                                <li><Link href="/shop" className="hover:text-primary">Accessories</Link></li>
                                <li><Link href="/shop" className="hover:text-primary">Sale</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-4">Company</h3>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li><Link href="/contact" className="hover:text-primary">About Us</Link></li>
                                <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                                <li><Link href="#" className="hover:text-primary">Sustainability</Link></li>
                                <li><Link href="#" className="hover:text-primary">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-4">Legal</h3>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li><Link href="#" className="hover:text-primary">Terms</Link></li>
                                <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-primary">Returns</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center md:text-left">
                    <p className="text-xs text-gray-400">© 2024 XX.II Fashion. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
