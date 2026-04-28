"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Globe, ArrowRight, Clock, Map as MapIcon, Layers, Activity, Lock, Zap } from "lucide-react";

// Moving data directly here to solve any potential import/caching issues
const blogPosts = [
    {
        slug: "mapifyit-maps-gis-enterprise-alternative",
        title: "MapifyIt Maps & GIS: The Complete Enterprise Alternative to Google Maps, Mapbox, and Traditional GIS Platforms",
        excerpt: "Location is no longer just a feature—it’s infrastructure. From logistics and ride-hailing to delivery, fintech, and smart cities, modern applications depend heavily on mapping APIs.",
        category: "Industry Insights",
        date: "April 28, 2026",
        readTime: "8 min read",
    },
    {
        slug: "what-is-mapifyit-full-stack-gis-platform",
        title: "What is MapifyIt? The Full-Stack Mapping & GIS Platform",
        excerpt: "MapifyIt is designed for businesses that want to build, scale, and control their own geospatial infrastructure without relying on expensive third-party APIs.",
        category: "Product Overview",
        date: "April 27, 2026",
        readTime: "6 min read",
    },
    {
        slug: "mapifyit-vs-google-maps-mapbox-esri",
        title: "A Detailed Comparison: MapifyIt vs Google Maps, Mapbox, and Esri",
        excerpt: "This is where things become clear. We compare cost structures, deployment options, customization levels, and data ownership across the top mapping platforms.",
        category: "Comparison",
        date: "April 26, 2026",
        readTime: "10 min read",
    },
    {
        slug: "real-world-use-cases-logistics-ride-hailing-smart-cities",
        title: "Real-World Use Cases: Powering Critical Infrastructure Across Industries",
        excerpt: "From logistics and ride-hailing to delivery, fintech, and smart cities, see how MapifyIt is being used to build scalable location intelligence systems.",
        category: "Use Cases",
        date: "April 25, 2026",
        readTime: "7 min read",
    },
    {
        slug: "high-performance-map-rendering-vector-tiles",
        title: "High-Performance Map Rendering: The Power of Vector Tiles",
        excerpt: "How MapifyIt uses optimized vector tiles to deliver fast, smooth maps across mobile and web applications, even with massive datasets.",
        category: "Engineering",
        date: "April 24, 2026",
        readTime: "5 min read",
    },
    {
        slug: "enterprise-security-privacy-on-premise-deployment",
        title: "Enterprise Security & Privacy: Why On-Premise Matters",
        excerpt: "For government and financial institutions, data sovereignty is non-negotiable. Learn how MapifyIt supports air-gapped and private infrastructure.",
        category: "Security",
        date: "April 23, 2026",
        readTime: "6 min read",
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#030712] text-white pt-32 pb-20 overflow-hidden relative">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Blog Header */}
                <section className="mb-24 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">
                            <Globe className="w-3.5 h-3.5" /> Industry Insights
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">MapifyIt</span> Blog
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                            Deep dives into mapping infrastructure, GIS intelligence, and the future of location-driven technology.
                        </p>
                    </Reveal>
                </section>

                {/* Posts Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="group h-full flex flex-col bg-white/5 p-8 rounded-[32px] border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h2>

                            <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all duration-300"
                                >
                                    Read Article <ArrowRight className="w-4 h-4 text-blue-400" />
                                </Link>
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{post.date}</span>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
