import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Copy, Pencil, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export type Product = {
  id: number;
  barcode: string | null;
  category_id: string | null;
  code: string | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  export: boolean;
  gtin: string | null;
  label_description: string | null;
  print_count: number | null;
  quantity: number | null;
  rspca: boolean;
  search_description: string | null;
  supplier_id: string | null;
  uom: string | null;
  updated_at: string | null;
  updated_by: string | null;
};


export const columns: ColumnDef<Product>[] = [
  { header: 'Supplier ID', accessorKey: 'supplier_id' },
  { header: 'Code', accessorKey: 'code' },
  { header: 'Description', accessorKey: 'description' },
  { header: 'GTIN', accessorKey: 'gtin' },
  { header: 'Quantity', accessorKey: 'quantity' },
  { header: 'UOM', accessorKey: 'uom' },
  {
      header: 'Actions',
      cell: ({ row }) => {
          const product = row.original;
          const product_code = product.code;
          const [isDialogOpen, setIsDialogOpen] = useState(false);
          const [modifiedProduct, setModifiedProduct] = useState<Product | null>(null);
    
          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (modifiedProduct) {
              setModifiedProduct({ ...modifiedProduct, [name]: value });
            }
          };
    
          const handleSave = () => {
            if (modifiedProduct) {
              const updatedProduct = {
                ...modifiedProduct,
                updated_at: new Date().toISOString(),
                updated_by: 'current_user', // Replace with actual current user
              };
              // Logic to update the product in the product list
              setIsDialogOpen(false);
            }
          };
    
          const handleModify = (product: Product) => {
            setModifiedProduct(product);
            setIsDialogOpen(true);
          };
          return (
            <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-8 w-8 p-0">
                          <span className="sr-only">Actions</span>
                          <MoreHorizontal className="h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem
                          onClick={() => {
                              if (product_code) {
                                  navigator.clipboard.writeText(product_code);
                              } else {
                                  console.warn("Product code is null or undefined");
                              }
                          }}
                      >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleModify(product)}>
                          <Pencil className="mr-2 h-4 w-4"/>
                          Modify
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              {modifiedProduct && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="">
                    <DialogTitle>Modify Product</DialogTitle>
                    <div className="space-y-4">
                      <Input
                        name="code"
                        placeholder="Code"
                        value={modifiedProduct.code ?? ''}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="description"
                        placeholder="Description"
                        value={modifiedProduct.description ?? ''}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={modifiedProduct.quantity ?? 0}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="gtin"
                        placeholder="GTIN" type='number'
                        value={modifiedProduct.gtin ?? ''}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="label_description"
                        placeholder="Label Description"
                        value={modifiedProduct.label_description ?? ''}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="search_description"
                        placeholder="Search Description"
                        value={modifiedProduct.search_description ?? ''}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="supplier_id"
                        placeholder="Supplier ID"
                        value={modifiedProduct.supplier_id ?? ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <DialogFooter className="">
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

              )
        },
      },
]