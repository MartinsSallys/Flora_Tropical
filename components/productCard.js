export function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function renderProductCard(product) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const origin = product.tags?.[0] || product.category;

  return `
    <article class="product-card-premium" data-category="${product.category}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-badge premium-badge">${product.isPremium ? "Premium" : product.category}</span>
        <div class="product-overlay">
          <button class="quick-view-btn" type="button">Visualizar rápido</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-rating">
          <span class="stars" aria-label="Avaliação ${product.rating} de 5">★★★★★</span>
          <span class="rating-count">${product.rating} (${product.reviews})</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-meta-line">
          <span>${origin}</span>
          <span>${product.category}</span>
        </div>
        <div class="product-pricing">
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ""}
          <span class="price-current">${formatPrice(product.price)}</span>
          ${discount ? `<span class="price-discount">-${discount}%</span>` : ""}
        </div>
        <button class="btn-add-cart" type="button">Adicionar ao Carrinho</button>
      </div>
    </article>
  `;
}
