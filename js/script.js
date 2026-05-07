document.addEventListener("DOMContentLoaded", () => {
  const tourSection = document.querySelector(".virtual-tour-section");

  if (tourSection) {
    window.addEventListener("scroll", () => {
      const rect = tourSection.getBoundingClientRect();
      const offset = Math.round(rect.top * -0.035);
      tourSection.style.setProperty("--tour-parallax", `${offset}px`);
    }, { passive: true });
  }
});
