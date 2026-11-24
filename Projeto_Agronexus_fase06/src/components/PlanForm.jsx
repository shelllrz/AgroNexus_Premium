import { useState } from "react";
import RegionSelector from "./RegionSelector";
import WeatherForecast from "./WeatherForecast";

const initialForm = {
  product: "Tomate italiano",
  quantity: "",
  region: "",
  harvestDate: "",
  cultivation: "Cultivo protegido",
};

export default function PlanForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    onSubmit({
      ...form,
      quantity: Number(form.quantity),
    });

    setForm(initialForm);
  };

  return (
    <form className="radar-form" onSubmit={submit}>
      <h3>Analisar próxima produção</h3>

      <label>
        Produto planejado
        <input
          name="product"
          value={form.product}
          onChange={updateField}
          required
        />
      </label>

      <div className="form-grid">
        <label>
          Quantidade prevista em kg
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={updateField}
            required
          />
        </label>

        <label>
          Colheita prevista
          <input
            name="harvestDate"
            type="date"
            value={form.harvestDate}
            onChange={updateField}
            required
          />
        </label>
      </div>

      <RegionSelector value={form.region} onChange={(region) => setForm((current) => ({ ...current, region }))} />
      <WeatherForecast region={form.region} />

      <label>
        Característica do cultivo
        <select
          name="cultivation"
          value={form.cultivation}
          onChange={updateField}
        >
          <option>Cultivo protegido</option>
          <option>Manejo responsável</option>
          <option>Produção orgânica</option>
          <option>Transição agroecológica</option>
        </select>
      </label>

      <button type="submit" className="lime">
        Calcular oportunidades ↗
      </button>
    </form>
  );
}