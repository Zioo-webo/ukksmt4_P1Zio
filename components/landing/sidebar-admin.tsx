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
                <Link href="/admin/dashboard">
                    <span><Home /></span><span>Dashboard</span>
                </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
                <Link href="/admin/management-user">
                    <span><Users /></span><span>Management User</span>
                </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
                <Link href="/admin/management-alat">
                    <span><Wrench /></span><span>Management Alat</span>
                </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
                <Link href="/admin/management-kegiatan">
                    <span><Activity /></span><span>Management Kegiatan</span>
                </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
                <Link href="/admin/management-log-aktifitas">
                    <span><History /></span><span>Management Log Aktifitas</span>
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