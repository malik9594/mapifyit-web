import React from 'react';
import { Map, ChevronRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#020408] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                                <Map className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Mapifyit</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                            Enterprise mapping and location intelligence platform designed for accuracy, control, and mission-critical scale.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Products</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            {["Map Foundations", "Location Core", "Spatial Intelligence", "Enterprise Control"].map((t) => (
                                <li key={t}><a href="#" className="hover:text-blue-400 transition-colors">{t}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Solutions</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            {["Mobility Systems", "Civic Intelligence", "Secure Operations", "GeoEnvironmental"].map((t) => (
                                <li key={t}><a href="#" className="hover:text-white transition-colors">{t}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Company</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            {["About Us", "Pricing", "Documentation", "Contact"].map((t) => (
                                <li key={t}><a href="#" className="hover:text-white transition-colors">{t}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
                    <p>© 2026 Mapifyit. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
