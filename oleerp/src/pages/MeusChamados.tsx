import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Chamado {
  id: string;
  titulo: string;
  categoria: string;
  status: "Em Andamento" | "Pendente" | "Resolvido" | "Cancelado";
  prioridade: "Crítica" | "Alta" | "Média" | "Baixa";
  data: string;
  descricao: string;
  solicitante: string;
}

const MeusChamados = () => {
  const [chamados, setChamados] = useState<Chamado[]>([
    {
      id: "#1234",
      titulo: "Problema com impressora",
      categoria: "Infraestrutura",
      status: "Em Andamento",
      prioridade: "Alta",
      data: "10/01/2025",
      descricao: "A impressora do setor financeiro não está funcionando corretamente. Apresenta erro de papel atolado constantemente.",
      solicitante: "João Silva",
    },
    {
      id: "#1235",
      titulo: "Solicitação de novo equipamento",
      categoria: "Administrativo",
      status: "Pendente",
      prioridade: "Média",
      data: "09/01/2025",
      descricao: "Necessário adquirir novo computador para o setor de vendas devido ao aumento da equipe.",
      solicitante: "Maria Santos",
    },
    {
      id: "#1236",
      titulo: "Erro no sistema financeiro",
      categoria: "Sistema",
      status: "Resolvido",
      prioridade: "Crítica",
      data: "08/01/2025",
      descricao: "Sistema apresentando erro ao gerar relatórios financeiros mensais. Problema resolvido com atualização do banco de dados.",
      solicitante: "Carlos Oliveira",
    },
    {
      id: "#1237",
      titulo: "Configuração de email corporativo",
      categoria: "TI",
      status: "Em Andamento",
      prioridade: "Baixa",
      data: "07/01/2025",
      descricao: "Configurar email corporativo para novos funcionários contratados.",
      solicitante: "Ana Costa",
    },
    {
      id: "#1238",
      titulo: "Manutenção preventiva servidores",
      categoria: "Infraestrutura",
      status: "Pendente",
      prioridade: "Alta",
      data: "06/01/2025",
      descricao: "Realizar manutenção preventiva nos servidores principais para evitar possíveis falhas.",
      solicitante: "Roberto Lima",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [prioridadeFilter, setPrioridadeFilter] = useState<string>("todas");
  const [selectedChamados, setSelectedChamados] = useState<string[]>([]);
  const [isNewChamadoOpen, setIsNewChamadoOpen] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);
  const [newChamado, setNewChamado] = useState({
    titulo: "",
    categoria: "",
    prioridade: "Média" as const,
    descricao: "",
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Em Andamento": "default",
      "Pendente": "secondary",
      "Resolvido": "default",
      "Cancelado": "destructive",
    };
    return colors[status] || "secondary";
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors: Record<string, string> = {
      "Crítica": "destructive",
      "Alta": "destructive",
      "Média": "secondary",
      "Baixa": "outline",
    };
    return colors[prioridade] || "secondary";
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      "Em Andamento": Clock,
      "Pendente": AlertCircle,
      "Resolvido": CheckCircle,
      "Cancelado": Trash2,
    };
    return icons[status] || Clock;
  };

  // Filtrar chamados
  const filteredChamados = chamados.filter((chamado) => {
    const matchesSearch = chamado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chamado.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chamado.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || chamado.status === statusFilter;
    const matchesPrioridade = prioridadeFilter === "todas" || chamado.prioridade === prioridadeFilter;
    
    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  // Funções de ação
  const handleSelectChamado = (id: string) => {
    setSelectedChamados(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedChamados.length === filteredChamados.length) {
      setSelectedChamados([]);
    } else {
      setSelectedChamados(filteredChamados.map(c => c.id));
    }
  };

  const handleCreateChamado = () => {
    if (!newChamado.titulo || !newChamado.categoria || !newChamado.descricao) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novoChamado: Chamado = {
      id: `#${Date.now()}`,
      titulo: newChamado.titulo,
      categoria: newChamado.categoria,
      status: "Pendente",
      prioridade: newChamado.prioridade,
      data: new Date().toLocaleDateString("pt-BR"),
      descricao: newChamado.descricao,
      solicitante: "Usuário Atual",
    };

    setChamados(prev => [novoChamado, ...prev]);
    setNewChamado({ titulo: "", categoria: "", prioridade: "Média", descricao: "" });
    setIsNewChamadoOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Chamado criado com sucesso!",
    });
  };

  const handleDeleteChamado = (id: string) => {
    setChamados(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Sucesso",
      description: "Chamado excluído com sucesso!",
    });
  };

  const handleUpdateStatus = (id: string, newStatus: Chamado["status"]) => {
    setChamados(prev => prev.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    toast({
      title: "Sucesso",
      description: "Status atualizado com sucesso!",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Meus Chamados</h1>
            <p className="text-muted-foreground">
              Gerencie seus chamados abertos ({filteredChamados.length} de {chamados.length})
            </p>
          </div>
          <Dialog open={isNewChamadoOpen} onOpenChange={setIsNewChamadoOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Chamado
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Chamado</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={newChamado.titulo}
                    onChange={(e) => setNewChamado(prev => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Digite o título do chamado"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select value={newChamado.categoria} onValueChange={(value) => setNewChamado(prev => ({ ...prev, categoria: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                      <SelectItem value="Sistema">Sistema</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                      <SelectItem value="TI">TI</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select value={newChamado.prioridade} onValueChange={(value: any) => setNewChamado(prev => ({ ...prev, prioridade: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Crítica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={newChamado.descricao}
                    onChange={(e) => setNewChamado(prev => ({ ...prev, descricao: e.target.value }))}
                    placeholder="Descreva o problema ou solicitação"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateChamado} className="flex-1">
                    Criar Chamado
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewChamadoOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar chamados..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Resolvido">Resolvido</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="Crítica">Crítica</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedChamados.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                {selectedChamados.length} chamado(s) selecionado(s)
              </span>
              <Button size="sm" variant="outline" onClick={() => setSelectedChamados([])}>
                Limpar seleção
              </Button>
            </div>
          )}

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-3 w-12">
                    <Checkbox 
                      checked={selectedChamados.length === filteredChamados.length && filteredChamados.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left p-3 text-sm font-medium">ID</th>
                  <th className="text-left p-3 text-sm font-medium">Título</th>
                  <th className="text-left p-3 text-sm font-medium">Solicitante</th>
                  <th className="text-left p-3 text-sm font-medium">Categoria</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-left p-3 text-sm font-medium">Prioridade</th>
                  <th className="text-left p-3 text-sm font-medium">Data</th>
                  <th className="text-left p-3 text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredChamados.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      Nenhum chamado encontrado
                    </td>
                  </tr>
                ) : (
                  filteredChamados.map((chamado) => {
                    const StatusIcon = getStatusIcon(chamado.status);
                    return (
                      <tr
                        key={chamado.id}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-3">
                          <Checkbox 
                            checked={selectedChamados.includes(chamado.id)}
                            onCheckedChange={() => handleSelectChamado(chamado.id)}
                          />
                        </td>
                        <td className="p-3 text-sm font-medium text-primary">
                          {chamado.id}
                        </td>
                        <td className="p-3">
                          <div className="max-w-[200px]">
                            <p className="text-sm font-medium truncate">{chamado.titulo}</p>
                            <p className="text-xs text-muted-foreground truncate">{chamado.descricao}</p>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {chamado.solicitante}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {chamado.categoria}
                        </td>
                        <td className="p-3">
                          <Badge variant={getStatusColor(chamado.status) as any} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {chamado.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={getPrioridadeColor(chamado.prioridade) as any}>
                            {chamado.prioridade}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {chamado.data}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => setSelectedChamado(chamado)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Detalhes do Chamado {chamado.id}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label>Título</Label>
                                    <p className="text-sm">{chamado.titulo}</p>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Descrição</Label>
                                    <p className="text-sm text-muted-foreground">{chamado.descricao}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label>Solicitante</Label>
                                      <p className="text-sm">{chamado.solicitante}</p>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>Categoria</Label>
                                      <p className="text-sm">{chamado.categoria}</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                      <Label>Status</Label>
                                      <Badge variant={getStatusColor(chamado.status) as any} className="w-fit gap-1">
                                        <StatusIcon className="h-3 w-3" />
                                        {chamado.status}
                                      </Badge>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>Prioridade</Label>
                                      <Badge variant={getPrioridadeColor(chamado.prioridade) as any} className="w-fit">
                                        {chamado.prioridade}
                                      </Badge>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>Data</Label>
                                      <p className="text-sm">{chamado.data}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4">
                                    <Select 
                                      value={chamado.status} 
                                      onValueChange={(value: Chamado["status"]) => handleUpdateStatus(chamado.id, value)}
                                    >
                                      <SelectTrigger className="flex-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Pendente">Pendente</SelectItem>
                                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                                        <SelectItem value="Resolvido">Resolvido</SelectItem>
                                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleDeleteChamado(chamado.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredChamados.length} de {chamados.length} chamados
              </p>
              {searchTerm && (
                <Badge variant="outline" className="gap-1">
                  <Search className="h-3 w-3" />
                  Filtrado por: "{searchTerm}"
                </Badge>
              )}
              {statusFilter !== "todos" && (
                <Badge variant="outline">
                  Status: {statusFilter}
                </Badge>
              )}
              {prioridadeFilter !== "todas" && (
                <Badge variant="outline">
                  Prioridade: {prioridadeFilter}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Próxima
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MeusChamados;
