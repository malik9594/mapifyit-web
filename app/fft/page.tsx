"use client"
import React from 'react';
import { Users, Navigation, MapPin, Zap, ArrowLeft, BarChart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import FieldForcePreview from '@/components/FieldForcePreview';

export default function FFTPage() {
    const router = useRouter();
    return (
        <div className="relative pt-24 md:pt-32">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/5 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-2 relative z-10">
                <button
                    onClick={() => router.back()}
                    className="group mb-12 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium tracking-wide">Go Back</span>
                </button>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <Reveal>
                        <div className="pt-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-8 backdrop-blur-sm">
                                <Users className="w-3.5 h-3.5" /> FFT – Field Force Tracking
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Mobile Workforce Intelligence <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">Field Force Tracking Software</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                                <strong>Mobile Workforce Intelligence</strong> is an enterprise-grade Field Force Tracking (FFT) solution designed to give organizations complete real-time visibility of their mobile workforce. With advanced GPS tracking, geofence-based attendance automation, intelligent task dispatching, and productivity analytics, businesses can efficiently manage field teams and improve operational performance.
                            </p>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                                Our platform enables companies to monitor field agents, delivery staff, service technicians, and sales representatives while optimizing routes, tracking visits, and ensuring accountability in the field. By combining location intelligence with workforce analytics, organizations can make better decisions and improve productivity.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 pb-20">
                                {[
                                    { icon: MapPin, title: "Live Agent Tracking", desc: "Continuous position updates without battery drain." },
                                    { icon: Zap, title: "Geofence Automation", desc: "Automatic attendance based on territory entry." },
                                    { icon: Navigation, title: "Intelligent Dispatch", desc: "Location-aware task assignment for field teams." },
                                    { icon: BarChart, title: "Productivity Data", desc: "Deep analytics on route adherence and visits." }
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
                        {/* Decorative Background Glows */}

                        <div className="">
                            <FieldForcePreview />
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Core Pillars Deep Dive */}
            <section className="bg-[#070B14] py-24 border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="space-y-32">
                        {/* 1. Real-Time Live Agent Tracking */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <Reveal>
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">Real-Time Live Agent Tracking</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        Gain complete visibility into your field operations with real-time agent tracking. The system continuously collects location data from mobile devices through a battery-optimized tracking engine, allowing managers to monitor workforce movement without affecting device performance.
                                    </p>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        With live tracking, businesses can instantly see where field agents are located, monitor routes, and ensure employees are operating within their assigned territories.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Continuous background GPS tracking for field agents",
                                            "Real-time location updates on a centralized dashboard",
                                            "Battery-efficient tracking technology",
                                            "Improved workforce transparency and accountability"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                                                <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                                                </div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />
                                <div className="flex items-center justify-center h-full">
                                    <MapPin size={120} className="text-indigo-500/20 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* 2. Geofence-Based Attendance Automation */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 order-last lg:order-first">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_100%)]" />
                                <div className="flex items-center justify-center h-full">
                                    <Zap size={120} className="text-purple-500/20 animate-pulse" />
                                </div>
                            </div>
                            <Reveal>
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">Geofence-Based Attendance Automation</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        Simplify attendance management with automated geofence-based check-ins and check-outs. Managers can create virtual boundaries around offices, client sites, or territories. When an agent enters or exits these defined zones, the system automatically records attendance events.
                                    </p>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        This eliminates the need for manual attendance reporting and ensures that all field activity is location verified and accurate.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Automatic check-in and check-out based on location",
                                            "Territory-based attendance verification",
                                            "Reduced administrative workload",
                                            "Accurate field workforce activity records"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                                                <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                                                </div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>

                        {/* 3. Intelligent Task Dispatch and Assignment */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <Reveal>
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">Intelligent Task Dispatch and Assignment</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        Optimize workforce efficiency with intelligent task dispatching. The platform analyzes real-time agent location, availability, and workload to assign tasks to the most suitable field agent.
                                    </p>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        This ensures faster service delivery, reduced travel time, and better utilization of field resources.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Proximity-based task assignment",
                                            "Real-time workload balancing",
                                            "Faster response to customer requests",
                                            "Optimized resource allocation"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                                                <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                                                </div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />
                                <div className="flex items-center justify-center h-full">
                                    <Navigation size={120} className="text-indigo-500/20 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* 4. Advanced Productivity and Performance Analytics */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 order-last lg:order-first">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_100%)]" />
                                <div className="flex items-center justify-center h-full">
                                    <BarChart size={120} className="text-purple-500/20 animate-pulse" />
                                </div>
                            </div>
                            <Reveal>
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">Advanced Productivity and Performance Analytics</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        Measure and improve field performance with data-driven productivity insights. The platform provides detailed analytics on workforce activities, allowing managers to evaluate agent performance and operational efficiency.
                                    </p>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                                        Organizations can track critical performance indicators such as route adherence, visit duration, and customer coverage to understand how field teams operate over time.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Route tracking and route adherence analysis",
                                            "Visit duration monitoring",
                                            "Customer coverage insights",
                                            "Historical performance reports and trends"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                                                <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                                                </div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits & Ideal For Section */}
            <section className="bg-black py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">
                        <Reveal>
                            <div className="p-10 rounded-3xl bg-slate-950/50 border border-white/5 backdrop-blur-sm h-full">
                                <h2 className="text-3xl font-bold text-white mb-8">Benefits of Mobile Workforce Intelligence</h2>
                                <div className="grid gap-6">
                                    {[
                                        "Real-time visibility into field workforce activities",
                                        "Automated attendance and location verification",
                                        "Faster and smarter task assignment",
                                        "Improved workforce productivity",
                                        "Data-driven performance evaluation",
                                        "Better customer service and response times"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-all hover:border-indigo-500/20">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-300 text-sm font-medium leading-relaxed">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={200}>
                            <div className="p-10 rounded-3xl bg-slate-900/10 border border-white/5 backdrop-blur-sm h-full flex flex-col">
                                <h2 className="text-3xl font-bold text-white mb-8">Ideal for Multiple Industries</h2>
                                <p className="text-slate-400 mb-10 leading-relaxed font-light">
                                    Mobile Workforce Intelligence solutions are ideal for organizations that rely on mobile field teams, including:
                                </p>
                                <div className="grid gap-4 mt-auto">
                                    {[
                                        { title: "Field Service Management", icon: Zap },
                                        { title: "Sales and Distribution", icon: Users },
                                        { title: "Delivery and Logistics", icon: Navigation },
                                        { title: "Maintenance & Utility Providers", icon: BarChart },
                                        { title: "Telecommunications Field Ops", icon: MapPin }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950 border border-white/5">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-white font-bold text-sm uppercase tracking-tight">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-24 text-center">
                        <Reveal>
                            <Link
                                href="/contactus"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95"
                            >
                                Scale Your Field Team <Navigation className="w-5 h-5" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
