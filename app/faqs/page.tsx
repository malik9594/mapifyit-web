import React from "react";
import Link from "next/link";
import { faqCategories } from "@/data/faqData";

export const dynamic = "force-static";

export default function FAQPage() {
  return (
    <div className="pt-32 pb-24 bg-[#030712] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Support Center</h3>
              <nav className="flex flex-col space-y-3 font-medium">
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
                <Link
                  href="/terms-of-service"
                  className="flex items-center gap-3 text-slate-500 hover:text-slate-300 text-sm transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-700 font-bold group-hover:bg-blue-400 transition-colors" />
                  Read Terms of Service
                </Link>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-3 text-slate-500 hover:text-slate-300 text-sm transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-700 font-bold group-hover:bg-blue-400 transition-colors" />
                  Read Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content Area - Total Static (Zero Inline JS) */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-wider text-blue-400 mb-6">
              FAQ Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Support & FAQs.</h1>

            <div className="text-lg text-slate-400 mb-12 leading-relaxed bg-white/[0.02] border border-white/5 p-6 rounded-xl">
              <p>Everything you need to know about Mapifyit and our support systems.</p>
            </div>

            <div className="space-y-16">
              {faqCategories.map((category) => (
                <section key={category.id} id={category.id} className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.faqs.map((faq, index) => (
                      <details
                        key={faq.question}
                        className="group border border-white/5 rounded-xl bg-white/[0.02] hover:border-white/10 transition-all duration-300 overflow-hidden"
                        open={index === 0 && category.id === "general"}
                      >
                        <summary className="list-none cursor-pointer flex items-center justify-between p-5 focus:outline-none">
                          <span className="text-base md:text-lg font-medium text-white group-open:text-blue-400 transition-colors pr-8">
                            {faq.question}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-open:bg-blue-500 group-open:text-white group-open:rotate-180 transition-all duration-300">
                             <span className="text-xs group-open:text-white">▼</span>
                          </div>
                        </summary>
                        <div className="px-5 pb-5 text-slate-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <section className="pt-8 mt-12 border-t border-white/10">
                <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-white">
                     <div>
                      <h3 className="text-white font-bold text-lg">Still have questions?</h3>
                      <p className="text-slate-400 text-sm md:text-base">
                        Can&apos;t find the answer you&apos;re looking for? Contact our friendly team.
                      </p>
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
      <style>{`
        details summary::-webkit-details-marker { display: none; }
        details summary { list-style: none; }
      `}</style>
    </div>
  );
}

