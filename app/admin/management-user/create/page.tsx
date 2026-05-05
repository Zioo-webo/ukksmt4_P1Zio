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


export default async function CreateUser() {

    const roles = await prisma.role.findMany({
    orderBy: { role: "asc" },
  });
  return (
    <Card className="w-full max-w-sm mx-auto mt-50 shadow-lg">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Create a new user and assign a role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={`/admin/management-user/create/store`} method="POST">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Nama User</Label>
              <input
                name="nama_user"
                defaultValue=""
                placeholder="Nama User"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email User</Label>
              </div>
                    <input
                      name="email"
                      type="email"
                      defaultValue=""
                      placeholder="Email User"
                      required
                    />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password User</Label>
              </div>
                    <input
                      name="password"
                      type="password"
                      defaultValue=""
                      placeholder="Password User"
                      required
                    />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="id_role">Role</label>
              </div>
                    <select name="id_role" required>
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
          <div className="flex-col gap-2 mt-5 w-full">
            <Button type="submit" className="w-full">
              Create
            </Button>
            <a
              href="/admin/management-user"
              className="w-full bg-red-500 text-white px-20 rounded-md py-1 mt-2 inline-block text-sm 
                          hover:bg-red-600 transition font-medium text-center"
            >
              Batal
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


