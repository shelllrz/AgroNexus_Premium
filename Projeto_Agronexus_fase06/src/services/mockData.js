export const navigationItems = [
  ["inicio", "Início"],
  ["proposta", "Por que existimos"],
  ["lotes", "Lotes"],
  ["radar", "Radar ESG"],
  ["logistica", "Logística"],
  ["contato", "Contato"],
];

export const demoLots = [
  {
    name: "Tomate italiano",
    producer: "Sítio Aurora",
    region: "Mogi das Cruzes · SP",
    volume: "480 kg",
    score: 87,
    status: "Colheita em 3 dias",
  },
  {
    name: "Alface crespa",
    producer: "Horta do Vale",
    region: "Ibiúna · SP",
    volume: "220 kg",
    score: 91,
    status: "Disponível agora",
  },
  {
    name: "Abobrinha",
    producer: "Cooperativa Raiz",
    region: "Piedade · SP",
    volume: "310 kg",
    score: 76,
    status: "Colheita em 5 dias",
  },
];

export const demoDemands = [
  {
    id: "demanda-mercado-verde",
    buyerEmail: "compras@mercadoverde.com.br",
    company: "Mercado Verde",
    product: "Tomate italiano",
    quantity: 600,
    region: "Mogi das Cruzes · SP",
    deadline: "2026-10-18",
    frequency: "Semanal",
    pricePerKg: 7.8,
    status: "Aberta",
  },
  {
    id: "demanda-rede-raiz",
    buyerEmail: "suprimentos@rederaiz.com.br",
    company: "Rede Raiz",
    product: "Alface crespa",
    quantity: 350,
    region: "São Paulo · Capital",
    deadline: "2026-10-14",
    frequency: "Quinzenal",
    pricePerKg: 5.4,
    status: "Aberta",
  },
  {
    id: "demanda-cozinha-central",
    buyerEmail: "compras@cozinhacentral.com.br",
    company: "Cozinha Central",
    product: "Abobrinha",
    quantity: 420,
    region: "Piedade · SP",
    deadline: "2026-10-22",
    frequency: "Mensal",
    pricePerKg: 6.2,
    status: "Aberta",
  },
];

export const demoProductionPlans = [
  {
    id: "plano-sitio-aurora",
    producerEmail: "demo@sitioaurora.com.br",
    producer: "Sítio Aurora",
    product: "Tomate italiano",
    quantity: 480,
    region: "Mogi das Cruzes · SP",
    harvestDate: "2026-10-12",
    cultivation: "Cultivo protegido",
  },
  {
    id: "plano-horta-vale",
    producerEmail: "demo@hortadovale.com.br",
    producer: "Horta do Vale",
    product: "Alface crespa",
    quantity: 260,
    region: "Ibiúna · SP",
    harvestDate: "2026-10-10",
    cultivation: "Manejo responsável",
  },
];