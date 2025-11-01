import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Building,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  User,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Send,
  ArrowRight,
  Star,
  MessageSquare,
  Activity,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

interface Lead {
  id: string;
  nome: string;
  empresa: string;
  cargo: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  origem: "Website" | "Google Ads" | "Facebook" | "Indicação" | "Evento" | "Cold Call" | "LinkedIn";
  status: "Novo" | "Qualificado" | "Proposta" | "Negociação" | "Fechado" | "Perdido";
  valor: number;
  probabilidade: number;
  vendedor: string;
  dataContato: string;
  proximoFollowUp: string;
  observacoes: string;
  tags: string[];
  interacoes: Interacao[];
  criadoEm: string;
  atualizadoEm: string;
}

interface Interacao {
  id: string;
  tipo: "Ligação" | "Email" | "Reunião" | "WhatsApp" | "Proposta" | "Contrato";
  descricao: string;
  data: string;
  usuario: string;
  resultado: "Positivo" | "Neutro" | "Negativo";
}

interface Oportunidade {
  id: string;
  titulo: string;
  lead: string;
  valor: number;
  probabilidade: number;
  etapa: "Prospecção" | "Qualificação" | "Proposta" | "Negociação" | "Fechamento";
  vendedor: string;
  dataInicio: string;
  dataPrevisao: string;
  produto: string;
  observacoes: string;
  status: "Ativa" | "Ganha" | "Perdida" | "Pausada";
}

interface Atividade {
  id: string;
  tipo: "Ligação" | "Email" | "Reunião" | "Follow-up" | "Proposta" | "Demonstração";
  titulo: string;
  descricao: string;
  leadId: string;
  vendedor: string;
  dataAgendada: string;
  status: "Pendente" | "Concluída" | "Cancelada";
  prioridade: "Alta" | "Média" | "Baixa";
}

