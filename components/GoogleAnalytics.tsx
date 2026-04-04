"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID || "G-33X05V9FEN";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="lazyOnload"
      />
      <Script
        src={`/scripts/google-analytics-init.js?id=${gaMeasurementId}`}
        strategy="lazyOnload"
      />
    </>
  );
}
