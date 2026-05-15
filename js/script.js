import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
import { renderProductCard } from "../components/productCard.js";
import { renderCategoryCard } from "../components/categoryCard.js";

const productGrid = document.querySelector("#product-grid");
const categoryGrid = document.querySelector("#category-grid");
const filterBar = document.querySelector("#product-filters");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const categoriesForFilter = ["Todos", ...new Set(products.map((product) => product.category))];

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
