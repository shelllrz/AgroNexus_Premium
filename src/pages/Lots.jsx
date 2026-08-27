import { useMemo, useState } from "react";
import { Eyebrow as K, StatCard as Stat } from "../components/Brand";

export default function Lots({ lots }) {
    const [q, setQ] = useState("");
    const list = useMemo(() => lots.filter((x) => (x.name + x.producer + x.region)
        .toLowerCase()
        .includes(q.toLowerCase())), [lots, q]);
    return (<section className="inner frame">
      <K>CENTRAL DE OFERTA · ATUALIZAÇÃO CONTÍNUA</K>
      <div className="title-row">
        <h1>
          Lotes com história,
          <br />
          <em>não só números.</em>
        </h1>
        <label className="search">
          ⌕{" "}
          <input placeholder="Produto, produtor ou região" value={q} onChange={(e) => setQ(e.target.value)}/>
        </label>
      </div>
      <section className="stats">
        <Stat l="Lotes disponíveis" n={String(lots.length).padStart(2, "0")}/>
        <Stat l="Regiões conectadas" n="18" t="white"/>
        <Stat l="Negociações concluídas" n="92%" t="orange"/>
      </section>
      <div className="lot-table">
        <div className="head">
          <span>Produto / produtor</span>
          <span>Origem</span>
          <span>Volume</span>
          <span>Confiança</span>
          <span>Janela</span>
        </div>
        {list.map((x, i) => (<article key={i}>
            <div>
              <b>{x.name}</b>
              <small>{x.producer}</small>
            </div>
            <span>{x.region}</span>
            <span>{x.volume}</span>
            <strong>{x.score}/100</strong>
            <span>{x.status}</span>
          </article>))}
      </div>
      <p className="notice">
        ⓘ Lotes e indicadores são demonstrativos. Em produção, os dados seriam
        validados e auditáveis.
      </p>
    </section>);
}