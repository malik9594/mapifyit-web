"use client";

import React from 'react';
import Hero from '@/components/Hero';
import SolutionsOverview from '@/components/SolutionsOverview';
import Link from 'next/link';
import { Map, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

/**
 * Main Landing Page Component
 * Home page content only. Navbar and Footer are in layout.tsx.
 * Consolidates all features for a single-page scrolling experience.
 */
export default function Home() {
  return (
    <div className="relative z-10 pt-25 pb-20">

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <Hero />

      {/* OVERVIEW SECTIONS */}
      <section id="maps-preview" className="py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Core Ecosystem</h2>
              <h3 className="text-2xl md:text-4xl font-bold text-white">High-performance Maps APIs and GIS infrastructure for scalable mapping and location intelligence.</h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Maps Preview */}
            <Reveal delay={100}>
              <div className="group relative h-full p-8 rounded-[22px] bg-[#070B14] border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <Map className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Predictable Maps API for Geospatial Applications</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">Render high-resolution vector and satellite tiles at 60fps with our Maps API. Perfect for web and mobile GIS applications, offering mass-scale performance and localized address accuracy.</p>
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
                <h4 className="text-2xl font-bold text-white mb-3">GIS & Spatial Intelligence Platform</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">Transform massive geospatial datasets into actionable insights with real-time heatmaps, GIS analytics, and AI-driven movement intelligence. Build location intelligence applications for web and mobile platforms.</p>
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
                <h4 className="text-2xl font-bold text-white mb-3">Intelligent Routing & Route Optimization</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">Multi-stop optimization and real-time traffic pulse monitoring. Build logistics systems that calculate the true cost of distance.</p>
                <Link href="/routing" className="inline-flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                  Routing Specs <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SolutionsOverview />

      <section className="py-4 relative overflow-hidden bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal delay={200}>
            <div className="relative p-8 md:p-12 rounded-[2rem] border border-blue-500/20 bg-[#080E18] overflow-hidden transition-all hover:border-white/20 group shadow-lg">

              {/* Deep Ambient background glow */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500 blur-[100px] rounded-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                {/* Left text section */}
                <div className="text-center md:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <ShieldCheck className="w-3 h-3" /> Pricing for Geospatial Platforms
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Scale-First Pricing.</span></h3>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    Deploy flexible Maps API and geospatial infrastructure with predictable pricing. Tailored for scalable GIS platforms, high-performance computing, and location intelligence solutions, all without vendor lock-in.
                  </p>
                </div>

                {/* Right CTA section */}
                <div className="shrink-0 flex flex-col justify-center w-full md:w-auto">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl border w-full md:w-max transition-all text-blue-400 border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20"
                  >
                    Explore Pricing <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


    </div >
  );
}
