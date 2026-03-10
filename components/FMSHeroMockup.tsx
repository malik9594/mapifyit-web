import React from 'react';

export default function FMSHeroMockup() {
    return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[32px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group bg-[#0A101F]">
            {/* Overlay to darken and tint the image slightly green - removed for new image */}
            {/* <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10 pointer-events-none"></div> */}

            {/* FMS Generated Islamabad Map Image */}
            <img
                src="/fms_islamabad.png"
                alt="Islamabad Fleet Tracking UI"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent z-20 pointer-events-none"></div>

            {/* Floating Stats Bar */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-[90%] md:w-auto bg-[#0A101F]/80 backdrop-blur-xl border border-white/10 p-4 md:px-8 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center px-4 md:px-8 border-r border-white/10">
                    <span className="text-emerald-400 font-bold text-xl md:text-3xl">248</span>
                    <span className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 text-center whitespace-nowrap">Active Units</span>
                </div>
                <div className="flex flex-col items-center px-4 md:px-8 border-r border-white/10">
                    <span className="text-emerald-400 font-bold text-xl md:text-3xl">1.2s</span>
                    <span className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 text-center whitespace-nowrap">Ping Latency</span>
                </div>
                <div className="flex flex-col items-center px-4 md:px-8">
                    <span className="text-white font-bold text-xl md:text-3xl">99.9%</span>
                    <span className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 text-center whitespace-nowrap">Uptime</span>
                </div>
            </div>

            {/* Decorative Map overlay lines */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
                    {/* Simulated Path */}
                    <path d="M 50 400 Q 200 350 300 250 T 600 150" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="10 10" className="opacity-50" />
                    <circle cx="600" cy="150" r="8" fill="#10b981" />
                    <circle cx="600" cy="150" r="16" stroke="#10b981" strokeWidth="2" fill="none" className="animate-ping" />
                </svg>
            </div>
        </div>
    );
}
