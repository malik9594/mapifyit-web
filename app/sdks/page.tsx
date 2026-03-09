"use client"
import React from 'react';
import { Terminal, Code2, Cpu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export default function SDKsPage() {
    return (
        <div className="min-h-screen bg-[#03060D] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Reveal>
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>

                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 mb-8 uppercase tracking-widest">
                        Documentation
                    </div> */}

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Maps <span className="text-blue-500">SDKs.</span></h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light mb-16">
                        Everything you need to build high-performance mapping experiences across Web, iOS, and Android.
                        Native speed, full customization, and predictable costs.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Code2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Web SDK (JS/TS)</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Optimized for React, Vue, and Next.js. Full control over 60fps vector rendering and data layers.
                            </p>
                            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-blue-300 border border-white/5">
                                npm install @mapifyit/maps-sdk
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Mobile SDKs</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Native performance for iOS (Swift) and Android (Kotlin). Built-in offline map support for field operations.
                            </p>
                            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-emerald-300 border border-white/5">
                                pod 'MapifyitNativeSDK'
                            </div>
                        </div>
                    </div>

                    <div className="p-12 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 text-center">
                        <Terminal className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Start Building</h2>
                        <p className="text-slate-300 max-w-lg mx-auto mb-8">
                            Ready to replace your legacy provider? Our migration guides help you switch in under an hour.
                        </p>
                        <button className="px-8 py-4 bg-white text-[#03060D] font-bold rounded-xl hover:bg-slate-100 transition-all">
                            View Documentation
                        </button>
                    </div>
                </Reveal>
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full" />
        </div>
    );
}
