import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Context) {
  // ✅ Resolve params di luar try-catch
  const { id } = await params;
  
  const formData = await req.formData();
  const nama_user = formData.get("nama_user") as string;
  const email = formData.get("email") as string;
  const roleValue = formData.get("id_role") as string;

  // Validasi
  if (!["admin", "petugas", "peminjam"].includes(roleValue)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  try {
    // Cari Role
    const role = await prisma.role.findFirst({
      where: { role: roleValue as RoleType },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Update user
    await prisma.user.update({
      where: { id_user: id },
      data: {
        nama_user,
        email,
        id_role: role.id_role,
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
  redirect("/admin/management-user");
}