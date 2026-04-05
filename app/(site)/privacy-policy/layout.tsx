import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Mapifyit handles your data. Our Privacy Policy outlines data collection, cookies, embedded content, data retention, sharing, and your rights under GDPR and global data protection regulations.",
  openGraph: {
    title: "Privacy Policy | Mapifyit",
    description:
      "Our commitment to data security and user privacy. Read how we handle your data across our enterprise mapping platform.",
    url: "https://mapifyit.com/privacy-policy",
  },
  alternates: {
    canonical: "https://mapifyit.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
