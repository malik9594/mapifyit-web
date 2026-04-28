"use client";
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="mb-6 border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 md:p-8 text-left flex justify-between items-center group transition-colors hover:bg-white/5"
            >
                <span className="text-white font-semibold text-lg md:text-xl leading-snug">{question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 group-hover:text-white'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 md:px-8 pb-8 pt-0 text-slate-400 leading-relaxed text-base md:text-lg">
                    {answer}
                </div>
            </div>
        </div>
    );
};
