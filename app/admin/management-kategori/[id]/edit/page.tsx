import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  params: Promise<{ id: string }>; // ← Next.js 15+
};

export default async function EditUser({ params }: Props) {
  const { id } = await params; // ← Await params

  const user = await prisma.user.findFirst({
    where: { id_user: id },
    include: { role: true }, // ← Include role untuk tahu role saat ini
  });

  if (!user) {
    return <div>User not found</div>;
  }

  // Fetch semua role untuk dropdown
  const roles = await prisma.role.findMany();

  return (
    <Card className="w-full max-w-sm mx-auto mt-50 shadow-lg">
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
        <CardDescription>
          Update user details and role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={`/admin/management-user/${user.id_user}/update`} method="POST">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                name="nama_user"
                defaultValue={user.nama_user ?? ""}
                placeholder="Nama User"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
                    <input
                      name="email"
                      type="email"
                      defaultValue={user.email ?? ""}
                      placeholder="Email User"
                      required
                    />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="id_role">Role</label>
              </div>
                     <select name="id_role" defaultValue={user.id_role ?? ""} required>
                      {roles.map((role) => (
                        <option key={role.id_role} value={role.role}>
                          {role.role === "admin" 
                            ? "Administrator Sistem" 
                            : role.role === "petugas" 
                            ? "Petugas" 
                            : "Peminjam"}
                        </option>
                      ))}
                    </select>
            </div>
          </div>
          <div className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Update
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


