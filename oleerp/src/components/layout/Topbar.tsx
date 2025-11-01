import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { ProfileDrawer } from "../profile/ProfileDrawer";
import { Breadcrumb } from "../ui/breadcrumb-custom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logoOle from "@/assets/logo-ole-erp.png";

export function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          
          <img src={logoOle} alt="Olé ERP" className="h-8 md:hidden" />
          
          <Breadcrumb />

          <div className="flex-1 flex items-center justify-center max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID, CPF/CNPJ ou Nome"
                className="pl-9 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            
            <ThemeToggle />
            
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => setIsProfileOpen(true)}
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold border-2 border-primary/30">
                R
              </div>
              <span className="text-sm font-medium hidden md:inline">Rux Design</span>
              <ChevronDown className="h-4 w-4 hidden md:inline" />
            </Button>
          </div>
        </div>
      </header>

      <ProfileDrawer open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
}
