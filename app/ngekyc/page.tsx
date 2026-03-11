"use client"
import React from 'react';
import { ShieldCheck, Lock, Fingerprint, Search, Shield, Zap } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import LoginMockup from '@/components/LoginMockup';

/**
 * ngeKYC Product Page: Next-gen Identity Verification
 */
export default function NgeKYCPage() {
    return (
        <div className="pt-20">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-wider text-blue-400 mb-8">
                                <ShieldCheck className="w-3.5 h-3.5" /> AI Identity Verification
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">nge<span className="text-blue-500">KYC</span> Mobile.</h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                                Enterprise-grade <strong>digital identity verification</strong> and <strong>AI-powered eKYC</strong> deployed 100% on-premise. Our biometric engine delivers sub-3-second face matching, automated document OCR, and ISO-certified liveness detection — with no biometric data ever leaving your infrastructure.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Fingerprint, title: "Biometric Face Authentication", desc: "ISO-31 compliant 1:1 face matching with 99.9% accuracy for secure user onboarding." },
                                    { icon: Search, title: "Document OCR Engine", desc: "Automated extraction of data from passports, CNICs, and national ID documents." },
                                    { icon: Shield, title: "Anti-Spoofing & Fraud Guard", desc: "3D liveness detection with passive anti-spoof mechanisms to block deepfakes and injection attacks." },
                                    { icon: Zap, title: "Sub-3 Second Verification", desc: "Full identity verification pipeline completes in under 3 seconds on-device." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
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
                        <div className="relative group">
                            <LoginMockup />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Security Section */}
            <section className="bg-[#070B14] py-24 border-y border-white/5 mt-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Reveal>
                        <Lock className="w-12 h-12 text-blue-500 mx-auto mb-8" />
                        <h2 className="text-3xl font-bold text-white mb-6">Total Data Sovereignty</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            ngeKYC can be deployed entirely on-premise or in your private cloud. Unlike other providers, we never see your users' biometric data. Your keys, your data, your control.
                        </p>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
