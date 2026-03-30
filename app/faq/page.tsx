"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { ChevronDown, MessageCircle, HelpCircle, FileText, ShieldCheck } from 'lucide-react';

const faqCategories = [
    {
        id: "general",
        title: "General Questions",
        icon: <HelpCircle className="w-4 h-4" />,
        colorClass: "text-blue-400",
        faqs: [
            {
                question: "What solutions does MapifyIt provide?",
                answer: "MapifyIt provides a comprehensive suite of location-based services including Maps & Routing via our developer APIs, Geographic Information Systems (GIS), Fleet Management Systems (FMS), and Field Force Tracking (FFT) for enterprise operations."
            },
            {
                question: "Is it possible to test the platform before committing?",
                answer: "Absolutely. We offer trial periods and guided sandbox environments for our enterprise tools. For our developer APIs, there is a generous free tier available immediately upon signup."
            }
        ]
    },
    {
        id: "enterprise",
        title: "Enterprise Solutions",
        icon: <ShieldCheck className="w-4 h-4" />,
        colorClass: "text-indigo-400",
        faqs: [
            {
                question: "Do you offer on-premises deployment?",
                answer: "Yes, our enterprise solutions including FMS and FFT can be deployed in a secure SaaS cloud environment, a private cloud, or completely on-premises behind your corporate firewall for ultimate data security and compliance."
            }
        ]
    },
    {
        id: "developers",
        title: "Developer APIs",
        icon: <FileText className="w-4 h-4" />,
        colorClass: "text-cyan-400",
        faqs: [
            {
                question: "How do I get an API key for Maps & Routing?",
                answer: "You can sign up for a free developer account at dev.mapifyit.com. Once registered, you can generate your API keys from the developer dashboard to access our mapping and routing endpoints."
            }
        ]
    },
    {
        id: "pricing",
        title: "Pricing & Billing",
        icon: <MessageCircle className="w-4 h-4" />,
        colorClass: "text-emerald-400",
        faqs: [
            {
                question: "How does the pricing structure work?",
                answer: "Our pricing depends on the specific modules you require. Maps APIs are billed on a pay-as-you-go model. Enterprise solutions like FMS and FFT have custom tier-based pricing based on the number of assets or agents. Please visit the Pricing page or Contact Us for a detailed quote."
            }
        ]
    }
];

export default function FAQPage() {
    // Map to keep track of which FAQ is open. Format: { categoryId: faqIndex }
    const [openIndex, setOpenIndex] = useState<{ [category: string]: number | null }>({
        "general": 0 // Open the first FAQ in the first category by default
    });

    const toggleFaq = (categoryId: string, index: number) => {
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
                                {faqCategories.map((category) => (
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
                                <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Support & FAQs.</h1>
                            
                            <div className="text-lg text-slate-400 mb-12 leading-relaxed bg-white/[0.02] border border-white/5 p-6 rounded-xl">
                                <p>Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please contact our friendly team.</p>
                            </div>
                            
                            <div className="space-y-16">
                                {faqCategories.map((category) => (
                                    <section key={category.id} id={category.id} className="scroll-mt-32">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${category.colorClass}`}>
                                                {category.icon}
                                            </div>
                                            <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                                        </div>
                                        
                                        <div className="space-y-4 lg:pl-11">
                                            {category.faqs.map((faq, index) => {
                                                const isOpen = openIndex[category.id] === index;
                                                return (
                                                    <motion.div 
                                                        key={index}
                                                        initial={false}
                                                        animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}
                                                        className={`border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-blue-500/30' : 'border-white/5 hover:border-white/10'}`}
                                                    >
                                                        <button
                                                            onClick={() => toggleFaq(category.id, index)}
                                                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                                        >
                                                            <span className="text-base md:text-lg font-medium text-white">{faq.question}</span>
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
                                                                        {faq.answer}
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
                                                <p className="text-slate-400 text-sm md:text-base">Can't find the answer you're looking for? Please contact our friendly team.</p>
                                            </div>
                                        </div>
                                        <a 
                                            href="/contactus" 
                                            className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0"
                                        >
                                            Get in touch
                                        </a>
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
