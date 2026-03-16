// "use client"
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MapPin, Search, Activity, Layers, ArrowRight, Navigation, Truck, Bus, Car, Footprints } from 'lucide-react';

// export default function MapifyitMultiModalShowcase() {
//     const [step, setStep] = useState(0);
//     const [mode, setMode] = useState('car'); // car, pedestrian, bus
//     const [syncProgress, setSyncProgress] = useState(0);

//     const locations = [
//         {
//             city: "Manhattan Hub",
//             desc: "7th Ave → Warehouse B → Broadway",
//             color: "text-blue-400",
//             path: "M 40 450 L 120 380 L 220 320",
//             carDist: "4.2 mi", pedDist: "3.8 mi", busDist: "5.1 mi",
//             bgShift: { x: -50, y: -20, scale: 1.5 }
//         },
//         {
//             city: "LA Terminal",
//             desc: "Sunset Blvd → Sorting → Marina",
//             color: "text-indigo-400",
//             path: "M 220 320 L 150 200 L 60 120",
//             carDist: "12.8 mi", pedDist: "11.2 mi", busDist: "14.5 mi",
//             bgShift: { x: -120, y: -60, scale: 1.8 }
//         }
//     ];

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setStep((prev) => (prev + 1) % (locations.length * 2));
//         }, step % 2 === 0 ? 1200 : 6000);

//         if (step % 2 !== 0) {
//             setSyncProgress(0);
//             const int = setInterval(() => {
//                 setSyncProgress(prev => prev < 100 ? prev + 3 : 100);
//             }, 50);
//             return () => clearInterval(int);
//         }
//         return () => clearTimeout(timer);
//     }, [step]);

//     const isTyping = step % 2 === 0;
//     const current = locations[Math.floor(step / 2) % locations.length];

//     // Mode-based speed logic
//     const getAnimDuration = () => {
//         if (mode === 'pedestrian') return 15; // Slow walk
//         if (mode === 'bus') return 9; // Medium transit
//         return 4; // Fast car
//     };

