import { HelpCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import React from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  iconId: 'general' | 'features' | 'platform';
  colorClass: string;
  faqs: FAQ[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General Overview",
    iconId: 'general',
    colorClass: "text-blue-400",
    faqs: [
      {
        question: "What is MapifyIt?",
        answer: "MapifyIt is an AI-powered mapping and GIS platform for enterprise location intelligence."
      },
      {
        question: "How is MapifyIt different from Google Maps or other providers?",
        answer: "Unlike traditional map providers, MapifyIt offers deep localization, offline-first functionality, data sovereignty, and flexible deployment."
      },
      {
        question: "What industries can use MapifyIt?",
        answer: "MapifyIt is suitable for logistics, smart cities, defense, enterprise software, and mobility/transportation."
      }
    ]
  },
  {
    id: "features",
    title: "Features & Technology",
    iconId: 'features',
    colorClass: "text-indigo-400",
    faqs: [
      {
        question: "What are the main features of MapifyIt?",
        answer: "MapifyIt offers mapping, GIS visualization, search, routing, real-time tracking, and AI spatial intelligence."
      },
      {
        question: "Can MapifyIt work without internet?",
        answer: "Yes, MapifyIt is designed to work in low-bandwidth or offline environments, ideal for remote or secure operations."
      }
    ]
  },
  {
    id: "platform",
    title: "Platform & Pricing",
    iconId: 'platform',
    colorClass: "text-emerald-400",
    faqs: [
      {
        question: "Is MapifyIt scalable?",
        answer: "Yes, MapifyIt is built for massive enterprise-level operations with modular pricing."
      },
      {
        question: "How does pricing work?",
        answer: "MapifyIt uses transparent, usage-based pricing with no hidden costs."
      }
    ]
  }
];
