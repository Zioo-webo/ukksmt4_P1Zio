"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

export type dataKegiatan = {
  id_kegiatan: string
  nama_user: string
  nama_alat: string
  jenis_kegiatan: string
  tgl_kegiatan: string
  peminjaman: string | null
  pengembalian: string | null
  status: string
  pelanggaran: string | null
  denda: number
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


const statusConfig: Record<string, { label: string; className: string }> = {
  Declined: {
    label: "Declined",
    className: "bg-red-100 text-red-800 hover:bg-red-100 border-0",
  },
  Pending: {
    label: "Pending",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-0",
  },
  Canceled: {
    label: "Canceled",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-0",
  },
  Approved: {
    label: "Approved",
    className: "bg-green-100 text-green-800 hover:bg-green-100 border-0",
  },
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
    accessorKey: "tgl_kegiatan",
    header: "Tanggal Kegiatan",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tgl_kegiatan"))
      return date.toLocaleDateString("id-ID")
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    // filterFn ini yang membuat filter pills di data-table bisa bekerja
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    cell: ({ row }) => {
      const status: string = row.getValue("status")
      const cfg = statusConfig[status] ?? {
        label: status,
        className: "bg-gray-100 text-gray-700 border-0",
      }

      return (
        <Badge variant="outline" className={cfg.className}>
          {cfg.label}
        </Badge>
      )
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
              <Link href={`/admin/management-kegiatan/${payment.id_kegiatan}/detail`}>
                Detail
              </Link>
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