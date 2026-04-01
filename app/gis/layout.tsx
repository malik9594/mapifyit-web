import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "GIS Intelligence & Spatial Analytics",
    description:
        "Mapifyit GIS Intelligence delivers high-precision terrain modeling, demographic analysis, DEM/LiDAR processing, and real-time infrastructure mapping for enterprise organizations.",
    keywords: [
        "GIS platform",
        "spatial analytics",
        "terrain modeling",
        "DEM LiDAR processing",
        "geographic information system",
        "infrastructure mapping",
        "enterprise GIS",
        "remote sensing",
        "heatmaps",
        "geospatial intelligence",
    ],
    openGraph: {
        title: "GIS Intelligence | Mapifyit",
        description:
            "Transform complex geospatial data into actionable intelligence with high-precision terrain modeling and real-time infrastructure mapping.",
        url: "https://mapifyit.com/gis",
    },
    twitter: {
        title: "GIS Intelligence | Mapifyit",
        description:
            "Transform complex geospatial data into actionable intelligence with high-precision terrain modeling and real-time infrastructure mapping.",
    },
    alternates: {
        canonical: "https://mapifyit.com/gis",
    },
};

export default function GISLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
