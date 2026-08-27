export function calculateRoute(region) {
  const routes = {
    "Mogi das Cruzes · SP": "Mogi das Cruzes → São Paulo",
    "Ibiúna · SP": "Ibiúna → Sorocaba",
    "Piedade · SP": "Piedade → São Paulo",
  };

  return routes[region] || `${region} → Centro de distribuição`;
}