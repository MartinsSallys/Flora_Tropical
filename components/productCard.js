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

  return `
    <article class="product-card" data-category="${product.category}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="badge ${product.isPremium ? "badge-premium" : ""}">${product.category}</span>
          ${discount ? `<span class="price-badge">-${discount}%</span>` : ""}
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price-box">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ""}
        </div>
        <span class="rating">★★★★★ ${product.rating} (${product.reviews})</span>
        <div class="product-actions">
          <button class="button button-primary" type="button">Adicionar ao Carrinho</button>
        </div>
      </div>
    </article>
  `;
}
