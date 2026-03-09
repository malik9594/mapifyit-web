"use client"
import React from 'react';
import Hero from '@/components/Hero';
import FeatureSuites from '@/components/FeatureSuites';
import Infrastructure from '@/components/Infrastructure';
import Pricing from '@/components/Pricing';
import ContactUs from '@/components/ContactUs';

/**
 * Main Landing Page Component
 * Home page content only. Navbar and Footer are in layout.tsx.
 * Consolidates all features for a single-page scrolling experience.
 */
export default function Home() {
  return (
    <div className="relative z-10 pt-32 pb-20">

      {/* GLOBAL ANIMATION KEYFRAMES - Kept for component-specific animations */}
      <style>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(2.5); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes biometricScan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes border-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .isometric-grid { transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d; }
        .scanner-beam { background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.8)); animation: scan 4s linear infinite; }
        
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-stagger-1 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .animate-stagger-2 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-stagger-3 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .animate-stagger-4 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
        .animate-biometric-scan { animation: biometricScan 3s ease-in-out infinite; }
      `}</style>

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse:70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <Hero />
      <FeatureSuites />
      <Pricing />
      <div id="gismap" className="scroll-mt-20">
        <Infrastructure />
      </div>


      <div id="contactus" className="scroll-mt-20">
        <ContactUs />
      </div>
    </div>
  );
}