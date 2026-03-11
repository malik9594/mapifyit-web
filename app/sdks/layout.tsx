import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SDKs & Developer APIs – Build with Mapifyit",
    description:
        "Mapifyit SDKs for web and mobile developers. Integrate sovereign mapping, geospatial analytics, routing, and location intelligence directly into your applications with comprehensive APIs.",
    keywords: [
        "mapping SDK",
        "geospatial API",
        "location intelligence SDK",
        "web maps SDK",
        "mobile maps API",
        "GIS API developer",
        "routing API SDK",
        "maps developer tools",
        "spatial API integration",
        "Mapifyit SDK",
    ],
    openGraph: {
        title: "SDKs & Developer APIs | Mapifyit",
        description:
            "Integrate sovereign mapping, GIS analytics, and routing directly into your applications with Mapifyit SDKs.",
        url: "https://mapifyit.com/sdks",
    },
    twitter: {
        title: "SDKs & Developer APIs | Mapifyit",
        description:
            "Integrate sovereign mapping, GIS analytics, and routing directly into your applications with Mapifyit SDKs.",
    },
    alternates: {
        canonical: "https://mapifyit.com/sdks",
    },
};

export default function SDKsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
