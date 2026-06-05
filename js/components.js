// Componentes reutilizáveis

class LoadingSpinner {
  static render() {
    return `
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Carregando...</p>
      </div>
    `;
  }
}

class EmptyState {
  static render(message = "Nenhum item encontrado") {
    return `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" class="empty-state-icon">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12l2 2 4-4"></path>
        </svg>
        <h3>Sem resultados</h3>
        <p>${message}</p>
      </div>
    `;
  }
}

class ErrorAlert {
  static render(message = "Ocorreu um erro ao carregar os dados") {
    return `
      <div class="error-alert" role="alert">
        <svg viewBox="0 0 24 24" class="error-icon">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="error-content">
          <h3>Erro</h3>
          <p>${message}</p>
        </div>
      </div>
    `;
  }
}

class ProductCard {
  static render(product) {
    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;
    const origin = product.tags?.[0] || product.category;

    return `
      <article class="product-card-premium" data-product-id="${product.id}" data-category="${product.category}">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-badge premium-badge">${product.isPremium ? "Premium" : product.category}</span>
          <div class="product-overlay">
            <button class="quick-view-btn" type="button" data-product-id="${product.id}">Visualizar rápido</button>
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
          <button class="btn-add-cart" type="button" data-product-id="${product.id}">Adicionar ao Carrinho</button>
        </div>
      </article>
    `;
  }
}

class CategoryCard {
  static render(category) {
    const productLabel = category.productCount === 1
      ? "1 produto"
      : `${category.productCount} produtos`;

    return `
      <article class="category-card" data-category="${category.name}">
        <div class="category-image">
          <img src="${category.image}" alt="${category.name}" loading="lazy" />
          <div class="category-overlay">
            <h3 class="category-name">${category.name}</h3>
            <p class="category-count">${productLabel}</p>
          </div>
        </div>
        <div class="category-footer">
          <p class="category-description">${category.description}</p>
          <a class="explore-link" href="produtos.html">Explorar categoria</a>
        </div>
      </article>
    `;
  }
}

class LocationCard {
  static render(location) {
    return `
      <article class="location-card" data-location-id="${location.id}">
        <div class="location-image">
          <img src="${location.image}" alt="Unidade Flora Tropical em ${location.name}" loading="lazy" />
          <span class="location-badge">${location.type}</span>
        </div>
        <div class="location-content">
          <h3>${location.name}</h3>
          <p class="location-info">${location.description}</p>
          <div class="location-details">
            <p><strong>Endereço</strong><span>${location.address}</span></p>
            <p><strong>Telefone</strong><span>${location.phone}</span></p>
            <p><strong>Horário</strong><span>${location.hours}</span></p>
            <p><strong>WhatsApp</strong><span>${location.phone}</span></p>
          </div>
          <div class="location-ctas">
            <a class="button button-primary" href="https://wa.me/${location.whatsapp}?text=Olá! Quero falar com a unidade ${location.name}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a class="button button-secondary" href="${location.maps}" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
          </div>
        </div>
      </article>
    `;
  }
}

class FAQItem {
  static render(item) {
    return `
      <details class="faq-item" data-faq-id="${item.id}">
        <summary class="faq-question">
          <h4>${item.question}</h4>
          <svg viewBox="0 0 24 24" class="faq-icon">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </summary>
        <div class="faq-answer">
          <p>${item.answer}</p>
        </div>
      </details>
    `;
  }
}

class Pagination {
  static render(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';

    let html = '<nav class="pagination" role="navigation" aria-label="Paginação">';

    if (currentPage > 1) {
      html += `<button class="pagination-btn" data-page="${currentPage - 1}">← Anterior</button>`;
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages) {
      html += `<button class="pagination-btn" data-page="${currentPage + 1}">Próximo →</button>`;
    }

    html += '</nav>';
    return html;
  }
}
