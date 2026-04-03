import React from 'react';
import { faqCategories } from '@/data/faqData';

interface FAQSectionProps {
  categoryId: string;
  defaultOpen?: boolean;
}

/**
 * Server component version of the FAQ accordion.
 * Uses native <details>/<summary> so no client-side JS or hydration is needed.
 */
export default function FAQSection({ categoryId, defaultOpen = false }: FAQSectionProps) {
  const category = faqCategories.find((c) => c.id === categoryId);
  if (!category) return null;

  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs text-blue-300">
          FAQ
        </div>
        <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
      </div>

      <div className="space-y-4 lg:pl-11">
        {category.faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group border border-white/5 rounded-xl bg-white/5 open:bg-blue-500/5 open:border-blue-500/30 transition-colors duration-300"
            open={defaultOpen && index === 0}
          >
            <summary className="list-none cursor-pointer px-5 py-4 flex items-center justify-between text-left text-white text-base md:text-lg font-medium">
              <span>{faq.question}</span>
              <span className="text-slate-400 transition-transform duration-300 group-open:rotate-180">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-400 leading-relaxed text-sm md:text-base">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
