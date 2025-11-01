import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  CreditCard,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  Heart,
  Home,
  Tv,
  Users,
  FileText,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContaReceber {
  id: string;
  numeroFatura: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
    documento: string;
  };
  servico: {
    tipo: "Internet Fibra" | "Multiserviços" | "Telemedicina" | "Casa Conectada" | "Streaming TV";
    plano: string;
    valor: number;
  };
  dataVencimento: string;
  dataEmissao: string;
  valor: number;
  valorPago: number;
  status: "pendente" | "pago" | "vencido" | "parcial" | "cancelado";
  formaPagamento?: string;
  observacoes?: string;
  tentativasCobranca: number;
  ultimaCobranca?: string;
}

const ContasReceber = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [servicoFilter, setServicoFilter] = useState<string>("todos");
  const [selectedContas, setSelectedContas] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedConta, setSelectedConta] = useState<ContaReceber | null>(null);

  const [contas] = useState<ContaReceber[]>([
    {
      id: "1",
      numeroFatura: "FAT-2024-001234",
      cliente: {
        nome: "João Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        documento: "123.456.789-00"
      },
      servico: {
        tipo: "Internet Fibra",
        plano: "Fibra 500MB",
        valor: 89.90
      },
      dataVencimento: "2024-12-15",
      dataEmissao: "2024-11-15",
      valor: 89.90,
      valorPago: 0,
      status: "vencido",
      tentativasCobranca: 3,
      ultimaCobranca: "2024-12-18"
    },
    {
      id: "2",
      numeroFatura: "FAT-2024-001235",
      cliente: {
        nome: "Maria Santos",
        email: "maria.santos@email.com",
        telefone: "(11) 88888-8888",
        documento: "987.654.321-00"
      },
      servico: {
        tipo: "Multiserviços",
        plano: "Plano Família Completo",
        valor: 149.90
      },
      dataVencimento: "2024-12-20",
      dataEmissao: "2024-11-20",
      valor: 149.90,
      valorPago: 149.90,
      status: "pago",
      formaPagamento: "PIX",
      tentativasCobranca: 0
    },
    {
      id: "3",
      numeroFatura: "FAT-2024-001236",
      cliente: {
        nome: "Carlos Oliveira",
        email: "carlos.oliveira@email.com",
        telefone: "(11) 77777-7777",
        documento: "456.789.123-00"
      },
      servico: {
        tipo: "Telemedicina",
        plano: "Consultas Ilimitadas",
        valor: 79.90
      },
      dataVencimento: "2024-12-25",
      dataEmissao: "2024-11-25",
      valor: 79.90,
      valorPago: 0,
      status: "pendente",
      tentativasCobranca: 0
    },
    {
      id: "4",
      numeroFatura: "FAT-2024-001237",
      cliente: {
        nome: "Ana Costa",
        email: "ana.costa@email.com",
        telefone: "(11) 66666-6666",
        documento: "789.123.456-00"
      },
      servico: {
        tipo: "Casa Conectada",
        plano: "Smart Home Premium",
        valor: 199.90
      },
      dataVencimento: "2024-12-22",
      dataEmissao: "2024-11-22",
      valor: 199.90,
      valorPago: 100.00,
      status: "parcial",
      formaPagamento: "Cartão de Crédito",
      tentativasCobranca: 1,
      ultimaCobranca: "2024-12-23"
    },
    {
      id: "5",
      numeroFatura: "FAT-2024-001238",
      cliente: {
        nome: "Pedro Ferreira",
        email: "pedro.ferreira@email.com",
        telefone: "(11) 55555-5555",
        documento: "321.654.987-00"
      },
      servico: {
        tipo: "Streaming TV",
        plano: "Canais Premium",
        valor: 39.90
      },
      dataVencimento: "2024-12-28",
      dataEmissao: "2024-11-28",
      valor: 39.90,
      valorPago: 0,
      status: "pendente",
      tentativasCobranca: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "vencido":
        return "bg-red-100 text-red-800";
      case "parcial":
        return "bg-blue-100 text-blue-800";
      case "cancelado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="h-4 w-4" />;
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "vencido":
        return <AlertTriangle className="h-4 w-4" />;
      case "parcial":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getServicoIcon = (tipo: string) => {
    switch (tipo) {
      case "Internet Fibra":
        return <Wifi className="h-4 w-4" />;
      case "Multiserviços":
        return <Home className="h-4 w-4" />;
      case "Telemedicina":
        return <Heart className="h-4 w-4" />;
      case "Casa Conectada":
        return <Home className="h-4 w-4" />;
      case "Streaming TV":
        return <Tv className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const filteredContas = contas.filter(conta => {
    const matchesSearch = conta.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conta.numeroFatura.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || conta.status === statusFilter;
    const matchesServico = servicoFilter === "todos" || conta.servico.tipo === servicoFilter;
    
    return matchesSearch && matchesStatus && matchesServico;
  });

  const totalPendente = contas
    .filter(c => c.status === "pendente" || c.status === "vencido" || c.status === "parcial")
    .reduce((sum, c) => sum + (c.valor - c.valorPago), 0);

  const totalRecebido = contas
    .filter(c => c.status === "pago")
    .reduce((sum, c) => sum + c.valor, 0);

  const contasVencidas = contas.filter(c => c.status === "vencido").length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContas(filteredContas.map(c => c.id));
    } else {
      setSelectedContas([]);
    }
  };

  const handleSelectConta = (contaId: string, checked: boolean) => {
    if (checked) {
      setSelectedContas([...selectedContas, contaId]);
    } else {
      setSelectedContas(selectedContas.filter(id => id !== contaId));
    }
  };

  const handleEnviarCobranca = (contaId: string) => {
    toast({
      title: "Cobrança enviada",
      description: "E-mail de cobrança enviado com sucesso.",
    });
  };

  const handleMarcarPago = (contaId: string) => {
    toast({
      title: "Pagamento registrado",
      description: "Conta marcada como paga com sucesso.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contas a Receber</h1>
            <p className="text-muted-foreground">
              Gestão de faturas e cobranças de clientes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Fatura
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {contas.filter(c => c.status !== "pago" && c.status !== "cancelado").length} faturas pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recebido no Mês</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {contas.filter(c => c.status === "pago").length} faturas pagas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contas Vencidas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{contasVencidas}</div>
              <p className="text-xs text-muted-foreground">
                Requer atenção imediata
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <p className="text-xs text-muted-foreground">
                Abaixo da média do setor
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Faturas</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente ou fatura..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                    <SelectItem value="parcial">Parcial</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={servicoFilter} onValueChange={setServicoFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Serviços</SelectItem>
                    <SelectItem value="Internet Fibra">Internet Fibra</SelectItem>
                    <SelectItem value="Multiserviços">Multiserviços</SelectItem>
                    <SelectItem value="Telemedicina">Telemedicina</SelectItem>
                    <SelectItem value="Casa Conectada">Casa Conectada</SelectItem>
                    <SelectItem value="Streaming TV">Streaming TV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedContas.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedContas.length} fatura(s) selecionada(s)
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Cobrança
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedContas.length === filteredContas.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Fatura</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContas.map((conta) => (
                  <TableRow key={conta.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedContas.includes(conta.id)}
                        onCheckedChange={(checked) => handleSelectConta(conta.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{conta.numeroFatura}</p>
                        <p className="text-sm text-muted-foreground">
                          Emitida em {conta.dataEmissao}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{conta.cliente.nome}</p>
                        <p className="text-sm text-muted-foreground">{conta.cliente.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getServicoIcon(conta.servico.tipo)}
                        <div>
                          <p className="font-medium">{conta.servico.tipo}</p>
                          <p className="text-sm text-muted-foreground">{conta.servico.plano}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{conta.dataVencimento}</p>
                        {conta.status === "vencido" && (
                          <p className="text-sm text-red-600">
                            {conta.tentativasCobranca} tentativas
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        {conta.valorPago > 0 && (
                          <p className="text-sm text-green-600">
                            Pago: R$ {conta.valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(conta.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(conta.status)}
                          <span className="capitalize">{conta.status}</span>
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
                          <DropdownMenuItem onClick={() => {
                            setSelectedConta(conta);
                            setIsViewDialogOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEnviarCobranca(conta.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Cobrança
                          </DropdownMenuItem>
                          {conta.status !== "pago" && (
                            <DropdownMenuItem onClick={() => handleMarcarPago(conta.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marcar como Pago
                            </DropdownMenuItem>
                          )}
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

        {/* Dialog de Visualização */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes da Fatura</DialogTitle>
            </DialogHeader>
            {selectedConta && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Número da Fatura</Label>
                    <p className="text-sm">{selectedConta.numeroFatura}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge className={getStatusColor(selectedConta.status)}>
                      {selectedConta.status}
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Dados do Cliente</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Nome</Label>
                      <p className="text-sm">{selectedConta.cliente.nome}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">E-mail</Label>
                      <p className="text-sm">{selectedConta.cliente.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Telefone</Label>
                      <p className="text-sm">{selectedConta.cliente.telefone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Documento</Label>
                      <p className="text-sm">{selectedConta.cliente.documento}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Serviço</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Tipo</Label>
                      <p className="text-sm">{selectedConta.servico.tipo}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Plano</Label>
                      <p className="text-sm">{selectedConta.servico.plano}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Informações Financeiras</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Valor Total</Label>
                      <p className="text-sm font-bold">
                        R$ {selectedConta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Valor Pago</Label>
                      <p className="text-sm">
                        R$ {selectedConta.valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Data de Emissão</Label>
                      <p className="text-sm">{selectedConta.dataEmissao}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Data de Vencimento</Label>
                      <p className="text-sm">{selectedConta.dataVencimento}</p>
                    </div>
                  </div>
                </div>

                {selectedConta.observacoes && (
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium">Observações</Label>
                    <p className="text-sm">{selectedConta.observacoes}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fechar
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Gerar PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default ContasReceber;