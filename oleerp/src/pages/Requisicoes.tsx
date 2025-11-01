import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Send,
  MessageSquare,
  Paperclip,
  Star,
  StarOff,
  Archive,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";

interface Requisicao {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "Suporte Técnico" | "Solicitação de Acesso" | "Mudança de Sistema" | "Relatório" | "Outros";
  prioridade: "Baixa" | "Média" | "Alta" | "Crítica";
  status: "Aberta" | "Em Andamento" | "Aguardando" | "Resolvida" | "Cancelada";
  solicitante: string;
  responsavel?: string;
  departamento: string;
  dataAbertura: string;
  dataVencimento?: string;
  dataResolucao?: string;
  comentarios: number;
  anexos: number;
  favorita: boolean;
}

interface NovaRequisicao {
  titulo: string;
  descricao: string;
  tipo: string;
  prioridade: string;
  departamento: string;
  dataVencimento: string;
}

const Requisicoes = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState<Requisicao | null>(null);

  const [novaRequisicao, setNovaRequisicao] = useState<NovaRequisicao>({
    titulo: "",
    descricao: "",
    tipo: "",
    prioridade: "",
    departamento: "",
    dataVencimento: ""
  });

  const [requisicoes, setRequisicoes] = useState<Requisicao[]>([
    {
      id: "REQ-001",
      titulo: "Problema no sistema de vendas",
      descricao: "O sistema está apresentando lentidão ao processar pedidos grandes",
      tipo: "Suporte Técnico",
      prioridade: "Alta",
      status: "Em Andamento",
      solicitante: "João Silva",
      responsavel: "Carlos Oliveira",
      departamento: "Vendas",
      dataAbertura: "15/01/2024 09:30",
      dataVencimento: "17/01/2024",
      comentarios: 5,
      anexos: 2,
      favorita: true
    },
    {
      id: "REQ-002",
      titulo: "Acesso ao módulo financeiro",
      descricao: "Solicito acesso de leitura ao módulo financeiro para análise de relatórios",
      tipo: "Solicitação de Acesso",
      prioridade: "Média",
      status: "Aguardando",
      solicitante: "Maria Santos",
      responsavel: "Ana Costa",
      departamento: "Contabilidade",
      dataAbertura: "14/01/2024 14:15",
      dataVencimento: "18/01/2024",
      comentarios: 2,
      anexos: 0,
      favorita: false
    },
    {
      id: "REQ-003",
      titulo: "Relatório de vendas personalizado",
      descricao: "Necessito de um relatório que mostre vendas por região e vendedor",
      tipo: "Relatório",
      prioridade: "Baixa",
      status: "Aberta",
      solicitante: "Pedro Lima",
      departamento: "Comercial",
      dataAbertura: "14/01/2024 11:20",
      dataVencimento: "20/01/2024",
      comentarios: 1,
      anexos: 1,
      favorita: false
    },
    {
      id: "REQ-004",
      titulo: "Atualização do sistema de estoque",
      descricao: "Implementar nova funcionalidade de controle de lotes no estoque",
      tipo: "Mudança de Sistema",
      prioridade: "Crítica",
      status: "Em Andamento",
      solicitante: "Roberto Silva",
      responsavel: "João Silva",
      departamento: "Logística",
      dataAbertura: "13/01/2024 16:45",
      dataVencimento: "16/01/2024",
      comentarios: 8,
      anexos: 3,
      favorita: true
    },
    {
      id: "REQ-005",
      titulo: "Configuração de impressora fiscal",
      descricao: "Configurar nova impressora fiscal no PDV da loja 2",
      tipo: "Suporte Técnico",
      prioridade: "Média",
      status: "Resolvida",
      solicitante: "Fernanda Costa",
      responsavel: "Carlos Oliveira",
      departamento: "TI",
      dataAbertura: "12/01/2024 08:30",
      dataVencimento: "15/01/2024",
      dataResolucao: "14/01/2024 16:20",
      comentarios: 3,
      anexos: 1,
      favorita: false
    },
    {
      id: "REQ-006",
      titulo: "Treinamento no novo módulo",
      descricao: "Solicito treinamento para a equipe no novo módulo de CRM",
      tipo: "Outros",
      prioridade: "Baixa",
      status: "Cancelada",
      solicitante: "Lucas Oliveira",
      departamento: "Vendas",
      dataAbertura: "11/01/2024 13:10",
      comentarios: 2,
      anexos: 0,
      favorita: false
    }
  ]);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Suporte Técnico":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "Solicitação de Acesso":
        return <User className="h-4 w-4 text-blue-600" />;
      case "Mudança de Sistema":
        return <RefreshCw className="h-4 w-4 text-purple-600" />;
      case "Relatório":
        return <FileText className="h-4 w-4 text-green-600" />;
      case "Outros":
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "Crítica":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Crítica</Badge>;
      case "Alta":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Alta</Badge>;
      case "Média":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Média</Badge>;
      case "Baixa":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Baixa</Badge>;
      default:
        return <Badge variant="outline">{prioridade}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberta":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Aberta</Badge>;
      case "Em Andamento":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Em Andamento</Badge>;
      case "Aguardando":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Aguardando</Badge>;
      case "Resolvida":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolvida</Badge>;
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCriarRequisicao = async () => {
    if (!novaRequisicao.titulo || !novaRequisicao.tipo || !novaRequisicao.prioridade || !novaRequisicao.departamento) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const requisicao: Requisicao = {
        id: `REQ-${String(requisicoes.length + 1).padStart(3, '0')}`,
        titulo: novaRequisicao.titulo,
        descricao: novaRequisicao.descricao,
        tipo: novaRequisicao.tipo as any,
        prioridade: novaRequisicao.prioridade as any,
        status: "Aberta",
        solicitante: "Usuário Atual",
        departamento: novaRequisicao.departamento,
        dataAbertura: new Date().toLocaleString('pt-BR'),
        dataVencimento: novaRequisicao.dataVencimento,
        comentarios: 0,
        anexos: 0,
        favorita: false
      };

      setRequisicoes(prev => [requisicao, ...prev]);
      setDialogAberto(false);
      setNovaRequisicao({
        titulo: "",
        descricao: "",
        tipo: "",
        prioridade: "",
        departamento: "",
        dataVencimento: ""
      });
      toast.success("Requisição criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar requisição");
    } finally {
      setCarregando(false);
    }
  };

  const handleAlterarStatus = async (requisicaoId: string, novoStatus: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRequisicoes(prev => prev.map(req => 
        req.id === requisicaoId 
          ? { 
              ...req, 
              status: novoStatus as any,
              dataResolucao: novoStatus === "Resolvida" ? new Date().toLocaleString('pt-BR') : undefined
            }
          : req
      ));
      toast.success(`Status alterado para ${novoStatus}`);
    } catch (error) {
      toast.error("Erro ao alterar status");
    } finally {
      setCarregando(false);
    }
  };

  const handleToggleFavorita = async (requisicaoId: string) => {
    setRequisicoes(prev => prev.map(req => 
      req.id === requisicaoId 
        ? { ...req, favorita: !req.favorita }
        : req
    ));
  };

  const handleExcluirRequisicao = async (requisicaoId: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRequisicoes(prev => prev.filter(req => req.id !== requisicaoId));
      toast.success("Requisição excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir requisição");
    } finally {
      setCarregando(false);
    }
  };

  const requisicoesFiltradasMinhas = requisicoes.filter(req => req.solicitante === "Usuário Atual");
  const requisicoesFiltradasTodas = requisicoes.filter(requisicao => {
    const matchStatus = filtroStatus === "todos" || requisicao.status.toLowerCase().replace(" ", "_") === filtroStatus;
    const matchTipo = filtroTipo === "todos" || requisicao.tipo.toLowerCase().replace(" ", "_") === filtroTipo;
    const matchPrioridade = filtroPrioridade === "todos" || requisicao.prioridade.toLowerCase() === filtroPrioridade;
    const matchBusca = busca === "" || 
      requisicao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      requisicao.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      requisicao.solicitante.toLowerCase().includes(busca.toLowerCase()) ||
      requisicao.id.toLowerCase().includes(busca.toLowerCase());
    
    return matchStatus && matchTipo && matchPrioridade && matchBusca;
  });

  const totalRequisicoes = requisicoes.length;
  const abertas = requisicoes.filter(r => r.status === "Aberta").length;
  const emAndamento = requisicoes.filter(r => r.status === "Em Andamento").length;
  const resolvidas = requisicoes.filter(r => r.status === "Resolvida").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Requisições</h1>
            <p className="text-muted-foreground">
              Gerencie solicitações e tickets de suporte
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Requisição
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Requisição</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar uma nova requisição.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      value={novaRequisicao.titulo}
                      onChange={(e) => setNovaRequisicao(prev => ({ ...prev, titulo: e.target.value }))}
                      placeholder="Título da requisição"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={novaRequisicao.descricao}
                      onChange={(e) => setNovaRequisicao(prev => ({ ...prev, descricao: e.target.value }))}
                      placeholder="Descreva detalhadamente sua solicitação"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tipo">Tipo *</Label>
                      <Select value={novaRequisicao.tipo} onValueChange={(value) => setNovaRequisicao(prev => ({ ...prev, tipo: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Suporte Técnico">Suporte Técnico</SelectItem>
                          <SelectItem value="Solicitação de Acesso">Solicitação de Acesso</SelectItem>
                          <SelectItem value="Mudança de Sistema">Mudança de Sistema</SelectItem>
                          <SelectItem value="Relatório">Relatório</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="prioridade">Prioridade *</Label>
                      <Select value={novaRequisicao.prioridade} onValueChange={(value) => setNovaRequisicao(prev => ({ ...prev, prioridade: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Baixa">Baixa</SelectItem>
                          <SelectItem value="Média">Média</SelectItem>
                          <SelectItem value="Alta">Alta</SelectItem>
                          <SelectItem value="Crítica">Crítica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departamento">Departamento *</Label>
                      <Select value={novaRequisicao.departamento} onValueChange={(value) => setNovaRequisicao(prev => ({ ...prev, departamento: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TI">TI</SelectItem>
                          <SelectItem value="Vendas">Vendas</SelectItem>
                          <SelectItem value="Financeiro">Financeiro</SelectItem>
                          <SelectItem value="RH">RH</SelectItem>
                          <SelectItem value="Logística">Logística</SelectItem>
                          <SelectItem value="Contabilidade">Contabilidade</SelectItem>
                          <SelectItem value="Comercial">Comercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                      <Input
                        id="dataVencimento"
                        type="date"
                        value={novaRequisicao.dataVencimento}
                        onChange={(e) => setNovaRequisicao(prev => ({ ...prev, dataVencimento: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogAberto(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCriarRequisicao} disabled={carregando}>
                    {carregando ? "Criando..." : "Criar Requisição"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequisicoes}</div>
              <p className="text-xs text-muted-foreground">
                Requisições criadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Abertas</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{abertas}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando atendimento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <RefreshCw className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{emAndamento}</div>
              <p className="text-xs text-muted-foreground">
                Sendo processadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolvidas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{resolvidas}</div>
              <p className="text-xs text-muted-foreground">
                Concluídas com sucesso
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="todas" className="space-y-6">
          <TabsList>
            <TabsTrigger value="todas">Todas as Requisições</TabsTrigger>
            <TabsTrigger value="minhas">Minhas Requisições</TabsTrigger>
          </TabsList>

          {/* Aba Todas as Requisições */}
          <TabsContent value="todas" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar requisições..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Status</SelectItem>
                      <SelectItem value="aberta">Aberta</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="aguardando">Aguardando</SelectItem>
                      <SelectItem value="resolvida">Resolvida</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Tipos</SelectItem>
                      <SelectItem value="suporte_técnico">Suporte Técnico</SelectItem>
                      <SelectItem value="solicitação_de_acesso">Solicitação de Acesso</SelectItem>
                      <SelectItem value="mudança_de_sistema">Mudança de Sistema</SelectItem>
                      <SelectItem value="relatório">Relatório</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas Prioridades</SelectItem>
                      <SelectItem value="crítica">Crítica</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Requisições */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Requisições</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID / Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Data Abertura</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requisicoesFiltradasTodas.map((requisicao) => (
                      <TableRow key={requisicao.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {requisicao.favorita && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                <span className="text-xs text-muted-foreground">{requisicao.id}</span>
                              </div>
                              <div className="font-medium">{requisicao.titulo}</div>
                              <div className="text-sm text-muted-foreground">
                                {requisicao.descricao.substring(0, 60)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTipoIcon(requisicao.tipo)}
                            <span className="text-sm">{requisicao.tipo}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPrioridadeBadge(requisicao.prioridade)}
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={requisicao.status.toLowerCase().replace(" ", "_")} 
                            onValueChange={(value) => handleAlterarStatus(requisicao.id, value.replace("_", " "))}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aberta">Aberta</SelectItem>
                              <SelectItem value="em_andamento">Em Andamento</SelectItem>
                              <SelectItem value="aguardando">Aguardando</SelectItem>
                              <SelectItem value="resolvida">Resolvida</SelectItem>
                              <SelectItem value="cancelada">Cancelada</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{requisicao.solicitante}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {requisicao.departamento}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{requisicao.dataAbertura}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {requisicao.dataVencimento && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{requisicao.dataVencimento}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleFavorita(requisicao.id)}
                            >
                              {requisicao.favorita ? (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </Button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setRequisicaoSelecionada(requisicao)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {getTipoIcon(requisicao.tipo)}
                                    Detalhes da Requisição
                                  </DialogTitle>
                                </DialogHeader>
                                {requisicaoSelecionada && (
                                  <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">ID</Label>
                                        <p className="text-sm">{requisicaoSelecionada.id}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Status</Label>
                                        <div className="mt-1">{getStatusBadge(requisicaoSelecionada.status)}</div>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Tipo</Label>
                                        <p className="text-sm">{requisicaoSelecionada.tipo}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Prioridade</Label>
                                        <div className="mt-1">{getPrioridadeBadge(requisicaoSelecionada.prioridade)}</div>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Solicitante</Label>
                                        <p className="text-sm">{requisicaoSelecionada.solicitante}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Departamento</Label>
                                        <p className="text-sm">{requisicaoSelecionada.departamento}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Data Abertura</Label>
                                        <p className="text-sm">{requisicaoSelecionada.dataAbertura}</p>
                                      </div>
                                      {requisicaoSelecionada.dataVencimento && (
                                        <div>
                                          <Label className="text-sm font-medium">Vencimento</Label>
                                          <p className="text-sm">{requisicaoSelecionada.dataVencimento}</p>
                                        </div>
                                      )}
                                      {requisicaoSelecionada.responsavel && (
                                        <div>
                                          <Label className="text-sm font-medium">Responsável</Label>
                                          <p className="text-sm">{requisicaoSelecionada.responsavel}</p>
                                        </div>
                                      )}
                                      {requisicaoSelecionada.dataResolucao && (
                                        <div>
                                          <Label className="text-sm font-medium">Data Resolução</Label>
                                          <p className="text-sm">{requisicaoSelecionada.dataResolucao}</p>
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Título</Label>
                                      <p className="text-sm">{requisicaoSelecionada.titulo}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Descrição</Label>
                                      <p className="text-sm">{requisicaoSelecionada.descricao}</p>
                                    </div>
                                    <div className="flex gap-4">
                                      <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{requisicaoSelecionada.comentarios} comentários</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{requisicaoSelecionada.anexos} anexos</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Excluir Requisição</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir esta requisição? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleExcluirRequisicao(requisicao.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Minhas Requisições */}
          <TabsContent value="minhas">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Requisições</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requisicoesFiltradasMinhas.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Nenhuma requisição encontrada</h3>
                      <p className="text-muted-foreground">Você ainda não criou nenhuma requisição.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID / Título</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Prioridade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data Abertura</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requisicoesFiltradasMinhas.map((requisicao) => (
                          <TableRow key={requisicao.id}>
                            <TableCell>
                              <div>
                                <div className="text-xs text-muted-foreground">{requisicao.id}</div>
                                <div className="font-medium">{requisicao.titulo}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTipoIcon(requisicao.tipo)}
                                <span className="text-sm">{requisicao.tipo}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getPrioridadeBadge(requisicao.prioridade)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(requisicao.status)}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{requisicao.dataAbertura}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Requisicoes;