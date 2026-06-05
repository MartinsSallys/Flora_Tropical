## 🏗️ Arquitetura Frontend - Preparação para Backend FastAPI

### Estrutura de Diretórios

```
/js
├── config.js              # Configuração centralizada (URLs, flags)
├── mock-data.js          # Dados mockados (substituir por requisições reais)
├── services.js           # ApiService - Camada de serviços HTTP
├── utils.js              # Funções utilitárias compartilhadas
├── components.js         # Componentes reutilizáveis
├── validation.js         # Validação de formulários
└── pages/
    ├── products.js       # Controller da página de produtos
    ├── categories.js     # Controller da página de categorias
    ├── locations.js      # Controller da página de unidades
    ├── medicinal.js      # Controller da página cannabis medicinal
    └── contact.js        # Controller da página de contato

/
├── index.html           # Home
├── produtos.html        # Produtos
├── cannabis-medicinal.html # Cannabis medicinal
├── categorias.html      # Categorias
├── unidades.html        # Unidades
├── sobre.html           # Sobre
├── contato.html         # Contato
├── style.css            # Estilos globais
└── script.js            # Controller da Home
```

### Fluxo de Dados

```
Página HTML
    ↓
Page Controller (ex: ProductsPage)
    ↓
API Service (apiService)
    ↓
Mock Data (modo desenvolvimento)
Ou
Real API (modo produção)
    ↓
Components (renderizar HTML)
    ↓
DOM Update
```

### Configuração Centralizada

**`js/config.js`** - Define URLs e comportamento:

```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:8000/api',  // URL do backend
  API_TIMEOUT: 30000,                          // Timeout de requisições
  MOCK_DATA: true,  // true = dados mockados | false = requisições reais
};
```

**Para integração com FastAPI:**
1. Altere `MOCK_DATA` para `false`
2. Ajuste `API_BASE_URL` para o endereço do servidor

### Camada de Serviços

**`js/services.js`** - `ApiService` centraliza todas as requisições HTTP

**Métodos disponíveis:**
- `getProducts(filters)` - Lista produtos com filtros
- `searchProducts(query)` - Busca produtos
- `getCategories()` - Lista categorias
- `getLocations()` - Lista unidades
- `getMedicinalContent()` - Conteúdo cannabis medicinal
- `getFAQ()` - Perguntas frequentes
- `submitContact(data)` - Submete formulário de contato

**Modo Mock (desenvolvimento):**
Retorna dados de `mock-data.js` como se fossem da API

**Modo Real (produção):**
Faz requisições HTTP reais para o FastAPI

### Dados Mockados

**`js/mock-data.js`** - Simula respostas da API

Arrays disponíveis:
- `MOCK_PRODUCTS` - Produtos
- `MOCK_CATEGORIES` - Categorias
- `MOCK_LOCATIONS` - Unidades
- `MOCK_MEDICINAL_BENEFITS` - Benefícios
- `MOCK_FAQ` - Perguntas frequentes

Cada array tem a **mesma estrutura** que o JSON que o FastAPI retornará.

### Componentes Reutilizáveis

**`js/components.js`** - Classes para renderizar HTML

**Disponíveis:**
- `LoadingSpinner.render()` - Mostrar carregamento
- `EmptyState.render(message)` - Mostrar vazio
- `ErrorAlert.render(message)` - Mostrar erro
- `ProductCard.render(product)` - Card de produto
- `CategoryCard.render(category)` - Card de categoria
- `LocationCard.render(location)` - Card de unidade
- `FAQItem.render(item)` - Item de FAQ
- `Pagination.render(page, totalPages)` - Paginação

### Validação de Formulários

**`js/validation.js`** - Valida dados antes de enviar

**Métodos:**
- `validateContactForm(data)` - Valida formulário de contato
- `validateNewsletterForm(data)` - Valida newsletter
- `displayErrors(form, errors)` - Mostra erros na UI
- `clearErrors(form)` - Limpa erros

### Page Controllers

