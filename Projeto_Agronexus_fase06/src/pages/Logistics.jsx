import { useState } from "react";
import { Eyebrow as K, RouteArt } from "../components/Brand";

export default function Logistics() {
    const [v, setV] = useState(480), [ok, setOk] = useState(false);
    return (<section className="inner frame">
      <K>SIMULADOR DE LOGÍSTICA COMPARTILHADA</K>
      <h1>
        Agrupe a rota.
        <br />
        <em>Proteja sua margem.</em>
      </h1>
      <p className="lead">
        Escolha origem, destino e volume para visualizar uma estimativa
        explicável de frete compartilhado.
      </p>
      <div className="sim">
        <form onSubmit={(e) => {
            e.preventDefault();
            setOk(true);
        }}>
          <label>
            Origem
            <select>
              <option>Mogi das Cruzes · SP</option>
              <option>Ibiúna · SP</option>
              <option>Piedade · SP</option>
            </select>
          </label>
          <label>
            Destino
            <select>
              <option>São Paulo · Capital</option>
              <option>Campinas · SP</option>
            </select>
          </label>
          <label>
            Volume (kg)
            <input type="number" min="20" max="2000" value={v} onChange={(e) => setV(+e.target.value)}/>
          </label>
          <button className="lime">Calcular rota ↗</button>
        </form>
        <div className="map">
          <RouteArt />
          {ok && (<div className="result">
              <K>ESTIMATIVA</K>
              <strong>{Math.min(42, 18 + Math.round(v / 55))}%</strong>
              <span>economia potencial</span>
              <p>
                {Math.max(2, Math.round(v / 180))} produtores compatíveis
                <br />
                {Math.round(v * 0.08)} kg CO₂ evitados
              </p>
            </div>)}
        </div>
      </div>
      <p className="notice">
        Simulação pedagógica; não substitui cotação ou análise logística real.
      </p>
    </section>);
}