import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Scalable Enterprise Mapping Plans",
    description:
        "View Mapifyit's transparent, scale-first pricing for enterprise GIS, fleet management, eKYC, and location intelligence solutions. Deploy flexible infrastructure with predictable costs and no vendor lock-in.",
    keywords: [
        "mapping platform pricing",
        "GIS pricing plans",
        "enterprise location intelligence cost",
        "fleet management pricing",
        "eKYC pricing",
        "pay-as-you-go mapping",
        "on-premise mapping cost",
        "location API pricing",
        "enterprise software plans",
        "Mapifyit pricing",
    ],
    openGraph: {
        title: "Pricing – Scale-First Enterprise Plans",
        description:
            "Transparent, predictable pricing for enterprise mapping, GIS, fleet management, and identity verification. No vendor lock-in.",
        url: "https://mapifyit.com/pricing",
    },
    twitter: {
        title: "Pricing",
        description:
            "Transparent, predictable pricing for enterprise mapping, GIS, fleet management, and identity verification. No vendor lock-in.",
    },
    alternates: {
        canonical: "https://mapifyit.com/pricing",
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
