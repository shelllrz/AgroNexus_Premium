import { Eyebrow as K } from "./Brand";

export default function ProposalForm({ lot, buyer, onSend, onCancel }) {
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