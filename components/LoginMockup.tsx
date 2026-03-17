"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Play, MapPin, Target, Globe, Car, Bus, Bike,
    Footprints, Pause, RotateCcw, User, Power, Clock
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface City {
    id: string;
    name: string;
    x: number;
    y: number;
}

interface ModeConfig {
    id: string;
    label: string;
    icon: React.ElementType;
    baseSpeed: number;
    progressStep: number;
    color: string;
}

interface Route {
    start: City;
    end: City;
    control: { x: number; y: number };
    type: string;
    mode: string;
    totalDist: number;
}

interface Scenario {
    start: City;
    end: City;
    type: string;
    mode: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CITIES: Record<string, City> = {
    SF: { id: 'SF', name: 'San Francisco, CA', x: 100, y: 250 },
    LA: { id: 'LA', name: 'Los Angeles, CA', x: 140, y: 340 },
    SEA: { id: 'SEA', name: 'Seattle, WA', x: 130, y: 80 },
    NY: { id: 'NY', name: 'New York, NY', x: 880, y: 200 },
    CHI: { id: 'CHI', name: 'Chicago, IL', x: 650, y: 220 },
    MIA: { id: 'MIA', name: 'Miami, FL', x: 820, y: 520 },
    TX: { id: 'TX', name: 'Dallas, TX', x: 500, y: 400 },
    DEN: { id: 'DEN', name: 'Denver, CO', x: 350, y: 280 },
};

const MODE_CONFIG: Record<string, ModeConfig> = {
    car: { id: 'car', label: 'Driving', icon: Car, baseSpeed: 65, progressStep: 0.005, color: '#3b82f6' },
    bus: { id: 'bus', label: 'Transit', icon: Bus, baseSpeed: 45, progressStep: 0.0035, color: '#8b5cf6' },
    bike: { id: 'bike', label: 'Cycling', icon: Bike, baseSpeed: 15, progressStep: 0.002, color: '#10b981' },
    walk: { id: 'walk', label: 'Walking', icon: Footprints, baseSpeed: 3, progressStep: 0.001, color: '#f59e0b' },
};

const DEMO_SCENARIOS: Scenario[] = [
    { start: CITIES.SF, end: CITIES.LA, type: 'fastest', mode: 'car' },
    { start: CITIES.NY, end: CITIES.CHI, type: 'scenic', mode: 'bus' },
    { start: CITIES.DEN, end: CITIES.SF, type: 'scenic', mode: 'bike' },
    { start: CITIES.CHI, end: CITIES.MIA, type: 'fastest', mode: 'car' },
    { start: CITIES.SEA, end: CITIES.LA, type: 'scenic', mode: 'walk' },
    { start: CITIES.TX, end: CITIES.DEN, type: 'fastest', mode: 'bus' },
    { start: CITIES.NY, end: CITIES.MIA, type: 'fastest', mode: 'car' },
    { start: CITIES.SF, end: CITIES.TX, type: 'scenic', mode: 'bike' },
    { start: CITIES.LA, end: CITIES.CHI, type: 'fastest', mode: 'bus' },
    { start: CITIES.MIA, end: CITIES.TX, type: 'fastest', mode: 'walk' },
];

const US_PATH =
    'M 130 50 L 250 40 L 400 60 L 600 50 L 750 100 L 850 80 L 920 120 L 900 250 L 850 300 L 850 400 L 800 550 L 750 500 L 650 450 L 550 480 L 400 450 L 300 350 L 200 400 L 150 350 Z';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getBezierPoint = (
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    t: number
) => ({
    x: Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x,
    y: Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y,
});

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

// ─── Component ───────────────────────────────────────────────────────────────

export default function MobileMapMockup() {
    const [isAutoPilot, setIsAutoPilot] = useState(true);
    const [startQuery, setStartQuery] = useState('');
    const [endQuery, setEndQuery] = useState('');
    const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
    const [searchResults, setSearchResults] = useState<City[]>([]);
    const [startCity, setStartCity] = useState<City | null>(null);
    const [endCity, setEndCity] = useState<City | null>(null);
    const [transportMode, setTransportMode] = useState('car');
    const [activeRoute, setActiveRoute] = useState<Route | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [telemetry, setTelemetry] = useState({ speed: 0, distance: 0 });
    const [camera, setCamera] = useState({ tx: 0, ty: 0, s: 1 });

    const animationFrameRef = useRef<number>(0);
    const progressRef = useRef(0);
    const isMounted = useRef(true);

    // ── Camera tracking ────────────────────────────────────────────────────────
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (!activeRoute) { setCamera({ tx: 0, ty: 0, s: 1 }); return; }
        const cx = (activeRoute.start.x + activeRoute.end.x) / 2;
        const cy = (activeRoute.start.y + activeRoute.end.y) / 2;
        const dx = Math.abs(activeRoute.end.x - activeRoute.start.x);
        const s = dx < 300 ? 1.6 : dx < 500 ? 1.25 : 1.0;
        setCamera({ tx: 500 - cx * s, ty: 240 - cy * s, s });
    }, [activeRoute]);

    // ── Generate route helper ────────────────────────────────────────────────
    const generateRoute = useCallback((start: City, end: City, type = 'fastest', mode = 'car') => {
        const control = {
            x: (start.x + end.x) / 2,
            y: type === 'scenic'
                ? Math.min(start.y, end.y) - 200
                : (start.y + end.y) / 2 - 50,
        };
        const dist = Math.hypot(end.x - start.x, end.y - start.y);
        setActiveRoute({ start, end, control, type, mode, totalDist: Math.round(dist * 3.5) });
    }, []);

    // ── Auto-pilot demo loop ────────────────────────────────────────────────
    useEffect(() => {
        if (!isAutoPilot) return;
        isMounted.current = true;

        const run = async () => {
            let idx = 0;
            while (isMounted.current && isAutoPilot) {
                const s = DEMO_SCENARIOS[idx % DEMO_SCENARIOS.length];

                setStartQuery(''); setEndQuery('');
                setStartCity(null); setEndCity(null);
                setActiveRoute(null); setProgress(0);
                progressRef.current = 0;
                setTransportMode(s.mode);
                setTelemetry({ speed: 0, distance: 0 });

                await sleep(900);
                if (!isMounted.current || !isAutoPilot) break;

                for (let i = 1; i <= s.start.name.length; i++) {
                    if (!isMounted.current || !isAutoPilot) break;
                    setStartQuery(s.start.name.slice(0, i));
                    await sleep(40 + Math.random() * 40);
                }
                setStartCity(s.start);

                await sleep(400);
                if (!isMounted.current || !isAutoPilot) break;

                for (let i = 1; i <= s.end.name.length; i++) {
                    if (!isMounted.current || !isAutoPilot) break;
                    setEndQuery(s.end.name.slice(0, i));
                    await sleep(40 + Math.random() * 40);
                }
                setEndCity(s.end);

                await sleep(600);
                if (!isMounted.current || !isAutoPilot) break;

                generateRoute(s.start, s.end, s.type, s.mode);

                await sleep(800);
                if (!isMounted.current || !isAutoPilot) break;

                setIsSimulating(true);
                await new Promise<void>(resolve => {
                    const iv = setInterval(() => {
                        if (progressRef.current >= 1 || !isMounted.current || !isAutoPilot) {
                            clearInterval(iv);
                            resolve();
                        }
                    }, 100);
                });

                setIsSimulating(false);
                await sleep(2500);
                idx++;
            }
        };

        run();
        return () => {
            isMounted.current = false;
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isAutoPilot, generateRoute]);

    // ── Manual routing trigger ──────────────────────────────────────────────
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (!isAutoPilot && startCity && endCity) {
            generateRoute(startCity, endCity, 'fastest', transportMode);
            setProgress(0);
            progressRef.current = 0;
            setIsSimulating(true);
        }
    }, [startCity, endCity, transportMode, isAutoPilot, generateRoute]);

    // ── Animation frame ────────────────────────────────────────────────────
    const activeRouteRef = useRef<Route | null>(null);
    useEffect(() => { activeRouteRef.current = activeRoute; }, [activeRoute]);

    useEffect(() => {
        if (!isSimulating) {
            cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        const tick = () => {
            const route = activeRouteRef.current;
            if (!route) return;
            const cfg = MODE_CONFIG[route.mode];

            setProgress(prev => {
                const next = prev + cfg.progressStep;
                if (next >= 1) { progressRef.current = 1; return 1; }
                progressRef.current = next;
                const jitter = (Math.random() - 0.5) * cfg.baseSpeed * 0.1;
                setTelemetry({
                    speed: Math.max(0, cfg.baseSpeed + jitter),
                    distance: Math.round(next * route.totalDist),
                });
                return next;
            });

            animationFrameRef.current = requestAnimationFrame(tick);
        };

        animationFrameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [isSimulating]);

    // ── Search handlers ───────────────────────────────────────────────────
    const handleInputFocus = (type: 'start' | 'end') => {
        setIsAutoPilot(false);
        setActiveInput(type);
        setSearchResults(Object.values(CITIES));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
        const val = e.target.value;
        if (type === 'start') setStartQuery(val);
        else setEndQuery(val);
        const q = val.toLowerCase();
        setSearchResults(
            q.length < 1
                ? Object.values(CITIES)
                : Object.values(CITIES).filter(c => c.name.toLowerCase().includes(q))
        );
    };

    const selectCity = (city: City) => {
        if (activeInput === 'start') { setStartCity(city); setStartQuery(city.name); }
        else { setEndCity(city); setEndQuery(city.name); }
        setActiveInput(null);
        setSearchResults([]);
    };

    // ── Derived ─────────────────────────────────────────────────────────────
    const agentPos = activeRoute
        ? getBezierPoint(activeRoute.start, activeRoute.control, activeRoute.end, progress)
        : null;
    const ActiveIcon = activeRoute ? MODE_CONFIG[activeRoute.mode].icon : Car;

    return (
        <div className="flex items-center justify-center w-full py-4 bg-transparent lg:py-10">
            {/* Ambient glow behind phone */}
            <div className="relative flex items-center justify-center w-full">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] bg-blue-600/10 rounded-full blur-[60px] md:blur-[90px]" />
                </div>

                {/* ── Responsive Phone Frame ── */}
                <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] md:w-[340px] md:h-[700px] lg:w-[360px] lg:h-[720px] bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] border-[8px] md:border-[12px] border-slate-900 shadow-2xl overflow-hidden ring-1 ring-white/10 shrink-0 transition-all duration-300">

                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
                        <div className="w-32 h-full bg-slate-900 rounded-b-3xl relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-black rounded-full shadow-inner" />
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="relative w-full h-full flex flex-col pt-10">

                        {/* ── Header / Search ─── */}
                        <div className="px-4 pb-2 z-40 relative">
                            {/* Status bar */}
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase flex items-center gap-1">
                                    <Globe size={12} className={isAutoPilot ? 'text-emerald-500' : 'text-amber-500'} />
                                    {isAutoPilot ? 'Demo Sequence' : 'Manual Route'}
                                </span>
                                {isAutoPilot && (
                                    <button
                                        onClick={() => setIsAutoPilot(false)}
                                        className="flex items-center gap-1 text-[9px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 font-bold uppercase transition-colors"
                                    >
                                        <Power size={10} /> Take Control
                                    </button>
                                )}
                            </div>

                            {/* Start input */}
                            <div className="relative mb-2">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <User size={14} className="text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value={startQuery}
                                    onFocus={() => handleInputFocus('start')}
                                    onChange={e => handleSearchChange(e, 'start')}
                                    placeholder="Starting Location..."
                                    className={`w-full bg-slate-900 border ${activeInput === 'start' ? 'border-blue-500' : 'border-slate-800'} rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none text-white placeholder:text-slate-600 shadow-lg transition-colors`}
                                />
                            </div>

                            {/* End input */}
                            <div className="relative mb-3">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <MapPin size={14} className="text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value={endQuery}
                                    onFocus={() => handleInputFocus('end')}
                                    onChange={e => handleSearchChange(e, 'end')}
                                    placeholder="Destination..."
                                    className={`w-full bg-slate-900 border ${activeInput === 'end' ? 'border-blue-500' : 'border-slate-800'} rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none text-white placeholder:text-slate-600 shadow-lg transition-colors`}
                                />
                                {/* Search dropdown */}
                                {activeInput && searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-50 max-h-48 overflow-y-auto">
                                        {searchResults.map((c, i) => (
                                            <button
                                                key={i}
                                                onClick={() => selectCity(c)}
                                                className="w-full text-left px-4 py-3 text-xs border-b border-slate-700/50 last:border-0 flex items-center gap-3 bg-slate-800 hover:bg-slate-700 transition-colors"
                                            >
                                                <Target size={14} className="text-blue-400" />
                                                <span className="font-medium text-slate-200">{c.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mode selector */}
                            <div className="flex gap-2 w-full">
                                {Object.values(MODE_CONFIG).map(mode => {
                                    const Icon = mode.icon;
                                    const isActive = transportMode === mode.id;
                                    return (
                                        <button
                                            key={mode.id}
                                            onClick={() => { setIsAutoPilot(false); setTransportMode(mode.id); }}
                                            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border transition-all ${isActive
                                                ? 'bg-slate-800 border-slate-600 shadow-inner'
                                                : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'
                                                }`}
                                        >
                                            <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                                            <span className={`text-[8px] font-bold uppercase mt-1 ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                                                {mode.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── SVG Map ─── */}
                        <div
                            className="flex-1 relative overflow-hidden mt-1 bg-[#030712] rounded-[2rem] mx-2 border border-slate-800/50 flex items-center justify-center cursor-crosshair"
                            onClick={() => { if (isAutoPilot) setIsAutoPilot(false); setActiveInput(null); }}
                        >
                            {/* Dot grid */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                            <svg viewBox="0 0 1000 600" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={activeRoute ? MODE_CONFIG[activeRoute.mode].color : '#3b82f6'} />
                                        <stop offset="100%" stopColor="#ffffff" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <g style={{
                                    transform: `translate(${camera.tx}px,${camera.ty}px) scale(${camera.s})`,
                                    transition: 'transform 1.5s cubic-bezier(0.4,0,0.2,1)',
                                    transformOrigin: '0 0',
                                }}>
                                    {/* US Outline */}
                                    <path d={US_PATH} fill="rgba(15,23,42,0.5)" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />

                                    {/* Dashed route underlay */}
                                    {activeRoute && (
                                        <path
                                            d={`M ${activeRoute.start.x} ${activeRoute.start.y} Q ${activeRoute.control.x} ${activeRoute.control.y} ${activeRoute.end.x} ${activeRoute.end.y}`}
                                            fill="none" stroke="#1e293b" strokeWidth="4" strokeDasharray="6 6"
                                            className="route-establish-anim"
                                        />
                                    )}

                                    {/* Animated progress line */}
                                    {activeRoute && (
                                        <path
                                            d={`M ${activeRoute.start.x} ${activeRoute.start.y} Q ${activeRoute.control.x} ${activeRoute.control.y} ${activeRoute.end.x} ${activeRoute.end.y}`}
                                            fill="none" stroke="url(#routeGrad)" strokeWidth="5" strokeLinecap="round"
                                            filter="url(#glow)" pathLength="100"
                                            strokeDasharray="100" strokeDashoffset={100 - progress * 100}
                                            className="transition-all duration-75"
                                        />
                                    )}

                                    {/* City nodes */}
                                    {Object.values(CITIES).map(city => {
                                        const isStart = activeRoute?.start.id === city.id;
                                        const isEnd = activeRoute?.end.id === city.id;
                                        const highlighted = isStart || isEnd;
                                        return (
                                            <g key={city.id}>
                                                {highlighted && (
                                                    <circle cx={city.x} cy={city.y} r="20"
                                                        fill={isStart ? '#10b981' : '#3b82f6'}
                                                        opacity="0.3" className="animate-ping" />
                                                )}
                                                <circle
                                                    cx={city.x} cy={city.y} r={highlighted ? 8 : 4}
                                                    fill={highlighted ? '#fff' : '#334155'}
                                                    stroke={isStart ? '#10b981' : isEnd ? '#3b82f6' : '#0f172a'}
                                                    strokeWidth="3"
                                                />
                                                <text
                                                    x={city.x} y={city.y + (city.y > 400 ? -15 : 20)}
                                                    fill={highlighted ? '#f8fafc' : '#475569'}
                                                    fontSize="18" fontWeight="bold" textAnchor="middle"
                                                    className="pointer-events-none"
                                                >
                                                    {city.name.split(',')[0]}
                                                </text>
                                            </g>
                                        );
                                    })}

                                    {/* Moving agent */}
                                    {agentPos && activeRoute && (
                                        <g transform={`translate(${agentPos.x},${agentPos.y})`}>
                                            <circle r="18" fill="rgba(255,255,255,0.2)" className="animate-pulse" />
                                            <circle r="10" fill="#fff" filter="url(#glow)" />
                                            <circle r="6" fill={MODE_CONFIG[activeRoute.mode].color} />
                                        </g>
                                    )}
                                </g>
                            </svg>

                            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(3,7,18,1)] pointer-events-none" />
                        </div>

                        {/* ── Telemetry HUD ─── */}
                        <div className={`p-4 transition-all duration-500 ease-out z-20 ${activeRoute ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 md:p-5 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                                {/* Header row */}
                                <div className="flex items-center justify-between mb-3 md:mb-5">
                                    <div className="flex items-center gap-2">
                                        <ActiveIcon size={16} style={{ color: activeRoute ? MODE_CONFIG[activeRoute.mode].color : '#3b82f6' }} />
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                            {activeRoute ? MODE_CONFIG[activeRoute.mode].label : 'Telemetry'}
                                        </h3>
                                    </div>
                                    {!isAutoPilot && (
                                        <div className="flex gap-2">
                                            {!isSimulating ? (
                                                <button onClick={() => setIsSimulating(true)} className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg">
                                                    <Play size={12} fill="white" />
                                                </button>
                                            ) : (
                                                <button onClick={() => setIsSimulating(false)} className="p-1.5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                                                    <Pause size={12} fill="white" />
                                                </button>
                                            )}
                                            <button onClick={() => { setProgress(0); progressRef.current = 0; }} className="p-1.5 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                                                <RotateCcw size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-3 mb-3 md:mb-5">
                                    <div className="bg-slate-950/50 p-2 md:p-3 rounded-2xl border border-slate-800">
                                        <p className="text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Velocity</p>
                                        <p className="text-base md:text-xl font-mono font-bold text-emerald-400">
                                            {telemetry.speed.toFixed(0)}<span className="text-[10px] text-slate-600 ml-1">{activeRoute?.mode === 'walk' ? 'MPH' : 'KTS'}</span>
                                        </p>
                                    </div>
                                    <div className="bg-slate-950/50 p-2 md:p-3 rounded-2xl border border-slate-800">
                                        <p className="text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Distance</p>
                                        <p className="text-base md:text-xl font-mono font-bold text-white">
                                            {telemetry.distance}<span className="text-[10px] text-slate-600 ml-1">NM</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold text-slate-400 tracking-widest uppercase px-1">
                                        <span>Progress</span>
                                        <span className="text-blue-400 font-mono">{(progress * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                        <div
                                            className="h-full rounded-full transition-all duration-75 relative"
                                            style={{
                                                width: `${progress * 100}%`,
                                                backgroundColor: activeRoute ? MODE_CONFIG[activeRoute.mode].color : '#3b82f6',
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%)] bg-[length:10px_10px] animate-[slide_1s_linear_infinite]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between px-1">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Clock size={10} className="text-amber-500" />
                                        <span className="text-[9px] font-mono">
                                            {activeRoute?.mode === 'walk' ? 'ETA 15 Days' : 'ETA 04:22 UTC'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                                        <MapPin size={9} /> {activeRoute?.end?.id ?? 'DST'} Bound
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
                    to   { background-position: 10px 0; }
                }
                @keyframes drawRouteDash {
                    from { stroke-dasharray: 50 1000; stroke-dashoffset: 1050; opacity: 0; }
                    to   { stroke-dasharray: 6 6; stroke-dashoffset: 0; opacity: 1; }
                }
                .route-establish-anim { animation: drawRouteDash 1s ease-out forwards; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
            `}</style>
        </div>
    );
}