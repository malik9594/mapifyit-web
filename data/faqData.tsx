import { HelpCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import React from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  faqs: FAQ[];
}

export const faqCategories: FAQCategory[] = [
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
        answer: "Yes, MapifyIt supports real-time tracking, routing, and monitoring, making it ideal for high-precision fleet management and logistics operations."
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
      }
    ]
  }
];
