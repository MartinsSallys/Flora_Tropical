function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  setupHeroCarousel();

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

function setupHeroCarousel() {
  const carousels = Array.from(document.querySelectorAll(".hero-carousel"));

  carousels.forEach((carousel) => {
    if (carousel.dataset.carouselReady === "true") return;

    const hero = carousel.closest(".hero");
    const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
    if (!hero || slides.length < 2) return;

    let dotsWrap = hero.querySelector(".hero-dots");
    if (!dotsWrap) {
      dotsWrap = document.createElement("div");
      dotsWrap.className = "hero-dots";
      dotsWrap.setAttribute("aria-label", "Selecionar imagem do carrossel");
      hero.appendChild(dotsWrap);
    }

    let dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));
    if (dots.length !== slides.length) {
      dotsWrap.innerHTML = slides
        .map((_, index) => `<button class="hero-dot" type="button" aria-label="Mostrar imagem ${index + 1}" data-slide="${index}"></button>`)
        .join("");
      dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));
    }

    let activeIndex = slides.findIndex(slide => slide.classList.contains("is-active"));
    activeIndex = activeIndex >= 0 ? activeIndex : 0;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    const startAutoplay = () => {
      window.clearInterval(Number(carousel.dataset.intervalId));
      const intervalId = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 2000);
      carousel.dataset.intervalId = String(intervalId);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startAutoplay();
      });
    });

    carousel.dataset.carouselReady = "true";
    showSlide(activeIndex);
    startAutoplay();
  });
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
        <a class="explore-link" href="produtos.html">Explorar categoria</a>
      </div>
    </article>
  `;
}

function renderLocationCard(location) {
  return `
    <article class="location-card">
      <div class="location-image">
        <img src="${location.image}" alt="Unidade Flora Tropical em ${location.name}" />
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

function renderBenefitCard(benefit) {
  return `
    <article class="cannabis-card">
      <div class="cannabis-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="${benefit.icon}"></path></svg>
      </div>
      <h3>${benefit.title}</h3>
      <p>${benefit.description}</p>
      <a class="button button-primary" href="https://wa.me/5586994901317?text=Olá! Quero saber mais sobre ${benefit.title.toLowerCase()}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
    </article>
  `;
}
