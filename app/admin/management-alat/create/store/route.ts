import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
const formData = await req.formData();
  const nama_alat = formData.get("nama_alat") as string;
  const stokString = formData.get("stok") as string;
  const id_kategori = formData.get("id_kategori") as string;

  const stok = Number(stokString);
  try {


    // Create alat
    await prisma.alat.create({
      data: {
        nama_alat,
        stok:stok,
        id_kategori,
      },
    });
    

    return NextResponse.redirect(new URL("/admin/management-alat", req.url));

  } catch (error) {
    console.error("Create Kategori error:", error);
    return NextResponse.json(
      { error: "Gagal menambah Kategori. Silakan coba lagi." },
      { status: 500 }
    );
  }
}