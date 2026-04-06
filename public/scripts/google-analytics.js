(function () {
  var currentScript = document.currentScript;
  var measurementId = currentScript && currentScript.dataset
    ? currentScript.dataset.gaId
    : "";

  if (!measurementId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_path: window.location.pathname,
  });
})();
