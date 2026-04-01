import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Field Force Tracking & Mobile Workforce | Mapifyit",
    description:
        "Enterprise-grade Field Force Tracking (FFT) solution with real-time GPS tracking, geofence attendance automation, intelligent task dispatching, and secure on-premises deployment options.",
    keywords: [
        "Field Force Tracking",
        "Mobile Workforce Tracking",
        "Field Employee GPS Tracking",
        "Field Service Workforce Management",
        "Agent Tracking Software",
        "Field Team Tracking System",
        "On-Premises Field Tracking",
        "Secure Workforce Management",
        "Enterprise Data Privacy",
        "Self-Hosted SaaS",
        "FFT",
        "location-based attendance",
        "field operations software",
    ],
    openGraph: {
        title: "FFT | Field Force Tracking | Mapifyit",
        description:
            "Track live agent movements, automate attendance with geofencing, and optimize task distribution for mobile field teams.",
        url: "https://mapifyit.com/field-force-tracking",
    },
    twitter: {
        title: "FFT | Field Force Tracking | Mapifyit",
        description:
            "Track live agent movements, automate attendance with geofencing, and optimize task distribution for mobile field teams.",
    },
    alternates: {
        canonical: "https://mapifyit.com/field-force-tracking",
    },
};

export default function FFTLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
