import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Plus,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  CreditCard,
  Building,
  Zap,
  Users,
  Wifi,
  Heart,
  Home,
  Tv,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MovimentacaoFinanceira {
  id: string;
  data: string;
  tipo: "entrada" | "saida";
  categoria: string;
  subcategoria: string;
  descricao: string;
  valor: number;
  status: "realizado" | "projetado" | "pendente";
  origem: string;
  centroCusto?: string;
  observacoes?: string;
}

interface ProjecaoMensal {
  mes: string;
  entradas: number;
  saidas: number;
  saldo: number;
  saldoAcumulado: number;
}

const FluxoCaixa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [periodoFilter, setPeriodoFilter] = useState<string>("30");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [movimentacoes] = useState<MovimentacaoFinanceira[]>([
    {
      id: "1",
      data: "2024-12-20",
      tipo: "entrada",
      categoria: "Receitas",
      subcategoria: "Internet Fibra",
      descricao: "Mensalidades Internet Fibra - Dezembro",
      valor: 125000.00,
      status: "realizado",
      origem: "Faturamento Automático",
      centroCusto: "Receitas Operacionais"
    },
    {
      id: "2",
      data: "2024-12-20",
      tipo: "entrada",
      categoria: "Receitas",
      subcategoria: "Telemedicina",
      descricao: "Consultas e exames - Dezembro",
      valor: 45000.00,
      status: "realizado",
      origem: "Sistema de Agendamento",
      centroCusto: "Receitas Telemedicina"
    },
    {
      id: "3",
      data: "2024-12-20",
      tipo: "saida",
      categoria: "Operacional",
      subcategoria: "Energia Elétrica",
      descricao: "Conta de energia - Dezembro",
      valor: 8500.00,
      status: "realizado",
      origem: "Débito Automático",
      centroCusto: "Custos Operacionais"
    },
    {
      id: "4",
      data: "2024-12-22",
      tipo: "saida",
      categoria: "Infraestrutura",
      subcategoria: "Equipamentos",
      descricao: "Cabos de fibra óptica - 10km",
      valor: 25000.00,
      status: "pendente",
      origem: "Compra Programada",
      centroCusto: "Investimentos"
    },
    {
      id: "5",
      data: "2024-12-25",
      tipo: "entrada",
      categoria: "Receitas",
      subcategoria: "Casa Conectada",
      descricao: "Serviços IoT e automação residencial",
      valor: 18500.00,
      status: "projetado",
      origem: "Projeção de Vendas",
      centroCusto: "Receitas IoT"
    },
    {
      id: "6",
      data: "2024-12-28",
      tipo: "entrada",
      categoria: "Receitas",
      subcategoria: "Streaming",
      descricao: "Assinaturas de TV e filmes",
      valor: 32000.00,
      status: "projetado",
      origem: "Projeção de Vendas",
      centroCusto: "Receitas Streaming"
    },
    {
      id: "7",
      data: "2024-12-30",
      tipo: "saida",
      categoria: "Pessoal",
      subcategoria: "Salários",
      descricao: "Folha de pagamento - Dezembro",
      valor: 85000.00,
      status: "projetado",
      origem: "Folha Programada",
      centroCusto: "Recursos Humanos"
    }
  ]);

  const [projecaoMensal] = useState<ProjecaoMensal[]>([
    { mes: "Jan", entradas: 180000, saidas: 120000, saldo: 60000, saldoAcumulado: 60000 },
    { mes: "Fev", entradas: 185000, saidas: 125000, saldo: 60000, saldoAcumulado: 120000 },
    { mes: "Mar", entradas: 190000, saidas: 130000, saldo: 60000, saldoAcumulado: 180000 },
    { mes: "Abr", entradas: 195000, saidas: 135000, saldo: 60000, saldoAcumulado: 240000 },
    { mes: "Mai", entradas: 200000, saidas: 140000, saldo: 60000, saldoAcumulado: 300000 },
    { mes: "Jun", entradas: 205000, saidas: 145000, saldo: 60000, saldoAcumulado: 360000 }
  ]);

  const dadosCategoriasEntrada = [
    { name: "Internet Fibra", value: 125000, color: "#0088FE" },
    { name: "Telemedicina", value: 45000, color: "#00C49F" },
    { name: "Casa Conectada", value: 18500, color: "#FFBB28" },
    { name: "Streaming", value: 32000, color: "#FF8042" },
    { name: "Multiserviços", value: 28000, color: "#8884D8" }
  ];

  const dadosCategoriasSaida = [
    { name: "Pessoal", value: 85000, color: "#FF6B6B" },
    { name: "Infraestrutura", value: 25000, color: "#4ECDC4" },
    { name: "Operacional", value: 15000, color: "#45B7D1" },
    { name: "Marketing", value: 8000, color: "#96CEB4" },
    { name: "Licenças", value: 12000, color: "#FFEAA7" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "realizado":
        return "bg-green-100 text-green-800";
      case "projetado":
        return "bg-blue-100 text-blue-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "realizado":
        return <CheckCircle className="h-4 w-4" />;
      case "projetado":
        return <Calendar className="h-4 w-4" />;
      case "pendente":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === "entrada" ? 
      <ArrowUpCircle className="h-4 w-4 text-green-600" /> : 
      <ArrowDownCircle className="h-4 w-4 text-red-600" />;
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "Internet Fibra":
        return <Wifi className="h-4 w-4" />;
      case "Telemedicina":
        return <Heart className="h-4 w-4" />;
      case "Casa Conectada":
        return <Home className="h-4 w-4" />;
      case "Streaming":
        return <Tv className="h-4 w-4" />;
      case "Infraestrutura":
        return <Building className="h-4 w-4" />;
      case "Operacional":
        return <Zap className="h-4 w-4" />;
      case "Pessoal":
        return <Users className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const filteredMovimentacoes = movimentacoes.filter(mov => {
    const matchesSearch = mov.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mov.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mov.subcategoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === "todos" || mov.tipo === tipoFilter;
    const matchesCategoria = categoriaFilter === "todas" || mov.categoria === categoriaFilter;
    const matchesStatus = statusFilter === "todos" || mov.status === statusFilter;
    
    return matchesSearch && matchesTipo && matchesCategoria && matchesStatus;
  });

  const totalEntradas = movimentacoes
    .filter(m => m.tipo === "entrada")
    .reduce((sum, m) => sum + m.valor, 0);

  const totalSaidas = movimentacoes
    .filter(m => m.tipo === "saida")
    .reduce((sum, m) => sum + m.valor, 0);

  const saldoAtual = totalEntradas - totalSaidas;

  const entradasRealizadas = movimentacoes
    .filter(m => m.tipo === "entrada" && m.status === "realizado")
    .reduce((sum, m) => sum + m.valor, 0);

  const saidasRealizadas = movimentacoes
    .filter(m => m.tipo === "saida" && m.status === "realizado")
    .reduce((sum, m) => sum + m.valor, 0);

  const handleNovaMovimentacao = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fluxo de Caixa</h1>
            <p className="text-muted-foreground">
              Controle de entradas, saídas e projeções financeiras
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button onClick={handleNovaMovimentacao}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Movimentação
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {Math.abs(saldoAtual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {saldoAtual >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entradas do Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {entradasRealizadas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {movimentacoes.filter(m => m.tipo === "entrada" && m.status === "realizado").length} movimentações
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saídas do Mês</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                R$ {saidasRealizadas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {movimentacoes.filter(m => m.tipo === "saida" && m.status === "realizado").length} movimentações
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projeção 6 Meses</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                R$ {projecaoMensal[projecaoMensal.length - 1].saldoAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Saldo acumulado projetado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Projeção de Fluxo de Caixa */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Projeção de Fluxo de Caixa - 6 Meses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={projecaoMensal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      ''
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="entradas" 
                    stackId="1" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                    name="Entradas"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="saidas" 
                    stackId="2" 
                    stroke="#EF4444" 
                    fill="#EF4444" 
                    fillOpacity={0.6}
                    name="Saídas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="saldoAcumulado" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Saldo Acumulado"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribuição de Entradas */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Entradas por Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dadosCategoriasEntrada}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dadosCategoriasEntrada.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      'Valor'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribuição de Saídas */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Saídas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dadosCategoriasSaida}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dadosCategoriasSaida.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      'Valor'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Movimentações */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Movimentações Financeiras</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar movimentações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[250px]"
                  />
                </div>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="realizado">Realizado</SelectItem>
                    <SelectItem value="projetado">Projetado</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovimentacoes.map((mov) => (
                  <TableRow key={mov.id}>
                    <TableCell>
                      <div className="font-medium">{mov.data}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTipoIcon(mov.tipo)}
                        <span className="capitalize">{mov.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getCategoriaIcon(mov.subcategoria)}
                        <div>
                          <p className="font-medium">{mov.categoria}</p>
                          <p className="text-sm text-muted-foreground">{mov.subcategoria}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{mov.descricao}</p>
                        <p className="text-sm text-muted-foreground">{mov.origem}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${mov.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                        {mov.tipo === 'entrada' ? '+' : '-'} R$ {mov.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(mov.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(mov.status)}
                          <span className="capitalize">{mov.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog de Nova Movimentação */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Movimentação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receitas">Receitas</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                      <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                      <SelectItem value="pessoal">Pessoal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input placeholder="Descrição da movimentação" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea placeholder="Observações adicionais (opcional)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Movimentação criada",
                  description: "Nova movimentação adicionada ao fluxo de caixa.",
                });
                setIsCreateDialogOpen(false);
              }}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default FluxoCaixa;