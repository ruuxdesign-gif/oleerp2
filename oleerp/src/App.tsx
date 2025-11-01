import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardChamados from "./pages/DashboardChamados";
import MeusChamados from "./pages/MeusChamados";
import Categorias from "./pages/Categorias";
import Assuntos from "./pages/Assuntos";
import Clientes from "./pages/Clientes";
import Contratos from "./pages/Contratos";
import PropostasComerciais from "./pages/PropostasComerciais";
import VendasFaturamento from "./pages/VendasFaturamento";
import DashboardComercial from "./pages/DashboardComercial";
import CRM from "./pages/CRM";
import Notificacoes from "./pages/Notificacoes";
import Dispositivos from "./pages/Dispositivos";
import ModelosRelatorio from "./pages/ModelosRelatorio";
import Requisicoes from "./pages/Requisicoes";
import DashboardFinanceiro from "./pages/DashboardFinanceiro";
import ContasReceber from "./pages/ContasReceber";
import ContasPagar from "./pages/ContasPagar";
import FluxoCaixa from "./pages/FluxoCaixa";
import FaturamentoServicos from "./pages/FaturamentoServicos";
import RelatoriosFinanceiros from "./pages/RelatoriosFinanceiros";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chamados" element={<DashboardChamados />} />
          <Route path="/meus-chamados" element={<MeusChamados />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/assuntos" element={<Assuntos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/propostas-comerciais" element={<PropostasComerciais />} />
          <Route path="/vendas-faturamento" element={<VendasFaturamento />} />
          <Route path="/dashboard-comercial" element={<DashboardComercial />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/dispositivos" element={<Dispositivos />} />
          <Route path="/modelos-relatorio" element={<ModelosRelatorio />} />
          <Route path="/requisicoes" element={<Requisicoes />} />
          <Route path="/dashboard-financeiro" element={<DashboardFinanceiro />} />
          <Route path="/contas-receber" element={<ContasReceber />} />
          <Route path="/contas-pagar" element={<ContasPagar />} />
          <Route path="/fluxo-caixa" element={<FluxoCaixa />} />
          <Route path="/faturamento-servicos" element={<FaturamentoServicos />} />
          <Route path="/relatorios-financeiros" element={<RelatoriosFinanceiros />} />
          <Route path="/dashboard" element={<DashboardChamados />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
