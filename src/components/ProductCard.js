export function ProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-image" style="background-image: url('${product.image}');"></div>
      <div class="product-info">
        <div class="product-meta">
          <span>${product.category}</span>
          <span class="badge">${product.badge}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price-row">
          <span class="price">${product.price}</span>
          <button class="add-button" type="button" aria-label="Adicionar ${product.name}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}
