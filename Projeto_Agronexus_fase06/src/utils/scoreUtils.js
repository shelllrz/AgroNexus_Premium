export function calculateProfileScore(lots) {
  if (!lots.length) return 0;
  return Math.round(lots.reduce((sum, lot) => sum + lot.score, 0) / lots.length);
}

export function calculateProductScore(name, volume, description) {
  const product = name.toLowerCase();
  let score = 65;

  if (product.includes("tomate") || product.includes("alface")) score += 10;
  if (product.includes("caqui") || product.includes("morango")) score += 12;
  if (product.includes("alcachofra") || product.includes("orgânico")) score += 14;
  if (Number(volume) >= 100) score += 5;
  if (Number(volume) >= 300) score += 4;
  if (description.trim().length >= 20) score += 4;

  return Math.min(score, 95);
}