// app/peminjam/[id]/pinjam/store/route.ts
import { getCurrentUser } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Props = {
  params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Props) {
  const { id: id_alat } = await params
  const session = await getCurrentUser()

  // ✅ Validasi user login
  if (!session || !session.id_user) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const formData = await req.formData()
    const peminjamanStr = formData.get("peminjaman") as string
    const pengembalianStr = formData.get("pengembalian") as string

    // ✅ Validasi input tanggal
    if (!peminjamanStr || !pengembalianStr) {
      return NextResponse.json(
        { error: "Tanggal peminjaman dan pengembalian wajib diisi" },
        { status: 400 }
      )
    }

    const tglPeminjaman = new Date(peminjamanStr)
    const tglPengembalian = new Date(pengembalianStr)

    // ✅ Validasi: tanggal pengembalian >= tanggal peminjaman
    if (tglPengembalian < tglPeminjaman) {
      return NextResponse.json(
        { error: "Tanggal pengembalian tidak boleh sebelum tanggal peminjaman" },
        { status: 400 }
      )
    }

    // ✅ Cek alat ada dan stok cukup
    const alat = await prisma.alat.findUnique({
      where: { id_alat }
    })

    if (!alat) {
      return NextResponse.json({ error: "Alat tidak ditemukan" }, { status: 404 })
    }

    if (alat.stok <= 0) {
      return NextResponse.json({ error: "Stok alat habis" }, { status: 400 })
    }

    // ✅ Buat record kegiatan (peminjaman)
    const kegiatan = await prisma.kegiatan.create({
      data: {
        id_user: session.id_user,
        id_alat: alat.id_alat,
        jenis_kegiatan: "Peminjaman",
        peminjaman: tglPeminjaman,
        pengembalian: tglPengembalian,
        status: "Pending", 
        denda: 0,
        // pelanggaran: null, // opsional, default null
      },
    })

    // ✅ Kurangi stok alat (opsional, tergantung logic bisnis)
    await prisma.alat.update({
      where: { id_alat: alat.id_alat },
      data: { stok: { decrement: 1 } }
    })

    // ✅ Redirect ke halaman dashboard peminjam
    return NextResponse.redirect(new URL("/peminjam/dashboard", req.url))

  } catch (error) {
    console.error("Error creating peminjaman:", error)
    
    // Handle redirect dengan pesan error via search params
    const url = new URL("/peminjam/dashboard", req.url)
    url.searchParams.set("error", "Gagal mengajukan peminjaman. Silakan coba lagi.")
    return NextResponse.redirect(url)
  }
}