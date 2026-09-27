import { navigationItems } from "../services/mockData";
import { Logo } from "./Brand";

export function SiteHeader({
  currentPage,
  isLoggedIn,
  isProducer,
  menuOpen,
  canGoBack,
  onNavigate,
  onBack,
  onLogout,
  onCreateAccount,
  onToggleMenu,
}) {
  const visibleItems = navigationItems.flatMap(
    ([page, label]) => {
      if (page === "radar" && !isLoggedIn) {
        return [];
      }

      if (page !== "lotes") {
        return [[page, label]];
      }

      if (!isLoggedIn) {
        return [];
      }

      if (isProducer) {
        return [
          ["solicitacoes", "Solicitações"],
        ];
      }

      return [["lotes", "Lotes"]];
    }
  );

  return (
    <header>
      <div className="nav">
        <button
          type="button"
          onClick={() => onNavigate("inicio")}
          aria-label="Voltar para a página inicial"
        >
          <Logo />
        </button>

        {canGoBack && (
          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Voltar
          </button>
        )}

        <button
          type="button"
          className="menu"
          onClick={onToggleMenu}
        >
          Menu
        </button>

        <nav className={menuOpen ? "open" : ""}>
          {visibleItems.map(([page, label]) => (
            <button
              type="button"
              key={page}
              className={
                currentPage === page
                  ? "active"
                  : ""
              }
              onClick={() => onNavigate(page)}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            className={
              currentPage === "painel"
                ? "active"
                : ""
            }
            onClick={() =>
              onNavigate(
                isLoggedIn
                  ? "painel"
                  : "acesso"
              )
            }
          >
            {isLoggedIn
              ? "Minha área"
              : "Entrar"}
          </button>

          {isLoggedIn && (
            <button
              type="button"
              className="logout-button"
              onClick={onLogout}
            >
              Sair
            </button>
          )}

          {!isLoggedIn &&
            currentPage !== "acesso" && (
              <button
                type="button"
                className="lime"
                onClick={onCreateAccount}
              >
                Cadastrar lote ↗
              </button>
            )}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Logo />

      <p>
        Conexões que fortalecem quem produz e
        aproximam quem compra.
      </p>
    </footer>
  );
}