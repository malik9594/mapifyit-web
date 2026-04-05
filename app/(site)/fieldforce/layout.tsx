import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Field Force Tracking – Real-Time Workforce Visibility",
    description:
        "Mapifyit Field Force Tracking provides real-time agent monitoring, geofence-based attendance, and mobile task dispatch to maximize field team productivity and operational efficiency.",
    keywords: [
        "field force tracking",
        "workforce monitoring",
        "real-time agent tracking",
        "geofence attendance",
        "task dispatch software",
        "mobile workforce management",
        "field agent management",
        "location-based attendance",
        "field operations software",
        "enterprise workforce visibility",
    ],
    openGraph: {
        title: "Field Force Tracking | Mapifyit",
        description:
            "Track live agent movements, automate attendance with geofencing, and optimize task distribution for mobile field teams.",
        url: "https://mapifyit.com/fieldforce",
    },
    twitter: {
        title: "Field Force Tracking | Mapifyit",
        description:
            "Track live agent movements, automate attendance with geofencing, and optimize task distribution for mobile field teams.",
    },
    alternates: {
        canonical: "https://mapifyit.com/fieldforce",
    },
};

export default function FieldForceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
