import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    Globe,
    Server,
    Zap,
    Shield,
    Map as MapIcon,
    Layers,
    Activity,
    Minus,
    Cpu,
    DollarSign,
    Navigation,
    Truck,
    Users,
    BarChart3,
    Lock,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { blogPosts, BlogPost } from '../data/posts';
import { SectionHeader, FeatureCard, ComparisonRow } from '../components/BlogComponents';
import { FAQItem } from '../components/BlogFAQ';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | MapifyIt Blog`,
        description: post.metaDescription,
        openGraph: {
            title: post.ogTitle || post.title,
            description: post.metaDescription,
            type: 'article',
            publishedTime: post.date,
            authors: ['MapifyIt Team'],
        }
    };
}

export default async function BlogPostDetail({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    const renderContent = () => {
        switch (slug) {
            case "mapifyit-maps-gis-enterprise-alternative":
                return (
                    <>
                        <section className="mb-32">
                            <Reveal delay={100}>
                                <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Server className="w-64 h-64 text-blue-500" />
                                    </div>
                                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-6">Location is no longer just a feature—it’s infrastructure.</h2>
                                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                                From logistics and ride-hailing to delivery, fintech, and smart cities, modern applications depend heavily on mapping APIs, routing engines, and geospatial analytics. But as businesses scale, most teams run into the same problems:
                                            </p>
                                            <ul className="space-y-4 mb-8">
                                                {[
                                                    "API costs spiral out of control",
                                                    "Performance becomes inconsistent under load",
                                                    "Customization is limited",
                                                    "You’re locked into someone else’s infrastructure"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                                Platforms like Google Maps and Mapbox work well at the start—but they’re not built for full control at scale. That’s exactly where MapifyIt comes in.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </section>
                        <section className="mb-32">
                            <Reveal delay={200}>
                                <SectionHeader title="What is MapifyIt?" subtitle="A full-stack mapping and GIS platform for builders." />
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <FeatureCard icon={Server} title="On-Premise Ready" description="Run your own stack for absolute control." color="blue" />
                                    <FeatureCard icon={Zap} title="Million-Call Scale" description="No unpredictable pricing or bottlenecks." color="emerald" />
                                    <FeatureCard icon={Navigation} title="Fully Customizable" description="Tailor routing and map styles." color="purple" />
                                    <FeatureCard icon={Shield} title="Data Ownership" description="You own every bit of your geospatial data." color="cyan" />
                                </div>
                            </Reveal>
                        </section>
                    </>
                );

            case "what-is-mapifyit-full-stack-gis-platform":
                return (
                    <>
                        <section className="mb-32">
                            <Reveal delay={100}>
                                <SectionHeader
                                    title="What is MapifyIt?"
                                    subtitle="MapifyIt is a full-stack mapping and GIS platform designed for businesses that want to build, scale, and control their own geospatial infrastructure."
                                />
                                <div className="bg-white/5 p-8 md:p-12 rounded-[40px] border border-white/10 backdrop-blur-2xl mb-12">
                                    <h3 className="text-2xl font-bold mb-6">Take Control of Your Infrastructure</h3>
                                    <p className="text-slate-400 text-lg mb-8">Instead of relying on third-party APIs for every request, MapifyIt allows you to:</p>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "Run your own mapping stack (cloud or on-premise)",
                                            "Handle millions of API calls without unpredictable pricing",
                                            "Fully customize routing, search, and map rendering",
                                            "Build enterprise-grade location intelligence systems"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                                <CheckCircle2 className="w-5 h-5 text-blue-400" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </section>

                        <section className="mb-32">
                            <Reveal delay={200}>
                                <SectionHeader centered title="The Three Critical Layers" subtitle="At its core, MapifyIt combines three critical layers into one seamless platform." />
                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
                                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                            <MapIcon className="w-8 h-8 text-blue-400" />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-4">1. Mapping APIs</h4>
                                        <ul className="space-y-3 text-slate-400 text-sm">
                                            <li>● Vector tiles and map rendering</li>
                                            <li>● Geocoding and reverse geocoding</li>
                                            <li>● Routing and navigation</li>
                                        </ul>
                                    </div>
                                    <div className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group">
                                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                            <Layers className="w-8 h-8 text-indigo-400" />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-4">2. GIS Intelligence</h4>
                                        <ul className="space-y-3 text-slate-400 text-sm">
                                            <li>● Data analysis and visualization</li>
                                            <li>● Heatmaps and clustering</li>
                                            <li>● Terrain and raster processing</li>
                                        </ul>
                                    </div>
                                    <div className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all group">
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                            <Activity className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-4">3. Real-Time Systems</h4>
                                        <ul className="space-y-3 text-slate-400 text-sm">
                                            <li>● Fleet tracking</li>
                                            <li>● Geofencing</li>
                                            <li>● Movement analytics</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-12 text-center p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20">
                                    <p className="text-blue-100 italic text-xl">"This makes MapifyIt not just a 'maps provider,' but a complete geospatial platform."</p>
                                </div>
                            </Reveal>
                        </section>
                    </>
                );

            case "mapifyit-vs-google-maps-mapbox-esri":
                return (
                    <>
                        <section className="mb-32">
                            <Reveal delay={100}>
                                <SectionHeader centered title="MapifyIt vs The World" subtitle="A side-by-side comparison of the top mapping platforms." />
                                <div className="overflow-x-auto rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-white/5 border-b border-white/10">
                                            <tr>
                                                <th className="p-6 text-white font-bold">Feature</th>
                                                <th className="p-6 text-blue-400 font-bold">MapifyIt</th>
                                                <th className="p-6 text-slate-400 font-bold">Competitors</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ComparisonRow label="Cost Structure" mapifyit="Predictable / Infrastructure-based" competitors="Usage-based (linear)" highlight />
                                            <ComparisonRow label="Deployment" mapifyit="Cloud + On-Premise + Hybrid" competitors="Mostly Cloud-only" />
                                            <ComparisonRow label="Customization" mapifyit="Full logic & style control" competitors="Limited to Moderate" />
                                            <ComparisonRow label="Data Ownership" mapifyit="100% Full ownership" competitors="External dependency" />
                                            <ComparisonRow label="GIS Integration" mapifyit="Advanced & Integrated" competitors="Minimal to Basic" />
                                        </tbody>
                                    </table>
                                </div>
                            </Reveal>
                        </section>
                    </>
                );

            case "real-world-use-cases-logistics-ride-hailing-smart-cities":
                return (
                    <>
                        <section className="mb-32">
                            <Reveal delay={100}>
                                <SectionHeader title="Powering Critical Infrastructure" subtitle="See how MapifyIt is being used across multiple industries." />
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[
                                        { t: "Logistics & Delivery", i: Truck, d: "Route optimization and real-time fleet tracking to reduce operational costs." },
                                        { t: "Ride-Hailing & Mobility", i: Navigation, d: "Driver tracking, high-frequency navigation systems, and precise ETA calculations." },
                                        { t: "Field Workforce", i: Users, d: "Task assignment based on live location and monitoring of remote teams." },
                                        { t: "Smart Cities", i: Globe, d: "Infrastructure visualization, population mapping, and traffic flow analysis." },
                                        { t: "Agriculture", i: Layers, d: "Land usage insights and satellite data analysis for precision farming." },
                                        { t: "Enterprise Analytics", i: BarChart3, d: "Turning raw location data into actionable business intelligence." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-4 p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/[0.08]">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                                <item.i className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <h4 className="text-xl font-bold mt-2">{item.t}</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </section>
                    </>
                );

            case "high-performance-map-rendering-vector-tiles":
                return (
                    <>
                        <section className="mb-32">
                            <Reveal delay={100}>
                                <SectionHeader title="The Power of Vector Tiles" subtitle="How we deliver smooth, interactive maps at any scale." />
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                                        <h4 className="text-xl font-bold mb-4 text-emerald-400">Why Vector Tiles?</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">Unlike raster tiles (images), vector tiles send raw geographic data to the browser, allowing for client-side styling, smooth rotation, and crisp resolution at any zoom level.</p>
                                    </div>
                                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                                        <h4 className="text-xl font-bold mb-4 text-blue-400">Optimized Performance</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">MapifyIt uses advanced compression and spatial indexing to minimize bandwidth usage and maximize rendering speed.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </section>
                    </>
                );

            case "enterprise-security-privacy-on-premise-deployment":
                return (
                    <>
                        <section className="mb-32">
                            <Reveal delay={100}>
                                <SectionHeader title="Sovereignty Over Your Data" subtitle="Built for the most demanding security requirements." />
                                <div className="space-y-8">
                                    <div className="p-10 rounded-[40px] bg-indigo-600/10 border border-indigo-500/20">
                                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Lock className="text-indigo-400" /> On-Premise & Air-Gapped</h3>
                                        <p className="text-slate-400 leading-relaxed mb-6">For government organizations, financial institutions, and defense, cloud-only solutions are often a non-starter. MapifyIt supports full on-premise deployment with zero external dependencies.</p>
                                        <ul className="grid md:grid-cols-2 gap-4">
                                            {["Full data sovereignty", "Zero external API calls", "Strict compliance ready", "Private infrastructure"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-indigo-400" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        </section>
                    </>
                );

            default:
                return <div className="text-center p-20 text-slate-500">Content coming soon...</div>;
        }
    };

    return (
        <main className="min-h-screen bg-[#030712] text-white pt-32 pb-20 overflow-hidden relative">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <Reveal>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">
                            <Globe className="w-3.5 h-3.5" /> {post.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">
                            {post.title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed">
                            {post.metaDescription}
                        </p>
                    </div>
                </Reveal>

                {/* Post Content */}
                {renderContent()}

                {/* FAQs (Global for all posts) */}
                <section className="mb-32">
                    <Reveal delay={700}>
                        <SectionHeader centered title="Frequently Asked Questions" />
                        <div className="">
                            <FAQItem question="Is MapifyIt a Google Maps alternative?" answer="Yes. MapifyIt provides mapping APIs, routing, and geospatial capabilities with more flexibility and control." />
                            <FAQItem question="What is the best Mapbox alternative?" answer="MapifyIt is a strong alternative for businesses that need scalability, customization, and cost control." />
                            <FAQItem question="Can MapifyIt be deployed on-premise?" answer="Yes, it supports on-premise and private deployments" />
                            <FAQItem question="Does MapifyIt support global geocoding?" answer="Yes, including address search and reverse geocoding." />
                            <FAQItem question="Can MapifyIt be deployed on-premise?" answer="Yes, it supports on-premise and private deployments." />
                            <FAQItem question="Does MapifyIt support global geocoding?" answer="Yes, including address search and reverse geocoding." />
                            <FAQItem question="Is MapifyIt cheaper than Google Maps?" answer="For high-scale applications, it can significantly reduce costs." />
                            <FAQItem question="What industries use MapifyIt?" answer="Logistics, transportation, agriculture, urban planning, and enterprise analytics." />
                        </div>
                    </Reveal>
                </section>

                {/* Back Button */}
                <div className="text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                        <Navigation className="w-4 h-4 rotate-[-90deg]" /> Back to Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
