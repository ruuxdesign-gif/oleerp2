import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  FolderTree,
  MessageSquare,
  ShoppingCart,
  DollarSign,
  Package,
  Briefcase,
  Settings,
  Terminal,
  ChevronRight,
  Users,
  FileText,
  Receipt,
  TrendingUp,
  BarChart3,
  Target,
  CreditCard,
  Wallet,
  ArrowUpDown,
  PieChart,
  FileBarChart,
} from "lucide-react";
import logoOle from "@/assets/logo-ole-erp.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Chamados",
    icon: Ticket,
    items: [
      { title: "Dashboard", url: "/chamados", icon: LayoutDashboard },
      { title: "Meus Chamados", url: "/meus-chamados", icon: Ticket },
      { title: "Categorias", url: "/categorias", icon: FolderTree },
      { title: "Assuntos", url: "/assuntos", icon: MessageSquare },
    ],
  },
  {
    title: "Comercial",
    icon: ShoppingCart,
    items: [
      { title: "Dashboard", url: "/dashboard-comercial", icon: BarChart3 },
      { title: "CRM", url: "/crm", icon: Target },
      { title: "Clientes", url: "/clientes", icon: Users },
      { title: "Propostas", url: "/propostas-comerciais", icon: FileText },
      { title: "Contratos", url: "/contratos", icon: Receipt },
      { title: "Vendas & Faturamento", url: "/vendas-faturamento", icon: TrendingUp },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    items: [
      { title: "Dashboard", url: "/dashboard-financeiro", icon: BarChart3 },
      { title: "Contas a Receber", url: "/contas-receber", icon: CreditCard },
      { title: "Contas a Pagar", url: "/contas-pagar", icon: Wallet },
      { title: "Fluxo de Caixa", url: "/fluxo-caixa", icon: ArrowUpDown },
      { title: "Faturamento por Serviços", url: "/faturamento-servicos", icon: PieChart },
      { title: "Relatórios Financeiros", url: "/relatorios-financeiros", icon: FileBarChart },
    ],
  },
  {
    title: "Produtos",
    url: "/produtos",
    icon: Package,
  },
  {
    title: "Serviços",
    url: "/servicos",
    icon: Briefcase,
  },
  {
    title: "Administrativo",
    url: "/administrativo",
    icon: Settings,
  },
  {
    title: "Sistema",
    url: "/sistema",
    icon: Terminal,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { open } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <SidebarContent className="pt-6 bg-sidebar">
        <div className="px-4 mb-6 flex justify-center">
          <img 
            src={logoOle} 
            alt="Olé ERP" 
            className={`transition-all ${open ? "h-12" : "h-10"}`}
          />
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              if (item.items) {
                const hasActiveChild = item.items.some(child => isActive(child.url));
                const isOpen = openGroups.includes(item.title);

                return (
                  <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className={hasActiveChild ? "bg-sidebar-accent" : ""}>
                          <item.icon className="h-4 w-4" />
                          {open && (
                            <>
                              <span>{item.title}</span>
                              <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.url}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive ? "bg-sidebar-accent font-medium" : ""
                                  }
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  {open && <span>{subItem.title}</span>}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url!}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent font-medium" : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
