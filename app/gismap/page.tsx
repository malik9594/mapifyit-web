"use client"
import React from 'react';
import Infrastructure from '@/components/Infrastructure';
import FeatureSuites from '@/components/FeatureSuites';
import { Reveal } from '@/components/Reveal';

/**
 * GIS Map Page
 * Showcases the advanced GIS capabilities and deployment options.
 */
export default function GISPage() {
    return (
        <div className="pt-20">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 text-center">
                <Reveal>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Enterprise <span className="text-blue-500">GIS Core.</span></h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        High-precision spatial analysis, real-time map rendering, and fully secure deployment frameworks for mission-critical operations.
                    </p>
                </Reveal>
            </div>

            <div className="relative z-10">
                <Infrastructure />
                <div className="bg-[#03060D] py-20 px-6">
                    <FeatureSuites />
                </div>
            </div>
        </div>
    );
}
