import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCircle,
  Info,
  Activity,
  Bell,
  Smartphone,
  FileText,
  Inbox,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDrawer({ open, onOpenChange }: ProfileDrawerProps) {
  const navigate = useNavigate();
  
  const profiles = [
    { name: "Administrador", active: true },
    { name: "Colaborador", active: false },
    { name: "Cliente", active: false },
    { name: "Parceiro", active: false },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <SheetTitle>Usuário</SheetTitle>
          
          {/* Seção Minha conta */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-lg font-semibold">RD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Rux Design</h3>
              <p className="text-sm text-muted-foreground">ruxdesign@empresa.com</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-12rem)] mt-6">
          <Tabs defaultValue="perfis" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="perfis" className="text-xs">
                <UserCircle className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="info" className="text-xs">
                <Info className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="atividades" className="text-xs">
                <Activity className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="text-xs">
                <Bell className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfis" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Meus Perfis</h3>
                {/* Layout inline para as permissões */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {profiles.map((profile) => (
                    <Badge
                      key={profile.name}
                      variant={profile.active ? "default" : "secondary"}
                      className="text-xs px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      {profile.name}
                      {profile.active && " (Ativo)"}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <ProfileLink 
                  icon={Bell} 
                  label="Notificações" 
                  count={8} 
                  onClick={() => handleNavigate('/notificacoes')}
                />
                <ProfileLink 
                  icon={Smartphone} 
                  label="Dispositivos" 
                  count={3} 
                  onClick={() => handleNavigate('/dispositivos')}
                />
                <ProfileLink 
                  icon={FileText} 
                  label="Modelos de Relatório" 
                  count={12} 
                  onClick={() => handleNavigate('/modelos-relatorio')}
                />
                <ProfileLink 
                  icon={Inbox} 
                  label="Minhas Requisições" 
                  count={5} 
                  onClick={() => handleNavigate('/requisicoes')}
                />
                <ProfileLink icon={Package} label="Minhas Retiradas" count={2} />
              </div>
            </TabsContent>

            <TabsContent value="info">
              <div className="space-y-4">
                <InfoField label="Nome" value="Rux Design" />
                <InfoField label="Email" value="ruxdesign@empresa.com" />
                <InfoField label="Departamento" value="TI" />
                <InfoField label="Cargo" value="Administrador" />
              </div>
            </TabsContent>

            <TabsContent value="atividades">
              <div className="space-y-3">
                <ActivityItem
                  action="Login no sistema"
                  time="Há 2 horas"
                />
                <ActivityItem
                  action="Criou novo chamado #1234"
                  time="Há 5 horas"
                />
                <ActivityItem
                  action="Atualizou perfil"
                  time="Há 1 dia"
                />
              </div>
            </TabsContent>

            <TabsContent value="notificacoes">
              <div className="space-y-3">
                <NotificationItem
                  title="Novo chamado atribuído"
                  message="Você foi atribuído ao chamado #1245"
                  time="Há 1 hora"
                  unread
                />
                <NotificationItem
                  title="Atualização de status"
                  message="Chamado #1234 foi resolvido"
                  time="Há 3 horas"
                />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function ProfileLink({ icon: Icon, label, count, onClick }: { icon: any; label: string; count?: number; onClick?: () => void }) {
  return (
    <div 
      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{label}</span>
      </div>
      {count !== undefined && (
        <Badge variant="secondary" className="text-xs">
          {count}
        </Badge>
      )}
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground font-medium">{label}</label>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function ActivityItem({ action, time }: { action: string; time: string }) {
  return (
    <div className="p-3 rounded-lg border border-border">
      <p className="text-sm">{action}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  );
}

function NotificationItem({
  title,
  message,
  time,
  unread,
}: {
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg border border-border ${unread ? "bg-primary/5" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{message}</p>
          <p className="text-xs text-muted-foreground mt-2">{time}</p>
        </div>
        {unread && (
          <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
        )}
      </div>
    </div>
  );
}
