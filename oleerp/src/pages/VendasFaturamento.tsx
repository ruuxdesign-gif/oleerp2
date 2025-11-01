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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Mail,
  Phone,
  CreditCard,
  Receipt,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Users,
  Package
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Venda {
  id: string;
  numero: string;
  cliente: string;
  clienteEmail: string;
  clienteTelefone: string;
  vendedor: string;
  dataVenda: string;
  valorTotal: number;
  status: "Pendente" | "Aprovada" | "Cancelada" | "Faturada";
  formaPagamento: string;
  observacoes: string;
  itens: ItemVenda[];
  desconto: number;
  comissao: number;
  origem: "Proposta" | "Venda Direta" | "Renovação" | "Upgrade";
  propostaId?: string;
}

interface ItemVenda {
  id: string;
  produto: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  descricao: string;
}

interface Fatura {
  id: string;
  numero: string;
  vendaId: string;
  cliente: string;
  dataEmissao: string;
  dataVencimento: string;
  valorTotal: number;
  valorPago: number;
  status: "Pendente" | "Paga" | "Vencida" | "Cancelada" | "Parcial";
  formaPagamento: string;
  observacoes: string;
  parcelas: Parcela[];
  juros: number;
  multa: number;
  desconto: number;
}

interface Parcela {
  id: string;
  numero: number;
  dataVencimento: string;
  valor: number;
  valorPago: number;
  dataPagamento?: string;
  status: "Pendente" | "Paga" | "Vencida";
}

