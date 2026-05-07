import { BrandSlider } from "../components/BrandSlider.js";
import { brands } from "../data/brands.js";

export function Home() {
  return `
    <section id="home" class="hero">
      <div class="hero-inner">
        <div>
          <span class="eyebrow">Head shop lifestyle premium</span>
          <h1>Flora Tropical: tabacaria premium com alma tropical.</h1>
          <p class="hero-copy">Espaços pensados para sua rotina, encontros e curadoria de marcas selecionadas em Barra Grande e Parnaíba.</p>
          <div class="red-ribbon">Curadoria premium · atendimento discreto · estilo tropical</div>
          <div class="hero-actions">
            <a class="button button-primary" href="#produtos">
              Ver produtos
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a class="button button-secondary" href="#marcas">Conhecer espaços</a>
          </div>
        </div>
        <div class="hero-art">
          ${BrandSlider()}
        </div>
      </div>
    </section>

    <section id="marcas" class="section">
      <div class="section-inner">
        <div class="section-header">
          <div>
            <p class="section-kicker">Marcas em destaque</p>
            <h2>Seleção de marcas que traduzem qualidade e estilo.</h2>
          </div>
          <p class="section-copy">A curadoria da Flora Tropical une tradição e identidade tropical em produtos e parceiros confiáveis.</p>
        </div>

        <div class="brand-grid">
          ${brands.map((brand) => `
            <article class="brand-card">
              <div class="brand-card-image" style="background-image: url('${brand.image}');"></div>
              <div class="brand-card-body">
                <h3>${brand.name}</h3>
                <p>${brand.shortDescription}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
