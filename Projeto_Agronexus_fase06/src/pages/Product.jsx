import { Eyebrow as K } from "../components/Brand";
import { calculateProductScore } from "../utils/scoreUtils";
import { calculateRoute } from "../utils/routeUtils";

export default function Product({ done }) {
    function save(e) {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get("name"));
        const volume = String(f.get("volume"));
        const description = String(f.get("description"));
        const region = String(f.get("region"));
        done({
            name,
            region,
            volume: `${volume} ${f.get("unit")}`,
            score: calculateProductScore(name, volume, description),
            route: calculateRoute(region),
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
        <label>
          Região
          <select name="region">
            <option>Mogi das Cruzes · SP</option>
            <option>Ibiúna · SP</option>
            <option>Piedade · SP</option>
          </select>
        </label>
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