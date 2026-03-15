import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FFT – Field Force Tracking & Mobile Workforce Visibility",
    description:
        "Mapifyit Field Force Tracking (FFT) provides real-time agent monitoring, geofence-based attendance, and mobile task dispatch to maximize field team productivity and operational efficiency.",
    keywords: [
        "field force tracking",
        "FFT",
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
        title: "FFT | Field Force Tracking | Mapifyit",
        description:
            "Track live agent movements, automate attendance with geofencing, and optimize task distribution for mobile field teams.",
        url: "https://mapifyit.com/fft",
    },
    twitter: {
        title: "FFT | Field Force Tracking | Mapifyit",
        description:
            "Track live agent movements, automate attendance with geofencing, and optimize task distribution for mobile field teams.",
    },
    alternates: {
        canonical: "https://mapifyit.com/fft",
    },
};

export default function FFTLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
