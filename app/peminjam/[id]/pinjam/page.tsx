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


type Props = {
  params: Promise<{ id: string }>; // ← Next.js 15+
};

export default async function Pinjam({ params }: Props) {
  const { id } = await params;
  const alat = await prisma.alat.findFirst({
    where: { id_alat: id }
  });

  if (!alat) {
    return <div className="p-10 text-center">Alat tidak ditemukan</div>;
  }

  // Hitung min date untuk pengembalian (hari ini / tgl peminjaman)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-lg mx-auto mt-30 shadow-lg">
      <CardHeader>
        <CardTitle>Pengajuan Peminjaman</CardTitle>
        <CardDescription>
          <h1>Tentukan Tanggal Peminjaman dan Pengembalian</h1>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={`/peminjam/${alat.id_alat}/pinjam/store`} method="POST">
          <div className="flex flex-col gap-2 grid grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="peminjaman">Tgl Peminjaman</Label>
              <input
                type="date"
                name="peminjaman"
                id="peminjaman"
                min={today}
                required
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="grid gap-2 text-center items-center">
              -
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pengembalian">Tgl Pengembalian</Label>
              <input
                type="date"
                name="pengembalian"
                id="pengembalian"
                min={today}
                required
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
          
          {/* Info stok */}
          <p className="text-sm text-muted-foreground mt-3">
            Stok tersedia: <strong>{alat.stok}</strong> unit
          </p>

          <div className="flex-col gap-2 mt-5 w-full">
            <Button type="submit" className="w-full">
              Ajukan Peminjaman
            </Button>
            <a
              href="/peminjam/dashboard"
              className="w-full bg-red-500 text-white px-20 rounded-md py-2 mt-2 inline-block text-sm 
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




