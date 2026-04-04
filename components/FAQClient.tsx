"use client";

import React, { useState } from "react";

export interface CompactFAQ {
  question: string;
  answer: string;
}

interface FAQClientProps {
  faqs: CompactFAQ[];
  title?: string;
  defaultOpenFirst?: boolean;
}

// Ultra-light accordion (no icon library) to keep the client bundle tiny
export default function FAQClient({ faqs, title = "FAQs", defaultOpenFirst = true }: FAQClientProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(
    () =>
      faqs.reduce<Record<string, boolean>>((acc, faq, index) => {
        acc[faq.question] = defaultOpenFirst && index === 0;
        return acc;
      }, {})
  );

  const toggleItem = (question: string) => {
    setOpenItems((prev) => ({ ...prev, [question]: !prev[question] }));
  };

  return (
    <section className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs text-blue-300">
          FAQ
        </div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>

      <div className="space-y-4 lg:pl-11">
        {faqs.map((faq) => {
          const isOpen = !!openItems[faq.question];
          const questionId = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          return (
            <div
              key={faq.question}
              id={questionId}
              className="group border border-white/5 rounded-xl bg-white/5 transition-colors duration-300"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={questionId}
                onClick={() => toggleItem(faq.question)}
                className="w-full px-5 py-4 flex items-center justify-between text-left text-white text-base md:text-lg font-medium"
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div
                  className="px-5 pb-5 text-slate-400 leading-relaxed text-sm md:text-base border-t border-white/5 bg-blue-500/5"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
