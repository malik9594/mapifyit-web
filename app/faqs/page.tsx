import React from 'react';
import Link from 'next/link';
import { faqCategories } from '@/data/faqData';
import FAQSection from '@/components/FAQSection';

export default function FAQPage() {
    return (
        <div className="pt-32 pb-24 bg-[#030712] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    
                    {/* Left Navigation Sidebar - Static on Server */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32">
                            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 text-blue-500">Support Center</h3>
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
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 font-bold group-hover:bg-blue-400 transition-colors" />
                                    Read Terms of Service
                                </Link>
                                <Link href="/privacy-policy" className="flex items-center gap-3 text-slate-500 hover:text-slate-300 text-sm transition-colors group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 font-bold group-hover:bg-blue-400 transition-colors" />
                                    Read Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-wider text-blue-400 mb-6">
                             Frequently Asked Questions
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Support & FAQs.</h1>
                        
                        <div className="text-lg text-slate-400 mb-12 leading-relaxed bg-white/[0.02] border border-white/5 p-6 rounded-xl">
                            <p>Find quick answers about Mapifyit. If you need more help, contact our team.</p>
                        </div>
                        
                        <div className="space-y-16">
                            {faqCategories.map((category, index) => (
                                <FAQSection 
                                    key={category.id} 
                                    categoryId={category.id} 
                                    defaultOpen={index === 0} 
                                />
                            ))}

                            <section className="pt-8 mt-12 border-t border-white/10">
                                <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Still have questions?</h3>
                                            <p className="text-slate-400 text-sm md:text-base">Can&apos;t find the answer you&apos;re looking for? Please contact our friendly team.</p>
                                        </div>
                                    </div>
                                    <Link 
                                        href="/contact-us" 
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0"
                                    >
                                        Get in touch
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
            {/* Native FAQ Accordion styles localized to this page only to avoid touching globals.css */}
            <style dangerouslySetInnerHTML={{ __html: `
                details summary::-webkit-details-marker { display: none; }
                details summary { list-style: none; }
            `}} />
        </div>
    );
}


