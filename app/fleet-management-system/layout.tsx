import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FMS Fleet Sense – Real-Time Fleet Management System",
    description:
        "Mapifyit FMS FleetSense provides sub-meter GPS tracking, fuel monitoring, driver behavior analytics, and AI-driven predictive maintenance in a unified enterprise fleet management dashboard.",
    keywords: [
        "fleet management system",
        "GPS vehicle tracking",
        "real-time fleet tracking",
        "fuel monitoring",
        "driver behavior analytics",
        "telematics platform",
        "predictive maintenance",
        "route optimization fleet",
        "enterprise fleet software",
        "FMS fleet sense",
    ],
    openGraph: {
        title: "FMS FleetSense – Fleet Management System | Mapifyit",
        description:
            "Monitor, optimize, and secure your entire fleet in real-time with sub-meter GPS accuracy, predictive maintenance, and driver performance analytics.",
        url: "https://mapifyit.com/fleet-management-system",
    },
    twitter: {
        title: "FMS FleetSense – Fleet Management System | Mapifyit",
        description:
            "Monitor, optimize, and secure your entire fleet in real-time with sub-meter GPS accuracy, predictive maintenance, and driver performance analytics.",
    },
    alternates: {
        canonical: "https://mapifyit.com/fleet-management-system",
    },
};

export default function FMSLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
