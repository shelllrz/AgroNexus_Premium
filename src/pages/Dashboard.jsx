import { useState } from "react";
import { Eyebrow as K, StatCard as Stat } from "../components/Brand";
import ProposalForm from "../components/ProposalForm";
import NegotiationList from "../components/NegotiationList";
import { calculateProfileScore } from "../utils/scoreUtils";

export default function Dashboard({ account, lots, marketplaceLots, negotiations, onSendProposal, onUpdateNegotiation, go }) {
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
          <button onClick={() => go("solicitacoes")}>02 <span>Ver solicitações<small>Analise as propostas recebidas</small></span>→</button>
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