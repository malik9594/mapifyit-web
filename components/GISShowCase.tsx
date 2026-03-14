"use client"
import React, { useState, useEffect } from 'react';
import { Cpu, Globe, Map as MapIcon, Zap, Route, Scan, Mountain, Satellite, BoxSelect, ShieldCheck, Database, Layers } from 'lucide-react';

const SCENES = [
    { id: 'routing', title: "Terrain Routing", desc: "Calculating optimal path-finding logic across 3D surfaces with elevation-aware cost analysis.", icon: Route },
    { id: 'isochrone', title: "Isochrone Analysis", desc: "Generating reachability polygons based on specific travel-time and fuel consumption parameters.", icon: Zap },
    { id: 'lidar', title: "LiDAR Point Cloud", desc: "Real-time classification and filtering of high-density laser scanning data into infrastructure intelligence.", icon: Scan },
    { id: 'dem', title: "DEM Elevation", desc: "Processing raw heightmap rasters into high-fidelity topographic meshes for flood and line-of-sight analysis.", icon: Mountain },
    { id: 'spatial', title: "Spatial Clustering", desc: "Utilizing AI to detect density patterns, anomalies, and heatspots across massive global datasets.", icon: BoxSelect },
    { id: 'digitize', title: "Vector Digitization", desc: "Precision coordinate drawing for land boundary marking and urban infrastructure definition.", icon: MapIcon },
    { id: 'satellite', title: "Satellite Feature Sync", desc: "AI-driven road, building, and vegetation extraction from multi-spectral imagery feeds.", icon: Satellite },
    { id: 'multi', title: "Multi-Format Sync", desc: "Simultaneous alignment of Shapefiles, KML, and GeoJSON formats into a single spatial truth.", icon: Database },
    { id: 'layers', title: "Layer Orchestration", desc: "Stacking diverse vector and raster data types without loss of spatial precision or metadata.", icon: Layers },
    { id: 'sovereign', title: "Data Sovereignty", desc: "Ensuring 100% air-gapped security for sensitive defense and governmental geospatial intelligence.", icon: ShieldCheck }
];

