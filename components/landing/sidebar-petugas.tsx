import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import Link from "next/link"
import { Home, Users, Activity, Wrench, History, Folder } from "lucide-react"
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href="/petugas/dashboard">
                    <span><Home /></span><span>Dashboard</span>
                </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
                <Link href="/petugas/manage-pinjaman">
                    <span><History /></span><span>Pengajuan Peminjaman Alat</span>
                </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
                <Link href="/admin/management-kategori">
                    <span><Folder /></span><span>Management Kategori</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }