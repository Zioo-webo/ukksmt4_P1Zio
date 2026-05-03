"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Context = {
  params: {
    id_user: string;
  };
};

export async function POST(_: Request, { params }: Context) {
  await prisma.user.delete({
    where: { id_user: params.id_user },
  });

  redirect("/admin/management-user");
}