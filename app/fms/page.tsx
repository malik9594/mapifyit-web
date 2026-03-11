"use client"
import React from 'react';
import { Truck, Navigation, Activity, MapPin, Gauge, Shield } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import FMSHeroMockup from '@/components/FMSHeroMockup';
/**
 * FMS Product Page: Fleet Management System
 */
export default function FMSPage() {
    return (
        <div className="pt-20">
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-15">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-8">
                                <Truck className="w-3.5 h-3.5" /> Fleet Management System
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">FMS <span className="text-emerald-500">FleetSense.</span></h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                                The enterprise-grade <strong>fleet management system</strong> built for mission-critical operations. FleetSense combines <strong>sub-meter GPS accuracy</strong>, predictive maintenance, fuel burn monitoring, and driver behavior analytics — all in a real-time sovereign dashboard with zero third-party data exposure.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: MapPin, title: "Real-Time GPS Vehicle Tracking", desc: "Live sub-meter position updates with 1-second ping latency across all fleet assets." },
                                    { icon: Navigation, title: "AI-Optimized Smart Routing", desc: "Reduce fuel costs with dynamic multi-stop route optimization and traffic-aware navigation." },
                                    { icon: Activity, title: "Engine & Driver Telematics", desc: "Deep OBD diagnostics: RPM, fuel efficiency, harsh braking, and driver behavior scoring." },
                                    { icon: Gauge, title: "Speed Guard & Violation Alerts", desc: "Automated over-speed, geofence breach, and idling alerts with real-time notifications." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
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
                        <div className="relative p-2 md:p-4 rounded-3xl bg-[#0A0F1C] border border-white/10 shadow-2xl">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600/10 rounded-full blur-[80px]" />
                            <FMSHeroMockup />
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Stats Section */}
            <section className="bg-[#070B14] py-20 border-y border-white/5 mt-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: "Fuel Saved", val: "22%" },
                        { label: "Asset Uptime", val: "99.8%" },
                        { label: "Safety Score", val: "+35%" },
                        { label: "ROI Period", val: "< 6mo" }
                    ].map((stat, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
