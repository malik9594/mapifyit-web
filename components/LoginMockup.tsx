"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Activity, Layers, Cpu, Globe, ArrowRight, Zap, Navigation } from 'lucide-react';

export default function USAMapifyitShowcase() {
    const [step, setStep] = useState(0);
    const [distance, setDistance] = useState(0);

    const locations = [
        {
            city: "New York Hub",
            desc: "JFK → Warehouse A → Brooklyn",
            color: "text-blue-400",
            path: "M 40 450 L 120 380 L 220 320",
            dist: "12.4 mi",
            bgShift: { x: -20, y: -40, rotate: 0 }
        },
        {
            city: "LA Terminal",
            desc: "Port of LA → Sorting → Santa Monica",
            color: "text-indigo-400",
            path: "M 220 320 L 150 200 L 60 120",
            dist: "24.8 mi",
            bgShift: { x: -80, y: -20, rotate: 15 }
        },
        {
            city: "Chicago Rail",
            desc: "O'Hare → Central Yard → North Side",
            color: "text-emerald-400",
            path: "M 60 120 L 160 180 L 240 60",
            dist: "18.2 mi",
            bgShift: { x: -40, y: -80, rotate: -10 }
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep((prev) => (prev + 1) % (locations.length * 2));
        }, step % 2 === 0 ? 1200 : 3500);

        if (step % 2 !== 0) {
            setDistance(0);
            const int = setInterval(() => {
                setDistance(prev => prev < 100 ? prev + 4 : 100);
            }, 60);
            return () => clearInterval(int);
        }
        return () => clearTimeout(timer);
    }, [step]);

    const isTyping = step % 2 === 0;
    const locationIndex = Math.floor(step / 2) % locations.length;
    const current = locations[locationIndex];

    return (
        <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[650px] rounded-[50px] mx-auto bg-[#0B0F24] shadow-2xl overflow-hidden p-[1px] border border-white/10 font-sans">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.1),transparent)] animate-[spin_6s_linear_infinite]" />

            <div className="relative w-full h-full rounded-[48px] bg-[#020517] overflow-hidden flex flex-col">

                {/* --- HEADER --- */}
                <div className="h-8 w-full flex justify-between items-center px-8 pt-4 z-50">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] text-white/50 font-black tracking-widest uppercase">Engine: Vector_v2</span>
                    </div>
                    <div className="w-10 h-3.5 bg-[#1A1D2E] rounded-full" />
                    <Zap className="w-3 h-3 text-blue-500" />
                </div>

                {/* --- MAP CANVAS --- */}
                <div className="flex-1 relative overflow-hidden bg-[#050714]">

                    {/* --- THE REAL MAP STYLE (Roads & Parcels) --- */}
                    <motion.div
                        animate={{
                            x: current.bgShift.x,
                            y: current.bgShift.y,
                            rotate: current.bgShift.rotate,
                            scale: isTyping ? 1.1 : 1
                        }}
                        transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute inset-0 opacity-30 origin-center"
                    >
                        <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Grid / Minor Streets */}
                            <pattern id="city-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                <path d="M 30 0 L 0 0 0 30" stroke="#1E293B" strokeWidth="0.5" />
                            </pattern>
                            <rect width="1000" height="1000" fill="url(#city-grid)" />

                            {/* Major Road Arteries */}
                            <path d="M-100 200 C 100 220 300 180 700 250" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
                            <path d="M200 -100 C 220 100 180 400 250 900" stroke="#334155" strokeWidth="6" strokeLinecap="round" />

                            {/* Building Parcels / Blocks */}
                            <rect x="250" y="250" width="40" height="60" rx="2" fill="#1E293B" />
                            <rect x="300" y="260" width="30" height="40" rx="2" fill="#0F172A" />
                            <rect x="260" y="320" width="70" height="30" rx="2" fill="#1E293B" />

                            {/* Water / Green Zone Highlight */}
                            <path d="M400 500 Q 500 600 600 550 V 800 H 400 Z" fill={current.color.includes('blue') ? '#1E3A8A' : '#064E3B'} opacity="0.2" />
                        </svg>
                    </motion.div>

                    {/* --- ROUTE PATHING --- */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                        <AnimatePresence mode="wait">
                            {!isTyping && (
                                <motion.path
                                    key={locationIndex}
                                    d={current.path}
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={current.color.replace('text', 'stroke')}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                />
                            )}
                        </AnimatePresence>
                    </svg>

                    {/* --- DYNAMIC PIN SYSTEM --- */}
                    <div className="absolute inset-0 z-30">
                        {!isTyping && (
                            <motion.div
                                initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }}
                                className="absolute top-[35%] left-[50%] -translate-x-1/2"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="bg-white/90 backdrop-blur-sm text-black font-black text-[9px] px-2 py-0.5 rounded shadow-xl mb-1 uppercase tracking-tighter">
                                        {current.city}
                                    </div>
                                    <MapPin className={`${current.color} w-8 h-8 fill-current/10`} />
                                    <div className="w-10 h-10 border border-current rounded-full absolute -bottom-1 animate-ping opacity-20" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* --- TOP UI: SEARCH INPUT --- */}
                    <div className="absolute top-8 inset-x-4 z-40">
                        <div className="bg-[#101425]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Search className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className={`text-[7px] font-bold tracking-[0.2em] uppercase ${current.color}`}>
                                        {isTyping ? "Engine Request..." : "Multipoint Optimized"}
                                    </p>
                                    <p className="text-[12px] text-white font-mono truncate tracking-tight">
                                        {isTyping ? "Searching..." : current.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTOM UI: DISPATCH INFO --- */}
                    <AnimatePresence>
                        {!isTyping && (
                            <motion.div
                                initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                                className="absolute bottom-6 inset-x-4 z-40"
                            >
                                <div className="bg-[#0A0D1F]/95 backdrop-blur-3xl border border-white/10 rounded-[28px] p-5 shadow-2xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <Navigation className="w-4 h-4 text-emerald-400" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Dispatch</span>
                                        </div>
                                        <div className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{distance}% SYNC</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <p className="text-[7px] text-slate-500 uppercase font-black mb-1">Trip Distance</p>
                                            <p className="text-sm font-mono font-bold text-blue-400">{current.dist}</p>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <p className="text-[7px] text-slate-500 uppercase font-black mb-1">Engine Time</p>
                                            <p className="text-sm font-mono font-bold text-emerald-400">0.02s</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-2xl text-[10px] font-bold text-white flex items-center justify-center gap-2 uppercase tracking-[0.15em]">
                                        Initialize Fleet <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-6 w-full flex justify-center items-center pb-2 bg-[#020517]">
                    <div className="w-16 h-1 bg-white/10 rounded-full" />
                </div>
            </div>
        </div>
    );
}