import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";
import { redirect } from "next/navigation";

type Context = {
  params: {
    id_user: string;
  };
};

export async function POST(req: Request, { params }: Context) {
  const formData = await req.formData();

  const nama_user = formData.get("nama_user") as string;
  const email = formData.get("email") as string;
  const id_role = formData.get("id_role") as string;

  await prisma.user.update({
    where: { id_user: params.id_user },
    data: { nama_user, email, id_role: id_role as unknown as RoleType },
  });

  redirect(`/admin/management-user/${params.id_user}`);
}