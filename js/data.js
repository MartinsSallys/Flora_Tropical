const products = [
  {
    id: "001",
    name: "Boné Raw",
    category: "Bonés",
    description: "Boné Raw de excelente qualidade, selecionado para conforto.",
    price: 125.9,
    originalPrice: 155.9,
    image: "assets/produto_2.jpg",
    rating: 4.8,
    reviews: 24,
    isPremium: true,
    tags: ["importado", "premium", "exclusivo"]
  },
  {
    id: "002",
    name: "Sedas Bem Bolado Pack",
    category: "Sedas Premium",
    description: "Pack de sedas e filtros para rotina prática, elegante e confiável.",
    price: 24.9,
    originalPrice: null,
    image: "assets/sedas.jpg",
    rating: 4.7,
    reviews: 38,
    isPremium: false,
    tags: ["sedas", "nacional"]
  },
  {
    id: "003",
    name: "Shoulder Bag Sadhu",
    category: "Acessórios",
    description: "Acessório funcional com estética urbana e acabamento de alto padrão.",
    price: 89.9,
    originalPrice: 109.9,
    image: "assets/shoulder_bag.jpg",
    rating: 4.9,
    reviews: 16,
    isPremium: true,
    tags: ["acessório", "lifestyle"]
  },
  {
    id: "004",
    name: "Kit Starter Tropical",
    category: "Artigos Especiais",
    description: "Curadoria de itens essenciais para presentear ou iniciar uma seleção premium.",
    price: 119.9,
    originalPrice: null,
    image: "assets/camisas.jpg",
    rating: 4.6,
    reviews: 19,
    isPremium: true,
    tags: ["kit", "presente"]
  }
];

const categories = [
  {
    name: "Bonés",
    description: "Melhor conforto e estilo",
    image: "assets/produto_2.jpg"
  },
  {
    name: "Tabacos Premium",
    description: "Produtos escolhidos por qualidade, origem e experiência.",
    image: "assets/bob.jpg"
  },
  {
    name: "Acessórios",
    description: "Itens funcionais com acabamento sofisticado para o dia a dia.",
    image: "assets/shoulder_bag.jpg"
  },
  {
    name: "Artigos Especiais",
    description: "Presentes, kits e peças com apelo exclusivo.",
    image: "assets/sedas.jpg"
  }
];

const locations = [
  {
    name: "Parnaíba - PI",
    type: "Matriz",
    description: "Nossa unidade principal com o acervo mais completo da Flora Tropical.",
    address: "Rua Felipe Neves, 290 - São Benedito, Parnaíba - PI",
    phone: "(86) 3221-1234",
    whatsapp: "5586999990000",
    hours: "Seg-Dom: 09h às 22h",
    image: "assets/localizacao.jpg",
    maps: "https://maps.google.com/?q=Parnaíba%20PI"
  },
  {
    name: "Barra Grande - PI",
    type: "Filial",
    description: "Experiência premium em um ponto pensado para atendimento próximo e prático.",
    address: "Avenida Beira Mar, 456 - Barra Grande - PI",
    phone: "(86) 3284-5678",
    whatsapp: "5586988888888",
    hours: "Seg-Dom: 10h às 23h",
    image: "assets/Flora_bg.jpg",
    maps: "https://maps.google.com/?q=Barra%20Grande%20PI"
  }
];

const medicinalBenefits = [
  {
    title: "Alívio de dor crônica",
    description: "Produtos selecionados para ajudar no manejo de dores persistentes.",
    icon: "M9 21h6M10 21v-5.6M14 21v-5.6M12 15.4c-3.1-1.7-5-4-5.7-6.9 2.9.5 5.1 2 6.7 4.5M12 15.4c3.1-1.7 5-4 5.7-6.9-2.9.5-5.1 2-6.7 4.5M12 12.9c-1.3-2.6-1.3-5.2 0-7.9 1.3 2.7 1.3 5.3 0 7.9"
  },
  {
    title: "Redução de ansiedade",
    description: "Opções naturais para promover relaxamento e bem-estar emocional.",
    icon: "M7 21c3.5 0 6.5-2.3 7.4-5.6M5 19c0-7.2 5.4-12.6 13-14 0 7.9-4.8 13-12 13M9 15c1.9-.4 4.4-1.7 7-5"
  },
  {
    title: "Qualidade do sono",
    description: "Seleção curada para melhorar o descanso e a recuperação noturna.",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  },
  {
    title: "Foco e clareza mental",
    description: "Produtos que promovem concentração e performance cognitiva.",
    icon: "M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
  }
];
