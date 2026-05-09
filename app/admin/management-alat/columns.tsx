"use client"

import { ColumnDef } from "@tanstack/react-table"
import {  MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { DeleteButtonAlat } from "@/components/landing/delete/delete-alat"

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
export type dataAlat = {
  id_alat:   string 
  nama_alat: string
  nama_kategori:     string
  stok: number
}

export const columns: ColumnDef<dataAlat>[] = [
  {
    accessorKey: "id_alat",
    header: "ID Alat",
  },
  {
    accessorKey: "nama_alat",
    header: "Nama Alat",
  },
  {
    accessorKey: "nama_kategori",
    header: "Kategori",
  },
  {
    accessorKey: "stok",
    header: "Stok",
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
              onClick={() => navigator.clipboard.writeText(payment.id_alat)}
            >
              Copy ID Kategori
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/management-alat/${payment.id_alat}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteButtonAlat id={payment.id_alat} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
