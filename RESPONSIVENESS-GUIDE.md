# Guia de Responsividade - Flora Tropical

## 📱 Breakpoints

O projeto usa breakpoints CSS modernos para garantir responsividade em todos os dispositivos:

| Dispositivo | Breakpoint | Estilos |
|------------|-----------|---------|
| Desktop | 1024px+ | Layout otimizado com 3-4 colunas |
| Tablet | 768px - 1023px | Layout adaptado com 2 colunas |
| Mobile | 640px - 767px | Layout em coluna única com ajustes |
| Small Mobile | < 640px | Layout vertical compacto |

## 🔧 Principais Mudanças

### 1. Variáveis CSS Unificadas
Todas as cores, espaçamentos e bordas agora usam um único sistema de variáveis consistente:

```css
--primary: #1d6c46          /* Verde principal */
--accent: #f4c430           /* Amarelo destaque */
--border: rgba(38, 58, 34, 0.12)  /* Bordas */
--space-lg: 16px            /* Espaçamento */
```

### 2. Navbar Responsiva
- Desktop: 3 colunas (logo | nav-links | ações)
- Tablet+: 2 colunas (logo | ações) + menu hamburger
- Mobile: Menu hamburger com overlay suave

### 3. Hero Section
- Desktop: Grid 2 colunas (texto | slider)
- Tablet+: Grid 1 coluna com slider adaptado
- Mobile: Stack vertical com slider responsivo

### 4. Grids Responsivos
- **Brand Grid**: 3 colunas → 2 colunas → 1 coluna
- **Product Grid**: 4 colunas → 3 colunas → 1 coluna
- **Trust Grid**: 3 colunas → 2 colunas → 1 coluna

### 5. Tipografia Fluida
Títulos usam `clamp()` para escalar suavemente entre dispositivos:
```css
font-size: clamp(1.6rem, 5vw, 3.4rem);
```

### 6. Espaçamentos Dinâmicos
Padding/margin usam `clamp()` em mobile para otimizar espaço:
```css
padding: 0 clamp(12px, 4vw, var(--space-3xl));
```

## 🎯 Media Queries

### Tablet (max-width: 1023px)
```css
@media (max-width: 1023px) {
  /* Menu hamburger ativado */
  .menu-toggle { display: grid; }
  .nav-links { display: none; }
  
  /* Grids adaptados */
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Mobile (max-width: 767px)
```css
@media (max-width: 767px) {
  /* Ajustes de padding/margin */
  :root { --space-lg: 14px; --space-2xl: 24px; }
  
  /* Botões full-width */
  .button { width: 100%; }
  
  /* Slider compacto */
  .slide { min-height: 300px; }
}
```

### Small Mobile (max-width: 639px)
```css
@media (max-width: 639px) {
  /* Reduz ainda mais espaçamentos */
  :root { --space-lg: 12px; }
  
  /* Tipografia mais compacta */
  .hero-title { font-size: clamp(1.6rem, 7vw, 2.4rem); }
}
```

## 🎨 Componentes Responsivos

### Menu Mobile
```html
<nav class="nav-links">
  <!-- Links aqui -->
</nav>

<button class="menu-toggle" aria-label="Menu">
  <svg><!-- Hamburger --></svg>
</button>
```

JS auto-gerencia estado `active` e overlay.

### Cards Flexíveis
```css
.brand-card {
  display: grid;
  grid-template-rows: 240px 1fr;
  /* Ajusta automaticamente com CSS media queries */
}
```

### Slider Responsivo
```css
.slide {
  min-height: 360px;  /* Desktop */
}

@media (max-width: 767px) {
  .slide { min-height: 300px; }  /* Mobile */
}
```

### Botões Adaptáveis
```css
.button {
  min-height: 54px;   /* Desktop */
}

@media (max-width: 767px) {
  .button { width: 100%; }  /* Full width mobile */
}
```

## 📊 Layout em Diferentes Tamanhos

### Desktop (1440px)
```
┌─────────────────────────────────┐
│ [FT] Nav Nav Nav │ 🛒 ☰         │
├─────────────────────────────────┤
│ Hero Text    │      Slider      │
│              │                  │
└─────────────────────────────────┘
```

### Tablet (768px)
```
┌──────────────────────┐
│ [FT] │ 🛒 ☰         │
├──────────────────────┤
│ Hero Text            │
├──────────────────────┤
│   Slider             │
└──────────────────────┘
```

### Mobile (375px)
```
┌────────────────┐
│ [F] │ 🛒 ☰     │
├────────────────┤
│ Hero Text      │
├────────────────┤
│  Slider        │
└────────────────┘
```

## ✅ Checklist de Teste

- [ ] Logo ajusta tamanho em mobile
- [ ] Menu hamburger funciona em tablet
- [ ] Títulos legíveis em todos os tamanhos
- [ ] Botões suficientemente grandes (min 48px)
- [ ] Imagens responsivas (100% width)
- [ ] Spacing apropriado em cada breakpoint
- [ ] Sem overflow horizontal
- [ ] Touch targets acessíveis (min 44x44px)
- [ ] Fontes legíveis (min 16px em mobile)
- [ ] Contraste de cores adequado

## 🚀 Performance

- Use `clamp()` em vez de múltiplas media queries
- Mobile-first approach reduz CSS
- Ícones inline não requerem requisições adicionais
- Lazy loading para imagens em cards

## 🔍 Debugging

Ver tamanho atual no console:
```javascript
console.log(window.innerWidth);
```

Inspecionar media query ativa:
```javascript
const isMobile = window.matchMedia("(max-width: 767px)").matches;
```

## 📚 Recursos

- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS-Tricks Media Queries](https://css-tricks.com/a-complete-guide-to-media-queries/)
- [clamp() Guide](https://web.dev/min-max-clamp/)

## 💡 Dicas

1. **Mobile First**: Escreva CSS mobile, adicione media queries para telas maiores
2. **Teste Realmente**: Use DevTools mobile view e dispositivos reais
3. **Touch Friendly**: Botões min 44x44px, espaço entre elementos
4. **Performance**: Minimize repaints evitando overflow
5. **Accessibility**: Mantenha contraste, tamanho fonte legível

---

**Última atualização**: 11 de maio de 2026
