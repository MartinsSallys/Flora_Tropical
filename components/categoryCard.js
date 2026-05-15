export function renderCategoryCard(category) {
  const productCount = category.productCount ?? 0;
  const productLabel = productCount === 1 ? "1 produto" : `${productCount} produtos`;

  return `
    <article class="category-card">
      <div class="category-image">
        <img src="${category.image}" alt="${category.name}" loading="lazy" />
        <div class="category-overlay">
          <h3 class="category-name">${category.name}</h3>
          <p class="category-count">${productLabel}</p>
        </div>
      </div>
      <div class="category-footer">
        <p class="category-description">${category.description}</p>
        <a class="explore-link" href="#produtos">Explorar categoria</a>
      </div>
    </article>
  `;
}
