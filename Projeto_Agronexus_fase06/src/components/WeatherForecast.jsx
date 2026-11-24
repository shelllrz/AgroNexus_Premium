import { useEffect, useState } from "react";

const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
const forecastUrl = "https://api.open-meteo.com/v1/forecast";
const cache = new Map();

function normalize(value = "") {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function weatherDescription(code) {
  if (code === 0) return "Céu limpo";
  if ([1, 2].includes(code)) return "Parcialmente nublado";
  if (code === 3) return "Nublado";
  if ([45, 48].includes(code)) return "Neblina";
  if ([51, 53, 55, 56, 57].includes(code)) return "Garoa";
  if ([61, 63, 65, 66, 67].includes(code)) return "Chuva";
  if ([71, 73, 75, 77].includes(code)) return "Neve";
  if ([80, 81, 82].includes(code)) return "Pancadas de chuva";
  if ([85, 86].includes(code)) return "Pancadas de neve";
  if ([95, 96, 99].includes(code)) return "Trovoadas";
  return "Condição variável";
}

async function loadForecast(region, signal) {
  const [city, uf] = region.split("·").map((part) => part.trim());
  const geo = new URL(geocodingUrl);
  geo.search = new URLSearchParams({ name: `${city}, ${uf}`, countryCode: "BR", language: "pt", count: "10", format: "json" });
  const geoResponse = await fetch(geo, { signal });
  if (!geoResponse.ok) throw new Error("A localização não pôde ser consultada.");
  const places = (await geoResponse.json()).results || [];
  const place = places.find((item) => normalize(item.name) === normalize(city));
  if (!place) throw new Error("Não encontramos a localização para esta região.");

  const weather = new URL(forecastUrl);
  weather.search = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: place.timezone || "America/Sao_Paulo",
    forecast_days: "7",
  });
  const weatherResponse = await fetch(weather, { signal });
  if (!weatherResponse.ok) throw new Error("A previsão do tempo não está disponível agora.");
  const data = await weatherResponse.json();
  if (!data.daily?.time?.length) throw new Error("A previsão do tempo não está disponível agora.");
  return { placeName: place.name, admin1: place.admin1, daily: data.daily };
}

export default function WeatherForecast({ region }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!region) {
      setForecast(null);
      setError("");
      return undefined;
    }
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError("");
    const cached = cache.get(region);
    const request = cached && Date.now() - cached.savedAt < 60 * 60 * 1000
      ? Promise.resolve(cached.value)
      : loadForecast(region, controller.signal).then((value) => {
          cache.set(region, { value, savedAt: Date.now() });
          return value;
        });
    request
      .then((value) => { if (active) setForecast(value); })
      .catch((err) => { if (active && err.name !== "AbortError") setError(err.message || "Não foi possível consultar a previsão."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [region, retry]);

  if (!region) return null;
  const daily = forecast?.daily;
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short", timeZone: "UTC" });

  return (
    <section className="weather-card" aria-live="polite">
      <div className="weather-heading">
        <div>
          <span className="k">PREVISÃO LOCAL · 7 DIAS</span>
          <h3>{region}</h3>
        </div>
        {loading && <span className="weather-status">Consultando…</span>}
      </div>
      {error && (
        <div className="weather-error">
          <p role="alert">{error}</p>
          <button type="button" className="outline" onClick={() => setRetry((value) => value + 1)}>Atualizar previsão</button>
        </div>
      )}
      {daily && (
        <>
          <div className="weather-days">
            {daily.time.map((day, index) => (
              <article className="weather-day" key={day}>
                <b>{dateFormatter.format(new Date(`${day}T12:00:00Z`))}</b>
                <span>{weatherDescription(daily.weather_code[index])}</span>
                <strong>{Math.round(daily.temperature_2m_max[index])}°</strong>
                <small>{Math.round(daily.temperature_2m_min[index])}° mín.</small>
                <small>Chuva: {daily.precipitation_probability_max[index] ?? "—"}%</small>
              </article>
            ))}
          </div>
          <p className="weather-footnote">Previsão de curto prazo para planejamento. As condições podem mudar; consulte novamente antes da colheita.</p>
          <a className="weather-source" href="https://open-meteo.com/" target="_blank" rel="noreferrer">Dados meteorológicos: Open-Meteo ↗</a>
        </>
      )}
      {!daily && !error && !loading && <p className="weather-footnote">Selecione município e UF para consultar a previsão local.</p>}
    </section>
  );
}