export default function MapifyitGISLab() {
    const [activeScene, setActiveScene] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveScene((prev) => (prev + 1) % SCENES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full py-16 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-6xl mx-auto px-6">

                {/* --- MAIN GIS VIEWPORT --- */}
                <div className="relative h-[800px] w-full bg-[#050508] rounded-[3.5rem] border border-white/10 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)]">

                    {/* 1. THE DYNAMIC MAP CORE - Revitalized UI */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div
                            className="absolute inset-0 opacity-60 grayscale-[0.2] contrast-[1.8] brightness-[1.2] animate-panning bg-cover bg-center"
                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')` }}
                        />
                        {/* Moving Data Grids */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee15_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee15_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-rotate opacity-40" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />

                        {/* Ambient High-Tech Glows */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050508_85%)]" />
                        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px]" />
                    </div>

                    {/* 2. GIS EXPERIMENT LAYER (Logic Animations) */}
                    <div className="absolute top-0 left-0 w-full h-[65%] flex items-center justify-center overflow-hidden z-20 mix-blend-screen">
                        {SCENES.map((scene, index) => (
                            <div
                                key={scene.id}
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-[1500ms] ${activeScene === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                                    }`}
                            >
                                {/* Experiment Visual Modules */}
                                {scene.id === 'routing' && (
                                    <svg className="w-[500px] h-64 overflow-visible">
                                        <path d="M20 180 L80 40 L160 140 L240 20 L320 120 L450 40" fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="1000" strokeDashoffset="1000" className="animate-draw" />
                                        <circle r="7" fill="#22D3EE" className="shadow-[0_0_20px_#22D3EE]"><animateMotion dur="5s" repeatCount="indefinite" path="M20 180 L80 40 L160 140 L240 20 L320 120 L450 40" /></circle>
                                    </svg>
                                )}

                                {scene.id === 'isochrone' && (
                                    <div className="relative">
                                        <div className="w-64 h-64 rounded-full border border-cyan-400/20 bg-cyan-400/5 animate-ping-slow" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-40 h-40 border-2 border-dashed border-cyan-500/20 rounded-full animate-spin-slow" />
                                        </div>
                                    </div>
                                )}

                                {scene.id === 'dem' && (
                                    <div className="flex items-end gap-1.5 h-64">
                                        {[...Array(30)].map((_, i) => (
                                            <div key={i} className="w-3.5 bg-gradient-to-t from-blue-900 via-cyan-600 to-cyan-400 rounded-t-sm transition-all duration-[2000ms]" style={{ height: `${10 + Math.random() * 90}%` }} />
                                        ))}
                                    </div>
                                )}

                                {scene.id === 'lidar' && (
                                    <div className="grid grid-cols-12 gap-3 opacity-90">
                                        {[...Array(48)].map((_, i) => (
                                            <div key={i} className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22D3EE]" style={{ animationDelay: `${i * 0.1}s` }} />
                                        ))}
                                    </div>
                                )}

                                {!['routing', 'isochrone', 'dem', 'lidar'].includes(scene.id) && (
                                    <div className="relative">
                                        <div className="w-64 h-64 rounded-full border border-cyan-500/10 flex items-center justify-center animate-spin-slow">
                                            <scene.icon className="w-20 h-20 text-cyan-400 opacity-80 drop-shadow-[0_0_25px_#22D3EE]" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 3. HUD OVERLAY (Technical Details) */}
                    <div className="absolute inset-0 pointer-events-none z-50 p-12 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    {SCENES.map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full transition-all duration-700 ${activeScene === i ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' : 'bg-white/20'}`} />
                                    ))}
                                </div>
                                <span className="text-[11px] font-mono text-cyan-400/80 tracking-[0.5em] uppercase flex items-center gap-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                    <Globe size={16} className="text-cyan-400 animate-spin-slow" /> Mapifyit_Systems_v4.2_Alpha
                                </span>
                            </div>
                            {/* <div className="px-5 py-2 bg-[#050508]/90 border border-cyan-500/20 rounded-full backdrop-blur-xl">
                                <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest italic">Engine_Active: {SCENES[activeScene].id}</span>
                            </div> */}
                        </div>

                        <div className="flex justify-between items-end gap-2 pt-2">
                            <div className="bg-[#050508]/90 p-6 rounded-3xl border border-white/20 backdrop-blur-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <div className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.2em] text-left mb-1">Reference_Projection</div>
                                <div className="text-[13px] font-mono text-slate-200 tracking-wider drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">LAT 25.1840° N / LNG 55.2608° E</div>
                            </div>
                            <div className="text-right bg-[#050508]/90 p-6 rounded-3xl border border-white/20 backdrop-blur-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <div className="text-[9px] font-bold text-blue-400 uppercase flex items-center justify-end gap-2 mb-1 tracking-[0.2em]">
                                    Render_Pipeline <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                                <div className="text-[13px] font-mono text-white tracking-wider italic drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]">60.0 FPS // 4.1ms</div>
                            </div>
                        </div>
                    </div>

                    {/* 4. TEXT PANEL (Bottom Description) */}
                    <div className="absolute bottom-0 left-0 w-full h-[35%] mb-10 bg-gradient-to-t from-[#03060D] via-[#03060D]/95 to-transparent flex flex-col items-center justify-center px-12 text-center z-30">
                        {SCENES.map((scene, index) => (
                            <div key={scene.id} className={`absolute inset-0 flex flex-col items-center justify-center p-12 transition-all duration-[800ms] ${activeScene === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                                <h2 className="text-white text-xl md:text-4xl font-bold mb-6 tracking-tighter drop-shadow-2xl uppercase italic leading-none">
                                    {scene.title}
                                </h2>
                                {/* <p className="text-slate-400 text-sm md:text-xl leading-relaxed max-w-4xl font-medium tracking-wide">
                                    {scene.desc}
                                </p> */}
                            </div>
                        ))}
                    </div>

                    {/* Scanning Beam (Global Layer) */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/40 animate-scan-line z-50 shadow-[0_0_15px_#22D3EE]" />
                </div>
            </div>

            <style jsx>{`
                @keyframes scan-line { 0% { transform: translateY(0); } 100% { transform: translateY(800px); } }
                @keyframes draw { to { stroke-dashoffset: 0; } }
                @keyframes panning { 
                    0% { transform: translate(-1%, -1%) scale(1.05); } 
                    50% { transform: translate(1%, 1%) scale(1.05); }
                    100% { transform: translate(-1%, -1%) scale(1.05); } 
                }
                @keyframes grid-rotate {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(2deg) scale(1.1); }
                    100% { transform: rotate(0deg) scale(1); }
                }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-scan-line { animation: scan-line 12s linear infinite; }
                .animate-draw { animation: draw 5s ease-in-out infinite; }
                .animate-panning { animation: panning 30s linear infinite alternate; }
                .animate-grid-rotate { animation: grid-rotate 40s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 30s linear infinite; }
                .animate-ping-slow { animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
                @keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }
            `}</style>
        </section>
    );
}