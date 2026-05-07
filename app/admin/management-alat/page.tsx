import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/landing/sidebar-admin"
import { columns, dataAlat } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma";

async function getData(): Promise<dataAlat[]> {
    const alat = await prisma.alat.findMany({
        include: {
            kategori: true,
        },
    })
    return alat.map((alat): dataAlat => ({
      id_alat: alat.id_alat,
      nama_alat: alat.nama_alat,
      nama_kategori: alat.kategori?.nama_kategori,
      stok: alat.stok,
    })) as dataAlat[]
  }

export default async function ManageKategoriPage() {
    const data = await getData()
    return (
      <SidebarProvider>   
          <AppSidebar />
        <main>
          <SidebarTrigger />
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarProvider>
    )
  }