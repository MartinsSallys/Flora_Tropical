export function Footer() {
  return `
    <footer id="contato" class="footer">
      <div class="footer-grid">
        <div>
          <a class="brand footer-brand" href="#home">
            <span class="brand-mark">FT</span>
            <span class="brand-copy">
              <span class="brand-name">Flora Tropical</span>
              <span class="brand-subtitle">Head shop lifestyle</span>
            </span>
          </a>
          <p>Curadoria premium de produtos, ambiente acolhedor e experiência tropical para Barra Grande e Parnaíba.</p>
        </div>

        <div>
          <h4>Contato</h4>
          <p>WhatsApp: (85) 99999-0000<br>contato@floratropical.com.br<br>Barra Grande e Parnaíba, PI</p>
        </div>

        <div>
          <h4>Links</h4>
          <nav class="footer-links" aria-label="Links úteis">
            <a href="#home">Home</a>
            <a href="#marcas">Marcas</a>
            <a href="#produtos">Produtos</a>
            <a href="#promo">Ofertas</a>
          </nav>
        </div>

        <div>
          <h4>Segurança</h4>
          <div class="seal-list">
            <span class="seal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"></path><circle cx="12" cy="12" r="3"></circle><path d="M17.5 6.5h.01"></path></svg> Instagram</span>
            <span class="seal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 12 2 2 4-4"></path><path d="M20 6 9 17l-5-5"></path></svg> Compra segura</span>
            <span class="seal"><svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Site seguro</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">Venda proibida para menores de 18 anos. Este layout representa uma proposta premium da Flora Tropical.</div>
    </footer>
  `;
}
