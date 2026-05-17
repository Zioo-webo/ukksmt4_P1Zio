import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, { params }: Context) {
  try {
    const { id } = await params;

    // ✅ Gunakan findUnique untuk primary key
    const kegiatan = await prisma.kegiatan.findUnique({
      where: { id_kegiatan: id },
    });

    // ✅ Cek jika data tidak ditemukan
    if (!kegiatan) {
      return NextResponse.json(
        { error: "Kegiatan tidak ditemukan" },
        { status: 404 }
      );
    }

    // ✅ Samakan typo status + gunakan JSON response, bukan redirect
    if (kegiatan.status === "Approved") { // atau "Aprroved" sesuai database
      return NextResponse.json(
        { error: "Tidak dapat menghapus kegiatan dengan status Approved" },
        { status: 400 }
      );
    }

    // ✅ Transaction untuk atomic operation
    await prisma.$transaction(async (tx) => {
      // 1️⃣ Hapus child table dulu
      await tx.logAktifitas.deleteMany({
        where: { id_kegiatan: id },
      });

      // 2️⃣ Hapus parent
      await tx.kegiatan.delete({
        where: { id_kegiatan: id },
      });
    });

    // ✅ Return JSON, frontend yang handle redirect
    return NextResponse.json(
      { success: true, message: "Kegiatan berhasil dihapus" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete kegiatan error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kegiatan secara permanen" },
      { status: 500 }
    );
  }
}