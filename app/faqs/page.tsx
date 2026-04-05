"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { ChevronDown, MessageCircle, HelpCircle, FileText, ShieldCheck } from 'lucide-react';

const faqsCategories = [
    {
        id: "general",
        title: "General Overview",
        icon: <HelpCircle className="w-4 h-4" />,
        colorClass: "text-blue-400",
        faqs: [
            {
                question: "What is MapifyIt?",
                answer: "MapifyIt is an AI-powered mapping and GIS platform that helps businesses build, analyze, and scale location-based solutions using advanced geospatial intelligence."
            },
            {
                question: "How is MapifyIt different from Google Maps or other providers?",
                answer: "Unlike traditional map providers, MapifyIt offers deep localization, offline-first functionality, full data ownership (data sovereignty), and flexible deployment options including cloud, on-premise, or private cloud."
            },
            {
                question: "What industries can use MapifyIt?",
                answer: "MapifyIt is suitable for logistics & fleet management, smart cities, defense & security, enterprise software, and mobility/transportation. Any business that relies on location data can benefit from our spatial intelligence."
            },
            {
                question: "What is location intelligence in MapifyIt?",
                answer: "Location intelligence refers to analyzing geographic data to understand patterns, optimize operations, and make smarter business decisions in real time using our advanced spatial engine."
            },
            {
                question: "Can MapifyIt handle complex data visualization for large datasets?",
                answer: "Yes, MapifyIt is built on a high-performance rendering engine that can visualize millions of data points smoothly. Our platform supports vector tiles and GPU-accelerated rendering, ensuring that your geographic insights are delivered without lag, even with massive enterprise datasets."
            }
        ]
    },
    {
        id: "features",
        title: "Features & Technology",
        icon: <ShieldCheck className="w-4 h-4" />,
        colorClass: "text-indigo-400",
        faqs: [
            {
                question: "What are the main features of MapifyIt?",
                answer: "MapifyIt offers mapping & visualization APIs, search, routing & navigation, real-time traffic analytics, fleet tracking, geofencing, and AI-driven spatial intelligence."
            },
            {
                question: "Can MapifyIt work without internet?",
                answer: "Yes, MapifyIt is designed to work in low-bandwidth or completely offline environments, making it ideal for remote or secure operations where connectivity is limited."
            },
            {
                question: "Does MapifyIt provide APIs for developers?",
                answer: "Yes, MapifyIt provides developer-friendly APIs and SDKs that allow easy integration across web, mobile, and enterprise applications with minimal effort."
            },
            {
                question: "How does MapifyIt use AI?",
                answer: "MapifyIt combines AI with geospatial data to predict trends, provide real-time insights, improve decision-making, and automate complex location-based workflows."
            },
            {
                question: "Can MapifyIt be used for real-time tracking?",
                answer: "Yes, MapifyIt is engineered for high-performance real-time tracking, providing live GPS updates with sub-second latency. Beyond simple location monitoring, it offers advanced routing optimization, geofencing alerts, and historical playback, making it a comprehensive solution for high-precision fleet management, asset security, and complex logistics operations."
            },
            {
                question: "Does MapifyIt support custom map styling and branding?",
                answer: "Absolutely. MapifyIt provides extensive customization options, allowing you to tailor the map’s aesthetics to match your brand identity. You can customize colors, fonts, icons, and layers using our intuitive map styling tool, ensuring a seamless experience for your end users."
            },
            {
                question: "Does MapifyIt support geofencing and automated alerts?",
                answer: "Yes, MapifyIt includes a robust geofencing engine that allows you to define virtual boundaries and trigger real-time notifications via Webhooks or SMS whenever an asset enters or exits a predefined zone, enabling automated workflows and enhanced operational security."
            }
        ]
    },
    {
        id: "platform",
        title: "Platform & Pricing",
        icon: <MessageCircle className="w-4 h-4" />,
        colorClass: "text-emerald-400",
        faqs: [
            {
                question: "Is MapifyIt scalable for large businesses?",
                answer: "Yes, MapifyIt is built for massive scalability and can support both startups and enterprise-level operations with flexible infrastructure and modular pricing."
            },
            {
                question: "How does pricing work?",
                answer: "MapifyIt uses transparent, usage-based pricing, allowing businesses to pay only for what they use without hidden costs or complex licensing agreements."
            },
            {
                question: "Can I start using MapifyIt for free?",
                answer: "Yes, MapifyIt offers a free tier so users can explore the platform and test our APIs before upgrading to advanced enterprise features."
            },
            {
                question: "Does MapifyIt provide dedicated enterprise support?",
                answer: "Yes, we offer premium service-level agreements (SLAs) for enterprise clients, including 24/7 dedicated technical support, personalized onboarding, and architecture consulting for large-scale GIS deployments."
            }
        ]
    }
];

