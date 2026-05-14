export function renderCategoryCard(category) {
  return `
    <article class="category-card">
      <div class="category-image">
        <img src="${category.image}" alt="${category.name}" loading="lazy" />
      </div>
      <div class="category-body">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <a class="button button-secondary" href="#produtos">Ver seleção</a>
      </div>
    </article>
  `;
}
