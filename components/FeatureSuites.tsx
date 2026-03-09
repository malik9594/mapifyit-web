import React from 'react';
import { Map, Navigation, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface ColorClass {
    icon: string;
    bgLight: string;
    iconContainer: string;
    bullet: string;
    link: string;
}

const FeatureCard = ({ icon: Icon, title, description, features, linkText, colorClass, delay }: { icon: any, title: string, description: string, features: string[], linkText: string, colorClass: ColorClass, delay: number }) => (
    <Reveal delay={delay}>
        <div className={`group relative h-full p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]`}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorClass.bgLight}`} />
            <div className="relative h-full p-8 md:p-10 rounded-[22px] bg-[#070B14] border border-white/5 flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ${colorClass.iconContainer}`}>
                    <Icon className={`w-7 h-7 ${colorClass.icon}`} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{title}</h4>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">{description}</p>
                <ul className="space-y-3 mb-8">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                            <div className={`w-1.5 h-1.5 rounded-full ${colorClass.bullet}`} /> {f}
                        </li>
                    ))}
                </ul>
                <a href="#" className={`inline-flex items-center gap-2 font-semibold transition-colors ${colorClass.link}`}>
                    {linkText} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    </Reveal>
);

export default function FeatureSuites() {
    // const suites = [
    //     {
    //         icon: Map,
    //         title: "Map Foundations",
    //         description: "The visual and spatial core of Mapifyit. Vector, satellite, indoor maps, and high-performance rendering APIs designed for immersive experiences.",
    //         features: ["Custom Cartography", "Web & Mobile SDKs", "60fps Vector Rendering"],
    //         linkText: "Explore AtlasMaps",
    //         colorClass: { icon: "text-blue-400", bgLight: "bg-blue-500/5", iconContainer: "from-blue-500/20 to-transparent border-blue-500/30", bullet: "bg-blue-500", link: "text-blue-400 hover:text-blue-300" },
    //         delay: 0
    //     },
    //     {
    //         icon: Navigation,
    //         title: "Location Core",
    //         description: "Search, Routing & Navigation Suite. Power fast, accurate location discovery and intelligent movement across real-world environments.",
    //         features: ["Global Geocoding", "Route Optimization", "Localized Intelligence"],
    //         linkText: "Explore GeoSearch",
    //         colorClass: { icon: "text-emerald-400", bgLight: "bg-emerald-500/5", iconContainer: "from-emerald-500/20 to-transparent border-emerald-500/30", bullet: "bg-emerald-500", link: "text-emerald-400 hover:text-emerald-300" },
    //         delay: 100
    //     },
    //     {
    //         icon: Activity,
    //         title: "Spatial Intelligence",
    //         description: "Analytics & Insights Suite. Transform raw location data into actionable intelligence with AI-driven predictive insights.",
    //         features: ["TrafficPulse™ Monitoring", "Heatmaps & Clusters", "Travel Forecasting"],
    //         linkText: "Explore Analytics",
    //         colorClass: { icon: "text-purple-400", bgLight: "bg-purple-500/5", iconContainer: "from-purple-500/20 to-transparent border-purple-500/30", bullet: "bg-purple-500", link: "text-purple-400 hover:text-purple-300" },
    //         delay: 200
    //     },
    //     {
    //         icon: ShieldCheck,
    //         title: "Enterprise Control",
    //         description: "Security & Operations Suite. Turnkey solutions like FleetSense and NG-EKYC built for organizations demanding full visibility.",
    //         features: ["Fleet Tracking (FMS)", "E-KYC Identity", "Geofencing & Alerts"],
    //         linkText: "Explore FleetSense",
    //         colorClass: { icon: "text-amber-400", bgLight: "bg-amber-500/5", iconContainer: "from-amber-500/20 to-transparent border-amber-500/30", bullet: "bg-amber-500", link: "text-amber-400 hover:text-amber-300" },
    //         delay: 300
    //     }
    // ];

    const suites = [
        {
            icon: Map,
            title: "Map Foundations",
            description: "The visual core of Mapifyit. Deploy high-performance, customizable vector and raster tiles tailored to your brand with sub-second latency.",
            features: ["Custom Vector & Raster Tiles", "Web & Mobile SDKs", "Infinite Scalability"],
            linkText: "Explore Map Interfaces",
            colorClass: { icon: "text-blue-400", bgLight: "bg-blue-500/5", iconContainer: "from-blue-500/20 to-transparent border-blue-500/30", bullet: "bg-blue-500", link: "text-blue-400 hover:text-blue-300" },
            delay: 0
        },
        {
            icon: Navigation,
            title: "Location Core",
            description: "Precision search, routing, and navigation suite. Instantly translate complex addresses, calculate real-time ETAs, and speed up entry with smart autocomplete.",
            features: ["Forward & Reverse Geocoding", "Dynamic Routing & ETAs", "Predictive Autocomplete"],
            linkText: "Explore Location APIs",
            colorClass: { icon: "text-emerald-400", bgLight: "bg-emerald-500/5", iconContainer: "from-emerald-500/20 to-transparent border-emerald-500/30", bullet: "bg-emerald-500", link: "text-emerald-400 hover:text-emerald-300" },
            delay: 100
        },
        {
            icon: Activity,
            title: "Specialized GIS",
            description: "Advanced Geographic Information Systems. Transform raw spatial data into actionable enterprise insights through custom remote sensing and data modeling.",
            features: ["Spatial Data Modeling", "Remote Sensing Analysis", "Enterprise GIS Integration"],
            linkText: "Explore GIS Solutions",
            colorClass: { icon: "text-purple-400", bgLight: "bg-purple-500/5", iconContainer: "from-purple-500/20 to-transparent border-purple-500/30", bullet: "bg-purple-500", link: "text-purple-400 hover:text-purple-300" },
            delay: 200
        },
        {
            icon: ShieldCheck,
            title: "Enterprise Control",
            description: "Security and operations suite. Automate compliance with location-backed Next-Gen eKYC and optimize vehicle logistics with real-time Fleet Management.",
            features: ["Next-Gen eKYC (NgeKYC)", "Fleet Management (FMS)", "Real-Time Geofencing"],
            linkText: "Explore Security & Ops",
            colorClass: { icon: "text-amber-400", bgLight: "bg-amber-500/5", iconContainer: "from-amber-500/20 to-transparent border-amber-500/30", bullet: "bg-amber-500", link: "text-amber-400 hover:text-amber-300" },
            delay: 300
        }
    ];
    return (
        <section id="products" className="py-10 relative">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="mb-20 md:text-center">
                        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Feature Suites</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Smarter Maps. Smarter Outcomes.</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Mapifyit is purpose-built for regions and enterprises where global providers lack precise data, control, or true data sovereignty.
                        </p>
                    </div>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Map Foundations & Location Core */}
                    <FeatureCard {...suites[0]} />
                    <FeatureCard {...suites[1]} />

                    {/* Spatial Intelligence & Enterprise Control */}
                    <div id="fms" className="scroll-mt-32">
                        <FeatureCard {...suites[2]} />
                    </div>
                    <div id="ngekyc" className="scroll-mt-32">
                        <FeatureCard {...suites[3]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
