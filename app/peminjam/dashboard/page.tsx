'use server'
import { logout } from '@/app/actions/auth' // sesuaikan path import
import { prisma } from "@/lib/prisma";
import { MenubarPeminjam } from "@/components/landing/menubar-peminjam";
import Link from "next/link"

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

export default async function DashboardPeminjam() {
  const alat= await prisma.alat.findMany({
    include: {kategori: true}
  });

  return (
    <main>
    <MenubarPeminjam/>
    <div className='container-fluid bg-blue-500 pt-10 pb-15'>
      <Carousel className="w-[70rem] ms-30">
        <CarouselContent className="-ml-1 ">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3 pl-1 lg:basis-1/5 shadow-2xl">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    <div className='content text-center pt-10'>
      <h1 className='text-[25px] font-bold'>List Alat</h1>
      <div className='grid  grid-cols-4 mx-5 gap-5 mt-5'>
        {alat.map((alats) => (
        <Card className="relative mx-auto w-70 pt-0" key={alats.id_alat}>
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <img
            src={`/images/${alats.gambar}`}
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
          <CardHeader>
            <CardAction>
                  {alats.stok > 0 ? (
                    <Badge variant="secondary">Tersedia</Badge>
                  ) : (
                    <Badge variant="destructive">Habis</Badge>
                  )}
                </CardAction>
            <CardTitle>{alats.nama_alat}</CardTitle>
            <CardDescription>
              {alats.kategori.nama_kategori}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            {alats.stok > 0 ? (
                    <Link className="w-80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={`/peminjam/${alats.id_alat}/pinjam`}>Ajukan Peminjaman</Link>
                  ) : (
                    <Link className="w-80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href="">Ajukan Peminjaman</Link>
                  )}
          </CardFooter>
        </Card>
        ))}
      </div>
    </div>
    </main>
  )
}
