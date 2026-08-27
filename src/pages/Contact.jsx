import { Eyebrow as K } from "../components/Brand";

export default function Contact({ done }) {
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