import type { Metadata } from "next";
import "maplibre-gl/dist/maplibre-gl.css";

export const metadata: Metadata = {
    title: "Contact Us – Get in Touch with Mapifyit",
    description:
        "Contact the Mapifyit team for enterprise demos, platform inquiries, partnership opportunities, and technical support for our mapping, GIS, fleet management, and identity verification solutions.",
    alternates: {
        canonical: "https://mapifyit.com/contact-us",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
