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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"


export default async function CreateKategori() {

    const kategori = await prisma.kategori.findMany({
    orderBy: { nama_kategori: "asc" },
  });
  return (
    <Card className="w-full max-w-sm mx-auto mt-30 shadow-lg">
      <CardHeader>
        <CardTitle>Create Alat</CardTitle>
        <CardDescription>
          Create a new Alat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={`/admin/management-alat/create/store`} method="POST">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="nama_alat">Nama Alat</Label>
              <input
                name="nama_alat"
                placeholder="Nama Alat"
                id="nama_alat"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stok">Stok Alat</Label>
              <input
                name="stok"
                placeholder="Stok Alat"
                id="stok"
                type="number"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="deskripsi">Kategori</Label>
              </div>
              <select
                name="id_kategori"
                required
              >
                {kategori.map((kat)  => (
                  <option key={kat.id_kategori} value={kat.id_kategori}>
                    {kat.nama_kategori}
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





