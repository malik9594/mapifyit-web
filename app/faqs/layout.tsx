import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Support & Frequently Asked Questions | Mapifyit",
  description: "Find answers to common questions about Mapifyit's enterprise mapping, GIS, and location intelligence solutions. Learn about pricing, integration, and platform capabilities.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is MapifyIt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MapifyIt is an AI-powered mapping and GIS platform that helps businesses build, analyze, and scale location-based solutions using advanced geospatial intelligence."
      }
    },
    {
      "@type": "Question",
      "name": "How is MapifyIt different from Google Maps or other providers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike traditional map providers, MapifyIt offers deep localization, offline-first functionality, full data ownership (data sovereignty), and flexible deployment options including cloud, on-premise, or private cloud."
      }
    },
    {
      "@type": "Question",
      "name": "Is MapifyIt scalable for large businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MapifyIt is built for massive scalability and can support both startups and enterprise-level operations with flexible infrastructure and modular pricing."
      }
    }
  ]
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
