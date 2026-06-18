// Página de Cannabis Medicinal - Controller
class MedicinalPage {
  constructor() {
    this.isLoading = false;
    this.error = null;

    this.init();
  }

  async init() {
    await this.loadBenefits();
    await this.loadFAQ();
  }

  async loadBenefits() {
    const grid = document.querySelector('#benefits-grid');
    if (!grid) return;

    grid.innerHTML = LoadingSpinner.render();

    try {
      const response = await apiService.getMedicinalContent();
      this.renderBenefits(response.items);
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error);
      grid.innerHTML = ErrorAlert.render(error.message);
    }
  }

  renderBenefits(benefits) {
    const grid = document.querySelector('#benefits-grid');
    if (!grid) return;

    if (!benefits.length) {
      grid.innerHTML = EmptyState.render('Nenhum benefício encontrado');
      return;
    }

    grid.innerHTML = benefits.map(b => `
      <article class="cannabis-card">
        <div class="cannabis-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="${b.icon}"></path></svg>
        </div>
        <h3>${b.title}</h3>
        <p>${b.description}</p>
        <a class="button button-primary" href="https://wa.me/5586994901317?text=Olá! Quero saber mais sobre ${b.title.toLowerCase()}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
      </article>
    `).join('');
  }

  async loadFAQ() {
    const faqContainer = document.querySelector('#faq-container');
    if (!faqContainer) return;

    faqContainer.innerHTML = LoadingSpinner.render();

    try {
      const response = await apiService.getFAQ();
      this.renderFAQ(response.items);
    } catch (error) {
      console.error('Erro ao carregar FAQ:', error);
      faqContainer.innerHTML = ErrorAlert.render(error.message);
    }
  }

  renderFAQ(faqItems) {
    const faqContainer = document.querySelector('#faq-container');
    if (!faqContainer) return;

    if (!faqItems.length) {
      faqContainer.innerHTML = EmptyState.render('Nenhuma pergunta encontrada');
      return;
    }

    faqContainer.innerHTML = faqItems.map(item => FAQItem.render(item)).join('');
  }
}

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MedicinalPage();
    setupMobileMenu();
  });
} else {
  new MedicinalPage();
  setupMobileMenu();
}
