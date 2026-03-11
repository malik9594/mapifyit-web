import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Maps API – High-Resolution Vector & Satellite Tile Rendering",
    description:
        "Mapifyit Maps API renders high-resolution vector and satellite tiles at 60fps. Built for mass-scale web and mobile applications with localized address accuracy across regions.",
    keywords: [
        "maps API",
        "vector tile rendering",
        "satellite tiles",
        "web mapping API",
        "mobile maps SDK",
        "geospatial API",
        "localized maps",
        "enterprise mapping API",
        "60fps tile rendering",
        "custom map styles",
    ],
    openGraph: {
        title: "Maps API | Mapifyit",
        description:
            "Render high-resolution vector and satellite tiles at 60fps for mass-scale web and mobile apps with localized address accuracy.",
        url: "https://mapifyit.com/maps",
    },
    twitter: {
        title: "Maps API | Mapifyit",
        description:
            "Render high-resolution vector and satellite tiles at 60fps for mass-scale web and mobile apps with localized address accuracy.",
    },
    alternates: {
        canonical: "https://mapifyit.com/maps",
    },
};

export default function MapsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
