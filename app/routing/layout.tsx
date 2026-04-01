import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Route Optimization Software | Multi-Stop Routing | Mapifyit",
    description:
        "Mapifyit intelligent routing engine provides multi-stop optimization, real-time traffic pulse monitoring, and cost-per-mile insights to power enterprise logistics and delivery systems.",
    keywords: [
        "route optimization",
        "multi-stop routing",
        "real-time traffic",
        "logistics routing API",
        "delivery route planning",
        "cost-per-mile routing",
        "dynamic re-routing",
        "ETA accuracy",
        "fleet routing",
        "enterprise routing engine",
    ],
    openGraph: {
        title: "Intelligent Routing | Mapifyit",
        description:
            "Multi-stop optimization and real-time traffic monitoring. Build logistics systems that calculate the true cost of distance.",
        url: "https://mapifyit.com/routing",
    },
    twitter: {
        title: "Intelligent Routing | Mapifyit",
        description:
            "Multi-stop optimization and real-time traffic monitoring. Build logistics systems that calculate the true cost of distance.",
    },
    alternates: {
        canonical: "https://mapifyit.com/routing",
    },
};

export default function RoutingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
