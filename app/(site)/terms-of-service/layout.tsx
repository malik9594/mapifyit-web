import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Mapifyit Terms of Service covering use of our APIs, SDKs, mapping platform, data ownership, deployment models, pricing, billing, intellectual property, and liability.",
  openGraph: {
    title: "Terms of Service | Mapifyit",
    description:
      "Terms and conditions governing your use of the Mapifyit enterprise mapping platform, APIs, and services.",
    url: "https://mapifyit.com/terms-of-service",
  },
  alternates: {
    canonical: "https://mapifyit.com/terms-of-service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
