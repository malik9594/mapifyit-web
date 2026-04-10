import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Support & Frequently Asked Questions",
  description: "Find answers to frequently asked questions (FAQs) about Mapifyit's enterprise mapping, GIS, and location intelligence solutions. Learn about pricing, integration, and platform capabilities.",
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the JSON-LD schema from the filesystem for SSR inlining
  const schemaPath = path.join(process.cwd(), "public", "schema", "faq.json");
  const schemaContent = fs.readFileSync(schemaPath, "utf8");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaContent }}
      />
      {children}
    </>
  );
}
