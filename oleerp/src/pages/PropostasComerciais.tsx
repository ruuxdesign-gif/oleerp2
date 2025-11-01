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
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Proposta {
  id: string;
  numero: string;
  cliente: string;
  clienteEmail: string;
  clienteTelefone: string;
  plano: string;
  valorMensal: number;
  valorInstalacao: number;
  desconto: number;
  valorTotal: number;
  dataEnvio: string;
  dataVencimento: string;
  status: "Rascunho" | "Enviada" | "Aceita" | "Recusada" | "Vencida" | "Em Negociação";
  observacoes: string;
  responsavel: string;
  condicoesPagamento: string;
  prazoInstalacao: string;
  garantia: string;
  equipamentos: string[];
  servicos: string[];
  clausulasEspeciais: string;
  motivoRecusa?: string;
}

const PropostasComerciais = () => {
  const [propostas, setPropostas] = useState<Proposta[]>([
    {
      id: "1",
      numero: "PROP-2024-001",
      cliente: "João Silva Santos",
      clienteEmail: "joao.silva@email.com",
      clienteTelefone: "(11) 99999-9999",
      plano: "Fibra 100MB",
      valorMensal: 89.90,
      valorInstalacao: 150.00,
      desconto: 10,
      valorTotal: 80.91,
      dataEnvio: "2024-01-15",
      dataVencimento: "2024-01-30",
      status: "Aceita",
      observacoes: "Cliente interessado em upgrade futuro",
      responsavel: "Maria Vendas",
      condicoesPagamento: "Boleto bancário - vencimento dia 10",
      prazoInstalacao: "Até 5 dias úteis após aprovação",
      garantia: "12 meses de garantia total",
      equipamentos: ["Roteador Wi-Fi 6", "Cabo de rede 10m"],
      servicos: ["Instalação", "Configuração Wi-Fi", "Suporte técnico"],
      clausulasEspeciais: "Desconto de 10% nos primeiros 6 meses"
    },
    {
      id: "2",
      numero: "PROP-2024-002",
      cliente: "Empresa Tech LTDA",
      clienteEmail: "contato@empresatech.com",
      clienteTelefone: "(11) 3333-4444",
      plano: "Corporativo 500MB",
      valorMensal: 299.90,
      valorInstalacao: 0,
      desconto: 15,
      valorTotal: 254.92,
      dataEnvio: "2024-01-20",
      dataVencimento: "2024-02-05",
      status: "Em Negociação",
      observacoes: "Negociando SLA personalizado",
      responsavel: "Carlos Comercial",
      condicoesPagamento: "PIX - desconto de 5% para pagamento à vista",
      prazoInstalacao: "Até 3 dias úteis após aprovação",
      garantia: "24 meses de garantia estendida",
      equipamentos: ["Switch gerenciado", "Roteador corporativo", "Firewall"],
      servicos: ["Instalação dedicada", "Configuração de rede", "Monitoramento 24h"],
      clausulasEspeciais: "SLA de 99.9% de disponibilidade com compensação"
    },
    {
      id: "3",
      numero: "PROP-2024-003",
      cliente: "Ana Costa Lima",
      clienteEmail: "ana.costa@email.com",
      clienteTelefone: "(11) 88888-7777",
      plano: "Fibra 50MB",
      valorMensal: 59.90,
      valorInstalacao: 100.00,
      desconto: 0,
      valorTotal: 59.90,
      dataEnvio: "2024-01-25",
      dataVencimento: "2024-02-10",
      status: "Recusada",
      observacoes: "Cliente optou por concorrente",
      responsavel: "Pedro Vendas",
      condicoesPagamento: "Cartão de crédito",
      prazoInstalacao: "Até 7 dias úteis após aprovação",
      garantia: "12 meses de garantia padrão",
      equipamentos: ["Roteador básico"],
      servicos: ["Instalação padrão"],
      clausulasEspeciais: "",
      motivoRecusa: "Preço mais alto que a concorrência"
    },
    {
      id: "4",
      numero: "PROP-2024-004",
      cliente: "Restaurante Bom Sabor",
      clienteEmail: "contato@bomsabor.com",
      clienteTelefone: "(11) 2222-3333",
      plano: "Fibra 200MB",
      valorMensal: 149.90,
      valorInstalacao: 120.00,
      desconto: 5,
      valorTotal: 142.41,
      dataEnvio: "2024-02-01",
      dataVencimento: "2024-02-15",
      status: "Enviada",
      observacoes: "Aguardando retorno do cliente",
      responsavel: "Ana Vendas",
      condicoesPagamento: "Boleto bancário",
      prazoInstalacao: "Até 5 dias úteis após aprovação",
      garantia: "12 meses de garantia padrão",
      equipamentos: ["Roteador Wi-Fi 6", "Repetidor Wi-Fi"],
      servicos: ["Instalação", "Configuração de rede para PDV"],
      clausulasEspeciais: "Suporte prioritário para estabelecimentos comerciais"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [responsavelFilter, setResponsavelFilter] = useState<string>("todos");
  const [selectedPropostas, setSelectedPropostas] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProposta, setSelectedProposta] = useState<Proposta | null>(null);
  const [newProposta, setNewProposta] = useState<Partial<Proposta>>({
    numero: "",
    cliente: "",
    clienteEmail: "",
    clienteTelefone: "",
    plano: "",
    valorMensal: 0,
    valorInstalacao: 0,
    desconto: 0,
    valorTotal: 0,
    dataEnvio: "",
    dataVencimento: "",
    status: "Rascunho",
    observacoes: "",
    responsavel: "",
    condicoesPagamento: "",
    prazoInstalacao: "",
    garantia: "",
    equipamentos: [],
    servicos: [],
    clausulasEspeciais: ""
  });

  const planos = ["Fibra 50MB", "Fibra 100MB", "Fibra 200MB", "Fibra 500MB", "Corporativo 500MB", "Corporativo 1GB"];
  const responsaveis = ["Maria Vendas", "Carlos Comercial", "Pedro Vendas", "Ana Vendas"];
  const equipamentosDisponiveis = ["Roteador básico", "Roteador Wi-Fi 6", "Switch gerenciado", "Firewall", "Repetidor Wi-Fi", "Cabo de rede 10m"];
  const servicosDisponiveis = ["Instalação padrão", "Instalação dedicada", "Configuração Wi-Fi", "Configuração de rede", "Suporte técnico", "Monitoramento 24h"];

  const filteredPropostas = propostas.filter(proposta => {
    const matchesSearch = proposta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposta.plano.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || proposta.status === statusFilter;
    const matchesResponsavel = responsavelFilter === "todos" || proposta.responsavel === responsavelFilter;
    return matchesSearch && matchesStatus && matchesResponsavel;
  });

  const handleSelectProposta = (propostaId: string) => {
    setSelectedPropostas(prev =>
      prev.includes(propostaId)
        ? prev.filter(id => id !== propostaId)
        : [...prev, propostaId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPropostas.length === filteredPropostas.length) {
      setSelectedPropostas([]);
    } else {
      setSelectedPropostas(filteredPropostas.map(proposta => proposta.id));
    }
  };

  const generateProposalNumber = () => {
    const year = new Date().getFullYear();
    const count = propostas.length + 1;
    return `PROP-${year}-${count.toString().padStart(3, '0')}`;
  };

  const calcularValorTotal = (valorMensal: number, desconto: number) => {
    return valorMensal - (valorMensal * desconto / 100);
  };

  const handleCreateProposta = () => {
    if (!newProposta.cliente || !newProposta.plano || !newProposta.valorMensal) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const valorTotal = calcularValorTotal(newProposta.valorMensal!, newProposta.desconto!);
    
    const proposta: Proposta = {
      id: Date.now().toString(),
      numero: generateProposalNumber(),
      valorTotal,
      ...newProposta as Proposta,
    };

    setPropostas(prev => [...prev, proposta]);
    setIsCreateDialogOpen(false);
    setNewProposta({
      numero: "",
      cliente: "",
      clienteEmail: "",
      clienteTelefone: "",
      plano: "",
      valorMensal: 0,
      valorInstalacao: 0,
      desconto: 0,
      valorTotal: 0,
      dataEnvio: "",
      dataVencimento: "",
      status: "Rascunho",
      observacoes: "",
      responsavel: "",
      condicoesPagamento: "",
      prazoInstalacao: "",
      garantia: "",
      equipamentos: [],
      servicos: [],
      clausulasEspeciais: ""
    });

    toast({
      title: "Sucesso",
      description: "Proposta criada com sucesso!",
    });
  };

  const handleEditProposta = () => {
    if (!selectedProposta) return;

    const valorTotal = calcularValorTotal(selectedProposta.valorMensal, selectedProposta.desconto);
    const propostaAtualizada = { ...selectedProposta, valorTotal };

    setPropostas(prev =>
      prev.map(proposta =>
        proposta.id === selectedProposta.id ? propostaAtualizada : proposta
      )
    );
    setIsEditDialogOpen(false);
    setSelectedProposta(null);

    toast({
      title: "Sucesso",
      description: "Proposta atualizada com sucesso!",
    });
  };

  const handleDeleteProposta = (propostaId: string) => {
    setPropostas(prev => prev.filter(proposta => proposta.id !== propostaId));
    toast({
      title: "Sucesso",
      description: "Proposta removida com sucesso!",
    });
  };

  const handleEnviarProposta = (propostaId: string) => {
    setPropostas(prev =>
      prev.map(proposta =>
        proposta.id === propostaId
          ? { ...proposta, status: "Enviada" as const, dataEnvio: new Date().toISOString().split('T')[0] }
          : proposta
      )
    );
    toast({
      title: "Sucesso",
      description: "Proposta enviada com sucesso!",
    });
  };

  const handleAceitarProposta = (propostaId: string) => {
    setPropostas(prev =>
      prev.map(proposta =>
        proposta.id === propostaId
          ? { ...proposta, status: "Aceita" as const }
          : proposta
      )
    );
    toast({
      title: "Sucesso",
      description: "Proposta aceita!",
    });
  };

  const handleRecusarProposta = (propostaId: string, motivo: string) => {
    setPropostas(prev =>
      prev.map(proposta =>
        proposta.id === propostaId
          ? { ...proposta, status: "Recusada" as const, motivoRecusa: motivo }
          : proposta
      )
    );
    toast({
      title: "Proposta recusada",
      description: "Status atualizado com sucesso!",
    });
  };

  const handleDuplicarProposta = (proposta: Proposta) => {
    const novaProposta: Proposta = {
      ...proposta,
      id: Date.now().toString(),
      numero: generateProposalNumber(),
      status: "Rascunho",
      dataEnvio: "",
      dataVencimento: ""
    };
    
    setPropostas(prev => [...prev, novaProposta]);
    toast({
      title: "Sucesso",
      description: "Proposta duplicada com sucesso!",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Rascunho": return "bg-gray-100 text-gray-800";
      case "Enviada": return "bg-blue-100 text-blue-800";
      case "Aceita": return "bg-green-100 text-green-800";
      case "Recusada": return "bg-red-100 text-red-800";
      case "Vencida": return "bg-orange-100 text-orange-800";
      case "Em Negociação": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Rascunho": return <FileText className="h-4 w-4" />;
      case "Enviada": return <Send className="h-4 w-4" />;
      case "Aceita": return <CheckCircle className="h-4 w-4" />;
      case "Recusada": return <XCircle className="h-4 w-4" />;
      case "Vencida": return <AlertCircle className="h-4 w-4" />;
      case "Em Negociação": return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Propostas Comerciais</h1>
            <p className="text-muted-foreground">
              Gerencie propostas e negociações comerciais
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
                  Nova Proposta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nova Proposta Comercial</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cliente">Cliente *</Label>
                      <Input
                        id="cliente"
                        value={newProposta.cliente}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, cliente: e.target.value }))}
                        placeholder="Nome do cliente"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clienteEmail">Email do Cliente</Label>
                      <Input
                        id="clienteEmail"
                        type="email"
                        value={newProposta.clienteEmail}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, clienteEmail: e.target.value }))}
                        placeholder="email@cliente.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clienteTelefone">Telefone do Cliente</Label>
                      <Input
                        id="clienteTelefone"
                        value={newProposta.clienteTelefone}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, clienteTelefone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plano">Plano *</Label>
                      <Select
                        value={newProposta.plano}
                        onValueChange={(value) => setNewProposta(prev => ({ ...prev, plano: value }))}
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
                          value={newProposta.valorMensal}
                          onChange={(e) => {
                            const valor = parseFloat(e.target.value);
                            setNewProposta(prev => ({ 
                              ...prev, 
                              valorMensal: valor,
                              valorTotal: calcularValorTotal(valor, prev.desconto || 0)
                            }));
                          }}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorInstalacao">Valor Instalação</Label>
                        <Input
                          id="valorInstalacao"
                          type="number"
                          step="0.01"
                          value={newProposta.valorInstalacao}
                          onChange={(e) => setNewProposta(prev => ({ ...prev, valorInstalacao: parseFloat(e.target.value) }))}
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
                          value={newProposta.desconto}
                          onChange={(e) => {
                            const desconto = parseFloat(e.target.value);
                            setNewProposta(prev => ({ 
                              ...prev, 
                              desconto,
                              valorTotal: calcularValorTotal(prev.valorMensal || 0, desconto)
                            }));
                          }}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorTotal">Valor Final</Label>
                        <Input
                          id="valorTotal"
                          type="number"
                          step="0.01"
                          value={newProposta.valorTotal}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="dataEnvio">Data Envio</Label>
                        <Input
                          id="dataEnvio"
                          type="date"
                          value={newProposta.dataEnvio}
                          onChange={(e) => setNewProposta(prev => ({ ...prev, dataEnvio: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataVencimento">Data Vencimento</Label>
                        <Input
                          id="dataVencimento"
                          type="date"
                          value={newProposta.dataVencimento}
                          onChange={(e) => setNewProposta(prev => ({ ...prev, dataVencimento: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Select
                        value={newProposta.responsavel}
                        onValueChange={(value) => setNewProposta(prev => ({ ...prev, responsavel: value }))}
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
                      <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
                      <Input
                        id="condicoesPagamento"
                        value={newProposta.condicoesPagamento}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, condicoesPagamento: e.target.value }))}
                        placeholder="Ex: Boleto bancário - vencimento dia 10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prazoInstalacao">Prazo de Instalação</Label>
                      <Input
                        id="prazoInstalacao"
                        value={newProposta.prazoInstalacao}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, prazoInstalacao: e.target.value }))}
                        placeholder="Ex: Até 5 dias úteis"
                      />
                    </div>
                    <div>
                      <Label htmlFor="garantia">Garantia</Label>
                      <Input
                        id="garantia"
                        value={newProposta.garantia}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, garantia: e.target.value }))}
                        placeholder="Ex: 12 meses de garantia"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div>
                      <Label>Equipamentos Inclusos</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {equipamentosDisponiveis.map(equipamento => (
                          <div key={equipamento} className="flex items-center space-x-2">
                            <Checkbox
                              id={`equip-${equipamento}`}
                              checked={newProposta.equipamentos?.includes(equipamento)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewProposta(prev => ({
                                    ...prev,
                                    equipamentos: [...(prev.equipamentos || []), equipamento]
                                  }));
                                } else {
                                  setNewProposta(prev => ({
                                    ...prev,
                                    equipamentos: prev.equipamentos?.filter(e => e !== equipamento) || []
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={`equip-${equipamento}`} className="text-sm">{equipamento}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Serviços Inclusos</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {servicosDisponiveis.map(servico => (
                          <div key={servico} className="flex items-center space-x-2">
                            <Checkbox
                              id={`serv-${servico}`}
                              checked={newProposta.servicos?.includes(servico)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewProposta(prev => ({
                                    ...prev,
                                    servicos: [...(prev.servicos || []), servico]
                                  }));
                                } else {
                                  setNewProposta(prev => ({
                                    ...prev,
                                    servicos: prev.servicos?.filter(s => s !== servico) || []
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={`serv-${servico}`} className="text-sm">{servico}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="clausulasEspeciais">Cláusulas Especiais</Label>
                      <Textarea
                        id="clausulasEspeciais"
                        value={newProposta.clausulasEspeciais}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, clausulasEspeciais: e.target.value }))}
                        placeholder="Cláusulas especiais da proposta..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={newProposta.observacoes}
                        onChange={(e) => setNewProposta(prev => ({ ...prev, observacoes: e.target.value }))}
                        placeholder="Observações sobre a proposta..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateProposta}>
                    Criar Proposta
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
                  <SelectItem value="Rascunho">Rascunho</SelectItem>
                  <SelectItem value="Enviada">Enviada</SelectItem>
                  <SelectItem value="Aceita">Aceita</SelectItem>
                  <SelectItem value="Recusada">Recusada</SelectItem>
                  <SelectItem value="Vencida">Vencida</SelectItem>
                  <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                </SelectContent>
              </Select>
              <Select value={responsavelFilter} onValueChange={setResponsavelFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {responsaveis.map(responsavel => (
                    <SelectItem key={responsavel} value={responsavel}>{responsavel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ações em lote */}
        {selectedPropostas.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {selectedPropostas.length} proposta(s) selecionada(s)
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Selecionadas
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover Selecionadas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Propostas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Propostas ({filteredPropostas.length})
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedPropostas.length === filteredPropostas.length && filteredPropostas.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Selecionar todas</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPropostas.map((proposta) => (
                <div key={proposta.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={selectedPropostas.includes(proposta.id)}
                    onCheckedChange={() => handleSelectProposta(proposta.id)}
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <div className="font-medium">{proposta.numero}</div>
                      <div className="text-sm text-muted-foreground">{proposta.cliente}</div>
                      <div className="text-sm text-muted-foreground">{proposta.plano}</div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Valor:</span> R$ {proposta.valorTotal.toFixed(2)}/mês
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Instalação:</span> R$ {proposta.valorInstalacao.toFixed(2)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Desconto:</span> {proposta.desconto}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Enviada:</span> {proposta.dataEnvio ? new Date(proposta.dataEnvio).toLocaleDateString() : "-"}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Vencimento:</span> {proposta.dataVencimento ? new Date(proposta.dataVencimento).toLocaleDateString() : "-"}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Responsável:</span> {proposta.responsavel}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Email:</span> {proposta.clienteEmail}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Telefone:</span> {proposta.clienteTelefone}
                      </div>
                      {proposta.motivoRecusa && (
                        <div className="text-sm text-red-600">
                          <span className="font-medium">Motivo:</span> {proposta.motivoRecusa}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(proposta.status)}
                        <Badge className={getStatusColor(proposta.status)}>
                          {proposta.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProposta(proposta);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProposta(proposta);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicarProposta(proposta)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {proposta.status === "Rascunho" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEnviarProposta(proposta.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {proposta.status === "Enviada" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAceitarProposta(proposta.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRecusarProposta(proposta.id, "Recusada pelo cliente")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProposta(proposta.id)}
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da Proposta</DialogTitle>
            </DialogHeader>
            {selectedProposta && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número da Proposta</Label>
                    <p className="text-sm font-medium">{selectedProposta.numero}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedProposta.status)}
                      <Badge className={getStatusColor(selectedProposta.status)}>
                        {selectedProposta.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="text-sm">{selectedProposta.cliente}</p>
                  </div>
                  <div>
                    <Label>Plano</Label>
                    <p className="text-sm">{selectedProposta.plano}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Valor Mensal</Label>
                    <p className="text-sm font-medium">R$ {selectedProposta.valorMensal.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Desconto</Label>
                    <p className="text-sm">{selectedProposta.desconto}%</p>
                  </div>
                  <div>
                    <Label>Valor Final</Label>
                    <p className="text-sm font-medium">R$ {selectedProposta.valorTotal.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email do Cliente</Label>
                    <p className="text-sm">{selectedProposta.clienteEmail}</p>
                  </div>
                  <div>
                    <Label>Telefone do Cliente</Label>
                    <p className="text-sm">{selectedProposta.clienteTelefone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data de Envio</Label>
                    <p className="text-sm">{selectedProposta.dataEnvio ? new Date(selectedProposta.dataEnvio).toLocaleDateString() : "-"}</p>
                  </div>
                  <div>
                    <Label>Data de Vencimento</Label>
                    <p className="text-sm">{selectedProposta.dataVencimento ? new Date(selectedProposta.dataVencimento).toLocaleDateString() : "-"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Condições de Pagamento</Label>
                    <p className="text-sm">{selectedProposta.condicoesPagamento}</p>
                  </div>
                  <div>
                    <Label>Prazo de Instalação</Label>
                    <p className="text-sm">{selectedProposta.prazoInstalacao}</p>
                  </div>
                </div>

                <div>
                  <Label>Equipamentos Inclusos</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProposta.equipamentos.map(equipamento => (
                      <Badge key={equipamento} variant="outline">{equipamento}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Serviços Inclusos</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProposta.servicos.map(servico => (
                      <Badge key={servico} variant="outline">{servico}</Badge>
                    ))}
                  </div>
                </div>

                {selectedProposta.clausulasEspeciais && (
                  <div>
                    <Label>Cláusulas Especiais</Label>
                    <p className="text-sm">{selectedProposta.clausulasEspeciais}</p>
                  </div>
                )}

                {selectedProposta.observacoes && (
                  <div>
                    <Label>Observações</Label>
                    <p className="text-sm">{selectedProposta.observacoes}</p>
                  </div>
                )}

                {selectedProposta.motivoRecusa && (
                  <div>
                    <Label>Motivo da Recusa</Label>
                    <p className="text-sm text-red-600">{selectedProposta.motivoRecusa}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fechar
              </Button>
              <Button onClick={() => selectedProposta && handleDuplicarProposta(selectedProposta)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Proposta</DialogTitle>
            </DialogHeader>
            {selectedProposta && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={selectedProposta.status}
                      onValueChange={(value: "Rascunho" | "Enviada" | "Aceita" | "Recusada" | "Vencida" | "Em Negociação") => 
                        setSelectedProposta(prev => prev ? { ...prev, status: value } : null)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                        <SelectItem value="Enviada">Enviada</SelectItem>
                        <SelectItem value="Aceita">Aceita</SelectItem>
                        <SelectItem value="Recusada">Recusada</SelectItem>
                        <SelectItem value="Vencida">Vencida</SelectItem>
                        <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-valorMensal">Valor Mensal</Label>
                    <Input
                      id="edit-valorMensal"
                      type="number"
                      step="0.01"
                      value={selectedProposta.valorMensal}
                      onChange={(e) => {
                        const valor = parseFloat(e.target.value);
                        setSelectedProposta(prev => prev ? { 
                          ...prev, 
                          valorMensal: valor,
                          valorTotal: calcularValorTotal(valor, prev.desconto)
                        } : null);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-desconto">Desconto (%)</Label>
                    <Input
                      id="edit-desconto"
                      type="number"
                      step="0.01"
                      value={selectedProposta.desconto}
                      onChange={(e) => {
                        const desconto = parseFloat(e.target.value);
                        setSelectedProposta(prev => prev ? { 
                          ...prev, 
                          desconto,
                          valorTotal: calcularValorTotal(prev.valorMensal, desconto)
                        } : null);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-valorTotal">Valor Final</Label>
                    <Input
                      id="edit-valorTotal"
                      type="number"
                      step="0.01"
                      value={selectedProposta.valorTotal}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-dataVencimento">Data Vencimento</Label>
                    <Input
                      id="edit-dataVencimento"
                      type="date"
                      value={selectedProposta.dataVencimento}
                      onChange={(e) => setSelectedProposta(prev => prev ? { ...prev, dataVencimento: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-responsavel">Responsável</Label>
                    <Select
                      value={selectedProposta.responsavel}
                      onValueChange={(value) => setSelectedProposta(prev => prev ? { ...prev, responsavel: value } : null)}
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
                    <Label htmlFor="edit-condicoesPagamento">Condições de Pagamento</Label>
                    <Input
                      id="edit-condicoesPagamento"
                      value={selectedProposta.condicoesPagamento}
                      onChange={(e) => setSelectedProposta(prev => prev ? { ...prev, condicoesPagamento: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-prazoInstalacao">Prazo de Instalação</Label>
                    <Input
                      id="edit-prazoInstalacao"
                      value={selectedProposta.prazoInstalacao}
                      onChange={(e) => setSelectedProposta(prev => prev ? { ...prev, prazoInstalacao: e.target.value } : null)}
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="edit-observacoes">Observações</Label>
                    <Textarea
                      id="edit-observacoes"
                      value={selectedProposta.observacoes}
                      onChange={(e) => setSelectedProposta(prev => prev ? { ...prev, observacoes: e.target.value } : null)}
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
              <Button onClick={handleEditProposta}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default PropostasComerciais;