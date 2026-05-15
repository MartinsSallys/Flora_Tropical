# Headshop Site

Site estático para head shop premium usando HTML, CSS e JavaScript puro, com visual clean e cores de marca equilibradas.

## Estrutura

```txt
headshop-site/
├── public/
│   ├── images/
│   │   ├── brands/
│   │   ├── products/
│   │   └── banners/
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── data/
│   ├── App.js
│   └── main.js
├── index.html
├── package.json
└── README.md
```

## Rodar localmente

```bash
npm install
npm run dev
```

O projeto usa módulos JavaScript nativos. Por isso, abra por servidor local, não pelo arquivo `index.html` direto.

## Deploy no GitHub Pages

Há duas formas seguras:

1. Publicar a raiz do repositório em **Settings > Pages > Deploy from a branch > main / root**.
2. Gerar build com Vite e publicar a pasta `dist`:

```bash
npm ci
npm run build
```

O `vite.config.js` usa `base: "./"`, então os arquivos gerados funcionam em repositórios publicados em subpasta, como `https://usuario.github.io/Flora_Tropical/`.

## Assets

As pastas em `public/images` já estão preparadas para receber imagens reais:

- `public/images/brands/bem-bolado.png`
- `public/images/brands/smoking.png`
- `public/images/brands/raw.png`
- `public/images/products/`
- `public/images/banners/`
