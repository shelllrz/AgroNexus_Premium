export class UserProfile {
  constructor(id, name, email, region) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.region = region;
  }

  updateRegion(newRegion) {
    this.region = newRegion;
  }
}

export class Entrepreneur extends UserProfile {
  constructor(id, name, email, region, propertyName) {
    super(id, name, email, region);
    this.propertyName = propertyName;
  }

  createProductionPlan(data) {
    return new ProductionPlan({
      ...data,
      producerEmail: this.email,
      producer: this.propertyName,
    });
  }
}

export class Buyer extends UserProfile {
  constructor(id, name, email, region, company) {
    super(id, name, email, region);
    this.company = company;
  }

  createDemand(data) {
    return new DemandIntent({
      ...data,
      buyerEmail: this.email,
      company: this.company,
    });
  }
}

export class Lot {
  constructor(data) {
    this.id = data.id;
    this.ownerEmail = data.ownerEmail;
    this.name = data.name;
    this.region = data.region;
    this.volume = data.volume;
    this.score = data.score;
    this.status = data.status;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }

  isAvailable() {
    return this.status !== "Encerrado";
  }
}

export class Negotiation {
  constructor(data) {
    this.id = data.id;
    this.lotId = data.lotId;
    this.buyerEmail = data.buyerEmail;
    this.producerEmail = data.producerEmail;
    this.quantity = Number(data.quantity);
    this.price = Number(data.price);
    this.status = data.status || "Enviada";
  }

  accept() {
    this.status = "Aceita";
  }

  refuse() {
    this.status = "Recusada";
  }
}

export class DemandIntent {
  constructor(data) {
    this.id = data.id;
    this.buyerEmail = data.buyerEmail;
    this.company = data.company;
    this.product = data.product;
    this.quantity = Number(data.quantity);
    this.region = data.region;
    this.deadline = data.deadline;
    this.frequency = data.frequency;
    this.pricePerKg = Number(data.pricePerKg);
    this.status = data.status || "Aberta";
  }

  isOpen() {
    return this.status === "Aberta";
  }

  estimatedValue() {
    return this.quantity * this.pricePerKg;
  }
}

export class ProductionPlan {
  constructor(data) {
    this.id = data.id;
    this.producerEmail = data.producerEmail;
    this.producer = data.producer;
    this.product = data.product;
    this.quantity = Number(data.quantity);
    this.region = data.region;
    this.harvestDate = data.harvestDate;
    this.cultivation = data.cultivation;
  }

  availableVolumeFor(demand) {
    return Math.min(this.quantity, demand.quantity);
  }

  isReadyBefore(deadline) {
    return new Date(this.harvestDate) <= new Date(deadline);
  }
}

export class SmartMatch {
  constructor(plan, demand, score, factors, impact) {
    this.id = `${plan.id}-${demand.id}`;
    this.plan = plan;
    this.demand = demand;
    this.score = score;
    this.factors = factors;
    this.impact = impact;
  }

  classification() {
    if (this.score >= 80) return "Prioridade alta";
    if (this.score >= 60) return "Boa oportunidade";
    return "Compatibilidade parcial";
  }

  isPriority() {
    return this.score >= 80;
  }
}

export class ImpactRecord {
  constructor(foodSavedKg, co2AvoidedKg, potentialRevenue) {
    this.foodSavedKg = foodSavedKg;
    this.co2AvoidedKg = co2AvoidedKg;
    this.potentialRevenue = potentialRevenue;
  }

  summary() {
    return `${this.foodSavedKg} kg com destino comercial previsto`;
  }
}