import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Wifi,
  Heart,
  Home,
  Tv,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";

interface MetricaFinanceira {
  titulo: string;
  valor: string;
  variacao: string;
  tipo: "positivo" | "negativo" | "neutro";
  icone: any;
  descricao: string;
}

interface ReceitaPorServico {
  servico: string;
  receita: number;
  clientes: number;
  crescimento: number;
  icone: any;
  cor: string;
}

interface ContasPendentes {
  tipo: "receber" | "pagar";
  descricao: string;
  valor: number;
  vencimento: string;
  status: "vencido" | "vence_hoje" | "a_vencer";
  cliente?: string;
  fornecedor?: string;
}

const DashboardFinanceiro = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes_atual");

  const metricas: MetricaFinanceira[] = [
    {
      titulo: "Receita Total",
      valor: "R$ 2.847.650,00",
      variacao: "+12,5%",
      tipo: "positivo",
      icone: DollarSign,
      descricao: "vs. mês anterior"
    },
    {
      titulo: "Contas a Receber",
      valor: "R$ 1.234.890,00",
      variacao: "-3,2%",
      tipo: "negativo",
      icone: CreditCard,
      descricao: "pendentes este mês"
    },
    {
      titulo: "Contas a Pagar",
      valor: "R$ 567.340,00",
      variacao: "+8,1%",
      tipo: "neutro",
      icone: Wallet,
      descricao: "vencimento próximo"
    },
    {
      titulo: "Fluxo de Caixa",
      valor: "R$ 892.450,00",
      variacao: "+15,7%",
      tipo: "positivo",
      icone: TrendingUp,
      descricao: "saldo disponível"
    }
  ];

  const receitaPorServicos: ReceitaPorServico[] = [
    {
      servico: "Internet Fibra",
      receita: 1850000,
      clientes: 12500,
      crescimento: 8.5,
      icone: Wifi,
      cor: "bg-blue-500"
    },
    {
      servico: "Multiserviços Residencial",
      receita: 650000,
      clientes: 4200,
      crescimento: 12.3,
      icone: Home,
      cor: "bg-green-500"
    },
    {
      servico: "Telemedicina",
      receita: 280000,
      clientes: 1800,
      crescimento: 25.7,
      icone: Heart,
      cor: "bg-red-500"
    },
    {
      servico: "Casa Conectada",
      receita: 45000,
      clientes: 350,
      crescimento: 35.2,
      icone: Home,
      cor: "bg-purple-500"
    },
    {
      servico: "Streaming TV",
      receita: 22650,
      clientes: 890,
      crescimento: 18.9,
      icone: Tv,
      cor: "bg-orange-500"
    }
  ];

  const contasPendentes: ContasPendentes[] = [
    {
      tipo: "receber",
      descricao: "Fatura Internet - João Silva",
      valor: 89.90,
      vencimento: "2024-12-15",
      status: "vencido",
      cliente: "João Silva"
    },
    {
      tipo: "receber",
      descricao: "Plano Família - Maria Santos",
      valor: 149.90,
      vencimento: "2024-12-20",
      status: "vence_hoje",
      cliente: "Maria Santos"
    },
    {
      tipo: "pagar",
      descricao: "Fornecedor Fibra Óptica",
      valor: 25000.00,
      vencimento: "2024-12-22",
      status: "a_vencer",
      fornecedor: "TechFiber Ltda"
    },
    {
      tipo: "pagar",
      descricao: "Licença Software Gestão",
      valor: 1200.00,
      vencimento: "2024-12-25",
      status: "a_vencer",
      fornecedor: "SoftTech Solutions"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vencido":
        return "bg-red-100 text-red-800";
      case "vence_hoje":
        return "bg-yellow-100 text-yellow-800";
      case "a_vencer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "vencido":
        return <AlertTriangle className="h-4 w-4" />;
      case "vence_hoje":
        return <Clock className="h-4 w-4" />;
      case "a_vencer":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Financeiro</h1>
            <p className="text-muted-foreground">
              Visão geral das finanças do provedor
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes_atual">Mês Atual</SelectItem>
                <SelectItem value="mes_anterior">Mês Anterior</SelectItem>
                <SelectItem value="trimestre">Trimestre</SelectItem>
                <SelectItem value="semestre">Semestre</SelectItem>
                <SelectItem value="ano">Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricas.map((metrica, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metrica.titulo}
                </CardTitle>
                <metrica.icone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrica.valor}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metrica.tipo === "positivo" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : metrica.tipo === "negativo" ? (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  ) : (
                    <div className="h-3 w-3 mr-1" />
                  )}
                  <span className={
                    metrica.tipo === "positivo" ? "text-green-500" :
                    metrica.tipo === "negativo" ? "text-red-500" : ""
                  }>
                    {metrica.variacao}
                  </span>
                  <span className="ml-1">{metrica.descricao}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col space-y-2">
                <CreditCard className="h-6 w-6" />
                <span>Contas a Receber</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Wallet className="h-6 w-6" />
                <span>Contas a Pagar</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Fluxo de Caixa</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Receita por Serviços */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Receita por Serviços
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {receitaPorServicos.map((servico, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${servico.cor}`}>
                      <servico.icone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{servico.servico}</p>
                      <p className="text-sm text-muted-foreground">
                        {servico.clientes.toLocaleString()} clientes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      R$ {(servico.receita / 1000).toFixed(0)}k
                    </p>
                    <p className="text-sm text-green-600">
                      +{servico.crescimento}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contas Pendentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Contas Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contasPendentes.map((conta, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(conta.status)}
                    <div>
                      <p className="font-medium">{conta.descricao}</p>
                      <p className="text-sm text-muted-foreground">
                        {conta.cliente || conta.fornecedor} • Venc: {conta.vencimento}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <Badge className={getStatusColor(conta.status)}>
                      {conta.status === "vencido" ? "Vencido" :
                       conta.status === "vence_hoje" ? "Vence Hoje" : "A Vencer"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos e Análises */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Fluxo de Caixa Mensal */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Fluxo de Caixa - Últimos 6 Meses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { mes: "Jul", entrada: 2650000, saida: 1890000 },
                  { mes: "Ago", entrada: 2780000, saida: 1950000 },
                  { mes: "Set", entrada: 2590000, saida: 1820000 },
                  { mes: "Out", entrada: 2890000, saida: 2100000 },
                  { mes: "Nov", entrada: 2950000, saida: 2050000 },
                  { mes: "Dez", entrada: 2847650, saida: 1955200 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.mes}</span>
                      <span>Saldo: R$ {((item.entrada - item.saida) / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(item.entrada / 3000000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-green-600">
                          R$ {(item.entrada / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${(item.saida / 3000000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-red-600">
                          R$ {(item.saida / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo Rápido */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Inadimplência</span>
                  <span className="text-sm font-medium">2.3%</span>
                </div>
                <Progress value={2.3} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Crescimento MRR</span>
                  <span className="text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Margem Líquida</span>
                  <span className="text-sm font-medium">31.4%</span>
                </div>
                <Progress value={31.4} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Churn Rate</span>
                  <span className="text-sm font-medium text-red-600">1.8%</span>
                </div>
                <Progress value={1.8} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">18.547</p>
                  <p className="text-sm text-muted-foreground">Clientes Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
};

export default DashboardFinanceiro;