import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: Context) {
  try {
    const { id } = await params;

    // Gunakan Transaction untuk memastikan semua terhapus atau tidak sama sekali
    await prisma.$transaction(async (tx) => {
      
      // 1️⃣ Hapus LogAktifitas dulu (yang paling child/terbawah)
      await tx.logAktifitas.deleteMany({
        where: { id_user: id },
      });

      // 2️⃣ Hapus Kegiatan (setelah lognya hilang, ini aman)
      await tx.kegiatan.deleteMany({
        where: { id_user: id },
      });

      // 3️⃣ Baru hapus User-nya
      await tx.user.delete({
        where: { id_user: id },
      });
    });

    return NextResponse.redirect(new URL("/admin/management-user", req.url));

  } catch (error) {
    console.error("Force delete error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus user secara permanen" },
      { status: 500 }
    );
  }
}