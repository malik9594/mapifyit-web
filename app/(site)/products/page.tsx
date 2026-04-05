"use client"
import React from 'react';
import FeatureSuites from '@/components/FeatureSuites';
import { Reveal } from '@/components/Reveal';

/**
 * Products Page
 * Showcases the full suite of Mapifyit products and features.
 */
export default function ProductsPage() {
    return (
        <div className="pt-20">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 text-center">
                <Reveal>
                    <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Our Solutions</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Powerful Tools for <span className="text-blue-500">Spatial Innovation.</span></h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        From high-performance map rendering to AI-driven location intelligence, Mapifyit provides the infrastructure your business needs to succeed.
                    </p>
                </Reveal>
            </div>

            <div className="relative z-10 pb-32">
                <FeatureSuites />
            </div>
        </div>
    );
}
