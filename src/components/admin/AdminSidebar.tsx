import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Heart,
  Settings,
  LogOut,
  Building2,
  UserCheck,
  Store,
  Package,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Events", url: "/admin/events", icon: Calendar },
  { title: "Event Leads", url: "/admin/events/leads", icon: UserCheck },
  { title: "Volunteers", url: "/admin/volunteers", icon: Users },
  { title: "Donors", url: "/admin/donors", icon: User },
  { title: "Sponsors", url: "/admin/sponsors", icon: Heart },
  { title: "Items Master", url: "/admin/items", icon: Package },
  { title: "Fundraising", url: "/admin/fundraising", icon: Heart },
  { title: "Marketplace", url: "/admin/marketplace", icon: Store },
];

const settingsItems = [
  { title: "Organization", url: "/admin/organization", icon: Building2 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">ImpactHub</h2>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
