# Sistema de Ícones - Flora Tropical

## 📋 Overview

Sistema padronizado de ícones SVG inline para o projeto Flora Tropical. Oferece flexibilidade, performance e acessibilidade.

## 🎯 Uso Básico

### Ícone Simples
```html
<svg class="icon-md" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="12" cy="12" r="10"></circle>
</svg>
```

### Ícone em Botão
```html
<button class="icon-button" type="button" aria-label="Abrir menu">
  <svg class="icon-md" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
</button>
```

### Ícone com Cor
```html
<svg class="icon-md icon-primary" viewBox="0 0 24 24">
  <!-- Seu SVG aqui -->
</svg>
```

## 📏 Tamanhos

| Classe | Tamanho | Uso |
|--------|--------|-----|
| `icon-xs` | 16px | Labels, badges |
| `icon-sm` | 20px | Texto pequeno, inline |
| `icon-md` | 24px | Padrão, botões |
| `icon-lg` | 32px | Destaque, cards |
| `icon-xl` | 40px | Grande destaque |

## 🎨 Cores

| Classe | Cor |
|--------|-----|
| `icon-primary` | Verde primário |
| `icon-accent` | Amarelo accent |
| `icon-muted` | Cinza muted |
| `icon-white` | Branco |
| `icon-error` | Vermelho erro |

```html
<svg class="icon-lg icon-accent" viewBox="0 0 24 24">
  <!-- SVG content -->
</svg>
```

## 🔘 Botões com Ícone

### Padrão
```html
<button class="icon-button" type="button" aria-label="Ação">
  <svg class="icon-md" viewBox="0 0 24 24">
    <!-- SVG -->
  </svg>
</button>
```

### Tamanhos
- `icon-button` (44px - padrão)
- `icon-button.small` (40px)
- `icon-button.large` (50px)

## ✨ Animações

### Spinner
```html
<svg class="icon-md icon-spin" viewBox="0 0 24 24">
  <!-- SVG -->
</svg>
```

### Pulse
```html
<svg class="icon-md icon-pulse" viewBox="0 0 24 24">
  <!-- SVG -->
</svg>
```

### Bounce
```html
<svg class="icon-md icon-bounce" viewBox="0 0 24 24">
  <!-- SVG -->
</svg>
```

## 🔢 Ícone com Badge

```html
<div class="icon-badge" data-count="5">
  <svg class="icon-md" viewBox="0 0 24 24">
    <!-- SVG -->
  </svg>
</div>
```

## ♿ Acessibilidade

### Recomendações
- Use `aria-hidden="true"` para ícones puramente decorativos
- Use `aria-label` em botões que contêm apenas ícones
- Sempre forneça contexto de texto quando necessário
- Garanta contraste suficiente entre ícone e fundo

```html
<!-- Decorativo -->
<svg aria-hidden="true" viewBox="0 0 24 24">
  <!-- SVG -->
</svg>

<!-- Botão funcional -->
<button aria-label="Abrir menu">
  <svg viewBox="0 0 24 24">
    <!-- SVG -->
  </svg>
</button>
```

## 📱 Responsivo

Ícones se adaptam automaticamente em dispositivos móveis. Nenhuma ação necessária - a classe `icon-button` já é responsiva.

## 🎓 SVG Attributes

### Essencial
- `viewBox="0 0 24 24"` - Escala padrão
- `stroke-width="2"` - Largura do traço
- `stroke-linecap="round"` - Pontas arredondadas

### Boas Práticas
- Use `<path>`, `<circle>`, `<rect>`, `<line>` em vez de `<img>`
- Mantenha designs simples e limpos
- Use variável `currentColor` para cores dinâmicas

## 📚 Exemplos Comuns

### Carrinho de Compras
```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="8" cy="21" r="1"></circle>
  <circle cx="19" cy="21" r="1"></circle>
  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.96a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
</svg>
```

### Menu (Hamburger)
```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M4 6h16" />
  <path d="M4 12h16" />
  <path d="M4 18h16" />
</svg>
```

### Seta
```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <polyline points="9 18 15 12 9 6"></polyline>
</svg>
```

### Coração
```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>
```

## 🔗 Resources

- [Heroicons](https://heroicons.com) - Ícones de referência
- [SVG Guidelines](https://www.w3.org/TR/SVG2/)
- [Acessibilidade SVG](https://www.w3.org/WAI/tutorials/images/decision-tree/)

## 🚀 Performance

- Ícones inline não requerem requisições HTTP adicionais
- Use `aria-hidden="true"` para ícones decorativos reduzir carga de leitura
- Cache do navegador aplica-se aos estilos CSS dos ícones

## 📝 Notas

- Todos os ícones usam `stroke` (traço) em vez de `fill`
- Compatível com tema claro/escuro via variáveis CSS
- Totalmente responsivo em todos os breakpoints
