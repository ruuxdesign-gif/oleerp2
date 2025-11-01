import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar as CalendarIcon,
  Clock,
  User,
  FileText,
  Settings,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogIn,
  LogOut
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface AtividadeLog {
  id: string;
  tipo: "Login" | "Logout" | "Criação" | "Edição" | "Exclusão" | "Visualização" | "Configuração" | "Sistema";
  acao: string;
  descricao: string;
  modulo: string;
  recurso: string;
  dataHora: string;
  ip: string;
  dispositivo: string;
  navegador: string;
  status: "Sucesso" | "Erro" | "Aviso" | "Info";
  detalhes?: string;
}

const Atividades = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroModulo, setFiltroModulo] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();

  const [atividades, setAtividades] = useState<AtividadeLog[]>([
    {
      id: "1",
      tipo: "Login",
      acao: "Login realizado",
      descricao: "Usuário fez login no sistema",
      modulo: "Autenticação",
      recurso: "Sistema",
      dataHora: "15/01/2024 08:30:15",
      ip: "192.168.1.100",
      dispositivo: "Desktop",
      navegador: "Chrome 120.0",
      status: "Sucesso"
    },
    {
      id: "2",
      tipo: "Criação",
      acao: "Cliente criado",
      descricao: "Novo cliente 'Empresa ABC Ltda' foi cadastrado",
      modulo: "Clientes",
      recurso: "Cliente #1234",
      dataHora: "15/01/2024 09:15:30",
      ip: "192.168.1.100",
      dispositivo: "Desktop",
      navegador: "Chrome 120.0",
      status: "Sucesso",
      detalhes: "CNPJ: 12.345.678/0001-90"
    },
    {
      id: "3",
      tipo: "Edição",
      acao: "Produto atualizado",
      descricao: "Preço do produto 'Notebook Dell' foi alterado",
      modulo: "Produtos",
      recurso: "Produto #5678",
      dataHora: "15/01/2024 10:22:45",
      ip: "192.168.1.100",
      dispositivo: "Desktop",
      navegador: "Chrome 120.0",
      status: "Sucesso",
      detalhes: "Preço alterado de R$ 2.500,00 para R$ 2.300,00"
    },
    {
      id: "4",
      tipo: "Visualização",
      acao: "Relatório acessado",
      descricao: "Relatório de vendas mensal foi visualizado",
      modulo: "Relatórios",
      recurso: "Relatório Vendas",
      dataHora: "15/01/2024 11:05:12",
      ip: "192.168.1.100",
      dispositivo: "Desktop",
      navegador: "Chrome 120.0",
      status: "Sucesso"
    },
    {
      id: "5",
      tipo: "Exclusão",
      acao: "Tentativa de exclusão",
      descricao: "Tentativa de excluir cliente com pedidos pendentes",
      modulo: "Clientes",
      recurso: "Cliente #9999",
      dataHora: "15/01/2024 14:30:22",
      ip: "192.168.1.100",
      dispositivo: "Desktop",
      navegador: "Chrome 120.0",
      status: "Erro",
      detalhes: "Erro: Cliente possui 3 pedidos pendentes"
    },
    {
      id: "6",
      tipo: "Configuração",
      acao: "Configuração alterada",
      descricao: "Configurações de notificação foram atualizadas",
      modulo: "Configurações",
      recurso: "Notificações",
      dataHora: "14/01/2024 16:45:33",
      ip: "192.168.1.101",
      dispositivo: "Mobile",
      navegador: "Safari 17.2",
      status: "Sucesso"
    },
    {
      id: "7",
      tipo: "Sistema",
      acao: "Backup automático",
      descricao: "Backup automático do banco de dados executado",
      modulo: "Sistema",
      recurso: "Database",
      dataHora: "14/01/2024 02:00:00",
      ip: "Sistema",
      dispositivo: "Servidor",
      navegador: "Sistema",
      status: "Sucesso",
      detalhes: "Backup salvo em: backup_20240114_020000.sql"
    },
    {
      id: "8",
      tipo: "Login",
      acao: "Tentativa de login",
      descricao: "Tentativa de login com credenciais inválidas",
      modulo: "Autenticação",
      recurso: "Sistema",
      dataHora: "13/01/2024 22:15:44",
      ip: "203.0.113.45",
      dispositivo: "Desktop",
      navegador: "Firefox 121.0",
      status: "Erro",
      detalhes: "3 tentativas consecutivas falharam"
    }
  ]);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Login":
        return <LogIn className="h-4 w-4 text-green-600" />;
      case "Logout":
        return <LogOut className="h-4 w-4 text-orange-600" />;
      case "Criação":
        return <Plus className="h-4 w-4 text-blue-600" />;
      case "Edição":
        return <Edit className="h-4 w-4 text-yellow-600" />;
      case "Exclusão":
        return <Trash2 className="h-4 w-4 text-red-600" />;
      case "Visualização":
        return <Eye className="h-4 w-4 text-purple-600" />;
      case "Configuração":
        return <Settings className="h-4 w-4 text-gray-600" />;
      case "Sistema":
        return <Database className="h-4 w-4 text-indigo-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Sucesso":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Erro":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "Aviso":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "Info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sucesso":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sucesso</Badge>;
      case "Erro":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Erro</Badge>;
      case "Aviso":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Aviso</Badge>;
      case "Info":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAtualizarAtividades = async () => {
    setCarregando(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Atividades atualizadas!");
    } catch (error) {
      toast.error("Erro ao atualizar atividades");
    } finally {
      setCarregando(false);
    }
  };

  const handleExportarAtividades = async () => {
    setCarregando(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      toast.success("Relatório de atividades exportado!");
    } catch (error) {
      toast.error("Erro ao exportar atividades");
    } finally {
      setCarregando(false);
    }
  };

  const atividadesFiltradas = atividades.filter(atividade => {
    const matchTipo = filtroTipo === "todos" || atividade.tipo.toLowerCase() === filtroTipo;
    const matchStatus = filtroStatus === "todos" || atividade.status.toLowerCase() === filtroStatus;
    const matchModulo = filtroModulo === "todos" || atividade.modulo.toLowerCase() === filtroModulo;
    const matchBusca = busca === "" || 
      atividade.acao.toLowerCase().includes(busca.toLowerCase()) ||
      atividade.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      atividade.recurso.toLowerCase().includes(busca.toLowerCase());
    
    return matchTipo && matchStatus && matchModulo && matchBusca;
  });

  const totalAtividades = atividades.length;
  const atividadesHoje = atividades.filter(a => a.dataHora.startsWith("15/01/2024")).length;
  const atividadesSucesso = atividades.filter(a => a.status === "Sucesso").length;
  const atividadesErro = atividades.filter(a => a.status === "Erro").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Atividades</h1>
            <p className="text-muted-foreground">
              Visualize o log completo de ações realizadas no sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleAtualizarAtividades}
              disabled={carregando}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${carregando ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button 
              variant="outline"
              onClick={handleExportarAtividades}
              disabled={carregando}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Atividades</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAtividades}</div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 dias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atividades Hoje</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{atividadesHoje}</div>
              <p className="text-xs text-muted-foreground">
                Ações realizadas hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sucessos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{atividadesSucesso}</div>
              <p className="text-xs text-muted-foreground">
                {((atividadesSucesso / totalAtividades) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Erros</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{atividadesErro}</div>
              <p className="text-xs text-muted-foreground">
                {((atividadesErro / totalAtividades) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar atividades..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="criação">Criação</SelectItem>
                  <SelectItem value="edição">Edição</SelectItem>
                  <SelectItem value="exclusão">Exclusão</SelectItem>
                  <SelectItem value="visualização">Visualização</SelectItem>
                  <SelectItem value="configuração">Configuração</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Status</SelectItem>
                  <SelectItem value="sucesso">Sucesso</SelectItem>
                  <SelectItem value="erro">Erro</SelectItem>
                  <SelectItem value="aviso">Aviso</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroModulo} onValueChange={setFiltroModulo}>
                <SelectTrigger>
                  <SelectValue placeholder="Módulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Módulos</SelectItem>
                  <SelectItem value="autenticação">Autenticação</SelectItem>
                  <SelectItem value="clientes">Clientes</SelectItem>
                  <SelectItem value="produtos">Produtos</SelectItem>
                  <SelectItem value="relatórios">Relatórios</SelectItem>
                  <SelectItem value="configurações">Configurações</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataInicio ? format(dataInicio, "dd/MM/yyyy", { locale: ptBR }) : "Data início"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataInicio}
                      onSelect={setDataInicio}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Atividades */}
        <Card>
          <CardHeader>
            <CardTitle>Log de Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Módulo/Recurso</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atividadesFiltradas.map((atividade) => (
                  <TableRow key={atividade.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTipoIcon(atividade.tipo)}
                        <span className="font-medium">{atividade.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{atividade.acao}</div>
                        <div className="text-sm text-muted-foreground">{atividade.descricao}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{atividade.modulo}</div>
                        <div className="text-sm text-muted-foreground">{atividade.recurso}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{atividade.dataHora}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{atividade.dispositivo}</div>
                        <div className="text-sm text-muted-foreground">{atividade.navegador}</div>
                        <div className="text-xs text-muted-foreground">{atividade.ip}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(atividade.status)}
                        {getStatusBadge(atividade.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {atividade.detalhes && (
                        <div className="text-sm text-muted-foreground max-w-xs truncate" title={atividade.detalhes}>
                          {atividade.detalhes}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Atividades;