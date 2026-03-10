import React from 'react';
import {
    Route,
    Zap,
    Maximize,
    MousePointer2,
    BoxSelect,
    Database,
    Share2,
    Compass,
    Settings,
    Mountain,
    Scan,
    Satellite,
} from 'lucide-react';
import { Reveal } from './Reveal';
import GISVisualEngine from './GISVisualEngine';

// Adopted from the reference image:
// - Background: #030712 (or very dark blue-black)
// - Primary Blue: #3B82F6 (Electric Blue)
// - Cyan Accent: #22D3EE (Light Cyan)

export default function GeospatialModuleShowcaseCool() {
    const gisTools = [
        { icon: Route, title: "Terrain Routing", desc: "Elevation-aware pathfinding across complex topography.", color: "cyan" },
        { icon: Zap, title: "Isochrone Analysis", desc: "Real-time travel-time polygons for reachability zones.", color: "blue" },
        { icon: MousePointer2, title: "Drawing Tools", desc: "Precision geodesic measurement and annotation tools.", color: "cyan" },
        { icon: BoxSelect, title: "Spatial Analysis", desc: "Heatmaps, spatial joins, and pattern recognition.", color: "blue" },
        { icon: Maximize, title: "Buffer Generation", desc: "Automated exclusion and proximity zone alerts.", color: "blue" },
        { icon: Database, title: "Data Integration", desc: "Import/sync Shapefiles, KML, and GeoJSON offline.", color: "cyan" },
        { icon: Mountain, title: "DEM Analysis", desc: "Digital Elevation Models for watershed and slope analysis.", color: "blue" },
        { icon: Scan, title: "LiDAR Processing", desc: "High-density point cloud visualization and classification.", color: "cyan" },
        { icon: Satellite, title: "Satellite Imagery", desc: "Multi-spectral high-resolution satellite data pipelines.", color: "blue" }
    ];

    return (
        <section id="gis-tools" className="py-20 relative overflow-hidden bg-[#030712]">
            {/* Unified Cool-Toned Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Top Border Accent (Adopted from referene image's subtle light) */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Content Section - LEFT SIDE (LONG) */}
                    <div className="pb-20">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-cyan-300 mb-6">
                                <Compass className="w-4 h-4" /> Analytic Workspace Suite
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                                Beyond Simple Maps.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Spatial Intelligence Engine.</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                Mapifyit provides a full-spectrum <strong>Geospatial Toolset</strong>. From <strong>Isochrone analysis</strong> for logistics to <strong>Terrain routing</strong> for defense, our modules are designed to run 100% on-premise without cloud latency.
                            </p>
                        </Reveal>

                        {/* Grid of 9 tools - Long section */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {gisTools.map((tool, i) => (
                                <Reveal key={i} delay={i * 50}>
                                    <div className="group p-5 rounded-xl border border-white/5 bg-slate-950 hover:bg-slate-900 transition-all duration-300">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border transition-colors ${tool.color === 'cyan' ? 'border-cyan-800 bg-cyan-950 text-cyan-300 group-hover:bg-cyan-900' :
                                            'border-blue-800 bg-blue-950 text-blue-300 group-hover:bg-blue-900'
                                            }`}>
                                            <tool.icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-white font-semibold mb-2">{tool.title}</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Dashboard Visual - RIGHT SIDE (STICKY & TALLER) */}
                    <div className="lg:sticky lg:top-32 pb-10 md:pb-20 order-first md:order-last">
                        <Reveal delay={300}>
                            <div className="relative group">
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-700 to-cyan-400 rounded-[2.2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

                                <div className="relative bg-[#0A101F] border border-blue-950 rounded-[2rem] overflow-hidden shadow-2xl">
                                    <div className="px-6 py-4 border-b border-blue-950/50 bg-slate-950 flex items-center justify-between">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-800" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                        </div>
                                        <span className="text-[11px] font-mono text-cyan-500 tracking-[0.3em] uppercase">Analytic_Workspace_v4</span>
                                        <Settings className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                    </div>

                                    {/* Responsive Aspect Ratio: Square on mobile, Tall on desktop */}
                                    <div className="aspect-square md:aspect-[4/5] w-full bg-[#080E18] relative overflow-hidden">
                                        <GISVisualEngine />

                                        <div className="absolute top-6 right-6 w-52 bg-slate-950/90 border border-cyan-900/50 backdrop-blur-xl rounded-2xl p-4 shadow-2xl z-30">
                                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                                                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                                                <span className="text-[11px] font-bold text-white uppercase tracking-tight">Active GIS Modules</span>
                                            </div>
                                            <div className="space-y-3.5">
                                                {[
                                                    { label: 'Isochrone Analysis', status: 'ACTIVE', color: 'bg-cyan-500' },
                                                    { label: 'Terrain Routing', status: 'PAUSED', color: 'bg-slate-700' },
                                                    { label: 'Spatial Buffer', status: 'ACTIVE', color: 'bg-blue-500' },
                                                    { label: 'LiDAR Scan', status: 'ACTIVE', color: 'bg-cyan-500' },
                                                    { label: 'Satellite Feed', status: 'ACTIVE', color: 'bg-blue-500' }
                                                ].map((tool, i) => (
                                                    <div key={i} className="flex items-center justify-between">
                                                        <span className="text-[11px] text-slate-300">{tool.label}</span>
                                                        <div className={`w-7 h-3.5 rounded-full relative transition-colors ${tool.color}`}>
                                                            <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${tool.status === 'ACTIVE' ? 'right-0.5' : 'left-0.5'}`} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
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