//     return (
//         <div className="relative w-full group">
//             {/* --- OUTER GLOW (GIS STYLE) --- */}
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-700 to-cyan-400 rounded-[2.2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

//             <div className="relative bg-[#0A101F] border border-blue-950 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[450px] md:h-[550px]">

//                 {/* --- TOOLBAR HEADER (GIS STYLE) --- */}
//                 <div className="px-6 py-4 border-b border-blue-950/50 bg-slate-950 flex items-center justify-between z-50">
//                     <div className="flex gap-1.5">
//                         <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
//                         <div className="w-2.5 h-2.5 rounded-full bg-blue-800" />
//                         <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
//                     </div>
//                     <span className="text-[11px] font-mono text-cyan-500 uppercase tracking-widest">Analytic_Workspace_v4.3</span>
//                     <Layers className="w-4 h-4 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" />
//                 </div>

//                 {/* --- MAIN RENDERING AREA --- */}
//                 <div className="flex-1 relative overflow-hidden bg-[#080E18]">

//                     {/* Background Texture & Grid (HUD Style) */}
//                     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/topographic-map.png')] grayscale invert" />
//                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]" />

//                     {/* --- VECTOR MAP CONTENT --- */}
//                     <motion.div
//                         animate={{ x: current.bgShift.x, y: current.bgShift.y, scale: current.bgShift.scale }}
//                         transition={{ duration: 5, ease: "linear" }}
//                         className="absolute inset-0 z-0 opacity-30"
//                     >
//                         <svg width="2000" height="1200" viewBox="0 0 2000 1200" fill="none">
//                             <pattern id="urban-mesh-gis" width="200" height="200" patternUnits="userSpaceOnUse">
//                                 <rect x="10" y="10" width="40" height="60" rx="2" fill="#3b82f6" opacity="0.1" />
//                                 <rect x="100" y="10" width="80" height="120" rx="2" fill="#3b82f6" opacity="0.05" />
//                                 <path d="M0 80 H200 M50 0 V200" stroke="#1e293b" strokeWidth="0.5" />
//                             </pattern>
//                             <rect width="4000" height="2000" fill="url(#urban-mesh-gis)" />
//                         </svg>
//                     </motion.div>

//                     {/* --- HUD: SCENE INFORMATION (GIS STYLE) --- */}
//                     <div className="absolute top-[12%] left-[6%] w-[380px] max-w-[85%] z-50 pointer-events-none flex flex-col gap-2">
//                         <div className="font-mono text-[10px] sm:text-xs text-blue-400 tracking-[2px] uppercase flex items-center gap-2.5">
//                             <div className="w-[30px] h-[1px] bg-blue-500" />
//                             Module <span>0{Math.floor(step / 2) + 1}</span> // 02
//                         </div>
//                         <h2 className="text-xl md:text-3xl font-bold leading-[1.2] m-0 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white uppercase tracking-tight">
//                             {isTyping ? "Engine Initializing..." : `${mode} Optimized Path`}
//                         </h2>
//                         <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-mono m-0 opacity-80">
//                             {current.desc}
//                         </p>
//                     </div>

//                     {/* --- HUD: DATA FEED (BOTTOM LEFT) --- */}
//                     <div className="absolute bottom-12 left-[6%] z-50 hidden md:flex flex-col gap-4">
//                         <div className="flex gap-4">
//                             <div className="bg-slate-950/80 backdrop-blur-md border border-white/5 py-2 px-4 rounded-xl">
//                                 <p className="text-[8px] text-slate-500 uppercase font-mono mb-1">Vector_Dist</p>
//                                 <p className="text-sm font-mono font-bold text-blue-400">
//                                     {mode === 'car' && current.carDist}
//                                     {mode === 'pedestrian' && current.pedDist}
//                                     {mode === 'bus' && current.busDist}
//                                 </p>
//                             </div>
//                             <div className="bg-slate-950/80 backdrop-blur-md border border-white/5 py-2 px-4 rounded-xl">
//                                 <p className="text-[8px] text-slate-500 uppercase font-mono mb-1">Live_Sync</p>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                                     <span className="text-sm font-mono font-bold text-emerald-400">{syncProgress}%</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- MODE SWITCHER (HUD STYLE) --- */}
//                     <div className="absolute top-1/2 -translate-y-1/2 right-6 z-50 flex flex-col gap-3">
//                         {[
//                             { id: 'car', icon: Car, label: 'Vehicle' },
//                             { id: 'bus', icon: Bus, label: 'Transit' },
//                             { id: 'pedestrian', icon: Footprints, label: 'Walking' }
//                         ].map((item) => (
//                             <button
//                                 key={item.id}
//                                 onClick={() => setMode(item.id)}
//                                 className={`p-3 rounded-full border transition-all relative group/btn ${mode === item.id
//                                     ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110'
//                                     : 'bg-slate-950/80 backdrop-blur-xl border-white/10 text-white/40 hover:border-blue-500/30'}`}
//                             >
//                                 <item.icon className="w-5 h-5" />
//                                 <div className="absolute right-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-[9px] font-mono rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap border border-white/10 uppercase tracking-widest text-[#2E6BFF]">
//                                     {item.label}
//                                 </div>
//                             </button>
//                         ))}
//                     </div>

//                     {/* --- ROUTE PATH --- */}
//                     <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
//                         <AnimatePresence>
//                             {!isTyping && (
//                                 <motion.path
//                                     key={current.city + mode}
//                                     d={current.path}
//                                     fill="transparent"
//                                     stroke={mode === 'pedestrian' ? '#10B981' : mode === 'bus' ? '#818CF8' : '#3b82f6'}
//                                     strokeWidth="4"
//                                     strokeLinecap="round"
//                                     strokeDasharray={mode === 'bus' ? "8,6" : mode === 'pedestrian' ? "2,4" : "0"}
//                                     initial={{ pathLength: 0, opacity: 0 }}
//                                     animate={{ pathLength: 1, opacity: 1 }}
//                                     transition={{ duration: 2 }}
//                                     style={{ filter: "drop-shadow(0 0 15px rgba(59,130,246,0.4))" }}
//                                 />
//                             )}
//                         </AnimatePresence>
//                     </svg>

//                     {/* --- DYNAMIC VEHICLE --- */}
//                     {!isTyping && (
//                         <motion.div
//                             key={mode}
//                             initial={{ offsetDistance: "0%" }}
//                             animate={{ offsetDistance: "100%" }}
//                             transition={{ duration: getAnimDuration(), repeat: Infinity, ease: "linear" }}
//                             style={{ offsetPath: `path("${current.path}")` }}
//                             className="absolute z-30"
//                         >
//                             <div className="relative">
//                                 <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse" />
//                                 <div className={`relative rounded-full p-2.5 shadow-2x-lg bg-slate-900 border border-white/20 text-white`}>
//                                     {mode === 'car' && <Truck className="w-4 h-4 text-blue-400" />}
//                                     {mode === 'bus' && <Bus className="w-4 h-4 text-indigo-400" />}
//                                     {mode === 'pedestrian' && (
//                                         <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>
//                                             <Footprints className="w-4 h-4 text-emerald-400" />
//                                         </motion.div>
//                                     )}
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}

