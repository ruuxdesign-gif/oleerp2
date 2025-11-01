import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Download,
  Eye,
  Settings,
  Calendar,
  Clock,
  User,
  Star,
  StarOff,
  RefreshCw,
  FileSpreadsheet,
  FileImage,
  File
} from "lucide-react";
import { toast } from "sonner";

interface ModeloRelatorio {
  id: string;
  nome: string;
  descricao: string;
  categoria: "Vendas" | "Financeiro" | "Estoque" | "RH" | "Operacional" | "Personalizado";
  tipo: "Tabular" | "Gráfico" | "Dashboard" | "Resumo" | "Detalhado";
  formato: "PDF" | "Excel" | "CSV" | "HTML" | "JSON";
  status: "Ativo" | "Inativo" | "Rascunho";
  dataCriacao: string;
  ultimaModificacao: string;
  autor: string;
  favorito: boolean;
  usos: number;
  campos: string[];
  filtros: string[];
  agrupamentos: string[];
}

const ModelosRelatorio = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogEdicao, setDialogEdicao] = useState(false);
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloRelatorio | null>(null);

  const [novoModelo, setNovoModelo] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    tipo: "",
    formato: "",
    campos: "",
    filtros: "",
    agrupamentos: ""
  });

  const [modelos, setModelos] = useState<ModeloRelatorio[]>([
    {
      id: "1",
      nome: "Relatório de Vendas Mensal",
      descricao: "Relatório completo das vendas realizadas no mês com análise de performance",
      categoria: "Vendas",
      tipo: "Dashboard",
      formato: "PDF",
      status: "Ativo",
      dataCriacao: "10/01/2024",
      ultimaModificacao: "15/01/2024",
      autor: "João Silva",
      favorito: true,
      usos: 45,
      campos: ["Data", "Cliente", "Produto", "Valor", "Vendedor", "Comissão"],
      filtros: ["Período", "Vendedor", "Cliente", "Produto"],
      agrupamentos: ["Por Vendedor", "Por Produto", "Por Cliente"]
    },
    {
      id: "2",
      nome: "Fluxo de Caixa Diário",
      descricao: "Controle diário de entradas e saídas financeiras",
      categoria: "Financeiro",
      tipo: "Tabular",
      formato: "Excel",
      status: "Ativo",
      dataCriacao: "08/01/2024",
      ultimaModificacao: "14/01/2024",
      autor: "Maria Santos",
      favorito: false,
      usos: 32,
      campos: ["Data", "Descrição", "Entrada", "Saída", "Saldo", "Categoria"],
      filtros: ["Período", "Categoria", "Tipo"],
      agrupamentos: ["Por Categoria", "Por Tipo"]
    },
    {
      id: "3",
      nome: "Estoque por Categoria",
      descricao: "Análise detalhada do estoque agrupado por categorias de produtos",
      categoria: "Estoque",
      tipo: "Gráfico",
      formato: "HTML",
      status: "Ativo",
      dataCriacao: "05/01/2024",
      ultimaModificacao: "12/01/2024",
      autor: "Carlos Oliveira",
      favorito: true,
      usos: 28,
      campos: ["Produto", "Categoria", "Quantidade", "Valor Unitário", "Valor Total"],
      filtros: ["Categoria", "Fornecedor", "Status"],
      agrupamentos: ["Por Categoria", "Por Fornecedor"]
    },
    {
      id: "4",
      nome: "Folha de Pagamento",
      descricao: "Relatório completo da folha de pagamento mensal dos funcionários",
      categoria: "RH",
      tipo: "Detalhado",
      formato: "PDF",
      status: "Ativo",
      dataCriacao: "03/01/2024",
      ultimaModificacao: "10/01/2024",
      autor: "Ana Costa",
      favorito: false,
      usos: 15,
      campos: ["Funcionário", "Cargo", "Salário Base", "Horas Extras", "Descontos", "Líquido"],
      filtros: ["Departamento", "Cargo", "Período"],
      agrupamentos: ["Por Departamento", "Por Cargo"]
    },
    {
      id: "5",
      nome: "Performance de Vendedores",
      descricao: "Análise de performance individual dos vendedores com metas e resultados",
      categoria: "Vendas",
      tipo: "Resumo",
      formato: "CSV",
      status: "Rascunho",
      dataCriacao: "14/01/2024",
      ultimaModificacao: "15/01/2024",
      autor: "Pedro Lima",
      favorito: false,
      usos: 3,
      campos: ["Vendedor", "Meta", "Realizado", "Percentual", "Comissão"],
      filtros: ["Período", "Vendedor", "Meta"],
      agrupamentos: ["Por Vendedor", "Por Período"]
    },
    {
      id: "6",
      nome: "Análise de Custos Operacionais",
      descricao: "Relatório detalhado dos custos operacionais por centro de custo",
      categoria: "Operacional",
      tipo: "Dashboard",
      formato: "HTML",
      status: "Inativo",
      dataCriacao: "01/01/2024",
      ultimaModificacao: "05/01/2024",
      autor: "Roberto Silva",
      favorito: false,
      usos: 8,
      campos: ["Centro de Custo", "Categoria", "Valor", "Orçado", "Variação"],
      filtros: ["Centro de Custo", "Categoria", "Período"],
      agrupamentos: ["Por Centro de Custo", "Por Categoria"]
    }
  ]);

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "Vendas":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "Financeiro":
        return <DollarSign className="h-4 w-4 text-blue-600" />;
      case "Estoque":
        return <Package className="h-4 w-4 text-orange-600" />;
      case "RH":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "Operacional":
        return <Settings className="h-4 w-4 text-gray-600" />;
      case "Personalizado":
        return <FileText className="h-4 w-4 text-indigo-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Tabular":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "Gráfico":
        return <BarChart3 className="h-4 w-4" />;
      case "Dashboard":
        return <PieChart className="h-4 w-4" />;
      case "Resumo":
        return <FileText className="h-4 w-4" />;
      case "Detalhado":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case "PDF":
        return <File className="h-4 w-4 text-red-600" />;
      case "Excel":
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case "HTML":
        return <FileImage className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>;
      case "Inativo":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inativo</Badge>;
      case "Rascunho":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Rascunho</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCriarModelo = async () => {
    if (!novoModelo.nome || !novoModelo.categoria || !novoModelo.tipo || !novoModelo.formato) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const modelo: ModeloRelatorio = {
        id: Date.now().toString(),
        nome: novoModelo.nome,
        descricao: novoModelo.descricao,
        categoria: novoModelo.categoria as any,
        tipo: novoModelo.tipo as any,
        formato: novoModelo.formato as any,
        status: "Rascunho",
        dataCriacao: new Date().toLocaleDateString('pt-BR'),
        ultimaModificacao: new Date().toLocaleDateString('pt-BR'),
        autor: "Usuário Atual",
        favorito: false,
        usos: 0,
        campos: novoModelo.campos ? novoModelo.campos.split(',').map(c => c.trim()) : [],
        filtros: novoModelo.filtros ? novoModelo.filtros.split(',').map(f => f.trim()) : [],
        agrupamentos: novoModelo.agrupamentos ? novoModelo.agrupamentos.split(',').map(a => a.trim()) : []
      };

      setModelos(prev => [modelo, ...prev]);
      setDialogAberto(false);
      setNovoModelo({
        nome: "",
        descricao: "",
        categoria: "",
        tipo: "",
        formato: "",
        campos: "",
        filtros: "",
        agrupamentos: ""
      });
      toast.success("Modelo de relatório criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar modelo de relatório");
    } finally {
      setCarregando(false);
    }
  };

  const handleEditarModelo = async () => {
    if (!modeloSelecionado) return;

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setModelos(prev => prev.map(modelo => 
        modelo.id === modeloSelecionado.id 
          ? { ...modeloSelecionado, ultimaModificacao: new Date().toLocaleDateString('pt-BR') }
          : modelo
      ));
      setDialogEdicao(false);
      setModeloSelecionado(null);
      toast.success("Modelo atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar modelo");
    } finally {
      setCarregando(false);
    }
  };

  const handleDuplicarModelo = async (modeloId: string) => {
    const modelo = modelos.find(m => m.id === modeloId);
    if (!modelo) return;

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const novoModelo: ModeloRelatorio = {
        ...modelo,
        id: Date.now().toString(),
        nome: `${modelo.nome} (Cópia)`,
        status: "Rascunho",
        dataCriacao: new Date().toLocaleDateString('pt-BR'),
        ultimaModificacao: new Date().toLocaleDateString('pt-BR'),
        usos: 0,
        favorito: false
      };
      setModelos(prev => [novoModelo, ...prev]);
      toast.success("Modelo duplicado com sucesso!");
    } catch (error) {
      toast.error("Erro ao duplicar modelo");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirModelo = async (modeloId: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setModelos(prev => prev.filter(modelo => modelo.id !== modeloId));
      toast.success("Modelo excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir modelo");
    } finally {
      setCarregando(false);
    }
  };

  const handleToggleFavorito = async (modeloId: string) => {
    setModelos(prev => prev.map(modelo => 
      modelo.id === modeloId 
        ? { ...modelo, favorito: !modelo.favorito }
        : modelo
    ));
  };

  const handleAlterarStatus = async (modeloId: string, novoStatus: string) => {
    setModelos(prev => prev.map(modelo => 
      modelo.id === modeloId 
        ? { ...modelo, status: novoStatus as any, ultimaModificacao: new Date().toLocaleDateString('pt-BR') }
        : modelo
    ));
    toast.success(`Status alterado para ${novoStatus}`);
  };

  const modelosFiltrados = modelos.filter(modelo => {
    const matchCategoria = filtroCategoria === "todos" || modelo.categoria.toLowerCase() === filtroCategoria;
    const matchTipo = filtroTipo === "todos" || modelo.tipo.toLowerCase() === filtroTipo;
    const matchStatus = filtroStatus === "todos" || modelo.status.toLowerCase() === filtroStatus;
    const matchBusca = busca === "" || 
      modelo.nome.toLowerCase().includes(busca.toLowerCase()) ||
      modelo.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      modelo.autor.toLowerCase().includes(busca.toLowerCase());
    
    return matchCategoria && matchTipo && matchStatus && matchBusca;
  });

  const totalModelos = modelos.length;
  const ativos = modelos.filter(m => m.status === "Ativo").length;
  const favoritos = modelos.filter(m => m.favorito).length;
  const rascunhos = modelos.filter(m => m.status === "Rascunho").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Modelos de Relatório</h1>
            <p className="text-muted-foreground">
              Gerencie templates de relatórios personalizados
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
                  Novo Modelo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Modelo de Relatório</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar um novo modelo de relatório.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome *</Label>
                      <Input
                        id="nome"
                        value={novoModelo.nome}
                        onChange={(e) => setNovoModelo(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Nome do modelo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoria">Categoria *</Label>
                      <Select value={novoModelo.categoria} onValueChange={(value) => setNovoModelo(prev => ({ ...prev, categoria: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vendas">Vendas</SelectItem>
                          <SelectItem value="Financeiro">Financeiro</SelectItem>
                          <SelectItem value="Estoque">Estoque</SelectItem>
                          <SelectItem value="RH">RH</SelectItem>
                          <SelectItem value="Operacional">Operacional</SelectItem>
                          <SelectItem value="Personalizado">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tipo">Tipo *</Label>
                      <Select value={novoModelo.tipo} onValueChange={(value) => setNovoModelo(prev => ({ ...prev, tipo: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tabular">Tabular</SelectItem>
                          <SelectItem value="Gráfico">Gráfico</SelectItem>
                          <SelectItem value="Dashboard">Dashboard</SelectItem>
                          <SelectItem value="Resumo">Resumo</SelectItem>
                          <SelectItem value="Detalhado">Detalhado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="formato">Formato *</Label>
                      <Select value={novoModelo.formato} onValueChange={(value) => setNovoModelo(prev => ({ ...prev, formato: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Excel">Excel</SelectItem>
                          <SelectItem value="CSV">CSV</SelectItem>
                          <SelectItem value="HTML">HTML</SelectItem>
                          <SelectItem value="JSON">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={novoModelo.descricao}
                      onChange={(e) => setNovoModelo(prev => ({ ...prev, descricao: e.target.value }))}
                      placeholder="Descrição do modelo"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="campos">Campos (separados por vírgula)</Label>
                    <Input
                      id="campos"
                      value={novoModelo.campos}
                      onChange={(e) => setNovoModelo(prev => ({ ...prev, campos: e.target.value }))}
                      placeholder="Ex: Data, Cliente, Produto, Valor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="filtros">Filtros (separados por vírgula)</Label>
                    <Input
                      id="filtros"
                      value={novoModelo.filtros}
                      onChange={(e) => setNovoModelo(prev => ({ ...prev, filtros: e.target.value }))}
                      placeholder="Ex: Período, Cliente, Produto"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agrupamentos">Agrupamentos (separados por vírgula)</Label>
                    <Input
                      id="agrupamentos"
                      value={novoModelo.agrupamentos}
                      onChange={(e) => setNovoModelo(prev => ({ ...prev, agrupamentos: e.target.value }))}
                      placeholder="Ex: Por Cliente, Por Produto"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogAberto(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCriarModelo} disabled={carregando}>
                    {carregando ? "Criando..." : "Criar Modelo"}
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
              <div className="text-2xl font-bold">{totalModelos}</div>
              <p className="text-xs text-muted-foreground">
                Modelos criados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ativos</CardTitle>
              <Settings className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{ativos}</div>
              <p className="text-xs text-muted-foreground">
                Em uso no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{favoritos}</div>
              <p className="text-xs text-muted-foreground">
                Marcados como favoritos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
              <Edit className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{rascunhos}</div>
              <p className="text-xs text-muted-foreground">
                Em desenvolvimento
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
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar modelos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas Categorias</SelectItem>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="estoque">Estoque</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Tipos</SelectItem>
                  <SelectItem value="tabular">Tabular</SelectItem>
                  <SelectItem value="gráfico">Gráfico</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="resumo">Resumo</SelectItem>
                  <SelectItem value="detalhado">Detalhado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Modelos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Modelos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Formato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Usos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modelosFiltrados.map((modelo) => (
                  <TableRow key={modelo.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {modelo.favorito && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            {modelo.nome}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {modelo.descricao}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Criado em {modelo.dataCriacao}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoriaIcon(modelo.categoria)}
                        <span>{modelo.categoria}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTipoIcon(modelo.tipo)}
                        <span>{modelo.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getFormatoIcon(modelo.formato)}
                        <span>{modelo.formato}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={modelo.status.toLowerCase()} 
                        onValueChange={(value) => handleAlterarStatus(modelo.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="inativo">Inativo</SelectItem>
                          <SelectItem value="rascunho">Rascunho</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{modelo.autor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{modelo.usos}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFavorito(modelo.id)}
                        >
                          {modelo.favorito ? (
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
                              onClick={() => setModeloSelecionado(modelo)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getCategoriaIcon(modelo.categoria)}
                                Detalhes do Modelo
                              </DialogTitle>
                            </DialogHeader>
                            {modeloSelecionado && (
                              <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Nome</Label>
                                    <p className="text-sm">{modeloSelecionado.nome}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Categoria</Label>
                                    <p className="text-sm">{modeloSelecionado.categoria}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Tipo</Label>
                                    <p className="text-sm">{modeloSelecionado.tipo}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Formato</Label>
                                    <p className="text-sm">{modeloSelecionado.formato}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <div className="mt-1">{getStatusBadge(modeloSelecionado.status)}</div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Usos</Label>
                                    <p className="text-sm">{modeloSelecionado.usos}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Descrição</Label>
                                  <p className="text-sm">{modeloSelecionado.descricao}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Campos</Label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {modeloSelecionado.campos.map((campo, index) => (
                                      <Badge key={index} variant="outline">{campo}</Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Filtros</Label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {modeloSelecionado.filtros.map((filtro, index) => (
                                      <Badge key={index} variant="secondary">{filtro}</Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Agrupamentos</Label>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {modeloSelecionado.agrupamentos.map((agrupamento, index) => (
                                      <Badge key={index} variant="outline">{agrupamento}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setModeloSelecionado(modelo);
                            setDialogEdicao(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicarModelo(modelo.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Download className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir Modelo</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este modelo de relatório? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleExcluirModelo(modelo.id)}
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
      </div>
    </AppLayout>
  );
};

export default ModelosRelatorio;