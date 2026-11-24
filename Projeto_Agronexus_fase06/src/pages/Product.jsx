import { useState } from "react";
import { Eyebrow as K } from "../components/Brand";
import RegionSelector from "../components/RegionSelector";
import { calculateProductScore } from "../utils/scoreUtils";

export default function Product({ done }) {
    const [region, setRegion] = useState("");
    function save(e) {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get("name"));
        const volume = String(f.get("volume"));
        const description = String(f.get("description"));

        done({
            name,
            region,
            volume: `${volume} ${f.get("unit")}`,
            score: calculateProductScore(name, volume, description),
            status: `Colheita: ${f.get("date")}`,
        });
    }
    return (<section className="form-page frame">
      <div>
        <K>NOVO LOTE · ETAPA ÚNICA</K>
        <h1>
          O que você
          <br />
          <em>colheu?</em>
        </h1>
        <p>Preencha apenas o essencial. Você poderá revisar tudo no painel.</p>
        <aside>
          <b>Privacidade por padrão</b>
          <span>Use uma região aproximada, nunca o endereço exato.</span>
        </aside>
      </div>
      <form onSubmit={save}>
        <label>
          Produto
          <input name="name" required placeholder="Tomate italiano"/>
        </label>
        <RegionSelector value={region} onChange={setRegion} />
        <label>
          Descrição
          <textarea name="description" maxLength={180} placeholder="Origem, qualidade e forma de cultivo"/>
        </label>
        <div className="form-grid">
          <label>
            Quantidade
            <input name="volume" type="number" min="1" required/>
          </label>
          <label>
            Unidade
            <select name="unit">
              <option>kg</option>
              <option>caixas</option>
              <option>sacas</option>
            </select>
          </label>
        </div>
        <label>
          Colheita prevista
          <input name="date" type="date" required/>
        </label>
        <button className="lime">Salvar lote ↗</button>
      </form>
    </section>);
}