import { brands } from "../data/brands.js";

export function BrandSlider() {
  return `
    <div class="hero-slider" aria-label="Slider de marcas em destaque">
      ${brands.map((brand, index) => `
        <article class="slide ${index === 0 ? "is-active" : ""}" data-slide style="background-image: url('${brand.banner}');">
          <div class="slide-content">
            <span class="slide-brand">${brand.name}</span>
            <strong>${brand.headline}</strong>
            <span>${brand.description}</span>
          </div>
        </article>
      `).join("")}

      <div class="slider-controls" aria-hidden="true">
        ${brands.map((_, index) => `
          <button class="dot ${index === 0 ? "is-active" : ""}" type="button" data-dot></button>
        `).join("")}
      </div>
    </div>
  `;
}