//                     {/* --- PROGRESS BAR (BOTTOM ANCHOR) --- */}
//                     <div className="absolute bottom-6 left-[6%] w-[88%] h-0.5 bg-white/10 z-50 rounded-full overflow-hidden">
//                         <motion.div
//                             className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
//                             initial={{ width: 0 }}
//                             animate={{ width: `${syncProgress}%` }}
//                             transition={{ duration: 0.1 }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Crosshair, Route, Layers } from 'lucide-react';

// --- Type Declarations ---
declare global {
    interface Window {
        L: any; // Using 'any' to avoid requiring @types/leaflet as a mandatory dependency
    }
}

// --- Constants & Configuration ---
const PRIMARY_COLOR = '#2F80ED';
const SCENE_DURATION = 3500;

const SCENES = [
    'init', 'nyc', 'search', 'geocode', 'reverse', 'routing', 'tracking', 'gis'
];

// --- Helper Functions ---
const createPulseIcon = (color: string = PRIMARY_COLOR) => `
  <div class="relative flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform duration-500 animate-scale-in">
    <div class="absolute w-4 h-4 bg-[${color}] rounded-full z-10 shadow-[0_0_15px_${color}] group-hover:shadow-[0_0_25px_${color}] transition-shadow duration-500"></div>
    <div class="absolute w-full h-full bg-[${color}] rounded-full animate-ping opacity-50 group-hover:opacity-80"></div>
  </div>
`;

const createMarkerIcon = (color: string = PRIMARY_COLOR) => `
  <div class="relative flex items-center justify-center transition-all duration-300 animate-scale-in">
    <div class="w-6 h-6 bg-[${color}] rounded-full flex items-center justify-center shadow-[0_0_15px_${color}] group-hover:shadow-[0_0_25px_${color}] transform transition-transform scale-100 group-hover:scale-125">
      <div class="w-2 h-2 bg-white rounded-full"></div>
    </div>
    <div class="absolute -bottom-2 w-1 h-3 bg-[${color}]"></div>
  </div>
`;

