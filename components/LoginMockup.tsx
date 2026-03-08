"use client"
import React, { useState, useEffect } from 'react';

export default function LoginMockup() {
    const [step, setStep] = useState('loading'); // 'loading', 'scanning', 'success'

    // Simple timer to demo the animation sequence
    useEffect(() => {
        const timer1 = setTimeout(() => setStep('scanning'), 2000);
        const timer2 = setTimeout(() => setStep('success'), 4500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    return (
        <div className="relative w-[260px] md:w-[300px] h-[520px] md:h-[600px] rounded-[48px] md:rounded-[56px] mx-auto mt-4 shrink-0 bg-[#0B0F24] shadow-2xl overflow-hidden p-[2px] group/mockup">
            {/* Border Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#3B82F6_50%,transparent_60%,transparent_100%)] animate-[border-rotate_4s_linear_infinite] opacity-30" />

            <div className="relative w-full h-full border-[6px] border-[#252838] rounded-[46px] md:rounded-[54px] bg-[#020517] overflow-hidden flex flex-col pt-1">

                {/* --- eKYC Scanning Line --- */}
                {step !== 'success' && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2BC9EE] to-transparent z-50 animate-biometric-scan top-0"
                        style={{ animationDuration: step === 'scanning' ? '1.5s' : '3s' }} />
                )}

                {/* Notch */}
                <div className="absolute top-0 inset-x-0 flex justify-center z-50">
                    <div className="w-32 h-6 bg-[#252838] rounded-b-3xl" />
                </div>

                {/* --- STEP 1 & 2: Login Form / Scanning --- */}
                <div className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-700 ${step === 'success' ? 'opacity-0 scale-90' : 'opacity-100'}`}>

                    {/* Secure Lens Crosshairs (From your eKYC code) */}
                    {step === 'scanning' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <div className="w-12 h-12 relative opacity-40 animate-pulse">
                                <div className="w-full h-[2px] bg-white absolute top-1/2 -translate-y-1/2" />
                                <div className="h-full w-[2px] bg-white absolute left-1/2 -translate-x-1/2" />
                            </div>
                        </div>
                    )}

                    <div className="w-14 h-14 text-[#3B82F6] mb-5 relative">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>

                    <h3 className="text-white text-xl font-bold mb-2">Secure Login</h3>
                    <p className="text-gray-500 text-xs text-center mb-8">Verification in progress...</p>

                    <div className="w-full py-3 rounded-xl text-white font-semibold text-xs flex items-center justify-center bg-[#5C6EEF]/20 border border-[#5C6EEF]/40">
                        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                        </svg>
                        {step === 'loading' ? 'Checking ID...' : 'Performing Face Match...'}
                    </div>
                </div>

                {/* --- STEP 3: SUCCESS ANIMATION --- */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-1000 ${step === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-150 pointer-events-none'}`}>

                    {/* Big Checkmark SVG (Success) */}
                    <div className="w-20 h-20 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-6 border-2 border-[#10B981] animate-bounce">
                        <svg stroke="currentColor" fill="none" strokeWidth="4" viewBox="0 0 24 24" className="text-[#10B981] w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-white text-2xl font-bold tracking-tight mb-2">Access Granted</h2>
                    <div className="px-4 py-1 bg-[#10B981] rounded-full">
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">eKYC Verified</span>
                    </div>

                    <p className="text-gray-400 text-xs text-center mt-6 animate-pulse">
                        Redirecting to Mapifyit Dashboard...
                    </p>
                </div>

                {/* Bottom Glow Overlay */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#5C6EEF]/20 to-transparent pointer-events-none" />
            </div>

            {/* Hardware Side Buttons */}
            <div className="absolute top-[90px] -left-[12px] w-[4px] h-[45px] bg-[#252838] rounded-l-md" />
            <div className="absolute top-[160px] -right-[12px] w-[4px] h-[65px] bg-[#252838] rounded-r-md" />
        </div>
    );
}