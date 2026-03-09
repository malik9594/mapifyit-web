import React from 'react';
import { Map, Navigation, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import Link from 'next/link';

interface ColorClass {
    icon: string;
    bgLight: string;
    iconContainer: string;
    bullet: string;
    link: string;
}

const FeatureCard = ({ icon: Icon, title, description, features, linkText, linkHref, colorClass, delay }: { icon: any, title: string, description: string, features: string[], linkText: string, linkHref: string, colorClass: ColorClass, delay: number }) => (
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
                <Link href={linkHref} className={`inline-flex items-center gap-2 font-semibold transition-colors ${colorClass.link}`}>
                    {linkText} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </Reveal>
);

export default function FeatureSuites() {
    const suites = [
        {
            icon: Map,
            title: "Predictable Maps API",
            description: "Render high-resolution vector and satellite tiles at 60fps. Built for mass-scale web and mobile apps with localized address accuracy.",
            features: [],
            linkText: "Explore SDKs",
            linkHref: "/sdks",
            colorClass: { icon: "text-blue-400", bgLight: "bg-blue-500/5", iconContainer: "from-blue-500/20 to-transparent border-blue-500/30", bullet: "bg-blue-500", link: "text-blue-400 hover:text-blue-300" },
            delay: 0
        },
        {
            icon: Activity,
            title: "Specialized GIS",
            description: "Advanced Geographic Information Systems. Transform raw spatial data into actionable enterprise insights through custom remote sensing and data modeling.",
            features: [],
            linkText: "GIS Reference",
            linkHref: "/gis",
            colorClass: { icon: "text-purple-400", bgLight: "bg-purple-500/5", iconContainer: "from-purple-500/20 to-transparent border-purple-500/30", bullet: "bg-purple-500", link: "text-purple-400 hover:text-purple-300" },
            delay: 200
        },
        {
            icon: ShieldCheck,
            title: "Intelligence Routing",
            description: "Multi-stop optimization and real-time traffic pulse monitoring. Build logistics systems that calculate the true cost of distance.",
            features: [],
            linkText: "Routing Specs",
            linkHref: "/routing",
            colorClass: { icon: "text-amber-400", bgLight: "bg-amber-500/5", iconContainer: "from-amber-500/20 to-transparent border-amber-500/30", bullet: "bg-amber-500", link: "text-amber-400 hover:text-amber-300" },
            delay: 300
        }
    ];
    return (
        <section id="maps" className="py-10 relative">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="mb-20 md:text-center">
                        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">Core Ecosystem</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for Performance.
                            Priced for Control.</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Mapifyit is purpose-built for regions and enterprises where global providers lack precise data, control, or true data sovereignty.
                        </p>
                    </div>
                </Reveal>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {suites.map((suite, index) => (
                        <div key={index} id={index === 1 ? "fms" : index === 2 ? "ngekyc" : undefined} className="scroll-mt-32">
                            <FeatureCard {...suite} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
