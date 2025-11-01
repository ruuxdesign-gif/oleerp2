import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  FileText,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface MetricaComercial {
  periodo: string;
  vendas: number;
  receita: number;
  leads: number;
  conversao: number;
  ticketMedio: number;
  comissoes: number;
}

interface VendedorPerformance {
  id: string;
  nome: string;
  avatar: string;
  vendas: number;
  receita: number;
  meta: number;
  leads: number;
  conversao: number;
  comissao: number;
  ranking: number;
  status: "Ativo" | "Inativo";
  ultimaVenda: string;
}

interface Pipeline {
  etapa: string;
  quantidade: number;
  valor: number;
  cor: string;
}

interface Lead {
  id: string;
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  origem: string;
  status: "Novo" | "Qualificado" | "Proposta" | "Negociação" | "Fechado" | "Perdido";
  valor: number;
  vendedor: string;
  dataContato: string;
  proximoFollowUp: string;
  probabilidade: number;
}

const DashboardComercial = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30");
  const [vendedorSelecionado, setVendedorSelecionado] = useState("todos");

  // Dados de métricas por período
  const metricas: MetricaComercial[] = [
    { periodo: "Jan", vendas: 45, receita: 125000, leads: 180, conversao: 25, ticketMedio: 2777, comissoes: 12500 },
    { periodo: "Fev", vendas: 52, receita: 145000, leads: 200, conversao: 26, ticketMedio: 2788, comissoes: 14500 },
    { periodo: "Mar", vendas: 48, receita: 135000, leads: 190, conversao: 25.3, ticketMedio: 2812, comissoes: 13500 },
    { periodo: "Abr", vendas: 61, receita: 175000, leads: 220, conversao: 27.7, ticketMedio: 2868, comissoes: 17500 },
    { periodo: "Mai", vendas: 58, receita: 165000, leads: 210, conversao: 27.6, ticketMedio: 2844, comissoes: 16500 },
    { periodo: "Jun", vendas: 67, receita: 195000, leads: 240, conversao: 27.9, ticketMedio: 2910, comissoes: 19500 },
  ];

  // Performance dos vendedores
  const vendedores: VendedorPerformance[] = [
    {
      id: "1",
      nome: "Maria Vendas",
      avatar: "MV",
      vendas: 23,
      receita: 67500,
      meta: 60000,
      leads: 85,
      conversao: 27.1,
      comissao: 6750,
      ranking: 1,
      status: "Ativo",
      ultimaVenda: "2024-01-15"
    },
    {
      id: "2",
      nome: "Carlos Comercial",
      avatar: "CC",
      vendas: 19,
      receita: 55000,
      meta: 50000,
      leads: 70,
      conversao: 27.1,
      comissao: 5500,
      ranking: 2,
      status: "Ativo",
      ultimaVenda: "2024-01-14"
    },
    {
      id: "3",
      nome: "Ana Vendas",
      avatar: "AV",
      vendas: 15,
      receita: 42500,
      meta: 45000,
      leads: 60,
      conversao: 25.0,
      comissao: 4250,
      ranking: 3,
      status: "Ativo",
      ultimaVenda: "2024-01-13"
    },
    {
      id: "4",
      nome: "Pedro Vendas",
      avatar: "PV",
      vendas: 10,
      receita: 30000,
      meta: 40000,
      leads: 45,
      conversao: 22.2,
      comissao: 3000,
      ranking: 4,
      status: "Ativo",
      ultimaVenda: "2024-01-12"
    }
  ];

  // Pipeline de vendas
  const pipeline: Pipeline[] = [
    { etapa: "Leads", quantidade: 240, valor: 720000, cor: "#3b82f6" },
    { etapa: "Qualificados", quantidade: 120, valor: 360000, cor: "#8b5cf6" },
    { etapa: "Proposta", quantidade: 80, valor: 240000, cor: "#06b6d4" },
    { etapa: "Negociação", quantidade: 45, valor: 135000, cor: "#f59e0b" },
    { etapa: "Fechamento", quantidade: 25, valor: 75000, cor: "#10b981" },
  ];

  // Leads recentes
  const leadsRecentes: Lead[] = [
    {
      id: "1",
      nome: "João Silva",
      empresa: "Tech Solutions",
      telefone: "(11) 99999-9999",
      email: "joao@techsolutions.com",
      origem: "Website",
      status: "Qualificado",
      valor: 5000,
      vendedor: "Maria Vendas",
      dataContato: "2024-01-15",
      proximoFollowUp: "2024-01-17",
      probabilidade: 75
    },
    {
      id: "2",
      nome: "Ana Costa",
      empresa: "Inovação LTDA",
      telefone: "(11) 88888-8888",
      email: "ana@inovacao.com",
      origem: "Indicação",
      status: "Proposta",
      valor: 8500,
      vendedor: "Carlos Comercial",
      dataContato: "2024-01-14",
      proximoFollowUp: "2024-01-16",
      probabilidade: 85
    },
    {
      id: "3",
      nome: "Pedro Santos",
      empresa: "Digital Corp",
      telefone: "(11) 77777-7777",
      email: "pedro@digitalcorp.com",
      origem: "Google Ads",
      status: "Negociação",
      valor: 12000,
      vendedor: "Ana Vendas",
      dataContato: "2024-01-13",
      proximoFollowUp: "2024-01-15",
      probabilidade: 90
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Novo": return "bg-blue-100 text-blue-800";
      case "Qualificado": return "bg-purple-100 text-purple-800";
      case "Proposta": return "bg-cyan-100 text-cyan-800";
      case "Negociação": return "bg-yellow-100 text-yellow-800";
      case "Fechado": return "bg-green-100 text-green-800";
      case "Perdido": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRankingIcon = (ranking: number) => {
    switch (ranking) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `${ranking}º`;
    }
  };

  // Cálculos de métricas atuais
  const metricaAtual = metricas[metricas.length - 1];
  const metricaAnterior = metricas[metricas.length - 2];
  
  const crescimentoVendas = ((metricaAtual.vendas - metricaAnterior.vendas) / metricaAnterior.vendas) * 100;
  const crescimentoReceita = ((metricaAtual.receita - metricaAnterior.receita) / metricaAnterior.receita) * 100;
  const crescimentoLeads = ((metricaAtual.leads - metricaAnterior.leads) / metricaAnterior.leads) * 100;

  const totalVendedores = vendedores.length;
  const vendedoresAtivos = vendedores.filter(v => v.status === "Ativo").length;
  const totalLeadsPipeline = pipeline.reduce((total, etapa) => total + etapa.quantidade, 0);
  const valorTotalPipeline = pipeline.reduce((total, etapa) => total + etapa.valor, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Comercial</h1>
            <p className="text-muted-foreground">
              Visão geral das métricas e performance comercial
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricaAtual.vendas}</div>
              <div className="flex items-center text-xs">
                {crescimentoVendas >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={crescimentoVendas >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(crescimentoVendas).toFixed(1)}%
                </span>
                <span className="text-muted-foreground ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {metricaAtual.receita.toLocaleString()}</div>
              <div className="flex items-center text-xs">
                {crescimentoReceita >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={crescimentoReceita >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(crescimentoReceita).toFixed(1)}%
                </span>
                <span className="text-muted-foreground ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricaAtual.conversao}%</div>
              <div className="flex items-center text-xs">
                <Activity className="h-3 w-3 text-blue-500 mr-1" />
                <span className="text-muted-foreground">
                  {metricaAtual.vendas} de {metricaAtual.leads} leads
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {metricaAtual.ticketMedio.toLocaleString()}</div>
              <div className="flex items-center text-xs">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-muted-foreground">
                  Comissões: R$ {metricaAtual.comissoes.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="vendedores">Vendedores</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Gráfico de Vendas */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução de Vendas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metricas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periodo" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="vendas" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Vendas"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="leads" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Leads"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Receita */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita e Comissões</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={metricas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periodo" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="receita" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981"
                        name="Receita"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="comissoes" 
                        stackId="2"
                        stroke="#f59e0b" 
                        fill="#f59e0b"
                        name="Comissões"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Resumo Executivo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Equipe Comercial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total de Vendedores:</span>
                    <span className="font-medium">{totalVendedores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendedores Ativos:</span>
                    <span className="font-medium text-green-600">{vendedoresAtivos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meta Coletiva:</span>
                    <span className="font-medium">R$ 195.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atingimento:</span>
                    <span className="font-medium text-green-600">100.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pipeline Atual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total de Leads:</span>
                    <span className="font-medium">{totalLeadsPipeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor em Pipeline:</span>
                    <span className="font-medium">R$ {valorTotalPipeline.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Previsão de Fechamento:</span>
                    <span className="font-medium">R$ 195.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Conversão:</span>
                    <span className="font-medium text-blue-600">27.9%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximas Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">15 follow-ups hoje</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">8 propostas vencendo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">12 contratos para assinar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">25 novos leads</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendedores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance dos Vendedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendedores.map((vendedor) => (
                    <div key={vendedor.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-medium text-blue-600">
                          {vendedor.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{vendedor.nome}</div>
                          <div className="text-sm text-muted-foreground">
                            {getRankingIcon(vendedor.ranking)} lugar no ranking
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <div className="text-sm font-medium">Vendas</div>
                          <div className="text-lg font-bold">{vendedor.vendas}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Receita</div>
                          <div className="text-lg font-bold">R$ {vendedor.receita.toLocaleString()}</div>
                          <Progress 
                            value={(vendedor.receita / vendedor.meta) * 100} 
                            className="mt-1"
                          />
                          <div className="text-xs text-muted-foreground mt-1">
                            {((vendedor.receita / vendedor.meta) * 100).toFixed(1)}% da meta
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Leads</div>
                          <div className="text-lg font-bold">{vendedor.leads}</div>
                          <div className="text-xs text-muted-foreground">
                            {vendedor.conversao}% conversão
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Comissão</div>
                          <div className="text-lg font-bold">R$ {vendedor.comissao.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Status</div>
                          <Badge className={vendedor.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {vendedor.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            Última venda: {new Date(vendedor.ultimaVenda).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Funil de Vendas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pipeline.map((etapa, index) => (
                      <div key={etapa.etapa} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{etapa.etapa}</span>
                          <span className="text-sm text-muted-foreground">
                            {etapa.quantidade} leads • R$ {etapa.valor.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-300"
                            style={{ 
                              backgroundColor: etapa.cor,
                              width: `${(etapa.quantidade / pipeline[0].quantidade) * 100}%`
                            }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {((etapa.quantidade / pipeline[0].quantidade) * 100).toFixed(1)}% do total
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Etapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pipeline}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="quantidade"
                        label={({ etapa, quantidade }) => `${etapa}: ${quantidade}`}
                      >
                        {pipeline.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leads Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadsRecentes.map((lead) => (
                    <div key={lead.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div>
                          <div className="font-medium">{lead.nome}</div>
                          <div className="text-sm text-muted-foreground">{lead.empresa}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {lead.telefone}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </div>
                        </div>
                        <div>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {lead.origem}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">R$ {lead.valor.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {lead.probabilidade}% probabilidade
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">{lead.vendedor}</div>
                          <div className="text-sm text-muted-foreground">
                            Contato: {new Date(lead.dataContato).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Próximo follow-up:
                          </div>
                          <div className="text-sm text-orange-600">
                            {new Date(lead.proximoFollowUp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DashboardComercial;