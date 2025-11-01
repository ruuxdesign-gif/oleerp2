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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Wifi,
  Heart,
  Home,
  Tv,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Send,
  CheckCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  Building,
  Smartphone,
  Monitor,
  Headphones
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ServicoFaturamento {
  id: string;
  nome: string;
  categoria: "Internet" | "Telemedicina" | "Casa Conectada" | "Streaming" | "Multiserviços";
  plano: string;
  valorMensal: number;
  clientesAtivos: number;
  faturamentoMensal: number;
  crescimentoMensal: number;
  status: "ativo" | "inativo" | "promocional";
  descricao: string;
  caracteristicas: string[];
}

interface FaturaCliente {
  id: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
  };
  servicos: {
    nome: string;
    categoria: string;
    valor: number;
    periodo: string;
  }[];
  valorTotal: number;
  dataVencimento: string;
  dataEmissao: string;
  status: "paga" | "pendente" | "vencida" | "cancelada";
  formaPagamento?: string;
  observacoes?: string;
}

const FaturamentoServicos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [activeTab, setActiveTab] = useState("servicos");

  const [servicos] = useState<ServicoFaturamento[]>([
    {
      id: "1",
      nome: "Internet Fibra 100MB",
      categoria: "Internet",
      plano: "Residencial Básico",
      valorMensal: 89.90,
      clientesAtivos: 1250,
      faturamentoMensal: 112375.00,
      crescimentoMensal: 8.5,
      status: "ativo",
      descricao: "Internet fibra óptica com velocidade de 100MB simétricos",
      caracteristicas: ["100MB Download/Upload", "Wi-Fi grátis", "Suporte 24h", "Instalação gratuita"]
    },
    {
      id: "2",
      nome: "Internet Fibra 300MB",
      categoria: "Internet",
      plano: "Residencial Premium",
      valorMensal: 149.90,
      clientesAtivos: 850,
      faturamentoMensal: 127415.00,
      crescimentoMensal: 12.3,
      status: "ativo",
      descricao: "Internet fibra óptica com velocidade de 300MB simétricos",
      caracteristicas: ["300MB Download/Upload", "Wi-Fi 6 grátis", "Suporte prioritário", "Netflix incluso"]
    },
    {
      id: "3",
      nome: "Telemedicina Básica",
      categoria: "Telemedicina",
      plano: "Consultas Online",
      valorMensal: 49.90,
      clientesAtivos: 420,
      faturamentoMensal: 20958.00,
      crescimentoMensal: 25.7,
      status: "ativo",
      descricao: "Consultas médicas online com especialistas",
      caracteristicas: ["Consultas ilimitadas", "Receitas digitais", "Agendamento online", "Histórico médico"]
    },
    {
      id: "4",
      nome: "Casa Conectada Premium",
      categoria: "Casa Conectada",
      plano: "IoT Completo",
      valorMensal: 199.90,
      clientesAtivos: 180,
      faturamentoMensal: 35982.00,
      crescimentoMensal: 18.9,
      status: "ativo",
      descricao: "Automação residencial completa com dispositivos IoT",
      caracteristicas: ["Câmeras de segurança", "Sensores inteligentes", "Controle por app", "Assistente virtual"]
    },
    {
      id: "5",
      nome: "Streaming Premium",
      categoria: "Streaming",
      plano: "Entretenimento Total",
      valorMensal: 79.90,
      clientesAtivos: 650,
      faturamentoMensal: 51935.00,
      crescimentoMensal: 15.2,
      status: "ativo",
      descricao: "Acesso a múltiplas plataformas de streaming",
      caracteristicas: ["Netflix Premium", "Amazon Prime", "Disney+", "Globoplay", "Paramount+"]
    },
    {
      id: "6",
      nome: "Multiserviços Família",
      categoria: "Multiserviços",
      plano: "Pacote Completo",
      valorMensal: 299.90,
      clientesAtivos: 320,
      faturamentoMensal: 95968.00,
      crescimentoMensal: 22.1,
      status: "promocional",
      descricao: "Pacote completo com internet, streaming e casa conectada",
      caracteristicas: ["Internet 500MB", "Streaming Premium", "Casa Conectada", "Telemedicina", "Desconto família"]
    }
  ]);

  const [faturas] = useState<FaturaCliente[]>([
    {
      id: "1",
      cliente: {
        nome: "João Silva Santos",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-1234",
        endereco: "Rua das Flores, 123 - São Paulo/SP"
      },
      servicos: [
        { nome: "Internet Fibra 300MB", categoria: "Internet", valor: 149.90, periodo: "Mensal" },
        { nome: "Streaming Premium", categoria: "Streaming", valor: 79.90, periodo: "Mensal" }
      ],
      valorTotal: 229.80,
      dataVencimento: "2024-12-25",
      dataEmissao: "2024-12-01",
      status: "pendente"
    },
    {
      id: "2",
      cliente: {
        nome: "Maria Oliveira Costa",
        email: "maria.costa@email.com",
        telefone: "(11) 88888-5678",
        endereco: "Av. Paulista, 456 - São Paulo/SP"
      },
      servicos: [
        { nome: "Multiserviços Família", categoria: "Multiserviços", valor: 299.90, periodo: "Mensal" }
      ],
      valorTotal: 299.90,
      dataVencimento: "2024-12-20",
      dataEmissao: "2024-12-01",
      status: "paga",
      formaPagamento: "Cartão de Crédito"
    },
    {
      id: "3",
      cliente: {
        nome: "Carlos Roberto Lima",
        email: "carlos.lima@email.com",
        telefone: "(11) 77777-9012",
        endereco: "Rua Augusta, 789 - São Paulo/SP"
      },
      servicos: [
        { nome: "Internet Fibra 100MB", categoria: "Internet", valor: 89.90, periodo: "Mensal" },
        { nome: "Telemedicina Básica", categoria: "Telemedicina", valor: 49.90, periodo: "Mensal" }
      ],
      valorTotal: 139.80,
      dataVencimento: "2024-12-15",
      dataEmissao: "2024-12-01",
      status: "vencida"
    }
  ]);

  const dadosFaturamentoPorCategoria = [
    { categoria: "Internet", valor: 239790, clientes: 2100, cor: "#0088FE" },
    { categoria: "Streaming", valor: 51935, clientes: 650, cor: "#00C49F" },
    { categoria: "Multiserviços", valor: 95968, clientes: 320, cor: "#FFBB28" },
    { categoria: "Casa Conectada", valor: 35982, clientes: 180, cor: "#FF8042" },
    { categoria: "Telemedicina", valor: 20958, clientes: 420, cor: "#8884D8" }
  ];

  const dadosEvolutionMensal = [
    { mes: "Jul", internet: 220000, streaming: 45000, telemedicina: 15000, casaConectada: 28000, multiservicos: 75000 },
    { mes: "Ago", internet: 225000, streaming: 47000, telemedicina: 16500, casaConectada: 30000, multiservicos: 78000 },
    { mes: "Set", internet: 230000, streaming: 48500, telemedicina: 18000, casaConectada: 32000, multiservicos: 82000 },
    { mes: "Out", internet: 235000, streaming: 50000, telemedicina: 19200, casaConectada: 34000, multiservicos: 88000 },
    { mes: "Nov", internet: 237000, streaming: 51200, telemedicina: 20100, casaConectada: 35500, multiservicos: 92000 },
    { mes: "Dez", internet: 239790, streaming: 51935, telemedicina: 20958, casaConectada: 35982, multiservicos: 95968 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paga":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "vencida":
        return "bg-red-100 text-red-800";
      case "cancelada":
        return "bg-gray-100 text-gray-800";
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-gray-100 text-gray-800";
      case "promocional":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paga":
        return <CheckCircle className="h-4 w-4" />;
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "vencida":
        return <AlertTriangle className="h-4 w-4" />;
      case "ativo":
        return <CheckCircle className="h-4 w-4" />;
      case "promocional":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "Internet":
        return <Wifi className="h-5 w-5" />;
      case "Telemedicina":
        return <Heart className="h-5 w-5" />;
      case "Casa Conectada":
        return <Home className="h-5 w-5" />;
      case "Streaming":
        return <Tv className="h-5 w-5" />;
      case "Multiserviços":
        return <Building className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  const filteredServicos = servicos.filter(servico => {
    const matchesSearch = servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servico.plano.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoriaFilter === "todas" || servico.categoria === categoriaFilter;
    const matchesStatus = statusFilter === "todos" || servico.status === statusFilter;
    
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const filteredFaturas = faturas.filter(fatura => {
    const matchesSearch = fatura.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatura.cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || fatura.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalFaturamento = dadosFaturamentoPorCategoria.reduce((sum, item) => sum + item.valor, 0);
  const totalClientes = dadosFaturamentoPorCategoria.reduce((sum, item) => sum + item.clientes, 0);
  const ticketMedio = totalFaturamento / totalClientes;

  const faturasPendentes = faturas.filter(f => f.status === "pendente").length;
  const faturasVencidas = faturas.filter(f => f.status === "vencida").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Faturamento por Serviços</h1>
            <p className="text-muted-foreground">
              Gestão de receitas por categoria de serviços do provedor
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {totalFaturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClientes.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% novos clientes este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                +3.8% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{faturasPendentes}</div>
              <p className="text-xs text-muted-foreground">
                {faturasVencidas} vencidas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Faturamento por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Faturamento por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosFaturamentoPorCategoria}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                    label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dadosFaturamentoPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      'Faturamento'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Evolução Mensal */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal por Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosEvolutionMensal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      ''
                    ]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="internet" stroke="#0088FE" strokeWidth={2} name="Internet" />
                  <Line type="monotone" dataKey="streaming" stroke="#00C49F" strokeWidth={2} name="Streaming" />
                  <Line type="monotone" dataKey="multiservicos" stroke="#FFBB28" strokeWidth={2} name="Multiserviços" />
                  <Line type="monotone" dataKey="casaConectada" stroke="#FF8042" strokeWidth={2} name="Casa Conectada" />
                  <Line type="monotone" dataKey="telemedicina" stroke="#8884D8" strokeWidth={2} name="Telemedicina" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Conteúdo */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="faturas">Faturas</TabsTrigger>
          </TabsList>

          <TabsContent value="servicos" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Serviços Oferecidos</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar serviços..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-[250px]"
                      />
                    </div>
                    <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="Internet">Internet</SelectItem>
                        <SelectItem value="Telemedicina">Telemedicina</SelectItem>
                        <SelectItem value="Casa Conectada">Casa Conectada</SelectItem>
                        <SelectItem value="Streaming">Streaming</SelectItem>
                        <SelectItem value="Multiserviços">Multiserviços</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                        <SelectItem value="promocional">Promocional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredServicos.map((servico) => (
                    <Card key={servico.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getCategoriaIcon(servico.categoria)}
                            <div>
                              <CardTitle className="text-lg">{servico.nome}</CardTitle>
                              <p className="text-sm text-muted-foreground">{servico.plano}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(servico.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(servico.status)}
                              <span className="capitalize">{servico.status}</span>
                            </div>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{servico.descricao}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Valor Mensal</p>
                            <p className="text-lg font-bold text-green-600">
                              R$ {servico.valorMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Clientes</p>
                            <p className="text-lg font-bold">{servico.clientesAtivos}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Faturamento Mensal</p>
                          <p className="text-xl font-bold">
                            R$ {servico.faturamentoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-sm text-green-600">
                            +{servico.crescimentoMensal}% este mês
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Características</p>
                          <div className="space-y-1">
                            {servico.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                              <p key={index} className="text-xs text-muted-foreground">
                                • {caracteristica}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faturas" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Faturas de Clientes</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-[250px]"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="paga">Paga</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="vencida">Vencida</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviços</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaturas.map((fatura) => (
                      <TableRow key={fatura.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{fatura.cliente.nome}</p>
                            <p className="text-sm text-muted-foreground">{fatura.cliente.email}</p>
                            <p className="text-sm text-muted-foreground">{fatura.cliente.telefone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {fatura.servicos.map((servico, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                {getCategoriaIcon(servico.categoria)}
                                <div>
                                  <p className="text-sm font-medium">{servico.nome}</p>
                                  <p className="text-xs text-muted-foreground">
                                    R$ {servico.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold">
                            R$ {fatura.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{fatura.dataVencimento}</p>
                            <p className="text-sm text-muted-foreground">
                              Emitida em {fatura.dataEmissao}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(fatura.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(fatura.status)}
                              <span className="capitalize">{fatura.status}</span>
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
                                <FileText className="mr-2 h-4 w-4" />
                                Gerar PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                Enviar por Email
                              </DropdownMenuItem>
                              {fatura.status === "pendente" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Marcar como Paga
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancelar
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
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default FaturamentoServicos;