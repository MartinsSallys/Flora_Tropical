// Camada de serviços para requisições HTTP
class ApiService {
  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL;
    this.timeout = CONFIG.API_TIMEOUT;
    this.mockData = CONFIG.MOCK_DATA;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Produtos
  async getProducts(filters = {}) {
    if (this.mockData) return this._getMockProducts(filters);
    return this.request(API_ENDPOINTS.PRODUCTS, {
      method: 'POST',
      body: JSON.stringify(filters),
    });
  }

  async searchProducts(query) {
    if (this.mockData) return this._searchMockProducts(query);
    return this.request(`${API_ENDPOINTS.PRODUCTS}/search?q=${query}`);
  }

  // Categorias
  async getCategories() {
    if (this.mockData) return this._getMockCategories();
    return this.request(API_ENDPOINTS.CATEGORIES);
  }

  // Unidades
  async getLocations() {
    if (this.mockData) return this._getMockLocations();
    return this.request(API_ENDPOINTS.LOCATIONS);
  }

  // Cannabis Medicinal
  async getMedicinalContent() {
    if (this.mockData) return this._getMockMedicinalContent();
    return this.request(API_ENDPOINTS.MEDICINAL);
  }

  async getFAQ() {
    if (this.mockData) return this._getMockFAQ();
    return this.request(API_ENDPOINTS.FAQ);
  }

  // Contato
  async submitContact(data) {
    if (this.mockData) return this._submitMockContact(data);
    return this.request(API_ENDPOINTS.CONTACT, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==================== MOCK DATA ====================

  _getMockProducts(filters = {}) {
    let products = MOCK_PRODUCTS.slice();

    if (filters.category && filters.category !== 'Todos') {
      products = products.filter(p => p.category === filters.category);
    }

    if (filters.page) {
      const pageSize = filters.pageSize || 10;
      const start = (filters.page - 1) * pageSize;
      return {
        items: products.slice(start, start + pageSize),
        total: products.length,
        page: filters.page,
        pageSize: pageSize,
        pages: Math.ceil(products.length / pageSize),
      };
    }

    return { items: products, total: products.length };
  }

  _searchMockProducts(query) {
    const lowerQuery = query.toLowerCase();
    return {
      items: MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      ),
    };
  }

  _getMockCategories() {
    return { items: MOCK_CATEGORIES };
  }

  _getMockLocations() {
    return { items: MOCK_LOCATIONS };
  }

  _getMockMedicinalContent() {
    return { items: MOCK_MEDICINAL_BENEFITS };
  }

  _getMockFAQ() {
    return { items: MOCK_FAQ };
  }

  _submitMockContact(data) {
    console.log('Mock contact submission:', data);
    return { success: true, message: 'Mensagem recebida com sucesso!' };
  }
}

const apiService = new ApiService();
