import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us – Get in Touch with Mapifyit",
    description:
        "Contact the Mapifyit team for enterprise demos, platform inquiries, partnership opportunities, and technical support for our mapping, GIS, fleet management, and identity verification solutions.",
    keywords: [
        "contact Mapifyit",
        "enterprise mapping demo",
        "GIS platform inquiry",
        "fleet management contact",
        "location intelligence support",
        "Mapifyit sales",
        "mapping platform partnership",
        "get in touch",
        "location API support",
        "enterprise software inquiry",
    ],
    openGraph: {
        title: "Contact Us | Mapifyit",
        description:
            "Get in touch with Mapifyit for enterprise demos, platform inquiries, and technical support.",
        url: "https://mapifyit.com/contactus",
    },
    twitter: {
        title: "Contact Us | Mapifyit",
        description:
            "Get in touch with Mapifyit for enterprise demos, platform inquiries, and technical support.",
    },
    alternates: {
        canonical: "https://mapifyit.com/contactus",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
