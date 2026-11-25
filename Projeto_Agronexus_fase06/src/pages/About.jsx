import { Eyebrow as K } from "../components/Brand";

export default function About({ go }) {
    return (<>
      <section className="inner frame">
        <K>POR QUE EXISTIMOS</K>
        <h1>
          Produção compartilhada,
          <br />
          <em>sem adivinhação.</em>
        </h1>
        <p className="lead">
          O AgroNexus enfrenta gargalos de comercialização, informação e
          logística que reduzem a renda dos pequenos produtores e aumentam o
          desperdício.
        </p>
      </section>
      <section className="paper">
        <div className="impact frame">
          <div className="purpose-board">
            <div className="purpose-board-head">
              <K>NOSSO NEXO</K>
              <strong>UMA REDE. DOIS LADOS. UM PROPÓSITO.</strong>
            </div>
            <div className="purpose-flow">
              <article>
                <span>01</span>
                <b>QUEM PRODUZ</b>
                <p>Publica sua produção, organiza os lotes e ganha mais autonomia para negociar.</p>
              </article>
              <i aria-hidden="true">→</i>
              <article className="nexus-step">
                <span>02</span>
                <b>AGRONEXUS</b>
                <p>Transforma dados dispersos em confiança, visibilidade e oportunidades reais.</p>
              </article>
              <i aria-hidden="true">→</i>
              <article>
                <span>03</span>
                <b>QUEM COMPRA</b>
                <p>Encontra ofertas organizadas e inicia negociações de forma organizada e protegida.</p>
              </article>
            </div>
            <div className="purpose-results">
              <span><b>MENOS</b> intermediação</span>
              <span><b>MAIS</b> confiança</span>
              <span><b>MELHOR</b> conexão</span>
            </div>
          </div>
          <div className="purpose-copy">
            <K>QUEM SOMOS · ODS 2</K>
            <h2>Da produção ao destino, uma cadeia mais justa.</h2>
            <p className="purpose-lead">
              Somos uma plataforma criada para aproximar empreendedores rurais
              e compradores que desejam negociar com mais clareza, segurança e
              respeito por quem movimenta o campo.
            </p>
            <p>
              O AgroNexus organiza ofertas, cria sinais de confiança e facilita
              o primeiro contato comercial. Assim, a tecnologia deixa de ser
              apenas uma vitrine e passa a construir relações mais justas,
              fortalecer a agricultura familiar e reduzir desperdícios.
            </p>
            <blockquote>
              “Quando informação e confiança chegam ao campo, a produção ganha
              valor e novas oportunidades encontram um caminho.”
            </blockquote>
            <div className="purpose-actions">
              <button className="lime purpose-primary" onClick={() => go("lotes")}>
                Conhecer lotes →
              </button>
              <button className="paper-link" onClick={() => go("acesso")}>
                Fazer parte da rede
              </button>
            </div>
          </div>
        </div>
        <div className="human-impact frame">
          <article className="impact-story impact-person">
            <div className="impact-photo" role="img" aria-label="Empreendedor rural trabalhando no campo" />
            <div>
              <K>PRODUÇÃO ORGANIZADA</K>
              <h3>Informação clara para cada negociação.</h3>
              <p>Cadastre produtos, volumes, municípios e períodos de colheita para que compradores encontrem oportunidades compatíveis.</p>
            </div>
          </article>
          <article className="impact-story impact-numbers">
            <K>LOCALIZAÇÃO</K>
            <div className="region-formula" aria-label="Estado e município">
              <span>UF</span>
              <b aria-hidden="true">+</b>
              <span>MUNICÍPIO</span>
            </div>
            <p>Origem regional de cada oferta.</p>
          </article>
          <article className="impact-story impact-news">
            <div className="impact-photo" role="img" aria-label="Produtos agrícolas frescos organizados para comercialização" />
            <div>
              <K>EM PAUTA · ODS 2</K>
              <h3>CADEIAS CURTAS FORTALECEM O CAMPO</h3>
              <p>
                Produção identificada, menos desperdício e relações diretas
                ajudam a construir um abastecimento mais resiliente e justo.
              </p>
              <small>Contexto que orienta a proposta AgroNexus</small>
            </div>
          </article>
        </div>
      </section>
      <section className="principles frame">
        {[
            ["01", "Simplicidade", "Poucos campos e orientação em cada etapa."],
            ["02", "Privacidade", "Região aproximada, nunca endereço exato."],
            [
                "03",
                "Transparência",
                "Critérios claros e dados apresentados com contexto.",
            ],
        ].map((x) => (<article key={x[0]}>
            <b>{x[0]}</b>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </article>))}
      </section>
    </>);
}
