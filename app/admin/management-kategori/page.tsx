import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/landing/sidebar-admin"
import { columns, dataKategori } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma";

async function getData(): Promise<dataKategori[]> {
    const kategori = await prisma.kategori.findMany()
    return kategori.map((kategori): dataKategori => ({
      id_kategori: kategori.id_kategori,
      nama_kategori: kategori.nama_kategori,
      deskripsi: kategori.deskripsi,
    })) as dataKategori[]
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