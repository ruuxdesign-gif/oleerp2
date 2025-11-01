import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  Bell,
  BellRing,
  BellOff,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Search,
  Filter,
  Check,
  Trash2,
  Archive,
  Star,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  RefreshCw,
  Volume2,
  VolumeX
} from "lucide-react";
import { toast } from "sonner";

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: "Sistema" | "Vendas" | "Estoque" | "Financeiro" | "Usuário" | "Segurança";
  prioridade: "Alta" | "Média" | "Baixa";
  status: "Não Lida" | "Lida" | "Arquivada";
  dataHora: string;
  remetente: string;
  acao?: string;
  link?: string;
  favorita: boolean;
}

interface ConfiguracaoNotificacao {
  tipo: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  som: boolean;
  descricao: string;
}

const Notificacoes = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: "1",
      titulo: "Novo pedido recebido",
      mensagem: "Pedido #1234 foi criado pelo cliente Empresa ABC Ltda no valor de R$ 5.500,00",
      tipo: "Vendas",
      prioridade: "Alta",
      status: "Não Lida",
      dataHora: "15/01/2024 14:30",
      remetente: "Sistema de Vendas",
      acao: "Ver Pedido",
      link: "/pedidos/1234",
      favorita: false
    },
    {
      id: "2",
      titulo: "Estoque baixo",
      mensagem: "O produto 'Notebook Dell Inspiron' está com estoque baixo (apenas 2 unidades)",
      tipo: "Estoque",
      prioridade: "Média",
      status: "Não Lida",
      dataHora: "15/01/2024 13:15",
      remetente: "Sistema de Estoque",
      acao: "Reabastecer",
      link: "/produtos/5678",
      favorita: true
    },
    {
      id: "3",
      titulo: "Pagamento recebido",
      mensagem: "Pagamento de R$ 2.300,00 foi confirmado para a fatura #9876",
      tipo: "Financeiro",
      prioridade: "Média",
      status: "Lida",
      dataHora: "15/01/2024 11:45",
      remetente: "Sistema Financeiro",
      acao: "Ver Fatura",
      link: "/financeiro/9876",
      favorita: false
    },
    {
      id: "4",
      titulo: "Backup concluído",
      mensagem: "Backup automático do banco de dados foi executado com sucesso",
      tipo: "Sistema",
      prioridade: "Baixa",
      status: "Lida",
      dataHora: "15/01/2024 02:00",
      remetente: "Sistema",
      favorita: false
    },
    {
      id: "5",
      titulo: "Tentativa de login suspeita",
      mensagem: "Detectada tentativa de login de localização não usual: São Paulo, SP",
      tipo: "Segurança",
      prioridade: "Alta",
      status: "Arquivada",
      dataHora: "14/01/2024 22:15",
      remetente: "Sistema de Segurança",
      acao: "Verificar",
      link: "/seguranca/logs",
      favorita: false
    }
  ]);

  const [configuracoes, setConfiguracoes] = useState<ConfiguracaoNotificacao[]>([
    {
      tipo: "Vendas",
      email: true,
      push: true,
      sms: false,
      som: true,
      descricao: "Novos pedidos, alterações de status, cancelamentos"
    },
    {
      tipo: "Estoque",
      email: true,
      push: true,
      sms: false,
      som: false,
      descricao: "Estoque baixo, produtos esgotados, reabastecimento"
    },
    {
      tipo: "Financeiro",
      email: true,
      push: false,
      sms: true,
      som: false,
      descricao: "Pagamentos recebidos, faturas vencidas, relatórios"
    },
    {
      tipo: "Sistema",
      email: false,
      push: true,
      sms: false,
      som: false,
      descricao: "Atualizações, manutenção, backups, erros"
    },
    {
      tipo: "Usuário",
      email: true,
      push: true,
      sms: false,
      som: true,
      descricao: "Novos usuários, alterações de perfil, permissões"
    },
    {
      tipo: "Segurança",
      email: true,
      push: true,
      sms: true,
      som: true,
      descricao: "Logins suspeitos, tentativas de acesso, alertas"
    }
  ]);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Vendas":
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case "Estoque":
        return <Archive className="h-4 w-4 text-orange-600" />;
      case "Financeiro":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "Sistema":
        return <Settings className="h-4 w-4 text-gray-600" />;
      case "Usuário":
        return <User className="h-4 w-4 text-purple-600" />;
      case "Segurança":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Alta</Badge>;
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
      case "Não Lida":
        return <Badge variant="default">Não Lida</Badge>;
      case "Lida":
        return <Badge variant="secondary">Lida</Badge>;
      case "Arquivada":
        return <Badge variant="outline">Arquivada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleMarcarComoLida = async (notificacaoId: string) => {
    setNotificacoes(prev => prev.map(notif => 
      notif.id === notificacaoId 
        ? { ...notif, status: "Lida" as const }
        : notif
    ));
  };

  const handleMarcarTodasComoLidas = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setNotificacoes(prev => prev.map(notif => 
        notif.status === "Não Lida" 
          ? { ...notif, status: "Lida" as const }
          : notif
      ));
      toast.success("Todas as notificações foram marcadas como lidas!");
    } catch (error) {
      toast.error("Erro ao marcar notificações como lidas");
    } finally {
      setCarregando(false);
    }
  };

  const handleArquivar = async (notificacaoId: string) => {
    setNotificacoes(prev => prev.map(notif => 
      notif.id === notificacaoId 
        ? { ...notif, status: "Arquivada" as const }
        : notif
    ));
    toast.success("Notificação arquivada!");
  };

  const handleExcluir = async (notificacaoId: string) => {
    setNotificacoes(prev => prev.filter(notif => notif.id !== notificacaoId));
    toast.success("Notificação excluída!");
  };

  const handleFavoritar = async (notificacaoId: string) => {
    setNotificacoes(prev => prev.map(notif => 
      notif.id === notificacaoId 
        ? { ...notif, favorita: !notif.favorita }
        : notif
    ));
  };

  const handleSalvarConfiguracoes = async () => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Configurações de notificação salvas!");
    } catch (error) {
      toast.error("Erro ao salvar configurações");
    } finally {
      setCarregando(false);
    }
  };

  const handleAtualizarConfiguracao = (tipo: string, campo: string, valor: boolean) => {
    setConfiguracoes(prev => prev.map(config => 
      config.tipo === tipo 
        ? { ...config, [campo]: valor }
        : config
    ));
  };

  const notificacoesFiltradas = notificacoes.filter(notificacao => {
    const matchStatus = filtroStatus === "todos" || notificacao.status.toLowerCase().replace(" ", "_") === filtroStatus;
    const matchTipo = filtroTipo === "todos" || notificacao.tipo.toLowerCase() === filtroTipo;
    const matchPrioridade = filtroPrioridade === "todos" || notificacao.prioridade.toLowerCase() === filtroPrioridade;
    const matchBusca = busca === "" || 
      notificacao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      notificacao.mensagem.toLowerCase().includes(busca.toLowerCase());
    
    return matchStatus && matchTipo && matchPrioridade && matchBusca;
  });

  const totalNotificacoes = notificacoes.length;
  const naoLidas = notificacoes.filter(n => n.status === "Não Lida").length;
  const favoritas = notificacoes.filter(n => n.favorita).length;
  const arquivadas = notificacoes.filter(n => n.status === "Arquivada").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
            <p className="text-muted-foreground">
              Gerencie suas notificações e configure preferências
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleMarcarTodasComoLidas}
              disabled={carregando || naoLidas === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar Todas como Lidas
            </Button>
          </div>
        </div>

        <Tabs defaultValue="notificacoes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          {/* Aba Notificações */}
          <TabsContent value="notificacoes" className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <Bell className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalNotificacoes}</div>
                  <p className="text-xs text-muted-foreground">
                    Todas as notificações
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
                  <BellRing className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{naoLidas}</div>
                  <p className="text-xs text-muted-foreground">
                    Requerem atenção
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Favoritas</CardTitle>
                  <Star className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{favoritas}</div>
                  <p className="text-xs text-muted-foreground">
                    Marcadas como importantes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Arquivadas</CardTitle>
                  <Archive className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{arquivadas}</div>
                  <p className="text-xs text-muted-foreground">
                    Notificações arquivadas
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
                        placeholder="Buscar notificações..."
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
                      <SelectItem value="não_lida">Não Lida</SelectItem>
                      <SelectItem value="lida">Lida</SelectItem>
                      <SelectItem value="arquivada">Arquivada</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Tipos</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="estoque">Estoque</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="sistema">Sistema</SelectItem>
                      <SelectItem value="usuário">Usuário</SelectItem>
                      <SelectItem value="segurança">Segurança</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas Prioridades</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Notificações */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Notificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificacoesFiltradas.map((notificacao) => (
                    <div 
                      key={notificacao.id} 
                      className={`p-4 border rounded-lg ${notificacao.status === "Não Lida" ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getTipoIcon(notificacao.tipo)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${notificacao.status === "Não Lida" ? "font-semibold" : ""}`}>
                                {notificacao.titulo}
                              </h4>
                              {notificacao.favorita && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notificacao.mensagem}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {notificacao.dataHora}
                              </div>
                              <span>•</span>
                              <span>{notificacao.remetente}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="flex items-center gap-2">
                            {getPrioridadeBadge(notificacao.prioridade)}
                            {getStatusBadge(notificacao.status)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFavoritar(notificacao.id)}
                            >
                              <Star className={`h-4 w-4 ${notificacao.favorita ? "text-yellow-500 fill-current" : ""}`} />
                            </Button>
                            {notificacao.status === "Não Lida" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarcarComoLida(notificacao.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleArquivar(notificacao.id)}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Excluir Notificação</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir esta notificação? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleExcluir(notificacao.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                      {notificacao.acao && (
                        <div className="mt-3 pt-3 border-t">
                          <Button variant="outline" size="sm">
                            {notificacao.acao}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Configurações */}
          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo de Notificação</TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="h-4 w-4" />
                          E-mail
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Bell className="h-4 w-4" />
                          Push
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          SMS
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          Som
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {configuracoes.map((config) => (
                      <TableRow key={config.tipo}>
                        <TableCell>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {getTipoIcon(config.tipo)}
                              {config.tipo}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {config.descricao}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={config.email}
                            onCheckedChange={(checked) => handleAtualizarConfiguracao(config.tipo, 'email', checked)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={config.push}
                            onCheckedChange={(checked) => handleAtualizarConfiguracao(config.tipo, 'push', checked)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={config.sms}
                            onCheckedChange={(checked) => handleAtualizarConfiguracao(config.tipo, 'sms', checked)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={config.som}
                            onCheckedChange={(checked) => handleAtualizarConfiguracao(config.tipo, 'som', checked)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end">
                  <Button onClick={handleSalvarConfiguracoes} disabled={carregando}>
                    {carregando ? "Salvando..." : "Salvar Configurações"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Notificacoes;