import { useState } from "react";

const initialForm = {
  product: "Tomate italiano",
  quantity: "",
  region: "São Paulo · Capital",
  deadline: "",
  frequency: "Semanal",
  pricePerKg: "",
};

export default function DemandForm({ onSubmit }) {
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
      pricePerKg: Number(form.pricePerKg),
    });

    setForm(initialForm);
  };

  return (
    <form className="radar-form" onSubmit={submit}>
      <h3>Publicar intenção de compra</h3>

      <label>
        Produto procurado
        <input
          name="product"
          value={form.product}
          onChange={updateField}
          required
        />
      </label>

      <div className="form-grid">
        <label>
          Quantidade em kg
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
          Preço estimado por kg
          <input
            name="pricePerKg"
            type="number"
            min="0.01"
            step="0.01"
            value={form.pricePerKg}
            onChange={updateField}
            required
          />
        </label>
      </div>

      <label>
        Região de destino
        <select
          name="region"
          value={form.region}
          onChange={updateField}
        >
          <option>São Paulo · Capital</option>
          <option>Mogi das Cruzes · SP</option>
          <option>Ibiúna · SP</option>
          <option>Piedade · SP</option>
        </select>
      </label>

      <div className="form-grid">
        <label>
          Necessidade até
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={updateField}
            required
          />
        </label>

        <label>
          Frequência
          <select
            name="frequency"
            value={form.frequency}
            onChange={updateField}
          >
            <option>Compra única</option>
            <option>Semanal</option>
            <option>Quinzenal</option>
            <option>Mensal</option>
          </select>
        </label>
      </div>

      <button type="submit" className="lime">
        Publicar no Radar ESG ↗
      </button>
    </form>
  );
}