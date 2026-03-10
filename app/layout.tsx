import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mapifyit",
  description: "Enterprise mapping and location intelligence platform...",
  icons: {
    icon: [
      { url: "/fullwhitebackground logo.png", sizes: "16x16", type: "image/png" },
      { url: "/fullwhitebackground logo.png", sizes: "32x32", type: "image/png" },
      { url: "/fullwhitebackground logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/fullwhitebackground logo.png", // for iOS Safari
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 overflow-x-hidden`}
      >
        <div className="min-h-screen bg-[#03060D] text-slate-300 font-sans">
          <Navbar />
          {children}
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
