"use client"
import React from 'react';
import { Truck, Navigation, Activity, MapPin, Gauge, Shield, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import FMSHeroMockup from '@/components/FMSHeroMockup';
import FftAnimation from '@/components/FftAnimation';
/**
 * FMS Product Page: Fleet Management System
 */
export default function FMSPage() {
    const router = useRouter();
    return (
        <div className="pt-24 md:pt-32">
            <div className="max-w-7xl mx-auto px-6 pb-15">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <Reveal>
                        <div className="pt-20">
                            <button
                                onClick={() => router.back()}
                                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer mb-6"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                            </button>
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider text-emerald-400">
                                    <Truck className="w-3.5 h-3.5" /> Fleet Management System
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">FMS <span className="text-emerald-500">FleetSense.</span></h1>
                            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
                                MapifyIt’s Fleet Management System (FMS) is an enterprise-grade solution for organizations managing large-scale vehicle fleets, logistics operations, and mission-critical transportation. The platform combines real-time GPS vehicle tracking, AI-driven route optimization, predictive maintenance, fuel monitoring, and driver behavior analytics into a secure, sovereign dashboard with zero third-party data exposure. Fleet operators gain complete visibility and control across vehicles, drivers, routes, and assets, enabling smarter fleet decisions, lower operational costs, and safer operations.                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: MapPin, title: "Real-Time GPS Vehicle Tracking", desc: "Monitor every vehicle and mobile asset with high-precision GPS updates:", list: ["Sub-meter location accuracy", "Second telemetry updates", "Real-time fleet dashboards", "Historical route playback", "Vehicle and asset location intelligence"] },
                                    { icon: Navigation, title: "AI-Powered Smart Routing", desc: "Optimize routes and reduce fuel costs with dynamic, traffic-aware route planning:", list: ["Multi-stop route optimization", "Traffic-aware navigation", "Dynamic route recalculation", "Delivery and dispatch planning"] },
                                    { icon: Activity, title: "Vehicle Telematics & Driver Analytics", desc: "Deep integration with vehicle telematics and OBD systems allows monitoring of:", list: ["Engine performance and RPM", "Fuel efficiency and consumption", "Harsh braking, acceleration, and driver safety scores", "Vehicle utilization and diagnostics"] },
                                    { icon: Gauge, title: "Intelligent Alerts & Compliance Monitoring", desc: "Stay ahead of operational risks with automated alerts and notifications:", list: ["Over-speed alerts", "Unauthorized vehicle movement", "Geofence breaches", "Idling and maintenance notifications"] },
                                    { icon: Gauge, title: "Mobile Fleet Management Apps", desc: "Our native iOS and Android apps allow fleet managers to:", list: ["Track vehicles in real time", "Receive instant fleet alerts", "Monitor driver behavior", "View routes and analytics", "Manage fleets remotely"] },
                                    { icon: Gauge, title: "Built for Enterprise Fleet Operations", desc: "The Fleet Management System by MapifyIt supports large-scale fleets with high-frequency GPS telemetry, serving:", list: ["Logistics and delivery companies", "Transportation networks", "Government and municipal fleets", "Field service operations", "Construction and utility fleets"] }
                                ].map((item, i) => (
                                    <div key={i} className="group p-5 rounded-xl border border-white/5 bg-slate-950 hover:bg-slate-900 transition-all flex flex-col h-full">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                                        <p className="text-slate-400 text-[10px] leading-relaxed mb-3">{item.desc}</p>
                                        <ul className="space-y-1.5 mt-auto">
                                            {item.list.map((li, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-[10px] text-slate-500 leading-tight">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500/40 mt-1 flex-shrink-0" />
                                                    {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        {/* <div className="relative p-2 md:p-4 rounded-3xl bg-[#0A0F1C] border border-white/10 shadow-2xl"> */}
                        {/* <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600/10 rounded-full blur-[80px]" /> */}
                        {/* <FMSHeroMockup /> */}
                        <FftAnimation />
                        {/* </div> */}
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
