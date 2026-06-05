// Página de Unidades - Controller
class LocationsPage {
  constructor() {
    this.isLoading = false;
    this.error = null;

    this.init();
  }

  async init() {
    await this.loadLocations();
  }

  async loadLocations() {
    this.isLoading = true;
    const grid = document.querySelector('#locations-grid');

    if (grid) {
      grid.innerHTML = LoadingSpinner.render();
    }

    try {
      const response = await apiService.getLocations();
      this.renderLocations(response.items);
    } catch (error) {
      this.error = error.message;
      if (grid) {
        grid.innerHTML = ErrorAlert.render(this.error);
      }
    } finally {
      this.isLoading = false;
    }
  }

  renderLocations(locations) {
    const grid = document.querySelector('#locations-grid');
    if (!grid) return;

    if (!locations.length) {
      grid.innerHTML = EmptyState.render('Nenhuma unidade encontrada');
      return;
    }

    grid.innerHTML = locations.map(l => LocationCard.render(l)).join('');
  }
}

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LocationsPage();
    setupMobileMenu();
  });
} else {
  new LocationsPage();
  setupMobileMenu();
}
