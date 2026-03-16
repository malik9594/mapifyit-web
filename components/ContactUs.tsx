"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Globe, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── Mapifyit Config ────────────────────────────────────────────────────────
const MAPIFYIT_STYLE_URL = 'https://dev-client.mapifyit.com/api/v1/proxy/tiles/dark';
const MAPIFYIT_TOKEN = 'mfy_8b0755c081c9204caa20681ddab91d2856c3667a6ad8d9e8';
const DUBAI_LNG = 55.2608;
const DUBAI_LAT = 25.1840;

// EmailJS Configuration (Replace with your own IDs from emailjs.com)
const EMAILJS_SERVICE_ID = 'service_zwv3eln'; // e.g., 'service_gmail'
const EMAILJS_TEMPLATE_ID = 'template_8encwr5'; // e.g., 'template_contact'
const EMAILJS_PUBLIC_KEY = 'oUCWzxACRZZLpm5ok'; // Found in Account -> Public Key

export default function ContactUs() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const mapRef = useRef<any>(null);
    const mapInitStarted = useRef(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    useEffect(() => {
        let isMounted = true;
        const preloadEngine = import('maplibre-gl');

        async function initMap() {
            if (!mapContainerRef.current || mapRef.current || mapInitStarted.current) return;
            mapInitStarted.current = true;

            try {
                const maplibregl = (await preloadEngine).default;
                if (!isMounted) return;

                const map = new maplibregl.Map({
                    container: mapContainerRef.current!,
                    style: MAPIFYIT_STYLE_URL,
                    center: [DUBAI_LNG, DUBAI_LAT],
                    zoom: 14,
                    pitch: 45,
                    attributionControl: false,
                    transformRequest: (url: string) => {
                        if (url.includes('mapifyit.com')) {
                            return {
                                url,
                                headers: { Authorization: `Bearer ${MAPIFYIT_TOKEN}` },
                            };
                        }
                        return { url };
                    },
                });

                map.on('load', () => {
                    if (!isMounted) return;
                    new maplibregl.Marker({ color: '#22D3EE' })
                        .setLngLat([DUBAI_LNG, DUBAI_LAT])
                        .addTo(map);
                });

                mapRef.current = map;
            } catch (e) {
                console.error('[Mapifyit] Map failed:', e);
            }
        }

        initMap();
        return () => {
            isMounted = false;
            if (mapRef.current) mapRef.current.remove();
            mapInitStarted.current = false;
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus('sending');

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formRef.current,
            EMAILJS_PUBLIC_KEY
        ).then((result) => {
            console.log('Email sent successfully:', result.text);
            setStatus('sent');
            formRef.current?.reset();
        }, (error) => {
            console.error('Failed to send email:', error.text);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        });
    };

    return (
        <section id="contact" className="relative w-full bg-[#030712] py-24 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT: Info & Map */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Us.</span>
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                Ready to deploy secure, offline GIS? Our engineers are standing by to help you architect your spatial infrastructure.
                            </p>
                        </div>

                        {/* Integrated Map Viewport */}
                        <div className="relative w-full h-[300px] rounded-3xl overflow-hidden border border-blue-900/30 shadow-2xl group">
                            <div ref={mapContainerRef} className="w-full h-full transition-all duration-700" />
                            <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/80 backdrop-blur-md border border-white/5 rounded-xl flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg"><MapPin className="w-4 h-4 text-cyan-400" /></div>
                                <span className="text-xs text-slate-300 font-mono">Business Bay, Dubai, UAE</span>
                            </div>
                        </div>

                        {/* Quick Contact Links */}
                        <div className="grid grid-cols-2 gap-4">
                            <a href="mailto:hi@mapifyit.com" className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 transition-all group">
                                <Mail className="w-5 h-5 text-cyan-400 mb-2" />
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Us</p>
                                <p className="text-white text-sm">hi@mapifyit.com</p>
                            </a>
                            <a href="tel:+97144429622" className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 transition-all group">
                                <Phone className="w-5 h-5 text-blue-400 mb-2" />
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Call Us</p>
                                <p className="text-white text-sm">+971 4 442 9622</p>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT: The Form */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur opacity-10" />

                        <form ref={formRef} onSubmit={handleSubmit} className="relative bg-[#0A101F] border border-blue-900/30 p-8 md:p-10 rounded-[2.5rem] shadow-3xl">
                            <div className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <input
                                            required
                                            name="from_name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <input
                                            required
                                            name="user_email"
                                            type="email"
                                            placeholder="john@company.com"
                                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1">Project Requirements</label>
                                    <div className="relative group">
                                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <textarea
                                            required
                                            name="message"
                                            rows={4}
                                            placeholder="Tell us about your GIS needs..."
                                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={status === 'sending' || status === 'sent'}
                                    className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-xl text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all disabled:opacity-50"
                                >
                                    {status === 'sent' ? (
                                        <>Request Sent! <CheckCircle2 className="w-5 h-5 text-slate-900" /></>
                                    ) : (
                                        <>
                                            {status === 'sending' ? 'Sending...' : 'Send Request'}
                                            <Send className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${status === 'sending' ? 'animate-pulse' : ''}`} />
                                        </>
                                    )}
                                </button>

                                {status === 'error' && (
                                    <p className="text-[10px] text-center text-red-500 uppercase tracking-widest font-mono">
                                        Failed to send. Please try again or email hi@mapifyit.com
                                    </p>
                                )}

                                <p className="text-[10px] text-center text-slate-600 uppercase tracking-widest font-mono">
                                    Secure SSL Encrypted Transmission
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}