"use client"
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react';

// ─── Mapifyit Config ────────────────────────────────────────────────────────
const MAPIFYIT_STYLE_URL = 'https://dev-client.mapifyit.com/api/v1/proxy/tiles/dark';
const MAPIFYIT_TOKEN = 'mfy_8b0755c081c9204caa20681ddab91d2856c3667a6ad8d9e8';
const DUBAI_LNG = 55.2608;
const DUBAI_LAT = 25.1840;

export default function ContactUs({ standalone = false }: { standalone?: boolean }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const mapRef = useRef<{ remove: () => void } | null>(null);
    const mapInitStarted = useRef(false);
    const [shouldLoadMap, setShouldLoadMap] = useState(false);
    const [hasInteractiveMap, setHasInteractiveMap] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) return;

        const connection = (
            navigator as Navigator & {
                connection?: { saveData?: boolean; effectiveType?: string };
            }
        ).connection;

        const isSlowNetwork = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
        const isSmallViewport = window.innerWidth < 768;
        if (isSmallViewport || connection?.saveData || isSlowNetwork) return;

        let observer: IntersectionObserver | null = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoadMap(true);
                    if (observer) {
                        observer.disconnect();
                        observer = null;
                    }
                }
            },
            { rootMargin: "120px 0px" }
        );

        observer.observe(container);

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!shouldLoadMap) return;

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
                setHasInteractiveMap(true);
            } catch (e) {
                console.error('[Mapifyit] Map failed:', e);
            }
        }

        initMap();
        return () => {
            isMounted = false;
            if (mapRef.current) mapRef.current.remove();
            mapRef.current = null;
            setHasInteractiveMap(false);
            mapInitStarted.current = false;
        };
    }, [shouldLoadMap]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus('sending');

        const formData = new FormData(formRef.current);
        const payload = {
            name: (formData.get('name') ?? '').toString().trim(),
            email: (formData.get('email') ?? '').toString().trim(),
            phone: (formData.get('phone') ?? '').toString().trim(),
            message: (formData.get('message') ?? '').toString().trim(),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Failed to send message');
            }

            setStatus('sent');
            formRef.current?.reset();
        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="contact" className={`relative w-full bg-[#030712] overflow-hidden ${standalone ? 'py-0' : 'py-24'}`}>
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* LEFT: Info & Map */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                Contact Us
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                Ready to deploy secure, offline GIS? Our engineers are standing by to help you architect your spatial infrastructure.
                            </p>
                        </div>

                        {/* Integrated Map Viewport */}
                        <div className="relative w-full h-[300px] rounded-3xl overflow-hidden border border-blue-900/30 shadow-2xl group">
                            <div
                                ref={mapContainerRef}
                                className={`w-full h-full transition-all duration-700 ${hasInteractiveMap ? 'opacity-100' : 'opacity-0'}`}
                            />
                            {!hasInteractiveMap && (
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#07101E] to-[#0A172A]">
                                    <div className="absolute inset-0 bg-[radial-gradient(rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center px-6">
                                            <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                                                {shouldLoadMap ? "Loading interactive map..." : "Fast mode enabled for mobile"}
                                            </p>
                                            <p className="mt-2 text-xs text-slate-500">
                                                Business Bay, Dubai, UAE
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/80 backdrop-blur-md border border-white/5 rounded-xl flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg"><MapPin className="w-4 h-4 text-cyan-400" /></div>
                                <span className="text-xs text-slate-300 font-mono">Business Bay, Dubai, UAE</span>
                            </div>
                        </div>

                        {/* Contact Details Panel */}
                        <div className="p-7 rounded-[2rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 shadow-2xl space-y-7">
                            {/* Actionable Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-7 border-b border-white/5">
                                <a href="mailto:hi@mapifyit.com" className="flex items-center gap-4 group">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">hi@mapifyit.com</p>
                                    </div>
                                </a>
                                <a href="tel:+97144429622" className="flex items-center gap-4 group">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-900 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">+971 4 442 9622</p>
                                    </div>
                                </a>
                            </div>

                            {/* Global Offices */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 pt-1">
                                <div className="flex items-start gap-4 group">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            Dubai HQ
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                                        </p>
                                        <p className="text-sm text-slate-400 leading-[1.7] font-medium group-hover:text-slate-200 transition-colors">
                                            Office #1508 Citadel Tower<br />
                                            Business Bay, Dubai, UAE
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            USA Branch
                                        </p>
                                        <p className="text-sm text-slate-400 leading-[1.7] font-medium group-hover:text-slate-200 transition-colors">
                                            Office #9100 Southwest Fwy<br />
                                            Houston, TX 77074, USA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>                    </div>

                    {/* RIGHT: The Form */}
                    <div className="relative lg:h-full">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur opacity-10" />

                        <form ref={formRef} onSubmit={handleSubmit} className="relative lg:h-full flex flex-col bg-[#0A101F] border border-blue-900/30 p-8 md:p-10 rounded-[2.5rem] shadow-3xl">
                            <div className="flex flex-col flex-1 gap-6">
                                <div className="space-y-2 shrink-0">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2 shrink-0">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="john@company.com"
                                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2 shrink-0">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <input
                                            required
                                            name="phone"
                                            type="tel"
                                            placeholder="+971 50 123 4567"
                                            className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] ml-1 shrink-0">Project Requirements</label>
                                    <div className="relative group flex-1 min-h-[140px]">
                                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10" />
                                        <textarea
                                            required
                                            name="message"
                                            placeholder="Tell us about your GIS needs..."
                                            className="absolute inset-0 w-full h-full bg-slate-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="shrink-0 space-y-6 pt-2">
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
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
