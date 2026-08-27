import { useMemo, useState } from "react";
import { Eyebrow as K, RouteArt, StatCard as Stat } from "../components/Brand";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { demoLots } from "../services/mockData";
export default function Home() {
    const [page, setPage] = useState("inicio");
    const [account, setAccount] = useState(null);
    const [lots, setLots] = useState([]);
    const [menu, setMenu] = useState(false);
    const [toast, setToast] = useState("");
    const [history, setHistory] = useState([]);
    const [createAccount, setCreateAccount] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [negotiations, setNegotiations] = useState([]);
    const go = (nextPage) => {
        if (nextPage !== page)
            setHistory((pages) => [...pages, page]);
        setPage(nextPage);
        setMenu(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const goBack = () => {
        if (!history.length)
            return;
        setPage(history[history.length - 1]);
        setHistory((pages) => pages.slice(0, -1));
        setMenu(false);
    };
    const logout = () => {
        setAccount(null);
        setHistory([]);
        setCreateAccount(false);
        setPage("acesso");
    };
    const openCreateAccount = () => {
        setCreateAccount(true);
        go("acesso");
    };
    const marketplaceLots = [...lots, ...demoLots];
    const myLots = account ? lots.filter((lot) => lot.ownerEmail === account.email) : [];
    const authenticate = (profile, isCreating) => {
        if (isCreating) {
            if (accounts.some((item) => item.email === profile.email))
                return { success: false, message: "Este e-mail já possui uma conta demonstrativa." };
            setAccounts([...accounts, profile]);
            setAccount(profile);
            go("painel");
            return { success: true };
        }
        const savedAccount = accounts.find((item) => item.email === profile.email && item.role === profile.role);
        if (!savedAccount)
            return { success: false, message: "Conta não encontrada. Crie um perfil para continuar." };
        setAccount(savedAccount);
        go("painel");
        return { success: true };
    };
    const sendProposal = (proposal) => {
        setNegotiations([{ ...proposal, id: Date.now(), status: "Enviada" }, ...negotiations]);
        setToast("Proposta enviada com segurança.");
        setTimeout(() => setToast(""), 3000);
    };
    const updateNegotiation = (id, status) => {
        setNegotiations(negotiations.map((item) => item.id === id ? { ...item, status } : item));
        setToast(`Proposta ${status.toLowerCase()}.`);
        setTimeout(() => setToast(""), 3000);
    };
    return (<div>
      <SiteHeader currentPage={page} isLoggedIn={Boolean(account)} isProducer={account?.role === "entrepreneur"} menuOpen={menu} canGoBack={history.length > 0} onNavigate={go} onBack={goBack} onLogout={logout} onCreateAccount={openCreateAccount} onToggleMenu={() => setMenu((open) => !open)}/>
      <main>
        {page === "inicio" && <Landing go={go}/>}{" "}
        {page === "proposta" && <Proposal go={go}/>}{" "}
        {page === "lotes" && <Lots lots={marketplaceLots}/>}{" "}
        {page === "logistica" && <Logistics />}{" "}
        {page === "contato" && (<Contact done={() => {
                setToast("Mensagem recebida.");
                setTimeout(() => setToast(""), 3000);
            }}/>)}{" "}
        {page === "acesso" && (<Access startCreating={createAccount} done={authenticate}/>)}{" "}
        {page === "painel" && account && <Dashboard account={account} lots={myLots} marketplaceLots={marketplaceLots} negotiations={negotiations} onSendProposal={sendProposal} onUpdateNegotiation={updateNegotiation} go={go}/>}{" "}
        {page === "produto" && account && (<Product done={(l) => {
                setLots([{ ...l, producer: account.business || account.name, ownerEmail: account.email, contact: account.phone }, ...lots]);
                setToast("Lote cadastrado com sucesso.");
                go("painel");
                setTimeout(() => setToast(""), 3000);
            }}/>)}
      </main>
      {toast && <div className="toast">✓ {toast}</div>}
      <SiteFooter />
    </div>);
}
function calculateProfileScore(lots) {
    if (!lots.length)
        return 0;
    return Math.round(lots.reduce((sum, lot) => sum + lot.score, 0) / lots.length);
}
function calculateRoute(region) {
    const routes = {
        "Mogi das Cruzes · SP": "Mogi das Cruzes → São Paulo",
        "Ibiúna · SP": "Ibiúna → Sorocaba",
        "Piedade · SP": "Piedade → São Paulo",
    };
    return routes[region] || `${region} → Centro de distribuição`;
}
function calculateProductScore(name, volume, description) {
    const product = name.toLowerCase();
    let score = 65;
    if (product.includes("tomate") || product.includes("alface"))
        score += 10;
    if (product.includes("caqui") || product.includes("morango"))
        score += 12;
    if (product.includes("alcachofra") || product.includes("orgânico"))
        score += 14;
    if (Number(volume) >= 100)
        score += 5;
    if (Number(volume) >= 300)
        score += 4;
    if (description.trim().length >= 20)
        score += 4;
    return Math.min(score, 95);
}
function Landing({ go }) {
    return (<>
      <section className="hero">
        <div className="hero-content frame">
          <K>AGRICULTURA FAMILIAR · REDE INTELIGENTE</K>
          <h1>
            AGRO
            <br />
            <span>NEXUS</span>
          </h1>
          <p className="hero-tag">SUA SAFRA NÃO PRECISA VIAJAR SOZINHA</p>
          <p>
            Oferta organizada, confiança progressiva e logística compartilhada
            para fortalecer quem produz.
          </p>
          <div className="actions">
            <button className="lime" onClick={() => go("acesso")}>
              ENTRAR NA REDE
            </button>
            <button onClick={() => go("proposta")}>CONHECER O PROJETO →</button>
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
        <Stat l="Economia logística" n="−32%"/>
        <Stat l="Índice de confiança" n="87/100" t="white"/>
        <Stat l="Mais renda no campo" n="+18%" t="orange"/>
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
          <button className="outline" onClick={() => go("proposta")}>
            NOSSA PROPOSTA →
          </button>
        </div>
        <div className="farmer-figure" role="img" aria-label="Produtor rural em uma plantação verde">
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
            aumentar capacidade de decisão.
          </p>
        </div>
        <div className="network-cards">
          {[
            [
                "01",
                "OFERTA",
                "Lotes organizados",
                "Produto, origem aproximada, volume e período de colheita em uma leitura objetiva.",
                "24 ofertas",
            ],
            [
                "02",
                "CONFIANÇA",
                "Decisão com contexto",
                "Indicadores demonstrativos e avisos claros, sem apresentar estimativas como garantias.",
                "87/100",
            ],
            [
                "03",
                "LOGÍSTICA",
                "Carga compartilhada",
                "Produtores próximos e destinos compatíveis revelam oportunidades de reduzir custos.",
                "−32% frete",
            ],
        ].map((x, i) => (<article key={x[0]} className={`card-${i + 1}`}>
              <div className="card-image">
                <span>{x[0]}</span>
                <aside>{x[4]}</aside>
              </div>
              <K>{x[1]}</K>
              <h3>{x[2]}</h3>
              <p>{x[3]}</p>
              <button onClick={() => go(i === 2 ? "logistica" : "lotes")}>
                EXPLORAR →
              </button>
            </article>))}
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
          {[
            ["MOGI DAS CRUZES", "CAQUI · HORTICULTURA"],
            ["IBIÚNA", "FOLHOSAS · CULTIVO PROTEGIDO"],
            ["PIEDADE", "ALCACHOFRA · HORTIFRÚTI"],
        ].map(([city, specialty], i) => (<article key={city} className={`region-card region-${i + 1}`}>
              <span>0{i + 1}</span>
              <b>{city}</b>
              <small>{specialty} · OFERTAS ATIVAS</small>
            </article>))}
        </div>
      </section>
      <section className="closing frame">
        <K>O PRÓXIMO LOTE COMEÇA AQUI</K>
        <h2>
          TRANSFORME PRODUÇÃO
          <br />
          EM <em>CONEXÃO.</em>
        </h2>
        <button className="lime" onClick={() => go("acesso")}>
          CRIAR MINHA ÁREA →
        </button>
      </section>
    </>);
}
function Proposal({ go }) {
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
                <p>Encontra ofertas verificadas e inicia negociações de forma organizada e protegida.</p>
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
              <K>RELATO DEMONSTRATIVO · PERSONA DO MVP</K>
              <blockquote>
                “Antes, minha produção dependia de indicação. Com os lotes
                organizados, consigo mostrar o que tenho, quando estará pronto
                e iniciar uma conversa com mais segurança.”
              </blockquote>
              <small>Empreendedor rural · região de Mogi das Cruzes</small>
            </div>
          </article>
          <article className="impact-story impact-numbers">
            <K>IMPACTO PROJETADO</K>
            <strong>+18%</strong>
            <h3>MAIS POTENCIAL DE RENDA</h3>
            <p>
              Ao reduzir ruídos, melhorar a visibilidade e aproximar as duas
              pontas da negociação.
            </p>
            <small>Indicador demonstrativo do MVP</small>
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
                "Simulações identificadas sem promessas irreais.",
            ],
        ].map((x) => (<article key={x[0]}>
            <b>{x[0]}</b>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </article>))}
      </section>
    </>);
}
function Lots({ lots }) {
    const [q, setQ] = useState("");
    const list = useMemo(() => lots.filter((x) => (x.name + x.producer + x.region)
        .toLowerCase()
        .includes(q.toLowerCase())), [lots, q]);
    return (<section className="inner frame">
      <K>CENTRAL DE OFERTA · ATUALIZAÇÃO CONTÍNUA</K>
      <div className="title-row">
        <h1>
          Lotes com história,
          <br />
          <em>não só números.</em>
        </h1>
        <label className="search">
          ⌕{" "}
          <input placeholder="Produto, produtor ou região" value={q} onChange={(e) => setQ(e.target.value)}/>
        </label>
      </div>
      <section className="stats">
        <Stat l="Lotes disponíveis" n={String(lots.length).padStart(2, "0")}/>
        <Stat l="Regiões conectadas" n="18" t="white"/>
        <Stat l="Negociações concluídas" n="92%" t="orange"/>
      </section>
      <div className="lot-table">
        <div className="head">
          <span>Produto / produtor</span>
          <span>Origem</span>
          <span>Volume</span>
          <span>Confiança</span>
          <span>Janela</span>
        </div>
        {list.map((x, i) => (<article key={i}>
            <div>
              <b>{x.name}</b>
              <small>{x.producer}</small>
            </div>
            <span>{x.region}</span>
            <span>{x.volume}</span>
            <strong>{x.score}/100</strong>
            <span>{x.status}</span>
          </article>))}
      </div>
      <p className="notice">
        ⓘ Lotes e indicadores são demonstrativos. Em produção, os dados seriam
        validados e auditáveis.
      </p>
    </section>);
}
function Logistics() {
    const [v, setV] = useState(480), [ok, setOk] = useState(false);
    return (<section className="inner frame">
      <K>SIMULADOR DE LOGÍSTICA COMPARTILHADA</K>
      <h1>
        Agrupe a rota.
        <br />
        <em>Proteja sua margem.</em>
      </h1>
      <p className="lead">
        Escolha origem, destino e volume para visualizar uma estimativa
        explicável de frete compartilhado.
      </p>
      <div className="sim">
        <form onSubmit={(e) => {
            e.preventDefault();
            setOk(true);
        }}>
          <label>
            Origem
            <select>
              <option>Mogi das Cruzes · SP</option>
              <option>Ibiúna · SP</option>
              <option>Piedade · SP</option>
            </select>
          </label>
          <label>
            Destino
            <select>
              <option>São Paulo · Capital</option>
              <option>Campinas · SP</option>
            </select>
          </label>
          <label>
            Volume (kg)
            <input type="number" min="20" max="2000" value={v} onChange={(e) => setV(+e.target.value)}/>
          </label>
          <button className="lime">Calcular rota ↗</button>
        </form>
        <div className="map">
          <RouteArt />
          {ok && (<div className="result">
              <K>ESTIMATIVA</K>
              <strong>{Math.min(42, 18 + Math.round(v / 55))}%</strong>
              <span>economia potencial</span>
              <p>
                {Math.max(2, Math.round(v / 180))} produtores compatíveis
                <br />
                {Math.round(v * 0.08)} kg CO₂ evitados
              </p>
            </div>)}
        </div>
      </div>
      <p className="notice">
        Simulação pedagógica; não substitui cotação ou análise logística real.
      </p>
    </section>);
}
function Access({ done, startCreating }) {
    const [create, setCreate] = useState(Boolean(startCreating));
    const [role, setRole] = useState("entrepreneur");
    const [error, setError] = useState("");
    const submitAccess = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const profile = {
            name: String(form.get("name")),
            business: String(form.get("business") || form.get("name")),
            role: String(form.get("role")),
            email: String(form.get("email")).toLowerCase(),
            phone: String(form.get("phone") || ""),
            document: String(form.get("document") || ""),
            region: String(form.get("region") || ""),
            activity: String(form.get("activity") || ""),
            monthlyDemand: String(form.get("monthlyDemand") || ""),
            verificationScore: create ? 90 : 0,
            verificationStatus: create ? "Cadastro verificado" : "",
        };
        const result = done(profile, create);
        if (!result.success)
            setError(result.message);
    };
    return (<section className="form-page frame">
      <div>
        <K>PORTAL DE CONEXÕES</K>
        <h1>
          {create ? (<>
              Seu produto.
              <br />
              <em>Sua rede.</em>
            </>) : (<>
              Bem-vindo
              <br />
              <em>de volta.</em>
            </>)}
        </h1>
        <p>
          Produtores publicam suas ofertas. Compradores encontram produtos,
          avaliam confiança e iniciam conexões diretas.
        </p>
        <ul>
          <li>Perfil de produtor ou comprador</li>
          <li>Score progressivo e explicável</li>
          <li>Conexão sem atravessador</li>
        </ul>
      </div>
      <form onSubmit={submitAccess}>
        <div className="tabs">
          <button type="button" className={!create ? "sel" : ""} onClick={() => setCreate(false)}>
            Entrar
          </button>
          <button type="button" className={create ? "sel" : ""} onClick={() => setCreate(true)}>
            Criar conta
          </button>
        </div>
        <label>
          Perfil de acesso
          <select name="role" value={role} onChange={(event) => setRole(event.target.value)} required>
            <option value="entrepreneur">Sou empreendedor rural</option>
            <option value="buyer">Sou comprador / negociador</option>
          </select>
        </label>
        <label>
          Seu nome
          <input name="name" required placeholder="Como quer ser chamado?"/>
        </label>
        {create && (<>
            <label>
              Propriedade ou empresa
              <input name="business" required placeholder="Nome do negócio"/>
            </label>
            <label>
              CPF ou CNPJ
              <input name="document" required/>
            </label>
            <label>
              Telefone
              <input name="phone" required/>
            </label>
            <label>
              Região de atuação
              <select name="region" required>
                <option value="Mogi das Cruzes · SP">Mogi das Cruzes · SP</option>
                <option value="Ibiúna · SP">Ibiúna · SP</option>
                <option value="Piedade · SP">Piedade · SP</option>
                <option value="São Paulo · Capital">São Paulo · Capital</option>
              </select>
            </label>
            {role === "entrepreneur" ? (<label>
                Produção principal
                <input name="activity" required placeholder="Ex.: hortaliças, frutas, orgânicos"/>
              </label>) : (<>
                <label>
                  Tipo de comprador
                  <select name="activity" required>
                    <option>Mercado ou varejo</option>
                    <option>Restaurante</option>
                    <option>Distribuidor</option>
                    <option>Cooperativa</option>
                    <option>Investidor de impacto</option>
                  </select>
                </label>
                <label>
                  Demanda mensal aproximada
                  <input name="monthlyDemand" required placeholder="Ex.: 800 kg por mês"/>
                </label>
              </>)}
            <label className="consent-field">
              <input name="consent" type="checkbox" required/>
              Confirmo que os dados são verdadeiros e autorizo a verificação demonstrativa.
            </label>
            <div className="verification-note">
              <b>Verificação do MVP</b>
              <span>Identidade, contato, atuação e aceite de uso são conferidos antes de liberar negociações.</span>
            </div>
          </>)}
        <label>
          E-mail
          <input name="email" type="email" required/>
        </label>
        <label>
          Senha
          <input name="password" type="password" minLength={6} required/>
        </label>
        <button className="lime">
          {create ? "Criar minha área" : "Entrar na minha área"} ↗
        </button>
        {error && <p className="form-error">{error}</p>}
        <small>Seus dados são tratados com privacidade e segurança.</small>
      </form>
    </section>);
}
function Dashboard({ account, lots, marketplaceLots, negotiations, onSendProposal, onUpdateNegotiation, go }) {
    const isBuyer = account.role === "buyer";
    const [selectedLot, setSelectedLot] = useState(null);
    const buyerNegotiations = negotiations.filter((item) => item.buyerEmail === account.email);
    const producerNegotiations = negotiations.filter((item) => item.producerEmail === account.email);
    const acceptedPurchases = buyerNegotiations.filter((item) => item.status === "Aceita").length;
    const profileScore = isBuyer
        ? Math.min(98, account.verificationScore + acceptedPurchases * 2)
        : lots.length ? Math.round(calculateProfileScore(lots) * .75 + account.verificationScore * .25) : 0;
    const routes = [...new Set(lots.map((lot) => lot.route))];
    if (isBuyer) {
        return (<section className="inner frame">
          <K>PAINEL DO COMPRADOR · OPORTUNIDADES</K>
          <div className="title-row">
            <h1>Bom ter você,<br/><em>{account.business || account.name}.</em></h1>
            <button className="outline" onClick={() => go("lotes")}>Explorar lotes</button>
          </div>
          <section className="stats">
            <Stat l="Ofertas disponíveis" n={String(marketplaceLots.length).padStart(2, "0")}/>
            <Stat l="Score do comprador" n={`${profileScore}/100`} t="white"/>
            <Stat l="Negociações iniciadas" n={String(buyerNegotiations.length).padStart(2, "0")} t="orange"/>
          </section>
          <div className="profile-check"><b>✓ {account.verificationStatus}</b><span>Identidade, empresa, contato e demanda conferidos no cadastro demonstrativo.</span></div>
          <h2 className="sub">Produtos para negociar</h2>
          <div className="connection-grid">
            {marketplaceLots.map((lot, index) => (<article className="connection-card" key={`${lot.name}-${index}`}>
                <small>{lot.region}</small>
                <h3>{lot.name}</h3>
                <p>{lot.producer} · {lot.volume}</p>
                <strong>Confiança do produtor: {lot.score}/100</strong>
                <button className="lime" onClick={() => setSelectedLot(lot)}>Enviar proposta ↗</button>
              </article>))}
          </div>
          {selectedLot && (<ProposalForm lot={selectedLot} buyer={account} onCancel={() => setSelectedLot(null)} onSend={(proposal) => {
                onSendProposal(proposal);
                setSelectedLot(null);
            }}/>) }
          <h2 className="sub">Minhas negociações</h2>
          <NegotiationList items={buyerNegotiations} viewer="buyer"/>
          <p className="notice">Contatos são protegidos e liberados somente quando o empreendedor aceita a proposta.</p>
        </section>);
    }
    return (<section className="inner frame">
      <K>PAINEL DO EMPREENDEDOR RURAL · VISÃO GERAL</K>
      <div className="title-row">
        <h1>Bom ter você,<br/><em>{account.business || account.name}.</em></h1>
        <button className="outline" onClick={() => go("produto")}>+ Cadastrar lote</button>
      </div>
      <section className="stats">
        <Stat l="Lotes ativos" n={String(lots.length).padStart(2, "0")}/>
        <Stat l="Score da produção" n={`${profileScore}/100`} t="white"/>
        <Stat l="Rotas compatíveis" n={String(routes.length).padStart(2, "0")} t="orange"/>
      </section>
      <div className="profile-check"><b>✓ {account.verificationStatus}</b><span>Identidade, propriedade, contato e atividade produtiva conferidos no cadastro demonstrativo.</span></div>
      <div className="steps">
        <K>PRÓXIMOS PASSOS</K>
        <div>
          <button onClick={() => go("produto")}>01 <span>Cadastrar produto<small>Informe sua colheita</small></span>→</button>
          <button onClick={() => go("lotes")}>02 <span>Conhecer compradores<small>Veja a rede</small></span>→</button>
          <button onClick={() => go("logistica")}>03 <span>Encontrar rota<small>Simule o frete</small></span>→</button>
        </div>
      </div>
      <h2 className="sub">Minha produção e rotas</h2>
      {lots.length ? (<div className="lot-table compact">
          {lots.map((lot, index) => (<article key={`${lot.name}-${index}`}>
              <div><b>{lot.name}</b><small>{lot.region}</small></div>
              <span>{lot.volume}</span>
              <strong>{lot.score}/100</strong>
              <span>{lot.route}</span>
            </article>))}
        </div>) : (<div className="empty">
          <b>Nenhum produto cadastrado ainda.</b>
          <p>Os lotes, o score e as rotas começam em zero.</p>
          <button className="lime" onClick={() => go("produto")}>Cadastrar primeiro lote ↗</button>
        </div>)}
      <h2 className="sub">Propostas de compradores</h2>
      <NegotiationList items={producerNegotiations} viewer="entrepreneur" onUpdate={onUpdateNegotiation}/>
    </section>);
}
function ProposalForm({ lot, buyer, onSend, onCancel }) {
    const submitProposal = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        onSend({
            lotName: lot.name,
            producerName: lot.producer,
            producerEmail: lot.ownerEmail || "contato@agronexus.demo",
            producerContact: lot.contact || "Contato protegido pelo AgroNexus",
            buyerName: buyer.business || buyer.name,
            buyerEmail: buyer.email,
            buyerContact: buyer.phone,
            quantity: String(form.get("quantity")),
            offer: String(form.get("offer")),
            payment: String(form.get("payment")),
            delivery: String(form.get("delivery")),
            message: String(form.get("message")),
        });
    };
    return (<section className="proposal-box">
      <div>
        <K>PROPOSTA DIRETA · SEM ATRAVESSADOR</K>
        <h2>{lot.name}</h2>
        <p>{lot.producer} · {lot.region} · score {lot.score}/100</p>
      </div>
      <form onSubmit={submitProposal}>
        <div className="form-grid">
          <label>Quantidade desejada<input name="quantity" required placeholder="Ex.: 120 kg"/></label>
          <label>Oferta por unidade<input name="offer" required placeholder="Ex.: R$ 6,50/kg"/></label>
        </div>
        <div className="form-grid">
          <label>Pagamento<select name="payment"><option>À vista</option><option>Na entrega</option><option>7 dias após entrega</option></select></label>
          <label>Retirada ou entrega<select name="delivery"><option>Solicitar entrega</option><option>Retirar na região</option><option>Usar rota compartilhada</option></select></label>
        </div>
        <label>Mensagem ao empreendedor<textarea name="message" required maxLength={220} placeholder="Apresente sua necessidade e condições comerciais."/></label>
        <div className="proposal-actions"><button type="button" className="outline" onClick={onCancel}>Cancelar</button><button className="lime">Enviar proposta segura ↗</button></div>
      </form>
    </section>);
}
function NegotiationList({ items, viewer, onUpdate }) {
    if (!items.length)
        return <div className="empty"><b>Nenhuma negociação ainda.</b><p>As propostas e respostas aparecerão aqui.</p></div>;
    return (<div className="negotiation-list">
      {items.map((item) => (<article key={item.id}>
          <div><small>{item.status}</small><h3>{item.lotName}</h3><p>{viewer === "buyer" ? item.producerName : item.buyerName}</p></div>
          <div><b>{item.quantity}</b><span>{item.offer}</span><small>{item.payment} · {item.delivery}</small></div>
          <p>“{item.message}”</p>
          {item.status === "Aceita" && (<div className="contact-release"><b>Contato liberado</b><span>{viewer === "buyer" ? item.producerContact : `${item.buyerContact} · ${item.buyerEmail}`}</span></div>)}
          {viewer === "entrepreneur" && item.status === "Enviada" && (<div className="negotiation-actions"><button className="outline" onClick={() => onUpdate(item.id, "Recusada")}>Recusar</button><button className="lime" onClick={() => onUpdate(item.id, "Aceita")}>Aceitar e liberar contato</button></div>)}
        </article>))}
    </div>);
}
function Product({ done }) {
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
function Contact({ done }) {
    return (<section className="form-page frame">
      <div>
        <K>CONTATO · CONSTRUINDO EM REDE</K>
        <h1>
          Vamos colocar
          <br />o campo <em>em rede.</em>
        </h1>
        <p>
          Conte uma ideia, proponha uma parceria ou aponte o que podemos
          melhorar.
        </p>
      </div>
      <form onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            done();
        }}>
        <label>
          Nome
          <input required/>
        </label>
        <label>
          E-mail
          <input type="email" required/>
        </label>
        <label>
          Assunto
          <select>
            <option>Quero produzir</option>
            <option>Quero comprar</option>
            <option>Parceria</option>
          </select>
        </label>
        <label>
          Mensagem
          <textarea required minLength={10}/>
        </label>
        <button className="lime">Enviar mensagem ↗</button>
        <small>Responderemos pelo e-mail informado.</small>
      </form>
    </section>);
}
