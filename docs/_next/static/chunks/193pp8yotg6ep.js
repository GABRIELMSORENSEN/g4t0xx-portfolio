(function () {
  function rescue() {
    document.querySelectorAll(".portfolio-opening-overlay").forEach(function (node) {
      node.remove();
    });
    document
      .querySelectorAll('main > div[class*="fixed"][class*="inset-0"], body > div[class*="fixed"][class*="inset-0"]')
      .forEach(function (node) {
        node.remove();
      });
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
    document.body.style.color = "#fff";
  }
  rescue();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rescue, { once: true });
  }
  setTimeout(rescue, 250);
  setTimeout(rescue, 1000);
})();
