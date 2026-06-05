## 🐍 Backend FastAPI - Referência

Este documento é uma referência para quando você for implementar o backend FastAPI.

### Instalação

```bash
pip install fastapi uvicorn python-multipart python-dotenv pydantic
```

### requirements.txt

```
fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
python-dotenv==1.0.0
pydantic==2.5.0
pydantic-settings==2.1.0
```

### Estrutura Básica (main.py)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from pydantic import BaseModel, EmailStr

app = FastAPI(
    title="Flora Tropical API",
    description="API para Flora Tropical Tabacaria Premium",
    version="1.0.0"
)

# CORS - Permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============= MODELOS =============

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

class Category(BaseModel):
    name: str
    description: str
    image: str
    productCount: Optional[int] = 0

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

class Benefit(BaseModel):
    id: str
    title: str
    description: str
    icon: str

class FAQ(BaseModel):
    id: str
    question: str
    answer: str
    category: str

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class NewsletterSubscription(BaseModel):
    email: EmailStr

# ============= DADOS (SUBSTITUIR POR BANCO) =============

products_db = []  # Dados virão do banco
categories_db = []
locations_db = []
faq_db = []

# ============= ENDPOINTS =============

@app.get("/")
async def root():
    return {
        "message": "Flora Tropical API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# PRODUTOS
@app.get("/api/products")
async def get_products(
    category: str = "Todos",
    page: int = 1,
    pageSize: int = 10
):
    """Listar produtos com filtros e paginação"""
    # Implementar lógica
    pass

@app.get("/api/products/search")
async def search_products(q: str):
    """Buscar produtos por nome ou descrição"""
    # Implementar lógica
    pass

@app.get("/api/products/{id}")
async def get_product(id: str):
    """Obter detalhes de um produto"""
    # Implementar lógica
    pass

# CATEGORIAS
@app.get("/api/categories")
async def get_categories():
    """Listar todas as categorias"""
    # Implementar lógica
    pass

@app.get("/api/categories/{name}")
async def get_category(name: str):
    """Obter produtos de uma categoria"""
    # Implementar lógica
    pass

# UNIDADES
@app.get("/api/locations")
async def get_locations():
    """Listar todas as unidades"""
    # Implementar lógica
    pass

@app.get("/api/locations/{id}")
async def get_location(id: str):
    """Obter detalhes de uma unidade"""
    # Implementar lógica
    pass

# CANNABIS MEDICINAL
@app.get("/api/medicinal")
async def get_medicinal():
    """Obter conteúdo de cannabis medicinal"""
    # Implementar lógica
    pass

@app.get("/api/faq")
async def get_faq(category: Optional[str] = None):
    """Obter perguntas frequentes"""
    # Implementar lógica
    pass

# CONTATO
@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    """Submeter formulário de contato"""
    # Validar dados
    # Salvar no banco
    # Enviar e-mail (opcional)
    # Notificar admin (opcional)
    return {
        "success": True,
        "message": "Mensagem recebida com sucesso!"
    }

# NEWSLETTER
@app.post("/api/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    """Inscrever em newsletter"""
    # Validar dados
    # Salvar no banco
    # Enviar e-mail de confirmação (opcional)
    return {
        "success": True,
        "message": "Inscrição realizada com sucesso!"
    }

# ============= INICIAR =============

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Executar

```bash
# Desenvolvimento
uvicorn main:app --reload

# Produção
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Testes com curl

```bash
# Teste simples
curl http://localhost:8000/

# Obter documentação interativa
open http://localhost:8000/docs

# Obter produtos
curl http://localhost:8000/api/products

# Buscar produtos
curl "http://localhost:8000/api/products/search?q=Raw"

# Enviar contato
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João",
    "email": "joao@example.com",
    "subject": "Contato",
    "message": "Gostaria de mais informações"
  }'
```

### Estrutura de Resposta Esperada

Todas as respostas devem ser JSON:

```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "pages": 10
}
```

---

**Quando o backend estiver pronto com esses endpoints, o frontend funcionará automaticamente!**
