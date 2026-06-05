## 🔌 Exemplo de Integração com FastAPI

### 1. Inicializar o Backend FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Flora Tropical API")

# Configurar CORS para aceitar requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. Implementar Endpoints

#### Produtos

```python
from typing import List, Optional

class Product(BaseModel):
    id: str
    name: str
    category: str
    description: str
    price: float
    originalPrice: Optional[float] = None
    image: str
    rating: float
    reviews: int
    isPremium: bool
    tags: List[str]

@app.get("/api/products")
async def get_products(
    category: str = "Todos",
    page: int = 1,
    pageSize: int = 10
):
    # Filtrar produtos por categoria
    if category != "Todos":
        filtered = [p for p in products_db if p.category == category]
    else:
        filtered = products_db
    
    total = len(filtered)
    start = (page - 1) * pageSize
    items = filtered[start:start + pageSize]
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "pageSize": pageSize,
        "pages": (total + pageSize - 1) // pageSize
    }

@app.get("/api/products/search")
async def search_products(q: str):
    lower_q = q.lower()
    filtered = [
        p for p in products_db
        if lower_q in p.name.lower() or lower_q in p.description.lower()
    ]
    return {"items": filtered}
```

#### Categorias

```python
class Category(BaseModel):
    name: str
    description: str
    image: str
    productCount: int

@app.get("/api/categories")
async def get_categories():
    # Contar produtos por categoria
    counts = {}
    for product in products_db:
        counts[product.category] = counts.get(product.category, 0) + 1
    
    categories = [
        {
            "name": cat.name,
            "description": cat.description,
            "image": cat.image,
            "productCount": counts.get(cat.name, 0)
        }
        for cat in categories_db
    ]
    
    return {"items": categories}
```

#### Unidades

```python
class Location(BaseModel):
    id: str
    name: str
    type: str
    description: str
    address: str
    phone: str
    whatsapp: str
    hours: str
    image: str
    maps: str

@app.get("/api/locations")
async def get_locations():
    return {"items": locations_db}
```

#### Cannabis Medicinal

```python
class Benefit(BaseModel):
    id: str
    title: str
    description: str
    icon: str

@app.get("/api/medicinal")
async def get_medicinal():
    return {"items": medicinal_benefits_db}

class FAQ(BaseModel):
    id: str
    question: str
    answer: str
    category: str

@app.get("/api/faq")
async def get_faq(category: Optional[str] = None):
    if category:
        items = [f for f in faq_db if f.category == category]
    else:
        items = faq_db
    return {"items": items}
```

#### Contato

```python
from pydantic import EmailStr, validator

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    
    @validator('name')
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Nome é obrigatório')
        return v
    
    @validator('message')
    def message_length(cls, v):
        if len(v) < 10:
            raise ValueError('Mensagem muito curta')
        return v

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    # Salvar em banco de dados
    # Enviar e-mail
    # Notificar admin
    
    return {
        "success": True,
        "message": "Mensagem recebida com sucesso!"
    }
```

#### Newsletter

```python
class NewsletterSubscription(BaseModel):
    email: EmailStr

@app.post("/api/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    # Salvar no banco
    # Enviar confirmação
    
    return {
        "success": True,
        "message": "Inscrição realizada com sucesso!"
    }
```

### 3. Estrutura de Dados do Backend

O backend deve ter estrutura similar:

```python
# Simulando um "banco de dados"
products_db = [
    {
        "id": "001",
        "name": "Boné Raw",
        "category": "Bonés",
        "description": "Boné Raw de excelente qualidade...",
        "price": 125.9,
        "originalPrice": 155.9,
        "image": "assets/produto_2.jpg",
        "rating": 4.8,
        "reviews": 24,
        "isPremium": True,
        "tags": ["importado", "premium", "exclusivo"]
    },
    # ... mais produtos
]

categories_db = [
    {
        "name": "Bonés",
        "description": "Melhor conforto e estilo",
        "image": "assets/produto_2.jpg"
    },
    # ... mais categorias
]

locations_db = [
    {
        "id": "001",
        "name": "Parnaíba - PI",
        "type": "Matriz",
        "description": "Nossa unidade principal...",
        "address": "Rua Felipe Neves, 290...",
        "phone": "(86) 3221-1234",
        "whatsapp": "5586999990000",
        "hours": "Seg-Dom: 09h às 22h",
        "image": "assets/localizacao.jpg",
        "maps": "https://maps.google.com/?q=..."
    }
]
```

### 4. Roteiro de Teste

**Passo 1: Iniciar FastAPI**
```bash
uvicorn main:app --reload
```

**Passo 2: Testar endpoints (curl ou insomnia)**
```bash
# Testar produtos
curl http://localhost:8000/api/products

# Testar busca
curl http://localhost:8000/api/products/search?q=Raw

# Testar categorias
curl http://localhost:8000/api/categories

# Testar unidades
curl http://localhost:8000/api/locations
```

**Passo 3: Ativar no frontend**
```javascript
// Em js/config.js, mudar para:
const CONFIG = {
  API_BASE_URL: 'http://localhost:8000/api',
  MOCK_DATA: false  // ← MUDAR PARA FALSE
};
```

**Passo 4: Abrir páginas**
- Abrir `http://localhost:5500` (ou seu host)
- Clicar em "Produtos"
- Deve carregar dados do FastAPI

### 5. Headers HTTP Importantes

Frontend envia automaticamente:
```
Content-Type: application/json
```

Se precisar autenticação futura:
```python
from fastapi import Header

@app.get("/api/products")
async def get_products(authorization: str = Header(None)):
    # Validar token
    pass
```

### 6. Tratamento de Erros

Backend deve retornar erros estruturados:

```python
from fastapi import HTTPException

@app.get("/api/products/{id}")
async def get_product(id: str):
    product = next((p for p in products_db if p.id == id), None)
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado"
        )
    return product
```

Frontend captura automaticamente:
```javascript
// Em services.js - catch block
catch (error) {
    console.error(`API Error: ${error.message}`);
    // ErrorAlert mostra a mensagem
}
```

### 7. Fluxo Completo

```
1. Usuário acessa produtos.html
2. ProductsPage.init() é chamado
3. apiService.getProducts() é chamado
4. Se MOCK_DATA=true → retorna MOCK_PRODUCTS
5. Se MOCK_DATA=false → requisição HTTP para FastAPI
6. GET http://localhost:8000/api/products
7. FastAPI processa e retorna JSON
8. Componentes renderizam HTML
9. Usuário vê produtos na tela
```

### 8. Deploy Futuro

**Desenvolvimento:**
```javascript
MOCK_DATA: true
API_BASE_URL: 'http://localhost:8000/api'
```

**Produção:**
```javascript
MOCK_DATA: false
API_BASE_URL: 'https://api.floratropical.com.br/api'
```

---

**Tudo pronto para integração!** 🚀
