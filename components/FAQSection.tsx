"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { ChevronDown, HelpCircle, ShieldCheck, MessageCircle } from 'lucide-react';

export const homeFaqs = [
    {
        id: "general",
        title: "Platform & Overview",
        icon: <HelpCircle className="w-4 h-4" />,
        colorClass: "text-blue-400",
        faqs: [
            {
                question: "What is MapifyIt?",
                answer: "MapifyIt is a mapping API, geospatial platform, and GIS infrastructure solution that enables businesses and governments to build location-powered applications, routing systems, search experiences, and spatial intelligence platforms."
            },
            {
                question: "What mapping APIs does MapifyIt offer?",
                answer: "MapifyIt provides a complete suite of mapping APIs including Maps API, Tiles API, Geocoding API, Reverse Geocoding API, Routing API, Distance Matrix API, and Places Search API for web, mobile, and backend systems."
            },
            {
                question: "Can MapifyIt replace Google Maps API or Mapbox?",
                answer: "Yes. MapifyIt is a powerful alternative to Google Maps API and Mapbox, offering mapping APIs, routing, geocoding, and infrastructure-level deployment options with greater control, scalability, and cost efficiency."
            },
            {
                question: "Is MapifyIt only a maps API provider or also a GIS platform?",
                answer: "MapifyIt is both a mapping API provider and a GIS platform. It combines maps, APIs, and geospatial infrastructure with spatial analysis capabilities to help organizations build complete location intelligence systems."
            },
            {
                question: "What is the difference between MapifyIt and traditional GIS software?",
                answer: "Traditional GIS software focuses on analysis and visualization. MapifyIt extends this by providing mapping APIs, geospatial infrastructure, and deployment flexibility, enabling businesses to build scalable GIS-powered applications and systems."
            }
        ]
    },
    {
        id: "deployment",
        title: "Deployment & Enterprise",
        icon: <ShieldCheck className="w-4 h-4" />,
        colorClass: "text-indigo-400",
        faqs: [
            {
                question: "Does MapifyIt support on-premise maps and API deployment?",
                answer: "Yes. MapifyIt supports on-premise maps and API deployment, allowing organizations to run mapping, routing, and geospatial services on their own servers or private infrastructure."
            },
            {
                question: "Why choose on-premise maps instead of cloud-only APIs?",
                answer: "On-premise maps provide full control over geospatial data, improved performance for internal systems, compliance with data regulations, reduced dependency on third-party providers, and better long-term cost efficiency at scale."
            },
            {
                question: "Can MapifyIt handle high-volume or unlimited API usage?",
                answer: "Yes. MapifyIt is designed for high-volume and effectively unlimited API usage. Organizations can scale mapping APIs, routing, and geospatial services based on their infrastructure without the typical usage limits of third-party platforms."
            },
            {
                question: "Is MapifyIt suitable for enterprise and government GIS deployments?",
                answer: "Yes. MapifyIt is designed for enterprise and government GIS deployments that require scalable mapping APIs, infrastructure control, data privacy, and advanced geospatial capabilities."
            },
            {
                question: "Can MapifyIt be customized for specific regions, datasets, or use cases?",
                answer: "Yes. MapifyIt supports custom datasets, regional addressing systems, private infrastructure, and industry-specific configurations, enabling tailored mapping and GIS solutions."
            }
        ]
    },
    {
        id: "integration",
        title: "Industries & Integration",
        icon: <MessageCircle className="w-4 h-4" />,
        colorClass: "text-emerald-400",
        faqs: [
            {
                question: "Which industries use mapping APIs and GIS platforms like MapifyIt?",
                answer: "Mapping APIs and GIS platforms like MapifyIt are used in logistics, ride-hailing, delivery, real estate, telecom, utilities, government, and smart city applications where location data is critical."
            },
            {
                question: "Can developers integrate MapifyIt mapping APIs into applications?",
                answer: "Yes. Developers can integrate MapifyIt mapping APIs into web applications, mobile apps, and backend systems to power maps, geocoding, routing, search, and location-based features."
            }
        ]
    }
];

