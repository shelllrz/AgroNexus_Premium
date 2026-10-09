import {
  DemandIntent,
  ImpactRecord,
  ProductionPlan,
  SmartMatch,
} from "./domainModels.js";

function normalize(text = "") {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function productPoints(plan, demand) {
  const plannedProduct = normalize(plan.product);
  const requestedProduct = normalize(demand.product);

  if (plannedProduct === requestedProduct) {
    return 45;
  }

  if (
    plannedProduct.includes(requestedProduct) ||
    requestedProduct.includes(plannedProduct)
  ) {
    return 32;
  }

  return 0;
}

function regionPoints(plan, demand) {
  if (normalize(plan.region) === normalize(demand.region)) {
    return 20;
  }

  if (plan.region.includes("SP") && demand.region.includes("SP")) {
    return 10;
  }

  return 4;
}

function volumePoints(plan, demand) {
  const coverage = plan.quantity / demand.quantity;

  if (coverage >= 0.8) {
    return 20;
  }

  if (coverage >= 0.5) {
    return 14;
  }

  return 8;
}

function datePoints(plan, demand) {
  const harvest = new Date(plan.harvestDate);
  const deadline = new Date(demand.deadline);

  const differenceInDays = Math.ceil(
    (deadline - harvest) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays >= 0 && differenceInDays <= 14) {
    return 15;
  }

  if (differenceInDays >= -3 && differenceInDays <= 21) {
    return 8;
  }

  return 2;
}

function calculateImpact(plan, demand) {
  const matchedVolume = plan.availableVolumeFor(demand);

  const sameRegion =
    normalize(plan.region) === normalize(demand.region);

  return new ImpactRecord(
    Math.round(matchedVolume * 0.12),
    Math.round(matchedVolume * (sameRegion ? 0.08 : 0.04)),
    matchedVolume * demand.pricePerKg
  );
}

export function createSmartMatch(planData, demandData) {
  const plan = new ProductionPlan(planData);
  const demand = new DemandIntent(demandData);

  const factors = {
    product: productPoints(plan, demand),
    region: regionPoints(plan, demand),
    volume: volumePoints(plan, demand),
    date: datePoints(plan, demand),
  };

  const score = Object.values(factors).reduce(
    (total, value) => total + value,
    0
  );

  return new SmartMatch(
    plan,
    demand,
    Math.min(score, 100),
    factors,
    calculateImpact(plan, demand)
  );
}

export function buildMatches(plans, demands) {
  return plans
    .flatMap((plan) =>
      demands
        .filter((demand) => demand.status === "Aberta")
        .map((demand) => createSmartMatch(plan, demand))
    )
    .filter((match) => match.factors.product > 0)
    .sort((first, second) => second.score - first.score);
}

export function summarizeImpact(matches) {
  const priorityMatches = matches.filter((match) =>
    match.isPriority()
  );

  return priorityMatches.reduce(
    (summary, match) => ({
      foodSavedKg:
        summary.foodSavedKg + match.impact.foodSavedKg,

      co2AvoidedKg:
        summary.co2AvoidedKg + match.impact.co2AvoidedKg,

      potentialRevenue:
        summary.potentialRevenue +
        match.impact.potentialRevenue,
    }),
    {
      foodSavedKg: 0,
      co2AvoidedKg: 0,
      potentialRevenue: 0,
    }
  );
}