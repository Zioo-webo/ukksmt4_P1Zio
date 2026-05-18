// app/peminjam/[id]/kembali/route.ts
'use server'

import { getCurrentUser } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Props = {
  params: Promise<{ id: string }> // id_kegiatan dari URL
}

export async function POST(req: NextRequest, { params }: Props) {
  const { id: id_kegiatan } = await params
  const session = await getCurrentUser()

  // ✅ 1. Validasi user login
  if (!session || !session.id_user) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    // ✅ 2. Ambil data kegiatan + alat
    const kegiatan = await prisma.kegiatan.findUnique({
      where: { 
        id_kegiatan,
        id_user: session.id_user // pastikan milik user ini
      },
      include: { alat: true }
    })

    if (!kegiatan) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 })
    }

    // ✅ 3. Validasi: hanya status Approved yang bisa dikembalikan
    if (kegiatan.status !== 'Pending') {
      return NextResponse.redirect(
        new URL(`/peminjam/dashboard?error=Status tidak valid untuk Dibatalkan`, req.url)
      )
    }

    // ✅ 4. Proses pengembalian dalam transaksi (atomik)
    const updated = await prisma.$transaction(async (tx) => {
      
      // a. Update status & tanggal pengembalian
      const updateKegiatan = await tx.kegiatan.update({
        where: { id_kegiatan },
        data: {
          tgl_kegiatan: new Date(), // timestamp sekarang
          status: "Canceled",
        }
      })

      // b. Kembalikan stok alat (+1)
      await tx.alat.update({
        where: { id_alat: kegiatan.id_alat },
        data: { stok: { increment: 1 } }
      })

      // c. (Opsional) Catat log aktivitas
      await tx.logAktifitas.create({
        data: {
          id_kegiatan: updateKegiatan.id_kegiatan,
          id_user: session.id_user,
        }
      })

      return updateKegiatan
    })

    // ✅ 5. Redirect dengan pesan sukses
    const redirectUrl = new URL("/peminjam/dashboard", req.url)
    redirectUrl.searchParams.set("success", "Pengembalian berhasil diajukan")
    return NextResponse.redirect(redirectUrl)

  } catch (error) {
    console.error("Error processing pengembalian:", error)
    
    // ✅ Redirect dengan pesan error
    const redirectUrl = new URL("/peminjam/dashboard", req.url)
    redirectUrl.searchParams.set("error", "Gagal memproses pengembalian")
    return NextResponse.redirect(redirectUrl)
  }
}