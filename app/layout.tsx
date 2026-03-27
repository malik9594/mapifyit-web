import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GlobalMapPrewarmer from "@/components/GlobalMapPrewarmer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mapifyit | Enterprise Location Intelligence Platform",
    template: "%s | Mapifyit",
  },
  description:
    "Mapifyit is an enterprise-grade mapping and location intelligence platform built for accuracy, control, and mission-critical scale. Deploy sovereign GIS, fleet tracking, field force management, and identity verification on your own infrastructure.",
  keywords: [
    "location intelligence",
    "GIS platform",
    "enterprise mapping",
    "fleet management system",
    "field force tracking",
    "eKYC identity verification",
    "spatial analytics",
    "on-premise mapping",
    "geofencing",
    "route optimization",
    "Mapifyit",
  ],
  authors: [{ name: "Mapifyit" }],
  creator: "Mapifyit",
  publisher: "Mapifyit",
  metadataBase: new URL("https://mapifyit.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mapifyit.com",
    siteName: "Mapifyit",
    title: "Mapifyit | Enterprise Location Intelligence Platform",
    description:
      "Sovereign enterprise mapping, GIS analytics, fleet tracking, and identity verification. Built for performance. Priced for control.",
    images: [
      {
        url: "/fullwhitebackground logo.png",
        width: 1200,
        height: 630,
        alt: "Mapifyit – Enterprise Location Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapifyit | Enterprise Location Intelligence",
    description:
      "Sovereign enterprise mapping, GIS analytics, fleet tracking, and identity verification. Built for performance. Priced for control.",
    images: ["/fullwhitebackground logo.png"],
    creator: "@mapifyit",
  },
  icons: {
    icon: [
      { url: "/fullwhitebackground logo.png", sizes: "16x16", type: "image/png" },
      { url: "/fullwhitebackground logo.png", sizes: "32x32", type: "image/png" },
      { url: "/fullwhitebackground logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/fullwhitebackground logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mapifyit.com",
  },
  verification: {
    google: "google4db3520bca7d7de0", // Search Console Verification
  },
};

import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        {/* Preconnect to speed up initial Mapifyit API handshakes */}
        <link rel="preconnect" href="https://client.mapifyit.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://tiles.mapifyit.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://client.mapifyit.com" />
        <link rel="dns-prefetch" href="https://tiles.mapifyit.com" />

        {/* Global JSON-LD: Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://mapifyit.com/#organization",
                  name: "Mapifyit",
                  url: "https://mapifyit.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://mapifyit.com/fullwhitebackground logo.png",
                  },
                  sameAs: ["https://twitter.com/mapifyit"],
                  description:
                    "Enterprise-grade mapping and location intelligence platform. Deploy sovereign GIS, fleet tracking, field force management, and identity verification.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://mapifyit.com/#website",
                  url: "https://mapifyit.com",
                  name: "Mapifyit",
                  publisher: {
                    "@id": "https://mapifyit.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://mapifyit.com/?s={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 overflow-x-hidden`}
      >
        <div className="min-h-screen bg-[#03060D] text-slate-300 font-sans">
          <Navbar />
          <GlobalMapPrewarmer />
          {children}
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
