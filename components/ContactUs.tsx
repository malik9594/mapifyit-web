"use client"
import React, { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

// ─── Mapifyit Config ────────────────────────────────────────────────────────
// const MAPIFYIT_STYLE_URL = 'https://tiles.mapifyit.com/styles/dark-style/style.json';
const MAPIFYIT_STYLE_URL = 'https://dev-client.mapifyit.com/api/v1/proxy/tiles/dark';
const MAPIFYIT_TOKEN = 'mfy_8b0755c081c9204caa20681ddab91d2856c3667a6ad8d9e8';

// Dubai – Citadel Tower, Business Bay
const DUBAI_LNG = 55.2608;
const DUBAI_LAT = 25.1840;
// ────────────────────────────────────────────────────────────────────────────

export default function ContactUs() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const mapInitStarted = useRef(false);
    const [mapLoaded, setMapLoaded] = React.useState(false);

    useEffect(() => {
        let isMounted = true;

        // PERFORMANCE: Start pre-loading the heavy engine immediately
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
                    pitch: 30,
                    bearing: -10,
                    attributionControl: false,
                    fadeDuration: 0, // Instant geometry rendering
                    renderWorldCopies: false,
                    maxTileCacheSize: 200,
                    transformRequest: (url: string) => {
                        const isMapifyit =
                            url.includes('mapifyit.com') ||
                            url.includes('client.mapifyit.com') ||
                            url.includes('tiles.mapifyit.com') ||
                            url.includes('localhost:5000');

                        if (isMapifyit) {
                            return {
                                url,
                                headers: {
                                    Authorization: `Bearer ${MAPIFYIT_TOKEN}`,
                                    'Content-Type': 'application/json',
                                },
                            };
                        }
                        return { url };
                    },
                });

                map.on('load', () => {
                    if (!isMounted) return;
                    setMapLoaded(true);

                    new maplibregl.Marker({ color: '#3B82F6' })
                        .setLngLat([DUBAI_LNG, DUBAI_LAT])
                        .setPopup(
                            new maplibregl.Popup({ offset: 25 }).setHTML(
                                `<div style="font-family:sans-serif;padding:4px 2px">
                                    <strong style="color:#1e293b">Citadel Tower</strong><br/>
                                    <span style="color:#64748b;font-size:12px">Business Bay, Dubai, UAE</span>
                                </div>`
                            )
                        )
                        .addTo(map);
                });

                mapRef.current = map;
            } catch (e) {
                console.error('[Mapifyit] Map failed to load:', e);
            }
        }

        // Trigger loading immediately for instant availability
        initMap();

        return () => {
            isMounted = false;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            mapInitStarted.current = false;
        };
    }, []);

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
                    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70%  { transform: scale(1);    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                }
                @keyframes ripple {
                    0%   { transform: scale(1); opacity: 1; }
                    100% { transform: scale(3.5); opacity: 0; }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* ── LEFT: MapLibre map ─────────────────────────────── */}
                    <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B1220]">
                        {/* Map container - Instant display, no skeleton */}
                        <div
                            ref={mapContainerRef}
                            className="w-full h-full"
                        />

                        {/* Map Overlay Badge */}
                        <div className="absolute bottom-6 left-6 bg-[#0B0F17]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl z-10 pointer-events-none">
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

                    {/* ── RIGHT: Content ──────────────────────────────────── */}
                    <div className="flex flex-col pt-2 h-full">
                        <div className="mb-8">
                            <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                                Contact<span className="text-blue-500 ml-3 text-4xl md:text-5xl">Us.</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-lg max-w-lg mb-4">
                                Whether you're building a new application, scaling an enterprise platform, or exploring secure mapping solutions, our team is here to help.
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