// Validação de formulários

class FormValidator {
  static isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]*$/;
    return phoneRegex.test(phone);
  }

  static isNotEmpty(value) {
    return value && value.trim().length > 0;
  }

  static validateContactForm(data) {
    const errors = {};

    if (!this.isNotEmpty(data.name)) {
      errors.name = 'Nome é obrigatório';
    }

    if (!this.isEmail(data.email)) {
      errors.email = 'E-mail inválido';
    }

    if (data.phone && !this.isPhone(data.phone)) {
      errors.phone = 'Telefone inválido';
    }

    if (!this.isNotEmpty(data.subject)) {
      errors.subject = 'Selecione um assunto';
    }

    if (!this.isNotEmpty(data.message) || data.message.length < 10) {
      errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static validateNewsletterForm(data) {
    if (!this.isEmail(data.email)) {
      return {
        isValid: false,
        errors: { email: 'E-mail inválido' },
      };
    }

    return { isValid: true, errors: {} };
  }

  static displayErrors(form, errors) {
    // Limpa erros anteriores
    form.querySelectorAll('.form-error').forEach(el => el.remove());

    Object.entries(errors).forEach(([fieldName, message]) => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = message;
        field.parentElement.appendChild(errorEl);
        field.classList.add('has-error');
      }
    });
  }

  static clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  }
}
