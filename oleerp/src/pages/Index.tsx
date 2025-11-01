import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Download,
  Upload
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ComposedChart,
  Area,
  AreaChart
} from "recharts";

const Index = () => {
  // Dados para Movimentações Financeiras do Mês
  const movimentacoesData = [
    { name: "Entradas", value: 20129.20, color: "#22c55e" },
    { name: "Saídas", value: 15297.84, color: "#ef4444" },
    { name: "Saldo", value: 10158.23, color: "#3b82f6" },
    { name: "Lucro", value: 5395.76, color: "#8b5cf6" }
  ];

  // Dados para Metas de Venda no Mês (Assinaturas)
  const metasVendaData = [
    { name: "Fechado", value: 65, color: "#22c55e" },
    { name: "Em Progresso", value: 25, color: "#f59e0b" },
    { name: "Perdido", value: 10, color: "#ef4444" }
  ];

  // Dados para Recuperação de Cancelamentos
  const recuperacaoData = [
    { name: "Recuperados", value: 70, color: "#22c55e" },
    { name: "Não Recuperados", value: 30, color: "#ef4444" }
  ];

  // Dados para Ranking dos Vendedores
  const rankingVendedores = [
    { nome: "Fulano Silveira", quantidade: 150 },
    { nome: "Araujo Fagundes", quantidade: 125 },
    { nome: "Murilo Fernando", quantidade: 112 },
    { nome: "Marcos Santos", quantidade: 98 },
    { nome: "Sergio da Cunha", quantidade: 70 }
  ];

  // Dados para Top 3 dos Planos + Vendidos
  const top3PlanosData = [
    { name: "Jan/24", vendido: 150, meta: 200, cancelado: 30 },
    { name: "Fev/25", vendido: 180, meta: 200, cancelado: 25 },
    { name: "Mar/25", vendido: 220, meta: 200, cancelado: 20 }
  ];

  // Dados para Top 3 dos Planos Ativos
  const top3PlanosAtivos = [
    { name: "Jan/24", vendido: 400, meta: 500, cancelado: 50 },
    { name: "Fev/25", vendido: 450, meta: 500, cancelado: 40 },
    { name: "Mar/25", vendido: 480, meta: 500, cancelado: 35 }
  ];

  // Dados para Análise de Contratos (Assinaturas)
  const analiseContratosData = [
    { name: "Dez/24", novos: 400, cancelamentos: 100 },
    { name: "Jan/25", novos: 450, cancelamentos: 80 },
    { name: "Fev/25", novos: 500, cancelamentos: 90 },
    { name: "Mar/25", novos: 480, cancelamentos: 70 }
  ];

  // Dados para Serviços Mais Executados
  const servicosExecutados = [
    { name: "Instalação de Internet/TV", value: 45.2, color: "#22c55e" },
    { name: "Manutenção de Servidores", value: 28.1, color: "#3b82f6" },
    { name: "Instalação de Cabos de Fibra Ótica", value: 15.3, color: "#f59e0b" },
    { name: "Remoção Equipamentos", value: 11.4, color: "#ef4444" }
  ];

  // Dados para Serviços Aguardando Execução
  const servicosAguardando = [
    { name: "Instalação de Internet/TV", value: 42.8, color: "#22c55e" },
    { name: "Manutenção de Servidores", value: 31.7, color: "#3b82f6" },
    { name: "Instalação de Cabos de Fibra Ótica", value: 14.2, color: "#f59e0b" },
    { name: "Remoção Equipamentos", value: 11.3, color: "#ef4444" }
  ];

  // Dados para Proporção de Despesas por Serviço
  const despesasServico = [
    { name: "Instalação de Internet/TV", value: 42.8, color: "#22c55e" },
    { name: "Manutenção de Servidores", value: 31.7, color: "#3b82f6" },
    { name: "Instalação de Cabos de Fibra Ótica", value: 14.2, color: "#f59e0b" },
    { name: "Remoção Equipamentos", value: 11.3, color: "#ef4444" }
  ];

  // Dados para Proporção dos Planos Vendidos
  const planosVendidos = [
    { mes: "0.1", plano1: 100, plano2: 80, plano3: 60 },
    { mes: "0.2", plano1: 120, plano2: 90, plano3: 70 },
    { mes: "0.3", plano1: 110, plano2: 85, plano3: 65 },
    { mes: "0.4", plano1: 130, plano2: 95, plano3: 75 },
    { mes: "0.5", plano1: 140, plano2: 100, plano3: 80 },
    { mes: "0.6", plano1: 125, plano2: 88, plano3: 68 },
    { mes: "0.7", plano1: 135, plano2: 92, plano3: 72 },
    { mes: "0.8", plano1: 145, plano2: 105, plano3: 85 },
    { mes: "0.9", plano1: 150, plano2: 110, plano3: 90 },
    { mes: "1.0", plano1: 160, plano2: 115, plano3: 95 }
  ];

  // Dados para Reclamações por Planos
  const reclamacoesPorPlanos = [
    { x: 10, y: 20, z: 200 },
    { x: 15, y: 25, z: 250 },
    { x: 20, y: 30, z: 300 },
    { x: 25, y: 35, z: 350 },
    { x: 30, y: 40, z: 400 },
    { x: 35, y: 45, z: 450 }
  ];

  // Dados para Velocidade de Download vs Latência
  const downloadLatencia = [
    { download: 10, latencia: 28 },
    { download: 15, latencia: 26 },
    { download: 20, latencia: 24 },
    { download: 25, latencia: 22 },
    { download: 30, latencia: 20 },
    { download: 35, latencia: 18 },
    { download: 40, latencia: 16 },
    { download: 45, latencia: 14 }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral completa dos indicadores e métricas
          </p>
        </div>

        {/* KPI Cards - Movimentações Financeiras */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Entradas"
            value="20.129,20"
            icon={TrendingUp}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Saídas"
            value="15.297,84"
            icon={TrendingDown}
            trend={{ value: 8.2, isPositive: false }}
          />
          <MetricCard
            title="Saldo"
            value="10.158,23"
            icon={DollarSign}
            trend={{ value: 15.3, isPositive: true }}
          />
          <MetricCard
            title="Lucro"
            value="5.395,76"
            icon={Target}
            trend={{ value: 22.1, isPositive: true }}
          />
        </div>

        {/* Primeira linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Metas de Venda no Mês (Assinaturas) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Metas de venda no mês (Assinaturas)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={metasVendaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {metasVendaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recuperação de Cancelamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recuperação de cancelamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px]">
                <div className="relative w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={recuperacaoData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        dataKey="value"
                      >
                        {recuperacaoData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">70%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ranking dos Vendedores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Ranking dos vendedores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rankingVendedores.map((vendedor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{vendedor.nome}</span>
                    </div>
                    <span className="text-sm font-medium">{vendedor.quantidade}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segunda linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Top 3 dos Planos + Vendidos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top 3 dos planos + vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={top3PlanosData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip />
                  <Bar dataKey="vendido" fill="#22c55e" />
                  <Bar dataKey="meta" fill="#3b82f6" />
                  <Bar dataKey="cancelado" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top 3 dos Planos Ativos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top 3 dos planos ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={top3PlanosAtivos} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip />
                  <Bar dataKey="vendido" fill="#22c55e" />
                  <Bar dataKey="meta" fill="#3b82f6" />
                  <Bar dataKey="cancelado" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Análise de Contratos (Assinaturas) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Análise de contratos (Assinaturas)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={analiseContratosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="novos" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="cancelamentos" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Terceira linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Serviços Mais Executados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Serviços mais executados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={servicosExecutados}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {servicosExecutados.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Serviços Aguardando Execução */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Serviços aguardando execução</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={servicosAguardando}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {servicosAguardando.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Proporção de Despesas por Serviço */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Proporção de despesas por serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={despesasServico}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {despesasServico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quarta linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Proporção dos Planos Vendidos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Proporção dos planos vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={planosVendidos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="plano1" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="plano2" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="plano3" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Reclamações por Planos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Reclamações por planos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <ScatterChart data={reclamacoesPorPlanos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis dataKey="y" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="z" fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Velocidade de Download vs Latência */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Velocidade de Download vs Latência</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={downloadLatencia}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="download" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="latencia" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
