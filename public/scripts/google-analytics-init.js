(() => {
  const currentScript = document.currentScript;
  const measurementId = currentScript
    ? new URL(currentScript.src).searchParams.get("id")
    : null;

  if (!measurementId) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId, {
    page_path: window.location.pathname,
  });
})();
