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
  const nama_alat = formData.get("nama_alat") as string;
  const stokString = formData.get("stok") as string;
  const id_kategori = formData.get("id_kategori") as string;

  const stok = Number(stokString);
  try {


    // Update alat
    await prisma.alat.update({
      where: { id_alat: id },
      data: {
        nama_alat,
        stok:stok,
        id_kategori,
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
  redirect("/admin/management-alat");
}