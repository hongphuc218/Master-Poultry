import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Product } from "@/types/Types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown,MoreHorizontal, Pen, Trash2 } from "lucide-react"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { useState } from "react"
import DeleteForm from "./forms/delete-form"
import { DynamicForm } from "./forms/DynamicForm"
import { fields } from "./forms/dynamic-form-data"

export const columns: ColumnDef<Product>[] = [
  {accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button className="border-0"
          variant='outline'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
    },
  {accessorKey: "supplier_id",
    header: ({ column }) => {
      return (
        <Button className="border-0"
          variant='outline'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
    },
  {accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button className="border-0"
          variant='outline'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button className="border-0"
          variant='outline'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {accessorKey: "uom",
    header: ({ column }) => {
      return (
        <Button className="border-0"
          variant='outline'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UOM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
    },
  {id:'actions', cell: ({row}) => {
    const productId = row.original.id
    const [isModifyOpen, setModifyOpen] = useState(false)
    const [isDeleteOpen, setDeleteOpen] = useState(false)
    return (
      <>
      <ResponsiveDialog isOpen={isModifyOpen} setIsOpen={setModifyOpen} title="Modify Product" description="Modify your product">
        <DynamicForm productId={productId} setIsOpen={setModifyOpen}/>
      </ResponsiveDialog>
      <ResponsiveDialog isOpen={isDeleteOpen} setIsOpen={setDeleteOpen} title="Delete Product" description="Are you sure you want to delete this product?">
        <DeleteForm productId={productId} setIsOpen={setDeleteOpen}/>
      </ResponsiveDialog>
      <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button onClick={(e) => {e.stopPropagation()}} variant="outline" className="bg-transparent h-8 w-8 p-0 outline-none border-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation()
          setModifyOpen(true)}
          }><Pen className="h-4 w-4 mr-2"/>Modify</DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation()
          setDeleteOpen(true)}} className="text-red-600 focus:bg-red-600"><Trash2 className="h-4 w-4 mr-2"/>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </>

    )
  }}
]
