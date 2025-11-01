import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Wifi, 
  Download,
  Calendar,
  Filter,
  FileText,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

const RelatoriosFinanceiros = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedService, setSelectedService] = useState('todos');

  // Dados para relatórios
  const receitaPorMes = [
    { mes: 'Jan', receita: 450000, despesas: 280000, lucro: 170000 },
    { mes: 'Fev', receita: 520000, despesas: 310000, lucro: 210000 },
    { mes: 'Mar', receita: 480000, despesas: 295000, lucro: 185000 },
    { mes: 'Abr', receita: 580000, despesas: 320000, lucro: 260000 },
    { mes: 'Mai', receita: 620000, despesas: 340000, lucro: 280000 },
    { mes: 'Jun', receita: 590000, despesas: 330000, lucro: 260000 }
  ];

  const receitaPorServico = [
    { servico: 'Internet Fibra', valor: 320000, percentual: 45, cor: '#8884d8' },
    { servico: 'Multiserviços', valor: 180000, percentual: 25, cor: '#82ca9d' },
    { servico: 'Telemedicina', valor: 120000, percentual: 17, cor: '#ffc658' },
    { servico: 'Casa Conectada', valor: 60000, percentual: 8, cor: '#ff7300' },
    { servico: 'Streaming', valor: 35000, percentual: 5, cor: '#8dd1e1' }
  ];

  const crescimentoClientes = [
    { mes: 'Jan', novos: 120, cancelamentos: 45, liquido: 75 },
    { mes: 'Fev', novos: 150, cancelamentos: 38, liquido: 112 },
    { mes: 'Mar', novos: 135, cancelamentos: 52, liquido: 83 },
    { mes: 'Abr', novos: 180, cancelamentos: 41, liquido: 139 },
    { mes: 'Mai', novos: 195, cancelamentos: 48, liquido: 147 },
    { mes: 'Jun', novos: 165, cancelamentos: 35, liquido: 130 }
  ];

  const indicadoresChave = [
    {
      titulo: 'Receita Total',
      valor: 'R$ 590.000',
      variacao: '+12.5%',
      tipo: 'positivo',
      icone: DollarSign,
      descricao: 'vs. mês anterior'
    },
    {
      titulo: 'Margem de Lucro',
      valor: '44.1%',
      variacao: '+2.3%',
      tipo: 'positivo',
      icone: TrendingUp,
      descricao: 'vs. mês anterior'
    },
    {
      titulo: 'Clientes Ativos',
      valor: '2.847',
      variacao: '+130',
      tipo: 'positivo',
      icone: Users,
      descricao: 'novos este mês'
    },
    {
      titulo: 'ARPU Médio',
      valor: 'R$ 207',
      variacao: '-3.2%',
      tipo: 'negativo',
      icone: Wifi,
      descricao: 'vs. mês anterior'
    }
  ];

  const relatoriosDisponiveis = [
    {
      nome: 'Demonstrativo de Resultados',
      descricao: 'Receitas, despesas e lucro detalhado',
      periodo: 'Mensal/Anual',
      formato: 'PDF/Excel'
    },
    {
      nome: 'Fluxo de Caixa Detalhado',
      descricao: 'Entradas e saídas por categoria',
      periodo: 'Diário/Mensal',
      formato: 'PDF/Excel'
    },
    {
      nome: 'Análise por Serviços',
      descricao: 'Performance de cada linha de negócio',
      periodo: 'Mensal',
      formato: 'PDF/Excel'
    },
    {
      nome: 'Inadimplência e Cobrança',
      descricao: 'Relatório de contas em atraso',
      periodo: 'Mensal',
      formato: 'PDF/Excel'
    },
    {
      nome: 'Análise de Clientes',
      descricao: 'Segmentação e comportamento',
      periodo: 'Trimestral',
      formato: 'PDF/Excel'
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
          <p className="text-gray-600">Análises detalhadas e insights do negócio</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Esta Semana</SelectItem>
              <SelectItem value="mes">Este Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicadoresChave.map((indicador, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{indicador.titulo}</p>
                  <p className="text-2xl font-bold">{indicador.valor}</p>
                  <div className="flex items-center mt-1">
                    {indicador.tipo === 'positivo' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${indicador.tipo === 'positivo' ? 'text-green-500' : 'text-red-500'}`}>
                      {indicador.variacao}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{indicador.descricao}</span>
                  </div>
                </div>
                <indicador.icone className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs de Relatórios */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="servicos">Por Serviços</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        {/* Tab Performance */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Receita vs Despesas vs Lucro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={receitaPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `R$ ${value.toLocaleString()}`} />
                    <Bar dataKey="receita" fill="#8884d8" name="Receita" />
                    <Bar dataKey="despesas" fill="#82ca9d" name="Despesas" />
                    <Bar dataKey="lucro" fill="#ffc658" name="Lucro" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Evolução da Margem de Lucro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={receitaPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any) => [
                        `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                        `${((Number(value) / 50000) * 100).toFixed(1)}%`
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lucro" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                      name="Margem de Lucro"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Por Serviços */}
        <TabsContent value="servicos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Distribuição de Receita por Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={receitaPorServico}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ servico, percentual }) => `${servico}: ${percentual}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {receitaPorServico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `R$ ${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento por Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {receitaPorServico.map((servico, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: servico.cor }}
                        />
                        <div>
                          <p className="font-medium">{servico.servico}</p>
                          <p className="text-sm text-gray-600">{servico.percentual}% do total</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {servico.valor.toLocaleString()}</p>
                        <Badge variant="outline" className="text-xs">
                          {servico.percentual > 20 ? 'Alto' : servico.percentual > 10 ? 'Médio' : 'Baixo'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Clientes */}
        <TabsContent value="clientes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Crescimento da Base de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={crescimentoClientes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="novos" stroke="#8884d8" name="Novos Clientes" />
                  <Line type="monotone" dataKey="cancelamentos" stroke="#82ca9d" name="Cancelamentos" />
                  <Line type="monotone" dataKey="liquido" stroke="#ffc658" name="Crescimento Líquido" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">686</p>
                <p className="text-sm text-gray-600">Novos Clientes (6 meses)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">259</p>
                <p className="text-sm text-gray-600">Cancelamentos (6 meses)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">15.0%</p>
                <p className="text-sm text-gray-600">Taxa de Crescimento</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Relatórios */}
        <TabsContent value="relatorios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Relatórios Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatoriosDisponiveis.map((relatorio, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-medium">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600">{relatorio.descricao}</p>
                      <div className="flex gap-4 mt-2">
                        <Badge variant="outline">
                          <Calendar className="w-3 h-3 mr-1" />
                          {relatorio.periodo}
                        </Badge>
                        <Badge variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          {relatorio.formato}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Baixar
                      </Button>
                      <Button size="sm">
                        Gerar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Relatório</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Período</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ultima-semana">Última Semana</SelectItem>
                      <SelectItem value="ultimo-mes">Último Mês</SelectItem>
                      <SelectItem value="ultimo-trimestre">Último Trimestre</SelectItem>
                      <SelectItem value="ultimo-ano">Último Ano</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Formato</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Serviços</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os serviços" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Serviços</SelectItem>
                      <SelectItem value="internet">Internet Fibra</SelectItem>
                      <SelectItem value="multiservicos">Multiserviços</SelectItem>
                      <SelectItem value="telemedicina">Telemedicina</SelectItem>
                      <SelectItem value="casa-conectada">Casa Conectada</SelectItem>
                      <SelectItem value="streaming">Streaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Gerar Relatório Personalizado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </AppLayout>
  );
};

export default RelatoriosFinanceiros;