const VendasFaturamento = () => {
  const [vendas, setVendas] = useState<Venda[]>([
    {
      id: "1",
      numero: "VND-2024-001",
      cliente: "João Silva Santos",
      clienteEmail: "joao.silva@email.com",
      clienteTelefone: "(11) 99999-9999",
      vendedor: "Maria Vendas",
      dataVenda: "2024-01-15",
      valorTotal: 89.90,
      status: "Faturada",
      formaPagamento: "Boleto Bancário",
      observacoes: "Primeira venda do cliente",
      desconto: 10,
      comissao: 8.99,
      origem: "Proposta",
      propostaId: "PROP-2024-001",
      itens: [
        {
          id: "1",
          produto: "Fibra 100MB",
          quantidade: 1,
          valorUnitario: 89.90,
          valorTotal: 89.90,
          descricao: "Plano de internet fibra óptica 100MB"
        }
      ]
    },
    {
      id: "2",
      numero: "VND-2024-002",
      cliente: "Empresa Tech LTDA",
      clienteEmail: "contato@empresatech.com",
      clienteTelefone: "(11) 3333-4444",
      vendedor: "Carlos Comercial",
      dataVenda: "2024-01-20",
      valorTotal: 299.90,
      status: "Aprovada",
      formaPagamento: "PIX",
      observacoes: "Cliente corporativo",
      desconto: 15,
      comissao: 29.99,
      origem: "Proposta",
      propostaId: "PROP-2024-002",
      itens: [
        {
          id: "1",
          produto: "Corporativo 500MB",
          quantidade: 1,
          valorUnitario: 299.90,
          valorTotal: 299.90,
          descricao: "Plano corporativo com SLA diferenciado"
        }
      ]
    },
    {
      id: "3",
      numero: "VND-2024-003",
      cliente: "Restaurante Bom Sabor",
      clienteEmail: "contato@bomsabor.com",
      clienteTelefone: "(11) 2222-3333",
      vendedor: "Ana Vendas",
      dataVenda: "2024-02-01",
      valorTotal: 149.90,
      status: "Pendente",
      formaPagamento: "Cartão de Crédito",
      observacoes: "Aguardando aprovação do crédito",
      desconto: 5,
      comissao: 14.99,
      origem: "Venda Direta",
      itens: [
        {
          id: "1",
          produto: "Fibra 200MB",
          quantidade: 1,
          valorUnitario: 149.90,
          valorTotal: 149.90,
          descricao: "Plano comercial para estabelecimentos"
        }
      ]
    }
  ]);

  const [faturas, setFaturas] = useState<Fatura[]>([
    {
      id: "1",
      numero: "FAT-2024-001",
      vendaId: "1",
      cliente: "João Silva Santos",
      dataEmissao: "2024-01-15",
      dataVencimento: "2024-02-15",
      valorTotal: 89.90,
      valorPago: 89.90,
      status: "Paga",
      formaPagamento: "Boleto Bancário",
      observacoes: "Pagamento em dia",
      juros: 0,
      multa: 0,
      desconto: 0,
      parcelas: [
        {
          id: "1",
          numero: 1,
          dataVencimento: "2024-02-15",
          valor: 89.90,
          valorPago: 89.90,
          dataPagamento: "2024-02-14",
          status: "Paga"
        }
      ]
    },
    {
      id: "2",
      numero: "FAT-2024-002",
      vendaId: "2",
      cliente: "Empresa Tech LTDA",
      dataEmissao: "2024-01-20",
      dataVencimento: "2024-02-20",
      valorTotal: 299.90,
      valorPago: 0,
      status: "Pendente",
      formaPagamento: "PIX",
      observacoes: "Aguardando pagamento",
      juros: 0,
      multa: 0,
      desconto: 0,
      parcelas: [
        {
          id: "1",
          numero: 1,
          dataVencimento: "2024-02-20",
          valor: 299.90,
          valorPago: 0,
          status: "Pendente"
        }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState("vendas");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [vendedorFilter, setVendedorFilter] = useState<string>("todos");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isCreateVendaDialogOpen, setIsCreateVendaDialogOpen] = useState(false);
  const [isCreateFaturaDialogOpen, setIsCreateFaturaDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState<Venda | null>(null);
  const [selectedFatura, setSelectedFatura] = useState<Fatura | null>(null);
  const [newVenda, setNewVenda] = useState<Partial<Venda>>({
    numero: "",
    cliente: "",
    clienteEmail: "",
    clienteTelefone: "",
    vendedor: "",
    dataVenda: "",
    valorTotal: 0,
    status: "Pendente",
    formaPagamento: "",
    observacoes: "",
    desconto: 0,
    comissao: 0,
    origem: "Venda Direta",
    itens: []
  });

  const vendedores = ["Maria Vendas", "Carlos Comercial", "Pedro Vendas", "Ana Vendas"];
  const formasPagamento = ["Boleto Bancário", "PIX", "Cartão de Crédito", "Cartão de Débito", "Dinheiro", "Transferência"];
  const produtos = ["Fibra 50MB", "Fibra 100MB", "Fibra 200MB", "Fibra 500MB", "Corporativo 500MB", "Corporativo 1GB"];

  const filteredVendas = vendas.filter(venda => {
    const matchesSearch = venda.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venda.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || venda.status === statusFilter;
    const matchesVendedor = vendedorFilter === "todos" || venda.vendedor === vendedorFilter;
    return matchesSearch && matchesStatus && matchesVendedor;
  });

  const filteredFaturas = faturas.filter(fatura => {
    const matchesSearch = fatura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatura.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || fatura.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const generateVendaNumber = () => {
    const year = new Date().getFullYear();
    const count = vendas.length + 1;
    return `VND-${year}-${count.toString().padStart(3, '0')}`;
  };

  const generateFaturaNumber = () => {
    const year = new Date().getFullYear();
    const count = faturas.length + 1;
    return `FAT-${year}-${count.toString().padStart(3, '0')}`;
  };

  const calcularTotalVenda = (itens: ItemVenda[], desconto: number) => {
    const subtotal = itens.reduce((total, item) => total + item.valorTotal, 0);
    return subtotal - (subtotal * desconto / 100);
  };

  const handleCreateVenda = () => {
    if (!newVenda.cliente || !newVenda.vendedor || newVenda.itens?.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios e adicione pelo menos um item",
        variant: "destructive",
      });
      return;
    }

    const valorTotal = calcularTotalVenda(newVenda.itens!, newVenda.desconto!);
    const comissao = valorTotal * 0.1; // 10% de comissão

    const venda: Venda = {
      id: Date.now().toString(),
      numero: generateVendaNumber(),
      valorTotal,
      comissao,
      ...newVenda as Venda,
    };

    setVendas(prev => [...prev, venda]);
    setIsCreateVendaDialogOpen(false);
    setNewVenda({
      numero: "",
      cliente: "",
      clienteEmail: "",
      clienteTelefone: "",
      vendedor: "",
      dataVenda: "",
      valorTotal: 0,
      status: "Pendente",
      formaPagamento: "",
      observacoes: "",
      desconto: 0,
      comissao: 0,
      origem: "Venda Direta",
      itens: []
    });

    toast({
      title: "Sucesso",
      description: "Venda criada com sucesso!",
    });
  };

  const handleCreateFatura = (vendaId: string) => {
    const venda = vendas.find(v => v.id === vendaId);
    if (!venda) return;

    const fatura: Fatura = {
      id: Date.now().toString(),
      numero: generateFaturaNumber(),
      vendaId: venda.id,
      cliente: venda.cliente,
      dataEmissao: new Date().toISOString().split('T')[0],
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      valorTotal: venda.valorTotal,
      valorPago: 0,
      status: "Pendente",
      formaPagamento: venda.formaPagamento,
      observacoes: "",
      juros: 0,
      multa: 0,
      desconto: 0,
      parcelas: [
        {
          id: "1",
          numero: 1,
          dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          valor: venda.valorTotal,
          valorPago: 0,
          status: "Pendente"
        }
      ]
    };

    setFaturas(prev => [...prev, fatura]);
    
    // Atualizar status da venda para "Faturada"
    setVendas(prev =>
      prev.map(v =>
        v.id === vendaId ? { ...v, status: "Faturada" as const } : v
      )
    );

    toast({
      title: "Sucesso",
      description: "Fatura criada com sucesso!",
    });
  };

  const handlePagarFatura = (faturaId: string, valorPago: number) => {
    setFaturas(prev =>
      prev.map(fatura => {
        if (fatura.id === faturaId) {
          const novoValorPago = fatura.valorPago + valorPago;
          const novoStatus = novoValorPago >= fatura.valorTotal ? "Paga" : "Parcial";
          
          return {
            ...fatura,
            valorPago: novoValorPago,
            status: novoStatus as const
          };
        }
        return fatura;
      })
    );

    toast({
      title: "Sucesso",
      description: "Pagamento registrado com sucesso!",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Aprovada": return "bg-green-100 text-green-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      case "Faturada": return "bg-blue-100 text-blue-800";
      case "Paga": return "bg-green-100 text-green-800";
      case "Vencida": return "bg-red-100 text-red-800";
      case "Parcial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendente": return <Clock className="h-4 w-4" />;
      case "Aprovada": return <CheckCircle className="h-4 w-4" />;
      case "Cancelada": return <XCircle className="h-4 w-4" />;
      case "Faturada": return <Receipt className="h-4 w-4" />;
      case "Paga": return <CheckCircle className="h-4 w-4" />;
      case "Vencida": return <AlertCircle className="h-4 w-4" />;
      case "Parcial": return <CreditCard className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Métricas para o dashboard
  const totalVendas = vendas.reduce((total, venda) => total + venda.valorTotal, 0);
  const totalFaturado = faturas.filter(f => f.status === "Paga").reduce((total, fatura) => total + fatura.valorPago, 0);
  const totalPendente = faturas.filter(f => f.status === "Pendente").reduce((total, fatura) => total + fatura.valorTotal, 0);
  const totalComissoes = vendas.reduce((total, venda) => total + venda.comissao, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendas e Faturamento</h1>
            <p className="text-muted-foreground">
              Gerencie vendas, faturas e recebimentos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relatório
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalVendas.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {vendas.length} vendas realizadas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturado</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalFaturado.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Valores recebidos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">A Receber</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalPendente.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Faturas pendentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissões</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalComissoes.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Total de comissões
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
            <TabsTrigger value="faturas">Faturas</TabsTrigger>
          </TabsList>

          <TabsContent value="vendas" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestão de Vendas</h2>
              <Dialog open={isCreateVendaDialogOpen} onOpenChange={setIsCreateVendaDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Venda
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Nova Venda</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cliente">Cliente *</Label>
                        <Input
                          id="cliente"
                          value={newVenda.cliente}
                          onChange={(e) => setNewVenda(prev => ({ ...prev, cliente: e.target.value }))}
                          placeholder="Nome do cliente"
                        />
                      </div>
                      <div>
                        <Label htmlFor="clienteEmail">Email do Cliente</Label>
                        <Input
                          id="clienteEmail"
                          type="email"
                          value={newVenda.clienteEmail}
                          onChange={(e) => setNewVenda(prev => ({ ...prev, clienteEmail: e.target.value }))}
                          placeholder="email@cliente.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="clienteTelefone">Telefone do Cliente</Label>
                        <Input
                          id="clienteTelefone"
                          value={newVenda.clienteTelefone}
                          onChange={(e) => setNewVenda(prev => ({ ...prev, clienteTelefone: e.target.value }))}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vendedor">Vendedor *</Label>
                        <Select
                          value={newVenda.vendedor}
                          onValueChange={(value) => setNewVenda(prev => ({ ...prev, vendedor: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um vendedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {vendedores.map(vendedor => (
                              <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dataVenda">Data da Venda</Label>
                        <Input
                          id="dataVenda"
                          type="date"
                          value={newVenda.dataVenda}
                          onChange={(e) => setNewVenda(prev => ({ ...prev, dataVenda: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                        <Select
                          value={newVenda.formaPagamento}
                          onValueChange={(value) => setNewVenda(prev => ({ ...prev, formaPagamento: value }))}
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
                        <Label htmlFor="origem">Origem da Venda</Label>
                        <Select
                          value={newVenda.origem}
                          onValueChange={(value: "Proposta" | "Venda Direta" | "Renovação" | "Upgrade") => 
                            setNewVenda(prev => ({ ...prev, origem: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Proposta">Proposta</SelectItem>
                            <SelectItem value="Venda Direta">Venda Direta</SelectItem>
                            <SelectItem value="Renovação">Renovação</SelectItem>
                            <SelectItem value="Upgrade">Upgrade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="desconto">Desconto (%)</Label>
                        <Input
                          id="desconto"
                          type="number"
                          step="0.01"
                          value={newVenda.desconto}
                          onChange={(e) => setNewVenda(prev => ({ ...prev, desconto: parseFloat(e.target.value) }))}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={newVenda.observacoes}
                        onChange={(e) => setNewVenda(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Observações sobre a venda..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateVendaDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateVenda}>
                      Criar Venda
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filtros para Vendas */}
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
                        placeholder="Buscar por número ou cliente..."
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
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Aprovada">Aprovada</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                      <SelectItem value="Faturada">Faturada</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={vendedorFilter} onValueChange={setVendedorFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      {vendedores.map(vendedor => (
                        <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Vendas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Vendas ({filteredVendas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVendas.map((venda) => (
                    <div key={venda.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <div className="font-medium">{venda.numero}</div>
                          <div className="text-sm text-muted-foreground">{venda.cliente}</div>
                          <div className="text-sm text-muted-foreground">{venda.vendedor}</div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Valor:</span> R$ {venda.valorTotal.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Comissão:</span> R$ {venda.comissao.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Desconto:</span> {venda.desconto}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Data:</span> {new Date(venda.dataVenda).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Pagamento:</span> {venda.formaPagamento}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Origem:</span> {venda.origem}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Email:</span> {venda.clienteEmail}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Telefone:</span> {venda.clienteTelefone}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Itens:</span> {venda.itens.length}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(venda.status)}
                            <Badge className={getStatusColor(venda.status)}>
                              {venda.status}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVenda(venda);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVenda(venda);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {venda.status === "Aprovada" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCreateFatura(venda.id)}
                              >
                                <Receipt className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setVendas(prev => prev.filter(v => v.id !== venda.id));
                                toast({
                                  title: "Sucesso",
                                  description: "Venda removida com sucesso!",
                                });
                              }}
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
          </TabsContent>

          <TabsContent value="faturas" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestão de Faturas</h2>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Nova Fatura Manual
              </Button>
            </div>

            {/* Filtros para Faturas */}
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
                        placeholder="Buscar por número ou cliente..."
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
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Paga">Paga</SelectItem>
                      <SelectItem value="Vencida">Vencida</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                      <SelectItem value="Parcial">Parcial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Faturas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Faturas ({filteredFaturas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFaturas.map((fatura) => (
                    <div key={fatura.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <div className="font-medium">{fatura.numero}</div>
                          <div className="text-sm text-muted-foreground">{fatura.cliente}</div>
                          <div className="text-sm text-muted-foreground">Venda: {fatura.vendaId}</div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Total:</span> R$ {fatura.valorTotal.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Pago:</span> R$ {fatura.valorPago.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Saldo:</span> R$ {(fatura.valorTotal - fatura.valorPago).toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Emissão:</span> {new Date(fatura.dataEmissao).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Vencimento:</span> {new Date(fatura.dataVencimento).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Pagamento:</span> {fatura.formaPagamento}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Parcelas:</span> {fatura.parcelas.length}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Juros:</span> R$ {fatura.juros.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Multa:</span> R$ {fatura.multa.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(fatura.status)}
                            <Badge className={getStatusColor(fatura.status)}>
                              {fatura.status}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedFatura(fatura);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {fatura.status !== "Paga" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePagarFatura(fatura.id, fatura.valorTotal - fatura.valorPago)}
                              >
                                <CreditCard className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFaturas(prev => prev.filter(f => f.id !== fatura.id));
                                toast({
                                  title: "Sucesso",
                                  description: "Fatura removida com sucesso!",
                                });
                              }}
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
          </TabsContent>
        </Tabs>

        {/* Dialog de Visualização */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedVenda ? "Detalhes da Venda" : "Detalhes da Fatura"}
              </DialogTitle>
            </DialogHeader>
            {selectedVenda && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número da Venda</Label>
                    <p className="text-sm font-medium">{selectedVenda.numero}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedVenda.status)}
                      <Badge className={getStatusColor(selectedVenda.status)}>
                        {selectedVenda.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="text-sm">{selectedVenda.cliente}</p>
                  </div>
                  <div>
                    <Label>Vendedor</Label>
                    <p className="text-sm">{selectedVenda.vendedor}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Valor Total</Label>
                    <p className="text-sm font-medium">R$ {selectedVenda.valorTotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Desconto</Label>
                    <p className="text-sm">{selectedVenda.desconto}%</p>
                  </div>
                  <div>
                    <Label>Comissão</Label>
                    <p className="text-sm font-medium">R$ {selectedVenda.comissao.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <Label>Itens da Venda</Label>
                  <div className="mt-2 space-y-2">
                    {selectedVenda.itens.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium">{item.produto}</p>
                          <p className="text-sm text-muted-foreground">{item.descricao}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {item.valorTotal.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantidade}x R$ {item.valorUnitario.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedVenda.observacoes && (
                  <div>
                    <Label>Observações</Label>
                    <p className="text-sm">{selectedVenda.observacoes}</p>
                  </div>
                )}
              </div>
            )}
            {selectedFatura && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número da Fatura</Label>
                    <p className="text-sm font-medium">{selectedFatura.numero}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedFatura.status)}
                      <Badge className={getStatusColor(selectedFatura.status)}>
                        {selectedFatura.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="text-sm">{selectedFatura.cliente}</p>
                  </div>
                  <div>
                    <Label>Venda Relacionada</Label>
                    <p className="text-sm">{selectedFatura.vendaId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Valor Total</Label>
                    <p className="text-sm font-medium">R$ {selectedFatura.valorTotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Valor Pago</Label>
                    <p className="text-sm font-medium">R$ {selectedFatura.valorPago.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Saldo</Label>
                    <p className="text-sm font-medium">R$ {(selectedFatura.valorTotal - selectedFatura.valorPago).toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <Label>Parcelas</Label>
                  <div className="mt-2 space-y-2">
                    {selectedFatura.parcelas.map(parcela => (
                      <div key={parcela.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium">Parcela {parcela.numero}</p>
                          <p className="text-sm text-muted-foreground">
                            Vencimento: {new Date(parcela.dataVencimento).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {parcela.valor.toFixed(2)}</p>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(parcela.status)}
                            <Badge className={getStatusColor(parcela.status)}>
                              {parcela.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default VendasFaturamento;