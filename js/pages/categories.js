// Página de Categorias - Controller
class CategoriesPage {
  constructor() {
    this.isLoading = false;
    this.error = null;

    this.init();
  }

  async init() {
    await this.loadCategories();
  }

  async loadCategories() {
    this.isLoading = true;
    const grid = document.querySelector('#category-grid');

    if (grid) {
      grid.innerHTML = LoadingSpinner.render();
    }

    try {
      const response = await apiService.getCategories();
      this.renderCategories(response.items);
    } catch (error) {
      this.error = error.message;
      if (grid) {
        grid.innerHTML = ErrorAlert.render(this.error);
      }
    } finally {
      this.isLoading = false;
    }
  }

  renderCategories(categories) {
    const grid = document.querySelector('#category-grid');
    if (!grid) return;

    if (!categories.length) {
      grid.innerHTML = EmptyState.render('Nenhuma categoria encontrada');
      return;
    }

    grid.innerHTML = categories.map(c => CategoryCard.render(c)).join('');
  }
}

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CategoriesPage();
    setupMobileMenu();
  });
} else {
  new CategoriesPage();
  setupMobileMenu();
}
