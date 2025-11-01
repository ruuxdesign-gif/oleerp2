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
  Wallet,
  Search,
  Filter,
  Download,
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
  Building,
  Zap,
  Truck,
  Wrench,
  Users,
  FileText,
  CreditCard,
  Banknote
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContaPagar {
  id: string;
  numeroDocumento: string;
  fornecedor: {
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
    categoria: string;
  };
  categoria: "Infraestrutura" | "Equipamentos" | "Servicos" | "Licencas" | "Operacional" | "Marketing" | "Pessoal";
  descricao: string;
  dataVencimento: string;
  dataEmissao: string;
  valor: number;
  valorPago: number;
  status: "pendente" | "pago" | "vencido" | "parcial" | "agendado";
  formaPagamento?: string;
  observacoes?: string;
  centroCusto: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
}

const ContasPagar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [selectedContas, setSelectedContas] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedConta, setSelectedConta] = useState<ContaPagar | null>(null);

  const [contas] = useState<ContaPagar[]>([
    {
      id: "1",
      numeroDocumento: "NF-2024-5678",
      fornecedor: {
        nome: "TechFiber Equipamentos Ltda",
        cnpj: "12.345.678/0001-90",
        email: "financeiro@techfiber.com.br",
        telefone: "(11) 3333-4444",
        categoria: "Equipamentos"
      },
      categoria: "Infraestrutura",
      descricao: "Cabos de fibra optica - 10km",
      dataVencimento: "2024-12-22",
      dataEmissao: "2024-12-01",
      valor: 25000.00,
      valorPago: 0,
      status: "pendente",
      centroCusto: "Infraestrutura de Rede",
      aprovadoPor: "Joao Gerente",
      dataAprovacao: "2024-12-02"
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
      case "agendado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "Infraestrutura":
        return <Building className="h-4 w-4" />;
      case "Equipamentos":
        return <Zap className="h-4 w-4" />;
      case "Servicos":
        return <Wrench className="h-4 w-4" />;
      case "Licencas":
        return <FileText className="h-4 w-4" />;
      case "Operacional":
        return <Truck className="h-4 w-4" />;
      case "Marketing":
        return <Users className="h-4 w-4" />;
      case "Pessoal":
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const totalPagar = contas.reduce((acc, conta) => acc + conta.valor, 0);
  const totalPago = contas.reduce((acc, conta) => acc + conta.valorPago, 0);
  const totalVencido = contas.filter(conta => conta.status === "vencido").reduce((acc, conta) => acc + conta.valor, 0);
  const totalAgendado = contas.filter(conta => conta.status === "agendado").reduce((acc, conta) => acc + conta.valor, 0);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContas(contas.map(conta => conta.id));
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

  const handleViewConta = (conta: ContaPagar) => {
    setSelectedConta(conta);
    setIsViewDialogOpen(true);
  };

  const handleProcessPayment = (contaId: string) => {
    toast({
      title: "Pagamento processado",
      description: "O pagamento foi processado com sucesso!",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contas a Pagar</h1>
            <p className="text-muted-foreground">
              Gerencie todas as contas e despesas da empresa
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Conta a Pagar</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numeroDocumento">Numero do Documento</Label>
                      <Input id="numeroDocumento" placeholder="Ex: NF-2024-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                          <SelectItem value="equipamentos">Equipamentos</SelectItem>
                          <SelectItem value="servicos">Servicos</SelectItem>
                          <SelectItem value="licencas">Licencas</SelectItem>
                          <SelectItem value="operacional">Operacional</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="pessoal">Pessoal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor">Fornecedor</Label>
                    <Input id="fornecedor" placeholder="Nome do fornecedor" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descricao</Label>
                    <Textarea id="descricao" placeholder="Descricao da conta" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor</Label>
                      <Input id="valor" type="number" placeholder="0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                      <Input id="dataVencimento" type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Criar Conta
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {totalPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {contas.length} contas em aberto
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Pagamentos realizados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contas Vencidas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                R$ {totalVencido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Requer atencao imediata
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                R$ {totalAgendado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Pagamentos programados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por fornecedor, documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                  <SelectItem value="parcial">Parcial</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Categorias</SelectItem>
                  <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                  <SelectItem value="equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="servicos">Servicos</SelectItem>
                  <SelectItem value="licencas">Licencas</SelectItem>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="pessoal">Pessoal</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contas a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedContas.length === contas.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Descricao</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contas.map((conta) => (
                  <TableRow key={conta.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedContas.includes(conta.id)}
                        onCheckedChange={(checked) => handleSelectConta(conta.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{conta.numeroDocumento}</TableCell>
                    <TableCell>{conta.fornecedor.nome}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoriaIcon(conta.categoria)}
                        {conta.categoria}
                      </div>
                    </TableCell>
                    <TableCell>{conta.descricao}</TableCell>
                    <TableCell>{new Date(conta.dataVencimento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(conta.status)}>
                        {conta.status}
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
                          <DropdownMenuItem onClick={() => handleViewConta(conta)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleProcessPayment(conta.id)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Processar Pagamento
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

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes da Conta</DialogTitle>
            </DialogHeader>
            {selectedConta && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Numero do Documento</Label>
                    <p className="text-sm text-muted-foreground">{selectedConta.numeroDocumento}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge className={getStatusColor(selectedConta.status)}>
                      {selectedConta.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fornecedor</Label>
                  <p className="text-sm text-muted-foreground">{selectedConta.fornecedor.nome}</p>
                  <p className="text-xs text-muted-foreground">{selectedConta.fornecedor.cnpj}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Descricao</Label>
                  <p className="text-sm text-muted-foreground">{selectedConta.descricao}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Valor</Label>
                    <p className="text-sm text-muted-foreground">
                      R$ {selectedConta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Data de Vencimento</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedConta.dataVencimento).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fechar
              </Button>
              <Button onClick={() => selectedConta && handleProcessPayment(selectedConta.id)}>
                <CreditCard className="mr-2 h-4 w-4" />
                Processar Pagamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default ContasPagar;