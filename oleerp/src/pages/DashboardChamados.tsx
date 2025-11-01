import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Target,
  Activity
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
  AreaChart,
  Area,
  Legend
} from "recharts";

const DashboardChamados = () => {
  // Dados para métricas principais
  const metricas = {
    total: 1247,
    resolvidos: 856,
    pendentes: 234,
    emAndamento: 157,
    cancelados: 45
  };

  // Dados para chamados por mês
  const chamadosPorMes = [
    { mes: "Jan", total: 145, resolvidos: 120, pendentes: 25 },
    { mes: "Fev", total: 167, resolvidos: 140, pendentes: 27 },
    { mes: "Mar", total: 189, resolvidos: 155, pendentes: 34 },
    { mes: "Abr", total: 203, resolvidos: 175, pendentes: 28 },
    { mes: "Mai", total: 178, resolvidos: 148, pendentes: 30 },
    { mes: "Jun", total: 195, resolvidos: 168, pendentes: 27 },
    { mes: "Jul", total: 170, resolvidos: 142, pendentes: 28 }
  ];

  // Dados para status dos chamados
  const statusChamados = [
    { name: "Resolvidos", value: 68.7, count: 856, color: "#22c55e" },
    { name: "Pendentes", value: 18.8, count: 234, color: "#f59e0b" },
    { name: "Em Andamento", value: 12.6, count: 157, color: "#3b82f6" },
    { name: "Cancelados", value: 3.6, count: 45, color: "#ef4444" }
  ];

  // Dados para chamados por categoria
  const chamadosPorCategoria = [
    { categoria: "Técnico", quantidade: 456, percentual: 36.6 },
    { categoria: "Suporte", quantidade: 312, percentual: 25.0 },
    { categoria: "Comercial", quantidade: 234, percentual: 18.8 },
    { categoria: "Financeiro", quantidade: 156, percentual: 12.5 },
    { categoria: "Outros", quantidade: 89, percentual: 7.1 }
  ];

  // Dados para tempo médio de resolução
  const tempoResolucao = [
    { periodo: "Sem 1", tempo: 4.2 },
    { periodo: "Sem 2", tempo: 3.8 },
    { periodo: "Sem 3", tempo: 4.5 },
    { periodo: "Sem 4", tempo: 3.9 },
    { periodo: "Sem 5", tempo: 4.1 },
    { periodo: "Sem 6", tempo: 3.7 },
    { periodo: "Sem 7", tempo: 4.0 }
  ];

  // Dados para atividade semanal
  const atividadeSemanal = [
    { dia: "Seg", chamados: 45, resolvidos: 38 },
    { dia: "Ter", chamados: 52, resolvidos: 44 },
    { dia: "Qua", chamados: 48, resolvidos: 41 },
    { dia: "Qui", chamados: 61, resolvidos: 52 },
    { dia: "Sex", chamados: 58, resolvidos: 49 },
    { dia: "Sáb", chamados: 23, resolvidos: 20 },
    { dia: "Dom", chamados: 18, resolvidos: 15 }
  ];

  // Dados para prioridade dos chamados
  const prioridadeChamados = [
    { name: "Alta", value: 15.2, color: "#ef4444" },
    { name: "Média", value: 58.7, color: "#f59e0b" },
    { name: "Baixa", value: 26.1, color: "#22c55e" }
  ];

  // Dados para satisfação do cliente
  const satisfacaoCliente = [
    { mes: "Jan", satisfacao: 4.2 },
    { mes: "Fev", satisfacao: 4.3 },
    { mes: "Mar", satisfacao: 4.1 },
    { mes: "Abr", satisfacao: 4.4 },
    { mes: "Mai", satisfacao: 4.5 },
    { mes: "Jun", satisfacao: 4.3 },
    { mes: "Jul", satisfacao: 4.6 }
  ];

  // Top técnicos
  const topTecnicos = [
    { nome: "João Silva", resolvidos: 89, avaliacao: 4.8 },
    { nome: "Maria Santos", resolvidos: 76, avaliacao: 4.7 },
    { nome: "Pedro Costa", resolvidos: 68, avaliacao: 4.6 },
    { nome: "Ana Oliveira", resolvidos: 62, avaliacao: 4.5 },
    { nome: "Carlos Lima", resolvidos: 58, avaliacao: 4.4 }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Chamados</h1>
          <p className="text-muted-foreground">
            Visão completa do sistema de chamados e suporte
          </p>
        </div>

        {/* KPI Cards - Métricas de Chamados */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="Total de Chamados"
            value={metricas.total.toLocaleString()}
            icon={Ticket}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Resolvidos"
            value={metricas.resolvidos.toLocaleString()}
            icon={CheckCircle2}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="Pendentes"
            value={metricas.pendentes.toLocaleString()}
            icon={Clock}
            trend={{ value: 3.1, isPositive: false }}
          />
          <MetricCard
            title="Em Andamento"
            value={metricas.emAndamento.toLocaleString()}
            icon={AlertCircle}
            trend={{ value: 5.4, isPositive: true }}
          />
          <MetricCard
            title="Taxa de Resolução"
            value="68.7%"
            icon={Target}
            trend={{ value: 4.2, isPositive: true }}
          />
        </div>

        {/* Primeira linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Chamados por Mês */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Chamados por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chamadosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total" />
                  <Bar dataKey="resolvidos" fill="#22c55e" name="Resolvidos" />
                  <Bar dataKey="pendentes" fill="#f59e0b" name="Pendentes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status dos Chamados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Status dos Chamados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChamados}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {statusChamados.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}%`, `${props.payload.count} chamados`]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Segunda linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Chamados por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Chamados por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chamadosPorCategoria.map((categoria, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm">{categoria.categoria}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{categoria.quantidade}</div>
                      <div className="text-xs text-muted-foreground">{categoria.percentual}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tempo Médio de Resolução */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tempo Médio de Resolução (horas)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={tempoResolucao}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}h`, 'Tempo Médio']} />
                  <Line 
                    type="monotone" 
                    dataKey="tempo" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Técnicos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top Técnicos do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topTecnicos.map((tecnico, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{tecnico.nome}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{tecnico.resolvidos}</div>
                      <div className="text-xs text-muted-foreground">★ {tecnico.avaliacao}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terceira linha de gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Atividade Semanal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Atividade Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={atividadeSemanal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="chamados" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="resolvidos" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Prioridade dos Chamados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Prioridade dos Chamados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={prioridadeChamados}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {prioridadeChamados.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Satisfação do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={satisfacaoCliente}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[3.5, 5]} />
                  <Tooltip formatter={(value) => [`${value}/5`, 'Avaliação']} />
                  <Line 
                    type="monotone" 
                    dataKey="satisfacao" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
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

export default DashboardChamados;