export const gisFaqs = [
    {
        id: "gis-fundamentals",
        title: "GIS Fundamentals",
        icon: <HelpCircle className="w-4 h-4" />,
        colorClass: "text-blue-400",
        faqs: [
            {
                question: "What is a GIS platform?",
                answer: "A GIS platform is a system used to collect, manage, analyze, and visualize geospatial data, enabling organizations to understand patterns and make location-based decisions."
            },
            {
                question: "What is MapifyIt GIS?",
                answer: "MapifyIt GIS is a geospatial platform that combines mapping APIs, spatial data infrastructure, and geospatial analysis to help organizations build and operate location-based systems at scale."
            },
            {
                question: "What is the difference between GIS and maps?",
                answer: "Maps are used for visualization, while GIS is used for analysis, data management, and decision-making. GIS platforms like MapifyIt enable deeper spatial insights and system-level operations."
            },
            {
                question: "Is MapifyIt a GIS platform or a mapping API provider?",
                answer: "MapifyIt is both. It combines mapping APIs with GIS capabilities, allowing organizations to build complete geospatial platforms instead of just displaying maps."
            },
            {
                question: "Why choose MapifyIt as a GIS platform?",
                answer: "MapifyIt combines GIS capabilities, mapping APIs, scalable infrastructure, and flexible deployment options, making it suitable for organizations that need both geospatial analysis and production-grade systems."
            }
        ]
    },
    {
        id: "capabilities",
        title: "Capabilities & Analysis",
        icon: <ShieldCheck className="w-4 h-4" />,
        colorClass: "text-indigo-400",
        faqs: [
            {
                question: "What GIS capabilities does MapifyIt provide?",
                answer: "MapifyIt provides spatial data management, geospatial analysis, mapping, geocoding, routing, land and boundary systems, dashboards, and custom geospatial applications."
            },
            {
                question: "What is geospatial analysis?",
                answer: "Geospatial analysis is the process of analyzing location-based data to identify patterns, relationships, and insights for planning and decision-making."
            },
            {
                question: "What is spatial data in GIS?",
                answer: "Spatial data is data that includes geographic information such as coordinates, boundaries, addresses, and relationships between physical locations."
            },
            {
                question: "What is remote sensing in GIS?",
                answer: "Remote sensing is the process of collecting geospatial data using satellite imagery, aerial photography, and sensors to analyze land and environmental conditions."
            },
            {
                question: "Can MapifyIt be used for land and cadastral systems?",
                answer: "Yes. MapifyIt supports land information systems, cadastral mapping, boundary management, and land record digitization."
            }
        ]
    },
    {
        id: "infrastructure",
        title: "Infrastructure & Deployment",
        icon: <MessageCircle className="w-4 h-4" />,
        colorClass: "text-emerald-400",
        faqs: [
            {
                question: "What is GIS infrastructure?",
                answer: "GIS infrastructure refers to the systems, servers, APIs, and databases used to store, process, and deliver geospatial data across applications and platforms."
            },
            {
                question: "What is the difference between GIS software and GIS infrastructure?",
                answer: "GIS software is used for analysis and visualization, while GIS infrastructure powers real-world applications through APIs, data systems, and scalable deployments."
            },
            {
                question: "Can MapifyIt be used for enterprise GIS deployments?",
                answer: "Yes. MapifyIt is designed for enterprise GIS deployments that require scalability, large datasets, system integration, and high-performance geospatial processing."
            },
            {
                question: "Does MapifyIt support on-premise GIS deployment?",
                answer: "Yes. MapifyIt supports on-premise GIS deployment, allowing organizations to run geospatial systems within their own infrastructure."
            },
            {
                question: "What is Web GIS?",
                answer: "Web GIS refers to GIS systems that are accessible through web browsers, allowing users to interact with maps, spatial data, and analytics online."
            }
        ]
    }
];

