"use client"
import React from 'react';
import {
    ArrowRight,
    Zap,
    Shield,
    Database,
    Globe,
    Map as MapIcon,
    Navigation,
    Layers,
    Truck,
    Activity,
    Cpu,
    CheckCircle2,
    Plus,
    Minus,
    BarChart3,
    Lock,
    Settings,
    Server,
    DollarSign,
    Users,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const SectionHeader = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h2>
        {subtitle && <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">{subtitle}</p>}
    </div>
);

const FeatureCard = ({ icon: Icon, title, description, color = "blue" }: any) => {
    const colorMap: any = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:border-blue-500/50",
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/50",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:border-purple-500/50",
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/50",
        orange: "bg-orange-500/10 text-orange-400 border-orange-500/20 group-hover:border-orange-500/50"
    };

    return (
        <div className="group p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08]">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorMap[color]}`}>
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
        </div>
    );
};

const ComparisonRow = ({ label, mapifyit, competitors, highlight = false }: any) => (
    <tr className={`border-b border-white/5 transition-colors ${highlight ? 'bg-blue-500/5' : 'hover:bg-white/[0.02]'}`}>
        <td className="py-6 px-4 text-slate-300 font-medium">{label}</td>
        <td className="py-6 px-4">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {mapifyit}
            </div>
        </td>
        <td className="py-6 px-4 text-slate-500">{competitors}</td>
    </tr>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="mb-6 border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 md:p-8 text-left flex justify-between items-center group transition-colors hover:bg-white/5"
            >
                <span className="text-white font-semibold text-lg md:text-xl leading-snug">{question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 group-hover:text-white'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 md:px-8 pb-8 pt-0 text-slate-400 leading-relaxed text-base md:text-lg">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#030712] text-white pt-32 pb-20 overflow-hidden relative">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <Reveal>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">
                            <Globe className="w-3.5 h-3.5" /> Industry Insights
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
                            MapifyIt Maps & GIS: The Complete <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                                Enterprise Alternative
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed mb-12">
                            To Google Maps, Mapbox, and Traditional GIS Platforms.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link href="/pricing" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105">
                                View Pricing
                            </Link>
                            <Link href="/contact-us" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all">
                                Request Demo
                            </Link>
                        </div>
                    </div>
                </Reveal>

                {/* Infrastructure intro */}
                <section className="mb-32">
                    <Reveal delay={100}>
                        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Server className="w-64 h-64 text-blue-500" />
                            </div>
                            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Location is no longer just a feature—it’s infrastructure.</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                        From logistics and ride-hailing to delivery, fintech, and smart cities, modern applications depend heavily on mapping APIs, routing engines, and geospatial analytics. But as businesses scale, most teams run into the same problems:
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "API costs spiral out of control",
                                            "Performance becomes inconsistent under load",
                                            "Customization is limited",
                                            "You’re locked into someone else’s infrastructure"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-blue-600/10 rounded-3xl p-8 border border-blue-500/20">
                                    <p className="text-xl text-blue-100 italic leading-relaxed">
                                        "Platforms like Google Maps and Mapbox work well at the start—but they’re not built for full control at scale. That’s exactly where MapifyIt comes in."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* What is Mapifyit */}
                <section className="mb-32">
                    <Reveal delay={200}>
                        <SectionHeader
                            title="What is MapifyIt?"
                            subtitle="MapifyIt is a full-stack mapping and GIS platform designed for businesses that want to build, scale, and control their own geospatial infrastructure."
                        />
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FeatureCard
                                icon={Server}
                                title="On-Premise Ready"
                                description="Run your own mapping stack in the cloud or on-premise for absolute control and data sovereignty."
                                color="blue"
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Million-Call Scale"
                                description="Handle millions of API calls without unpredictable pricing or performance bottlenecks."
                                color="emerald"
                            />
                            <FeatureCard
                                icon={Settings}
                                title="Fully Customizable"
                                description="Fully customize routing logic, search behavior, and map rendering to your specific needs."
                                color="purple"
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Data Ownership"
                                description="Build enterprise-grade location intelligence systems where you own every bit of data."
                                color="cyan"
                            />
                        </div>
                    </Reveal>
                </section>

                {/* Three Critical Layers */}
                <section className="mb-32 bg-white/[0.02] border-y border-white/5 py-24 -mx-6 px-6">
                    <Reveal delay={300}>
                        <SectionHeader
                            centered
                            title="The Three Critical Layers"
                            subtitle="MapifyIt combines mapping, intelligence, and real-time systems into one unified platform."
                        />
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="p-10 rounded-[32px] bg-[#0B0F17] border border-white/10 group hover:border-blue-500/30 transition-all">
                                <MapIcon className="w-12 h-12 text-blue-500 mb-8" />
                                <h3 className="text-2xl font-bold mb-4">1. Mapping APIs</h3>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Vector tiles and map rendering</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Geocoding and reverse geocoding</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Routing and navigation</li>
                                </ul>
                            </div>
                            <div className="p-10 rounded-[32px] bg-[#0B0F17] border border-white/10 group hover:border-indigo-500/30 transition-all">
                                <Layers className="w-12 h-12 text-indigo-500 mb-8" />
                                <h3 className="text-2xl font-bold mb-4">2. GIS & Spatial Intelligence</h3>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Data analysis and visualization</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Heatmaps and clustering</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Terrain and raster processing</li>
                                </ul>
                            </div>
                            <div className="p-10 rounded-[32px] bg-[#0B0F17] border border-white/10 group hover:border-emerald-500/30 transition-all">
                                <Activity className="w-12 h-12 text-emerald-500 mb-8" />
                                <h3 className="text-2xl font-bold mb-4">3. Real-Time Systems</h3>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fleet tracking</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Geofencing</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Movement analytics</li>
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Solving Problems */}
                <section className="mb-32">
                    <Reveal delay={400}>
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div>
                                <SectionHeader
                                    title="Why Traditional Platforms Break"
                                    subtitle="Most companies don’t think about mapping infrastructure early on. They just plug in an API and move fast. But once usage grows, the cracks start to show."
                                />
                                <div className="space-y-6">
                                    {[
                                        { t: "Unpredictable API Costs", d: "Every map load, route request, or geocoding call adds to your bill. At scale, this becomes one of your biggest expenses." },
                                        { t: "Lack of Control", d: "You can’t control how routing works, how data is processed, or how maps are optimized for your use case." },
                                        { t: "Vendor Lock-In", d: "Switching away becomes extremely difficult once your system is deeply integrated." },
                                        { t: "Limited Customization", d: "Most APIs are built for general use—not for your specific operational needs." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                                <Minus className="w-4 h-4 text-red-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">{item.t}</h4>
                                                <p className="text-slate-400 text-sm">{item.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SectionHeader
                                    title="How MapifyIt Solves These"
                                    subtitle="MapifyIt is designed from the ground up to remove these limitations."
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { t: "Full Infrastructure Control", d: "Deploy on your own servers or private cloud. Complete ownership.", icon: Cpu },
                                        { t: "Predictable Costs", d: "Scale based on infrastructure, not per-request pricing.", icon: DollarSign },
                                        { t: "Deep Customization", d: "Tailor routing, search, and map styles to your business.", icon: Settings },
                                        { t: "API Independence", d: "No reliance on external providers means better performance.", icon: Navigation }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                            <item.icon className="w-6 h-6 text-blue-400 mb-4" />
                                            <h4 className="text-white font-bold mb-2">{item.t}</h4>
                                            <p className="text-slate-400 text-xs leading-relaxed">{item.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Core Features Grid */}
                <section className="mb-32">
                    <Reveal delay={500}>
                        <SectionHeader
                            centered
                            title="Core Features of MapifyIt Maps"
                            subtitle="Everything you need to build a high-performance mapping ecosystem."
                        />
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 hover:border-emerald-500/30 transition-all">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Zap className="text-emerald-400" /> Rendering & Routing
                                </h3>
                                <ul className="space-y-4 text-slate-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400 mt-1">•</span>
                                        <span><strong>Optimized Vector Tiles:</strong> delivering fast, smooth maps across mobile and web applications.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400 mt-1">•</span>
                                        <span><strong>Advanced Routing:</strong> Multi-stop optimization, distance matrix, and real-time capabilities.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 hover:border-blue-500/30 transition-all">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Navigation className="text-blue-400" /> Search & Geocoding
                                </h3>
                                <ul className="space-y-4 text-slate-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span><strong>Global Coverage:</strong> Convert addresses into coordinates and vice versa with precision.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 mt-1">•</span>
                                        <span><strong>Autocomplete:</strong> Intelligent search with typo tolerance and partial matches.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 hover:border-purple-500/30 transition-all">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Layers className="text-purple-400" /> Advanced GIS
                                </h3>
                                <ul className="space-y-4 text-slate-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span><strong>Spatial Analytics:</strong> Heatmaps, clustering, and density analysis for large datasets.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span><strong>Terrain Processing:</strong> Work with elevation models and satellite imagery.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Comparison Table */}
                <section className="mb-32">
                    <Reveal delay={600}>
                        <SectionHeader
                            centered
                            title="MapifyIt vs The World"
                            subtitle="This is where things become clear. Compare MapifyIt with Google Maps, Mapbox, and Esri."
                        />
                        <div className="overflow-x-auto rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="p-6 text-white font-bold">Feature</th>
                                        <th className="p-6 text-blue-400 font-bold">MapifyIt</th>
                                        <th className="p-6 text-slate-400 font-bold">Google / Mapbox / Esri</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ComparisonRow
                                        label="Cost Structure"
                                        mapifyit="Predictable Infrastructure-based"
                                        competitors="Usage-based (linear increases)"
                                        highlight
                                    />
                                    <ComparisonRow
                                        label="Deployment"
                                        mapifyit="Cloud + On-Premise + Hybrid"
                                        competitors="Mostly Cloud-only"
                                    />
                                    <ComparisonRow
                                        label="Customization"
                                        mapifyit="Full logic & style control"
                                        competitors="Limited to Moderate"
                                    />
                                    <ComparisonRow
                                        label="Data Ownership"
                                        mapifyit="100% Full ownership"
                                        competitors="External dependency"
                                    />
                                    <ComparisonRow
                                        label="GIS Integration"
                                        mapifyit="Advanced & Integrated"
                                        competitors="Minimal to Basic (except Esri)"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                </section>

                {/* Use Cases */}
                <section className="mb-32">
                    <Reveal delay={700}>
                        <SectionHeader
                            title="Real-World Use Cases"
                            subtitle="MapifyIt powers critical infrastructure across multiple industries."
                        />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { t: "Logistics & Delivery", i: Truck, d: "Route optimization and real-time fleet tracking to reduce operational costs." },
                                { t: "Ride-Hailing & Mobility", i: Navigation, d: "Driver tracking, high-frequency navigation systems, and precise ETA calculations." },
                                { t: "Field Workforce", i: Users, d: "Task assignment based on live location and monitoring of remote teams." },
                                { t: "Smart Cities", i: Globe, d: "Infrastructure visualization, population mapping, and traffic flow analysis." },
                                { t: "Agriculture", i: Layers, d: "Land usage insights and satellite data analysis for precision farming." },
                                { t: "Enterprise Analytics", i: BarChart3, d: "Turning raw location data into actionable business intelligence." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                        <item.i className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.t}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* Cost Advantage & Security */}
                <section className="mb-32">
                    <Reveal delay={800}>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent p-10 rounded-[40px] border border-emerald-500/20">
                                <h3 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-3">
                                    <DollarSign /> Cost Advantage at Scale
                                </h3>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    One of the biggest reasons companies switch is cost. With traditional providers, costs increase linearly. High-volume systems become prohibitive.
                                </p>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                        <span className="text-white font-bold">Infrastructure Scaling:</span>
                                        <p className="text-slate-400 text-sm">Reduces marginal cost as you grow, making high usage significantly more efficient.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-500/10 to-transparent p-10 rounded-[40px] border border-indigo-500/20">
                                <h3 className="text-2xl font-bold mb-6 text-indigo-400 flex items-center gap-3">
                                    <Lock /> Enterprise Security & Privacy
                                </h3>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    Built for high-compliance environments including government organizations and financial institutions.
                                </p>
                                <ul className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> On-premise deployment</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Air-gapped systems</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Private infrastructure</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Strict compliance</li>
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Final Thoughts */}
                <section className="mb-32 text-center max-w-4xl mx-auto">
                    <Reveal delay={900}>
                        <SectionHeader
                            centered
                            title="Final Thoughts"
                            subtitle="As applications become more location-driven, relying entirely on third-party APIs becomes a long-term limitation. MapifyIt gives businesses a way to take control of their mapping infrastructure, reduce dependency and costs, and build scalable systems."
                        />
                        <p className="text-xl text-blue-400 font-semibold italic">
                            "If mapping is core to your product—not just a feature—then the platform you choose matters."
                        </p>
                    </Reveal>
                </section>

                {/* FAQs */}
                <section className="mb-32">
                    <Reveal delay={1000}>
                        <SectionHeader
                            centered
                            title="Frequently Asked Questions"
                        />
                        <div className="max-w-5xl mx-auto">
                            <FAQItem
                                question="Is MapifyIt a Google Maps alternative?"
                                answer="Yes. MapifyIt provides mapping APIs, routing, and geospatial capabilities with more flexibility, control, and predictable pricing than traditional providers."
                            />
                            <FAQItem
                                question="What is the best Mapbox alternative?"
                                answer="MapifyIt is a strong alternative for businesses that need scalability, deep customization, and infrastructure-level cost control rather than per-request billing."
                            />
                            <FAQItem
                                question="Can MapifyIt be deployed on-premise?"
                                answer="Yes, it supports on-premise, private cloud, and even air-gapped deployments for maximum security and compliance."
                            />
                            <FAQItem
                                question="Does MapifyIt support global geocoding?"
                                answer="Yes, we provide strong global coverage for both address search (forward geocoding) and reverse geocoding."
                            />
                            <FAQItem
                                question="Is MapifyIt cheaper than Google Maps?"
                                answer="For high-scale applications, MapifyIt can significantly reduce costs. Since we scale based on infrastructure rather than linearly per API call, your savings grow as you scale."
                            />
                            <FAQItem
                                question="What industries use MapifyIt?"
                                answer="Logistics, transportation, ride-hailing, agriculture, urban planning, fintech, and enterprise-level location analytics."
                            />
                        </div>
                    </Reveal>
                </section>

                {/* Final CTA */}
                {/* <Reveal delay={1100}>
                    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">Ready to take control of your <br className="hidden md:block" /> mapping infrastructure?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                            <Link href="/contact-us" className="w-full sm:w-auto px-12 py-5 bg-white text-blue-700 font-extrabold rounded-2xl hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center gap-2">
                                Start Your Journey <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/pricing" className="w-full sm:w-auto px-12 py-5 bg-blue-800/30 text-white font-bold rounded-2xl border border-white/20 hover:bg-blue-800/50 transition-all backdrop-blur-md">
                                See Pricing
                            </Link>
                        </div>
                    </section>
                </Reveal> */}
            </div>
        </main>
    );
}
