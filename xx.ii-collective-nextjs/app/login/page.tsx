'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiamondIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();
    const [isSignIn, setIsSignIn] = useState(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/profile');
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-secondary antialiased selection:bg-primary/20">
            <div className="flex min-h-screen">
                <div className="hidden lg:block w-1/2 relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop)' }}
                    >
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-12 text-white">
                        <h2 className="text-4xl font-serif font-bold tracking-widest mb-4">Elegance Redefined.</h2>
                        <p className="text-lg font-light opacity-90">Join the XX.II Collective for exclusive access.</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm">
                        <div className="flex items-center justify-center gap-2 mb-10">
                            <DiamondIcon className="w-8 h-8 text-primary" />
                            <span className="text-3xl font-serif font-bold tracking-widest">XX.II</span>
                        </div>

                        <div className="flex border-b border-gray-100 mb-8">
                            <button
                                onClick={() => setIsSignIn(true)}
                                className={`w-1/2 pb-4 text-center font-bold border-b-2 transition-colors ${isSignIn ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-gray-600'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsSignIn(false)}
                                className={`w-1/2 pb-4 text-center font-medium border-b-2 transition-colors ${!isSignIn ? 'text-primary border-primary font-bold' : 'text-gray-400 border-transparent hover:text-gray-600'
                                    }`}
                            >
                                Create Account
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold mb-2">
                            {isSignIn ? 'Welcome Back' : 'Join XX.II Collective'}
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            {isSignIn ? 'Please enter your details to sign in.' : 'Create your account to get started.'}
                        </p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <Input label="Email Address" type="email" />
                            <Input label="Password" type="password" />

                            {isSignIn && (
                                <div className="flex justify-between items-center text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                        Remember me
                                    </label>
                                    <a href="#" className="text-primary font-medium hover:underline">Forgot password?</a>
                                </div>
                            )}

                            <Button type="submit" className="w-full py-3">
                                {isSignIn ? 'Sign In' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-xs text-gray-400">
                            By signing in, you agree to our Terms and Privacy Policy.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
