import { Eyebrow as K, StatCard as Stat } from "../components/Brand";
import NegotiationList from "../components/NegotiationList";

export default function solicitacoes({
  account,
  negotiations,
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

  return (
    <section className="inner frame">
      <K>CONEXÃO COM COMPRADORES · SOLICITAÇÕES RECEBIDAS</K>

      <div className="title-row">
        <h1>
          PROPOSTAS PARA
          <br />
          <em>SUA PRODUÇÃO.</em>
        </h1>

        <button className="outline" onClick={() => go("painel")}>
          ← VOLTAR AO PAINEL
        </button>
      </div>

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
          Os dados de contato só são liberados para as duas partes depois que
          você aceita a proposta.
        </span>
      </div>

      <h2 className="sub">SOLICITAÇÕES DOS COMPRADORES</h2>

      <NegotiationList
        items={solicitacoesRecebidas}
        viewer="entrepreneur"
        onUpdate={onUpdateNegotiation}
      />

      <p className="notice">
        Antes de responder, confira a quantidade solicitada, o valor oferecido,
        a forma de pagamento, a modalidade de entrega e a mensagem enviada pelo
        comprador.
      </p>
    </section>
  );
}