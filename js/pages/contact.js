// Página de Contato - Controller
class ContactPage {
  constructor() {
    this.isSubmitting = false;

    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validar
    const validation = FormValidator.validateContactForm(data);
    if (!validation.isValid) {
      FormValidator.displayErrors(form, validation.errors);
      return;
    }

    // Limpar erros anteriores
    FormValidator.clearErrors(form);

    // Submeter
    this.isSubmitting = true;
    this.disableFormButtons(form, true);

    try {
      const response = await apiService.submitContact(data);

      if (response.success) {
        this.showSuccessMessage(form, response.message);
        form.reset();
      } else {
        this.showErrorMessage(form, response.message || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao submeter contato:', error);
      this.showErrorMessage(form, error.message);
    } finally {
      this.isSubmitting = false;
      this.disableFormButtons(form, false);
    }
  }

  async handleNewsletterSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validar
    const validation = FormValidator.validateNewsletterForm(data);
    if (!validation.isValid) {
      FormValidator.displayErrors(form, validation.errors);
      return;
    }

    console.log('Newsletter signup:', data);
    // Implementar envio para API de newsletter

    this.showSuccessMessage(form, 'Obrigado por se inscrever!');
    form.reset();
  }

  showSuccessMessage(form, message) {
    const alertEl = document.createElement('div');
    alertEl.className = 'success-alert';
    alertEl.setAttribute('role', 'alert');
    alertEl.innerHTML = `
      <svg viewBox="0 0 24 24" class="success-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12l2 2 4-4"></path>
      </svg>
      <div class="alert-content">
        <h3>Sucesso!</h3>
        <p>${message}</p>
      </div>
    `;

    form.parentElement.insertBefore(alertEl, form);
    setTimeout(() => alertEl.remove(), 5000);
  }

  showErrorMessage(form, message) {
    const alertEl = document.createElement('div');
    alertEl.className = 'error-alert';
    alertEl.setAttribute('role', 'alert');
    alertEl.innerHTML = ErrorAlert.render(message);

    form.parentElement.insertBefore(alertEl, form);
    setTimeout(() => alertEl.remove(), 5000);
  }

  disableFormButtons(form, disabled) {
    form.querySelectorAll('button').forEach(btn => {
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.6' : '1';
    });
  }
}

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
    setupMobileMenu();
  });
} else {
  new ContactPage();
  setupMobileMenu();
}
