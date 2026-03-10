import React from 'react';

export default function GISVisualEngine() {
    return (
        <div className="relative w-full h-full bg-[#050810] overflow-hidden flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* SVG Content */}
            <svg viewBox="0 0 400 400" className="w-[85%] h-[85%] relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <defs>
                    <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                        <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Topographic Lines (Simulated DEM) */}
                <g className="opacity-40" stroke="#22d3ee" strokeWidth="0.5" fill="none">
                    <path d="M 50 200 Q 100 150 150 200 T 250 200 T 350 200" className="animate-[pulse_4s_infinite]" />
                    <path d="M 50 230 Q 100 180 150 230 T 250 230 T 350 230" className="animate-[pulse_4s_infinite_0.5s]" />
                    <path d="M 50 170 Q 100 120 150 170 T 250 170 T 350 170" className="animate-[pulse_4s_infinite_1s]" />
                    <path d="M 80 100 Q 150 50 220 100 T 360 100" className="opacity-20" />
                    <path d="M 40 300 Q 120 250 200 300 T 360 300" className="opacity-20" />
                </g>

                {/* LiDAR Points / Data Mesh */}
                <g fill="#3b82f6" filter="url(#glow)">
                    {[...Array(12)].map((_, i) => (
                        <circle
                            key={i}
                            cx={100 + (i % 4) * 60 + Math.random() * 20}
                            cy={100 + Math.floor(i / 4) * 80 + Math.random() * 20}
                            r="2"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Connecting Lines */}
                <g stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-30">
                    <line x1="120" y1="120" x2="180" y2="200" />
                    <line x1="180" y1="200" x2="300" y2="150" />
                    <line x1="300" y1="150" x2="240" y2="280" />
                </g>

                {/* Satellite Radar Sweep */}
                <g>
                    <circle cx="200" cy="200" r="140" stroke="#22d3ee" strokeWidth="1" fill="none" className="opacity-10" />
                    <line
                        x1="200" y1="200"
                        x2="200" y2="60"
                        stroke="#22d3ee"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="origin-center animate-[spin_6s_linear_infinite]"
                        style={{ filter: 'drop-shadow(0 0 5px #22d3ee)' }}
                    />
                    <path
                        d="M 200 60 A 140 140 0 0 1 320 130"
                        fill="none"
                        stroke="url(#scanGradient)"
                        strokeWidth="40"
                        className="origin-center animate-[spin_6s_linear_infinite]"
                    />
                </g>

                {/* Active Data Nodes */}
                <g>
                    <circle cx="200" cy="200" r="5" fill="#22d3ee" className="animate-ping" />
                    <circle cx="200" cy="200" r="3" fill="#22d3ee" />
                </g>
            </svg>

            {/* Scanning Horizontal Line Overlay */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan-y_8s_linear_infinite] z-20" />

            {/* Telemetry Readouts (Faked) */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-cyan-400 space-y-1 opacity-70">
                <div className="flex gap-2"><span>LAT: 33.6844</span> <span>LNG: 73.0479</span></div>
                <div className="w-24 h-1 bg-cyan-900 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 animate-[progress_3s_ease-in-out_infinite]" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan-y {
                    0% { top: 0%; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes progress {
                    0% { width: 0%; }
                    50% { width: 80%; }
                    100% { width: 0%; }
                }
            `}} />
        </div>
    );
}
