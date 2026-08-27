import logoAgroNexus from "../assets/agronexus-logo.svg";

export function Logo() {
    return (<span className="logo">
      <img src={logoAgroNexus} alt="Logo AgroNexus"/>
      <span>
        <b>AGRO</b>
        <em>NEXUS</em>
        <small>TECNOLOGIA QUE CONECTA O CAMPO</small>
      </span>
    </span>);
}
export function Eyebrow({ children }) {
    return <p className="k">{children}</p>;
}
export function StatCard({ n, l, t = "", }) {
    return (<article className="stat">
      <span>{l}</span>
      <strong className={t}>{n}</strong>
      <small>dados demonstrativos</small>
    </article>);
}
export function RouteArt() {
    return (<div className="route-art">
      <small>ROTA EM FORMAÇÃO · 03 LOTES</small>
      <div className="line">
        <i />
        <i />
        <i />
      </div>
      <b className="a">
        MOGI<small>origem</small>
      </b>
      <b className="b">
        ENCONTRO<small>carga agrupada</small>
      </b>
      <b className="c">
        SÃO PAULO<small>destino</small>
      </b>
      <strong>
        −27%<small>economia estimada</small>
      </strong>
    </div>);
}
