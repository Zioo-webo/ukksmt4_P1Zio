import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: Context) {
  try {
    const { id } = await params; // id_kategori

    await prisma.$transaction(async (tx) => {
      
      // 1️⃣ Ambil semua ID alat yang ada di kategori ini
      const alats = await tx.alat.findMany({
        where: { id_kategori: id },
        select: { id_alat: true },
      });
      
      const alatIds = alats.map(a => a.id_alat);

      if (alatIds.length > 0) {
        // 2️⃣ Hapus LogAktifitas yang terhubung ke Kegiatan dari Alat-alat ini
        await tx.logAktifitas.deleteMany({
          where: {
            id_kegiatan: {
              in: await tx.kegiatan.findMany({
                where: { id_alat: { in: alatIds } },
                select: { id_kegiatan: true },
              }).then(k => k.map(kg => kg.id_kegiatan))
            }
          }
        });

        // 3️⃣ Hapus Kegiatan yang terhubung ke Alat-alat di kategori ini
        await tx.kegiatan.deleteMany({
          where: { id_alat: { in: alatIds } },
        });
      }

      // 4️⃣ Hapus semua Alat di kategori ini
      await tx.alat.deleteMany({
        where: { id_kategori: id },
      });

      // 5️⃣ Terakhir, hapus Kategori-nya
      await tx.kategori.delete({
        where: { id_kategori: id },
      });
    });

    return NextResponse.redirect(new URL("/admin/management-kategori", req.url));

  } catch (error) {
    console.error("Force delete kategori error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kategori. Pastikan tidak ada alat/kegiatan yang tersisa." },
      { status: 500 }
    );
  }
}