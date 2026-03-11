import React from 'react';
import { Layers, Truck, ShieldCheck, Users, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import Link from 'next/link';

const solutions = [
    {
        title: "GIS Intelligence",
        subtitle: "Spatial Analytics",
        description: "Transform complex geospatial data into actionable intelligence. Our GIS engine supports high-precision terrain modeling, specialized demographic analysis, and real-time infrastructure mapping.",
        icon: Layers,
        href: "/gis",
        color: "cyan",
        infoPoints: [
            "Advanced Heatmaps & Density Plotting",
            "Sovereign Data Modeling Without 3rd Parties",
            "Raster Image Processing & Terrain Superimposing"
        ]
    },
    {
        title: "FMS FleetSense",
        subtitle: "Fleet Management",
        description: "Take total control of your mobility assets. Real-time sub-meter tracking, fuel monitoring, driver behavior analytics, and AI-driven maintenance scheduling in one unified dashboard.",
        icon: Truck,
        href: "/fms",
        color: "emerald",
        infoPoints: [
            "1-Second Live GPS Ping Latency",
            "Real-time Fuel Burn & Theft Alerts",
            "Predictive Maintenance Scheduling"
        ]
    },
    {
        title: "Next-Gen eKYC",
        subtitle: "Identity Verification",
        description: "Sovereign identity verification for secure onboarding. AI-powered biometric face matching, document OCR, and liveness detection deployed 100% on your own infrastructure.",
        icon: ShieldCheck,
        href: "/ngekyc",
        color: "blue",
        infoPoints: [
            "ISO-Standard Facial Parsing & Matching",
            "Liveness anti-spoofing Mechanisms",
            "Instant Verification Under 3 Seconds"
        ]
    },
    {
        title: "Field Force Tracking",
        subtitle: "Workforce Visibility",
        description: "Maximize field productivity with real-time workforce monitoring. Track live agent movements, verify attendance with geo-fencing, and optimize task distribution for mobile teams.",
        icon: Users,
        href: "/fieldforce",
        color: "indigo",
        infoPoints: [
            "Live Agent Movement Monitoring",
            "Automated Geofence Attendance Triggers",
            "Mobile Team Task Dispatch & Routing"
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
                            <Zap className="w-3 h-3" /> Enterprise Vertical Solutions
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Industry Leaders.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Beyond standard mapping, we build specialized vertical platforms that solve the most complex spatial and security challenges in the enterprise world.
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
