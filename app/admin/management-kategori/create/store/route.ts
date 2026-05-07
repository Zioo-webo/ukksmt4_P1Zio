import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const nama_kategori = formData.get("nama_kategori") as string;
    const deskripsi = formData.get("deskripsi") as string;

    // 1. Validasi Input Kosong
    if (!nama_kategori || !deskripsi) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }


    // 3. Cek Kategori
    const existingKategori = await prisma.Kategori.findFirst({ where: { nama_kategori } });
    if (existingKategori) {
      return NextResponse.json(
        { error: "Kategori sudah terdaftar" },
        { status: 409 }
      );
    }



    // 5. Buat Kategori Baru
    // ⚠️ CATATAN: Di production, password HARUS di-hash dulu (contoh: bcrypt)
    await prisma.kategori.create({
      data: {
        nama_kategori,
        deskripsi,
      },
    });

    // 6. Redirect ke halaman list setelah sukses
    return NextResponse.redirect(new URL("/admin/management-kategori", req.url));

  } catch (error) {
    console.error("Create Kategori error:", error);
    return NextResponse.json(
      { error: "Gagal menambah Kategori. Silakan coba lagi." },
      { status: 500 }
    );
  }
}