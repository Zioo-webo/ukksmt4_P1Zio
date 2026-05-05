"use client"

import { ColumnDef } from "@tanstack/react-table"
import {  MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DeleteButtonKategori } from "@/components/landing/delete/delete-kategori"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type dataKategori = {
  id_kategori:   String 
  nama_kategori: String
  deskripsi:     String
}

export const columns: ColumnDef<dataKategori>[] = [
  {
    accessorKey: "id_kategori",
    header: "ID Kategori",
  },
  {
    accessorKey: "nama_kategori",
    header: "Nama Kategori",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
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
              onClick={() => navigator.clipboard.writeText(payment.id_kategori)}
            >
              Copy ID Kategori
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/management-kategori/${payment.id_kategori}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteButtonKategori id={payment.id_kategori} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
