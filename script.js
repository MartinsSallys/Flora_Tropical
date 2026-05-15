const products = [
  {
    id: "001",
    name: "Boné Raw",
    category: "Bonés",
    description: "Boné Raw de excelente qualidade, selecionado para conforto.",
    price: 125.9,
    originalPrice: 155.9,
    image: "assets/produto_2.jpg",
    rating: 4.8,
    reviews: 24,
    isPremium: true,
    tags: ["importado", "premium", "exclusivo"]
  },
  {
    id: "002",
    name: "Sedas Bem Bolado Pack",
    category: "Sedas Premium",
    description: "Pack de sedas e filtros para rotina prática, elegante e confiável.",
    price: 24.9,
    originalPrice: null,
    image: "assets/sedas.jpg",
    rating: 4.7,
    reviews: 38,
    isPremium: false,
    tags: ["sedas", "nacional"]
  },
  {
    id: "003",
    name: "Shoulder Bag Sadhu",
    category: "Acessórios",
    description: "Acessório funcional com estética urbana e acabamento de alto padrão.",
    price: 89.9,
    originalPrice: 109.9,
    image: "assets/shoulder_bag.jpg",
    rating: 4.9,
    reviews: 16,
    isPremium: true,
    tags: ["acessório", "lifestyle"]
  },
  {
    id: "004",
    name: "Kit Starter Tropical",
    category: "Artigos Especiais",
    description: "Curadoria de itens essenciais para presentear ou iniciar uma seleção premium.",
    price: 119.9,
    originalPrice: null,
    image: "assets/camisas.jpg",
    rating: 4.6,
    reviews: 19,
    isPremium: true,
    tags: ["kit", "presente"]
  }
];

const categories = [
  {
    name: "Bonés",
    description: "Melhor conforto e estilo",
    image: "assets/produto_2.jpg"
  },
  {
    name: "Tabacos Premium",
    description: "Produtos escolhidos por qualidade, origem e experiência.",
    image: "assets/bob.jpg"
  },
  {
    name: "Acessórios",
    description: "Itens funcionais com acabamento sofisticado para o dia a dia.",
    image: "assets/shoulder_bag.jpg"
  },
  {
    name: "Artigos Especiais",
    description: "Presentes, kits e peças com apelo exclusivo.",
    image: "assets/sedas.jpg"
  }
];

const productGrid = document.querySelector("#product-grid");
const categoryGrid = document.querySelector("#category-grid");
const filterBar = document.querySelector("#product-filters");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const categoriesForFilter = ["Todos", ...new Set(products.map((product) => product.category))];

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function renderProductCard(product) {
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

function renderCategoryCard(category) {
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

function renderProducts(category = "Todos") {
  const filteredProducts = category === "Todos"
    ? products
    : products.filter((product) => product.category === category);

  productGrid.innerHTML = filteredProducts.map(renderProductCard).join("");
}

function renderFilters() {
  filterBar.innerHTML = categoriesForFilter.map((category, index) => `
    <button class="filter-button ${index === 0 ? "is-active" : ""}" type="button" data-category="${category}">
      ${category}
    </button>
  `).join("");

  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    document.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    renderProducts(button.dataset.category);
  });
}

function renderCategories() {
  const productCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});

  categoryGrid.innerHTML = categories.map((category) => renderCategoryCard({
    ...category,
    productCount: productCounts[category.name] || 0
  })).join("");
}

function setupMobileMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

renderFilters();
renderProducts();
renderCategories();
setupMobileMenu();
