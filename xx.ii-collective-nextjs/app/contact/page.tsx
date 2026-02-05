'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                        <div>
                            <span className="text-primary font-bold uppercase text-xs tracking-widest mb-4 block">Get in Touch</span>
                            <h1 className="text-5xl font-serif mb-8">Client Services</h1>
                            <p className="text-gray-600 mb-12 max-w-md leading-relaxed">
                                Our dedicated concierge team is available to assist with styling advice, delivery inquiries, and order management.
                            </p>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-serif text-lg font-medium mb-2">Showroom</h3>
                                    <p className="text-gray-500">152 Wooster Street<br />SoHo, New York, NY 10012</p>
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg font-medium mb-2">Contact</h3>
                                    <p className="text-gray-500">concierge@xxii.com</p>
                                    <p className="text-gray-500">+1 (212) 555-0199</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light-bg p-8 lg:p-14">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-primary px-0 py-2"
                                            placeholder="Jane"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-primary px-0 py-2"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-primary px-0 py-2"
                                        placeholder="jane@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-primary px-0 py-2"
                                        placeholder="How can we assist you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <Button type="submit" className="w-full py-4 text-xs uppercase tracking-widest">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
