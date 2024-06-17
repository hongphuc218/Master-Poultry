import { Product, columns} from "./columns"
import { DataTable } from "./data-table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function getData(): Promise<Product>[] {
  return [
    {
        id: 1,
        barcode: "1234567890123",
        category_id: "cat123",
        code: "aPROD001",
        created_at: new Date().toISOString(),
        created_by: "user123",
        description: "First product",
        export: false,
        gtin: "1234567890123",
        label_description: "Product 1 Label",
        print_count: 10,
        quantity: 100,
        rspca: true,
        search_description: "first product",
        supplier_id: "supp123",
        uom: "pcs",
        updated_at: new Date().toISOString(),
        updated_by: "user123",
    },
    {
        id: 2,
        barcode: "9876543210987",
        category_id: "cat456",
        code: "BFN",
        created_at: new Date().toISOString(),
        created_by: "user456",
        description: "Second product",
        export: true,
        gtin: "9876543210987",
        label_description: "Product 2 Label",
        print_count: 20,
        quantity: 200,
        rspca: false,
        search_description: "second product",
        supplier_id: "supp456",
        uom: "box",
        updated_at: new Date().toISOString(),
        updated_by: "user456",
    },
    {
        id: 3,
        barcode: "9876543210987",
        category_id: "cat456",
        code: "BFO",
        created_at: new Date().toISOString(),
        created_by: "user456",
        description: "Second product",
        export: true,
        gtin: "9876543210987",
        label_description: "Product 3 Label",
        print_count: 20,
        quantity: 200,
        rspca: false,
        search_description: "third product",
        supplier_id: "supp456",
        uom: "box",
        updated_at: new Date().toISOString(),
        updated_by: "user456",
    }
  ];
  }

export default function ProductPage() {
    const data = getData()
    return (
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className='text-4xl font-bold'>
            Products
          </CardTitle>
        </CardHeader>
        <CardContent className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

    )
  }