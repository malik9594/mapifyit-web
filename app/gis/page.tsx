"use client"
import React from 'react';
import { Layers, Activity, Database, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export default function GISPage() {
    return (
        <div className="min-h-screen bg-[#03060D] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Reveal>
                    <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>

                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-bold text-purple-400 mb-8 uppercase tracking-widest">
                        Intelligence Solutions
                    </div> */}

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Specialized <span className="text-purple-500">GIS.</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light mb-16">
                        Unlock deep spatial insights with our specialized Geographic Information Systems.
                        From custom remote sensing to advanced demographic modeling.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Multi-Layer Intelligence</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Seamlessly overlay demographic, topographic, and proprietary business datasets to uncover hidden patterns.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                                <Database size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Big Data Geospatial</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Process and visualize millions of spatial records in real-time. Built for enterprise-scale decision making.
                            </p>
                        </div>
                    </div>

                    <div className="p-12 rounded-[40px] bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 text-center">
                        <Activity className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Data Sovereignty</h2>
                        <p className="text-slate-300 max-w-lg mx-auto mb-8">
                            Need a private GIS stack? Our ecosystem supports fully air-gapped on-premise deployments for ultimate data control.
                        </p>
                        <button className="px-8 py-4 bg-white text-[#03060D] font-bold rounded-xl hover:bg-slate-100 transition-all">
                            Request Demo
                        </button>
                    </div>
                </Reveal>
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -z-10 rounded-full" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />
        </div>
    );
}
