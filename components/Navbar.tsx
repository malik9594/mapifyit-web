"use client"
import React, { useState } from 'react';
import { Map, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#03060D]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all">
            <Map className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Mapifyit<span className="text-blue-500">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md">
          <a href="#products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Products</a>
          <a href="#solutions" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Solutions</a>
          <a href="#infrastructure" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Infrastructure</a>
          <a href="#developers" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Docs</a>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</button>
          <button className="group relative px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-500 transition-all overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2">Start for Free <ChevronRight className="w-4 h-4" /></span>
          </button>
        </div>

        <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}