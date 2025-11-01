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
  FolderTree,
  Users,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  status: "Ativa" | "Inativa";
  totalChamados: number;
  criadoEm: string;
  criadoPor: string;
}

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([
    {
      id: "1",
      nome: "Infraestrutura",
      descricao: "Problemas relacionados à infraestrutura de TI, servidores, rede e hardware",
      cor: "#3B82F6",
      status: "Ativa",
      totalChamados: 15,
      criadoEm: "2024-01-15",
      criadoPor: "Admin Sistema"
    },
    {
      id: "2", 
      nome: "Sistema",
      descricao: "Bugs, melhorias e funcionalidades do sistema ERP",
      cor: "#10B981",
      status: "Ativa",
      totalChamados: 23,
      criadoEm: "2024-01-10",
      criadoPor: "João Silva"
    },
    {
      id: "3",
      nome: "Administrativo",
      descricao: "Questões administrativas, processos e documentação",
      cor: "#F59E0B",
      status: "Ativa",
      totalChamados: 8,
      criadoEm: "2024-01-20",
      criadoPor: "Maria Santos"
    },
    {
      id: "4",
      nome: "TI",
      descricao: "Suporte técnico geral e manutenção de equipamentos",
      cor: "#8B5CF6",
      status: "Ativa",
      totalChamados: 12,
      criadoEm: "2024-01-05",
      criadoPor: "Carlos Tech"
    },
    {
      id: "5",
      nome: "Financeiro",
      descricao: "Questões relacionadas ao módulo financeiro e contábil",
      cor: "#EF4444",
      status: "Inativa",
      totalChamados: 3,
      criadoEm: "2024-01-25",
      criadoPor: "Ana Contadora"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todas");
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [newCategoria, setNewCategoria] = useState({
    nome: "",
    descricao: "",
    cor: "#3B82F6",
    status: "Ativa" as "Ativa" | "Inativa"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa": return "bg-green-100 text-green-800 border-green-200";
      case "Inativa": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ativa": return <CheckCircle className="h-3 w-3" />;
      case "Inativa": return <XCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const filteredCategorias = categorias.filter(categoria => {
    const matchesSearch = categoria.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         categoria.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         categoria.criadoPor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todas" || categoria.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectCategoria = (categoriaId: string) => {
    setSelectedCategorias(prev => 
      prev.includes(categoriaId) 
        ? prev.filter(id => id !== categoriaId)
        : [...prev, categoriaId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategorias.length === filteredCategorias.length) {
      setSelectedCategorias([]);
    } else {
      setSelectedCategorias(filteredCategorias.map(categoria => categoria.id));
    }
  };

  const handleCreateCategoria = () => {
    if (!newCategoria.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome da categoria é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const categoria: Categoria = {
      id: Date.now().toString(),
      nome: newCategoria.nome,
      descricao: newCategoria.descricao,
      cor: newCategoria.cor,
      status: newCategoria.status,
      totalChamados: 0,
      criadoEm: new Date().toISOString().split('T')[0],
      criadoPor: "Usuário Atual"
    };

    setCategorias(prev => [...prev, categoria]);
    setNewCategoria({ nome: "", descricao: "", cor: "#3B82F6", status: "Ativa" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Categoria criada com sucesso!",
    });
  };

  const handleDeleteCategoria = (categoriaId: string) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    if (categoria && categoria.totalChamados > 0) {
      toast({
        title: "Erro",
        description: "Não é possível excluir categoria com chamados associados",
        variant: "destructive",
      });
      return;
    }

    setCategorias(prev => prev.filter(categoria => categoria.id !== categoriaId));
    setSelectedCategorias(prev => prev.filter(id => id !== categoriaId));
    
    toast({
      title: "Sucesso",
      description: "Categoria excluída com sucesso!",
    });
  };

  const handleUpdateStatus = (categoriaId: string, newStatus: "Ativa" | "Inativa") => {
    setCategorias(prev => prev.map(categoria => 
      categoria.id === categoriaId 
        ? { ...categoria, status: newStatus }
        : categoria
    ));
    
    toast({
      title: "Sucesso",
      description: `Status da categoria atualizado para ${newStatus}!`,
    });
  };

  const handleEditCategoria = () => {
    if (!selectedCategoria) return;

    setCategorias(prev => prev.map(categoria => 
      categoria.id === selectedCategoria.id 
        ? { ...selectedCategoria }
        : categoria
    ));
    
    setIsEditDialogOpen(false);
    setSelectedCategoria(null);
    
    toast({
      title: "Sucesso",
      description: "Categoria atualizada com sucesso!",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
            <p className="text-muted-foreground">
              Gerencie as categorias dos chamados do sistema
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Categoria</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={newCategoria.nome}
                    onChange={(e) => setNewCategoria(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Digite o nome da categoria"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={newCategoria.descricao}
                    onChange={(e) => setNewCategoria(prev => ({ ...prev, descricao: e.target.value }))}
                    placeholder="Descreva o propósito desta categoria"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cor">Cor</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="cor"
                      type="color"
                      value={newCategoria.cor}
                      onChange={(e) => setNewCategoria(prev => ({ ...prev, cor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={newCategoria.cor}
                      onChange={(e) => setNewCategoria(prev => ({ ...prev, cor: e.target.value }))}
                      placeholder="#3B82F6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newCategoria.status} onValueChange={(value: "Ativa" | "Inativa") => setNewCategoria(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativa">Ativa</SelectItem>
                      <SelectItem value="Inativa">Inativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCategoria}>
                  Criar Categoria
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              Lista de Categorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar categorias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todos os Status</SelectItem>
                  <SelectItem value="Ativa">Ativa</SelectItem>
                  <SelectItem value="Inativa">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCategorias.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium text-blue-900">
                  {selectedCategorias.length} categoria(s) selecionada(s)
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    selectedCategorias.forEach(id => {
                      const categoria = categorias.find(c => c.id === id);
                      if (categoria && categoria.totalChamados === 0) {
                        handleDeleteCategoria(id);
                      }
                    });
                  }}
                  className="ml-auto"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir Selecionadas
                </Button>
              </div>
            )}

            <div className="border rounded-lg">
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
                <Checkbox
                  checked={selectedCategorias.length === filteredCategorias.length && filteredCategorias.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <div>Nome</div>
                <div className="text-center">Status</div>
                <div className="text-center">Chamados</div>
                <div className="text-center">Criado em</div>
                <div className="text-center">Criado por</div>
                <div className="text-center">Ações</div>
              </div>

              {filteredCategorias.map((categoria) => (
                <div key={categoria.id} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 border-b last:border-b-0 items-center hover:bg-muted/25">
                  <Checkbox
                    checked={selectedCategorias.includes(categoria.id)}
                    onCheckedChange={() => handleSelectCategoria(categoria.id)}
                  />
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: categoria.cor }}
                    />
                    <div>
                      <div className="font-medium">{categoria.nome}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                        {categoria.descricao}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className={`gap-1 ${getStatusColor(categoria.status)}`}>
                      {getStatusIcon(categoria.status)}
                      {categoria.status}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {categoria.totalChamados}
                    </Badge>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {new Date(categoria.criadoEm).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {categoria.criadoPor}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategoria(categoria);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategoria(categoria);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Select onValueChange={(value: "Ativa" | "Inativa") => handleUpdateStatus(categoria.id, value)}>
                      <SelectTrigger className="w-auto h-8 px-2">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativa">Ativar</SelectItem>
                        <SelectItem value="Inativa">Desativar</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCategoria(categoria.id)}
                      disabled={categoria.totalChamados > 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredCategorias.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <FolderTree className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma categoria encontrada</p>
                  <p className="text-sm">Tente ajustar os filtros ou criar uma nova categoria</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredCategorias.length} de {categorias.length} categorias
                </p>
                {searchTerm && (
                  <Badge variant="outline" className="gap-1">
                    <Search className="h-3 w-3" />
                    Filtrado por: "{searchTerm}"
                  </Badge>
                )}
                {statusFilter !== "todas" && (
                  <Badge variant="outline">
                    Status: {statusFilter}
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
          </CardContent>
        </Card>

        {/* Dialog de Visualização */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Categoria</DialogTitle>
            </DialogHeader>
            {selectedCategoria && (
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: selectedCategoria.cor }}
                  />
                  <h3 className="text-lg font-semibold">{selectedCategoria.nome}</h3>
                  <Badge variant="outline" className={`gap-1 ${getStatusColor(selectedCategoria.status)}`}>
                    {getStatusIcon(selectedCategoria.status)}
                    {selectedCategoria.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                    <p className="mt-1">{selectedCategoria.descricao || "Sem descrição"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Total de Chamados</Label>
                      <p className="mt-1 flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedCategoria.totalChamados}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Cor</Label>
                      <p className="mt-1">{selectedCategoria.cor}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Criado em</Label>
                      <p className="mt-1 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(selectedCategoria.criadoEm).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Criado por</Label>
                      <p className="mt-1">{selectedCategoria.criadoPor}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
            </DialogHeader>
            {selectedCategoria && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-nome">Nome *</Label>
                  <Input
                    id="edit-nome"
                    value={selectedCategoria.nome}
                    onChange={(e) => setSelectedCategoria(prev => prev ? { ...prev, nome: e.target.value } : null)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-descricao">Descrição</Label>
                  <Textarea
                    id="edit-descricao"
                    value={selectedCategoria.descricao}
                    onChange={(e) => setSelectedCategoria(prev => prev ? { ...prev, descricao: e.target.value } : null)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-cor">Cor</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-cor"
                      type="color"
                      value={selectedCategoria.cor}
                      onChange={(e) => setSelectedCategoria(prev => prev ? { ...prev, cor: e.target.value } : null)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={selectedCategoria.cor}
                      onChange={(e) => setSelectedCategoria(prev => prev ? { ...prev, cor: e.target.value } : null)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedCategoria.status} 
                    onValueChange={(value: "Ativa" | "Inativa") => setSelectedCategoria(prev => prev ? { ...prev, status: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativa">Ativa</SelectItem>
                      <SelectItem value="Inativa">Inativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCategoria}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Categorias;