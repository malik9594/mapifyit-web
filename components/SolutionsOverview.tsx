import React from 'react';
import { Layers, Truck, ShieldCheck, Users, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import Link from 'next/link';

const solutions = [
    {
        title: "Advanced GIS & Spatial Analytics Platform",
        subtitle: "Spatial Analytics",
        description: "Transform complex geospatial datasets into actionable intelligence with our GIS platform. Perform high-precision terrain modeling, real-time infrastructure mapping, and specialized demographic analysis. Build enterprise GIS solutions, mapping applications, and location intelligence systems with scalable geospatial analytics.",
        icon: Layers,
        href: "/gis",
        color: "cyan",
        infoPoints: [
            "Advanced GIS Heatmaps & Density Analysis",
            "Sovereign Geospatial Data Modeling",
            "Raster Image Processing & Terrain Mapping for GIS Applications"
        ]
    },
    {
        title: "FMS FleetSense – Fleet Management Platform",
        subtitle: "Fleet Management & Vehicle Tracking",
        description: "Take total control of your fleet with FMS FleetSense. Real-time GPS tracking, fuel monitoring, driver behavior analytics, and AI-driven predictive maintenance in one unified fleet management dashboard. Perfect for logistics, transportation, and enterprise mobility operations.",
        icon: Truck,
        href: "/fms",
        color: "emerald",
        infoPoints: [
            "1-Second Live GPS Fleet Tracking",
            "Real-time Fuel Burn & Theft Alerts for Vehicles",
            "AI-Driven Predictive Maintenance Scheduling"
        ]
    },
    {
        title: "Next-Gen eKYC – Digital Identity Verification Platform",
        subtitle: "Secure eKYC & Identity Verification",
        description: "Next-Gen eKYC provides sovereign digital identity verification for secure onboarding and KYC compliance. Deploy AI-powered biometric face matching, document OCR, and liveness detection entirely on your own infrastructure. Perfect for banks, fintechs, and enterprise digital identity solutions.",
        icon: ShieldCheck,
        href: "/ngekyc",
        color: "blue",
        infoPoints: [
            "ISO-Standard Biometric Facial Parsing & Matching",
            "AI-Powered Liveness & Anti-Spoofing Verification",
            "Instant eKYC Verification in Under 3 Seconds"
        ]
    },
    {
        title: "Field Force Tracking – Mobile Workforce Management Platform",
        subtitle: "Real-Time Workforce Visibility & Field Operations",
        description: "Maximize productivity with our Field Force Tracking platform. Monitor live agent movements, verify attendance via geo-fencing, and optimize task distribution for mobile teams. Ideal for enterprise field workforce management, location tracking, and real-time operational insights.",
        icon: Users,
        href: "/fft",
        color: "indigo",
        infoPoints: [
            "Real-Time GPS-Based Agent Movement Tracking",
            "Automated Geo-Fence Attendance Verification",
            "Mobile Team Task Dispatch & Optimized Routing for Field Operations"
        ]
    }
];

export default function SolutionsOverview() {
    return (
        <section className="py-12 relative overflow-hidden bg-[#030712]">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6">
                            <Zap className="w-3 h-3" /> Enterprise GIS & Vertical Solutions
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Industry Leaders & Enterprise Teams</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Beyond standard mapping, we deliver specialized GIS platforms and enterprise vertical solutions including NG eKYC, Fleet Management Systems (FMS), and Field Force Tracking. Solve complex spatial and security challenges with scalable Maps APIs and location intelligence for the enterprise world.
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-8">
                    {solutions.map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className={`relative p-8 md:p-12 rounded-[2rem] border bg-[#080E18] overflow-hidden transition-all hover:border-white/20 group shadow-lg ${item.color === 'cyan' ? 'border-cyan-500/20' :
                                item.color === 'emerald' ? 'border-emerald-500/20' :
                                    item.color === 'blue' ? 'border-blue-500/20' :
                                        'border-indigo-500/20'
                                }`}>
                                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
                                    {/* Left text section */}
                                    <div className="md:col-span-7">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                                item.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                    item.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                        'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                                }`}>
                                                <item.icon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <span className={`text-xs font-bold uppercase tracking-widest ${item.color === 'cyan' ? 'text-cyan-500' :
                                                    item.color === 'emerald' ? 'text-emerald-500' :
                                                        item.color === 'blue' ? 'text-blue-500' :
                                                            'text-indigo-500'
                                                    }`}>{item.subtitle}</span>
                                                <h3 className="text-3xl font-bold text-white mt-1">{item.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-lg leading-relaxed mb-0">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Right bullet points & CTA section */}
                                    <div className="md:col-span-5 flex flex-col justify-center">
                                        <ul className="space-y-4 mb-8">
                                            {item.infoPoints.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                                                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${item.color === 'cyan' ? 'text-cyan-500' :
                                                        item.color === 'emerald' ? 'text-emerald-500' :
                                                            item.color === 'blue' ? 'text-blue-500' :
                                                                'text-indigo-500'
                                                        }`} />
                                                    <span className="leading-snug">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href={item.href}
                                            className={`inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-xl border w-full lg:w-max transition-all ${item.color === 'cyan' ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20' :
                                                item.color === 'emerald' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20' :
                                                    item.color === 'blue' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20' :
                                                        'text-indigo-400 border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20'
                                                }`}
                                        >
                                            Learn More <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Deep Ambient background glow */}
                                <div className={`absolute -right-20 -top-20 w-80 h-80 blur-[100px] rounded-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700 ${item.color === 'cyan' ? 'bg-cyan-500' :
                                    item.color === 'emerald' ? 'bg-emerald-500' :
                                        item.color === 'blue' ? 'bg-blue-500' :
                                            'bg-indigo-500'
                                    }`} />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
