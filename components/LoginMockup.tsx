"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search, Activity, Play, MapPin, Target, Globe, Smartphone, Zap, Clock, Navigation2,
    ShieldCheck, Cpu, Car, Bus, Bike, Footprints, Pause, RotateCcw, Plus, X, Sun, Moon, Radar, Power, User
} from 'lucide-react';

// --- TYPES & INTERFACES ---
interface City {
    id: string;
    name: string;
    x: number;
    y: number;
}

type TransportMode = 'car' | 'bus' | 'bike' | 'walk';
type RouteType = 'fastest' | 'scenic';

interface ModeConfig {
    id: TransportMode;
    label: string;
    icon: React.ElementType;
    speedMph: number;
    progressStep: number;
    color: string;
}

interface Scenario {
    waypoints: City[];
    type: RouteType;
    mode: TransportMode;
    theme: 'dark' | 'light';
}

interface Waypoint {
    query: string;
    city: City | null;
}

interface RouteSegment {
    start: City;
    end: City;
    control: { x: number; y: number };
    distance: number;
}

interface ActiveRoute {
    segments: RouteSegment[];
    totalDist: number;
    totalTimeHours: number;
    mode: TransportMode;
}

interface Telemetry {
    speed: number;
    distance: number;
    timeRemaining: number;
}

interface Camera {
    tx: number;
    ty: number;
    s: number;
}

// --- NATIVE MAPPING DATA ---
const CITIES: Record<string, City> = {
    SF: { id: 'SF', name: 'San Francisco, CA', x: 100, y: 250 },
    LA: { id: 'LA', name: 'Los Angeles, CA', x: 140, y: 340 },
    SEA: { id: 'SEA', name: 'Seattle, WA', x: 130, y: 80 },
    NY: { id: 'NY', name: 'New York, NY', x: 880, y: 200 },
    CHI: { id: 'CHI', name: 'Chicago, IL', x: 650, y: 220 },
    MIA: { id: 'MIA', name: 'Miami, FL', x: 820, y: 520 },
    TX: { id: 'TX', name: 'Dallas, TX', x: 500, y: 400 },
    DEN: { id: 'DEN', name: 'Denver, CO', x: 350, y: 280 },
    LV: { id: 'LV', name: 'Las Vegas, NV', x: 200, y: 290 },
    BOS: { id: 'BOS', name: 'Boston, MA', x: 920, y: 160 }
};

const MODE_CONFIG: Record<TransportMode, ModeConfig> = {
    car: { id: 'car', label: 'Driving', icon: Car, speedMph: 65, progressStep: 0.005, color: '#3b82f6' },
    bus: { id: 'bus', label: 'Transit', icon: Bus, speedMph: 45, progressStep: 0.0035, color: '#8b5cf6' },
    bike: { id: 'bike', label: 'Cycling', icon: Bike, speedMph: 15, progressStep: 0.0015, color: '#10b981' },
    walk: { id: 'walk', label: 'Walking', icon: Footprints, speedMph: 3, progressStep: 0.0005, color: '#f59e0b' }
};

const DEMO_SCENARIOS: Scenario[] = [
    { waypoints: [CITIES.SF, CITIES.DEN, CITIES.NY], type: 'fastest', mode: 'car', theme: 'dark' },
    { waypoints: [CITIES.LA, CITIES.LV, CITIES.SEA], type: 'scenic', mode: 'bus', theme: 'light' },
    { waypoints: [CITIES.MIA, CITIES.TX, CITIES.CHI], type: 'fastest', mode: 'car', theme: 'dark' },
    { waypoints: [CITIES.NY, CITIES.CHI, CITIES.SF], type: 'scenic', mode: 'bike', theme: 'light' },
    { waypoints: [CITIES.SEA, CITIES.DEN, CITIES.TX], type: 'fastest', mode: 'walk', theme: 'dark' }
];

const US_PATH = "M 130 50 L 250 40 L 400 60 L 600 50 L 750 100 L 850 80 L 920 120 L 900 250 L 850 300 L 850 400 L 800 550 L 750 500 L 650 450 L 550 480 L 400 450 L 300 350 L 200 400 L 150 350 Z";

const getBezierPoint = (p0: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }, t: number) => {
    const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
    const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
    return { x, y };
};