export default function FAQsPage() {
    // Map to keep track of which FAQs is open. Format: { categoryId: faqsIndex }
    const [openIndex, setOpenIndex] = useState<{ [category: string]: number | null }>({
        "general": 0 // Open the first FAQs in the first category by default
    });

    const toggleFaqs = (categoryId: string, index: number) => {
        setOpenIndex(prev => ({
            ...prev,
            [categoryId]: prev[categoryId] === index ? null : index
        }));
    };

    return (
        <div className="pt-32 pb-24 bg-[#030712] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Navigation Sidebar */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32">
                            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Support Center</h3>
                            <nav className="flex flex-col space-y-3">
                                {faqsCategories.map((category) => (
                                    <a
                                        key={category.id}
                                        href={`#${category.id}`}
                                        className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                                    >
                                        {category.title}
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-12 flex flex-col space-y-4">
                                <Link href="/terms-of-service" className="flex items-center gap-3 text-slate-500 hover:text-slate-300 text-sm transition-colors group">
                                    <FileText className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                                    Read Terms of Service
                                </Link>
                                <Link href="/privacy-policy" className="flex items-center gap-3 text-slate-500 hover:text-slate-300 text-sm transition-colors group">
                                    <ShieldCheck className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                                    Read Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-wider text-blue-400 mb-6">
                                <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions (FAQs)
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Support & FAQs.</h1>

                            <div className="text-lg text-slate-400 mb-12 leading-relaxed bg-white/[0.02] border border-white/5 p-6 rounded-xl">
                                <p>Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please contact our friendly team.</p>
                            </div>

                            <div className="space-y-16">
                                {faqsCategories.map((category) => (
                                    <section key={category.id} id={category.id} className="scroll-mt-32">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${category.colorClass}`}>
                                                {category.icon}
                                            </div>
                                            <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                                        </div>

                                        <div className="space-y-4 lg:pl-11">
                                            {category.faqs.map((faqs, index) => {
                                                const isOpen = openIndex[category.id] === index;
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={false}
                                                        animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}
                                                        className={`border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-blue-500/30' : 'border-white/5 hover:border-white/10'}`}
                                                    >
                                                        <button
                                                            onClick={() => toggleFaqs(category.id, index)}
                                                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                                        >
                                                            <span className="text-base md:text-lg font-medium text-white">{faqs.question}</span>
                                                            <motion.div
                                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 ${isOpen ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-400'}`}
                                                            >
                                                                <ChevronDown className="w-4 h-4" />
                                                            </motion.div>
                                                        </button>

                                                        <AnimatePresence initial={false}>
                                                            {isOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                >
                                                                    <div className="px-5 pb-5 pt-0 text-slate-400 leading-relaxed text-sm md:text-base">
                                                                        {faqs.answer}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                ))}

                                <section className="pt-8 mt-12 border-t border-white/10">
                                    <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                                                <MessageCircle className="text-blue-400 w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Still have questions?</h3>
                                                <p className="text-slate-400 text-sm md:text-base">Can&apos;t find the answer you&apos;re looking for? Please contact our friendly team.</p>
                                            </div>
                                        </div>
                                        <a
                                            href="/contact-us"
                                            className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0"
                                        >
                                            Get in touch
                                        </a>
                                    </div>
                                </section>

                                <section className="pt-10">
                                    <div className="rounded-2xl border border-white/10 bg-[#080F1D] p-6 md:p-8">
                                        <h2 className="text-2xl font-semibold text-white mb-4">Mapifyit FAQ Guide For Evaluation Teams</h2>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            This FAQ page is designed to help decision-makers, product teams, and technical leads quickly understand how Mapifyit fits into real-world location intelligence programs. When companies evaluate mapping platforms, they usually compare more than just visual map quality. They also look at routing accuracy, geocoding relevance, scaling behavior under heavy traffic, data sovereignty options, and long-term commercial predictability. The answers above summarize these core topics so teams can evaluate technical fit before deeper implementation planning.
                                        </p>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            If your organization is building logistics, field-force automation, mobility, GIS analytics, or identity-linked geospatial workflows, the most important step is defining clear operational goals. That includes latency targets, update frequency, offline requirements, compliance constraints, and expected user growth. Once these requirements are clear, platform selection becomes faster and more objective. Our documentation and support team can help map these requirements to specific APIs and deployment options.
                                        </p>
                                        <p className="text-slate-300 leading-relaxed">
                                            For teams that need additional clarity, the next step is a focused technical session where we review your current stack, integration surface, and rollout phases. This approach helps reduce migration risk, improve launch confidence, and ensure the platform is aligned with both engineering and business outcomes.
                                        </p>
                                    </div>
                                </section>

                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
