"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as React from "react"
import {
  ColumnDef, ColumnFiltersState, SortingState, flexRender,
  getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { dataKegiatan, statusConfig } from "./columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Declined", value: "Declined" },
  { label: "Canceled", value: "Canceled" },
]

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [activeStatus, setActiveStatus] = React.useState("")
  const [selectedRow, setSelectedRow] = React.useState<dataKegiatan | null>(null)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
    // Teruskan fungsi ke meta agar bisa diakses di columns.tsx
    meta: { onDetail: (row: dataKegiatan) => setSelectedRow(row) }
  })

  const handleStatusFilter = (value: string) => {
    setActiveStatus(value)
    table.getColumn("status")?.setFilterValue(value === "" ? undefined : [value])
  }

  return (
    <div className="container mx-auto overflow-x-auto mt-10 px-6 pt-10">
      <h1 className="text-2xl font-bold mb-4">Daftar Pengajuan</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
        <Input
          placeholder="Filter Kegiatan..."
          value={(table.getColumn("id_kegiatan")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("id_kegiatan")?.setFilterValue(event.target.value)}
          className="max-w-sm border-black"
        />
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleStatusFilter(f.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                activeStatus === f.value
                  ? "bg-purple-700 text-white border-purple-700 "
                  : "bg-white text-gray-600 border-none hover:bg-gray-100 shadow-2xl"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Flex: Tabel di kiri, Card Detail di kanan */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Bagian Tabel */}
        <div className="flex-1 overflow-hidden rounded-md border shadow-2xl bg-white w-[40rem] transition-all duration-300">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Bagian Detail Card (Muncul hanya jika ada row yang dipilih) */}
        {selectedRow && (
          <div className="lg:w-96 w-full lg:sticky top-24 transition-all duration-300">
            <Card className="shadow-lg border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold">Detail Peminjaman</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedRow(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  {[
                    ["ID Kegiatan", selectedRow.id_kegiatan],
                    ["Nama User", selectedRow.nama_user],
                    ["Nama Alat", selectedRow.nama_alat],
                    ["Tanggal Pengajuan", new Date(selectedRow.tgl_kegiatan).toLocaleDateString("id-ID")],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-gray-100 pb-1">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium text-right">{value}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-500">Status</span>
                    <Badge className={statusConfig[selectedRow.status]?.className || "bg-gray-100 text-gray-700"}>
                      {selectedRow.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-500">Waktu Pinjam</span>
                    <span className="text-right">{selectedRow.peminjaman ? new Date(selectedRow.peminjaman).toLocaleString("id-ID") : "-"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-500">Waktu Kembali</span>
                    <span className="text-right">{selectedRow.pengembalian ? new Date(selectedRow.pengembalian).toLocaleString("id-ID") : "-"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                { selectedRow.status == "Pending" ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="lg" className="w-42 h-10 mx-auto bg-green-300 text-green-700 hover:text-green-200 hover:bg-green-700  transition duration-500 ">
                      Approve
                    </Button>
                    <Button size="lg" className="w-42 h-10 mx-auto bg-red-300 text-red-700 hover:bg-red-700 hover:text-red-200 transition duration-500 ">
                      Decline
                    </Button>
                  </div>
                  ):(
                    <Button size="lg" className="w-full h-10 mx-auto bg-purple-500 hover:bg-purple-400 transition duration-500 ">
                      Cetak
                    </Button>
                  )
                }
              </CardFooter>
            </Card>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}