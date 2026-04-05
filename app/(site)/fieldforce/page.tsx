"use client"
import React from 'react';
import { Users, Navigation, MapPin, Zap, ArrowLeft, BarChart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';

export default function FieldForcePage() {
    const router = useRouter();
    return (
        <div className="pt-10">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
                <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-colors mb-8 group cursor-pointer font-semibold">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                </button>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-8">
                                <Users className="w-3.5 h-3.5" /> Mobile Workforce Management
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Field Force <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tracking.</span></h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                                Enterprise <strong>field force management software</strong> for real-time mobile workforce visibility. Monitor live agent locations, automate geofence-based attendance, dispatch tasks to the nearest agent, and measure true field productivity without manual check-ins.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: MapPin, title: "Live Agent Location Tracking", desc: "Continuous background location updates for all field agents with battery-optimized SDKs." },
                                    { icon: Zap, title: "Automatic Geofence Attendance", desc: "Trigger check-in and check-out events automatically when agents enter or exit defined territories." },
                                    { icon: Navigation, title: "Intelligent Task Dispatch", desc: "Assign tasks to the nearest available agent using real-time proximity and workload balancing." },
                                    { icon: BarChart, title: "Field Productivity Analytics", desc: "Measure route adherence, visit duration, customer coverage, and agent performance over time." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0">
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
                        <div className="relative p-2 md:p-4 rounded-3xl bg-[#0A0F1C] border border-white/10 shadow-2xl overflow-hidden h-full min-h-[400px] flex items-center justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none transition-colors duration-700" />
                            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                            <Users className="w-48 h-48 text-indigo-500/20 animate-ping absolute" />
                            <Users className="w-40 h-40 text-indigo-500 relative z-10" />
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Post-Hero Section */}
            <section className="bg-[#070B14] py-12 border-y border-white/5 relative overflow-hidden">
                {/* Ambient Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] -z-10 rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] -z-10 rounded-full" />

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Reveal>
                        <Users className="w-12 h-12 text-indigo-500 mx-auto mb-8" />
                        <h2 className="text-3xl font-bold text-white mb-6">Data-Driven Field Operations</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                            Take the guesswork out of field management. Know exactly where your agents are, verify customer visits automatically, and measure true productivity without relying on manual check-ins.
                        </p>
                        <div className="flex justify-center gap-8 mt-10">
                            <span className="flex items-center gap-3 text-slate-300 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Seamless tracking
                            </span>
                            <span className="flex items-center gap-3 text-slate-300 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Battery-optimized
                            </span>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
