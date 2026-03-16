"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe, Fingerprint, Package, Navigation, Bus,
    Radar, CloudRain, MessageSquare, AlertOctagon,
    ClipboardList, PenTool, PieChart, Wifi, Battery,
    CheckCircle2
} from 'lucide-react';

export default function DiverseFFTAnimation() {
    const [step, setStep] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev < 12 ? prev + 1 : 1));
        }, 4000); // 4 seconds per unique animation
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center justify-center w-full">
            {/* --- MOBILE HARDWARE FRAME --- */}
            <div className="relative w-[400px] sm:w-[500px] h-[620px] sm:h-[700px] bg-[#050505] rounded-[3.2rem] border-[10px] border-[#1a1c22] shadow-[0_0_80px_rgba(99,102,241,0.15)] overflow-hidden scale-[0.9] sm:scale-100 transition-transform">

                {/* Notch & Status */}
                <div className="absolute top-0 w-full h-12 flex justify-between items-center px-10 z-50">
                    <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">FFT_OS v.2.6</span>
                    <div className="w-16 h-4 bg-black rounded-b-xl shadow-inner" />
                    <div className="flex gap-2 opacity-30 text-white">
                        <Wifi size={10} /><Battery size={10} />
                    </div>
                </div>

                {/* --- DYNAMIC STAGE CONTAINER --- */}
                <div className="relative h-full w-full bg-[#030303] flex flex-col pt-12">

                    <AnimatePresence mode="wait">

                        {/* 1. INITIALIZATION: Globe Rotation */}
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 2, opacity: 0 }} className="flex flex-col items-center gap-10 px-8">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="p-8 bg-indigo-600/10 rounded-full border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                                    <Globe size={80} className="text-indigo-500" />
                                </motion.div>
                                <h2 className="text-2xl font-black text-white italic text-center uppercase">Global<br />Sat-Link</h2>
                            </motion.div>
                        )}

                        {/* 2. AUTHENTICATION: Laser Scan */}
                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center px-8 relative">
                                <div className="relative p-10 bg-white/5 rounded-3xl border border-white/10">
                                    <Fingerprint size={100} className="text-white/20" />
                                    <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute left-0 right-0 h-1 bg-indigo-400 shadow-[0_0_15px_#6366f1] z-10" />
                                </div>
                                <h2 className="mt-10 text-xl font-bold text-indigo-400 tracking-[0.3em] uppercase">Auth Sync</h2>
                            </motion.div>
                        )}

                        {/* 3. INVENTORY: Grid Expansion */}
                        {step === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 grid grid-cols-3 gap-2">
                                {[...Array(9)].map((_, i) => (
                                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} className="aspect-square bg-indigo-500/20 border border-indigo-500/40 rounded-lg flex items-center justify-center">
                                        <Package size={16} className="text-indigo-400" />
                                    </motion.div>
                                ))}
                                <div className="col-span-3 mt-6 text-center">
                                    <h2 className="text-sm font-black text-white uppercase">Asset Checklist</h2>
                                </div>
                            </motion.div>
                        )}

                        {/* 4. ROUTING: Branching Lines */}
                        {step === 4 && (
                            <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-8 h-full">
                                <svg className="w-full h-64" viewBox="0 0 100 100">
                                    <motion.path d="M10 50 L 40 50 M 40 50 L 60 20 L 90 20 M 40 50 L 60 80 L 90 80" fill="none" stroke="#6366f1" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
                                </svg>
                                <h2 className="text-center text-indigo-400 font-mono text-[10px] tracking-widest mt-4">MULTIPATH_CALCULATION_V2</h2>
                            </motion.div>
                        )}

                        {/* 5. LIVE TRACKING: Speed Blur */}
                        {step === 5 && (
                            <motion.div key="s5" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col items-center justify-center h-full pb-20">
                                <motion.div animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.1 }}>
                                    <Bus size={120} className="text-white opacity-20 italic" />
                                </motion.div>
                                <div className="mt-[-60px] text-center">
                                    <span className="text-6xl font-black text-white italic">104</span>
                                    <p className="text-indigo-500 font-bold">KM/H SPEED</p>
                                </div>
                            </motion.div>
                        )}

                        {/* 6. GEOFENCE: Radial Ripples */}
                        {step === 6 && (
                            <motion.div key="s6" className="flex items-center justify-center h-full pb-20">
                                <div className="relative">
                                    {[1, 2, 3].map(i => (
                                        <motion.div key={i} animate={{ scale: [1, 3], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }} className="absolute inset-0 border-2 border-emerald-500 rounded-full" />
                                    ))}
                                    <div className="bg-emerald-500 p-6 rounded-full relative z-10 shadow-[0_0_30px_#10b981]">
                                        <Radar size={40} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 7. WEATHER: Falling Particles */}
                        {step === 7 && (
                            <motion.div key="s7" className="flex flex-col items-center justify-center h-full pb-20 relative">
                                <CloudRain size={80} className="text-blue-300 mb-6" />
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div key={i} animate={{ y: [0, 100], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-1 h-4 bg-blue-400 rounded-full" />
                                    ))}
                                </div>
                                <h2 className="mt-6 text-sm font-bold text-white uppercase italic">Condition: Heavy Rain</h2>
                            </motion.div>
                        )}

                        {/* 8. COMMUNICATION: Chat Slide */}
                        {step === 8 && (
                            <motion.div key="s8" className="px-6 space-y-4">
                                {[0, 1, 2].map(i => (
                                    <motion.div key={i} initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.3 }} className={`p-4 rounded-2xl max-w-[80%] ${i % 2 === 0 ? 'bg-blue-600 self-start' : 'bg-white/10 self-end ml-auto'}`}>
                                        <div className="h-2 w-12 bg-white/20 rounded-full mb-2" />
                                        <div className="h-2 w-20 bg-white/10 rounded-full" />
                                    </motion.div>
                                ))}
                                <div className="flex justify-center mt-4 text-indigo-400 italic font-bold text-[10px]">HQ_MESSAGE_SYNC</div>
                            </motion.div>
                        )}

                        {/* 9. EMERGENCY: Strobe Warning */}
                        {step === 9 && (
                            <motion.div key="s9" animate={{ backgroundColor: ["#000", "#7f1d1d", "#000"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute inset-0 flex flex-col items-center justify-center">
                                <AlertOctagon size={100} className="text-white animate-bounce" />
                                <h2 className="text-3xl font-black text-white uppercase italic mt-6 tracking-tighter">Emergency</h2>
                            </motion.div>
                        )}

                        {/* 10. CHECKLIST: Morphing Ticks */}
                        {step === 10 && (
                            <motion.div key="s10" className="px-10 space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-4">
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.4 }} className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                            <CheckCircle2 size={16} className="text-white" />
                                        </motion.div>
                                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: i * 0.4 }} className="h-4 bg-white/5 rounded-full" />
                                    </div>
                                ))}
                                <h2 className="text-center font-black text-white text-xs pt-4 tracking-widest uppercase">Job Progress 100%</h2>
                            </motion.div>
                        )}

                        {/* 11. SIGNATURE: Drawing Path */}
                        {step === 11 && (
                            <motion.div key="s11" className="px-8 flex flex-col items-center">
                                <div className="w-full h-40 bg-white rounded-3xl relative overflow-hidden flex items-center justify-center">
                                    <svg className="w-full h-full p-4" viewBox="0 0 100 100">
                                        <motion.path d="M10 50 C 20 20, 40 80, 60 50 S 80 20, 90 50" fill="none" stroke="#000" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3 }} />
                                    </svg>
                                    <div className="absolute top-2 right-4 text-[8px] font-bold text-slate-400">SIGN HERE</div>
                                </div>
                                <PenTool size={32} className="text-white mt-6 animate-pulse" />
                                <h2 className="mt-2 text-xs font-bold text-white uppercase">Client Validation</h2>
                            </motion.div>
                        )}

                        {/* 12. ANALYTICS: Chart Growth */}
                        {step === 12 && (
                            <motion.div key="s12" className="px-8 space-y-8">
                                <div className="flex justify-center">
                                    <motion.div initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="p-10 border-8 border-blue-500 rounded-full border-t-transparent">
                                        <PieChart size={60} className="text-white" />
                                    </motion.div>
                                </div>
                                <div className="space-y-2">
                                    {[0.9, 0.7, 0.85].map((val, i) => (
                                        <div key={i} className="h-4 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${val * 100}%` }} className="h-full bg-indigo-600" />
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full bg-indigo-600 py-4 rounded-2xl font-black text-white italic uppercase shadow-xl shadow-indigo-900/40">Complete Cycle</button>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* PROGRESS STEPS INDICATOR */}
                    <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between gap-1">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-500 ${step === i + 1 ? 'bg-indigo-500 scale-y-150' : 'bg-white/10'}`} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}