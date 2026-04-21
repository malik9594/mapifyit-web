import { NextResponse } from 'next/server';

/**
 * Sitemap for mapifyit.com
 * Includes all main pages and dynamic links.
 * Styled with /sitemap.xsl for premium browser viewing.
 */

const baseUrl = "https://mapifyit.com";

const pages = [
  { url: "", changeFrequency: "weekly", priority: 1.0 },
  { url: "/fleet-management-system", changeFrequency: "monthly", priority: 0.9 },
  { url: "/field-force-tracking", changeFrequency: "monthly", priority: 0.9 },
  { url: "/fieldforce", changeFrequency: "monthly", priority: 0.8 },
  { url: "/ngekyc", changeFrequency: "monthly", priority: 0.8 },
  { url: "/maps", changeFrequency: "monthly", priority: 0.9 },
  { url: "/gis", changeFrequency: "monthly", priority: 0.9 },
  { url: "/gismap", changeFrequency: "monthly", priority: 0.8 },
  { url: "/routing", changeFrequency: "monthly", priority: 0.8 },
  { url: "/sdks", changeFrequency: "monthly", priority: 0.8 },
  { url: "/products", changeFrequency: "monthly", priority: 0.8 },
  { url: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { url: "/contact-us", changeFrequency: "monthly", priority: 0.7 },
  { url: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { url: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  { url: "/faqs", changeFrequency: "weekly", priority: 0.8 },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  // Use a stable ISO date for the current build
  const lastMod = new Date().toISOString(); 
  
  const entries = pages.map(page => `
  <url>
    <loc>${escapeXml(`${baseUrl}${page.url}`)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`).join('');

  const xslPI = `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xslPI}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
