import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  metadataBase: new URL("https://mapifyit.com"),
  openGraph: {
    type: "website",
    url: "https://mapifyit.com",
    siteName: "Mapifyit",
    title: "Mapifyit | Enterprise Location Intelligence Platform",
    description:
      "Sovereign enterprise mapping, GIS analytics, fleet tracking, and identity verification. Built for performance. Priced for control.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapifyit | Enterprise Location Intelligence",
    description:
      "Sovereign enterprise mapping, GIS analytics, fleet tracking, and identity verification. Built for performance. Priced for control.",
  },
  icons: {
    icon: [{ url: "/fullwhitebackground logo.png", sizes: "192x192", type: "image/png" }],
    apple: "/fullwhitebackground logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mapifyit.com",
  },
  verification: {
    google: "google4db3520bca7d7de0", // Google Search Console
    other: {
      "msvalidate.01": "03109F26A544DA03DF743844C7E17EAE", // Bing Webmaster Tools verification
    },
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
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 overflow-x-hidden`}
      >
        <div className="min-h-screen bg-[#03060D] text-slate-300 font-sans">
          <Navbar />
          {children}
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
