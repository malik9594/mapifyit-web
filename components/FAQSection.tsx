"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqCategories } from '@/data/faqData';

interface FAQSectionProps {
  categoryId: string;
  defaultOpen?: boolean;
}

export default function FAQSection({ categoryId, defaultOpen = false }: FAQSectionProps) {
  // We import the data directly into the client component
  // This ensures the data is in the JS bundle, NOT "inline" in the HTML for serialization.
  const category = faqCategories.find(c => c.id === categoryId);
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ? 0 : null);

  if (!category) return null;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${category.colorClass}`}>
          {category.icon}
        </div>
        <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
      </div>
      
      <div className="space-y-4 lg:pl-11">
        {category.faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div 
              key={index}
              initial={false}
              animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}
              className={`border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-blue-500/30' : 'border-white/5 hover:border-white/10'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
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
  );
}
