import { useMemo, useState } from "react";
import { Eyebrow as K, StatCard as Stat } from "../components/Brand";

export default function Lots({ lots }) {
  const [query, setQuery] = useState("");
  const municipalities = new Set(lots.map((lot) => lot.region).filter(Boolean));
  const list = useMemo(() => lots.filter((lot) =>
    `${lot.name} ${lot.producer} ${lot.region}`.toLowerCase().includes(query.toLowerCase())
  ), [lots, query]);

  return (
    <section className="inner frame">
      <K>OFERTAS DA REDE</K>
      <div className="title-row">
        <h1>Lotes com origem,<br /><em>volume e colheita.</em></h1>
        <label className="search">⌕ <input placeholder="Produto, produtor ou município" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <section className="stats">
        <Stat l="Lotes disponíveis" n={String(lots.length).padStart(2, "0")} />
        <Stat l="Municípios cadastrados" n={String(municipalities.size).padStart(2, "0")} t="white" />
        <Stat l="Identificação regional" n="IBGE" t="orange" />
      </section>
      <div className="lot-table">
        {list.length > 0 && <div className="head"><span>Produto / produtor</span><span>Origem</span><span>Volume</span><span>Confiança</span><span>Colheita</span></div>}
        {list.map((lot) => (
          <article key={lot.id || `${lot.name}-${lot.producer}`}>
            <div><b>{lot.name}</b><small>{lot.producer}</small></div>
            <span>{lot.region}</span>
            <span>{lot.volume}</span>
            <strong>{lot.score}/100</strong>
            <span>{lot.status}</span>
          </article>
        ))}
        {list.length === 0 && (
          <div className="empty">
            <b>{query ? "Nenhum lote corresponde à busca." : "Ainda não há lotes cadastrados."}</b>
            <p>As ofertas aparecem aqui quando produtores publicam seus produtos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
