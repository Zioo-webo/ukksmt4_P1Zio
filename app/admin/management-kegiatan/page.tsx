import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/landing/sidebar-admin"
import { columns, dataKegiatan } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma";

async function getData(): Promise<dataKegiatan[]> {
    const kegiatan = await prisma.kegiatan.findMany({
        include: {
            user: true,
            alat: true,
        },
    })
    return kegiatan.map((kegi): dataKegiatan => ({
      id_kegiatan: kegi.id_kegiatan,
      nama_user: kegi.user?.nama_user,
      nama_alat: kegi.alat?.nama_alat,
      jenis_kegiatan: kegi.jenis_kegiatan,
      tgl_kegiatan: kegi.tgl_kegiatan.toISOString(),
      peminjaman: kegi.peminjaman?.toISOString() ?? null,
      pengembalian: kegi.pengembalian?.toISOString() ?? null,
      status: kegi.status,
      pelanggaran: kegi.pelanggaran ?? "Tidak Ada Pelanggaran",
      denda: kegi.denda,
    })) as dataKegiatan[]
}

export default async function ManageUserPage() {
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