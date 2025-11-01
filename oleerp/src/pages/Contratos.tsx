import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  DollarSign,
  Clock,
  User,
  Building,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Contrato {
  id: string;
  numero: string;
  cliente: string;
  clienteId: string;
  plano: string;
  valorMensal: number;
  dataInicio: string;
  dataVencimento: string;
  status: "Ativo" | "Vencido" | "Cancelado" | "Suspenso" | "Pendente";
  tipo: "Mensal" | "Anual" | "Bienal";
  formaPagamento: string;
  diaVencimento: number;
  observacoes: string;
  responsavel: string;
  clausulasEspeciais: string;
  valorInstalacao: number;
  desconto: number;
  multa: number;
  renovacaoAutomatica: boolean;
}

const Contratos = () => {
  const [contratos, setContratos] = useState<Contrato[]>([
    {
      id: "1",
      numero: "CTR-2024-001",
      cliente: "João Silva Santos",
      clienteId: "1",
      plano: "Fibra 100MB",
      valorMensal: 89.90,
      dataInicio: "2024-01-15",
      dataVencimento: "2025-01-15",
      status: "Ativo",
      tipo: "Anual",
      formaPagamento: "Boleto",
      diaVencimento: 10,
      observacoes: "Cliente pontual, sem histórico de problemas",
      responsavel: "Maria Vendas",
      clausulasEspeciais: "Desconto de 10% para pagamento anual à vista",
      valorInstalacao: 150.00,
      desconto: 10,
      multa: 50.00,
      renovacaoAutomatica: true
    },
    {
      id: "2",
      numero: "CTR-2024-002",
      cliente: "Empresa Tech LTDA",
      clienteId: "2",
      plano: "Corporativo 500MB",
      valorMensal: 299.90,
      dataInicio: "2023-12-10",
      dataVencimento: "2024-12-10",
      status: "Ativo",
      tipo: "Anual",
      formaPagamento: "PIX",
      diaVencimento: 5,
      observacoes: "Cliente corporativo, contrato anual",
      responsavel: "Carlos Comercial",
      clausulasEspeciais: "SLA de 99.9% de disponibilidade",
      valorInstalacao: 0,
      desconto: 15,
      multa: 200.00,
      renovacaoAutomatica: true
    },
    {
      id: "3",
      numero: "CTR-2023-045",
      cliente: "Ana Costa Lima",
      clienteId: "3",
      plano: "Fibra 50MB",
      valorMensal: 59.90,
      dataInicio: "2023-08-20",
      dataVencimento: "2024-08-20",
      status: "Cancelado",
      tipo: "Anual",
      formaPagamento: "Cartão de Crédito",
      diaVencimento: 15,
      observacoes: "Cancelou por mudança de endereço",
      responsavel: "Pedro Vendas",
      clausulasEspeciais: "",
      valorInstalacao: 100.00,
      desconto: 0,
      multa: 30.00,
      renovacaoAutomatica: false
    },
    {
      id: "4",
      numero: "CTR-2024-003",
      cliente: "Restaurante Bom Sabor",
      clienteId: "4",
      plano: "Fibra 200MB",
      valorMensal: 149.90,
      dataInicio: "2024-02-01",
      dataVencimento: "2025-02-01",
      status: "Suspenso",
      tipo: "Anual",
      formaPagamento: "Boleto",
      diaVencimento: 20,
      observacoes: "Suspenso por inadimplência",
      responsavel: "Ana Cobrança",
      clausulasEspeciais: "Multa por atraso de 2% ao mês",
      valorInstalacao: 120.00,
      desconto: 5,
      multa: 75.00,
      renovacaoAutomatica: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [tipoFilter, setTipoFilter] = useState<string>("todos");
  const [selectedContratos, setSelectedContratos] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);
  const [newContrato, setNewContrato] = useState<Partial<Contrato>>({
    numero: "",
    cliente: "",
    clienteId: "",
    plano: "",
    valorMensal: 0,
    dataInicio: "",
    dataVencimento: "",
    status: "Pendente",
    tipo: "Anual",
    formaPagamento: "",
    diaVencimento: 10,
    observacoes: "",
    responsavel: "",
    clausulasEspeciais: "",
    valorInstalacao: 0,
    desconto: 0,
    multa: 0,
    renovacaoAutomatica: true
  });

  const planos = ["Fibra 50MB", "Fibra 100MB", "Fibra 200MB", "Fibra 500MB", "Corporativo 500MB", "Corporativo 1GB"];
  const responsaveis = ["Maria Vendas", "Carlos Comercial", "Pedro Vendas", "Ana Cobrança"];
  const formasPagamento = ["Boleto", "PIX", "Cartão de Crédito", "Débito Automático", "Transferência"];
  const clientes = ["João Silva Santos", "Empresa Tech LTDA", "Ana Costa Lima", "Restaurante Bom Sabor"];

  const filteredContratos = contratos.filter(contrato => {
    const matchesSearch = contrato.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.plano.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || contrato.status === statusFilter;
    const matchesTipo = tipoFilter === "todos" || contrato.tipo === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const handleSelectContrato = (contratoId: string) => {
    setSelectedContratos(prev =>
      prev.includes(contratoId)
        ? prev.filter(id => id !== contratoId)
        : [...prev, contratoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContratos.length === filteredContratos.length) {
      setSelectedContratos([]);
    } else {
      setSelectedContratos(filteredContratos.map(contrato => contrato.id));
    }
  };

  const generateContractNumber = () => {
    const year = new Date().getFullYear();
    const count = contratos.length + 1;
    return `CTR-${year}-${count.toString().padStart(3, '0')}`;
  };

  const handleCreateContrato = () => {
    if (!newContrato.cliente || !newContrato.plano || !newContrato.dataInicio) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const contrato: Contrato = {
      id: Date.now().toString(),
      numero: generateContractNumber(),
      ...newContrato as Contrato,
    };

    setContratos(prev => [...prev, contrato]);
    setIsCreateDialogOpen(false);
    setNewContrato({
      numero: "",
      cliente: "",
      clienteId: "",
      plano: "",
      valorMensal: 0,
      dataInicio: "",
      dataVencimento: "",
      status: "Pendente",
      tipo: "Anual",
      formaPagamento: "",
      diaVencimento: 10,
      observacoes: "",
      responsavel: "",
      clausulasEspeciais: "",
      valorInstalacao: 0,
      desconto: 0,
      multa: 0,
      renovacaoAutomatica: true
    });

    toast({
      title: "Sucesso",
      description: "Contrato criado com sucesso!",
    });
  };

  const handleEditContrato = () => {
    if (!selectedContrato) return;

    setContratos(prev =>
      prev.map(contrato =>
        contrato.id === selectedContrato.id ? selectedContrato : contrato
      )
    );
    setIsEditDialogOpen(false);
    setSelectedContrato(null);

    toast({
      title: "Sucesso",
      description: "Contrato atualizado com sucesso!",
    });
  };

  const handleDeleteContrato = (contratoId: string) => {
    setContratos(prev => prev.filter(contrato => contrato.id !== contratoId));
    toast({
      title: "Sucesso",
      description: "Contrato removido com sucesso!",
    });
  };

  const handleRenovarContrato = (contratoId: string) => {
    setContratos(prev =>
      prev.map(contrato => {
        if (contrato.id === contratoId) {
          const novaDataVencimento = new Date(contrato.dataVencimento);
          novaDataVencimento.setFullYear(novaDataVencimento.getFullYear() + 1);
          return {
            ...contrato,
            dataVencimento: novaDataVencimento.toISOString().split('T')[0],
            status: "Ativo" as const
          };
        }
        return contrato;
      })
    );
    toast({
      title: "Sucesso",
      description: "Contrato renovado com sucesso!",
    });
  };

  const handleSuspenderContrato = (contratoId: string) => {
    setContratos(prev =>
      prev.map(contrato =>
        contrato.id === contratoId
          ? { ...contrato, status: "Suspenso" as const }
          : contrato
      )
    );
    toast({
      title: "Sucesso",
      description: "Contrato suspenso com sucesso!",
    });
  };

  const handleAtivarContrato = (contratoId: string) => {
    setContratos(prev =>
      prev.map(contrato =>
        contrato.id === contratoId
          ? { ...contrato, status: "Ativo" as const }
          : contrato
      )
    );
    toast({
      title: "Sucesso",
      description: "Contrato ativado com sucesso!",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Vencido": return "bg-red-100 text-red-800";
      case "Cancelado": return "bg-gray-100 text-gray-800";
      case "Suspenso": return "bg-yellow-100 text-yellow-800";
      case "Pendente": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ativo": return <CheckCircle className="h-4 w-4" />;
      case "Vencido": return <XCircle className="h-4 w-4" />;
      case "Cancelado": return <XCircle className="h-4 w-4" />;
      case "Suspenso": return <AlertCircle className="h-4 w-4" />;
      case "Pendente": return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const calcularValorAnual = (valorMensal: number, desconto: number) => {
    const valorAnual = valorMensal * 12;
    return valorAnual - (valorAnual * desconto / 100);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
            <p className="text-muted-foreground">
              Gerencie todos os contratos dos clientes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Contrato
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Novo Contrato</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cliente">Cliente *</Label>
                      <Select
                        value={newContrato.cliente}
                        onValueChange={(value) => setNewContrato(prev => ({ ...prev, cliente: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map(cliente => (
                            <SelectItem key={cliente} value={cliente}>{cliente}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="plano">Plano *</Label>
                      <Select
                        value={newContrato.plano}
                        onValueChange={(value) => setNewContrato(prev => ({ ...prev, plano: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                        <SelectContent>
                          {planos.map(plano => (
                            <SelectItem key={plano} value={plano}>{plano}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="valorMensal">Valor Mensal *</Label>
                        <Input
                          id="valorMensal"
                          type="number"
                          step="0.01"
                          value={newContrato.valorMensal}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, valorMensal: parseFloat(e.target.value) }))}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorInstalacao">Valor Instalação</Label>
                        <Input
                          id="valorInstalacao"
                          type="number"
                          step="0.01"
                          value={newContrato.valorInstalacao}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, valorInstalacao: parseFloat(e.target.value) }))}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="desconto">Desconto (%)</Label>
                        <Input
                          id="desconto"
                          type="number"
                          step="0.01"
                          value={newContrato.desconto}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, desconto: parseFloat(e.target.value) }))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="multa">Multa Rescisão</Label>
                        <Input
                          id="multa"
                          type="number"
                          step="0.01"
                          value={newContrato.multa}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, multa: parseFloat(e.target.value) }))}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="dataInicio">Data Início *</Label>
                        <Input
                          id="dataInicio"
                          type="date"
                          value={newContrato.dataInicio}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, dataInicio: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataVencimento">Data Vencimento</Label>
                        <Input
                          id="dataVencimento"
                          type="date"
                          value={newContrato.dataVencimento}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, dataVencimento: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="tipo">Tipo Contrato</Label>
                        <Select
                          value={newContrato.tipo}
                          onValueChange={(value: "Mensal" | "Anual" | "Bienal") => 
                            setNewContrato(prev => ({ ...prev, tipo: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mensal">Mensal</SelectItem>
                            <SelectItem value="Anual">Anual</SelectItem>
                            <SelectItem value="Bienal">Bienal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="diaVencimento">Dia Vencimento</Label>
                        <Input
                          id="diaVencimento"
                          type="number"
                          min="1"
                          max="31"
                          value={newContrato.diaVencimento}
                          onChange={(e) => setNewContrato(prev => ({ ...prev, diaVencimento: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                      <Select
                        value={newContrato.formaPagamento}
                        onValueChange={(value) => setNewContrato(prev => ({ ...prev, formaPagamento: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a forma de pagamento" />
                        </SelectTrigger>
                        <SelectContent>
                          {formasPagamento.map(forma => (
                            <SelectItem key={forma} value={forma}>{forma}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Select
                        value={newContrato.responsavel}
                        onValueChange={(value) => setNewContrato(prev => ({ ...prev, responsavel: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um responsável" />
                        </SelectTrigger>
                        <SelectContent>
                          {responsaveis.map(responsavel => (
                            <SelectItem key={responsavel} value={responsavel}>{responsavel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div>
                      <Label htmlFor="clausulasEspeciais">Cláusulas Especiais</Label>
                      <Textarea
                        id="clausulasEspeciais"
                        value={newContrato.clausulasEspeciais}
                        onChange={(e) => setNewContrato(prev => ({ ...prev, clausulasEspeciais: e.target.value }))}
                        placeholder="Cláusulas especiais do contrato..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={newContrato.observacoes}
                        onChange={(e) => setNewContrato(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Observações sobre o contrato..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="renovacaoAutomatica"
                        checked={newContrato.renovacaoAutomatica}
                        onCheckedChange={(checked) => 
                          setNewContrato(prev => ({ ...prev, renovacaoAutomatica: checked as boolean }))
                        }
                      />
                      <Label htmlFor="renovacaoAutomatica">Renovação Automática</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateContrato}>
                    Criar Contrato
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por número, cliente ou plano..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Vencido">Vencido</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Anual">Anual</SelectItem>
                  <SelectItem value="Bienal">Bienal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ações em lote */}
        {selectedContratos.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {selectedContratos.length} contrato(s) selecionado(s)
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Renovar Selecionados
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancelar Selecionados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Contratos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Contratos ({filteredContratos.length})
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedContratos.length === filteredContratos.length && filteredContratos.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Selecionar todos</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContratos.map((contrato) => (
                <div key={contrato.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={selectedContratos.includes(contrato.id)}
                    onCheckedChange={() => handleSelectContrato(contrato.id)}
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <div className="font-medium">{contrato.numero}</div>
                      <div className="text-sm text-muted-foreground">{contrato.cliente}</div>
                      <div className="text-sm text-muted-foreground">{contrato.plano}</div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Valor:</span> R$ {contrato.valorMensal.toFixed(2)}/mês
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Tipo:</span> {contrato.tipo}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Pagamento:</span> {contrato.formaPagamento}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Início:</span> {new Date(contrato.dataInicio).toLocaleDateString()}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Vencimento:</span> {new Date(contrato.dataVencimento).toLocaleDateString()}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Venc. Fatura:</span> Dia {contrato.diaVencimento}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Responsável:</span> {contrato.responsavel}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Desconto:</span> {contrato.desconto}%
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Renovação:</span> {contrato.renovacaoAutomatica ? "Sim" : "Não"}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(contrato.status)}
                        <Badge className={getStatusColor(contrato.status)}>
                          {contrato.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedContrato(contrato);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedContrato(contrato);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {contrato.status === "Ativo" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuspenderContrato(contrato.id)}
                          >
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {contrato.status === "Suspenso" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAtivarContrato(contrato.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRenovarContrato(contrato.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContrato(contrato.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Visualização */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Contrato</DialogTitle>
            </DialogHeader>
            {selectedContrato && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número do Contrato</Label>
                    <p className="text-sm font-medium">{selectedContrato.numero}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedContrato.status)}
                      <Badge className={getStatusColor(selectedContrato.status)}>
                        {selectedContrato.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="text-sm">{selectedContrato.cliente}</p>
                  </div>
                  <div>
                    <Label>Plano</Label>
                    <p className="text-sm">{selectedContrato.plano}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Valor Mensal</Label>
                    <p className="text-sm font-medium">R$ {selectedContrato.valorMensal.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Desconto</Label>
                    <p className="text-sm">{selectedContrato.desconto}%</p>
                  </div>
                  <div>
                    <Label>Valor Anual</Label>
                    <p className="text-sm font-medium">
                      R$ {calcularValorAnual(selectedContrato.valorMensal, selectedContrato.desconto).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data de Início</Label>
                    <p className="text-sm">{new Date(selectedContrato.dataInicio).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Data de Vencimento</Label>
                    <p className="text-sm">{new Date(selectedContrato.dataVencimento).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Tipo</Label>
                    <p className="text-sm">{selectedContrato.tipo}</p>
                  </div>
                  <div>
                    <Label>Forma de Pagamento</Label>
                    <p className="text-sm">{selectedContrato.formaPagamento}</p>
                  </div>
                  <div>
                    <Label>Dia de Vencimento</Label>
                    <p className="text-sm">Dia {selectedContrato.diaVencimento}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Valor de Instalação</Label>
                    <p className="text-sm">R$ {selectedContrato.valorInstalacao.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Multa por Rescisão</Label>
                    <p className="text-sm">R$ {selectedContrato.multa.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <Label>Responsável</Label>
                  <p className="text-sm">{selectedContrato.responsavel}</p>
                </div>

                <div>
                  <Label>Renovação Automática</Label>
                  <p className="text-sm">{selectedContrato.renovacaoAutomatica ? "Sim" : "Não"}</p>
                </div>

                {selectedContrato.clausulasEspeciais && (
                  <div>
                    <Label>Cláusulas Especiais</Label>
                    <p className="text-sm">{selectedContrato.clausulasEspeciais}</p>
                  </div>
                )}

                {selectedContrato.observacoes && (
                  <div>
                    <Label>Observações</Label>
                    <p className="text-sm">{selectedContrato.observacoes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Contrato</DialogTitle>
            </DialogHeader>
            {selectedContrato && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={selectedContrato.status}
                      onValueChange={(value: "Ativo" | "Vencido" | "Cancelado" | "Suspenso" | "Pendente") => 
                        setSelectedContrato(prev => prev ? { ...prev, status: value } : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Vencido">Vencido</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                        <SelectItem value="Suspenso">Suspenso</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-valorMensal">Valor Mensal</Label>
                    <Input
                      id="edit-valorMensal"
                      type="number"
                      step="0.01"
                      value={selectedContrato.valorMensal}
                      onChange={(e) => setSelectedContrato(prev => prev ? { ...prev, valorMensal: parseFloat(e.target.value) } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-desconto">Desconto (%)</Label>
                    <Input
                      id="edit-desconto"
                      type="number"
                      step="0.01"
                      value={selectedContrato.desconto}
                      onChange={(e) => setSelectedContrato(prev => prev ? { ...prev, desconto: parseFloat(e.target.value) } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-dataVencimento">Data Vencimento</Label>
                    <Input
                      id="edit-dataVencimento"
                      type="date"
                      value={selectedContrato.dataVencimento}
                      onChange={(e) => setSelectedContrato(prev => prev ? { ...prev, dataVencimento: e.target.value } : null)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-formaPagamento">Forma de Pagamento</Label>
                    <Select
                      value={selectedContrato.formaPagamento}
                      onValueChange={(value) => setSelectedContrato(prev => prev ? { ...prev, formaPagamento: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formasPagamento.map(forma => (
                          <SelectItem key={forma} value={forma}>{forma}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-diaVencimento">Dia Vencimento</Label>
                    <Input
                      id="edit-diaVencimento"
                      type="number"
                      min="1"
                      max="31"
                      value={selectedContrato.diaVencimento}
                      onChange={(e) => setSelectedContrato(prev => prev ? { ...prev, diaVencimento: parseInt(e.target.value) } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-responsavel">Responsável</Label>
                    <Select
                      value={selectedContrato.responsavel}
                      onValueChange={(value) => setSelectedContrato(prev => prev ? { ...prev, responsavel: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {responsaveis.map(responsavel => (
                          <SelectItem key={responsavel} value={responsavel}>{responsavel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-renovacaoAutomatica"
                      checked={selectedContrato.renovacaoAutomatica}
                      onCheckedChange={(checked) => 
                        setSelectedContrato(prev => prev ? { ...prev, renovacaoAutomatica: checked as boolean } : null)
                      }
                    />
                    <Label htmlFor="edit-renovacaoAutomatica">Renovação Automática</Label>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="edit-observacoes">Observações</Label>
                    <Textarea
                      id="edit-observacoes"
                      value={selectedContrato.observacoes}
                      onChange={(e) => setSelectedContrato(prev => prev ? { ...prev, observacoes: e.target.value } : null)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditContrato}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Contratos;