import React from 'react';

export default function IsometricMap() {
    return (
        <div className="mt-12 md:mt-20 relative mx-auto max-w-5xl h-[300px] sm:h-[400px] md:h-[450px] rounded-2xl md:rounded-3xl border border-white/10 bg-[#070B14]/60 backdrop-blur-xl overflow-hidden shadow-2xl group [perspective:2000px]">
            {/* Visual Map Engine Simulation */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none z-20" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[800px] h-[800px] isometric-grid relative transition-transform duration-1000 group-hover:rotate-x-[55deg] group-hover:scale-105 scale-[0.45] sm:scale-[0.7] md:scale-100">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:40px_40px] shadow-[inset_0_0_100px_rgba(3,6,13,1)]" />
                    <div className="absolute top-0 left-0 w-full h-[150px] scanner-beam z-10" />
                    <div className="absolute top-[20%] left-[20%] w-[120px] h-[160px] bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm" />
                    <div className="absolute top-[40%] left-[50%] w-[200px] h-[100px] bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm" />
                    <svg className="absolute inset-0 w-full h-full z-10 overflow-visible" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))' }}>
                        <path d="M 250 250 L 450 450 L 600 350" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="10 10" />
                        <path d="M 100 500 L 300 400 L 450 450" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" />
                    </svg>
                    <div className="absolute top-[250px] left-[250px] w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff] -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="absolute inset-0 rounded-full bg-blue-400 animate-[ping-slow_2s_infinite]" />
                    </div>
                    <div className="absolute top-[450px] left-[450px] w-5 h-5 bg-blue-400 rounded-full shadow-[0_0_20px_#3b82f6] -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-[ping-slow_2s_infinite_0.5s]" />
                    </div>
                </div>
            </div>

            {/* Telemetry Overlays */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex justify-between items-end z-30 pointer-events-none">
                <div className="bg-[#03060D]/80 border border-white/10 p-2 md:p-4 rounded-lg md:rounded-xl backdrop-blur-md animate-[float_4s_ease-in-out_infinite]">
                    <div className="text-[8px] md:text-xs text-slate-400 font-mono mb-1 text-center md:text-left">LAT / LNG</div>
                    <div className="text-[10px] md:text-sm text-blue-400 font-mono tracking-wider">34.0522° N, 118.2437° W</div>
                </div>
                <div className="bg-[#03060D]/80 border border-emerald-500/20 p-2 md:p-4 rounded-lg md:rounded-xl backdrop-blur-md flex items-center gap-2 md:gap-3 animate-[float_5s_ease-in-out_infinite_0.5s]">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                    <span className="text-white tracking-widest uppercase text-[8px] md:text-[10px] font-bold">Engine Online</span>
                </div>
            </div>
        </div>
    );
}
