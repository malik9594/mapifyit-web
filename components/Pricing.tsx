"use client"
import React from 'react';
import { Check, Zap, Shield, Globe } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function Pricing() {
    const tiers = [
        {
            name: "Developer",
            price: "$0",
            desc: "Perfect for testing and side projects.",
            features: ["50,000 requests/mo", "Basic GIS Suite", "Community Support", "Public Cloud Only"],
            icon: Zap,
            color: "blue"
        },
        {
            name: "Professional",
            price: "$149",
            desc: "Scaling apps and growing teams.",
            features: ["500,000 requests/mo", "Advanced GIS Suite", "Priority Email Support", "VPC Deployment", "ngeKYC Lite"],
            icon: Globe,
            color: "indigo",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "Mission-critical infrastructure.",
            features: ["Unlimited requests", "Full GIS Engine", "24/7 Phone Support", "Offline / Air-Gapped", "Full eKYC Suite", "White-labeling"],
            icon: Shield,
            color: "emerald"
        }
    ];

    return (
        <section id="pricing" className="py-32 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <Reveal>
                        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Pricing Plans</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Simple, Transparent Pricing.</h3>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                            Choose the right plan for your team. Scale from a prototype to millions of users with ease.
                        </p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className={`relative p-8 rounded-3xl bg-[#0B0F17] border border-white/5 h-full flex flex-col transition-all duration-300 hover:border-white/10 ${tier.popular ? 'ring-2 ring-blue-600/50 scale-105 z-10' : ''}`}>
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                                        Most Popular
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${tier.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : tier.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    <tier.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    {tier.price !== 'Custom' && <span className="text-slate-500 text-sm">/mo</span>}
                                </div>
                                <p className="text-slate-400 text-sm mb-8 leading-relaxed">{tier.desc}</p>

                                <div className="space-y-4 mb-10 mt-auto">
                                    {tier.features.map((feature, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-blue-500" />
                                            </div>
                                            <span className="text-slate-300 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.popular ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                                    {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                </button>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
