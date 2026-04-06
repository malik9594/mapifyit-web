// Server component for Google Analytics

import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = "G-33X05V9FEN"; // Replace with your measurement ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        src="/scripts/google-analytics.js"
        strategy="afterInteractive"
        data-ga-id={GA_MEASUREMENT_ID}
      />
    </>
  );
}
