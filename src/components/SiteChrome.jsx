import { navigationItems } from "../services/mockData";
import { Logo } from "./Brand";
export function SiteHeader({ currentPage, isLoggedIn, isProducer, menuOpen, canGoBack, onNavigate, onBack, onLogout, onCreateAccount, onToggleMenu, }) {
    const visibleItems = navigationItems.filter(([page]) => page !== "lotes" || isLoggedIn);
    return (<header>
      <div className="nav">
        <button onClick={() => onNavigate("inicio")}>
          <Logo />
        </button>
        {canGoBack && (<button className="back-button" onClick={onBack}>
            ← Voltar
          </button>)}
        <button className="menu" onClick={onToggleMenu}>
          Menu
        </button>
        <nav className={menuOpen ? "open" : ""}>
          {visibleItems.map(([page, label]) => (<button className={currentPage === page ? "active" : ""} onClick={() => onNavigate(page)} key={page}>
              {label}
            </button>))}
          <button onClick={() => onNavigate(isLoggedIn ? "painel" : "acesso")}>
            {isLoggedIn ? "Minha área" : "Entrar"}
          </button>
          {isLoggedIn && (<button className="logout-button" onClick={onLogout}>Sair</button>)}
          {!isLoggedIn && currentPage !== "acesso" && (<button className="lime" onClick={onCreateAccount}>
              Cadastrar lote ↗
            </button>)}
        </nav>
      </div>
    </header>);
}
export function SiteFooter() {
    return (<footer>
      <Logo />
      <p>Conexões que fortalecem quem produz e aproximam quem compra.</p>
    </footer>);
}
