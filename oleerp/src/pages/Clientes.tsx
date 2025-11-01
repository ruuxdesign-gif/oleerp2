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
  Users,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  CreditCard,
  FileText,
  Download,
  Upload
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  tipoDocumento: "CPF" | "CNPJ";
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  status: "Ativo" | "Inativo" | "Bloqueado";
  plano: string;
  valorMensal: number;
  dataContrato: string;
  observacoes: string;
  responsavel: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "João Silva Santos",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-9999",
      documento: "123.456.789-00",
      tipoDocumento: "CPF",
      endereco: {
        rua: "Rua das Flores",
        numero: "123",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567"
      },
      status: "Ativo",
      plano: "Fibra 100MB",
      valorMensal: 89.90,
      dataContrato: "2024-01-15",
      observacoes: "Cliente pontual, sem histórico de problemas",
      responsavel: "Maria Vendas"
    },
    {
      id: "2",
      nome: "Empresa Tech LTDA",
      email: "contato@empresatech.com",
      telefone: "(11) 3333-4444",
      documento: "12.345.678/0001-90",
      tipoDocumento: "CNPJ",
      endereco: {
        rua: "Av. Paulista",
        numero: "1000",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-100"
      },
      status: "Ativo",
      plano: "Corporativo 500MB",
      valorMensal: 299.90,
      dataContrato: "2023-12-10",
      observacoes: "Cliente corporativo, contrato anual",
      responsavel: "Carlos Comercial"
    },
    {
      id: "3",
      nome: "Ana Costa Lima",
      email: "ana.costa@email.com",
      telefone: "(11) 88888-7777",
      documento: "987.654.321-00",
      tipoDocumento: "CPF",
      endereco: {
        rua: "Rua dos Jardins",
        numero: "456",
        bairro: "Jardins",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-890"
      },
      status: "Inativo",
      plano: "Fibra 50MB",
      valorMensal: 59.90,
      dataContrato: "2023-08-20",
      observacoes: "Cancelou por mudança de endereço",
      responsavel: "Pedro Vendas"
    },
    {
      id: "4",
      nome: "Restaurante Bom Sabor",
      email: "contato@bomsabor.com",
      telefone: "(11) 2222-3333",
      documento: "98.765.432/0001-10",
      tipoDocumento: "CNPJ",
      endereco: {
        rua: "Rua da Comida",
        numero: "789",
        bairro: "Vila Madalena",
        cidade: "São Paulo",
        estado: "SP",
        cep: "05432-100"
      },
      status: "Bloqueado",
      plano: "Fibra 200MB",
      valorMensal: 149.90,
      dataContrato: "2024-02-01",
      observacoes: "Bloqueado por inadimplência",
      responsavel: "Ana Cobrança"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [planoFilter, setPlanoFilter] = useState<string>("todos");
  const [selectedClientes, setSelectedClientes] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [newCliente, setNewCliente] = useState<Partial<Cliente>>({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    tipoDocumento: "CPF",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: ""
    },
    status: "Ativo",
    plano: "",
    valorMensal: 0,
    dataContrato: "",
    observacoes: "",
    responsavel: ""
  });

  const planos = ["Fibra 50MB", "Fibra 100MB", "Fibra 200MB", "Fibra 500MB", "Corporativo 500MB", "Corporativo 1GB"];
  const responsaveis = ["Maria Vendas", "Carlos Comercial", "Pedro Vendas", "Ana Cobrança"];

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.documento.includes(searchTerm);
    const matchesStatus = statusFilter === "todos" || cliente.status === statusFilter;
    const matchesPlano = planoFilter === "todos" || cliente.plano === planoFilter;
    return matchesSearch && matchesStatus && matchesPlano;
  });

  const handleSelectCliente = (clienteId: string) => {
    setSelectedClientes(prev =>
      prev.includes(clienteId)
        ? prev.filter(id => id !== clienteId)
        : [...prev, clienteId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClientes.length === filteredClientes.length) {
      setSelectedClientes([]);
    } else {
      setSelectedClientes(filteredClientes.map(cliente => cliente.id));
    }
  };

  const handleCreateCliente = () => {
    if (!newCliente.nome || !newCliente.email || !newCliente.documento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const cliente: Cliente = {
      id: Date.now().toString(),
      ...newCliente as Cliente,
    };

    setClientes(prev => [...prev, cliente]);
    setIsCreateDialogOpen(false);
    setNewCliente({
      nome: "",
      email: "",
      telefone: "",
      documento: "",
      tipoDocumento: "CPF",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: ""
      },
      status: "Ativo",
      plano: "",
      valorMensal: 0,
      dataContrato: "",
      observacoes: "",
      responsavel: ""
    });

    toast({
      title: "Sucesso",
      description: "Cliente criado com sucesso!",
    });
  };

  const handleEditCliente = () => {
    if (!selectedCliente) return;

    setClientes(prev =>
      prev.map(cliente =>
        cliente.id === selectedCliente.id ? selectedCliente : cliente
      )
    );
    setIsEditDialogOpen(false);
    setSelectedCliente(null);

    toast({
      title: "Sucesso",
      description: "Cliente atualizado com sucesso!",
    });
  };

  const handleDeleteCliente = (clienteId: string) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== clienteId));
    toast({
      title: "Sucesso",
      description: "Cliente removido com sucesso!",
    });
  };

  const handleBulkDelete = () => {
    setClientes(prev => prev.filter(cliente => !selectedClientes.includes(cliente.id)));
    setSelectedClientes([]);
    toast({
      title: "Sucesso",
      description: `${selectedClientes.length} cliente(s) removido(s) com sucesso!`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Inativo": return "bg-gray-100 text-gray-800";
      case "Bloqueado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie todos os clientes do seu provedor
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
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Novo Cliente</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome *</Label>
                      <Input
                        id="nome"
                        value={newCliente.nome}
                        onChange={(e) => setNewCliente(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Nome completo ou razão social"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newCliente.email}
                        onChange={(e) => setNewCliente(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={newCliente.telefone}
                        onChange={(e) => setNewCliente(prev => ({ ...prev, telefone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="tipoDocumento">Tipo</Label>
                        <Select
                          value={newCliente.tipoDocumento}
                          onValueChange={(value: "CPF" | "CNPJ") => 
                            setNewCliente(prev => ({ ...prev, tipoDocumento: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CPF">CPF</SelectItem>
                            <SelectItem value="CNPJ">CNPJ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="documento">Documento *</Label>
                        <Input
                          id="documento"
                          value={newCliente.documento}
                          onChange={(e) => setNewCliente(prev => ({ ...prev, documento: e.target.value }))}
                          placeholder={newCliente.tipoDocumento === "CPF" ? "000.000.000-00" : "00.000.000/0001-00"}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="rua">Rua</Label>
                        <Input
                          id="rua"
                          value={newCliente.endereco?.rua}
                          onChange={(e) => setNewCliente(prev => ({ 
                            ...prev, 
                            endereco: { ...prev.endereco!, rua: e.target.value }
                          }))}
                          placeholder="Nome da rua"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numero">Número</Label>
                        <Input
                          id="numero"
                          value={newCliente.endereco?.numero}
                          onChange={(e) => setNewCliente(prev => ({ 
                            ...prev, 
                            endereco: { ...prev.endereco!, numero: e.target.value }
                          }))}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        id="bairro"
                        value={newCliente.endereco?.bairro}
                        onChange={(e) => setNewCliente(prev => ({ 
                          ...prev, 
                          endereco: { ...prev.endereco!, bairro: e.target.value }
                        }))}
                        placeholder="Nome do bairro"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          value={newCliente.endereco?.cidade}
                          onChange={(e) => setNewCliente(prev => ({ 
                            ...prev, 
                            endereco: { ...prev.endereco!, cidade: e.target.value }
                          }))}
                          placeholder="Nome da cidade"
                        />
                      </div>
                      <div>
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          value={newCliente.endereco?.estado}
                          onChange={(e) => setNewCliente(prev => ({ 
                            ...prev, 
                            endereco: { ...prev.endereco!, estado: e.target.value }
                          }))}
                          placeholder="SP"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={newCliente.endereco?.cep}
                        onChange={(e) => setNewCliente(prev => ({ 
                          ...prev, 
                          endereco: { ...prev.endereco!, cep: e.target.value }
                        }))}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="plano">Plano</Label>
                        <Select
                          value={newCliente.plano}
                          onValueChange={(value) => setNewCliente(prev => ({ ...prev, plano: value }))}
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
                      <div>
                        <Label htmlFor="valorMensal">Valor Mensal</Label>
                        <Input
                          id="valorMensal"
                          type="number"
                          step="0.01"
                          value={newCliente.valorMensal}
                          onChange={(e) => setNewCliente(prev => ({ ...prev, valorMensal: parseFloat(e.target.value) }))}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataContrato">Data do Contrato</Label>
                        <Input
                          id="dataContrato"
                          type="date"
                          value={newCliente.dataContrato}
                          onChange={(e) => setNewCliente(prev => ({ ...prev, dataContrato: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Select
                        value={newCliente.responsavel}
                        onValueChange={(value) => setNewCliente(prev => ({ ...prev, responsavel: value }))}
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
                    <div>
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={newCliente.observacoes}
                        onChange={(e) => setNewCliente(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Observações sobre o cliente..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateCliente}>
                    Criar Cliente
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
                    placeholder="Buscar por nome, email ou documento..."
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
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planoFilter} onValueChange={setPlanoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Planos</SelectItem>
                  {planos.map(plano => (
                    <SelectItem key={plano} value={plano}>{plano}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ações em lote */}
        {selectedClientes.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {selectedClientes.length} cliente(s) selecionado(s)
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover Selecionados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Clientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Clientes ({filteredClientes.length})
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedClientes.length === filteredClientes.length && filteredClientes.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Selecionar todos</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClientes.map((cliente) => (
                <div key={cliente.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={selectedClientes.includes(cliente.id)}
                    onCheckedChange={() => handleSelectCliente(cliente.id)}
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-medium">{cliente.nome}</div>
                      <div className="text-sm text-muted-foreground">{cliente.email}</div>
                      <div className="text-sm text-muted-foreground">{cliente.telefone}</div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Doc:</span> {cliente.documento}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Plano:</span> {cliente.plano}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Valor:</span> R$ {cliente.valorMensal.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">
                        {cliente.endereco.cidade}, {cliente.endereco.estado}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Contrato: {new Date(cliente.dataContrato).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Resp: {cliente.responsavel}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(cliente.status)}>
                        {cliente.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCliente(cliente);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCliente(cliente);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCliente(cliente.id)}
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Cliente</DialogTitle>
            </DialogHeader>
            {selectedCliente && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome</Label>
                    <p className="text-sm">{selectedCliente.nome}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedCliente.status)}>
                      {selectedCliente.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm">{selectedCliente.email}</p>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <p className="text-sm">{selectedCliente.telefone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Documento</Label>
                    <p className="text-sm">{selectedCliente.documento}</p>
                  </div>
                  <div>
                    <Label>Plano</Label>
                    <p className="text-sm">{selectedCliente.plano}</p>
                  </div>
                </div>
                <div>
                  <Label>Endereço</Label>
                  <p className="text-sm">
                    {selectedCliente.endereco.rua}, {selectedCliente.endereco.numero} - {selectedCliente.endereco.bairro}<br />
                    {selectedCliente.endereco.cidade}, {selectedCliente.endereco.estado} - {selectedCliente.endereco.cep}
                  </p>
                </div>
                <div>
                  <Label>Observações</Label>
                  <p className="text-sm">{selectedCliente.observacoes}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            {selectedCliente && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-nome">Nome</Label>
                    <Input
                      id="edit-nome"
                      value={selectedCliente.nome}
                      onChange={(e) => setSelectedCliente(prev => prev ? { ...prev, nome: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={selectedCliente.email}
                      onChange={(e) => setSelectedCliente(prev => prev ? { ...prev, email: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-telefone">Telefone</Label>
                    <Input
                      id="edit-telefone"
                      value={selectedCliente.telefone}
                      onChange={(e) => setSelectedCliente(prev => prev ? { ...prev, telefone: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={selectedCliente.status}
                      onValueChange={(value: "Ativo" | "Inativo" | "Bloqueado") => 
                        setSelectedCliente(prev => prev ? { ...prev, status: value } : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                        <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-plano">Plano</Label>
                    <Select
                      value={selectedCliente.plano}
                      onValueChange={(value) => setSelectedCliente(prev => prev ? { ...prev, plano: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {planos.map(plano => (
                          <SelectItem key={plano} value={plano}>{plano}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-valorMensal">Valor Mensal</Label>
                    <Input
                      id="edit-valorMensal"
                      type="number"
                      step="0.01"
                      value={selectedCliente.valorMensal}
                      onChange={(e) => setSelectedCliente(prev => prev ? { ...prev, valorMensal: parseFloat(e.target.value) } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-responsavel">Responsável</Label>
                    <Select
                      value={selectedCliente.responsavel}
                      onValueChange={(value) => setSelectedCliente(prev => prev ? { ...prev, responsavel: value } : null)}
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
                  <div>
                    <Label htmlFor="edit-observacoes">Observações</Label>
                    <Textarea
                      id="edit-observacoes"
                      value={selectedCliente.observacoes}
                      onChange={(e) => setSelectedCliente(prev => prev ? { ...prev, observacoes: e.target.value } : null)}
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
              <Button onClick={handleEditCliente}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Clientes;