import React from 'react';
import { Lock, WifiOff, Server, Globe2, ShieldCheck, Cpu } from 'lucide-react';
import { Reveal } from './Reveal';

export default function Infrastructure() {
    return (
        <section id="gismap" className="py-20 border-t border-white/5 relative overflow-hidden bg-[#070B14]/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <Reveal>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold uppercase tracking-wider text-red-400 mb-8">
                                <Lock className="w-3.5 h-3.5" /> Enterprise Data Sovereignty
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Your Data.<br />Your Infrastructure.</h2>
                            <h3 className="text-slate-400 text-lg mb-10 leading-relaxed">
                                Unlike platforms that assume constant connectivity, Mapifyit is designed to operate fully offline. Deploy maps where they make sense for your business—without forced data sharing.
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { icon: WifiOff, title: "Air-Gapped / On-Premise", desc: "Deploy entirely behind your firewall. Critical for defense and government sectors.", color: "red" },
                                    { icon: Server, title: "Private Cloud", desc: "Host within your own AWS, Azure, or GCP VPC. Maintain total control over your telemetry data.", color: "blue" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 group">
                                        <div className={`w-14 h-14 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-opacity-20 transition-all`}>
                                            <item.icon className={`w-6 h-6 text-slate-300 group-hover:text-white transition-colors`} />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-lg font-bold mb-2">{item.title}</h4>
                                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Visual Infrastructure Diagram */}
                    <Reveal delay={200}>
                        <div className="relative bg-[#0A0F1C] border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                                <span className="text-sm font-mono text-slate-400 flex items-center gap-2">
                                    <Cpu className="w-4 h-4" /> SECURE_DEPLOYMENT_TOPOLOGY
                                </span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-5 border border-blue-500/20 bg-blue-500/5 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-500/20 rounded-lg"><Globe2 className="text-blue-400 w-5 h-5" /></div>
                                        <span className="text-white font-semibold">Public SaaS Gateway</span>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full">ACTIVE</span>
                                </div>
                                <div className="flex justify-center py-1"><div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/30 to-red-500/30" /></div>
                                <div className="p-5 border border-red-500/30 bg-red-500/10 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-red-500/20 rounded-lg"><ShieldCheck className="text-red-400 w-5 h-5" /></div>
                                        <div>
                                            <span className="text-white font-semibold block">Air-Gapped Map Engine</span>
                                            <span className="text-xs text-red-300/70">Secure Environment</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full flex items-center gap-2">SECURE</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
