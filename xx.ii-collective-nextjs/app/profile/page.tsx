'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBagIcon, UserIcon, TruckIcon, DiamondIcon, SearchIcon } from '@/components/icons';
import { OrderCard } from '@/components/features/order-card';
import { AddressCard } from '@/components/features/address-card';
import { ORDERS, ADDRESSES } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

type TabType = 'info' | 'orders' | 'addresses' | 'payment';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('orders');

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col lg:flex-row gap-12 min-h-[600px]">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <div className="sticky top-24">
                                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                                    <div className="relative w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                                            alt="Profile"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg">Isabella Ross</h2>
                                        <p className="text-xs text-gray-500">Diamond Member</p>
                                    </div>
                                </div>
                                <nav className="space-y-1">
                                    {[
                                        { id: 'info' as const, label: 'Account Info', icon: <UserIcon className="w-5 h-5" /> },
                                        { id: 'orders' as const, label: 'Order History', icon: <ShoppingBagIcon className="w-5 h-5" /> },
                                        { id: 'addresses' as const, label: 'Saved Addresses', icon: <TruckIcon className="w-5 h-5" /> },
                                        { id: 'payment' as const, label: 'Payment Methods', icon: <DiamondIcon className="w-5 h-5" /> }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                                                    ? 'bg-primary/5 text-primary font-bold'
                                                    : 'text-gray-600 hover:bg-light-bg'
                                                }`}
                                        >
                                            <span className="w-5">{item.icon}</span> {item.label}
                                        </button>
                                    ))}
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 mt-6 border-t border-gray-100 pt-6">
                                        Log Out
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1">
                            {activeTab === 'orders' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h1 className="text-3xl font-serif font-bold mb-2">Order History</h1>
                                            <p className="text-gray-500">View details and check status of recent purchases.</p>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search orders..."
                                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:ring-primary focus:border-primary w-64"
                                            />
                                            <div className="absolute left-3 top-2.5 text-gray-400"><SearchIcon className="w-4 h-4" /></div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {ORDERS.map(order => <OrderCard key={order.id} order={order} />)}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-end">
                                        <h1 className="text-3xl font-serif font-bold">Saved Addresses</h1>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {ADDRESSES.map(addr => <AddressCard key={addr.id} address={addr} />)}
                                        <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[240px] text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3"><span className="text-2xl">+</span></div>
                                            <span className="font-bold text-sm">Add New Address</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'payment' && (
                                <div className="space-y-8">
                                    <h1 className="text-3xl font-serif font-bold">Payment Methods</h1>
                                    <div className="space-y-4">
                                        <div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-10 border border-gray-200 bg-gray-50 rounded flex items-center justify-center font-bold text-blue-800 italic">VISA</div>
                                                <div>
                                                    <p className="font-bold flex items-center gap-2">
                                                        Visa ending in 4242
                                                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded uppercase">Default</span>
                                                    </p>
                                                    <p className="text-sm text-gray-500">Expires 12/26</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 text-sm font-medium text-gray-500">
                                                <button className="hover:text-primary">Edit</button>
                                                <button className="hover:text-red-500">Remove</button>
                                            </div>
                                        </div>
                                        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center bg-white/50 hover:bg-white transition-colors">
                                            <Button>Add Payment Method</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'info' && (
                                <div className="max-w-xl">
                                    <h1 className="text-3xl font-serif font-bold mb-8">Personal Information</h1>
                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <Input label="First Name" defaultValue="Isabella" />
                                        <Input label="Last Name" defaultValue="Ross" />
                                    </div>
                                    <div className="mb-6">
                                        <Input
                                            label="Email"
                                            type="email"
                                            defaultValue="isabella.ross@example.com"
                                            disabled
                                            className="bg-gray-50 text-gray-500"
                                        />
                                    </div>
                                    <Button>Save Changes</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
