import { products } from "../data/products.js";
import { ProductCard } from "../components/ProductCard.js";

export function Products() {
  return `
    <section id="produtos" class="section">
      <div class="section-inner">
        <div class="section-header">
          <div>
            <p class="section-kicker">Produtos em destaque</p>
            <h2>Ofertas organizadas para venda premium.</h2>
          </div>
          <p class="section-copy">Preços visíveis, cards clean e foco na experiência de compra com estilo.</p>
        </div>

        <div class="category-bar" aria-label="Categorias de produtos">
          <span class="category-pill active">Destaques</span>
          <span class="category-pill">Sedas</span>
          <span class="category-pill">Dichavadores</span>
          <span class="category-pill">Glassware</span>
          <span class="category-pill">Acessórios</span>
        </div>

        <div class="product-grid">
          ${products.map(ProductCard).join("")}
        </div>
      </div>
    </section>
  `;
}
