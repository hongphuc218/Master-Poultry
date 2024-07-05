import { Product } from "@/types/Types";

export async function getData(): Promise<Product[]> {
  return new Array(50).fill(null).map((_, index) => ({
    barcode: `barcode-${index}`,
    category_id: `category-${index}`,
    code: `code-${index}`,
    created_at: new Date().toISOString(),
    created_by: `creator-${index}`,
    description: `description-${index}`,
    export: Math.random() >= 0.5,
    gtin: `gtin-${index}`,
    id: index,
    label_description: `label-${index}`,
    print_count: Math.floor(Math.random() * 100),
    quantity: Math.floor(Math.random() * 1000),
    rspca: Math.random() >= 0.5,
    search_description: `search-description-${index}`,
    supplier_id: `supplier-${index}`,
    uom: `uom-${index}`,
    updated_at: new Date().toISOString(),
    updated_by: `updater-${index}`,
  }));
}


