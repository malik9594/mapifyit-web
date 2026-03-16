"use client"
import React, { useState, useEffect } from 'react';
import {
    Route, Zap, MousePointer2, BoxSelect, Database,
    Share2, Compass, Settings, Mountain, Scan, Satellite,
    Crosshair, Activity, Cpu, ArrowLeft, ExternalLink,
    Layers, ShieldCheck, Monitor
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
        <section id="gis-tools" className="py-10 relative overflow-hidden bg-[#030712]">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center mb-12">
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

                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Left Side: 9 Feature Cards */}
                    <div className="pb-20">
                        <div className="mb-12">
                            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-xs font-bold uppercase tracking-widest text-cyan-300 mb-6">
                                <Compass className="w-4 h-4" /> Enterprise GIS Platform
                            </div> */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                                Enterprise GIS Platform  <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">for Global Geospatial Projects</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                MapifyIt GIS is a powerful enterprise geospatial platform designed for organizations managing large-scale GIS projects, spatial intelligence, and mission-critical geospatial infrastructure. Built for governments, enterprises, defense organizations, and infrastructure operators, MapifyIt enables teams to deploy and manage advanced GIS systems with full control over their spatial data.Unlike traditional cloud-dependent platforms, MapifyIt GIS can run fully on-premise or within private infrastructure, allowing organizations to operate secure geospatial systems while maintaining complete data sovereignty.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {gisTools.map((tool, i) => (
                                <div key={i} className="group p-5 rounded-xl border border-white/5 bg-slate-950 hover:bg-slate-900 transition-all">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border ${tool.color === 'cyan' ? 'border-cyan-800 bg-cyan-950 text-cyan-300' : 'border-blue-800 bg-blue-950 text-blue-300'}`}>
                                        <tool.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-white font-semibold mb-2">{tool.title}</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Sticky Live Screen */}
                    {/* <div className="lg:sticky lg:top-32 pb-10 order-first lg:order-last">
                        <div className="relative group">
                            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-700 to-cyan-400 rounded-[2.2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative bg-[#0A101F] border border-blue-950 rounded-[2rem] overflow-hidden shadow-2xl">
                                <div className="px-6 py-4 border-b border-blue-950/50 bg-slate-950 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-800" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                    </div>
                                    <span className="text-[11px] font-mono text-cyan-500 uppercase tracking-widest">Analytic_Workspace_v4</span>
                                    <Settings className="w-4 h-4 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" />
                                </div>

                                <div className="aspect-square md:aspect-[4/5] w-full bg-[#080E18] relative">
                                    <GISVisualEngine />

                                    <div className="absolute top-6 right-6 w-52 bg-slate-950/90 border border-cyan-900/50 backdrop-blur-xl rounded-2xl p-4 shadow-2xl z-30">
                                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-cyan-400">
                                            <Share2 className="w-3.5 h-3.5" />
                                            <span className="text-[11px] font-bold text-white uppercase tracking-tight">Active Modules</span>
                                        </div>
                                        <div className="space-y-3">
                                            {['Isochrone Analysis', 'Terrain Routing', 'Spatial Buffer', 'LiDAR Scan'].map((label, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className="text-[11px] text-slate-300">{label}</span>
                                                    <div className={`w-7 h-3.5 rounded-full relative ${i % 2 === 0 ? 'bg-cyan-500' : 'bg-blue-500'}`}>
                                                        <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-white" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <GISShowcase />
                </div>

                {/* --- Extended GIS Content Sections --- */}
                <div className="mt-2 space-y-5">
                    {/* section 1: Project Lifecycle & Secure Deployment */}
                    <div className="grid md:grid-cols-2 gap-16">
                        <Reveal delay={100}>
                            <div className="p-8 rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl hover:border-blue-500/20 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-6">Designed for Modern GIS Projects</h2>
                                <p className="text-slate-400 leading-relaxed mb-8">
                                    MapifyIt supports the full lifecycle of enterprise GIS deployments, from spatial data ingestion and mapping to advanced geospatial analytics and operational intelligence.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        <li key={idx} className="flex items-start gap-3 text-xs text-slate-500 leading-tight">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="flex flex-col justify-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Secure and Flexible Deployment</h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    MapifyIt is built for organizations that require secure, scalable GIS infrastructure. The platform supports on-premise, private cloud, and hybrid deployments, enabling governments and enterprises to manage geospatial data within their own controlled environments.
                                </p>
                                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 text-sm leading-relaxed">
                                    <div className="flex items-center gap-3 mb-3">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span className="font-bold uppercase tracking-wider text-xs">Sovereignty Guaranteed</span>
                                    </div>
                                    This architecture ensures high security, regulatory compliance, and full ownership of spatial datasets without any third-party exposure.
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Section 2: Enterprise Capabilities & Scalable Infrastructure */}
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <Reveal delay={200} className="order-last md:order-first">
                            <div className="grid grid-cols-2 gap-4">
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
                                    <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col items-center text-center group hover:bg-slate-800/50 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                                            <cap.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{cap.title}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={400}>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">Enterprise Geospatial Capabilities</h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                                    Professional-grade tools designed for massive spatial datasets and high-concurrency requests. MapifyIt provides the core engines that power global mapping systems.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Built for Scalable GIS Infrastructure</h3>
                                        <p className="text-slate-400 leading-relaxed text-sm">
                                            From city-scale mapping systems to national geospatial platforms, MapifyIt provides the performance and flexibility required for complex geospatial operations. The platform is designed to support high-volume spatial data, real-time analytics, and mission-critical GIS deployments worldwide.
                                        </p>
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