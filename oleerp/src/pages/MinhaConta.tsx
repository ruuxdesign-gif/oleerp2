import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Key,
  Globe,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface UsuarioInfo {
  id: string;
  nome: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  documento: string;
  dataRegistro: string;
  dataNascimento: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
  };
  empresa: string;
  cargo: string;
  departamento: string;
  avatar: string;
  status: "Ativo" | "Inativo";
  fusoHorario: string;
  idioma: string;
  tema: "Claro" | "Escuro" | "Sistema";
  notificacoes: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const MinhaConta = () => {
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  
  const [usuario, setUsuario] = useState<UsuarioInfo>({
    id: "1",
    nome: "Murilo Fernando de Oliveira",
    nomeCompleto: "Murilo Fernando de Oliveira",
    email: "murilo@oleerp.com.br",
    telefone: "(11) 99999-9999",
    documento: "123.456.789-00",
    dataRegistro: "23/07/1978",
    dataNascimento: "15/03/1985",
    endereco: {
      cep: "01234-567",
      logradouro: "Avenida Marechal Castelo Branco",
      numero: "261",
      complemento: "Sala 1001",
      bairro: "Santa Catarina",
      cidade: "São José",
      estado: "SC",
      pais: "Brasil"
    },
    empresa: "Olé ERP",
    cargo: "Desenvolvedor",
    departamento: "Tecnologia",
    avatar: "/placeholder.svg",
    status: "Ativo",
    fusoHorario: "America/Sao_Paulo - Horário de Brasília",
    idioma: "Português (Brasil)",
    tema: "Sistema",
    notificacoes: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [usuarioEditado, setUsuarioEditado] = useState<UsuarioInfo>(usuario);

  const handleSalvar = async () => {
    setCarregando(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsuario(usuarioEditado);
      setEditando(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => {
    setUsuarioEditado(usuario);
    setEditando(false);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUsuarioEditado(prev => {
        const parentValue = prev[parent as keyof UsuarioInfo];
        return {
          ...prev,
          [parent]: {
            ...(typeof parentValue === 'object' && parentValue !== null ? parentValue : {}),
            [child]: value
          }
        };
      });
    } else {
      setUsuarioEditado(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minha Conta</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
          <div className="flex gap-2">
            {editando ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancelar}
                  disabled={carregando}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSalvar}
                  disabled={carregando}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {carregando ? "Salvando..." : "Salvar"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditando(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="informacoes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="endereco">Endereço</TabsTrigger>
            <TabsTrigger value="preferencias">Preferências</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          </TabsList>

          {/* Aba Informações */}
          <TabsContent value="informacoes" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card do Avatar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Foto do Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={usuario.avatar} />
                      <AvatarFallback className="text-2xl">
                        {usuario.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {editando && (
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Alterar Foto
                      </Button>
                    )}
                    <Badge variant={usuario.status === "Ativo" ? "default" : "secondary"}>
                      {usuario.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Dados Pessoais */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      {editando ? (
                        <Input
                          id="nome"
                          value={usuarioEditado.nomeCompleto}
                          onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm font-medium">{usuario.nomeCompleto}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      {editando ? (
                        <Input
                          id="email"
                          type="email"
                          value={usuarioEditado.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {usuario.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      {editando ? (
                        <Input
                          id="telefone"
                          value={usuarioEditado.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {usuario.telefone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documento">Documento</Label>
                      <p className="text-sm font-medium">{usuario.documento}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nascimento">Data de Nascimento</Label>
                      {editando ? (
                        <Input
                          id="nascimento"
                          type="date"
                          value={usuarioEditado.dataNascimento.split('/').reverse().join('-')}
                          onChange={(e) => handleInputChange('dataNascimento', e.target.value.split('-').reverse().join('/'))}
                        />
                      ) : (
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {usuario.dataNascimento}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registro">Data de Registro</Label>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {usuario.dataRegistro}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Informações Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informações Profissionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa</Label>
                    {editando ? (
                      <Input
                        id="empresa"
                        value={usuarioEditado.empresa}
                        onChange={(e) => handleInputChange('empresa', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.empresa}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    {editando ? (
                      <Input
                        id="cargo"
                        value={usuarioEditado.cargo}
                        onChange={(e) => handleInputChange('cargo', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.cargo}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento</Label>
                    {editando ? (
                      <Input
                        id="departamento"
                        value={usuarioEditado.departamento}
                        onChange={(e) => handleInputChange('departamento', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.departamento}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Endereço */}
          <TabsContent value="endereco">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    {editando ? (
                      <Input
                        id="cep"
                        value={usuarioEditado.endereco.cep}
                        onChange={(e) => handleInputChange('endereco.cep', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.cep}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logradouro">Logradouro</Label>
                    {editando ? (
                      <Input
                        id="logradouro"
                        value={usuarioEditado.endereco.logradouro}
                        onChange={(e) => handleInputChange('endereco.logradouro', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.logradouro}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    {editando ? (
                      <Input
                        id="numero"
                        value={usuarioEditado.endereco.numero}
                        onChange={(e) => handleInputChange('endereco.numero', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.numero}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    {editando ? (
                      <Input
                        id="complemento"
                        value={usuarioEditado.endereco.complemento}
                        onChange={(e) => handleInputChange('endereco.complemento', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.complemento}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    {editando ? (
                      <Input
                        id="bairro"
                        value={usuarioEditado.endereco.bairro}
                        onChange={(e) => handleInputChange('endereco.bairro', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.bairro}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    {editando ? (
                      <Input
                        id="cidade"
                        value={usuarioEditado.endereco.cidade}
                        onChange={(e) => handleInputChange('endereco.cidade', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.cidade}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    {editando ? (
                      <Input
                        id="estado"
                        value={usuarioEditado.endereco.estado}
                        onChange={(e) => handleInputChange('endereco.estado', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.estado}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    {editando ? (
                      <Input
                        id="pais"
                        value={usuarioEditado.endereco.pais}
                        onChange={(e) => handleInputChange('endereco.pais', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{usuario.endereco.pais}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Preferências */}
          <TabsContent value="preferencias">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Preferências do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fusoHorario">Fuso Horário</Label>
                    {editando ? (
                      <Select
                        value={usuarioEditado.fusoHorario}
                        onValueChange={(value) => handleInputChange('fusoHorario', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">America/Sao_Paulo - Horário de Brasília</SelectItem>
                          <SelectItem value="America/New_York">America/New_York - Horário de Nova York</SelectItem>
                          <SelectItem value="Europe/London">Europe/London - Horário de Londres</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium">{usuario.fusoHorario}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idioma">Idioma</Label>
                    {editando ? (
                      <Select
                        value={usuarioEditado.idioma}
                        onValueChange={(value) => handleInputChange('idioma', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Português (Brasil)">Português (Brasil)</SelectItem>
                          <SelectItem value="English (US)">English (US)</SelectItem>
                          <SelectItem value="Español">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium">{usuario.idioma}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tema">Tema</Label>
                    {editando ? (
                      <Select
                        value={usuarioEditado.tema}
                        onValueChange={(value) => handleInputChange('tema', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sistema">Sistema</SelectItem>
                          <SelectItem value="Claro">Claro</SelectItem>
                          <SelectItem value="Escuro">Escuro</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium">{usuario.tema}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Segurança */}
          <TabsContent value="seguranca">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Segurança da Conta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Alterar Senha</h4>
                      <p className="text-sm text-muted-foreground">
                        Última alteração há 30 dias
                      </p>
                    </div>
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Alterar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="outline">
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MinhaConta;