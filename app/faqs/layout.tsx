import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Support & Frequently Asked Questions | Mapifyit",
  description: "Find answers to common questions about Mapifyit's enterprise mapping, GIS, and location intelligence solutions. Learn about pricing, integration, and platform capabilities.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is MapifyIt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An AI-powered mapping and GIS platform for enterprises.",
      },
    },
    {
      "@type": "Question",
      "name": "Can MapifyIt work offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it operates in low-bandwidth or offline environments.",
      },
    },
    {
      "@type": "Question",
      "name": "How is MapifyIt different from Google Maps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It focuses on localization, data control, and flexible deployment.",
      },
    },
    {
      "@type": "Question",
      "name": "Is MapifyIt scalable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Built for large, mission-critical workloads.",
      },
    },
    {
      "@type": "Question",
      "name": "How does pricing work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transparent usage-based pricing.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Inline JSON-LD with a non-blocking strategy to avoid render-blocking external scripts */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
