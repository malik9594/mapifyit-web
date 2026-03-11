import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import { Reveal } from './Reveal';
import IsometricMap from './IsometricMap';
import LoginMockup from './LoginMockup';

/**
 * Hero Section: The flagship visual component of the landing page.
 * Uses a split layout on larger screens to showcase both value proposition and visuals.
 */
export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-5 md:pt-5 pb-12 lg:pb-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Column: Value Proposition */}
        <div className="text-center lg:text-left">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] md:text-xs font-semibold text-blue-400 mb-6 md:mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Zap className="w-3.5 h-3.5 fill-blue-500/50" /> High-Performance Geospatial APIs
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 md:mb-8 leading-[1.1]">
              Geospatial Data Platform for GIS<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Mapping, and Location Intelligence.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-light">
              {/* Replace legacy providers with our precision Maps API, advanced GIS, and automated fraud management (FMS). Deploy in the cloud or completely on-premise for absolute data sovereignty. */}
              {/* High-performance Maps APIs, advanced GIS, and location intelligence. Deploy in the cloud, or completely offline for true <strong className="text-white font-medium">enterprise data sovereignty</strong>. */}
              High-performance Maps APIs and advanced GIS routing infrastructure for modern geospatial applications. Deploy in the cloud or air-gapped for secure, scalable location intelligence.           </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#03060D] font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Explore Platform
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/40 border border-slate-700 hover:border-slate-500 text-white font-bold rounded-xl hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:scale-105 active:scale-95 text-sm md:text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Deploy On-Premise
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Visual Mockup */}
        <div className="relative group w-full flex justify-center lg:justify-end">
          <Reveal delay={400} className="w-full flex justify-center lg:justify-end">
            <div className="relative z-10 scale-[0.85] sm:scale-100 transition-transform">
              <LoginMockup />
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/10 rounded-full blur-[100px] -z-10 group-hover:bg-blue-600/20 transition-colors duration-500" />
          </Reveal>
        </div>
      </div>

      {/* Full-width Map Section (Appears below the split) */}
      <div className="mt-20 lg:mt-20">
        <Reveal delay={500}>
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Live Engine Status</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-transparent mx-auto" />
          </div>
          <IsometricMap />
        </Reveal>
      </div>
    </section>
  );
}
