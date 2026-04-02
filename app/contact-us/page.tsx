"use client";

import ContactUs from '@/components/ContactUs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Contact Us Page
 * Dedicated route for getting in touch. 
 */
export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#03060D] pt-20 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6 pt-0 md:pt-4">
                <div className="mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group cursor-pointer">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back To Home
                    </Link>
                </div>

                <div className="relative z-10">
                    <ContactUs standalone={true} />
                </div>

                <section className="mt-16 rounded-2xl border border-white/10 bg-[#080F1D] p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Why Teams Contact Mapifyit
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Organizations usually reach out to us when they are ready to improve the way location data powers their operations. Some teams are migrating from generic mapping providers and need better control over performance, pricing, and infrastructure ownership. Others are launching new products and require reliable geospatial APIs for routing, tracking, geocoding, and spatial analytics. Our solutions team helps evaluate your current architecture, identify bottlenecks, and design a rollout path that is realistic for your timeline and budget.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We work with logistics operators, public-sector programs, mobility platforms, fintech products, and enterprise software teams that need accurate maps and dependable geospatial intelligence at scale. If your workflows include field operations, route planning, geo-fencing, live fleet visibility, or location-based risk controls, we can help define an implementation model that fits cloud, private cloud, or on-premise requirements. We also support teams that operate in regulated environments where security and data residency are mandatory.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        A good first conversation includes your current use case, expected traffic volume, target regions, and any integration constraints. From there, we can share a technical path, recommended APIs, and a practical onboarding plan. If you are comparing vendors, we can also help you understand tradeoffs across coverage quality, latency, scalability, and long-term operating cost so your team can make a confident decision.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Typical response topics: enterprise demos, solution architecture, API integration guidance, security and compliance requirements, pricing and commercial models, migration planning, and go-live support.
                    </p>
                </section>
            </div>
        </div>
    );
}
