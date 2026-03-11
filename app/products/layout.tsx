import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products – Enterprise Mapping & Geospatial Solutions",
    description:
        "Explore Mapifyit's full product portfolio including the Maps API, GIS Intelligence, FMS FleetSense, Next-Gen eKYC, and Field Force Tracking. Enterprise solutions built for accuracy and control.",
    keywords: [
        "Mapifyit products",
        "enterprise mapping products",
        "GIS product",
        "fleet management product",
        "eKYC product",
        "field force product",
        "location intelligence products",
        "mapping platform solutions",
        "geospatial product suite",
        "enterprise software products",
    ],
    openGraph: {
        title: "Products | Mapifyit",
        description:
            "Explore Mapifyit's full portfolio: Maps API, GIS Intelligence, FMS FleetSense, eKYC, and Field Force Tracking.",
        url: "https://mapifyit.com/products",
    },
    twitter: {
        title: "Products | Mapifyit",
        description:
            "Explore Mapifyit's full portfolio: Maps API, GIS Intelligence, FMS FleetSense, eKYC, and Field Force Tracking.",
    },
    alternates: {
        canonical: "https://mapifyit.com/products",
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
