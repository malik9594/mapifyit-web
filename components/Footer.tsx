"use client";

import React from 'react';
import Link from 'next/link';
import {
    Linkedin,
    Mail,
    Phone,
    ChevronRight
} from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        // { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "https://linkedin.com/company/mapifyit", label: "LinkedIn" },
        // { icon: Facebook, href: "#", label: "Facebook" },
        // { icon: Instagram, href: "#", label: "Instagram" },
        // { icon: Github, href: "#", label: "GitHub" },
    ];

    const footerLinks = {
        Products: [
            { name: "Maps", href: "/maps" },
            { name: "GIS", href: "/gis" },
            // { name: "Fleet Management", href: "/fms" },
            // { name: "Identity Verification", href: "https://ngekyc.mapifyit.com/" },
        ],
        Solutions: [
            { name: "NG eKYC", href: "https://ngekyc.mapifyit.com/" },
            { name: "Fleet Management System", href: "/fleet-management-system" },
            { name: "Field Force Tracking", href: "/field-force-tracking" },
        ],
        Company: [
            { name: "Pricing", href: "/pricing" },
            { name: "Documentation", href: "https://dev.mapifyit.com/documentation" },
            { name: "Contact Us", href: "/contact-us" },
            { name: "About Us", href: "#" },
        ]
    };

    return (
        <footer className="relative border-t border-white/5 bg-[#030712] pt-24 pb-12 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-2 mb-8">
                            <img src="/mapify-white-bg.png" alt="Mapifyit Logo" className="h-10 w-auto object-contain" />
                        </div>
                        <p className="text-slate-400 text-[15px] leading-relaxed mb-8 max-w-sm">
                            The enterprise-grade location intelligence platform for modern organizations. Build sovereign, high-performance geospatial applications with 100% on-premise security.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">{title}</h4>
                                <ul className="space-y-4">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                target='_blank'
                                                className="text-slate-400 hover:text-cyan-400 text-[14px] transition-all flex items-center group relative pl-0 hover:pl-5"
                                            >
                                                <ChevronRight className="w-3 h-3 absolute left-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter / Contact Section */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Connect</h4>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors text-sm">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-cyan-500" />
                                </div>
                                <span>hi@mapifyit.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors text-sm">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                </div>
                                <span>+97144429622</span>

                            </div>
                            <div className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors text-sm">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                </div>
                                <span>+966535405691</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors text-sm">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                </div>
                                <span>+18326529278</span>
                            </div>
                        </div>

                        {/* Elegant CTA */}
                        {/* <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 backdrop-blur-sm">
                            <p className="text-white text-sm font-medium mb-3">Ready to build?</p>
                            <a href="#" className="inline-flex items-center text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors">
                                Get Started <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </div> */}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-xs tracking-wide">
                        &copy; {new Date().getFullYear()} <span className="text-slate-300 font-medium cursor-pointer"><Link href='https://mapifyit.com'>Mapifyit</Link></span>. All rights reserved.
                    </div>

                    <div className="flex gap-8">
                        {[
                            { name: "Privacy Policy", href: "/privacy-policy" },
                            { name: "Terms of Service", href: "/terms-of-service" },
                            // { name: "Cookie Policy", href: "#" }
                            { name: "FAQ", href: "/faq" }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">System Pulse: Stable</span>
                    </div>
                </div>
            </div>

            {/* Subtle Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </footer>
    );
}
