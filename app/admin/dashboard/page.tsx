import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/landing/sidebar-admin"
export default function DashboardAdminPage() {
  return (
    <SidebarProvider>   
        <AppSidebar />
      <main>
        <SidebarTrigger />
        <h1>Dashboard Admin</h1>
      </main>
    </SidebarProvider>
  )
}
