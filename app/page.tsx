"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSuites from '@/components/FeatureSuites';
import Infrastructure from '@/components/Infrastructure';
import Footer from '@/components/Footer';

/**
 * Main Landing Page Component
 * Assembles modular sections into the final Mapifyit experience
 */
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#03060D] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">

      {/* GLOBAL ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(2.5); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .isometric-grid { transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d; }
        .scanner-beam { background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.8)); animation: scan 4s linear infinite; }
      `}</style>

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse:70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      {/* Modular Page Sections */}
      <Navbar isScrolled={isScrolled} />

      <main className="relative z-10 pt-32 pb-20">
        <Hero />
        <FeatureSuites />
        <Infrastructure />
      </main>

      <Footer />
    </div>
  );
}