export default function MapifyAnimation() {
    const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const layerGroupRef = useRef<any>(null);

    // Strict cleanup refs to prevent React crash loops in Next.js Strict Mode
    const timeoutsRef = useRef<any[]>([]);
    const intervalsRef = useRef<any[]>([]);
    const vehicleIntervalRef = useRef<any>(null);
    const paneRef = useRef<HTMLDivElement>(null);

    // UI State for Overlays
    const [searchText, setSearchText] = useState<string>('');
    const [reverseAddress, setReverseAddress] = useState<string>('');
    const [routeEta, setRouteEta] = useState<string>('');
    const [vehicleStatus, setVehicleStatus] = useState({ eta: '4 min', dist: '1.2 mi' });

    // --- 1. Load Leaflet Dynamically (Next.js SSR Safe) ---
    useEffect(() => {
        if (typeof window === 'undefined') return; // Protect against SSR

        if (window.L) {
            setLeafletLoaded(true);
            return;
        }

        const cssId = 'leaflet-css-layer';
        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        const scriptId = 'leaflet-script-layer';
        let script = document.getElementById(scriptId) as HTMLScriptElement | null;

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.async = true;
            document.head.appendChild(script);
        }

        const handleLoad = () => setLeafletLoaded(true);
        script.addEventListener('load', handleLoad);

        const fallbackCheck = setInterval(() => {
            if (window.L) {
                setLeafletLoaded(true);
                clearInterval(fallbackCheck);
            }
        }, 100);

        return () => {
            if (script) script.removeEventListener('load', handleLoad);
            clearInterval(fallbackCheck);
        };
    }, []);

    // --- Map Helper Function ---
    const drawGrid = (L: any, map: any, group: any) => {
        if (!group) return;
        for (let lat = -90; lat <= 90; lat += 10) {
            L.polyline([[lat, -180], [lat, 180]], { color: '#ffffff', weight: 1, opacity: 0.03 }).addTo(group);
        }
        for (let lng = -180; lng <= 180; lng += 10) {
            L.polyline([[-90, lng], [90, lng]], { color: '#ffffff', weight: 1, opacity: 0.03 }).addTo(group);
        }
    };

    // --- 2. Initialize Map ---
    useEffect(() => {
        if (!leafletLoaded || mapRef.current || !mapContainerRef.current) return;

        // React Strict Mode protection
        const container = mapContainerRef.current as any;
        if (container._leaflet_id) {
            container.innerHTML = '';
            container._leaflet_id = null;
        }

        const L = window.L;

        const map = L.map(mapContainerRef.current, {
            center: [30.0, -115.0],
            zoom: 3.5,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        }).addTo(map);

        layerGroupRef.current = L.featureGroup().addTo(map);
        mapRef.current = map;

        drawGrid(L, map, layerGroupRef.current);

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [leafletLoaded]);

    // --- 3. Auto-Playback Loop ---
    useEffect(() => {
        if (!leafletLoaded) return;

        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % SCENES.length);
        }, SCENE_DURATION);

        return () => clearInterval(timer);
    }, [leafletLoaded]);

    // --- 4. Scene Director (Map Animations) ---
    useEffect(() => {
        if (!mapRef.current || !layerGroupRef.current) return;

        const L = window.L;
        const map = mapRef.current;
        const group = layerGroupRef.current;

        map.invalidateSize(); // Force Leaflet to update its internal container dimension tracking

        const scheduleTimeout = (fn: () => void, delay: number) => timeoutsRef.current.push(setTimeout(fn, delay));
        const scheduleInterval = (fn: () => void, delay: number) => intervalsRef.current.push(setInterval(fn, delay));

        const clearAllSchedules = () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            intervalsRef.current.forEach(clearInterval);
            intervalsRef.current = [];
            if (vehicleIntervalRef.current) {
                clearInterval(vehicleIntervalRef.current);
                vehicleIntervalRef.current = null;
            }
        };

        group.clearLayers();
        clearAllSchedules();

        setSearchText('');
        setRouteEta('');
        setReverseAddress('');

        const duration = SCENE_DURATION / 1000;

        // BUGFIX: Wraps flyTo inside a dimension check. If container size is 0 (due to CSS load order), 
        // flyTo produces NaN coordinates which crashes the app. setView bypasses the animation calculation gracefully.
        const safeFlyTo = (center: [number, number], zoom: number, options: any) => {
            const size = map.getSize();
            if (size.x > 0 && size.y > 0) {
                map.flyTo(center, zoom, options);
            } else {
                map.setView(center, zoom);
            }
        };

        switch (currentStep) {
            case 0: {
                safeFlyTo([39.8283, -98.5795], 4, { duration, easeLinearity: 0.1 });
                drawGrid(L, map, group);

                scheduleTimeout(() => {
                    for (let i = 0; i < 80; i++) {
                        const lat = 25 + Math.random() * 25;
                        const lng = -125 + Math.random() * 55;
                        L.circleMarker([lat, lng], {
                            radius: 1.5,
                            color: PRIMARY_COLOR,
                            fillColor: PRIMARY_COLOR,
                            fillOpacity: Math.random() * 0.8,
                            weight: 0,
                            className: 'animate-pulse'
                        }).addTo(group);
                    }
                }, 100);
                break;
            }
            case 1: {
                safeFlyTo([40.7128, -74.0060], 12, { duration, easeLinearity: 0.1 });
                scheduleTimeout(() => {
                    const coords: [number, number][] = [
                        [40.7128, -74.0060], [40.7580, -73.9855], [40.7306, -73.9866],
                        [40.7061, -74.0092], [40.7484, -73.9857]
                    ];
                    coords.forEach((coord, i) => {
                        scheduleTimeout(() => {
                            L.marker(coord, {
                                icon: L.divIcon({ className: 'custom-icon', html: createPulseIcon() })
                            }).addTo(group);
                        }, i * 150);
                    });
                }, duration * 600);
                break;
            }
            case 2: {
                safeFlyTo([40.75, -73.98], 14, { duration, easeLinearity: 0.1 });
                const text = "coffee near me";
                let i = 0;
                const typeInterval = setInterval(() => {
                    setSearchText(text.slice(0, i + 1));
                    i++;
                    if (i >= text.length) clearInterval(typeInterval);
                }, 80);
                intervalsRef.current.push(typeInterval);

                scheduleTimeout(() => {
                    const coffeeShops: [number, number][] = [
                        [40.751, -73.981], [40.755, -73.975], [40.748, -73.985],
                        [40.745, -73.982], [40.753, -73.988]
                    ];
                    coffeeShops.forEach((coord, j) => {
                        scheduleTimeout(() => {
                            L.marker(coord, {
                                icon: L.divIcon({ className: 'custom-icon', html: createMarkerIcon('#F2994A') })
                            }).addTo(group);
                        }, j * 100);
                    });
                }, duration * 600);
                break;
            }
            case 3: {
                safeFlyTo([37.3346, -122.0090], 15, { duration, easeLinearity: 0.1 });
                setSearchText("1 Apple Park Way");
                scheduleTimeout(() => {
                    L.marker([37.3346, -122.0090], {
                        icon: L.divIcon({ className: 'custom-icon', html: createMarkerIcon(PRIMARY_COLOR) })
                    }).addTo(group);

                    L.circle([37.3346, -122.0090], {
                        color: PRIMARY_COLOR, fillColor: PRIMARY_COLOR, fillOpacity: 0.2, radius: 250, weight: 1, className: 'animate-scale-in'
                    }).addTo(group);
                }, duration * 600);
                break;
            }
            case 4: {
                setReverseAddress("34.0522, -118.2437");
                safeFlyTo([34.0522, -118.2437], 13, { duration, easeLinearity: 0.1 });
                scheduleTimeout(() => {
                    const finalAddr = "Los Angeles, CA, USA";
                    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    let iterations = 0;
                    const scramble = setInterval(() => {
                        setReverseAddress(finalAddr.split("").map((char, index) => {
                            if (index < iterations) return finalAddr[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        }).join(""));
                        if (iterations >= finalAddr.length) clearInterval(scramble);
                        iterations += 1 / 2;
                    }, 30);
                    intervalsRef.current.push(scramble);
                }, duration * 600);
                break;
            }
            case 5: {
                safeFlyTo([35.8, -120.3], 6, { duration, easeLinearity: 0.1 });
                scheduleTimeout(() => {
                    const sf: [number, number] = [37.7749, -122.4194];
                    const la: [number, number] = [34.0522, -118.2437];

                    L.marker(sf, { icon: L.divIcon({ className: 'custom-icon', html: createMarkerIcon('#fff') }) }).addTo(group);
                    L.marker(la, { icon: L.divIcon({ className: 'custom-icon', html: createMarkerIcon('#fff') }) }).addTo(group);

                    const latlngs: [number, number][] = [sf, [36.8, -121.5], [35.5, -119.5], la];

                    const routeLine = L.polyline(latlngs, { color: PRIMARY_COLOR, weight: 4, opacity: 1, className: 'group-hover:brightness-150' }).addTo(group);
                    L.polyline(latlngs, { color: PRIMARY_COLOR, weight: 20, opacity: 0.2, className: 'blur-md animate-fade-in transition-opacity' }).addTo(group);

                    // Bugfix: Normalize SVG path length to prevent stroke-dasharray from breaking during map zoom
                    scheduleTimeout(() => {
                        if (routeLine && (routeLine as any)._path) {
                            const path = (routeLine as any)._path;
                            path.setAttribute('pathLength', '100');
                            path.style.strokeDasharray = '100';
                            path.style.strokeDashoffset = '100';
                            void path.getBoundingClientRect(); // force reflow
                            path.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards';
                            path.style.strokeDashoffset = '0';
                        }
                    }, 50);

                    setRouteEta('347 miles • 5h 45m');
                }, duration * 600);
                break;
            }
            case 6: {
                safeFlyTo([32.7767, -96.7970], 15, { duration, easeLinearity: 0.1 });
                scheduleTimeout(() => {
                    const path: [number, number][] = [
                        [32.7767, -96.7970], [32.7780, -96.7970],
                        [32.7780, -96.7940], [32.7810, -96.7940]
                    ];

                    L.polyline(path, { color: '#ffffff', weight: 4, opacity: 0.3, dashArray: '5, 10', className: 'animate-fade-in' }).addTo(group);

                    const carIcon = L.divIcon({
                        className: 'custom-icon',
                        html: `<div class="bg-[${PRIMARY_COLOR}] p-2 rounded-full shadow-[0_0_15px_${PRIMARY_COLOR}] text-white transform transition-transform animate-scale-in"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg></div>`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    });

                    const marker = L.marker(path[0], { icon: carIcon }).addTo(group);

                    let progress = 0;
                    let segment = 0;

                    vehicleIntervalRef.current = setInterval(() => {
                        if (segment >= path.length - 1) segment = 0;
                        const p1 = path[segment];
                        const p2 = path[segment + 1];

                        progress += 0.02;
                        if (progress >= 1) {
                            progress = 0;
                            segment++;
                        }

                        if (p1 && p2 && mapRef.current) {
                            const lat = p1[0] + (p2[0] - p1[0]) * progress;
                            const lng = p1[1] + (p2[1] - p1[1]) * progress;
                            marker.setLatLng([lat, lng]);

                            if (Math.random() > 0.9) {
                                setVehicleStatus({
                                    eta: `${Math.floor(4 + Math.random() * 2)} min`,
                                    dist: `${(1.2 - (segment * 0.3 + progress * 0.3)).toFixed(1)} mi`
                                });
                            }
                        }
                    }, 40);

                }, duration * 600);
                break;
            }
            case 7: {
                safeFlyTo([39.8, -98.5], 5, { duration, easeLinearity: 0.1 });
                scheduleTimeout(() => {
                    const chicagoBounds = [[41.9, -87.7], [41.9, -87.5], [41.7, -87.5], [41.7, -87.7]];
                    L.polygon(chicagoBounds as any, { color: '#EB5757', fillColor: '#EB5757', fillOpacity: 0.4, weight: 2, className: 'animate-fade-in' }).addTo(group);

                    const cities = [[34.05, -118.24], [40.71, -74.00], [29.76, -95.36], [47.60, -122.33], [25.76, -80.19]];
                    cities.forEach((city, i) => {
                        scheduleTimeout(() => {
                            L.circle(city as any, {
                                color: 'transparent', fillColor: '#F2C94C', fillOpacity: 0.6, radius: 100000 + Math.random() * 50000, className: 'mix-blend-screen animate-scale-in'
                            }).addTo(group);
                            L.circle(city as any, {
                                color: 'transparent', fillColor: '#EB5757', fillOpacity: 0.8, radius: 40000 + Math.random() * 30000, className: 'mix-blend-screen animate-scale-in'
                            }).addTo(group);
                        }, i * 150);
                    });
                }, duration * 600);
                break;
            }
        }

        return () => clearAllSchedules();
    }, [currentStep, leafletLoaded]);

    // Parallax Hover Handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!paneRef.current) return;
        const rect = paneRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        setMouseOffset({ x, y });
    };

    return (
        <div className="w-full flex items-center justify-center bg-transparent py-10 md:py-10 text-white font-sans selection:bg-[#2F80ED] selection:text-white">

            {/* Mobile Device Mockup Frame */}
            <div className="relative perspective-1000 group drop-shadow-[0_20px_50px_rgba(47,128,237,0.15)] hover:drop-shadow-[0_30px_60px_rgba(47,128,237,0.25)] transition-all duration-700">

                <div
                    ref={paneRef}
                    onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
                    onMouseMove={handleMouseMove}
                    className="relative w-[400px] sm:w-[500px] h-[650px] sm:h-[720px] rounded-[3rem] overflow-hidden bg-[#0a0a0a] border-[10px] border-[#1a1a1a] ring-1 ring-white/10 cursor-crosshair transform-gpu transition-transform ease-out"
                >
                    {/* Hardware Details (Notch & Status Bar Area) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-40 flex items-center justify-center gap-2">
                        <div className="w-12 h-1.5 bg-black/50 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-900/40 rounded-full border border-black/50"></div>
                    </div>

                    {/* Map Layer */}
                    <div
                        className="absolute -inset-4 transition-transform duration-500 ease-out z-0 pointer-events-none"
                        style={{
                            transform: `scale(1.05) translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
                            filter: 'brightness(0.85) contrast(1.1)'
                        }}
                    >
                        <div ref={mapContainerRef} className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    </div>

                    {/* Inner Shadow Gradient overlay to make borders look seamless */}
                    <div className="absolute inset-0 pointer-events-none z-[5] shadow-[inset_0_0_40px_rgba(10,10,10,1)]"></div>

                    {/* Scoped UI Overlays - Adjusted for Mobile Screen width */}
                    <div className="absolute inset-0 z-10 pointer-events-none">

                        {/* Search Bar Overlay */}
                        <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-[85%] transition-all duration-700 ease-out transform ${[2, 3].includes(currentStep) ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 scale-95'}`}>
                            <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl flex items-center gap-3 w-full shadow-2xl">
                                <Search className="text-[#888] w-4 h-4 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium tracking-wide truncate">{searchText}</span>
                                <span className="w-[1.5px] h-3.5 bg-[#2F80ED] animate-pulse ml-1 flex-shrink-0"></span>
                            </div>
                        </div>

                        {/* Reverse Geocoding Overlay */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] transition-all duration-700 ease-out ${currentStep === 4 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                            <div className="relative flex flex-col items-center">
                                <Crosshair className="text-[#2F80ED] w-8 h-8 mb-3 drop-shadow-[0_0_10px_#2F80ED] animate-pulse" />
                                <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-xl shadow-2xl text-center w-full">
                                    <div className="text-[10px] text-[#888] mb-1 font-mono uppercase tracking-widest">Decoded</div>
                                    <div className="text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{reverseAddress}</div>
                                </div>
                            </div>
                        </div>

                        {/* Routing Overlay */}
                        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] transition-all duration-700 ease-out transform ${currentStep === 5 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 scale-95'}`}>
                            <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4">
                                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <div className="w-[1.5px] h-6 bg-white/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-[#2F80ED] shadow-[0_0_10px_#2F80ED]"></div>
                                </div>
                                <div className="overflow-hidden">
                                    <div className="text-base sm:text-lg font-semibold leading-tight truncate">{routeEta || 'Calculating...'}</div>
                                    <div className="text-[10px] sm:text-xs text-[#888] flex items-center gap-1.5 mt-1">
                                        <Route className="w-3 h-3 flex-shrink-0" /> Fastest route
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Tracking Overlay */}
                        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] transition-all duration-700 ease-out transform ${currentStep === 6 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 scale-95'}`}>
                            <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-medium uppercase tracking-widest text-[#888]">Live Stream</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-[#888] text-[10px] mb-0.5">Driver ETA</div>
                                        <div className="text-xl sm:text-2xl font-bold leading-none">{vehicleStatus.eta}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#888] text-[10px] mb-0.5">Distance</div>
                                        <div className="text-sm font-medium leading-none">{vehicleStatus.dist}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GIS Overlay */}
                        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] transition-all duration-700 ease-out transform ${currentStep === 7 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 scale-95'}`}>
                            <div className="bg-[#111111]/95 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2">
                                <Layers className="text-[#EB5757] w-4 h-4 flex-shrink-0" />
                                <span className="text-xs font-medium text-white/90">Spatial Layering Active</span>
                            </div>
                        </div>

                    </div>

                    {/* Subtle Progress Bar mapped to phone bottom */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full z-20">
                        <div
                            className="h-full bg-[#2F80ED] transition-all ease-linear"
                            style={{
                                width: `${((currentStep + 1) / SCENES.length) * 100}%`,
                                transitionDuration: `${SCENE_DURATION}ms`
                            }}
                        />
                    </div>

                </div>

                {/* Home Indicator Line */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-50"></div>

            </div>

            {/* Global Styles for Map Elements & Custom Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .leaflet-container { background: transparent !important; }
        
        /* Smooth pop-in animations for markers */
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Routing Path Animation */
        .path-animation {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: dash 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes dash { 
          to { stroke-dashoffset: 0; } 
        }
      `}} />
        </div>
    );
}