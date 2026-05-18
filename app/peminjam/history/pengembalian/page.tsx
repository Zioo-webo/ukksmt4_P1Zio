'use server'
import { logout } from '@/app/actions/auth' // sesuaikan path import
import { prisma } from "@/lib/prisma";
import { MenubarPeminjam } from "@/components/landing/menubar-peminjam";
import Link from "next/link"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Separator } from "@/components/ui/separator"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { getCurrentUser } from "@/lib/auth"
export default async function RiwayatPeminjam() {
    const session = await getCurrentUser()
    const riwayat = await prisma.kegiatan.findMany({
        include : {alat:true},
        where : {id_user:session?.id_user, jenis_kegiatan:'Pengembalian'}
    })

  return (
    <main>
    <MenubarPeminjam/>
    <div className='container-fluid  pt-10 pb-15'>
        <Menubar className="w-100 border-hidden mx-auto">
            <MenubarMenu>
                <MenubarTrigger className="border-b-1">Filter</MenubarTrigger>
                <MenubarContent>
                <MenubarCheckboxItem>Diterima</MenubarCheckboxItem>
                <MenubarCheckboxItem>Ditolak</MenubarCheckboxItem>
                <MenubarCheckboxItem>Diproses</MenubarCheckboxItem>
                <MenubarCheckboxItem>Dibatalkan</MenubarCheckboxItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
        <br />
        <div className="flex w-full max-w-md flex-col gap-6 mx-auto">
            <Card className='px-2'>
                {riwayat.map((rwyt) => (
                <Item variant="outline" className='gap-5' key={rwyt.id_kegiatan}>
                    <ItemContent>
                    <ItemTitle>{rwyt.alat.nama_alat}</ItemTitle>
                    <ItemDescription>
                        Status : <strong>{rwyt.status}</strong>
                    </ItemDescription>
                    <ItemDescription>
                        Tgl Pengajuan : <strong>{new Date(rwyt.tgl_kegiatan).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</strong>
                    </ItemDescription>
                    <ItemDescription>
                        Tgl Peminjaman : <strong>{rwyt.peminjaman ? new Date(rwyt.peminjaman).toLocaleDateString('id-ID') : '-'}</strong> - <strong>{rwyt.pengembalian ? new Date(rwyt.pengembalian).toLocaleDateString('id-ID') : '-'}</strong>
                    </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        {rwyt.status === 'Decline' ? (
                            <Button variant="outline" size="sm" disabled>
                                Ditolak
                            </Button>
                        ) : rwyt.status === 'Pending' ? (
                            <Button variant="outline" size="sm">
                                Batalkan
                            </Button>
                        ) : rwyt.status === 'Approved' ? (
                            <Button variant="outline" size="sm">
                                Ajukan Pengembalian
                            </Button>
                        ) : (
                            <form action={`/peminjam/${rwyt.alat.id_alat}/pinjam`}>
                                <Button variant="outline" size="sm">
                                    Ajukan Ulang
                                </Button>
                            </form>
                        )}
                    </ItemActions>
                </Item>
                ))}
            </Card>
        </div>
    </div>
    </main>
  )
}

