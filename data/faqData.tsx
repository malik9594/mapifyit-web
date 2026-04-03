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
        answer: "An AI-powered mapping and GIS platform for enterprise location intelligence."
      },
      {
        question: "How is MapifyIt different from Google Maps or other providers?",
        answer: "We focus on localization, offline-first use, data sovereignty, and flexible deployment."
      },
      {
        question: "What industries can use MapifyIt?",
        answer: "Logistics, smart cities, defense, enterprise apps, and mobility."
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
        answer: "Mapping, GIS visualization, search, routing, live tracking, and AI spatial intelligence."
      },
      {
        question: "Can MapifyIt work without internet?",
        answer: "Yes. It runs in low-bandwidth or offline environments for remote or secure ops."
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
        answer: "Yes. Built for large enterprise workloads."
      },
      {
        question: "How does pricing work?",
        answer: "Transparent, usage-based pricing with no hidden costs."
      }
    ]
  }
];
