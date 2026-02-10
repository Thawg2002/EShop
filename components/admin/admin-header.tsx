'use client';

import { Search, Bell, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminHeader() {
    return (
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
            {/* Search */}
            <div className="hidden md:flex items-center relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input
                    placeholder="Type to search..."
                    className="pl-10 border-none bg-zinc-100 focus-visible:ring-0 focus-visible:bg-white transition-all rounded-full"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-zinc-500 hover:text-zinc-900">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="icon" className="relative text-zinc-500 hover:text-zinc-900">
                    <MessageSquare size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer pl-2 group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-zinc-900 leading-none group-hover:text-primary transition-colors">Thomas Anree</p>
                                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-bold">Admin</p>
                            </div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <span className="material-symbols-outlined text-zinc-400 text-lg group-hover:text-zinc-600 transition-colors">expand_more</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white border-zinc-200">
                        <DropdownMenuLabel className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="focus:bg-zinc-50 cursor-pointer">Profile</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-50 cursor-pointer">Billing</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-50 cursor-pointer">Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
