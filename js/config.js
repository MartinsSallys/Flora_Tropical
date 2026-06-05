// Configuração centralizada da API
const CONFIG = {
  API_BASE_URL: 'http://localhost:8000/api',
  API_TIMEOUT: 30000,
  MOCK_DATA: true, // true para usar dados mockados, false para requisições reais
};

const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  LOCATIONS: '/locations',
  MEDICINAL: '/medicinal',
  CONTACT: '/contact',
  FAQ: '/faq',
};
