export type Product = {
    barcode?: string | null
    category_id?: string | null
    code?: string | null
    created_at?: string | null
    created_by?: string | null
    description?: string | null
    export?: boolean
    gtin?: string | null
    id?: number
    label_description?: string | null
    print_count?: number | null
    quantity?: number | null
    rspca?: boolean
    search_description?: string | null
    supplier_id?: string | null
    uom?: string | null
    updated_at?: string | null
    updated_by?: string | null
    [key: string]: any; 
  }


interface Field {
  name: string;
  label: string;
  type: string;
  value?: string | number | boolean;
  placeholder?: string;
  options?: FieldOption[];
}

interface FieldOption {
  label: string;
  value: string;
}

interface InputFields {
  [key: string]: Field;
}

export const fields: InputFields = {
  barcode: {
    name: 'barcode',
    type: 'text',
    placeholder: 'Enter your Barcode',
    label: 'Bar Code'
  },
  code: {
    name: 'code',
    type: 'string',
    placeholder: 'Enter your Code',
    label: 'Code'
  },
  description: {
    name: 'description',
    type: 'text',
    placeholder: 'Enter your Description',
    label: 'Description'
  },  
  id: {
    name: 'id',
    type: 'number',
    placeholder: 'Enter your ID',
    label: 'ID'
  },
  supplier_id: {
    name: 'supplier_id',
    type: 'text',
    placeholder: 'Enter your Supplier ID',
    label: 'Suppplier ID'
  },
  gtin: {
    name: 'gtin',
    type: 'text',
    placeholder: 'Enter your GTIN',
    label: 'GTIN'
  },
  category_id: {
    name: 'category_id',
    type: 'text',
    placeholder: 'Enter your Catergory ID',
    label: 'Catergory ID'
  },
  label_description: {
    name: 'label_description',
    type: 'text',
    placeholder: 'Enter your Label Description',
    label: 'Label Description'
  },
  search_description: {
    name: 'search_description',
    type: 'text',
    placeholder: 'Enter your Search Description',
    label: 'Search Description'
  },
  quantity: {
    name: 'quantity',
    type: 'number',
    placeholder: 'Enter your Quantity',
    label: 'Quantity'
  },
  uom: {
    name: 'uom',
    type: 'select',
    options: [
      {
          label: 'CTN',
          value: 'ctn'
      },
      {
          label: 'BIN',
          value: 'bin'
      },
    ],
    placeholder: 'Select your UOM',
    label: 'UOM'
  },
  print_count: {
    name: 'print_count',
    type: 'number',
    placeholder: 'Enter your Print Count',
    label: 'Print Count'
  },
  rspca: {
    name: 'rspca',
    type: 'checkbox',
    placeholder: '',
    label: 'RSPCA'
  },
  export: {
    name: 'export',
    type: 'checkbox',
    placeholder: '',
    label: 'Export'
  },
}