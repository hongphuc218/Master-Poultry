// src/components/data-table.tsx
import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Product } from './columns';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../components/ui/dialog";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState<Product | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
    globalFilterFn: 'includesString', // This is a predefined filter function
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (newProduct) {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = () => {
    const newProductData: Product = {
      id: data.length + 1,
      barcode: "",
      category_id: "",
      code: "",
      created_at: new Date().toISOString(),
      created_by: "current_user",
      description: "",
      export: false,
      gtin: "",
      label_description: "",
      print_count: 0,
      quantity: 0,
      rspca: false,
      search_description: "",
      supplier_id: "",
      uom: "",
      updated_at: new Date().toISOString(),
      updated_by: "current_user",
    };
    setNewProduct(newProductData);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (newProduct) {
      const updatedData = [...data, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedData));
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="">
      <div className="flex pb-4 justify-between">
        <div>
          {/* Filter Product Search */}
          <Input
            placeholder="Filter Products..."
            className="max-w-xs"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className='flex gap-4'>
          <Button variant='outline' onClick={handleAddProduct}>Add Product</Button>
          {/* Columns Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
      <div>
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

      {/* Add Product Dialog */}
      {newProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle className='text-2xl font-semibold'>Add New Product</DialogTitle>
            <div className="flex flex-col gap-4">
              <Input
                name="barcode"
                placeholder="Barcode" type='number'
                value={newProduct.barcode ?? ''}
                onChange={handleInputChange}
                
              />
              <Input
                name="category_id"
                placeholder="Category ID"
                value={newProduct.category_id ?? ''}
                onChange={handleInputChange}
              />
              <Input
                name="code"
                placeholder="Code" 
                value={newProduct.code ?? ''}
                onChange={handleInputChange}
              />
              <Input
                name="description"
                placeholder="Description"
                value={newProduct.description ?? ''}
                onChange={handleInputChange}
              />
              <Input
                name="gtin"
                placeholder="GTIN" type='number'
                value={newProduct.gtin ?? ''}
                onChange={handleInputChange}
              />
              <Input
                name="label_description"
                placeholder="Label Description"
                value={newProduct.label_description ?? ''}
                onChange={handleInputChange}
              />
              <Input
                name="search_description"
                placeholder="Search Description"
                value={newProduct.search_description ?? ''}
                onChange={handleInputChange}
              />
              <Input
                name="supplier_id"
                placeholder="Supplier ID"
                value={newProduct.supplier_id ?? ''}
                onChange={handleInputChange}
              />
            <div>    
              <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="UOM" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>UOM</SelectLabel>
                  <SelectItem value="apple">CTN</SelectItem>
                  <SelectItem value="banana">BIN</SelectItem>
                  <SelectItem value="blueberry">TUB</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
              <div className='flex flex-row gap-8'>
                <div className='flex flex-row gap-4'>
                  <Label htmlFor="export">Export</Label>
                  <Switch id="export" />
                </div>
                <div className='flex flex-row gap-4'>
                  <Label htmlFor="rspca">RSPCA</Label>
                  <Switch id="rspca" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
