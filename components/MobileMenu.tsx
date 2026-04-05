"use client"

import React from 'react';
import Link from 'next/link';
import { 
    ChevronRight, 
    ShieldCheck, 
    Truck, 
    Users, 
    LogIn, 
    Sparkles 
} from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
    return (
        <div className={`fixed inset-0 w-full h-screen bg-[#03060D] z-[450] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col h-full pt-32 px-8 pb-10 overflow-y-auto">
                <div className="space-y-4">
                    <Link
                        href="/"
                        onClick={(e) => {
                            onClose();
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className={`block text-xl font-bold border-b border-white/5 pb-4 ${pathname === '/' ? 'text-blue-500' : 'text-white'}`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/maps"
                        onClick={onClose}
                        className={`block text-xl font-bold border-b border-white/5 pb-4 ${pathname === '/maps' ? 'text-blue-500' : 'text-white'}`}
                    >
                        Maps
                    </Link>

                    <Link
                        href="/gis"
                        onClick={onClose}
                        className={`block text-xl font-bold border-b border-white/5 pb-4 ${pathname === '/gis' ? 'text-blue-500' : 'text-white'}`}
                    >
                        GIS
                    </Link>

                    <div className="space-y-4 border-b border-white/5 pb-4">
                        <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Solutions</p>
                        <Link href="https://ngekyc.mapifyit.com/" target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex items-center gap-4 text-slate-300">
                            <ShieldCheck className="text-blue-500" />NG eKYC
                        </Link>
                        <Link href="/fleet-management-system" onClick={onClose} className={`flex items-center gap-4 ${pathname === '/fleet-management-system' ? 'text-indigo-400' : 'text-slate-300'}`}>
                            <Truck className={`${pathname === '/fleet-management-system' ? 'text-indigo-400' : 'text-indigo-500'}`} /> FMS
                        </Link>
                        <Link href="/field-force-tracking" onClick={onClose} className={`flex items-center gap-4 ${pathname === '/field-force-tracking' ? 'text-indigo-400' : 'text-slate-300'}`}>
                            <Users className={`${pathname === '/field-force-tracking' ? 'text-indigo-400' : 'text-indigo-500'}`} /> FFT
                        </Link>
                    </div>

                    <Link
                        href="https://dev.mapifyit.com/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="block text-xl font-bold text-white border-b border-white/5 pb-4"
                    >
                        Documentation
                    </Link>

                    <Link
                        href="/pricing"
                        onClick={onClose}
                        className={`block text-xl font-bold border-b border-white/5 pb-4 ${pathname === '/pricing' ? 'text-blue-500' : 'text-white'}`}
                    >
                        Pricing
                    </Link>

                    <Link
                        href="/contact-us"
                        onClick={onClose}
                        className={`block text-xl font-bold ${pathname === '/contact-us' ? 'text-blue-500' : 'text-white'}`}
                    >
                        Contact Us
                    </Link>
                </div>
                
                <div className="mt-auto space-y-4 pt-10 border-t border-white/5">
                    <Link
                        href="https://maps.mapifyit.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="w-full py-4 rounded-xl bg-white/10 text-white font-bold border border-white/20 flex items-center justify-center gap-2"
                    >
                        Try Maps <ChevronRight size={18} />
                    </Link>
                    <button className="w-full py-4 rounded-xl bg-white/5 text-white font-bold border border-white/10 flex items-center justify-center gap-2" onClick={() => window.location.href = "https://dev.mapifyit.com/login"}>
                        <LogIn size={18} /> Log in
                    </button>
                    <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                        <Sparkles size={18} /> Start Free
                    </button>
                </div>
            </div>
        </div>
    );
}
