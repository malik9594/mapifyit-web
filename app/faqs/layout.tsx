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
        "text": "MapifyIt is an AI-powered mapping and GIS platform for enterprise location intelligence."
      }
    },
    {
      "@type": "Question",
      "name": "Is MapifyIt scalable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MapifyIt is built for massive enterprise scalability and mission-critical operations."
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
