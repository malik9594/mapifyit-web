"use client"
import React from 'react';
import { Truck, Navigation, Timer, ArrowLeft, BarChart3, ExternalLink, ShieldCheck, Layers, Shield, Cloud, Server, Globe, Cpu, Activity, Database, Mountain, Monitor, Compass, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';

export default function RoutingPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Glows (Matching Infrastructure style) */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Reveal>
                    {/* Header Controls */}
                    <div className="flex justify-between items-center mb-12">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors group cursor-pointer"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                        </button>

                        <a
                            href="https://maps.mapifyit.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500 hover:bg-amber-500/20 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                        >
                            Explore Routing Solver <ExternalLink size={14} className="opacity-70" />
                        </a>
                    </div>

                    {/* Hero Split Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight uppercase">
                                Enterprise <span className="text-amber-500">Routing Platform</span> <br />
                                <span className="text-2xl md:text-3xl font-light text-slate-400 normal-case">for Global Logistics Projects</span>
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed font-light mb-8">
                                MapifyIt Routing is an enterprise-grade optimization engine built for organizations managing large-scale delivery networks, field logistics, and supply chain infrastructure. Engineered for speed and precision, it solves the most challenging multi-stop routing problems while maintaining full data sovereignty.
                            </p>
                            <p className="text-slate-400 leading-relaxed font-light">
                                Unlike traditional cloud-dependent platforms, MapifyIt can run fully on-premise, allowing organizations to maintain total privacy for sensitive tactical routes and logistics manifests.
                            </p>
                        </div>

                        {/* Right Side: Cost Insights Card */}
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-slate-950/40 border border-white/5 backdrop-blur-xl hover:border-amber-500/10 transition-colors">
                            <h2 className="text-3xl font-bold mb-6">Cost-Per-Mile Insights</h2>
                            <p className="text-slate-300 mb-8 leading-relaxed font-light">
                                Our routing engine provides not just the fastest path, but the most cost-efficient one. Stop paying for legacy markups and take control of your logistics margins.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-8 items-center">
                                <ul className="space-y-4 flex-1">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Multi-stop TSP optimization
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Dynamic real-time re-routing
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Load-aware constraints
                                    </li>
                                </ul>
                                <div className="w-24 h-24 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center">
                                    <BarChart3 className="w-10 h-10 text-amber-500 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Feature Grid Section */}
                    <div className="mb-32">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/30 border border-amber-800/50 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-8">
                            <Compass className="w-3.5 h-3.5" /> Core Platform Capabilities
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-10 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-amber-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Truck className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Fleet Management</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">Solve complex TSP problems with 100+ waypoints for maximum efficiency.</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest leading-relaxed">Optimization</p>
                            </div>

                            <div className="p-10 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Timer className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Real-Time ETAs</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">Automatic re-routing based on live traffic pulse and incident reports.</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest leading-relaxed">Accuracy</p>
                            </div>

                            <div className="p-10 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Navigation className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Traffic Pulse</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">Map exact distance reachable within specific time or distance parameters.</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest leading-relaxed">Dynamic Routing</p>
                            </div>
                        </div>
                    </div>

                    {/* --- Extended content sections (Matching Infrastructure depth) --- */}
                    <div className="space-y-32 mb-20">
                        {/* Section 1: Modern Logistics & Lifecycle */}
                        <div className="grid md:grid-cols-2 gap-16">
                            <Reveal delay={100}>
                                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-slate-950/40 backdrop-blur-xl hover:border-amber-500/20 transition-all group h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-6">Designed for Modern Logistics Projects</h2>
                                    <p className="text-slate-400 leading-relaxed mb-8">
                                        MapifyIt supports the full lifecycle of enterprise routing deployments, from daily route orchestration to advanced geospatial analytics and operational logistics.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-auto">
                                        {[
                                            "National delivery platforms",
                                            "Smart city logistics systems",
                                            "Supply chain optimization",
                                            "Defense and security logistics",
                                            "Utility field-service routing",
                                            "Last-mile delivery networks",
                                            "Emergency response mapping",
                                            "Asset tracking & dispatch"
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 text-[12px] text-slate-200 font-semibold hover:bg-white/10 hover:border-amber-500/30 transition-all">
                                                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_theme(colors.amber.500)] flex-shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={300}>
                                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-slate-950/40 backdrop-blur-xl hover:border-emerald-500/20 transition-all group h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-6">Secure and Sovereign Deployment</h2>
                                    <p className="text-slate-400 leading-relaxed mb-8">
                                        MapifyIt Routing is built for organizations that require secure, scalable logistics infrastructure. We offer flexible deployment models for total data control.
                                    </p>

                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        {[
                                            { icon: Shield, title: "On-Premise Solver", desc: "Full air-gapped security behind your own private firewall." },
                                            { icon: Cloud, title: "Private Cloud Fleet", desc: "Dedicated solver nodes on AWS, Azure, or private cloud." },
                                            { icon: Server, title: "Secure SaaS Nodes", desc: "Managed multi-tenant solver with high compliance standards." }
                                        ].map((mode, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                                    <mode.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">{mode.title}</h4>
                                                    <p className="text-slate-500 text-[11px] leading-tight">{mode.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 text-[11px] leading-relaxed flex gap-3 items-center mt-auto">
                                        <ShieldCheck className="w-5 h-5 shrink-0" />
                                        <span>Ensures high security, regulatory compliance, and full ownership of logistics manifests.</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Section 2: Enterprise Capabilities Grid */}
                        <div className="grid md:grid-cols-2 gap-16 items-stretch">
                            {/* Left Side: Icon Grid */}
                            <Reveal delay={200} className="order-last md:order-first">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {[
                                        { title: "TSP & VRP Solve Engines", icon: Activity },
                                        { title: "Matrix Routing Engine", icon: Database },
                                        { title: "Isochrone Reachability", icon: MapPin },
                                        { title: "Load-Aware Pathfinding", icon: Truck },
                                        { title: "Multi-Stops Batching", icon: Timer },
                                        { title: "Address Geocoding", icon: Compass },
                                        { title: "Time-Window Constraints", icon: Timer },
                                        { title: "Fleet Management Hub", icon: Monitor }
                                    ].map((cap, i) => (
                                        <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col items-center justify-center text-center group hover:bg-slate-800/50 transition-all">
                                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                                                <cap.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{cap.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>

                            {/* Right Side: High Performance Card */}
                            <Reveal delay={400} className="h-full">
                                <div className="p-10 md:p-12 rounded-[2.5rem] border border-white/5 bg-slate-950/40 backdrop-blur-xl h-full flex flex-col justify-center relative group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full -mr-16 -mt-16" />

                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-8">
                                            <Cpu className="w-3.5 h-3.5" /> Millisecond solver
                                        </div>

                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Enterprise Scaling Capabilities</h2>

                                        <div className="space-y-6 text-slate-400">
                                            <p className="text-lg leading-relaxed">
                                                Advanced routing engines designed for massive logistics matrices and high-concurrency dispatch requests.
                                            </p>
                                            <p className="text-sm leading-relaxed font-light pl-6 border-l border-white/10 italic">
                                                "MapifyIt powers national-scale logistics systems with unrivaled solver performance at every fleet size."
                                            </p>
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Uptime: 99.9%</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-3.5 h-3.5 text-blue-500" />
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Global Coverage</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
