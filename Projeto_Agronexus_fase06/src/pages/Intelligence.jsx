import {
  Eyebrow as K,
  StatCard as Stat,
} from "../components/Brand";

import DemandForm from "../components/DemandForm";
import MatchCard from "../components/MatchCard";
import PlanForm from "../components/PlanForm";

import {
  buildMatches,
  summarizeImpact,
} from "../services/intelligenceService";

export default function Intelligence({
  account,
  demands,
  productionPlans,
  onRegisterDemand,
  onRegisterPlan,
  go,
}) {
  const isBuyer = account.role === "buyer";

  const allMatches = buildMatches(
    productionPlans,
    demands
  );

  const myDemands = demands.filter(
    (demand) =>
      demand.buyerEmail === account.email
  );

  const myPlans = productionPlans.filter(
    (plan) =>
      plan.producerEmail === account.email
  );

  const visibleMatches = allMatches.filter(
    (match) => {
      if (isBuyer) {
        return (
          match.demand.buyerEmail ===
          account.email
        );
      }

      return (
        match.plan.producerEmail ===
        account.email
      );
    }
  );

  const impact = summarizeImpact(
    visibleMatches
  );

  const priorityCount = visibleMatches.filter(
    (match) => match.isPriority()
  ).length;

  const nonPriorityCount =
    visibleMatches.length - priorityCount;

  const formattedRevenue =
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(impact.potentialRevenue);

  return (
    <section className="inner frame radar-page">
      <K>
        NOVA FUNCIONALIDADE · INTELIGÊNCIA DE DEMANDA E
        IMPACTO
      </K>

      <div className="title-row radar-title">
        <div>
          <h1>
            NEXUS RADAR
            <br />
            <em>ESG.</em>
          </h1>

          <p className="lead">
            O Radar aproxima o que será produzido daquilo
            que empresas realmente desejam comprar. O
            resultado é uma prioridade comercial simples,
            transparente e acompanhada por estimativas de
            impacto.
          </p>
        </div>

        <button
          type="button"
          className="outline"
          onClick={() => go("painel")}
        >
          ← Voltar ao painel
        </button>
      </div>

      <div className="radar-disclaimer">
        <b>Protótipo acadêmico explicável</b>

        <span>
          Os resultados usam regras demonstrativas de
          produto, região, volume e prazo. Não representam
          previsão financeira, garantia de compra ou
          inteligência artificial conectada a dados reais.
        </span>
      </div>

      <section className="stats radar-stats">
        <Stat
          l={
            isBuyer
              ? "Demandas publicadas"
              : "Planos analisados"
          }
          n={String(
            isBuyer
              ? myDemands.length
              : myPlans.length
          ).padStart(2, "0")}
        />

        <Stat
          l="Conexões prioritárias"
          n={String(priorityCount).padStart(
            2,
            "0"
          )}
          t="white"
        />

        <Stat
          l="Alimento com destino previsto"
          n={`${impact.foodSavedKg} kg`}
          t="orange"
        />
      </section>

      <div className="radar-guidance">
        {visibleMatches.length === 0 ? (
          <p>
            <b>
              Seus indicadores ainda estão em zero.
            </b>{" "}
            Cadastre uma demanda ou um plano de produção.
            Os números aumentam quando o Radar encontra uma
            conexão prioritária com score igual ou superior
            a 80.
          </p>
        ) : (
          <p>
            <b>
              Encontramos {visibleMatches.length}{" "}
              conexão(ões).
            </b>{" "}
            {priorityCount} prioritária(s) alimentam o
            painel de impacto
            {nonPriorityCount > 0 &&
              ` e ${nonPriorityCount} oportunidade(s) abaixo de 80 continuam visíveis para análise.`}
          </p>
        )}
      </div>

      <section className="radar-workspace">
        <div>
          <K>
            {isBuyer
              ? "SINALIZE SUA DEMANDA"
              : "PLANEJE COM CONTEXTO"}
          </K>

          <h2>
            {isBuyer
              ? "PUBLIQUE O QUE"
              : "DESCUBRA QUEM"}
            <br />

            <em>
              {isBuyer
                ? "SUA EMPRESA PRECISA."
                : "PODE COMPRAR."}
            </em>
          </h2>

          <p>
            {isBuyer
              ? "Informe produto, volume, destino e prazo. O Radar compara sua necessidade com os planos de produção cadastrados."
              : "Informe somente o essencial da próxima colheita. O Radar mostra demandas corporativas compatíveis antes da produção chegar ao mercado."}
          </p>

          <ul className="radar-benefits">
            <li>
              Informação simples e região aproximada
            </li>

            <li>
              Score de compatibilidade explicado por
              critérios
            </li>

            <li>
              Estimativas de receita e impacto
              identificadas
            </li>

            <li>
              Dados preservados após atualizar a página
            </li>
          </ul>
        </div>

        {isBuyer ? (
          <DemandForm
            onSubmit={onRegisterDemand}
          />
        ) : (
          <PlanForm
            onSubmit={onRegisterPlan}
          />
        )}
      </section>

      <section className="radar-results">
        <div className="section-heading">
          <div>
            <K>CONEXÕES CALCULADAS</K>

            <h2>
              OPORTUNIDADES
              <br />
              <em>EXPLICÁVEIS.</em>
            </h2>
          </div>

          <p>
            Cada resultado soma até 100 pontos: produto
            vale 45, região 20, volume 20 e prazo 15.
            Assim, o usuário entende por que uma conexão
            aparece primeiro.
          </p>
        </div>

        {visibleMatches.length > 0 ? (
          <>
            <div className="match-list">
              {visibleMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  viewer={account.role}
                />
              ))}
            </div>

            {nonPriorityCount > 0 && (
              <p className="match-explanation">
                As oportunidades abaixo de 80 pontos não
                são descartadas. Elas permanecem
                disponíveis para consulta, mas ainda não
                entram nos totais do painel de impacto
                porque precisam de maior compatibilidade
                de região, volume ou prazo.
              </p>
            )}
          </>
        ) : (
          <div className="empty radar-empty">
            <b>
              Ainda não há uma análise vinculada ao seu
              perfil.
            </b>

            <p>
              Preencha o formulário acima. O Radar
              comparará seus dados com os registros
              demonstrativos disponíveis no MVP.
            </p>
          </div>
        )}
      </section>

      <section className="impact-board">
        <div>
          <K>PAINEL DE IMPACTO</K>

          <h2>
            VALOR PARA O CAMPO.
            <br />
            <em>EVIDÊNCIA PARA EMPRESAS.</em>
          </h2>
        </div>

        <div className="impact-numbers">
          <article>
            <strong>
              {impact.foodSavedKg} kg
            </strong>

            <span>
              potencial de alimento direcionado
            </span>
          </article>

          <article>
            <strong>
              {impact.co2AvoidedKg} kg
            </strong>

            <span>
              CO₂ logístico potencialmente evitado
            </span>
          </article>

          <article>
            <strong>
              {formattedRevenue}
            </strong>

            <span>
              receita potencial mapeada
            </span>
          </article>
        </div>

        {priorityCount === 0 && (
          <p className="impact-zero-note">
            Os indicadores aumentam quando uma conexão
            prioritária é encontrada.
          </p>
        )}
      </section>
    </section>
  );
}