Cada página tem um controller que gerencia seu estado e requisições:

```javascript
class ProductsPage {
  async init()              // Inicializa a página
  async loadProducts()      // Carrega dados da API
  renderProducts(data)      // Renderiza na tela
  attachEventListeners()    // Eventos de interação
}
```

**Controllers disponíveis:**
- `ProductsPage` - Produtos com busca, filtros e paginação
- `CategoriesPage` - Lista dinâmica de categorias
- `LocationsPage` - Lista dinâmica de unidades
- `MedicinalPage` - Cannabis medicinal com FAQ
- `ContactPage` - Formulário com validação

### Fluxo de Integração

#### Passo 1: Backend Implementa Endpoints

O FastAPI deve implementar esses endpoints:

```python
GET    /api/products              # Listar produtos
POST   /api/products              # Filtrar produtos (body: filters)
GET    /api/products/search?q=    # Buscar produtos
GET    /api/categories            # Listar categorias
GET    /api/locations             # Listar unidades
GET    /api/medicinal             # Conteúdo cannabis
GET    /api/faq                   # Perguntas frequentes
POST   /api/contact               # Submeter contato
POST   /api/newsletter            # Newsletter
```

#### Passo 2: Estrutura de Resposta

O FastAPI deve retornar **exatamente** a mesma estrutura dos mock data:

**Produtos:**
```json
{
  "items": [
    {
      "id": "001",
      "name": "Boné Raw",
      "category": "Bonés",
      "price": 125.9,
      "originalPrice": 155.9,
      "description": "...",
      "image": "assets/produto_2.jpg",
      "rating": 4.8,
      "reviews": 24,
      "isPremium": true,
      "tags": ["importado", "premium"]
    }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "pages": 10
}
```

#### Passo 3: Ativar Modo Real

Quando backend estiver pronto:

```javascript
// Em config.js, mudar para:
MOCK_DATA: false
```

Pronto! Todas as requisições irão para o FastAPI.

### Features Implementadas

✅ **Busca e Filtros**
- SearchBar com validação
- Filtros por categoria
- Paginação automática

✅ **Estados de Carregamento**
- Loading spinner
- Empty state
- Error alerts

✅ **Validação**
- Formulários com validação
- Erros exibidos no campo
- Feedback visual

✅ **Responsividade**
- Mantida em todos os componentes
- Suporte mobile completo

✅ **FAQ Dinâmico**
- Carregado da API
- `<details>` nativo para accordion

✅ **Componentes Reutilizáveis**
- Sem duplicação de código
- Fácil manutenção

### Boas Práticas

1. **Nunca deixar valores hardcoded** - Tudo vem de `config.js` ou `mock-data.js`
2. **Usar ApiService** - Todas as requisições passam por lá
3. **Separar concerns** - Controllers, components, utils, validation
4. **Estado localizado** - Cada page controller gerencia seu próprio estado
5. **Fallbacks UI** - Loading, empty, error states em tudo

### CORS e Headers

Quando implementar backend FastAPI, lembrar de:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Mudanças Futuras

**Se precisar:**

1. **Adicionar novo endpoint?**
   - Adicione o método em `ApiService`
   - Crie o mock em `mock-data.js`
   - Use em seus page controllers

2. **Alterar formato de dados?**
   - Atualize `mock-data.js`
   - Ajuste `components.js`
   - Backend se adapta

3. **Adicionar nova página?**
   - Crie `pages/nomepagina.js` como controller
   - Crie `nompagina.html` com estrutura
   - Inclua scripts no HTML

### Checklist de Integração

- [ ] Backend implementa todos os endpoints
- [ ] Respostas JSON têm mesma estrutura que mock-data.js
- [ ] CORS está configurado
- [ ] Mudar `MOCK_DATA: false` em config.js
- [ ] Testar cada página
- [ ] Validar erros de rede
- [ ] Testar paginação
- [ ] Testar busca e filtros

---

O frontend está **100% pronto** para integração! Basta ter o backend retornando JSON na estrutura correta.