export const mapsFaqs = [
    {
        id: "platform",
        title: "Platform & Maps API",
        icon: <HelpCircle className="w-4 h-4" />,
        colorClass: "text-blue-400",
        faqs: [
            {
                question: "What is a Maps API?",
                answer: "A Maps API allows developers to integrate maps, location data, and geospatial features into web and mobile applications."
            },
            {
                question: "What is MapifyIt Maps API?",
                answer: "MapifyIt Maps API is a mapping platform that provides maps, tiles, geocoding, routing, and location-based services for building applications and enterprise systems."
            },
            {
                question: "What mapping APIs does MapifyIt offer?",
                answer: "MapifyIt offers Maps API, Tiles API, Geocoding API, Reverse Geocoding API, Routing API, Distance Matrix API, and Places Search API."
            },
            {
                question: "Can MapifyIt replace Google Maps API?",
                answer: "Yes. MapifyIt is a powerful alternative to Google Maps API, offering mapping APIs, routing, and geocoding with greater flexibility, cost control, and deployment options."
            },
            {
                question: "Is MapifyIt an alternative to Mapbox?",
                answer: "Yes. MapifyIt can be used as an alternative to Mapbox for maps, routing, geocoding, and enterprise mapping applications with more control over infrastructure and data."
            },
            {
                question: "What is the difference between MapifyIt and Google Maps API?",
                answer: "Google Maps API is a fully managed service, while MapifyIt offers both managed and on-premise deployment options, giving organizations more control over data, infrastructure, and scaling."
            },
            {
                question: "Why choose MapifyIt Maps API?",
                answer: "MapifyIt provides mapping APIs, GIS capabilities, scalable infrastructure, and flexible deployment options, making it suitable for organizations that need control, performance, and cost efficiency."
            }
        ]
    },
    {
        id: "capabilities",
        title: "API Capabilities",
        icon: <ShieldCheck className="w-4 h-4" />,
        colorClass: "text-indigo-400",
        faqs: [
            {
                question: "What is a Tiles API?",
                answer: "A Tiles API delivers map tiles that are used to render maps in applications, including roads, terrain, and geographic features."
            },
            {
                question: "What is a Geocoding API?",
                answer: "A Geocoding API converts addresses into geographic coordinates that can be used for mapping, navigation, and spatial analysis."
            },
            {
                question: "What is a Routing API?",
                answer: "A Routing API calculates optimal routes, travel time, and directions between locations for navigation and logistics applications."
            },
            {
                question: "Does MapifyIt support custom datasets and private data?",
                answer: "Yes. MapifyIt supports custom datasets, private map layers, and region-specific data for tailored mapping solutions."
            }
        ]
    },
    {
        id: "enterprise",
        title: "Enterprise & Deployment",
        icon: <MessageCircle className="w-4 h-4" />,
        colorClass: "text-emerald-400",
        faqs: [
            {
                question: "Does MapifyIt support on-premise maps and APIs?",
                answer: "Yes. MapifyIt supports on-premise deployment of maps, routing, and geospatial APIs, allowing organizations to run mapping systems on their own infrastructure."
            },
            {
                question: "Can MapifyIt handle high-volume API usage?",
                answer: "Yes. MapifyIt is designed for high-volume and enterprise-scale API usage, supporting applications with large numbers of requests across multiple systems."
            },
            {
                question: "Can MapifyIt be used for logistics and delivery applications?",
                answer: "Yes. MapifyIt is widely used in logistics, delivery, and mobility applications for routing, distance calculation, and real-time location services."
            },
            {
                question: "Can developers integrate MapifyIt APIs into applications?",
                answer: "Yes. MapifyIt APIs can be integrated into web apps, mobile apps, and backend systems to power maps, routing, geocoding, and search features."
            }
        ]
    }
];

export default function FAQSection({ type = 'home', showHeader = false }: { type?: 'home' | 'gis' | 'maps', showHeader?: boolean }) {
    const categories = type === 'gis' ? gisFaqs : type === 'maps' ? mapsFaqs : homeFaqs;

    const [openIndex, setOpenIndex] = useState<{ [category: string]: number | null }>({
        [categories[0].id]: 0
    });

    const toggleFaqs = (categoryId: string, index: number) => {
        setOpenIndex(prev => ({
            ...prev,
            [categoryId]: prev[categoryId] === index ? null : index
        }));
    };

    return (
        <section className="py-1 relative overflow-hidden bg-[#030712]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-indigo-600/5 rounded-full blur-[70px] md:blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* {showHeader && (
                    <Reveal>
                        <div className="text-center mb-20 md:mb-28">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6">
                                <HelpCircle className="w-3 h-3" /> Support & Resources
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Questions.</span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                                Everything you need to know about Mapifyit platforms, mapping APIs, and enterprise GIS infrastructure. Can't find the answer? Our engineers are here to help.
                            </p>
                        </div>
                    </Reveal>
                )} */}

                <Reveal>
                    <div className="grid grid-cols-1 gap-12 max-w-7xl mx-auto">
                        <div className="space-y-2 md:space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="scroll-mt-32">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${category.colorClass}`}>
                                            {category.icon}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{category.title}</h3>
                                    </div>

                                    <div className="space-y-4 md:pl-2">
                                        {category.faqs.map((faqs, index) => {
                                            const isOpen = openIndex[category.id] === index;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={false}
                                                    animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}
                                                    className={`border rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.05)]' : 'border-white/5 hover:border-white/10'}`}
                                                >
                                                    <button
                                                        onClick={() => toggleFaqs(category.id, index)}
                                                        className="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 text-left focus:outline-none group"
                                                    >
                                                        <span className={`text-base md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{faqs.question}</span>
                                                        <motion.div
                                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center shrink-0 ml-4 transition-colors ${isOpen ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}
                                                        >
                                                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
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
                                                                <div className="px-6 sm:px-8 md:px-10 pb-8 md:pb-10 pt-0 text-slate-400 leading-relaxed text-sm md:text-lg font-light">
                                                                    {faqs.answer}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="mt-4 md:mt-8 text-center">
                        <div className="max-w-7xl mx-auto">
                            <div className="relative p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] border border-blue-500/20 bg-[#080E18] overflow-hidden transition-all hover:border-white/20 group shadow-lg">
                                {/* Deep Ambient background glow */}
                                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500 blur-[100px] rounded-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-between">
                                    <div className="text-center md:text-left">
                                        <h4 className="text-white font-bold text-2xl md:text-3xl mb-3">Still have questions?</h4>
                                        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                            Can't find the answer you're looking for? Please contact our friendly team for personalized support.
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <a
                                            href="/contact-us"
                                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 whitespace-nowrap shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95"
                                        >
                                            Get in touch
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
