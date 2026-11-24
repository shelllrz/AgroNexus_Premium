import { Eyebrow as K, StatCard as Stat } from "../components/Brand";

const PITCH_VIDEO_ID = "NUKg0IJoCSY";

export default function Home({ go }) {
  const features = [
    {
      number: "01",
      category: "OFERTA",
      title: "Lotes organizados",
      description: "Produto, volume, município e período de colheita em um só lugar.",
      highlight: "Produto + colheita",
      destination: "lotes",
    },
    {
      number: "02",
      category: "COMPATIBILIDADE",
      title: "Decisão com contexto",
      description: "O Radar compara produto, região, volume e prazo com critérios claros.",
      highlight: "Score explicado",
      destination: "radar",
    },
    {
      number: "03",
      category: "PLANEJAMENTO",
      title: "Entrega organizada",
      description: "Produtores e compradores alinham retirada e entrega durante a negociação.",
      highlight: "Conexão direta",
      destination: "logistica",
    },
  ];
  const regions = ["MOGI DAS CRUZES", "IBIÚNA", "PIEDADE"];

  return (
    <>
      <section className="hero">
        <div className="hero-content frame">
          <K>AGRICULTURA FAMILIAR · REDE INTELIGENTE</K>
          <h1>AGRO<br /><span>NEXUS</span></h1>
          <p className="hero-tag">SUA SAFRA NÃO PRECISA VIAJAR SOZINHA</p>
          <p>Oferta organizada, informações regionais e conexões comerciais para fortalecer quem produz.</p>
          <div className="actions">
            <button type="button" className="lime" onClick={() => go("acesso")}>ENTRAR NA REDE</button>
            <button type="button" onClick={() => go("proposta")}>CONHECER O PROJETO →</button>
          </div>
          <div className="hero-signals">
            <span><i>●</i><b>OFERTAS</b><small>por produto e região</small></span>
            <span><i>↗</i><b>RADAR ESG</b><small>compatibilidade por critérios</small></span>
            <span><i>✓</i><b>REGIÃO DEFINIDA</b><small>município e UF</small></span>
          </div>
        </div>
      </section>

      <section className="story frame">
        <div className="story-copy">
          <K>QUEM MOVE ESSA REDE</K>
          <h2>QUEM PRODUZ<br />MERECE <em>ALCANCE.</em></h2>
          <p>O AgroNexus organiza informações de origem, volume e colheita para aproximar a agricultura familiar de compradores.</p>
          <button type="button" className="outline" onClick={() => go("proposta")}>NOSSA PROPOSTA →</button>
        </div>
        <div className="farmer-figure" role="img" aria-label="Produtor rural em uma plantação verde">
          <span>PRODUTOR EM FOCO</span>
          <aside><b>IBGE</b><small>município e UF</small></aside>
        </div>
        <div className="story-note"><b>01</b><p>A região é registrada por município e UF. O cadastro não solicita o endereço da propriedade.</p></div>
      </section>

      <section className="network frame">
        <K>COMO A REDE FUNCIONA</K>
        <div className="section-heading">
          <h2>TRÊS FRENTES.<br />UMA <em>CADEIA.</em></h2>
          <p>Da produção à negociação, cada etapa organiza informações para apoiar decisões.</p>
        </div>
        <div className="network-cards">
          {features.map((item, index) => (
            <article key={item.number} className={`card-${index + 1}`}>
              <div className="card-image"><span>{item.number}</span><aside>{item.highlight}</aside></div>
              <K>{item.category}</K>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" onClick={() => go(item.destination)}>EXPLORAR →</button>
            </article>
          ))}
        </div>
      </section>

      <section className="regions frame">
        <div>
          <K>LOCALIDADES DO BRASIL</K>
          <h2>DA REGIÃO<br />PARA A <em>REDE.</em></h2>
          <p>Selecione a unidade da Federação e o município para informar a origem ou o destino de uma oportunidade.</p>
          <div className="territory-bubble"><b>27</b><span>unidades da Federação disponíveis na API do IBGE</span></div>
        </div>
        <div className="region-strip">
          {regions.map((city, index) => (
            <article key={city} className={`region-card region-${index + 1}`}>
              <span>0{index + 1}</span><b>{city}</b><small>MUNICÍPIO · UF</small>
            </article>
          ))}
        </div>
      </section>

      <section className="innovation-home frame">
        <div className="innovation-home-copy">
          <K>NEXUS RADAR ESG</K>
          <h2>PRODUZIR COM<br /><em>SINAL DE DEMANDA.</em></h2>
          <p>O Radar compara planos de produção e intenções de compra por produto, município/UF, volume e prazo. Os indicadores financeiros e ambientais são apresentados como estimativas.</p>
          <button type="button" className="lime" onClick={() => go("acesso")}>ENTRAR E CONHECER O RADAR ESG ↗</button>
        </div>
        <div className="radar-preview" aria-label="Critérios de compatibilidade do Nexus Radar ESG">
          <span>CRITÉRIOS DE COMPATIBILIDADE</span><strong>100</strong><b>PONTOS POSSÍVEIS</b>
          <div><small>PRODUTO</small><i>45 pontos</i></div>
          <div><small>MUNICÍPIO / UF</small><i>20 pontos</i></div>
          <div><small>VOLUME</small><i>20 pontos</i></div>
          <div><small>PRAZO</small><i>15 pontos</i></div>
          <p>A pontuação organiza oportunidades com base nos dados cadastrados.</p>
        </div>
      </section>

      <section className="pitch-section frame">
        <div className="pitch-copy">
          <K>PITCH OFICIAL · AGRONEXUS</K>
          <h2>CONHEÇA A NOVA<br /><em>EXPERIÊNCIA AGRONEXUS.</em></h2>
          <p>Veja como o AgroNexus conecta produtores e compradores por meio de perfis, lotes, propostas comerciais, indicadores de compatibilidade e informações regionais.</p>
          <a className="lime pitch-link" href={`https://www.youtube.com/watch?v=${PITCH_VIDEO_ID}`} target="_blank" rel="noreferrer">ASSISTIR NO YOUTUBE ↗</a>
        </div>
        <div className="pitch-video">
          <iframe src={`https://www.youtube.com/embed/${PITCH_VIDEO_ID}`} title="Pitch do AgroNexus" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
      </section>

      <section className="closing frame">
        <K>O PRÓXIMO LOTE COMEÇA AQUI</K>
        <h2>TRANSFORME PRODUÇÃO<br />EM <em>CONEXÃO.</em></h2>
        <button type="button" className="lime" onClick={() => go("acesso")}>CRIAR MINHA ÁREA →</button>
      </section>
    </>
  );
}
