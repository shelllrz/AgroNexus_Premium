import { Eyebrow as K } from "../components/Brand";

export default function Logistics() {
  const steps = [
    ["01", "Identifique a origem", "Consulte os lotes cadastrados por produto, volume, município e período de colheita."],
    ["02", "Compare oportunidades", "Use o Nexus Radar para encontrar compatibilidade entre produção e demanda."],
    ["03", "Combine a entrega", "Alinhe retirada, entrega e condições diretamente durante a negociação."],
  ];
  return (
    <section className="inner frame logistics-page">
      <K>LOGÍSTICA COMPARTILHADA</K>
      <h1>Aproximar a produção.<br /><em>Organizar a entrega.</em></h1>
      <p className="lead">O AgroNexus reúne informações de origem, volume e disponibilidade para apoiar o planejamento das entregas entre produtores e compradores.</p>
      <div className="logistics-steps">
        {steps.map(([number, title, description]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="logistics-note">Combine condições, retirada e entrega diretamente com seu parceiro comercial.</p>
    </section>
  );
}
