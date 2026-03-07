"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Map, Menu, X, ChevronRight, ChevronDown, ShieldCheck, Truck } from 'lucide-react';

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#03060D]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all">
            <Map className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Mapifyit<span className="text-blue-500">.</span></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md relative">
          <a href="#products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Products</a>

          {/* Solutions Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${solutionsOpen ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Box */}
            {solutionsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[#0B0F17] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                <a href="#ngekyc" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">ngeKYC</div>
                    <div className="text-xs text-slate-400">Next-gen identity verification</div>
                  </div>
                </a>

                <a href="#fms" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">FMS</div>
                    <div className="text-xs text-slate-400">Fleet Management System</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          <a href="#infrastructure" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">GIS</a>
          <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
          <a href="#contactus" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact Us</a>
          <a href="#developers" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Docs</a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</button>
          <button className="group relative px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-500 transition-all overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2">Start for Free <ChevronRight className="w-4 h-4" /></span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}