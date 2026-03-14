"use client"
import React, { useState, useEffect } from 'react';
import {
    Route, Zap, Maximize, MousePointer2, BoxSelect, Database,
    Share2, Compass, Settings, Mountain, Scan, Satellite,
    Crosshair, Activity, Shield, Cpu, ArrowLeft, ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';
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
        { icon: MousePointer2, title: "Drawing & Annotation", desc: "Geodesic polygon drawing and precision spatial annotation.", color: "cyan" },
        { icon: BoxSelect, title: "Spatial Data Analysis", desc: "Enterprise heatmaps and cluster detection on massive coordinate datasets.", color: "blue" },
        { icon: Maximize, title: "Proximity Buffer", desc: "Automated exclusion zone creation and geofence management.", color: "blue" },
        { icon: Database, title: "Multi-Format Integration", desc: "Import Shapefiles, KML, and GeoJSON in fully offline environments.", color: "cyan" },
        { icon: Mountain, title: "DEM Elevation Models", desc: "High-resolution elevation modeling for watershed and slope analysis.", color: "blue" },
        { icon: Scan, title: "LiDAR Point Cloud", desc: "Classify and visualize intelligence from high-density aerial LiDAR scans.", color: "cyan" },
        { icon: Satellite, title: "Satellite Integration", desc: "Analyze multi-spectral satellite imagery for intelligence.", color: "blue" }
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
                                GIS Built for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Enterprise Intelligence.</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Mapifyit GIS offers a complete enterprise geospatial platform for managing and analyzing spatial data. All modules run <strong>fully on-premise,</strong>giving organizations secure GIS operations without relying on cloud infrastructure.
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
            </div>
        </section>
    );
}