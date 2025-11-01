import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Calendar,
  Clock,
  Shield,
  LogOut,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

interface Sessao {
  id: string;
  dispositivo: "Desktop" | "Mobile" | "Tablet";
  navegador: string;
  sistemaOperacional: string;
  ip: string;
  localizacao: string;
  dataLogin: string;
  horaLogin: string;
  ultimaAtividade: string;
  status: "Ativa" | "Expirada" | "Encerrada";
  atual: boolean;
  duracao: string;
}

const Sessoes = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroDispositivo, setFiltroDispositivo] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  const [sessoes, setSessoes] = useState<Sessao[]>([
    {
      id: "1",
      dispositivo: "Desktop",
      navegador: "Chrome 120.0",
      sistemaOperacional: "Windows 11",
      ip: "192.168.1.100",
      localizacao: "São José, SC - Brasil",
      dataLogin: "15/01/2024",
      horaLogin: "08:30",
      ultimaAtividade: "há 2 minutos",
      status: "Ativa",
      atual: true,
      duracao: "2h 15min"
    },
    {
      id: "2",
      dispositivo: "Mobile",
      navegador: "Safari 17.2",
      sistemaOperacional: "iOS 17.2",
      ip: "192.168.1.101",
      localizacao: "São José, SC - Brasil",
      dataLogin: "15/01/2024",
      horaLogin: "07:45",
      ultimaAtividade: "há 15 minutos",
      status: "Ativa",
      atual: false,
      duracao: "3h 00min"
    },
    {
      id: "3",
      dispositivo: "Desktop",
      navegador: "Firefox 121.0",
      sistemaOperacional: "Windows 11",
      ip: "10.0.0.50",
      localizacao: "Florianópolis, SC - Brasil",
      dataLogin: "14/01/2024",
      horaLogin: "14:20",
      ultimaAtividade: "14/01/2024 18:30",
      status: "Encerrada",
      atual: false,
      duracao: "4h 10min"
    },
    {
      id: "4",
      dispositivo: "Tablet",
      navegador: "Chrome 120.0",
      sistemaOperacional: "Android 14",
      ip: "192.168.1.102",
      localizacao: "São José, SC - Brasil",
      dataLogin: "13/01/2024",
      horaLogin: "16:15",
      ultimaAtividade: "13/01/2024 17:45",
      status: "Expirada",
      atual: false,
      duracao: "1h 30min"
    },
    {
      id: "5",
      dispositivo: "Desktop",
      navegador: "Edge 120.0",
      sistemaOperacional: "Windows 10",
      ip: "203.0.113.45",
      localizacao: "São Paulo, SP - Brasil",
      dataLogin: "12/01/2024",
      horaLogin: "09:00",
      ultimaAtividade: "12/01/2024 17:30",
      status: "Encerrada",
      atual: false,
      duracao: "8h 30min"
    }
  ]);

  const getDeviceIcon = (dispositivo: string) => {
    switch (dispositivo) {
      case "Desktop":
        return <Monitor className="h-4 w-4" />;
      case "Mobile":
        return <Smartphone className="h-4 w-4" />;
      case "Tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string, atual: boolean) => {
    if (atual) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Sessão Atual</Badge>;
    }
    
    switch (status) {
      case "Ativa":
        return <Badge variant="default">Ativa</Badge>;
      case "Expirada":
        return <Badge variant="secondary">Expirada</Badge>;
      case "Encerrada":
        return <Badge variant="outline">Encerrada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleEncerrarSessao = async (sessaoId: string) => {
    setCarregando(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSessoes(prev => prev.map(sessao => 
        sessao.id === sessaoId 
          ? { ...sessao, status: "Encerrada" as const, ultimaAtividade: new Date().toLocaleString() }
          : sessao
      ));
      
      toast.success("Sessão encerrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao encerrar sessão");
    } finally {
      setCarregando(false);
    }
  };

  const handleEncerrarTodasSessoes = async () => {
    setCarregando(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSessoes(prev => prev.map(sessao => 
        sessao.atual 
          ? sessao 
          : { ...sessao, status: "Encerrada" as const, ultimaAtividade: new Date().toLocaleString() }
      ));
      
      toast.success("Todas as outras sessões foram encerradas!");
    } catch (error) {
      toast.error("Erro ao encerrar sessões");
    } finally {
      setCarregando(false);
    }
  };

  const handleAtualizarSessoes = async () => {
    setCarregando(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Sessões atualizadas!");
    } catch (error) {
      toast.error("Erro ao atualizar sessões");
    } finally {
      setCarregando(false);
    }
  };

  const sessoesFiltradas = sessoes.filter(sessao => {
    const matchStatus = filtroStatus === "todos" || sessao.status.toLowerCase() === filtroStatus;
    const matchDispositivo = filtroDispositivo === "todos" || sessao.dispositivo.toLowerCase() === filtroDispositivo;
    const matchBusca = busca === "" || 
      sessao.navegador.toLowerCase().includes(busca.toLowerCase()) ||
      sessao.localizacao.toLowerCase().includes(busca.toLowerCase()) ||
      sessao.ip.includes(busca);
    
    return matchStatus && matchDispositivo && matchBusca;
  });

  const sessoesAtivas = sessoes.filter(s => s.status === "Ativa").length;
  const totalSessoes = sessoes.length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessões</h1>
            <p className="text-muted-foreground">
              Gerencie suas sessões ativas e visualize o histórico de logins
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleAtualizarSessoes}
              disabled={carregando}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${carregando ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Encerrar Outras Sessões
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Encerrar Outras Sessões</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja encerrar todas as outras sessões ativas? 
                    Esta ação irá desconectar todos os outros dispositivos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleEncerrarTodasSessoes}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Encerrar Sessões
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{sessoesAtivas}</div>
              <p className="text-xs text-muted-foreground">
                Dispositivos conectados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Sessões</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessoes}</div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 dias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Último Login</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">08:30</div>
              <p className="text-xs text-muted-foreground">
                Hoje, Desktop
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Logins suspeitos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por navegador, localização ou IP..."
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
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="expirada">Expirada</SelectItem>
                  <SelectItem value="encerrada">Encerrada</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroDispositivo} onValueChange={setFiltroDispositivo}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Dispositivos</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Sessões */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Sessões</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Navegador/SO</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Data/Hora Login</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessoesFiltradas.map((sessao) => (
                  <TableRow key={sessao.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(sessao.dispositivo)}
                        <span className="font-medium">{sessao.dispositivo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sessao.navegador}</div>
                        <div className="text-sm text-muted-foreground">{sessao.sistemaOperacional}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{sessao.localizacao}</div>
                          <div className="text-sm text-muted-foreground">{sessao.ip}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{sessao.dataLogin}</div>
                          <div className="text-sm text-muted-foreground">{sessao.horaLogin}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{sessao.ultimaAtividade}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{sessao.duracao}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sessao.status, sessao.atual)}
                    </TableCell>
                    <TableCell>
                      {sessao.status === "Ativa" && !sessao.atual && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <XCircle className="h-4 w-4 mr-1" />
                              Encerrar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Encerrar Sessão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja encerrar esta sessão? O dispositivo será desconectado imediatamente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleEncerrarSessao(sessao.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Encerrar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      {sessao.atual && (
                        <Badge variant="outline" className="text-xs">
                          Sessão Atual
                        </Badge>
                      )}
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

export default Sessoes;