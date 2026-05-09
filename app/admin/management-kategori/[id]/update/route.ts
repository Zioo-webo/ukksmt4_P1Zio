import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Context) {
  // ✅ Resolve params di luar try-catch
  const { id } = await params;
  
  const formData = await req.formData();
  const nama_kategori = formData.get("nama_kategori") as string;
  const deskripsi = formData.get("deskripsi") as string;



  try {
    // 3. Cek Kategori
    const existingKategori = await prisma.kategori.findFirst({ where: { nama_kategori } });
    if (existingKategori) {
      return NextResponse.json(
        { error: "Kategori sudah terdaftar" },
        { status: 409 }
      );
    }

    // Update user
    await prisma.kategori.update({
      where: { id_kategori: id },
      data: {
        nama_kategori,
        deskripsi,
      },
    });
    
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }

  // ✅ redirect DI LUAR try-catch
  redirect("/admin/management-kategori");
}