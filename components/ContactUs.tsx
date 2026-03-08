"use client"
import React from 'react';
import { Phone, Mail, MapPin, Globe, ChevronRight } from 'lucide-react';

export default function ContactUs() {
    return (
        <section id="contactus" className="relative w-full bg-[#03060D] py-20 overflow-hidden">
            <style jsx>{`
                .location-pulse {
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    background: #3B82F6;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }
                .location-pulse::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #3B82F6;
                    animation: ripple 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                }
                @keyframes ripple {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(3.5); opacity: 0; }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6">
                {/* Ensure items-start is used so they align at the top */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* --- LEFT SIDE: THE MAP --- */}
                    <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178652316443!2d55.2583134761131!3d25.184026777717467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69da0ec59f21%3A0xe54316f461e7b92!2sThe%20Citadel%20Tower!5e0!3m2!1sen!2sae!4v1709913123456!5m2!1sen!2sae"
                            className="w-full h-full opacity-90 transition-all duration-700 grayscale-[0.2] hover:grayscale-0"
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>

                        {/* Animated Location Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="location-pulse"></div>
                        </div>

                        {/* Map Overlay Badge */}
                        <div className="absolute bottom-6 left-6 bg-[#0B0F17]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Citadel Tower</p>
                                    <p className="text-slate-400 text-xs tracking-wide">Business Bay, Dubai</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: CONTENT (Aligned to top) --- */}
                    <div className="flex flex-col pt-2 h-full">
                        <div className="mb-8">
                            <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                                Contact<span className="text-blue-500 ml-3 text-4xl md:text-5xl">Us.</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-lg max-w-lg mb-4">
                                Whether you’re building a new application, scaling an enterprise platform, or exploring secure mapping solutions, our team is here to help.
                            </p>
                            <p className="text-slate-400 leading-relaxed text-lg max-w-lg">
                                Get in touch with <span className="text-white font-semibold">Mapifyit</span> to discuss your requirements or request a demo.
                            </p>
                        </div>

                        {/* Office Locations */}
                        <div className="space-y-8 py-10 border-y border-white/10">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold mb-1">Dubai Headquarters</h5>
                                    <p className="text-slate-400 text-sm leading-6">
                                        Office # 1508 Citadel Tower, Business Bay, Dubai, UAE.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold mb-1">USA Operations</h5>
                                    <p className="text-slate-400 text-sm leading-6">
                                        Office # 9100 Southwest Freeway, Houston, Texas, USA 77074.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Methods */}
                        <div className="pt-10 space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <a href="tel:+97144429622" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-600 transition-all group">
                                    <Phone className="w-5 h-5 text-blue-500 group-hover:text-white" />
                                    <span className="text-slate-200 font-semibold group-hover:text-white transition-colors">+9714-442-9622</span>
                                </a>

                                <a href="mailto:hi@mapifyit.com" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-600 transition-all group">
                                    <Mail className="w-5 h-5 text-blue-500 group-hover:text-white" />
                                    <span className="text-slate-200 font-semibold group-hover:text-white transition-colors">hi@mapifyit.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}