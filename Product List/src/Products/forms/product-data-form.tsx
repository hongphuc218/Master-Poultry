import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getData } from '@/Products/product-data';
import { Product } from '@/types/Types';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { CircleCheck, CircleX, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormProps {
  productId: number | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductData: React.FC<FormProps> = ({ productId, setIsOpen }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const product = data.find(p => p.id === productId);
      setProduct(product || null);
    };

    fetchData();
  }, [productId]);

  console.log(product)


  return (
    <div className=''>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-xl font-bold text-gray-600'>{product?.code}</div>
          <div className='text-2xl font-bold'>{product?.description}</div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-center gap-1 right-0'>
            <Label className='text-md'>RSPCA</Label>
            <div>{product?.rspca ? <CircleCheck className='text-green-500' /> : <CircleX className='text-red-600'/>}</div>
          </div>
          <div className='flex flex-row items-center gap-1 right-0'>
            <Label className='text-md'>Export</Label>
            <div>{product?.export ? <CircleCheck className='text-green-500' /> : <CircleX className='text-red-600'/>}</div>
          </div>
        </div> 

      </div>
      <Separator className="my-2"/>

      <div className='flex flex-col gap-2 mt-10'>
        <div className='flex flex-row gap-2 justify-between'>          
          <Label className=' flex items-center text-gray-500'>Supplier ID:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.supplier_id}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Barcode:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.barcode}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >ID:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.id}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Quantity:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.quantity}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >UOM:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.uom}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Print Count:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.print_count}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >GTIN:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.gtin}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Category ID:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.category_id}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Label Description:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.label_description}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Search Description:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.search_description}</div>
        </div>
        <Separator className="my-1"/>
        <div className='flex flex-row gap-2 justify-between'>
          <Label className='flex items-center text-gray-500' >Category ID:</Label>
          <div className='w-1/2 text-left font-semibold'>{product?.category_id}</div>
        </div>
      </div>
      <div className='flex gap-2 justify-end mt-4'>
        <Button className='bg-red-600 text-white hover:bg-red-700'>Delete</Button>
        <Button className=''>Modify</Button>
      </div>
    </div>
  );
};

export default ProductData;