const formatTime = (hours: number): string => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    const d = Math.floor(hours / 24);
    const h = Math.floor(hours % 24);
    return d > 0 ? `${d}d ${h}h` : `${h}h ${Math.round((hours % 1) * 60)}m`;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function LoginMockup() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isAutoPilot, setIsAutoPilot] = useState<boolean>(true);

    const [waypoints, setWaypoints] = useState<Waypoint[]>([{ query: '', city: null }]);
    const [activeInputIdx, setActiveInputIdx] = useState<number | null>(null);
    const [searchResults, setSearchResults] = useState<City[]>([]);

    const [transportMode, setTransportMode] = useState<TransportMode>('car');
    const [activeRoute, setActiveRoute] = useState<ActiveRoute | null>(null);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
    const [gisScanActive, setGisScanActive] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [telemetry, setTelemetry] = useState<Telemetry>({ speed: 0, distance: 0, timeRemaining: 0 });
    const [camera, setCamera] = useState<Camera>({ tx: 0, ty: 0, s: 1 });

    const animationFrameRef = useRef<number | null>(null);
    const progressRef = useRef<number>(0);
    const isComponentMounted = useRef<boolean>(true);

    const disableAutoPilot = useCallback(() => {
        setIsAutoPilot(false);
        setWaypoints(prev => prev.length < 2 ? [...prev, { query: '', city: null }] : prev);
    }, []);

    const mapStyles = {
        bg: theme === 'dark' ? 'bg-[#030712] border-slate-800/50' : 'bg-slate-100 border-slate-300 shadow-inner',
        grid: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        fill: theme === 'dark' ? 'rgba(15, 23, 42, 0.6)' : '#cbd5e1',
        stroke: theme === 'dark' ? '#1e293b' : '#94a3b8',
        textMain: theme === 'dark' ? '#f8fafc' : '#0f172a',
        textSub: theme === 'dark' ? '#94a3b8' : '#64748b',
        glow: theme === 'dark' ? 'rgba(3,7,18,1)' : 'rgba(226,232,240,0.8)'
    };

    useEffect(() => {
        const validCities = waypoints.map(w => w.city).filter(Boolean) as City[];

        if (validCities.length === 1) {
            const city = validCities[0];
            // Bumped zoom for single point to 2.4x
            setCamera({ tx: 500 - (city.x * 2.4), ty: 240 - (city.y * 2.4), s: 2.4 });
        } else if (validCities.length > 1) {
            const xs = validCities.map(c => c.x);
            const ys = validCities.map(c => c.y);
            const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
            const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
            const maxDist = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));

            let s = 1.25; // Baseline scale from 1.0 to 1.25
            if (maxDist < 200) s = 2.2; // From 1.8 to 2.2
            else if (maxDist < 500) s = 1.6; // From 1.3 to 1.6

            setCamera({ tx: 500 - (cx * s), ty: 240 - (cy * s), s });
        } else {
            setCamera({ tx: 0, ty: 0, s: 1.15 }); // Idle map zoom from 1.0 to 1.15
        }
    }, [waypoints, activeRoute]);

    const generateRoute = useCallback((cities: City[], mode: TransportMode, autoStart = true) => {
        if (cities.length < 2) {
            setActiveRoute(null);
            return;
        }

        const segments: RouteSegment[] = [];
        let totalDist = 0;

        for (let i = 0; i < cities.length - 1; i++) {
            const start = cities[i];
            const end = cities[i + 1];
            const control = {
                x: (start.x + end.x) / 2,
                y: Math.min(start.y, end.y) - (80 + Math.random() * 50)
            };

            const pixelDist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
            const milesDist = Math.round(pixelDist * 3.5);

            segments.push({ start, end, control, distance: milesDist });
            totalDist += milesDist;
        }

        const totalTimeHours = totalDist / MODE_CONFIG[mode].speedMph;

        setActiveRoute({ segments, totalDist, totalTimeHours, mode });
        setProgress(0);
        progressRef.current = 0;

        if (autoStart) {
            setIsSimulating(true);
        }
    }, []);

    useEffect(() => {
        if (isAutoPilot) return;
        const validCities = waypoints.map(w => w.city).filter(Boolean) as City[];
        if (validCities.length >= 2) {
            generateRoute(validCities, transportMode, true);
        } else {
            setActiveRoute(null);
            setIsSimulating(false);
        }
    }, [waypoints, transportMode, isAutoPilot, generateRoute]);

    useEffect(() => {
        if (!isAutoPilot) return;
        isComponentMounted.current = true;

        const runContinuousLoop = async () => {
            let idx = 0;

            while (isComponentMounted.current && isAutoPilot) {
                const scenario = DEMO_SCENARIOS[idx % DEMO_SCENARIOS.length];

                setTheme(scenario.theme || 'dark');
                setWaypoints([{ query: '', city: null }]);
                setActiveRoute(null);
                setProgress(0);
                progressRef.current = 0;
                setTransportMode(scenario.mode);
                setTelemetry({ speed: 0, distance: 0, timeRemaining: 0 });
                setGisScanActive(false);

                await sleep(1000);
                if (!isComponentMounted.current || !isAutoPilot) break;

                const currentWps: City[] = [];

                for (let w = 0; w < scenario.waypoints.length; w++) {
                    if (!isComponentMounted.current || !isAutoPilot) break;

                    if (w > 0) {
                        setWaypoints(prev => [...prev, { query: '', city: null }]);
                        await sleep(400);
                    }

                    const targetCity = scenario.waypoints[w];

                    for (let i = 1; i <= targetCity.name.length; i++) {
                        if (!isComponentMounted.current || !isAutoPilot) break;
                        setWaypoints(prev => {
                            const updated = [...prev];
                            updated[w].query = targetCity.name.slice(0, i);
                            return updated;
                        });
                        await sleep(30 + Math.random() * 30);
                    }

                    if (!isComponentMounted.current || !isAutoPilot) break;

                    currentWps.push(targetCity);
                    setWaypoints(prev => {
                        const updated = [...prev];
                        updated[w].city = targetCity;
                        updated[w].query = targetCity.name;
                        return updated;
                    });

                    if (w === 0) {
                        await sleep(1000);
                    } else {
                        generateRoute(currentWps, scenario.mode, false);
                        await sleep(1000);
                    }
                }

                if (!isComponentMounted.current || !isAutoPilot) break;

                setIsSimulating(true);

                await new Promise<void>(resolve => {
                    const checkEnd = setInterval(() => {
                        if (progressRef.current >= 1 || !isComponentMounted.current || !isAutoPilot) {
                            clearInterval(checkEnd);
                            resolve();
                        }
                    }, 100);
                });

                setIsSimulating(false);

                if (isComponentMounted.current && isAutoPilot) {
                    setGisScanActive(true);
                    await sleep(3000);
                    setGisScanActive(false);
                }

                await sleep(1000);
                idx++;
            }
        };

        runContinuousLoop();

        return () => {
            isComponentMounted.current = false;
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isAutoPilot, generateRoute]);

    const animate = useCallback(() => {
        if (!activeRoute) return;

        const config = MODE_CONFIG[activeRoute.mode];

        setProgress((prev) => {
            const next = prev + config.progressStep;
            if (next >= 1) {
                progressRef.current = 1;
                return 1;
            }
            progressRef.current = next;

            const speedVariance = (Math.random() - 0.5) * (config.speedMph * 0.1);
            const currentSpeed = Math.max(0, config.speedMph + speedVariance);

            const distanceCovered = next * activeRoute.totalDist;
            const distanceRemaining = activeRoute.totalDist - distanceCovered;
            const timeRemaining = distanceRemaining / config.speedMph;

            setTelemetry({
                speed: currentSpeed,
                distance: Math.round(distanceCovered),
                timeRemaining
            });

            return next;
        });

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [activeRoute]);

    useEffect(() => {
        if (isSimulating) animationFrameRef.current = requestAnimationFrame(animate);
        else if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isSimulating, animate]);

    let agentPos = null;
    if (activeRoute && progress <= 1) {
        let targetDist = progress * activeRoute.totalDist;
        let accumulated = 0;

        for (let i = 0; i < activeRoute.segments.length; i++) {
            const seg = activeRoute.segments[i];
            if (targetDist <= accumulated + seg.distance || i === activeRoute.segments.length - 1) {
                const segProgress = Math.min(1, Math.max(0, (targetDist - accumulated) / seg.distance));
                agentPos = getBezierPoint(seg.start, seg.control, seg.end, segProgress);
                break;
            }
            accumulated += seg.distance;
        }
    }

    const handleWaypointChange = (idx: number, val: string) => {
        disableAutoPilot();
        const newWp = [...waypoints];
        newWp[idx].query = val;
        newWp[idx].city = null;
        setWaypoints(newWp);

        if (val.length < 1) {
            setSearchResults(Object.values(CITIES));
            return;
        }
        const filtered = Object.values(CITIES).filter(c => c.name.toLowerCase().includes(val.toLowerCase()));
        setSearchResults(filtered);
    };

    const removeWaypoint = (idx: number) => {
        disableAutoPilot();
        const newWp = waypoints.filter((_, i) => i !== idx);
        setWaypoints(newWp);
    };

    const selectCity = (city: City) => {
        if (activeInputIdx === null) return;
        const newWp = [...waypoints];
        newWp[activeInputIdx].city = city;
        newWp[activeInputIdx].query = city.name;
        setWaypoints(newWp);
        setActiveInputIdx(null);
        setSearchResults([]);
    };

    const addWaypoint = () => {
        if (waypoints.length >= 4) return;
        disableAutoPilot();
        setWaypoints(prev => [...prev, { query: '', city: null }]);
    };

    const ActiveIcon = activeRoute ? MODE_CONFIG[activeRoute.mode].icon : Car;

    return (
        <div className="flex items-center justify-center lg:justify-end w-full bg-transparent">
            {/* Ambient glow behind phone */}
            <div className="relative flex items-center justify-center w-full max-w-[400px]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-600/10 rounded-full blur-[60px] md:blur-[80px]" />
                </div>

                {/* ── Responsive Phone Frame ── */}
                {/* Reduced height to 640px/680px for better vertical balance */}
                <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] md:w-[340px] md:h-[680px] bg-[#0f172a] rounded-[2.5rem] md:rounded-[3rem] border-[8px] md:border-[12px] border-slate-900 shadow-2xl overflow-hidden ring-1 ring-white/10 shrink-0 transition-all duration-300">

                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
                        <div className="w-32 h-full rounded-b-3xl relative bg-slate-900">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-black rounded-full shadow-inner" />
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="relative w-full h-full flex flex-col pt-10">
                        <div className="px-4 pb-2 z-40 relative">
                            {/* Status Bar / Theme Toggle */}
                            <div className="flex items-center justify-between mb-3 px-1 mt-2">
                                <span className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 text-slate-400">
                                    <Navigation2 size={12} className={isAutoPilot ? "text-emerald-500" : "text-amber-500"} />
                                    {isAutoPilot ? 'Demo Sequence' : 'Route Planner'}
                                </span>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-1.5 rounded-full border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
                                >
                                    {theme === 'dark' ? <Sun size={10} /> : <Moon size={10} />}
                                </button>
                            </div>

                            {/* Waypoints Input Mockup */}
                            <div className="p-3 rounded-2xl border shadow-sm mb-3 bg-slate-900 border-slate-800">
                                {waypoints.map((wp, idx) => (
                                    <div key={idx} className="relative mb-2 last:mb-0 flex items-center gap-2">
                                        <div className="flex flex-col items-center justify-center w-4 relative">
                                            {idx === 0 ? <Target size={12} className="text-blue-500" /> :
                                                idx === waypoints.length - 1 ? <MapPin size={12} className="text-rose-500" /> :
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                                            {idx < waypoints.length - 1 && <div className="w-0.5 h-4 my-1 border-l border-dashed border-slate-800" />}
                                        </div>

                                        <input
                                            type="text"
                                            onFocus={() => { setActiveInputIdx(idx); disableAutoPilot(); setSearchResults(Object.values(CITIES)); }}
                                            onChange={(e) => handleWaypointChange(idx, e.target.value)}
                                            className={`flex-1 bg-transparent border-b py-1.5 text-xs focus:outline-none transition-colors border-slate-800 text-white placeholder:text-slate-600 ${activeInputIdx === idx ? 'border-blue-500' : ''}`}
                                            placeholder={idx === 0 ? "Start location..." : idx === waypoints.length - 1 && waypoints.length > 1 ? "End destination..." : "Add stop..."}
                                            value={wp.query}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Mode selector */}
                            <div className="flex gap-2 w-full px-1">
                                {(Object.keys(MODE_CONFIG) as TransportMode[]).map((modeId) => {
                                    const mode = MODE_CONFIG[modeId];
                                    const Icon = mode.icon;
                                    const isActive = transportMode === mode.id;
                                    return (
                                        <button
                                            key={mode.id}
                                            onClick={() => { disableAutoPilot(); setTransportMode(mode.id); }}
                                            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border transition-all ${isActive
                                                ? 'bg-slate-800 border-slate-600'
                                                : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'
                                                }`}
                                        >
                                            <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                                            <span className={`text-[8px] font-bold uppercase mt-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                                                {mode.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SVG Map Section */}
                        <div
                            className={`flex-1 relative overflow-hidden mt-2 rounded-[2rem] mx-2 border flex items-center justify-center cursor-crosshair transition-colors duration-700 ${mapStyles.bg}`}
                            onClick={() => { if (isAutoPilot) disableAutoPilot(); setActiveInputIdx(null); }}
                        >
                            <div className="absolute inset-0 pointer-events-none transition-colors duration-700"
                                style={{ backgroundImage: `linear-gradient(${mapStyles.grid} 1px, transparent 1px), linear-gradient(90deg, ${mapStyles.grid} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

                            <svg viewBox="0 0 1000 600" className="w-full h-full opacity-90" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={activeRoute ? MODE_CONFIG[activeRoute.mode].color : '#3b82f6'} />
                                        <stop offset="100%" stopColor={theme === 'dark' ? '#ffffff' : '#1e293b'} />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <g
                                    style={{
                                        transform: `translate(${camera.tx}px, ${camera.ty}px) scale(${camera.s})`,
                                        transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transformOrigin: '0 0'
                                    }}
                                >
                                    <path
                                        d={US_PATH}
                                        fill={mapStyles.fill}
                                        stroke={mapStyles.stroke}
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                        className="transition-colors duration-700"
                                    />

                                    {activeRoute && activeRoute.segments.map((seg, i) => (
                                        <g key={i}>
                                            <path
                                                d={`M ${seg.start.x} ${seg.start.y} Q ${seg.control.x} ${seg.control.y} ${seg.end.x} ${seg.end.y}`}
                                                fill="none"
                                                stroke={mapStyles.stroke}
                                                strokeWidth="4"
                                                strokeDasharray="6 6"
                                                className="route-establish-anim transition-colors duration-700"
                                            />
                                            <path
                                                d={`M ${seg.start.x} ${seg.start.y} Q ${seg.control.x} ${seg.control.y} ${seg.end.x} ${seg.end.y}`}
                                                fill="none"
                                                stroke="url(#routeGradient)"
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                                filter={theme === 'dark' ? "url(#glow)" : ""}
                                                pathLength="100"
                                                strokeDasharray="100"
                                                strokeDashoffset={
                                                    progress * activeRoute.totalDist < (activeRoute.segments.slice(0, i).reduce((a, b) => a + b.distance, 0)) ? 100 :
                                                        progress * activeRoute.totalDist > (activeRoute.segments.slice(0, i + 1).reduce((a, b) => a + b.distance, 0)) ? 0 :
                                                            100 - (((progress * activeRoute.totalDist) - (activeRoute.segments.slice(0, i).reduce((a, b) => a + b.distance, 0))) / seg.distance * 100)
                                                }
                                            />
                                        </g>
                                    ))}

                                    {/* GIS SCAN ANIMATION */}
                                    {gisScanActive && activeRoute && (
                                        <g transform={`translate(${activeRoute.segments[activeRoute.segments.length - 1].end.x}, ${activeRoute.segments[activeRoute.segments.length - 1].end.y})`}>
                                            <circle cx="0" cy="0" r="10" fill="none" stroke="#10b981" className="gis-ring-anim" />
                                            <circle cx="0" cy="0" r="10" fill="none" stroke="#10b981" strokeDasharray="4 4" className="gis-ring-anim" style={{ animationDelay: '0.4s' }} />

                                            {/* Analysis Lines */}
                                            {Object.values(CITIES)
                                                .filter(c => c.id !== activeRoute.segments[activeRoute.segments.length - 1].end.id &&
                                                    Math.abs(c.x - activeRoute.segments[activeRoute.segments.length - 1].end.x) < 350 &&
                                                    Math.abs(c.y - activeRoute.segments[activeRoute.segments.length - 1].end.y) < 350)
                                                .map((nearby, index) => (
                                                    <path
                                                        key={`gis-link-${nearby.id}`}
                                                        d={`M 0 0 L ${nearby.x - activeRoute.segments[activeRoute.segments.length - 1].end.x} ${nearby.y - activeRoute.segments[activeRoute.segments.length - 1].end.y}`}
                                                        fill="none"
                                                        stroke="#10b981"
                                                        strokeWidth="1.5"
                                                        strokeDasharray="4 4"
                                                        className="gis-node-line-anim"
                                                        style={{ animationDelay: `${index * 0.15}s` }}
                                                    />
                                                ))}
                                            <rect x="-35" y="-35" width="70" height="70" fill="none" stroke="#10b981" strokeWidth="1" className="gis-box-spin-anim" />
                                        </g>
                                    )}

                                    {/* City Nodes */}
                                    {Object.values(CITIES).map((city) => {
                                        const isValidWp = waypoints.find(w => w.city?.id === city.id);
                                        const isHighlighted = !!isValidWp;
                                        const fillC = isHighlighted ? (theme === 'dark' ? '#fff' : '#1e293b') : (theme === 'dark' ? '#334155' : '#cbd5e1');

                                        return (
                                            <g key={city.id} className="transition-transform duration-300">
                                                <circle
                                                    cx={city.x}
                                                    cy={city.y}
                                                    r={isHighlighted ? 6 : 4}
                                                    fill={fillC}
                                                    stroke={isHighlighted ? '#3b82f6' : mapStyles.stroke}
                                                    strokeWidth="2"
                                                />
                                                <text
                                                    x={city.x}
                                                    y={city.y + (city.y > 400 ? -12 : 18)}
                                                    fill={isHighlighted ? mapStyles.textMain : mapStyles.textSub}
                                                    fontSize={isHighlighted ? "16" : "12"}
                                                    fontWeight={isHighlighted ? "bold" : "normal"}
                                                    textAnchor="middle"
                                                    className="pointer-events-none drop-shadow-md"
                                                >
                                                    {city.name.split(',')[0]}
                                                </text>
                                            </g>
                                        )
                                    })}

                                    {activeRoute && agentPos && !gisScanActive && (
                                        <g transform={`translate(${agentPos.x}, ${agentPos.y})`}>
                                            <circle r="18" fill="rgba(59, 130, 246, 0.2)" className="animate-pulse" />
                                            <circle r="10" fill={theme === 'dark' ? '#fff' : '#1e293b'} filter={theme === 'dark' ? "url(#glow)" : ""} />
                                            <circle r="5" fill={MODE_CONFIG[activeRoute.mode].color} />
                                        </g>
                                    )}
                                </g>
                            </svg>

                            <div className="absolute inset-0 pointer-events-none transition-shadow duration-700" style={{ boxShadow: `inset 0 0 50px ${mapStyles.glow}` }} />
                        </div>

                        {/* Telemetry HUD */}
                        <div className={`p-4 transition-all duration-500 ease-out z-20 ${activeRoute ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className={`rounded-3xl p-5 shadow-2xl relative overflow-hidden border transition-colors ${gisScanActive ? 'bg-emerald-950 border-emerald-900' : 'bg-slate-900 border-slate-800'}`}>
                                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${gisScanActive ? 'from-emerald-500/10' : 'from-white/5'} to-transparent pointer-events-none`} />

                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        {gisScanActive ? (
                                            <Radar size={16} className="text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
                                        ) : (
                                            <ActiveIcon size={16} style={{ color: activeRoute ? MODE_CONFIG[activeRoute.mode].color : '#3b82f6' }} />
                                        )}
                                        <h3 className={`text-[10px] font-bold uppercase tracking-widest ${gisScanActive ? 'text-emerald-400' : 'text-white'}`}>
                                            {gisScanActive ? 'GIS Network Scan Active' : (activeRoute ? MODE_CONFIG[activeRoute.mode].label + ' Telemetry' : 'System Telemetry')}
                                        </h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className={`p-3 rounded-2xl border transition-colors ${gisScanActive ? 'bg-emerald-950/80 border-emerald-800' : 'bg-slate-950/50 border-slate-800'}`}>
                                        <p className={`text-[8px] uppercase font-bold tracking-wider mb-0.5 ${gisScanActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            {gisScanActive ? 'Nodes Found' : 'Velocity'}
                                        </p>
                                        <p className={`text-xl font-mono font-bold ${gisScanActive ? 'text-emerald-400' : 'text-blue-500'}`}>
                                            {gisScanActive ? Math.floor(Math.random() * 8) + 3 : telemetry.speed.toFixed(0)}
                                            <span className={`text-[10px] ml-1 ${gisScanActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                {gisScanActive ? 'NODES' : (activeRoute?.mode === 'walk' || activeRoute?.mode === 'bike' ? 'MPH' : 'KTS')}
                                            </span>
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-2xl border transition-colors ${gisScanActive ? 'bg-emerald-950/80 border-emerald-800' : 'bg-slate-950/50 border-slate-800'}`}>
                                        <p className={`text-[8px] uppercase font-bold tracking-wider mb-0.5 ${gisScanActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            {gisScanActive ? 'Scan Radius' : 'Dist / Time'}
                                        </p>
                                        <p className={`text-sm font-mono font-bold ${gisScanActive ? 'text-emerald-400' : 'text-white'}`}>
                                            {gisScanActive ? '350' : telemetry.distance} <span className={`text-[9px] ${gisScanActive ? 'text-emerald-600' : 'text-slate-400'}`}>MI</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className={`flex justify-between text-[9px] font-bold tracking-widest uppercase px-1 ${gisScanActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        <span>{gisScanActive ? 'Scan Progress' : 'Progress'}</span>
                                        <span className={`font-mono ${gisScanActive ? 'text-emerald-400' : 'text-blue-500'}`}>
                                            {gisScanActive ? '100%' : (progress * 100).toFixed(0) + '%'}
                                        </span>
                                    </div>
                                    <div className={`w-full h-1.5 rounded-full overflow-hidden border ${gisScanActive ? 'bg-emerald-950 border-emerald-800' : 'bg-slate-950 border-slate-800'}`}>
                                        <div
                                            className={`h-full rounded-full transition-all duration-75 relative ${gisScanActive ? 'bg-emerald-500 w-full' : ''}`}
                                            style={!gisScanActive ? {
                                                width: `${progress * 100}%`,
                                                backgroundColor: activeRoute ? MODE_CONFIG[activeRoute.mode].color : '#3b82f6'
                                            } : {}}
                                        >
                                            <div className={`absolute inset-0 bg-[length:10px_10px] animate-[slide_1s_linear_infinite] ${gisScanActive ? 'bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent_100%)]' : 'bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent_100%)]'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slide {
          from { background-position: 0 0; }
          to { background-position: 10px 0; }
        }
        @keyframes drawRouteDash {
          from { stroke-dasharray: 50 1000; stroke-dashoffset: 1050; opacity: 0; }
          to { stroke-dasharray: 6 6; stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes gisScaleFade {
          0% { transform: scale(0.2); opacity: 0.8; stroke-width: 3px; }
          100% { transform: scale(15); opacity: 0; stroke-width: 0.5px; }
        }
        @keyframes gisNodeDraw {
          0% { stroke-dasharray: 0 500; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dasharray: 400 500; opacity: 0.2; }
        }
        @keyframes gisBoxSpin {
          0% { transform: rotate(0deg) scale(0.5); opacity: 0; }
          20% { transform: rotate(90deg) scale(1.2); opacity: 1; }
          80% { transform: rotate(180deg) scale(1); opacity: 1; }
          100% { transform: rotate(270deg) scale(0.5); opacity: 0; }
        }

        .route-establish-anim {
          animation: drawRouteDash 1s ease-out forwards;
        }
        .gis-ring-anim {
          animation: gisScaleFade 2s ease-out infinite;
          transform-origin: 0 0;
        }
        .gis-node-line-anim {
          animation: gisNodeDraw 2.5s ease-out forwards;
        }
        .gis-box-spin-anim {
          animation: gisBoxSpin 2.5s ease-in-out forwards;
          transform-origin: 0 0;
        }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
      `}</style>
        </div>
    );
}