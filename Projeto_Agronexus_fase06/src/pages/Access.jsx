import { useState } from "react";
import { Eyebrow as K } from "../components/Brand";

export default function Access({ done, startCreating }) {
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