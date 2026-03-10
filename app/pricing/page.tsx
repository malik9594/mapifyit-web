"use client"
import React from 'react';
import { Check, ArrowLeft, Zap, Globe, Shield, Cpu, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal';

const PricingTier = ({ title, price, description, features, highlighted = false }: { title: string, price: string, description: string, features: string[], highlighted?: boolean }) => (
    <div className={`p-8 rounded-[32px] border transition-all duration-500 h-full flex flex-col ${highlighted ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)] scale-105' : 'bg-[#0B0F17] border-white/5 hover:border-white/10'}`}>
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-extrabold text-white">{price}</span>
            {price !== 'Custom' && <span className="text-slate-500">/month</span>}
        </div>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed italic">{description}</p>
        <ul className="space-y-4 mb-10 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    {feature}
                </li>
            ))}
        </ul>
        <button className={`w-full py-4 rounded-xl font-bold transition-all ${highlighted ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
        </button>
    </div>
);

export default function PricingPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-[#03060D] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-12 group cursor-pointer">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go Back
                    </button>

                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Flexible <span className="text-blue-500">Plans.</span></h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Transparent pricing designed to scale with your organization. No hidden markups, just high-performance spatial infrastructure.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        <PricingTier
                            title="Developer"
                            price="$0"
                            description="Perfect for prototyping and small side-projects."
                            features={[
                                "Up to 50,000 requests / month",
                                "Standard Support",
                                "Basic SDK Access",
                                "Static Maps (PNG/WebP)",
                                "Community Forum Access"
                            ]}
                        />
                        <PricingTier
                            title="Professional"
                            price="$499"
                            description="For growing apps and production-ready systems."
                            highlighted={true}
                            features={[
                                "Up to 500,000 requests / month",
                                "Priority Email Support",
                                "Full SDK Features",
                                "Dynamic Vector Tiles",
                                "Advanced Autocomplete",
                                "SLA Guarantees"
                            ]}
                        />
                        <PricingTier
                            title="Enterprise"
                            price="Custom"
                            description="Bespoke infrastructure for global scale and local control."
                            features={[
                                "Unlimited Requests",
                                "Dedicated Technical Account Manager",
                                "On-Premise / Air-Gapped Deployment",
                                "Custom Base Maps & Geodata",
                                "Legal & Compliance Audits",
                                "White-label Options"
                            ]}
                        />
                    </div>
                </Reveal>
            </div>
            {/* Background Glows */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] -z-10 rounded-full" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] -z-10 rounded-full" />
        </div>
    );
}
