function money(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function MatchCard({ match, viewer }) {
  const isProducer = viewer === "entrepreneur";

  return (
    <article className="match-card">
      <div className="match-score">
        <strong>{match.score}%</strong>
        <span>{match.classification()}</span>
      </div>

      <div className="match-main">
        <small>{match.demand.product}</small>

        <h3>
          {isProducer
            ? match.demand.company
            : match.plan.producer}
        </h3>

        <p>
          {isProducer
            ? `${match.demand.quantity} kg procurados · ${match.demand.region}`
            : `${match.plan.quantity} kg planejados · ${match.plan.region}`}
        </p>
      </div>

      <div className="match-factors">
        <span>
          Produto
          <b>{match.factors.product}/45</b>
        </span>

        <span>
          Região
          <b>{match.factors.region}/20</b>
        </span>

        <span>
          Volume
          <b>{match.factors.volume}/20</b>
        </span>

        <span>
          Prazo
          <b>{match.factors.date}/15</b>
        </span>
      </div>

      <div className="match-impact">
        <span>Receita potencial</span>

        <strong>
          {money(match.impact.potentialRevenue)}
        </strong>

        <small>
          Estimativa demonstrativa, não é garantia de venda.
        </small>
      </div>
    </article>
  );
}