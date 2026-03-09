"use client"
import React from 'react';
import { Check, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';

export default function Pricing() {
    return (
        <section id="pricing" className="py-10 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 overflow-hidden relative group">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -z-10 rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Reveal>
                                <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Transparent Pricing</h2>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                                    Predictable Costs for <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Unmatched Scalability.</span>
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed font-light mb-8 max-w-xl">
                                    Finally, enterprise mapping without the legacy tax. Whether you're a startup or a global organization, our plans are built to give you full control over your spend.
                                </p>
                                <div className="flex flex-wrap gap-4 mb-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> No hidden fees
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Pay-as-you-grow
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> SLA Guarantees
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="flex flex-col items-center lg:items-end gap-6 text-center lg:text-right">
                            <Reveal delay={200}>
                                <h4 className="text-2xl font-bold text-white mb-2">Start for <span className="text-blue-500">$0</span> / month</h4>
                                <p className="text-slate-500 text-sm mb-8 italic">Choose from Developer, Professional, or <br className="hidden md:block" /> Enterprise tiers tailored to your needs.</p>
                                <Link
                                    href="/pricing"
                                    className="px-12 py-5 bg-white text-black font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center gap-3 group"
                                >
                                    See All Pricing Plans <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
