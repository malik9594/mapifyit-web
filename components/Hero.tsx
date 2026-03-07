import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import { Reveal } from './Reveal';
import IsometricMap from './IsometricMap';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
      <Reveal delay={0}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <Zap className="w-3.5 h-3.5 fill-blue-500/50" /> Spatial Intelligence, Powered by AI
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Where maps become <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            intelligence.
          </span>
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          High-performance Maps APIs, advanced GIS, and location intelligence. Deploy in the cloud, or completely offline for true <strong className="text-white font-medium">enterprise data sovereignty</strong>.
        </p>
      </Reveal>
      <Reveal delay={300}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#03060D] font-semibold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Explore Platform Features
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/40 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded-xl hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:scale-105 active:scale-95">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Deploy On-Premise
          </button>
        </div>
      </Reveal>
      <Reveal delay={500}>
        <IsometricMap />
      </Reveal>
    </section>
  );
}