const CRM = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedVendedor, setSelectedVendedor] = useState("todos");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Mock data para leads
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      nome: "João Silva",
      empresa: "Tech Solutions LTDA",
      cargo: "Diretor de TI",
      telefone: "(11) 99999-9999",
      email: "joao.silva@techsolutions.com",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      estado: "SP",
      origem: "Website",
      status: "Qualificado",
      valor: 15000,
      probabilidade: 75,
      vendedor: "Maria Vendas",
      dataContato: "2024-01-15",
      proximoFollowUp: "2024-01-17",
      observacoes: "Cliente interessado em solução completa de ERP. Tem orçamento aprovado.",
      tags: ["ERP", "Urgente", "Orçamento Alto"],
      interacoes: [
        {
          id: "1",
          tipo: "Ligação",
          descricao: "Primeira ligação de qualificação. Cliente demonstrou interesse.",
          data: "2024-01-15",
          usuario: "Maria Vendas",
          resultado: "Positivo"
        }
      ],
      criadoEm: "2024-01-15",
      atualizadoEm: "2024-01-15"
    },
    {
      id: "2",
      nome: "Ana Costa",
      empresa: "Inovação Digital",
      cargo: "CEO",
      telefone: "(11) 88888-8888",
      email: "ana.costa@inovacao.com",
      endereco: "Av. Paulista, 1000",
      cidade: "São Paulo",
      estado: "SP",
      origem: "Indicação",
      status: "Proposta",
      valor: 25000,
      probabilidade: 85,
      vendedor: "Carlos Comercial",
      dataContato: "2024-01-14",
      proximoFollowUp: "2024-01-16",
      observacoes: "Proposta enviada. Aguardando retorno da diretoria.",
      tags: ["CRM", "Proposta Enviada"],
      interacoes: [
        {
          id: "2",
          tipo: "Reunião",
          descricao: "Reunião de apresentação da solução. Muito interesse demonstrado.",
          data: "2024-01-14",
          usuario: "Carlos Comercial",
          resultado: "Positivo"
        },
        {
          id: "3",
          tipo: "Proposta",
          descricao: "Proposta comercial enviada por email.",
          data: "2024-01-14",
          usuario: "Carlos Comercial",
          resultado: "Positivo"
        }
      ],
      criadoEm: "2024-01-14",
      atualizadoEm: "2024-01-14"
    },
    {
      id: "3",
      nome: "Pedro Santos",
      empresa: "Digital Corp",
      cargo: "Gerente de Operações",
      telefone: "(11) 77777-7777",
      email: "pedro.santos@digitalcorp.com",
      endereco: "Rua do Comércio, 456",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      origem: "Google Ads",
      status: "Negociação",
      valor: 35000,
      probabilidade: 90,
      vendedor: "Ana Vendas",
      dataContato: "2024-01-13",
      proximoFollowUp: "2024-01-15",
      observacoes: "Em negociação final. Discutindo condições de pagamento.",
      tags: ["Negociação", "Alto Valor"],
      interacoes: [
        {
          id: "4",
          tipo: "Email",
          descricao: "Envio de proposta ajustada conforme solicitação.",
          data: "2024-01-13",
          usuario: "Ana Vendas",
          resultado: "Positivo"
        }
      ],
      criadoEm: "2024-01-13",
      atualizadoEm: "2024-01-13"
    },
    {
      id: "4",
      nome: "Mariana Oliveira",
      empresa: "StartUp Inovadora",
      cargo: "Fundadora",
      telefone: "(11) 66666-6666",
      email: "mariana@startup.com",
      endereco: "Coworking Center, 789",
      cidade: "São Paulo",
      estado: "SP",
      origem: "LinkedIn",
      status: "Novo",
      valor: 8000,
      probabilidade: 30,
      vendedor: "Pedro Vendas",
      dataContato: "2024-01-16",
      proximoFollowUp: "2024-01-18",
      observacoes: "Primeiro contato. Startup em crescimento, potencial futuro.",
      tags: ["Startup", "Potencial"],
      interacoes: [],
      criadoEm: "2024-01-16",
      atualizadoEm: "2024-01-16"
    }
  ]);

  // Mock data para oportunidades
  const [oportunidades] = useState<Oportunidade[]>([
    {
      id: "1",
      titulo: "Implementação ERP Completo",
      lead: "João Silva",
      valor: 15000,
      probabilidade: 75,
      etapa: "Qualificação",
      vendedor: "Maria Vendas",
      dataInicio: "2024-01-15",
      dataPrevisao: "2024-02-15",
      produto: "ERP Premium",
      observacoes: "Cliente com necessidade urgente",
      status: "Ativa"
    },
    {
      id: "2",
      titulo: "Sistema CRM Personalizado",
      lead: "Ana Costa",
      valor: 25000,
      probabilidade: 85,
      etapa: "Proposta",
      vendedor: "Carlos Comercial",
      dataInicio: "2024-01-14",
      dataPrevisao: "2024-02-10",
      produto: "CRM Enterprise",
      observacoes: "Proposta em análise",
      status: "Ativa"
    }
  ]);

  // Mock data para atividades
  const [atividades] = useState<Atividade[]>([
    {
      id: "1",
      tipo: "Ligação",
      titulo: "Follow-up João Silva",
      descricao: "Ligar para verificar andamento da análise interna",
      leadId: "1",
      vendedor: "Maria Vendas",
      dataAgendada: "2024-01-17T10:00:00",
      status: "Pendente",
      prioridade: "Alta"
    },
    {
      id: "2",
      tipo: "Reunião",
      titulo: "Apresentação para Ana Costa",
      descricao: "Reunião para apresentar proposta ajustada",
      leadId: "2",
      vendedor: "Carlos Comercial",
      dataAgendada: "2024-01-16T14:00:00",
      status: "Pendente",
      prioridade: "Alta"
    },
    {
      id: "3",
      tipo: "Email",
      titulo: "Envio de contrato para Pedro",
      descricao: "Enviar contrato final para assinatura",
      leadId: "3",
      vendedor: "Ana Vendas",
      dataAgendada: "2024-01-15T09:00:00",
      status: "Pendente",
      prioridade: "Média"
    }
  ]);

  const vendedores = ["Maria Vendas", "Carlos Comercial", "Ana Vendas", "Pedro Vendas"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Novo": return "bg-blue-100 text-blue-800";
      case "Qualificado": return "bg-purple-100 text-purple-800";
      case "Proposta": return "bg-cyan-100 text-cyan-800";
      case "Negociação": return "bg-yellow-100 text-yellow-800";
      case "Fechado": return "bg-green-100 text-green-800";
      case "Perdido": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getOrigemColor = (origem: string) => {
    switch (origem) {
      case "Website": return "bg-blue-100 text-blue-800";
      case "Google Ads": return "bg-green-100 text-green-800";
      case "Facebook": return "bg-blue-100 text-blue-800";
      case "Indicação": return "bg-purple-100 text-purple-800";
      case "Evento": return "bg-orange-100 text-orange-800";
      case "Cold Call": return "bg-gray-100 text-gray-800";
      case "LinkedIn": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "todos" || lead.status === selectedStatus;
    const matchesVendedor = selectedVendedor === "todos" || lead.vendedor === selectedVendedor;
    
    return matchesSearch && matchesStatus && matchesVendedor;
  });

  const handleCreateLead = () => {
    toast.success("Lead criado com sucesso!");
    setShowCreateDialog(false);
  };

  const handleEditLead = () => {
    toast.success("Lead atualizado com sucesso!");
    setShowEditDialog(false);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    toast.success("Lead excluído com sucesso!");
  };

  const handleMoveToNextStage = (leadId: string) => {
    const statusOrder = ["Novo", "Qualificado", "Proposta", "Negociação", "Fechado"];
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        const currentIndex = statusOrder.indexOf(lead.status);
        if (currentIndex < statusOrder.length - 1) {
          return { ...lead, status: statusOrder[currentIndex + 1] as any };
        }
      }
      return lead;
    }));
    toast.success("Lead movido para próxima etapa!");
  };

  const handleAddInteraction = () => {
    toast.success("Interação adicionada com sucesso!");
    setShowActivityDialog(false);
  };

  // Estatísticas do pipeline
  const pipelineStats = {
    total: leads.length,
    novo: leads.filter(l => l.status === "Novo").length,
    qualificado: leads.filter(l => l.status === "Qualificado").length,
    proposta: leads.filter(l => l.status === "Proposta").length,
    negociacao: leads.filter(l => l.status === "Negociação").length,
    fechado: leads.filter(l => l.status === "Fechado").length,
    perdido: leads.filter(l => l.status === "Perdido").length,
    valorTotal: leads.reduce((sum, lead) => sum + lead.valor, 0),
    valorMedio: leads.length > 0 ? leads.reduce((sum, lead) => sum + lead.valor, 0) / leads.length : 0
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CRM - Pipeline de Vendas</h1>
            <p className="text-muted-foreground">
              Gerencie leads, oportunidades e acompanhe o funil de vendas
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Lead</DialogTitle>
                  <DialogDescription>
                    Adicione um novo lead ao pipeline de vendas
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" placeholder="Nome do contato" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input id="empresa" placeholder="Nome da empresa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" placeholder="Cargo do contato" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="origem">Origem</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Indicação">Indicação</SelectItem>
                        <SelectItem value="Evento">Evento</SelectItem>
                        <SelectItem value="Cold Call">Cold Call</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Estimado</Label>
                    <Input id="valor" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendedor">Vendedor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o vendedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendedores.map(vendedor => (
                          <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea id="observacoes" placeholder="Observações sobre o lead..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateLead}>Criar Lead</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPIs do Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pipelineStats.total}</div>
              <p className="text-xs text-muted-foreground">
                Valor total: R$ {pipelineStats.valorTotal.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualificados</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pipelineStats.qualificado}</div>
              <p className="text-xs text-muted-foreground">
                {((pipelineStats.qualificado / pipelineStats.total) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Negociação</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pipelineStats.negociacao}</div>
              <p className="text-xs text-muted-foreground">
                Próximos ao fechamento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fechados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pipelineStats.fechado}</div>
              <p className="text-xs text-muted-foreground">
                Taxa de conversão: {((pipelineStats.fechado / pipelineStats.total) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {pipelineStats.valorMedio.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Valor médio por lead
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
            <TabsTrigger value="atividades">Atividades</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            {/* Filtros */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Qualificado">Qualificado</SelectItem>
                      <SelectItem value="Proposta">Proposta</SelectItem>
                      <SelectItem value="Negociação">Negociação</SelectItem>
                      <SelectItem value="Fechado">Fechado</SelectItem>
                      <SelectItem value="Perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Vendedores</SelectItem>
                      {vendedores.map(vendedor => (
                        <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Leads */}
            <div className="grid gap-4">
              {filteredLeads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{lead.nome}</h3>
                          <p className="text-sm text-muted-foreground">{lead.empresa} • {lead.cargo}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                            <Badge variant="outline" className={getOrigemColor(lead.origem)}>
                              {lead.origem}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="font-semibold">R$ {lead.valor.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {lead.probabilidade}% probabilidade
                          </div>
                          <Progress value={lead.probabilidade} className="w-20 mt-1" />
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">{lead.vendedor}</div>
                          <div className="text-sm text-muted-foreground">
                            Próximo follow-up: {new Date(lead.proximoFollowUp).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowViewDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveToNextStage(lead.id)}
                            disabled={lead.status === "Fechado" || lead.status === "Perdido"}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowActivityDialog(true);
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.telefone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {lead.cidade}, {lead.estado}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Criado em {new Date(lead.criadoEm).toLocaleDateString()}
                      </div>
                    </div>

                    {lead.observacoes && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        {lead.observacoes}
                      </div>
                    )}

                    {lead.tags.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        {lead.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {["Novo", "Qualificado", "Proposta", "Negociação", "Fechado"].map((status) => {
                const statusLeads = leads.filter(lead => lead.status === status);
                const statusValue = statusLeads.reduce((sum, lead) => sum + lead.valor, 0);
                
                return (
                  <Card key={status}>
                    <CardHeader>
                      <CardTitle className="text-lg">{status}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {statusLeads.length} leads • R$ {statusValue.toLocaleString()}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {statusLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowViewDialog(true);
                          }}
                        >
                          <div className="font-medium text-sm">{lead.nome}</div>
                          <div className="text-xs text-muted-foreground">{lead.empresa}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm font-medium">R$ {lead.valor.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">{lead.probabilidade}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{lead.vendedor}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="oportunidades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oportunidades Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {oportunidades.map((oportunidade) => (
                    <div key={oportunidade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{oportunidade.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {oportunidade.lead} • {oportunidade.produto}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(oportunidade.etapa)}>
                            {oportunidade.etapa}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {oportunidade.vendedor}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">R$ {oportunidade.valor.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {oportunidade.probabilidade}% probabilidade
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Previsão: {new Date(oportunidade.dataPrevisao).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="atividades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Atividades Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atividades.map((atividade) => (
                    <div key={atividade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {atividade.tipo === "Ligação" && <Phone className="h-5 w-5 text-blue-600" />}
                          {atividade.tipo === "Email" && <Mail className="h-5 w-5 text-blue-600" />}
                          {atividade.tipo === "Reunião" && <Users className="h-5 w-5 text-blue-600" />}
                          {atividade.tipo === "Follow-up" && <Clock className="h-5 w-5 text-blue-600" />}
                          {atividade.tipo === "Proposta" && <FileText className="h-5 w-5 text-blue-600" />}
                          {atividade.tipo === "Demonstração" && <BarChart3 className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{atividade.titulo}</h3>
                          <p className="text-sm text-muted-foreground">{atividade.descricao}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{atividade.tipo}</Badge>
                            <Badge className={getPrioridadeColor(atividade.prioridade)}>
                              {atividade.prioridade}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{atividade.vendedor}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(atividade.dataAgendada).toLocaleDateString()} às{" "}
                          {new Date(atividade.dataAgendada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <Badge className={atividade.status === "Pendente" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                          {atividade.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog para visualizar lead */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Lead</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedLead.nome}</h3>
                    <p className="text-muted-foreground">{selectedLead.empresa} • {selectedLead.cargo}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {selectedLead.telefone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedLead.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedLead.endereco}, {selectedLead.cidade}, {selectedLead.estado}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedLead.status)}>
                        {selectedLead.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Origem:</span>
                      <Badge variant="outline">{selectedLead.origem}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor:</span>
                      <span className="font-medium">R$ {selectedLead.valor.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Probabilidade:</span>
                      <span className="font-medium">{selectedLead.probabilidade}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vendedor:</span>
                      <span className="font-medium">{selectedLead.vendedor}</span>
                    </div>
                  </div>

                  {selectedLead.observacoes && (
                    <div>
                      <h4 className="font-medium mb-2">Observações</h4>
                      <p className="text-sm text-muted-foreground p-2 bg-muted rounded">
                        {selectedLead.observacoes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Histórico de Interações</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedLead.interacoes.map((interacao) => (
                      <div key={interacao.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{interacao.tipo}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(interacao.data).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{interacao.descricao}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">{interacao.usuario}</span>
                          <Badge 
                            className={
                              interacao.resultado === "Positivo" ? "bg-green-100 text-green-800" :
                              interacao.resultado === "Negativo" ? "bg-red-100 text-red-800" :
                              "bg-gray-100 text-gray-800"
                            }
                          >
                            {interacao.resultado}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog para adicionar atividade/interação */}
        <Dialog open={showActivityDialog} onOpenChange={setShowActivityDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Interação</DialogTitle>
              <DialogDescription>
                Registre uma nova interação com o lead
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Interação</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ligação">Ligação</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Reunião">Reunião</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Proposta">Proposta</SelectItem>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" placeholder="Descreva a interação..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resultado">Resultado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o resultado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Positivo">Positivo</SelectItem>
                    <SelectItem value="Neutro">Neutro</SelectItem>
                    <SelectItem value="Negativo">Negativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowActivityDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddInteraction}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default CRM;