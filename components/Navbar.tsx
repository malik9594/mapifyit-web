"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Map, Menu, X, ChevronRight, ChevronDown, ShieldCheck, Truck, LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll ONLY on mobile when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* --- MASTER NAVBAR CONTAINER --- */}
      <nav className={`fixed top-0 w-full transition-all duration-300 z-[500] ${isScrolled || mobileMenuOpen ? 'bg-[#03060D]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-[510]">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer relative z-[600]">
            <div className="w-15 h-15 rounded-xl bg-white flex items-center justify-center">
              <img src="/mapifyit-logo.png" alt="Mapifyit Logo" className="w-10 h-7" />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md">
            <Link href="/#products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Products</Link>

            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${solutionsOpen ? 'text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Solutions <ChevronDown size={14} className={`transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Dropdown Box */}
              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[#0B0F17] border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl z-[700]">
                  <Link href="/#ngekyc" onClick={() => setSolutionsOpen(false)} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group/item">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover/item:bg-blue-500 group-hover/item:text-white">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">ngeKYC</p>
                      <p className="text-[10px] text-slate-400">Identity Verification</p>
                    </div>
                  </Link>
                  <Link href="/#fms" onClick={() => setSolutionsOpen(false)} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group/item">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/item:bg-indigo-500 group-hover/item:text-white">
                      <Truck size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">FMS</p>
                      <p className="text-[10px] text-slate-400">Fleet Management</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#gismap" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">GIS</Link>
            <Link href="/#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/#contactus" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact Us</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</button>
            <button className="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              Start Free
            </button>
          </div>

          {/* MOBILE TOGGLE - Only shows on Small Screens */}
          <button
            className="md:hidden relative z-[600] p-2 text-white bg-white/5 rounded-xl border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- SEPARATE MOBILE OVERLAY (Hidden on Desktop) --- */}
      <div className={`fixed inset-0 w-full h-screen bg-[#03060D] z-[450] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
        <div className="flex flex-col h-full pt-32 px-8 pb-10 overflow-y-auto">
          <div className="space-y-4">
            <Link href="/#products" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-bold text-white border-b border-white/5 pb-4">Products</Link>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Solutions</p>
              <Link href="/#ngekyc" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-slate-300"><ShieldCheck className="text-blue-500" /> ngeKYC</Link>
              <Link href="/#fms" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-slate-300"><Truck className="text-indigo-500" /> FMS</Link>
            </div>

            <Link href="/#gismap" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-bold text-white border-b border-white/5 pb-4 pt-4">GIS</Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-bold text-white border-b border-white/5 pb-4">Pricing</Link>
            <Link href="/#contactus" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-bold text-white">Contact Us</Link>
          </div>

          <div className="mt-auto space-y-4 pt-10 border-t border-white/5">
            <button className="w-full py-4 rounded-xl bg-white/5 text-white font-bold border border-white/10 flex items-center justify-center gap-2"><LogIn size={18} /> Log In</button>
            <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"><Sparkles size={18} /> Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
