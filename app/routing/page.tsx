"use client"
import React from 'react';
import { Truck, Navigation, Timer, ArrowLeft, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';

export default function RoutingPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-[#03060D] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Reveal>
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mb-12 group cursor-pointer">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                    </button>

                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest">
                        Logistics Intelligence
                    </div> */}

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Intelligence <span className="text-amber-500">Routing.</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light mb-16">
                        Automate logistics and reduce operational costs with our multi-stop route optimization
                        and real-time traffic pulse monitoring systems.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all flex flex-col items-center text-center">
                            <Truck className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold mb-2">Fleet Management</h3>
                            <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-relaxed">Optimization</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all flex flex-col items-center text-center">
                            <Timer className="w-10 h-10 text-emerald-500 mb-4" />
                            <h3 className="font-bold mb-2">Real-Time ETAs</h3>
                            <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-relaxed">Accuracy</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center text-center">
                            <Navigation className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="font-bold mb-2">Traffic Pulse</h3>
                            <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-relaxed">Dynamic Routing</p>
                        </div>
                    </div>

                    <div className="p-12 rounded-[40px] bg-white/5 border border-white/10">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-6">Cost-Per-Mile Insights</h2>
                                <p className="text-slate-300 mb-8 leading-relaxed font-light">
                                    Our routing engine provides not just the fastest path, but the most cost-efficient one. Stop paying for legacy markups and take control of your logistics margins.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Multi-stop optimization
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Dynamic re-routing
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-64 h-64 bg-slate-800/40 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur-md">
                                <BarChart3 className="w-24 h-24 text-amber-500/30 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] -z-10 rounded-full" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[150px] -z-10 rounded-full" />
        </div>
    );
}
