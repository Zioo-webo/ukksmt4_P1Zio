"use client"

import { ColumnDef } from "@tanstack/react-table"
import {  MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteButtonKegiatan } from "@/components/landing/delete/delete-kegiatan"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type dataKegiatan = {
  id_kegiatan: string;
  nama_user: string
  nama_alat: string
  jenis_kegiatan: string;
  tgl_kegiatan: string; // datetime(3)
  peminjaman: string | null; // datetime(3), bisa NULL
  pengembalian: string | null; // datetime(3), bisa NULL
  status: string
  pelanggaran: string | null; // varchar, bisa NULL
  denda: number; // double

}
export type dataUser = {
  id_user: string
  nama_user: string
  email: string
  role: string
}
export type dataAlat = {
  id_alat: string
  nama_alat: string
  id_kategori: string
  stok: number
}

export const columns: ColumnDef<dataKegiatan>[] = [
  {
    accessorKey: "id_kegiatan",
    header: "ID Kegiatan",
  },
  {
    accessorKey: "nama_user",
    header: "Nama User",
  },
  {
    accessorKey: "nama_alat",
    header: "Nama Alat",
  },
  {
    accessorKey: "jenis_kegiatan",
    header: "Jenis Kegiatan",
  },
  {
    accessorKey: "tgl_kegiatan",
    header: "Tanggal Kegiatan",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tgl_kegiatan"));
      return date.toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "peminjaman",
    header: "Waktu Peminjaman",
    cell: ({ row }) => {
      const val = row.getValue("peminjaman") as string;
      return val ? new Date(val).toLocaleString("id-ID") : "-";
    },
  },
  {
    accessorKey: "pengembalian",
    header: "Waktu Pengembalian",
    cell: ({ row }) => {
      const val = row.getValue("pengembalian") as string;
      return val ? new Date(val).toLocaleString("id-ID") : "-";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "pelanggaran",
    header: "Pelanggaran",
  },
  {
    accessorKey: "denda",
    header: "Denda",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("denda"));
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id_kegiatan)}
            >
              Copy ID Kegiatan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/management-kegiatan/${payment.id_kegiatan}/detail`}>Detail</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteButtonKegiatan id={payment.id_kegiatan} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
