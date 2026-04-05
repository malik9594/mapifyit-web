import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise GIS Core – Spatial Analysis & Map Rendering",
  description:
    "High-precision spatial analysis, real-time map rendering, and fully secure GIS deployment frameworks for mission-critical geospatial operations. Enterprise GIS infrastructure by Mapifyit.",
  keywords: [
    "enterprise GIS",
    "spatial analysis",
    "GIS platform",
    "geospatial infrastructure",
    "map rendering",
    "GIS deployment",
    "Mapifyit GIS",
  ],
  openGraph: {
    title: "Enterprise GIS Core | Mapifyit",
    description:
      "High-precision spatial analysis and real-time map rendering with secure deployment frameworks for mission-critical operations.",
    url: "https://mapifyit.com/gismap",
  },
  alternates: {
    canonical: "https://mapifyit.com/gismap",
  },
};

export default function GISMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
