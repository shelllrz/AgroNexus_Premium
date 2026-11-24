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
    </article>);
}
