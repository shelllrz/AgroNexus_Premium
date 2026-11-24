import { useEffect, useState } from "react";

const IBGE_API = "https://servicodados.ibge.gov.br/api/v1/localidades";

export default function RegionSelector({ value = "", onChange, required = true }) {
  const [states, setStates] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [uf, setUf] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${IBGE_API}/estados?orderBy=nome`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Não foi possível carregar os estados.");
        return response.json();
      })
      .then((items) => {
        setStates(items);
        setError("");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError("Não foi possível consultar a API do IBGE. Verifique sua conexão e tente novamente.");
      })
      .finally(() => setLoadingStates(false));
    return () => controller.abort();
  }, [retry]);

  useEffect(() => {
    if (!uf) {
      setMunicipalities([]);
      return undefined;
    }
    const controller = new AbortController();
    setLoadingCities(true);
    setMunicipalities([]);
    fetch(`${IBGE_API}/estados/${encodeURIComponent(uf)}/municipios?orderBy=nome`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Não foi possível carregar os municípios.");
        return response.json();
      })
      .then((items) => {
        setMunicipalities(items);
        setError("");
        const existing = String(value).match(/^(.+?)\s*·\s*([A-Z]{2})$/);
        if (existing && existing[2] === uf && items.some((item) => item.nome === existing[1])) {
          setMunicipality(existing[1]);
        } else {
          setMunicipality("");
          onChange("");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError("Não foi possível consultar os municípios desta UF. Tente novamente.");
      })
      .finally(() => setLoadingCities(false));
    return () => controller.abort();
  // value/onChange intentionally excluded: loading the list must not re-fetch on each selection.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uf]);

  const updateUf = (event) => {
    setUf(event.target.value);
    setMunicipality("");
    onChange("");
  };

  return (
    <div className="region-selector">
      <label>
        Estado (UF)
        <select value={uf} onChange={updateUf} required={required} disabled={loadingStates || states.length === 0}>
          <option value="">{loadingStates ? "Carregando estados…" : "Selecione o estado"}</option>
          {states.map((state) => <option key={state.sigla} value={state.sigla}>{state.nome} ({state.sigla})</option>)}
        </select>
      </label>
      <label>
        Município
        <select
          value={municipality}
          required={required}
          disabled={!uf || loadingCities || municipalities.length === 0}
          onChange={(event) => {
            const city = event.target.value;
            setMunicipality(city);
            onChange(city ? `${city} · ${uf}` : "");
          }}
        >
          <option value="">{!uf ? "Selecione primeiro o estado" : loadingCities ? "Carregando municípios…" : "Selecione o município"}</option>
          {municipalities.map((item) => <option key={item.id} value={item.nome}>{item.nome}</option>)}
        </select>
      </label>
      {error && (
        <div>
          <p className="form-error" role="alert">{error}</p>
          <button type="button" className="outline" onClick={() => { setError(""); setLoadingStates(true); setRetry((count) => count + 1); }}>Tentar novamente</button>
        </div>
      )}
    </div>
  );
}
