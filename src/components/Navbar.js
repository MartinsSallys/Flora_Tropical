export function Navbar() {
  return `
    <header class="navbar" aria-label="Navegação principal">
      <a class="brand" href="#home">
        <span class="brand-mark">FT</span>
        <span class="brand-copy">
          <span class="brand-name">Flora Tropical</span>
          <span class="brand-subtitle">Head shop lifestyle</span>
        </span>
      </a>

      <nav class="nav-links" aria-label="Categorias">
        <a href="#home">Home</a>
        <a href="#marcas">Marcas</a>
        <a href="#produtos">Produtos</a>
        <a href="#promo">Ofertas</a>
        <a href="#eventos">Eventos</a>
      </nav>

      <div class="nav-actions">
        <button class="icon-button" type="button" aria-label="Abrir carrinho">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.96a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
          <span class="cart-count">3</span>
        </button>
        <button class="icon-button" type="button" aria-label="Abrir menu">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>
        </button>
      </div>
    </header>
  `;
}
