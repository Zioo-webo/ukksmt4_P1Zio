"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [activeStatus, setActiveStatus] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleStatusFilter = (value: string) => {
    setActiveStatus(value)
    if (value === "") {
      table.getColumn("status")?.setFilterValue(undefined)
    } else {
      table.getColumn("status")?.setFilterValue([value])
    }
  }

  return (
    <div className="container-fluid overflow-x-auto mt-10 bg-gray-200 px-30 pt-10 ">
      <h1 className="">Daftar Pengajuan</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
        {/* Search — tetap filter id_kegiatan seperti semula */}
        <Input
          placeholder="Filter Kegiatan..."
          value={(table.getColumn("id_kegiatan")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id_kegiatan")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-black"
        />

        {/* Filter status pills — TAMBAHAN BARU */}
        <div className="flex flex-wrap ">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleStatusFilter(f.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                activeStatus === f.value
                  ? "bg-sky-700 text-white border-sky-700"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border w-200 border-none shadow-2xl mx-auto bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>

              
                  {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (

                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
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

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}