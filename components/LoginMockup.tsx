"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Activity, Layers, Cpu, Globe, ArrowRight, Zap } from 'lucide-react';

export default function USAMapifyitShowcase() {
    const [step, setStep] = useState(0);

    // USA Centric Logistics Locations
    const locations = [
        { city: "New York City", desc: "JFK Logistics Hub, NY", color: "text-blue-400", path: "M 40 450 Q 100 300 220 280", coords: "40.7128° N, 74.0060° W" },
        { city: "Los Angeles", desc: "Port of LA, Long Beach", color: "text-indigo-400", path: "M 220 280 Q 150 150 60 100", coords: "34.0522° N, 118.2437° W" },
        { city: "Chicago", desc: "O'Hare Int. Terminal", color: "text-emerald-400", path: "M 60 100 Q 180 150 250 50", coords: "41.8781° N, 87.6298° W" },
    ];

    useEffect(() => {
        // Fast sequence: 800ms typing/search, 2000ms show route & telemetry
        const timer = setTimeout(() => {
            setStep((prev) => (prev + 1) % (locations.length * 2));
        }, step % 2 === 0 ? 800 : 2500);

        return () => clearTimeout(timer);
    }, [step]);

    const isTyping = step % 2 === 0;
    const locationIndex = Math.floor(step / 2) % locations.length;
    const current = locations[locationIndex];

    return (
        <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[650px] rounded-[50px] mx-auto bg-[#0B0F24] shadow-2xl overflow-hidden p-[2px] border border-white/5 font-sans">
            {/* High-Performance Conic Glow */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.2),transparent)] animate-[spin_4s_linear_infinite]" />

            <div className="relative w-full h-full rounded-[48px] bg-[#020517] overflow-hidden flex flex-col">

                {/* --- SYSTEM STATUS --- */}
                <div className="h-8 w-full flex justify-between items-center px-8 pt-4 z-50">
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-black tracking-tighter uppercase">USA REGION</span>
                    </div>
                    <div className="w-12 h-3.5 bg-black rounded-full" />
                    <span className="text-[10px] text-white/50 font-mono italic">v4.0</span>
                </div>

                {/* --- USA MAP ENGINE --- */}
                <div className="flex-1 relative overflow-hidden bg-[#050714]">

                    {/* Animated Grid - Simulating Map Fetching */}
                    <motion.div
                        animate={{
                            backgroundPosition: isTyping ? ['0px 0px', '100px 100px'] : ['0px 0px', '30px 30px'],
                            opacity: isTyping ? 0.4 : 0.15
                        }}
                        transition={{ duration: isTyping ? 0.5 : 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                        style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />

                    {/* Technical Coordinate Overlay (Only during search) */}
                    <AnimatePresence>
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
                            >
                                <span className="text-[40px] font-black text-white/5 rotate-12 whitespace-nowrap">
                                    {current.coords}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- VECTOR ROUTE DRAWING --- */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <AnimatePresence mode="wait">
                            {!isTyping && (
                                <motion.path
                                    key={locationIndex}
                                    d={current.path}
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className={current.color.replace('text', 'stroke')}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: "circOut" }}
                                />
                            )}
                        </AnimatePresence>
                    </svg>

                    {/* --- DYNAMIC PINS --- */}
                    <div className="absolute inset-0 z-20">
                        {!isTyping && (
                            <motion.div
                                initial={{ scale: 0, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                            >
                                <div className="bg-white text-black font-black text-[9px] px-2 py-0.5 rounded shadow-xl mb-1 uppercase tracking-tighter">
                                    {current.city}
                                </div>
                                <MapPin className={`${current.color} w-8 h-8 fill-current/10`} />
                                <div className={`w-4 h-1 bg-black/40 blur-sm rounded-full mt-1 animate-pulse`} />
                            </motion.div>
                        )}
                    </div>

                    {/* --- TOP UI: USA SEARCH INTERACTION --- */}
                    <div className="absolute top-8 inset-x-4 z-30">
                        <div className="bg-[#101425]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Search className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[7px] font-black tracking-[0.2em] uppercase ${current.color}`}>
                                        {isTyping ? "Fetching Vector Tiles..." : "USA Engine Active"}
                                    </p>
                                    <p className="text-[13px] text-white font-mono truncate tracking-tighter">
                                        {isTyping ? `${current.city.substring(0, 8)}...` : current.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTOM UI: ENTERPRISE TELEMETRY --- */}
                    <AnimatePresence>
                        {!isTyping && (
                            <motion.div
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 80, opacity: 0 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="absolute bottom-6 inset-x-4 z-30"
                            >
                                <div className="bg-[#0A0D1F]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                                    <div className="flex justify-between items-center mb-5">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-emerald-400" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Sync</span>
                                        </div>
                                        <div className="flex -space-x-1">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-[#020517] flex items-center justify-center z-10">
                                                <Globe className="w-2.5 h-2.5 text-white" />
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-indigo-500 border-2 border-[#020517] flex items-center justify-center">
                                                <Cpu className="w-2.5 h-2.5 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-0.5">Route Latency</p>
                                            <p className="text-sm font-mono font-bold text-blue-400">0.004s</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-0.5">Data Stack</p>
                                            <p className="text-sm font-mono font-bold text-emerald-400">POSTGIS</p>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.96 }}
                                        className="w-full mt-4 bg-blue-600 py-3.5 rounded-2xl text-[11px] font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/40"
                                    >
                                        NAVIGATE USA <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Home Indicator */}
                <div className="h-6 w-full flex justify-center items-center pb-2">
                    <div className="w-20 h-1 bg-white/10 rounded-full" />
                </div>
            </div>
        </div>
    );
}