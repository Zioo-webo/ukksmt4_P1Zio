import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id_user: string;
  };
};

export default async function EditUser({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id_user: params.id_user },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <form action={`/admin/management-user/${user.id_user}/update`} method="post">
      <h1>Edit User</h1>

      <input
        name="nama_user"
        defaultValue={user.nama_user ?? ""}
        placeholder="Nama User"
      />

      <input
        name="email"
        defaultValue={user.email ?? ""}
        placeholder="Email User"
      />

      < label htmlFor="id_role">Role</label>
      < select name="id_role" defaultValue={user.id_role ?? ""}>
        <option value="admin">Administrator Sistem</option>
        <option value="petugas">Petugas</option>
        <option value="peminjam">Peminjam</option>
        </select>

      <button type="submit">Update</button>
    </form>
  );
}