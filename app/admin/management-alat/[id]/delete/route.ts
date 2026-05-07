import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: Context) {
  try {
    const { id } = await params; // id_kategori

    await prisma.$transaction(async (tx) => {
      // 1️⃣ Ambil semua kegiatan yang terhubung ke alat ini
      const kegiatan = await tx.kegiatan.findMany({
        where: { id_alat: id },
        select: { id_kegiatan: true },
      });
      
      const kegiatanIds = kegiatan.map(k => k.id_kegiatan);

      if (kegiatanIds.length > 0) {
        // 2️⃣ Hapus LogAktifitas yang terhubung ke kegiatan-kegiatan tersebut
        await tx.logAktifitas.deleteMany({
          where: {
            id_kegiatan: { in: kegiatanIds }
          }
        });

        // 3️⃣ Hapus kegiatan-kegiatan tersebut
        await tx.kegiatan.deleteMany({
          where: {
            id_kegiatan: { in: kegiatanIds }
          }
        });
      }

      // 4️⃣ Hapus alat itu sendiri
      await tx.alat.delete({
        where: { id_alat: id },
      });
    });

    return NextResponse.redirect(new URL("/admin/management-alat", req.url));

  } catch (error) {
    console.error("Force delete kategori error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus Alat. Pastikan tidak ada aktifitas/kegiatan yang tersisa." },
      { status: 500 }
    );
  }
}