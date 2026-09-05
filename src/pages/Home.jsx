import { Eyebrow as K, StatCard as Stat } from "../components/Brand";

export default function Home({ go }) {
  const networkItems = [
    {
      number: "01",
      category: "OFERTA",
      title: "Lotes organizados",
      description:
        "Produto, origem aproximada, volume e período de colheita em uma leitura objetiva.",
      highlight: "24 ofertas",
      destination: "lotes",
    },
    {
      number: "02",
      category: "CONFIANÇA",
      title: "Decisão com contexto",
      description:
        "Indicadores demonstrativos e avisos claros, sem apresentar estimativas como garantias.",
      highlight: "87/100",
      destination: "lotes",
    },
    {
      number: "03",
      category: "LOGÍSTICA",
      title: "Carga compartilhada",
      description:
        "Produtores próximos e destinos compatíveis revelam oportunidades de reduzir custos.",
      highlight: "−32% frete",
      destination: "logistica",
    },
  ];

  const regions = [
    {
      city: "MOGI DAS CRUZES",
      specialty: "CAQUI · HORTICULTURA",
    },
    {
      city: "IBIÚNA",
      specialty: "FOLHOSAS · CULTIVO PROTEGIDO",
    },
    {
      city: "PIEDADE",
      specialty: "ALCACHOFRA · HORTIFRÚTI",
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-content frame">
          <K>AGRICULTURA FAMILIAR · REDE INTELIGENTE</K>

          <h1>
            AGRO
            <br />
            <span>NEXUS</span>
          </h1>

          <p className="hero-tag">
            SUA SAFRA NÃO PRECISA VIAJAR SOZINHA
          </p>

          <p>
            Oferta organizada, confiança progressiva e logística compartilhada
            para fortalecer quem produz.
          </p>

          <div className="actions">
            <button
              type="button"
              className="lime"
              onClick={() => go("acesso")}
            >
              ENTRAR NA REDE
            </button>

            <button type="button" onClick={() => go("proposta")}>
              CONHECER O PROJETO →
            </button>
          </div>

          <div className="hero-signals">
            <span>
              <i>●</i>
              <b>24 LOTES</b>
              <small>oferta visível</small>
            </span>

            <span>
              <i>↗</i>
              <b>3 ROTAS</b>
              <small>em formação</small>
            </span>

            <span>
              <i>✓</i>
              <b>REGIÃO SEGURA</b>
              <small>endereço protegido</small>
            </span>
          </div>
        </div>
      </section>

      <section className="stats frame">
        <Stat l="Economia logística" n="−32%" />

        <Stat
          l="Índice de confiança"
          n="87/100"
          t="white"
        />

        <Stat
          l="Mais renda no campo"
          n="+18%"
          t="orange"
        />
      </section>

      <section className="story frame">
        <div className="story-copy">
          <K>QUEM MOVE ESSA REDE</K>

          <h2>
            QUEM PRODUZ
            <br />
            MERECE <em>ALCANCE.</em>
          </h2>

          <p>
            O AgroNexus dá contexto à produção familiar. Cada lote carrega
            origem, volume e janela de colheita — informações que aproximam
            compradores e tornam o transporte coletivo uma decisão possível.
          </p>

          <button
            type="button"
            className="outline"
            onClick={() => go("proposta")}
          >
            NOSSA PROPOSTA →
          </button>
        </div>

        <div
          className="farmer-figure"
          role="img"
          aria-label="Produtor rural em uma plantação verde"
        >
          <span>PRODUTOR EM FOCO</span>

          <aside>
            <b>+18%</b>
            <small>potencial de renda</small>
          </aside>
        </div>

        <div className="story-note">
          <b>01</b>

          <p>
            Uma plataforma séria não promete atalhos: organiza informação,
            explicita estimativas e protege a localização exata do produtor.
          </p>
        </div>
      </section>

      <section className="network frame">
        <K>COMO A REDE FUNCIONA</K>

        <div className="section-heading">
          <h2>
            TRÊS FRENTES.
            <br />
            UMA <em>CADEIA.</em>
          </h2>

          <p>
            Da colheita ao destino, cada etapa existe para reduzir ruído e
            aumentar a capacidade de decisão.
          </p>
        </div>

        <div className="network-cards">
          {networkItems.map((item, index) => (
            <article
              key={item.number}
              className={`card-${index + 1}`}
            >
              <div className="card-image">
                <span>{item.number}</span>
                <aside>{item.highlight}</aside>
              </div>

              <K>{item.category}</K>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <button
                type="button"
                onClick={() => go(item.destination)}
              >
                EXPLORAR →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="regions frame">
        <div>
          <K>TERRITÓRIOS CONECTADOS</K>

          <h2>
            DA REGIÃO
            <br />
            PARA A <em>REDE.</em>
          </h2>

          <p>
            A plataforma trabalha com regiões aproximadas para preservar a
            privacidade e demonstrar agrupamentos logísticos.
          </p>

          <div className="territory-bubble">
            <b>18</b>
            <span>regiões com potencial de conexão</span>
          </div>
        </div>

        <div className="region-strip">
          {regions.map((region, index) => (
            <article
              key={region.city}
              className={`region-card region-${index + 1}`}
            >
              <span>0{index + 1}</span>
              <b>{region.city}</b>
              <small>{region.specialty} · OFERTAS ATIVAS</small>
            </article>
          ))}
        </div>
      </section>

      <section className="pitch-section frame">
        <div className="pitch-copy">
          <K>PITCH OFICIAL · AGRONEXUS PREMIUM</K>

          <h2>
            CONHEÇA A NOVA
            <br />
            <em>EXPERIÊNCIA AGRONEXUS.</em>
          </h2>

          <p>
            Veja como o AgroNexus conecta empreendedores rurais e compradores
            por meio de perfis específicos, lotes organizados, propostas
            comerciais, indicadores de confiança e proteção dos contatos.
          </p>

          <a
            className="lime pitch-link"
            href="https://youtu.be/iXwDXU64oTM"
            target="_blank"
            rel="noreferrer"
          >
            ASSISTIR NO YOUTUBE ↗
          </a>
        </div>

        <div className="pitch-video">
          <iframe
            src="https://www.youtube.com/embed/iXwDXU64oTM"
            title="Pitch oficial do AgroNexus Premium"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="closing frame">
        <K>O PRÓXIMO LOTE COMEÇA AQUI</K>

        <h2>
          TRANSFORME PRODUÇÃO
          <br />
          EM <em>CONEXÃO.</em>
        </h2>

        <button
          type="button"
          className="lime"
          onClick={() => go("acesso")}
        >
          CRIAR MINHA ÁREA →
        </button>
      </section>
    </>
  );
}