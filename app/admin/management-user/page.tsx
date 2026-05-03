import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/landing/sidebar-admin"
import { columns, dataUser } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma";

async function getData(): Promise<dataUser[]> {
    const users = await prisma.user.findMany({
        include: {
            role: true,
        },
    })
    return users.map((user): dataUser => ({
      id_user: user.id_user,
      nama_user: user.nama_user,
      email: user.email,
      role: user.role?.role ?? "admin",
    })) as dataUser[]
  }

export default async function ManageUserPage() {
    const data = await getData()
    return (
      <SidebarProvider>   
          <AppSidebar />
        <main>
          <SidebarTrigger />
          <h1>Management User</h1>
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarProvider>
    )
  }