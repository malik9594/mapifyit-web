import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next-Gen eKYC – AI Identity Verification Platform",
    description:
        "Mapifyit ngeKYC provides sovereign AI-powered identity verification with biometric face matching, document OCR, liveness detection, and anti-spoofing — deployed 100% on your own infrastructure.",
    keywords: [
        "eKYC identity verification",
        "biometric authentication",
        "face matching AI",
        "document OCR",
        "liveness detection",
        "anti-spoofing",
        "on-premise KYC",
        "customer onboarding",
        "identity verification platform",
        "data sovereignty KYC",
    ],
    openGraph: {
        title: "Next-Gen eKYC – Identity Verification | Mapifyit",
        description:
            "Sovereign AI identity verification with biometric face matching, OCR, and liveness detection — deployed entirely on your infrastructure.",
        url: "https://mapifyit.com/ngekyc",
    },
    twitter: {
        title: "Next-Gen eKYC – Identity Verification | Mapifyit",
        description:
            "Sovereign AI identity verification with biometric face matching, OCR, and liveness detection — deployed entirely on your infrastructure.",
    },
    alternates: {
        canonical: "https://mapifyit.com/ngekyc",
    },
};

export default function NgeKYCLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
