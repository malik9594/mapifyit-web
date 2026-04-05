import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Support & Frequently Asked Questions (FAQs) | Mapifyit",
  description: "Find answers to frequently asked questions (FAQs) about Mapifyit's enterprise mapping, GIS, and location intelligence solutions. Learn about pricing, integration, and platform capabilities.",
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        src="/schema/faq.json"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
