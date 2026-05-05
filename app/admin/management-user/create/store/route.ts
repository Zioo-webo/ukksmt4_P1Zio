import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const nama_user = formData.get("nama_user") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const roleValue = formData.get("id_role") as string;

    // 1. Validasi Input Kosong
    if (!nama_user || !email || !password || !roleValue) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // 2. Validasi Role
    if (!["admin", "petugas", "peminjam"].includes(roleValue)) {
      return NextResponse.json(
        { error: "Role tidak valid" },
        { status: 400 }
      );
    }

    // 3. Cek Email Unik
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // 4. Cari ID Role berdasarkan enum value
    const role = await prisma.role.findFirst({
      where: { role: roleValue as RoleType },
    });
    if (!role) {
      return NextResponse.json(
        { error: "Role tidak ditemukan di database" },
        { status: 404 }
      );
    }

    // 5. Buat User Baru
    // ⚠️ CATATAN: Di production, password HARUS di-hash dulu (contoh: bcrypt)
    await prisma.user.create({
      data: {
        nama_user,
        email,
        password, 
        id_role: role.id_role,
      },
    });

    // 6. Redirect ke halaman list setelah sukses
    return NextResponse.redirect(new URL("/admin/management-user", req.url));

  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Gagal menambah user. Silakan coba lagi." },
      { status: 500 }
    );
  }
}