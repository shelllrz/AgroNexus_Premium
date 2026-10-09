export default function NegotiationList({ items, viewer, onUpdate }) {
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