"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Activity, Layers, ArrowRight, Navigation, Truck, Bus, Car, Footprints } from 'lucide-react';

export default function MapifyitMultiModalShowcase() {
    const [step, setStep] = useState(0);
    const [mode, setMode] = useState('car'); // car, pedestrian, bus
    const [syncProgress, setSyncProgress] = useState(0);

    const locations = [
        {
            city: "Manhattan Hub",
            desc: "7th Ave → Warehouse B → Broadway",
            color: "text-blue-400",
            path: "M 40 450 L 120 380 L 220 320",
            carDist: "4.2 mi", pedDist: "3.8 mi", busDist: "5.1 mi",
            bgShift: { x: -50, y: -20, scale: 1.5 }
        },
        {
            city: "LA Terminal",
            desc: "Sunset Blvd → Sorting → Marina",
            color: "text-indigo-400",
            path: "M 220 320 L 150 200 L 60 120",
            carDist: "12.8 mi", pedDist: "11.2 mi", busDist: "14.5 mi",
            bgShift: { x: -120, y: -60, scale: 1.8 }
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep((prev) => (prev + 1) % (locations.length * 2));
        }, step % 2 === 0 ? 1200 : 6000);

        if (step % 2 !== 0) {
            setSyncProgress(0);
            const int = setInterval(() => {
                setSyncProgress(prev => prev < 100 ? prev + 3 : 100);
            }, 50);
            return () => clearInterval(int);
        }
        return () => clearTimeout(timer);
    }, [step]);

    const isTyping = step % 2 === 0;
    const current = locations[Math.floor(step / 2) % locations.length];

    // Mode-based speed logic
    const getAnimDuration = () => {
        if (mode === 'pedestrian') return 15; // Slow walk
        if (mode === 'bus') return 9; // Medium transit
        return 4; // Fast car
    };

    return (
        <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[650px] rounded-[50px] mx-auto bg-[#0B0F24] shadow-2xl overflow-hidden p-[1px] border border-white/10 font-sans">
            <div className="relative w-full h-full rounded-[48px] bg-[#020517] overflow-hidden flex flex-col">

                {/* --- HEADER --- */}
                <div className="h-10 w-full flex justify-between items-center px-8 pt-4 z-50 bg-[#020517]/90 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[7px] text-white/70 font-black tracking-[0.2em]">TRANSIT ENGINE v4.3</span>
                    </div>
                    <div className="w-12 h-4 bg-[#1A1D2E] rounded-full" />
                    <Layers className="w-3 h-3 text-blue-400" />
                </div>

                {/* --- MAIN RENDERING AREA --- */}
                <div className="flex-1 relative overflow-hidden bg-[#040712]">

                    {/* --- VECTOR MAP STYLE --- */}
                    <motion.div
                        animate={{ x: current.bgShift.x, y: current.bgShift.y, scale: current.bgShift.scale }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="absolute inset-0 z-0 opacity-90"
                    >
                        <svg width="1000" height="1200" viewBox="0 0 1000 1200" fill="none">
                            <pattern id="urban-mesh" width="200" height="200" patternUnits="userSpaceOnUse">
                                <rect x="10" y="10" width="40" height="60" rx="2" fill="#1e293b" opacity="0.4" />
                                <rect x="100" y="10" width="80" height="120" rx="2" fill="#1e293b" opacity="0.2" />
                                <path d="M0 80 H200 M50 0 V200" stroke="#1e293b" strokeWidth="1" />
                                <text x="55" y="75" fill="#334155" fontSize="6" fontWeight="bold">AL MUSTAQBAL ST</text>
                            </pattern>
                            <rect width="2000" height="2000" fill="url(#urban-mesh)" />
                            <path d="M600 0 C 550 300 700 600 600 1200 H 1000 V 0 Z" fill="#0c1633" opacity="0.6" />
                        </svg>
                    </motion.div>

                    {/* --- MODE SWITCHER UI --- */}
                    <div className="absolute top-28 right-4 z-50 flex flex-col gap-2">
                        {[
                            { id: 'car', icon: Car, label: 'Vehicle' },
                            { id: 'bus', icon: Bus, label: 'Transit' },
                            { id: 'pedestrian', icon: Footprints, label: 'Walking' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setMode(item.id)}
                                className={`p-2.5 rounded-xl border transition-all relative group/btn ${mode === item.id ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-[#101425]/80 border-white/10 text-white/40'}`}
                            >
                                <item.icon className="w-4 h-4" />
                                <div className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-[8px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                    {item.label}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* --- ROUTE PATH --- */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                        <AnimatePresence>
                            {!isTyping && (
                                <motion.path
                                    key={current.city + mode}
                                    d={current.path}
                                    fill="transparent"
                                    stroke={mode === 'pedestrian' ? '#10B981' : mode === 'bus' ? '#818CF8' : '#3b82f6'}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray={mode === 'bus' ? "8,6" : mode === 'pedestrian' ? "2,4" : "0"}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2 }}
                                    style={{ filter: mode === 'car' ? "drop-shadow(0 0 8px #3b82f6)" : "none" }}
                                />
                            )}
                        </AnimatePresence>
                    </svg>

                    {/* --- DYNAMIC VEHICLE / WALKING ICON --- */}
                    {!isTyping && (
                        <motion.div
                            key={mode}
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: getAnimDuration(), repeat: Infinity, ease: "linear" }}
                            style={{ offsetPath: `path("${current.path}")` }}
                            className="absolute z-30"
                        >
                            <div className={`rounded-full p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-white`}>
                                {mode === 'car' && <Truck className="w-3.5 h-3.5 text-blue-600" />}
                                {mode === 'bus' && <Bus className="w-3.5 h-3.5 text-indigo-600" />}
                                {mode === 'pedestrian' && (
                                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                                        <Footprints className="w-3.5 h-3.5 text-emerald-600" />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* --- TOP UI: SEARCH --- */}
                    <div className="absolute top-8 inset-x-4 z-50">
                        <div className="bg-[#101425]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <Search className="w-4 h-4 text-blue-400" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[7px] font-bold text-blue-400 tracking-[0.2em] uppercase">
                                        {isTyping ? "Optimizing Path..." : `${mode} logic enabled`}
                                    </p>
                                    <p className="text-[12px] text-white font-mono truncate">{isTyping ? "Searching..." : current.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTOM UI: TELEMETRY --- */}
                    <AnimatePresence>
                        {!isTyping && (
                            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="absolute bottom-6 inset-x-4 z-50">
                                <div className="bg-[#0A0D1F]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 left-0 h-1 bg-blue-500" style={{ width: `${syncProgress}%`, transition: 'width 0.1s' }} />

                                    <div className="flex justify-between items-center mb-5">
                                        <div className="flex items-center gap-2">
                                            <Navigation className="w-4 h-4 text-emerald-400" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Shortest Route</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${mode === 'pedestrian' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                            <div className={`w-1.5 h-1.5 rounded-full ${mode === 'bus' ? 'bg-indigo-500' : 'bg-white/20'}`} />
                                            <div className={`w-1.5 h-1.5 rounded-full ${mode === 'car' ? 'bg-blue-500' : 'bg-white/20'}`} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Distance</p>
                                            <p className="text-base font-mono font-bold text-blue-400">
                                                {mode === 'car' && current.carDist}
                                                {mode === 'pedestrian' && current.pedDist}
                                                {mode === 'bus' && current.busDist}
                                            </p>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Sync Status</p>
                                            <p className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                                                {syncProgress}% Live
                                            </p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-2xl text-[10px] font-bold text-white flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg">
                                        Confirm {mode} trip <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}