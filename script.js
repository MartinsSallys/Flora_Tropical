// Home Page - Controller
class HomePage {
  constructor() {
    this.currentCategory = 'Todos';
    this.isLoading = false;

    this.init();
  }

  async init() {
    setupHeroCarousel();
    await this.loadProducts();
    await this.loadCategories();
    await this.setupEventListeners();
  }

  async loadProducts() {
    const grid = document.querySelector('#product-grid');
    if (!grid) return;

    grid.innerHTML = LoadingSpinner.render();

    try {
      const response = await apiService.getProducts();
      this.renderProducts(response.items);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      grid.innerHTML = ErrorAlert.render(error.message);
    }
  }

  renderProducts(products) {
    const grid = document.querySelector('#product-grid');
    if (!grid) return;

    if (!products.length) {
      grid.innerHTML = EmptyState.render('Nenhum produto encontrado');
      return;
    }

    grid.innerHTML = products
      .slice(0, 4)
      .map(p => ProductCard.render(p))
      .join('');
  }

  async loadCategories() {
    const grid = document.querySelector('#category-grid');
    if (!grid) return;

    grid.innerHTML = LoadingSpinner.render();

    try {
      const response = await apiService.getCategories();
      this.renderCategories(response.items);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      grid.innerHTML = ErrorAlert.render(error.message);
    }
  }

  renderCategories(categories) {
    const grid = document.querySelector('#category-grid');
    if (!grid) return;

    if (!categories.length) {
      grid.innerHTML = EmptyState.render('Nenhuma categoria encontrada');
      return;
    }

    grid.innerHTML = categories
      .map(c => CategoryCard.render(c))
      .join('');
  }

  async setupEventListeners() {
    // Filtros de produtos (se houver)
    const filterBar = document.querySelector('#product-filters');
    if (filterBar) {
      filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-category]');
        if (btn) {
          this.currentCategory = btn.dataset.category;
          this.loadProducts();
        }
      });
    }

    // Menu mobile
    setupMobileMenu();
  }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
  });
} else {
  new HomePage();
}

