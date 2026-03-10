"use client"
import React from 'react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import { Map, Layers, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

/**
 * Main Landing Page Component
 * Home page content only. Navbar and Footer are in layout.tsx.
 * Consolidates all features for a single-page scrolling experience.
 */
export default function Home() {
  return (
    <div className="relative z-10 pt-32 pb-20">

      {/* GLOBAL ANIMATION KEYFRAMES - Kept for component-specific animations */}
      <style>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(2.5); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes biometricScan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes border-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .isometric-grid { transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d; }
        .scanner-beam { background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.8)); animation: scan 4s linear infinite; }
        
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-stagger-1 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .animate-stagger-2 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-stagger-3 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .animate-stagger-4 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
        .animate-biometric-scan { animation: biometricScan 3s ease-in-out infinite; }
      `}</style>

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse:70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <Hero />

      {/* OVERVIEW SECTIONS */}
      <section className="py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Core Ecosystem</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white">Built for Performance.
                Priced for Control.</h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Maps Preview */}
            <Reveal delay={100}>
              <div className="group relative h-full p-8 rounded-[22px] bg-[#070B14] border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <Map className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Predictable Maps API</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">Render high-resolution vector and satellite tiles at 60fps. Built for mass-scale web and mobile apps with localized address accuracy.</p>
                <Link href="/maps" className="inline-flex items-center gap-2 font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  Explore Maps <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            {/* GIS Preview */}
            <Reveal delay={200}>
              <div className="group relative h-full p-8 rounded-[22px] bg-[#070B14] border border-white/5 hover:border-cyan-500/30 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Activity className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Spatial Intelligence</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">Transform massive coordinate datasets into actionable insights with real-time heatmaps and AI-driven movement analytics.</p>
                <Link href="/gis" className="inline-flex items-center gap-2 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Discover GIS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            {/* Routing Preview */}
            <Reveal delay={300}>
              <div className="group relative h-full p-8 rounded-[22px] bg-[#070B14] border border-white/5 hover:border-amber-500/30 transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Intelligent Routing</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">Multi-stop optimization and real-time traffic pulse monitoring. Build logistics systems that calculate the true cost of distance.</p>
                <Link href="/routing" className="inline-flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                  Routing Specs <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="mt-20">
            <Reveal delay={400}>
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />

                <div className="relative bg-[#0A101F] rounded-[22px] px-8 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 z-10">
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white mb-4">Transparent, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Scale-First Pricing.</span></h3>
                    <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                      Deploy flexible mapping infrastructure with predictable costs. Tailored for dynamic scaling, high-performance computing, and guaranteed reliability.
                    </p>
                  </div>
                  <div className="shrink-0 relative">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-700 animate-pulse pointer-events-none" />
                    <Link href="/pricing" className="relative flex items-center gap-3 px-8 py-4 bg-white text-[#0A101F] hover:bg-slate-100 font-bold hover:scale-105 active:scale-95 rounded-xl transition-all shadow-2xl">
                      View Pricing Overview <ChevronRight className="w-5 h-5 text-blue-600" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}