import { useState } from "react";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

import Home from "./pages/Home";
import About from "./pages/About";
import Lots from "./pages/Lots";
import Logistics from "./pages/Logistics";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Solicitacoes from "./pages/solicitacoes";

import { demoLots } from "./services/mockData";

export default function App() {
  const [page, setPage] = useState("inicio");
  const [account, setAccount] = useState(null);
  const [lots, setLots] = useState([]);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [history, setHistory] = useState([]);
  const [createAccount, setCreateAccount] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [negotiations, setNegotiations] = useState([]);

  const isBuyer = account?.role === "buyer";
  const isProducer = Boolean(account && account.role === "entrepreneur");

  const go = (nextPage) => {
    if (nextPage !== page) {
      setHistory((pages) => [...pages, page]);
    }

    setPage(nextPage);
    setMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    if (!history.length) {
      return;
    }

    setPage(history[history.length - 1]);
    setHistory((pages) => pages.slice(0, -1));
    setMenu(false);
  };

  const logout = () => {
    setAccount(null);
    setHistory([]);
    setCreateAccount(false);
    setPage("acesso");
    setMenu(false);
  };

  const openCreateAccount = () => {
    setCreateAccount(true);
    go("acesso");
  };

  const marketplaceLots = [...lots, ...demoLots];

  const myLots = account
    ? lots.filter((lot) => lot.ownerEmail === account.email)
    : [];

  const authenticate = (profile, isCreating) => {
    if (isCreating) {
      const emailAlreadyExists = accounts.some(
        (item) => item.email === profile.email
      );

      if (emailAlreadyExists) {
        return {
          success: false,
          message: "Este e-mail já possui uma conta demonstrativa.",
        };
      }

      setAccounts((currentAccounts) => [...currentAccounts, profile]);
      setAccount(profile);
      go("painel");

      return {
        success: true,
      };
    }

    const savedAccount = accounts.find(
      (item) =>
        item.email === profile.email &&
        item.role === profile.role
    );

    if (!savedAccount) {
      return {
        success: false,
        message: "Conta não encontrada. Crie um perfil para continuar.",
      };
    }

    setAccount(savedAccount);
    go("painel");

    return {
      success: true,
    };
  };

  const sendProposal = (proposal) => {
    const newProposal = {
      ...proposal,
      id: Date.now(),
      status: "Enviada",
    };

    setNegotiations((currentNegotiations) => [
      newProposal,
      ...currentNegotiations,
    ]);

    setToast("Proposta enviada com segurança.");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const updateNegotiation = (id, status) => {
    setNegotiations((currentNegotiations) =>
      currentNegotiations.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    setToast(`Proposta ${status.toLowerCase()}.`);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const registerLot = (lot) => {
    if (!account) {
      return;
    }

    const newLot = {
      ...lot,
      producer: account.business || account.name,
      ownerEmail: account.email,
      contact: account.phone,
    };

    setLots((currentLots) => [
      newLot,
      ...currentLots,
    ]);

    setToast("Lote cadastrado com sucesso.");
    go("painel");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const receiveContact = () => {
    setToast("Mensagem recebida.");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  return (
    <div>
      <SiteHeader
        currentPage={page}
        isLoggedIn={Boolean(account)}
        isProducer={isProducer}
        menuOpen={menu}
        canGoBack={history.length > 0}
        onNavigate={go}
        onBack={goBack}
        onLogout={logout}
        onCreateAccount={openCreateAccount}
        onToggleMenu={() => setMenu((open) => !open)}
      />

      <main>
        {page === "inicio" && (
          <Home go={go} />
        )}

        {page === "proposta" && (
          <About go={go} />
        )}

        {page === "lotes" && isBuyer && (
          <Lots lots={marketplaceLots} />
        )}

        {page === "logistica" && (
          <Logistics />
        )}

        {page === "contato" && (
          <Contact done={receiveContact} />
        )}

        {page === "acesso" && (
          <Access
            startCreating={createAccount}
            done={authenticate}
          />
        )}

        {page === "painel" && account && (
          <Dashboard
            account={account}
            lots={myLots}
            marketplaceLots={marketplaceLots}
            negotiations={negotiations}
            onSendProposal={sendProposal}
            onUpdateNegotiation={updateNegotiation}
            go={go}
          />
        )}

        {page === "solicitacoes" && isProducer && (
          <Solicitacoes
            account={account}
            negotiations={negotiations}
            onUpdateNegotiation={updateNegotiation}
            go={go}
          />
        )}

        {page === "produto" && isProducer && (
          <Product done={registerLot} />
        )}
      </main>

      {toast && (
        <div className="toast">
          ✓ {toast}
        </div>
      )}

      <SiteFooter />
    </div>
  );
}