"use client"
import React from 'react';
import { Users, Navigation, MapPin, Zap, ArrowLeft, BarChart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import FftAnimation from '../../components/FftAnimation';

export default function FFTPage() {
    const router = useRouter();
    return (
        <div className="relative pt-10">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/5 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-colors mb-8 group cursor-pointer font-semibold"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                </button>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-8 backdrop-blur-sm">
                                <Users className="w-3.5 h-3.5" /> FFT – Field Force Tracking
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Mobile Workforce <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">Intelligence.</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                                Enterprise-grade <strong>Field Force Tracking (FFT)</strong> for real-time mobile workforce visibility. Monitor live agent locations, automate geofence-based attendance, and measure true field productivity through actionable spatial intelligence.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: MapPin, title: "Live Agent Tracking", desc: "Continuous background location updates for all field agents with battery-optimized SDKs." },
                                    { icon: Zap, title: "Geofence Automation", desc: "Trigger check-in and check-out events automatically when agents enter defined territories." },
                                    { icon: Navigation, title: "Intelligent Dispatch", desc: "Assign tasks to the nearest available agent using real-time proximity and workload balancing." },
                                    { icon: BarChart, title: "Productivity Data", desc: "Measure route adherence, visit duration, customer coverage, and performance over time." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group/item cursor-default p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0 group-hover/item:scale-110 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        {/* Animated Concentric Circles */}
                        <FftAnimation />
                    </Reveal>
                </div>
            </div>

            {/* Features Grid Section */}
            <section className="bg-[#070B14] py-24 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] -z-10 rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] -z-10 rounded-full" />

                <div className="max-w-5xl mx-auto px-6 text-center">
                    <Reveal>
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-10">
                            <Users className="w-8 h-8 text-indigo-500" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Data-Driven Field Operations</h2>
                        <p className="text-slate-400 text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-light">
                            Take the guesswork out of field management. Know exactly where your agents are, verify customer visits automatically, and measure true productivity without relying on manual check-ins or paper reports.
                        </p>

                        <div className="flex flex-wrap justify-center gap-10">
                            {[
                                "Seamless real-time tracking",
                                "Battery-optimized device SDKs",
                                "Cloud or On-Premise deployment",
                                "Offline map support"
                            ].map((text, i) => (
                                <span key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> {text}
                                </span>
                            ))}
                        </div>

                        <div className="mt-16">
                            <Link
                                href="/contactus"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95"
                            >
                                Scale Your Field Team <Navigation className="w-5 h-5" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
