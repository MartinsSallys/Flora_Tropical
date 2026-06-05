// Página de Produtos - Controller
class ProductsPage {
  constructor() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.currentCategory = 'Todos';
    this.searchQuery = '';
    this.products = [];
    this.isLoading = false;
    this.error = null;

    this.init();
  }

  async init() {
    this.attachEventListeners();
    await this.loadCategories();
    await this.loadProducts();
  }

  attachEventListeners() {
    // Filtros
    const filterBar = document.querySelector('#product-filters');
    if (filterBar) {
      filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-category]');
        if (btn) {
          this.currentCategory = btn.dataset.category;
          this.currentPage = 1;
          this.loadProducts();
        }
      });
    }

    // Busca
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.searchQuery = searchForm.querySelector('input').value;
        this.currentPage = 1;
        this.loadProducts();
      });
    }

    // Paginação
    const productGrid = document.querySelector('#product-grid');
    if (productGrid) {
      productGrid.addEventListener('click', (e) => {
        const paginationBtn = e.target.closest('[data-page]');
        if (paginationBtn) {
          this.currentPage = parseInt(paginationBtn.dataset.page);
          this.loadProducts();
        }
      });
    }
  }

  async loadCategories() {
    try {
      const response = await apiService.getCategories();
      this.renderFilters(response.items);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  renderFilters(categories) {
    const filterBar = document.querySelector('#product-filters');
    if (!filterBar) return;

    const uniqueCategories = ['Todos', ...new Set(categories.map(c => c.name))];
    filterBar.innerHTML = uniqueCategories.map((category, index) => `
      <button class="filter-button ${index === 0 ? 'is-active' : ''}" type="button" data-category="${category}">
        ${category}
      </button>
    `).join('');
  }

  async loadProducts() {
    this.isLoading = true;
    this.error = null;
    this.renderLoadingState();

    try {
      let response;

      if (this.searchQuery) {
        response = await apiService.searchProducts(this.searchQuery);
      } else {
        response = await apiService.getProducts({
          category: this.currentCategory,
          page: this.currentPage,
          pageSize: this.pageSize,
        });
      }

      this.products = response.items;
      this.renderProducts(response);
    } catch (error) {
      this.error = error.message;
      this.renderErrorState();
    } finally {
      this.isLoading = false;
    }
  }

  renderLoadingState() {
    const grid = document.querySelector('#product-grid');
    if (grid) {
      grid.innerHTML = LoadingSpinner.render();
    }
  }

  renderErrorState() {
    const grid = document.querySelector('#product-grid');
    if (grid) {
      grid.innerHTML = ErrorAlert.render(this.error);
    }
  }

  renderProducts(response) {
    const grid = document.querySelector('#product-grid');
    if (!grid) return;

    if (!this.products.length) {
      grid.innerHTML = EmptyState.render('Nenhum produto encontrado');
      return;
    }

    let html = this.products.map(p => ProductCard.render(p)).join('');

    if (response.pages && response.pages > 1) {
      html += Pagination.render(response.page, response.pages);
    }

    grid.innerHTML = html;
    this.attachProductEventListeners();
  }

  attachProductEventListeners() {
    const grid = document.querySelector('#product-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const quickViewBtn = e.target.closest('.quick-view-btn');
      if (quickViewBtn) {
        const productId = quickViewBtn.dataset.productId;
        this.showProductModal(productId);
      }

      const addCartBtn = e.target.closest('.btn-add-cart');
      if (addCartBtn) {
        const productId = addCartBtn.dataset.productId;
        this.addToCart(productId);
      }
    });
  }

  showProductModal(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    console.log('Mostrar modal do produto:', product);
    // Implementar modal de visualização rápida
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    console.log('Adicionar ao carrinho:', product);
    // Implementar lógica de carrinho
  }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();
    setupMobileMenu();
  });
} else {
  new ProductsPage();
  setupMobileMenu();
}
