import {
  Eyebrow as K,
  StatCard as Stat,
} from "../components/Brand";

import NegotiationList from "../components/NegotiationList";

export default function Solicitacoes({
  account,
  negotiations = [],
  onUpdateNegotiation,
  go,
}) {
  const solicitacoesRecebidas = negotiations.filter(
    (item) => item.producerEmail === account.email
  );

  const aguardandoResposta = solicitacoesRecebidas.filter(
    (item) => item.status === "Enviada"
  );

  const solicitacoesAceitas = solicitacoesRecebidas.filter(
    (item) => item.status === "Aceita"
  );

  const solicitacoesRecusadas = solicitacoesRecebidas.filter(
    (item) => item.status === "Recusada"
  );

  return (
    <section className="inner frame">
      <K>
        CONEXÃO COM COMPRADORES · SOLICITAÇÕES RECEBIDAS
      </K>

      <div className="title-row">
        <h1>
          PROPOSTAS PARA
          <br />
          <em>SUA PRODUÇÃO.</em>
        </h1>

        <button
          className="outline"
          onClick={() => go("painel")}
        >
          ← Voltar ao painel
        </button>
      </div>

      <p className="lead">
        Analise as solicitações enviadas pelos compradores e
        decida quando uma conexão comercial deve continuar.
      </p>

      <section className="stats">
        <Stat
          l="Solicitações recebidas"
          n={String(solicitacoesRecebidas.length).padStart(2, "0")}
        />

        <Stat
          l="Aguardando resposta"
          n={String(aguardandoResposta.length).padStart(2, "0")}
          t="white"
        />

        <Stat
          l="Negociações aceitas"
          n={String(solicitacoesAceitas.length).padStart(2, "0")}
          t="orange"
        />
      </section>

      <div className="profile-check">
        <b>✓ CONTATO COMERCIAL PROTEGIDO</b>

        <span>
          O contato do comprador só será liberado depois que a
          proposta for aceita pelo empreendedor.
        </span>
      </div>

      <div className="title-row">
        <h2 className="sub">
          Solicitações dos compradores
        </h2>

        <span>
          {solicitacoesRecusadas.length} recusada(s)
        </span>
      </div>

      <NegotiationList
        items={solicitacoesRecebidas}
        viewer="entrepreneur"
        onUpdate={onUpdateNegotiation}
      />

      <p className="notice">
        Antes de responder, confira o produto, a quantidade
        solicitada, o valor oferecido, o pagamento, a modalidade
        de entrega e a mensagem do comprador.
      </p>
    </section>
  );
}