import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/landing/sidebar-petugas"
import { columns, dataKegiatan } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {UserRound, Archive} from "lucide-react"

async function getData(): Promise<dataKegiatan[]> {
    const kegiatan = await prisma.kegiatan.findMany({
        include: {
            user: true,
            alat: true,
        },
        where: {
          jenis_kegiatan:"Peminjaman"
        }
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
    const pending =  prisma.kegiatan.count({
      where: {status: "Pending", jenis_kegiatan:"Peminjaman"}
    });
    const approved =  prisma.kegiatan.count({
      where: {status: "Approved"}
    });
    const declined =  prisma.kegiatan.count({
      where: {status: "Declined"}
    });
    return (
      <SidebarProvider>   
          <AppSidebar />
        <main>
          <SidebarTrigger />
          <div className="container-fluid py-5 shadow-2xl w-full bg-purple-300">
          <h1 className=" text-[30px] font-bold ms-5 mt-5">Dashboard Petugas</h1>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-10 ms-5 mt-10 h-50 me-5">
                <Card size="sm" className="mx-auto w-60 max-w-sm border-0  hover:shadow-2xl transition duration-500">
                  <CardHeader className="">
                    <CardTitle className="grid grid-cols-2 md:grid-cols-12">
                      <h1 className="mt-3 text-2xl font-bold col-span-10">Pending</h1>
                      <UserRound size="40" className=" mt-3 font-bold text-purple-500 rounded border-black bg-purple-200 p-1 " />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-10">
                    <p className=" text-[50px] font-bold ms-5">
                      {pending}
                    </p>
                  </CardContent>
                </Card>
                <Card size="sm" className="mx-auto w-60 max-w-sm border-0  hover:shadow-2xl transition duration-500">
                  <CardHeader className="">
                    <CardTitle className="grid grid-cols-2 md:grid-cols-12">
                      <h1 className="mt-3 text-2xl font-bold col-span-10">Categories</h1>
                      <Archive  size="40" className=" mt-3 font-bold text-purple-500 rounded border-black bg-purple-200 p-1 " />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-10">
                    <p className=" text-[50px] font-bold ms-5">
                      
                    </p>
                  </CardContent>
                </Card>
                <Card size="sm" className="mx-auto w-60 max-w-sm border-0  hover:shadow-2xl transition duration-500">
                  <CardHeader className="">
                    <CardTitle className="grid grid-cols-2 md:grid-cols-12">
                      <h1 className="mt-3 text-2xl font-bold col-span-10">Stuff</h1>
                      <UserRound size="40" className=" mt-3 font-bold text-purple-500 rounded border-black bg-purple-200 p-1 " />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-10">
                    <p className=" text-[50px] font-bold ms-5">
                      
                    </p>
                  </CardContent>
                </Card>
                <Card size="sm" className="mx-auto w-60 max-w-sm border-0  hover:shadow-2xl transition duration-500">
                  <CardHeader className="">
                    <CardTitle className="grid grid-cols-2 md:grid-cols-12">
                      <h1 className="mt-3 text-2xl font-bold col-span-10">User </h1>
                      <UserRound size="40" className=" mt-3 font-bold text-purple-500 rounded border-black bg-purple-200 p-1 " />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-10">
                    <p className=" text-[50px] font-bold ms-5">
                      
                    </p>
                  </CardContent>
                </Card>
              </div>
              <DataTable columns={columns} data={data} />
            </div>  
        </main>
      </SidebarProvider>
    )
  }