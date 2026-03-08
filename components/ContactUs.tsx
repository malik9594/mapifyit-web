"use client"
import React from 'react';
import { Phone, Mail, MapPin, Globe, ChevronRight } from 'lucide-react';

export default function ContactUs() {
    return (
        <section id="contactus" className="relative w-full bg-[#03060D] py-20 overflow-hidden">
            {/* Custom CSS for the animated dot */}
            <style jsx>{`
                .location-pulse {
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    background: #3B82F6;
                    border-radius: 50%;
                    box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
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

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* --- LEFT SIDE: THE MAP --- */}
                <div className="relative w-full h-[500px] lg:h-[650px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786520147647!2d55.25831347614088!3d25.18402677771746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69ee85420367%3A0x62955577666f7f32!2sThe%20Citadel%20Tower!5e0!3m2!1sen!2sae!4v1709456000000!5m2!1sen!2sae"
                        className="w-full h-full opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        style={{ border: 0 }}
                        loading="lazy"
                    ></iframe>

                    {/* --- NEW: Animated Location Dot Overlay --- */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="location-pulse"></div>
                        {/* Tooltip for the dot */}
                        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                            WE ARE HERE
                        </div> */}
                    </div>

                    {/* Map Overlay Badge */}
                    <div className="absolute bottom-6 left-6 bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Citadel Tower</p>
                                <p className="text-slate-400 text-xs">Business Bay, Dubai</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: CONTENT --- */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <h3 className="text-5xl font-bold text-white mb-6">Contact<span className="text-blue-500">.</span></h3>
                        <p className="text-slate-400 leading-relaxed text-lg max-w-lg">
                            Whether you’re building a new application, scaling an enterprise platform, or exploring secure, offline mapping solutions, our team is here to help.
                        </p>
                    </div>

                    {/* Office Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-y border-white/5">
                        <div>
                            <h5 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                <Globe className="w-3 h-3" /> Dubai
                            </h5>
                            <p className="text-slate-300 text-sm leading-6">
                                Office # 1508 Citadel Tower<br />
                                Business Bay, Dubai, UAE.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                <Globe className="w-3 h-3" /> USA
                            </h5>
                            <p className="text-slate-300 text-sm leading-6">
                                Office # 9100 Southwest Freeway<br />
                                Houston, Texas, USA 77074
                            </p>
                        </div>
                    </div>

                    {/* Contact Details Cards */}
                    <div className="grid gap-4">
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:+97144429622" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="text-slate-200 font-medium">+9714-442-9622</span>
                            </a>

                            <a href="mailto:hi@mapifyit.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="text-slate-200 font-medium">hi@mapifyit.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}