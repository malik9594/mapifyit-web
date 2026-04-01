"use client"
import React, { useState, useEffect } from 'react';
import {
    Route, Zap, MousePointer2, BoxSelect, Database,
    Share2, Compass, Settings, Mountain, Scan, Satellite,
    Crosshair, Activity, Cpu, ArrowLeft, ExternalLink,
    Layers, ShieldCheck, Monitor, Server, Cloud, Shield, Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import GISShowcase from './GISShowCase';

// --- Internal Component: Improved GIS Visual Screen ---
const GISVisualEngine = () => {
    const [telemetry, setTelemetry] = useState({ lat: 25.1840, lng: 55.2608 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTelemetry({
                lat: 25.1840 + (Math.random() - 0.5) * 0.005,
                lng: 55.2608 + (Math.random() - 0.5) * 0.005
            });
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full bg-[#080E18] overflow-hidden group">
            {/* Background Texture & Grid */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/topographic-map.png')] grayscale invert" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Moving Scan Line */}
            <div className="absolute inset-0 w-full h-[15%] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent border-b border-cyan-500/20 animate-scan pointer-events-none" />

            {/* Central Target & Pulsing Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                    <Crosshair className="w-16 h-16 text-cyan-400/30 animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
                    </div>
                    <div className="absolute inset-[-40px] border border-cyan-500/20 rounded-full animate-ping-slow" />
                </div>
            </div>

            {/* Live HUD Elements */}
            <div className="absolute top-6 left-6 space-y-3 z-20">
                <div className="bg-slate-950/90 backdrop-blur-xl border border-white/5 p-3 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Engine Status</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="text-[11px] font-mono text-white">VECT_RENDER: 60FPS</span>
                    </div>
                </div>
                <div className="bg-slate-950/90 backdrop-blur-xl border border-white/5 p-3 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Telemetry</span>
                    </div>
                    <p className="text-[10px] font-mono text-cyan-400/80">LAT: {telemetry.lat.toFixed(5)}</p>
                    <p className="text-[10px] font-mono text-cyan-400/80">LNG: {telemetry.lng.toFixed(5)}</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan { 0% { transform: translateY(-110%); } 100% { transform: translateY(700%); } }
                .animate-scan { animation: scan 6s linear infinite; }
                .animate-spin-slow { animation: spin 12s linear infinite; }
                .animate-ping-slow { animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
                @keyframes ping { 75%, 100% { transform: scale(1.5); opacity: 0; } }
            `}</style>
        </div>
    );
};

// --- Main Component ---
export default function GeospatialModuleShowcaseCool() {
    const router = useRouter();
    const gisTools = [
        { icon: Route, title: "Terrain Routing", desc: "Elevation-aware pathfinding algorithms across complex 3D topography.", color: "cyan" },
        { icon: Zap, title: "Isochrone Analysis", desc: "Generate real-time travel-time polygons to identify reachability zones.", color: "blue" },
        { icon: Scan, title: "LiDAR Point Cloud", desc: "Classify and visualize intelligence from high-density aerial LiDAR scans.", color: "cyan" },
        { icon: Mountain, title: "DEM Elevation Models", desc: "High-resolution elevation modeling for watershed and slope analysis.", color: "blue" },
        { icon: BoxSelect, title: "Spatial Clustering", desc: "AI-driven pattern detection and heatmap generation across global datasets.", color: "cyan" },
        { icon: MousePointer2, title: "Vector Digitization", desc: "Precision coordinate drawing for land boundary and infrastructure marking.", color: "blue" },
        { icon: Satellite, title: "Satellite Feature Sync", desc: "AI extraction of roads and buildings from multi-spectral imagery feeds.", color: "cyan" },
        { icon: Database, title: "Multi-Format Sync", desc: "Simultaneous alignment of Shapefiles, KML, and GeoJSON into one truth.", color: "blue" },
        { icon: Layers, title: "Layer Orchestration", desc: "Stacking diverse vector and raster data without loss of spatial precision.", color: "cyan" },
        { icon: ShieldCheck, title: "Data Sovereignty", desc: "100% air-gapped security for sensitive governmental geospatial intelligence.", color: "blue" }
    ];

    return (
        <section id="gis-tools" className="py-5 relative overflow-hidden bg-[#030712]">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center mb-10">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group cursor-pointer"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                    </button>

                    <a
                        href="https://maps.mapifyit.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                    >
                        Explore GIS <ExternalLink size={14} className="opacity-70" />
                    </a>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
                    {/* Left Side: Header & Intro */}
                    <div className="pt-0 md:pt-4 lg:pr-12 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                            GIS Mapping Tools &amp; Spatial Analysis Solutions by MapifyIt
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            MapifyIt GIS is a powerful enterprise geospatial platform designed for organizations managing large-scale GIS projects, spatial intelligence, and mission-critical geospatial infrastructure. Built for governments, enterprises, defense organizations, and infrastructure operators, MapifyIt enables teams to deploy and manage advanced GIS systems with full control over their spatial data.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed mt-4 max-w-2xl mx-auto lg:mx-0">
                            Unlike traditional cloud-dependent platforms, MapifyIt GIS can run fully on-premise or within private infrastructure, allowing organizations to operate secure geospatial systems while maintaining complete data sovereignty.
                        </p>
                    </div>

                    {/* Right Side: Visual Showcase */}
                    <div className="h-[400px] md:h-[500px] lg:h-[600px] w-full pt-0 md:pt-4">
                        <GISShowcase />
                    </div>
                </div>

                {/* Bottom Section: 10 Feature Tools Grid (Full Width) */}
                <div className="mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-800/50 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-8">
                        <Compass className="w-3.5 h-3.5" /> Core Platform Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {gisTools.map((tool, i) => (
                            <div key={i} className="group p-5 rounded-2xl border border-white/5 bg-slate-950/50 hover:bg-slate-900 transition-all hover:border-cyan-500/30 flex flex-col h-full">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-transform group-hover:scale-110 ${tool.color === 'cyan' ? 'border-cyan-800 bg-cyan-950 text-cyan-300' : 'border-blue-800 bg-blue-950 text-blue-300'}`}>
                                    <tool.icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-white font-semibold mb-2 text-sm">{tool.title}</h4>
                                <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Extended GIS Content Sections --- */}
                <div className="mt-2 space-y-5">
                    {/* section 1: Project Lifecycle & Secure Deployment */}
                    <div className="grid md:grid-cols-2 gap-16">
                        <Reveal delay={100}>
                            <div className="p-8 rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl hover:border-blue-500/20 transition-all group h-full flex flex-col">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-6">Designed for Modern GIS Projects</h2>
                                <p className="text-slate-400 leading-relaxed mb-8">
                                    MapifyIt supports the full lifecycle of enterprise GIS deployments, from spatial data ingestion and mapping to advanced geospatial analytics and operational intelligence.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-auto">
                                    {[
                                        "National and regional GIS platforms",
                                        "Smart city geospatial systems",
                                        "Transportation and mobility mapping",
                                        "Defense and security geospatial intelligence",
                                        "Utility network and infrastructure mapping",
                                        "Land management and cadastral systems",
                                        "Environmental monitoring and disaster response",
                                        "Asset tracking and field operations"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 text-[13px] text-slate-200 font-semibold hover:bg-white/10 hover:border-blue-500/30 transition-all">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_theme(colors.blue.500)] flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="p-8 rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl hover:border-emerald-500/20 transition-all group h-full">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-6">Secure and Flexible Deployment</h2>
                                <p className="text-slate-400 leading-relaxed mb-8">
                                    MapifyIt is built for organizations that require secure, scalable GIS infrastructure. We offer flexible deployment models to suit your governance needs.
                                </p>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    {[
                                        { icon: Shield, title: "On-Premise Deployment", desc: "Full air-gapped security behind your own firewall." },
                                        { icon: Cloud, title: "Private Cloud", desc: "Dedicated instance on AWS, Azure, or Google Cloud." },
                                        { icon: Server, title: "Secure SaaS", desc: "Managed multi-tenant environment with high compliance." }
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
                                    <span>Ensures high security, regulatory compliance, and full ownership of spatial datasets without third-party exposure.</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Section 2: Enterprise Capabilities & Scalable Infrastructure */}
                    <div className="grid md:grid-cols-2 gap-16 items-stretch pt-2">
                        {/* Left Side: Icon Grid (The "Perfect" side) */}
                        <Reveal delay={200} className="order-last md:order-first">
                            <div className="grid grid-cols-2 gap-4 h-full">
                                {[
                                    { title: "Spatial Data Management", icon: Database },
                                    { title: "High-Performance Rendering", icon: Zap },
                                    { title: "Advanced Analytics", icon: Activity },
                                    { title: "Custom Visualization", icon: Mountain },
                                    { title: "Routing & Optimization", icon: Route },
                                    { title: "Geocoding Suite", icon: Compass },
                                    { title: "Field Data Collection", icon: Scan },
                                    { title: "Operational Dashboards", icon: Monitor }
                                ].map((cap, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col items-center justify-center text-center group hover:bg-slate-800/50 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                                            <cap.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{cap.title}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Right Side: Structured Feature Card (Fixed to match UI/UX) */}
                        <Reveal delay={400} className="h-full">
                            <div className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-slate-950/40 backdrop-blur-xl h-full flex flex-col justify-center relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full -mr-16 -mt-16" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-8">
                                        <Cpu className="w-3.5 h-3.5" /> High Performance
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">Enterprise Geospatial Capabilities</h2>

                                    <div className="space-y-6 text-slate-400">
                                        <p className="text-lg leading-relaxed">
                                            Professional-grade engines designed for massive spatial datasets and high-concurrency requests.
                                        </p>
                                        <p className="text-sm leading-relaxed font-light pl-6 border-l border-white/10 italic">
                                            "MapifyIt powers national-scale mapping systems with unrivaled performance at every zoom level."
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Uptime: 99.9%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-3.5 h-3.5 text-blue-500" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Global Sync</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
