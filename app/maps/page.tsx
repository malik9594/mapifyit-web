"use client"
import React, { useState } from 'react';
import FeatureSuites from '@/components/FeatureSuites';
import { Map, Layers, Code, Zap, Globe, Route, Navigation, Search, Database, FileJson, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const apiDocs = [
    {
        id: 'maps',
        title: 'Maps API',
        icon: Map,
        method: 'GET',
        endpoint: '/api/v1/proxy/maps',
        desc: 'Fetch standardized map stylesheets, GeoJSON data and static configurations.',
        command: `curl -X GET "https://client.mapifyit.com/api/v1/proxy/maps?style=basic" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
        id: 'routing',
        title: 'Routing API',
        icon: Navigation,
        method: 'GET',
        endpoint: '/api/v1/proxy/routing',
        desc: 'Provides turn-by-turn directions based on locations, costing models, and traversal preferences.',
        command: `curl -X GET "https://client.mapifyit.com/api/v1/proxy/routing?json={\\"locations\\":[{\\"lon\\":67.0207055,\\"lat\\":24.8546842},{\\"lon\\":73.0651511,\\"lat\\":33.6938118}],\\"costing\\":\\"auto\\",\\"directions_options\\":{\\"units\\":\\"kilometers\\"},\\"costing_options\\":{\\"auto\\":{\\"use_highways\\":0.3}}}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
        id: 'tiles',
        title: 'Tiles API',
        icon: Layers,
        method: 'GET',
        endpoint: '/api/v1/proxy/tiles/{theme}',
        desc: "Access our vector and raster map tiles fast and reliably. Replace {theme} with 'dark' or 'bright'.",
        command: `curl -X GET "https://client.mapifyit.com/api/v1/proxy/tiles/dark" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
        id: 'geocoding',
        title: 'Geocoding API',
        icon: Search,
        method: 'GET',
        endpoint: '/api/v1/proxy/geocoding',
        desc: 'Powerful Search API. Convert textual addresses, places, or POIs into geographic coordinate points.',
        command: `curl -X GET "https://client.mapifyit.com/api/v1/proxy/geocoding?q=blue+area&lat=33.70&lon=73.05&boundary_country=PK" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
        id: 'reverse_geocoding',
        title: 'Reverse Geocoding',
        icon: Database,
        method: 'GET',
        endpoint: '/api/v1/proxy/reverse_geocoding',
        desc: 'Powerful Search API. Convert geographic coordinates back into human-readable addresses or locations.',
        command: `curl -X GET "https://client.mapifyit.com/api/v1/proxy/reverse_geocoding?lat=33.7297&lon=73.0372&size=1" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
];

export default function MapsPage() {
    const router = useRouter();
    const [activeApi, setActiveApi] = useState(apiDocs[0].id);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentDoc = apiDocs.find(d => d.id === activeApi) || apiDocs[0];

    return (
        <div className="min-h-screen bg-[#03060D] text-white pt-25 pb-15 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Back button */}
                <div className="mb-12">
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group cursor-pointer">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Go Back
                    </button>
                </div>

                {/* Interactive API Reference Hub */}
                <div className="mb-32">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                            <FileJson className="w-3.5 h-3.5" /> REST API Reference
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Mapifyit <span className="text-blue-500">Maps API Hub</span></h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Plug directly into Mapifyit's REST endpoints for low-level spatial control: <strong>vector tile rendering</strong>, <strong>turn-by-turn routing</strong>, <strong>geocoding</strong>, and <strong>reverse geocoding</strong>. All secured behind enterprise-grade infrastructure.
                        </p>
                    </div>

                    <div className="bg-[#0A101F] rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl">
                        {/* Sidebar */}
                        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 p-4 space-y-2">
                            {apiDocs.map((doc) => {
                                const Icon = doc.icon;
                                const isActive = activeApi === doc.id;
                                return (
                                    <button
                                        key={doc.id}
                                        onClick={() => setActiveApi(doc.id)}
                                        className={`w-full text-left px-4 py-4 rounded-xl flex items-center gap-3 transition-all ${isActive ? 'bg-blue-600 border border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-transparent border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                        <span className="font-semibold text-sm">{doc.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Content Area */}
                        <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <currentDoc.icon className="w-6 h-6 text-blue-500" />
                                        {currentDoc.title}
                                    </h4>
                                    <div className="flex items-center gap-3 px-3 py-2 bg-black/40 rounded-lg border border-white/10 w-fit">
                                        <span className="text-[10px] sm:text-xs font-bold text-emerald-400">{currentDoc.method}</span>
                                        <span className="text-xs sm:text-sm font-mono text-slate-300">{currentDoc.endpoint}</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    {currentDoc.desc}
                                </p>
                            </div>

                            <div className="relative group/code">
                                <div className="absolute top-0 right-0 p-3 z-10">
                                    <button
                                        onClick={() => handleCopy(currentDoc.command)}
                                        className="p-2 rounded-lg bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white transition-all backdrop-blur-md"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="bg-[#03060D] rounded-2xl border border-white/10 p-6 overflow-x-auto shadow-inner">
                                    <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap break-all md:break-normal">
                                        <code className="block text-emerald-400 mb-1"># Example Request</code>
                                        {currentDoc.command}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legacy Featuresuites Import */}
                {/* <div className="relative">
                    <FeatureSuites />
                </div> */}
            </div>

            {/* Global Background Glows */}
            <div className="fixed top-0 right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />
            <div className="fixed bottom-0 left-[-10%] w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] -z-10 rounded-full" />
        </div>
    );
}
