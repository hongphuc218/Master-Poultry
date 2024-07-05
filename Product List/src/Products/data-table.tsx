import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { useState } from "react"

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Search } from "lucide-react"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import ProductData from "./forms/product-data-form"
import { DynamicForm } from "./forms/DynamicForm"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isInputOpen, setInputOpen] = useState(false)
  const [isDataOpen, setDataOpen] = useState(false)
  const [productId, setProductId] = useState(Number);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    }
  })

  return (
    <div className="w-11/12 flex flex-col gap-6 py-5">
      <div className="">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Product List</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      </div>
      <h2 className="font-bold text-2xl">Product List</h2>
      <div className="w-full flex justify-between">
        <div className="relative">
          {/* Filter Product Search */}
          <Input
            placeholder="Filter Products..."
            className="w-80 hover:bg-accent"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Search className="absolute right-2 top-2"/>
        </div>
        <div className="flex gap-2">
        <Button onClick={() => setInputOpen(true)} variant='outline' className="bg-sky-500 hover:bg-sky-600">Add Product</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody  className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
            <TableRow onClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
              const target = e.target as HTMLElement;
              if (target.dataset.rowClickable) {
                setDataOpen(true);
                setProductId(Number(row.id))
              }
            }} className="" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell data-row-clickable="true" className="pl-8" key={cell.id}>
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
      <div className="flex items-center justify-end space-x-2">
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
      <ResponsiveDialog isOpen={isInputOpen} setIsOpen={setInputOpen} title="Add Product" description="Add your product here">
          <DynamicForm productId={null}/>
      </ResponsiveDialog>
      <ResponsiveDialog isOpen={isDataOpen} setIsOpen={setDataOpen} title="Product Details" description="Your product details">
        <ProductData productId={productId} setIsOpen={setDataOpen}/>
      </ResponsiveDialog>
    </div>
  )
}
