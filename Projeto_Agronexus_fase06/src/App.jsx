import { useEffect, useState } from "react";

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
import Intelligence from "./pages/Intelligence";

import {
  demoDemands,
  demoLots,
  demoProductionPlans,
} from "./services/mockData";

import { buildMatches } from "./services/intelligenceService";

function readStorage(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);

    return savedValue
      ? JSON.parse(savedValue)
      : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [page, setPage] = useState("inicio");

  const [account, setAccount] = useState(() =>
    readStorage("agronexus-account", null)
  );

  const [lots, setLots] = useState(() =>
    readStorage("agronexus-lots", [])
  );

  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [history, setHistory] = useState([]);
  const [createAccount, setCreateAccount] = useState(false);

  const [accounts, setAccounts] = useState(() =>
    readStorage("agronexus-accounts", [])
  );

  const [negotiations, setNegotiations] = useState(() =>
    readStorage("agronexus-negotiations", [])
  );

  const [demands, setDemands] = useState(() =>
    readStorage("agronexus-demands", demoDemands)
  );

  const [productionPlans, setProductionPlans] = useState(() =>
    readStorage(
      "agronexus-production-plans",
      demoProductionPlans
    )
  );

  /*
   * Mantém a sessão do usuário salva.
   * Quando account for null, somente a sessão será removida.
   */
  useEffect(() => {
    if (account) {
      localStorage.setItem(
        "agronexus-account",
        JSON.stringify(account)
      );
    } else {
      localStorage.removeItem("agronexus-account");
    }
  }, [account]);

  /*
   * Salva as contas demonstrativas criadas.
   */
  useEffect(() => {
    localStorage.setItem(
      "agronexus-accounts",
      JSON.stringify(accounts)
    );
  }, [accounts]);

  /*
   * Salva os lotes cadastrados.
   */
  useEffect(() => {
    localStorage.setItem(
      "agronexus-lots",
      JSON.stringify(lots)
    );
  }, [lots]);

  /*
   * Salva propostas, aceitações e recusas.
   */
  useEffect(() => {
    localStorage.setItem(
      "agronexus-negotiations",
      JSON.stringify(negotiations)
    );
  }, [negotiations]);

  /*
   * Salva as demandas publicadas pelos compradores.
   */
  useEffect(() => {
    localStorage.setItem(
      "agronexus-demands",
      JSON.stringify(demands)
    );
  }, [demands]);

  /*
   * Salva os planos cadastrados pelos empreendedores.
   */
  useEffect(() => {
    localStorage.setItem(
      "agronexus-production-plans",
      JSON.stringify(productionPlans)
    );
  }, [productionPlans]);

  const isBuyer = account?.role === "buyer";

  const isProducer = Boolean(
    account && account.role === "entrepreneur"
  );

  const go = (nextPage) => {
    if (nextPage !== page) {
      setHistory((pages) => [
        ...pages,
        page,
      ]);
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

    const previousPage = history[history.length - 1];

    setPage(previousPage);

    setHistory((pages) =>
      pages.slice(0, -1)
    );

    setMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 4000);
  };

  const logout = () => {
    setAccount(null);
    setHistory([]);
    setCreateAccount(false);
    setPage("acesso");
    setMenu(false);

    /*
     * O logout encerra somente a sessão.
     * Contas e cadastros continuam no localStorage.
     */
    localStorage.removeItem("agronexus-account");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openCreateAccount = () => {
    setCreateAccount(true);
    go("acesso");
  };

  const marketplaceLots = [
    ...lots,
    ...demoLots,
  ];

  const myLots = account
    ? lots.filter(
        (lot) => lot.ownerEmail === account.email
      )
    : [];

  const authenticate = (profile, isCreating) => {
    if (isCreating) {
      const emailAlreadyExists = accounts.some(
        (item) => item.email === profile.email
      );

      if (emailAlreadyExists) {
        return {
          success: false,
          message:
            "Este e-mail já possui uma conta demonstrativa.",
        };
      }

      setAccounts((currentAccounts) => [
        ...currentAccounts,
        profile,
      ]);

      setAccount(profile);
      setCreateAccount(false);
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
        message:
          "Conta não encontrada. Crie um perfil para continuar.",
      };
    }

    setAccount(savedAccount);
    setCreateAccount(false);
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

    showToast("Proposta enviada com segurança.");
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

    showToast(
      `Proposta ${status.toLowerCase()}.`
    );
  };

  const registerLot = (lot) => {
    if (!account || account.role !== "entrepreneur") {
      return;
    }

    const newLot = {
      ...lot,
      id: `lote-${Date.now()}`,
      producer:
        account.business || account.name,
      ownerEmail: account.email,
      contact: account.phone,
    };

    setLots((currentLots) => [
      newLot,
      ...currentLots,
    ]);

    showToast("Lote cadastrado com sucesso.");
    go("painel");
  };

  const receiveContact = () => {
    showToast("Mensagem recebida.");
  };

  const registerDemand = (demand) => {
    if (!account || account.role !== "buyer") {
      return;
    }

    const newDemand = {
      ...demand,
      id: `demanda-${Date.now()}`,
      buyerEmail: account.email,
      company:
        account.business || account.name,
      status: "Aberta",
    };

    /*
     * Compara somente a nova demanda com os planos
     * que já estão disponíveis.
     */
    const matches = buildMatches(
      productionPlans,
      [newDemand]
    );

    const priorities = matches.filter(
      (match) => match.isPriority()
    ).length;

    setDemands((currentDemands) => [
      newDemand,
      ...currentDemands,
    ]);

    if (matches.length > 0) {
      showToast(
        `Demanda publicada. Encontramos ${matches.length} conexão(ões), sendo ${priorities} prioritária(s).`
      );
    } else {
      showToast(
        "Demanda publicada. Ainda não encontramos produção compatível."
      );
    }
  };

  const registerProductionPlan = (plan) => {
    if (
      !account ||
      account.role !== "entrepreneur"
    ) {
      return;
    }

    const newPlan = {
      ...plan,
      id: `plano-${Date.now()}`,
      producerEmail: account.email,
      producer:
        account.business || account.name,
    };

    /*
     * Compara somente o novo plano com as demandas
     * que já estão abertas.
     */
    const matches = buildMatches(
      [newPlan],
      demands
    );

    const priorities = matches.filter(
      (match) => match.isPriority()
    ).length;

    setProductionPlans((currentPlans) => [
      newPlan,
      ...currentPlans,
    ]);

    if (matches.length > 0) {
      showToast(
        `Plano analisado. Encontramos ${matches.length} conexão(ões), sendo ${priorities} prioritária(s).`
      );
    } else {
      showToast(
        "Plano analisado. Ainda não encontramos demanda compatível."
      );
    }
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
        onToggleMenu={() =>
          setMenu((open) => !open)
        }
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

        {page === "radar" && account && (
          <Intelligence
            account={account}
            demands={demands}
            productionPlans={productionPlans}
            onRegisterDemand={registerDemand}
            onRegisterPlan={registerProductionPlan}
            go={go}
          />
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