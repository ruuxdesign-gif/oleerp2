import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Watch,
  Tv,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Wifi,
  WifiOff,
  Shield,
  ShieldOff,
  MapPin,
  Calendar,
  Clock,
  Activity,
  RefreshCw,
  Download,
  Settings,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

interface Dispositivo {
  id: string;
  nome: string;
  tipo: "Smartphone" | "Desktop" | "Tablet" | "Laptop" | "Smartwatch" | "Smart TV" | "Outro";
  sistema: string;
  versao: string;
  status: "Online" | "Offline" | "Bloqueado" | "Suspenso";
  ultimoAcesso: string;
  localizacao: string;
  ip: string;
  navegador?: string;
  confiavel: boolean;
  sessaoAtiva: boolean;
  usuario: string;
}

const Dispositivos = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dispositivoSelecionado, setDispositivoSelecionado] = useState<Dispositivo | null>(null);

  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([
    {
      id: "1",
      nome: "iPhone 15 Pro",
      tipo: "Smartphone",
      sistema: "iOS",
      versao: "17.2.1",
      status: "Online",
      ultimoAcesso: "15/01/2024 14:30",
      localizacao: "São Paulo, SP",
      ip: "192.168.1.105",
      navegador: "Safari Mobile",
      confiavel: true,
      sessaoAtiva: true,
      usuario: "João Silva"
    },
    {
      id: "2",
      nome: "MacBook Pro M3",
      tipo: "Laptop",
      sistema: "macOS",
      versao: "14.2",
      status: "Online",
      ultimoAcesso: "15/01/2024 14:25",
      localizacao: "São Paulo, SP",
      ip: "192.168.1.102",
      navegador: "Chrome 120.0",
      confiavel: true,
      sessaoAtiva: true,
      usuario: "João Silva"
    },
    {
      id: "3",
      nome: "Samsung Galaxy Tab S9",
      tipo: "Tablet",
      sistema: "Android",
      versao: "14",
      status: "Offline",
      ultimoAcesso: "14/01/2024 18:45",
      localizacao: "Rio de Janeiro, RJ",
      ip: "201.45.123.89",
      navegador: "Chrome Mobile",
      confiavel: false,
      sessaoAtiva: false,
      usuario: "Maria Santos"
    },
    {
      id: "4",
      nome: "Dell OptiPlex 7090",
      tipo: "Desktop",
      sistema: "Windows",
      versao: "11 Pro",
      status: "Online",
      ultimoAcesso: "15/01/2024 13:15",
      localizacao: "Belo Horizonte, MG",
      ip: "10.0.0.45",
      navegador: "Edge 120.0",
      confiavel: true,
      sessaoAtiva: true,
      usuario: "Carlos Oliveira"
    },
    {
      id: "5",
      nome: "Apple Watch Series 9",
      tipo: "Smartwatch",
      sistema: "watchOS",
      versao: "10.2",
      status: "Bloqueado",
      ultimoAcesso: "13/01/2024 09:30",
      localizacao: "Desconhecida",
      ip: "177.89.45.123",
      confiavel: false,
      sessaoAtiva: false,
      usuario: "Usuário Suspeito"
    },
    {
      id: "6",
      nome: "Samsung Smart TV 65\"",
      tipo: "Smart TV",
      sistema: "Tizen",
      versao: "7.0",
      status: "Offline",
      ultimoAcesso: "12/01/2024 22:00",
      localizacao: "Brasília, DF",
      ip: "192.168.0.150",
      confiavel: true,
      sessaoAtiva: false,
      usuario: "Ana Costa"
    }
  ]);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Smartphone":
        return <Smartphone className="h-4 w-4 text-blue-600" />;
      case "Desktop":
        return <Monitor className="h-4 w-4 text-gray-600" />;
      case "Tablet":
        return <Tablet className="h-4 w-4 text-purple-600" />;
      case "Laptop":
        return <Laptop className="h-4 w-4 text-green-600" />;
      case "Smartwatch":
        return <Watch className="h-4 w-4 text-orange-600" />;
      case "Smart TV":
        return <Tv className="h-4 w-4 text-red-600" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Online":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>;
      case "Offline":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Offline</Badge>;
      case "Bloqueado":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Bloqueado</Badge>;
      case "Suspenso":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Suspenso</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleBloquearDispositivo = async (dispositivoId: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDispositivos(prev => prev.map(dispositivo => 
        dispositivo.id === dispositivoId 
          ? { ...dispositivo, status: "Bloqueado" as const, sessaoAtiva: false }
          : dispositivo
      ));
      toast.success("Dispositivo bloqueado com sucesso!");
    } catch (error) {
      toast.error("Erro ao bloquear dispositivo");
    } finally {
      setCarregando(false);
    }
  };

  const handleDesbloquearDispositivo = async (dispositivoId: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDispositivos(prev => prev.map(dispositivo => 
        dispositivo.id === dispositivoId 
          ? { ...dispositivo, status: "Offline" as const }
          : dispositivo
      ));
      toast.success("Dispositivo desbloqueado com sucesso!");
    } catch (error) {
      toast.error("Erro ao desbloquear dispositivo");
    } finally {
      setCarregando(false);
    }
  };

  const handleMarcarComoConfiavel = async (dispositivoId: string) => {
    setDispositivos(prev => prev.map(dispositivo => 
      dispositivo.id === dispositivoId 
        ? { ...dispositivo, confiavel: !dispositivo.confiavel }
        : dispositivo
    ));
    toast.success("Status de confiança atualizado!");
  };

  const handleRemoverDispositivo = async (dispositivoId: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDispositivos(prev => prev.filter(dispositivo => dispositivo.id !== dispositivoId));
      toast.success("Dispositivo removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover dispositivo");
    } finally {
      setCarregando(false);
    }
  };

  const handleEncerrarSessao = async (dispositivoId: string) => {
    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDispositivos(prev => prev.map(dispositivo => 
        dispositivo.id === dispositivoId 
          ? { ...dispositivo, sessaoAtiva: false, status: "Offline" as const }
          : dispositivo
      ));
      toast.success("Sessão encerrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao encerrar sessão");
    } finally {
      setCarregando(false);
    }
  };

  const dispositivosFiltrados = dispositivos.filter(dispositivo => {
    const matchStatus = filtroStatus === "todos" || dispositivo.status.toLowerCase() === filtroStatus;
    const matchTipo = filtroTipo === "todos" || dispositivo.tipo.toLowerCase().replace(" ", "_") === filtroTipo;
    const matchBusca = busca === "" || 
      dispositivo.nome.toLowerCase().includes(busca.toLowerCase()) ||
      dispositivo.usuario.toLowerCase().includes(busca.toLowerCase()) ||
      dispositivo.ip.includes(busca);
    
    return matchStatus && matchTipo && matchBusca;
  });

  const totalDispositivos = dispositivos.length;
  const online = dispositivos.filter(d => d.status === "Online").length;
  const confiáveis = dispositivos.filter(d => d.confiavel).length;
  const bloqueados = dispositivos.filter(d => d.status === "Bloqueado").length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dispositivos</h1>
            <p className="text-muted-foreground">
              Gerencie dispositivos conectados ao sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Monitor className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDispositivos}</div>
              <p className="text-xs text-muted-foreground">
                Dispositivos registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{online}</div>
              <p className="text-xs text-muted-foreground">
                Ativos no momento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confiáveis</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{confiáveis}</div>
              <p className="text-xs text-muted-foreground">
                Marcados como seguros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bloqueados</CardTitle>
              <ShieldOff className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{bloqueados}</div>
              <p className="text-xs text-muted-foreground">
                Acesso negado
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
                    placeholder="Buscar por nome, usuário ou IP..."
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
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                  <SelectItem value="suspenso">Suspenso</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Tipos</SelectItem>
                  <SelectItem value="smartphone">Smartphone</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="smartwatch">Smartwatch</SelectItem>
                  <SelectItem value="smart_tv">Smart TV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Dispositivos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Sistema</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead>Confiável</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dispositivosFiltrados.map((dispositivo) => (
                  <TableRow key={dispositivo.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getTipoIcon(dispositivo.tipo)}
                        <div>
                          <div className="font-medium">{dispositivo.nome}</div>
                          <div className="text-sm text-muted-foreground">
                            {dispositivo.ip}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">{dispositivo.usuario}</div>
                          {dispositivo.sessaoAtiva && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Sessão ativa
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{dispositivo.sistema}</div>
                        <div className="text-sm text-muted-foreground">
                          v{dispositivo.versao}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(dispositivo.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{dispositivo.localizacao}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{dispositivo.ultimoAcesso}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarcarComoConfiavel(dispositivo.id)}
                      >
                        {dispositivo.confiavel ? (
                          <Shield className="h-4 w-4 text-green-600" />
                        ) : (
                          <ShieldOff className="h-4 w-4 text-red-600" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setDispositivoSelecionado(dispositivo)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getTipoIcon(dispositivo.tipo)}
                                Detalhes do Dispositivo
                              </DialogTitle>
                            </DialogHeader>
                            {dispositivoSelecionado && (
                              <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Nome</Label>
                                    <p className="text-sm">{dispositivoSelecionado.nome}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Tipo</Label>
                                    <p className="text-sm">{dispositivoSelecionado.tipo}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Sistema</Label>
                                    <p className="text-sm">{dispositivoSelecionado.sistema} v{dispositivoSelecionado.versao}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <div className="mt-1">{getStatusBadge(dispositivoSelecionado.status)}</div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Usuário</Label>
                                    <p className="text-sm">{dispositivoSelecionado.usuario}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">IP</Label>
                                    <p className="text-sm">{dispositivoSelecionado.ip}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Localização</Label>
                                    <p className="text-sm">{dispositivoSelecionado.localizacao}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Último Acesso</Label>
                                    <p className="text-sm">{dispositivoSelecionado.ultimoAcesso}</p>
                                  </div>
                                  {dispositivoSelecionado.navegador && (
                                    <div>
                                      <Label className="text-sm font-medium">Navegador</Label>
                                      <p className="text-sm">{dispositivoSelecionado.navegador}</p>
                                    </div>
                                  )}
                                  <div>
                                    <Label className="text-sm font-medium">Confiável</Label>
                                    <p className="text-sm">{dispositivoSelecionado.confiavel ? "Sim" : "Não"}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {dispositivo.sessaoAtiva && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEncerrarSessao(dispositivo.id)}
                          >
                            <PowerOff className="h-4 w-4" />
                          </Button>
                        )}

                        {dispositivo.status === "Bloqueado" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDesbloquearDispositivo(dispositivo.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBloquearDispositivo(dispositivo.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remover Dispositivo</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja remover este dispositivo? Esta ação não pode ser desfeita e o dispositivo precisará ser reautorizado.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleRemoverDispositivo(dispositivo.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remover
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

export default Dispositivos;