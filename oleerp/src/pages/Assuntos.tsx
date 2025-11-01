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
  MessageSquare,
  FolderTree,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Assunto {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  status: "Ativo" | "Inativo";
  dataCriacao: string;
  totalChamados: number;
  chamadosAbertos: number;
}

const Assuntos = () => {
  const [assuntos, setAssuntos] = useState<Assunto[]>([
    {
      id: "1",
      nome: "Problemas de Hardware",
      categoria: "Infraestrutura",
      descricao: "Assuntos relacionados a problemas com equipamentos físicos como computadores, impressoras, servidores, etc.",
      status: "Ativo",
      dataCriacao: "15/12/2024",
      totalChamados: 45,
      chamadosAbertos: 8,
    },
    {
      id: "2",
      nome: "Configuração de Software",
      categoria: "Sistema",
      descricao: "Instalação, configuração e atualização de softwares corporativos.",
      status: "Ativo",
      dataCriacao: "10/12/2024",
      totalChamados: 32,
      chamadosAbertos: 5,
    },
    {
      id: "3",
      nome: "Solicitação de Equipamentos",
      categoria: "Administrativo",
      descricao: "Pedidos de novos equipamentos, materiais de escritório e recursos para os departamentos.",
      status: "Ativo",
      dataCriacao: "08/12/2024",
      totalChamados: 28,
      chamadosAbertos: 12,
    },
    {
      id: "4",
      nome: "Problemas de Rede",
      categoria: "TI",
      descricao: "Questões relacionadas à conectividade, internet, rede interna e comunicação.",
      status: "Ativo",
      dataCriacao: "05/12/2024",
      totalChamados: 67,
      chamadosAbertos: 3,
    },
    {
      id: "5",
      nome: "Relatórios Financeiros",
      categoria: "Financeiro",
      descricao: "Geração de relatórios, análises financeiras e problemas com sistemas contábeis.",
      status: "Inativo",
      dataCriacao: "01/12/2024",
      totalChamados: 15,
      chamadosAbertos: 0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [selectedAssuntos, setSelectedAssuntos] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAssunto, setSelectedAssunto] = useState<Assunto | null>(null);
  const [newAssunto, setNewAssunto] = useState<{
    nome: string;
    categoria: string;
    descricao: string;
    status: "Ativo" | "Inativo";
  }>({
    nome: "",
    categoria: "",
    descricao: "",
    status: "Ativo",
  });

  const categorias = ["Infraestrutura", "Sistema", "Administrativo", "TI", "Financeiro"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inativo":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ativo":
        return <CheckCircle className="h-3 w-3" />;
      case "Inativo":
        return <XCircle className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const filteredAssuntos = assuntos.filter((assunto) => {
    const matchesSearch = assunto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assunto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assunto.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || assunto.status === statusFilter;
    const matchesCategoria = categoriaFilter === "todas" || assunto.categoria === categoriaFilter;
    
    return matchesSearch && matchesStatus && matchesCategoria;
  });

  const handleSelectAssunto = (assuntoId: string) => {
    setSelectedAssuntos(prev => 
      prev.includes(assuntoId) 
        ? prev.filter(id => id !== assuntoId)
        : [...prev, assuntoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAssuntos.length === filteredAssuntos.length) {
      setSelectedAssuntos([]);
    } else {
      setSelectedAssuntos(filteredAssuntos.map(assunto => assunto.id));
    }
  };

  const handleCreateAssunto = () => {
    if (!newAssunto.nome.trim() || !newAssunto.categoria || !newAssunto.descricao.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const novoAssunto: Assunto = {
      id: (assuntos.length + 1).toString(),
      nome: newAssunto.nome,
      categoria: newAssunto.categoria,
      descricao: newAssunto.descricao,
      status: newAssunto.status,
      dataCriacao: new Date().toLocaleDateString("pt-BR"),
      totalChamados: 0,
      chamadosAbertos: 0,
    };

    setAssuntos([...assuntos, novoAssunto]);
    setNewAssunto({ nome: "", categoria: "", descricao: "", status: "Ativo" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Assunto criado com sucesso!",
    });
  };

  const handleDeleteAssunto = (assuntoId: string) => {
    const assunto = assuntos.find(a => a.id === assuntoId);
    
    if (assunto && assunto.chamadosAbertos > 0) {
      toast({
        title: "Erro",
        description: "Não é possível excluir um assunto com chamados em aberto.",
        variant: "destructive",
      });
      return;
    }

    setAssuntos(assuntos.filter(a => a.id !== assuntoId));
    setSelectedAssuntos(selectedAssuntos.filter(id => id !== assuntoId));
    
    toast({
      title: "Sucesso",
      description: "Assunto excluído com sucesso!",
    });
  };

  const handleUpdateStatus = (assuntoId: string, newStatus: "Ativo" | "Inativo") => {
    setAssuntos(assuntos.map(assunto => 
      assunto.id === assuntoId 
        ? { ...assunto, status: newStatus }
        : assunto
    ));
    
    toast({
      title: "Sucesso",
      description: `Status do assunto atualizado para ${newStatus}!`,
    });
  };

  const handleEditAssunto = () => {
    if (!selectedAssunto) return;

    if (!selectedAssunto.nome.trim() || !selectedAssunto.categoria || !selectedAssunto.descricao.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setAssuntos(assuntos.map(assunto => 
      assunto.id === selectedAssunto.id ? selectedAssunto : assunto
    ));
    
    setIsEditDialogOpen(false);
    setSelectedAssunto(null);
    
    toast({
      title: "Sucesso",
      description: "Assunto atualizado com sucesso!",
    });
  };

  const openViewDialog = (assunto: Assunto) => {
    setSelectedAssunto(assunto);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (assunto: Assunto) => {
    setSelectedAssunto({ ...assunto });
    setIsEditDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assuntos</h1>
            <p className="text-muted-foreground">
              Gerencie os assuntos disponíveis para categorização de chamados
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Assunto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Assunto</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome do Assunto *</Label>
                  <Input
                    id="nome"
                    value={newAssunto.nome}
                    onChange={(e) => setNewAssunto({ ...newAssunto, nome: e.target.value })}
                    placeholder="Digite o nome do assunto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select
                    value={newAssunto.categoria}
                    onValueChange={(value) => setNewAssunto({ ...newAssunto, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newAssunto.status}
                    onValueChange={(value: "Ativo" | "Inativo") => setNewAssunto({ ...newAssunto, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={newAssunto.descricao}
                    onChange={(e) => setNewAssunto({ ...newAssunto, descricao: e.target.value })}
                    placeholder="Descreva o assunto e seu propósito"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateAssunto}>Criar Assunto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, categoria ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas Categorias</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Action Buttons */}
            {selectedAssuntos.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedAssuntos.length} assunto(s) selecionado(s)
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    selectedAssuntos.forEach(id => handleDeleteAssunto(id));
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Selecionados
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assuntos Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Lista de Assuntos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 text-left">
                        <Checkbox
                          checked={selectedAssuntos.length === filteredAssuntos.length && filteredAssuntos.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-4 text-left font-medium">Nome</th>
                      <th className="p-4 text-left font-medium">Categoria</th>
                      <th className="p-4 text-left font-medium">Status</th>
                      <th className="p-4 text-left font-medium">Chamados</th>
                      <th className="p-4 text-left font-medium">Data Criação</th>
                      <th className="p-4 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssuntos.map((assunto) => (
                      <tr key={assunto.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <Checkbox
                            checked={selectedAssuntos.includes(assunto.id)}
                            onCheckedChange={() => handleSelectAssunto(assunto.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{assunto.nome}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {assunto.descricao}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <FolderTree className="h-3 w-3" />
                            {assunto.categoria}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(assunto.status)}`}>
                            {getStatusIcon(assunto.status)}
                            {assunto.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div>Total: {assunto.totalChamados}</div>
                            <div className="text-muted-foreground">
                              Abertos: {assunto.chamadosAbertos}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {assunto.dataCriacao}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openViewDialog(assunto)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(assunto)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Select
                              value={assunto.status}
                              onValueChange={(value: "Ativo" | "Inativo") => 
                                handleUpdateStatus(assunto.id, value)
                              }
                            >
                              <SelectTrigger className="w-[100px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ativo">Ativo</SelectItem>
                                <SelectItem value="Inativo">Inativo</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAssunto(assunto.id)}
                              disabled={assunto.chamadosAbertos > 0}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div>
                Mostrando {filteredAssuntos.length} de {assuntos.length} assuntos
              </div>
              <div className="flex items-center gap-2">
                {searchTerm && (
                  <Badge variant="secondary">
                    Busca: "{searchTerm}"
                  </Badge>
                )}
                {statusFilter !== "todos" && (
                  <Badge variant="secondary">
                    Status: {statusFilter}
                  </Badge>
                )}
                {categoriaFilter !== "todas" && (
                  <Badge variant="secondary">
                    Categoria: {categoriaFilter}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Assunto</DialogTitle>
            </DialogHeader>
            {selectedAssunto && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nome</Label>
                  <div className="p-2 bg-muted rounded">{selectedAssunto.nome}</div>
                </div>
                <div className="grid gap-2">
                  <Label>Categoria</Label>
                  <div className="p-2 bg-muted rounded flex items-center gap-2">
                    <FolderTree className="h-4 w-4" />
                    {selectedAssunto.categoria}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <div className="p-2 bg-muted rounded">
                    <Badge className={`${getStatusColor(selectedAssunto.status)}`}>
                      {getStatusIcon(selectedAssunto.status)}
                      {selectedAssunto.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Estatísticas</Label>
                  <div className="p-2 bg-muted rounded">
                    <div>Total de chamados: {selectedAssunto.totalChamados}</div>
                    <div>Chamados em aberto: {selectedAssunto.chamadosAbertos}</div>
                    <div>Data de criação: {selectedAssunto.dataCriacao}</div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descrição</Label>
                  <div className="p-2 bg-muted rounded min-h-[100px]">
                    {selectedAssunto.descricao}
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Assunto</DialogTitle>
            </DialogHeader>
            {selectedAssunto && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-nome">Nome do Assunto *</Label>
                  <Input
                    id="edit-nome"
                    value={selectedAssunto.nome}
                    onChange={(e) => setSelectedAssunto({ ...selectedAssunto, nome: e.target.value })}
                    placeholder="Digite o nome do assunto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-categoria">Categoria *</Label>
                  <Select
                    value={selectedAssunto.categoria}
                    onValueChange={(value) => setSelectedAssunto({ ...selectedAssunto, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedAssunto.status}
                    onValueChange={(value: "Ativo" | "Inativo") => setSelectedAssunto({ ...selectedAssunto, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-descricao">Descrição *</Label>
                  <Textarea
                    id="edit-descricao"
                    value={selectedAssunto.descricao}
                    onChange={(e) => setSelectedAssunto({ ...selectedAssunto, descricao: e.target.value })}
                    placeholder="Descreva o assunto e seu propósito"
                    rows={4}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditAssunto}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Assuntos;