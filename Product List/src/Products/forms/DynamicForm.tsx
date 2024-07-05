import React, { useEffect, useState } from 'react';
import { fields, Product } from '@/types/Types';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { SelectGroup } from '@radix-ui/react-select';
import { getData } from '../product-data';

interface DynamicFormProps {
  productId: number | null;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const product = await data.find(p => p.id === productId);
      setProduct(product || null);
    };

    fetchData();
  }, [productId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(`${event.target.name}: ${event.target.value}`);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setProduct(prevValues => ({
      ...prevValues,
      [name]: checked
    }));
  };

  const handleSelect = (value: string) => {
    setProduct(prevValues => ({
      ...prevValues,
      uom: value
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

  };

  return (
    <Form>
      <form action="" className="flex flex-wrap -mx-3 relative">
        {Object.entries(fields).map(([key, { name, type, placeholder, label, options }]) => (
        <div key={key} className="w-full md:w-1/2 px-3 mb-6">
          {type === 'select' ? (
            <>
            <Label htmlFor={name}>{label}</Label>
            <Select name={name} defaultValue={product ? product[name] : ''} onValueChange={handleSelect}>
              <SelectTrigger >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup >
                    {options?.map(option => (
                    <SelectItem className='hover:bg-muted' key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>

            </Select>
            </>

          ) : type === 'checkbox' ? (
            <div className="flex items-center">
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={product ? product[name] : false} 
                  onChange={handleCheckbox}
                  className="hidden peer"
                />
                <label htmlFor={name} className="select-none cursor-pointer flex items-center justify-center rounded-lg border-2 border-gray-200
                  py-2 px-4 font-bold  transition-colors duration-200 ease-in-out peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-gray-200 hover:bg-slate-700">
                    <span>{label}</span>
              </label>
          </div>
          ) : (
            <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
            type={type}
            name={name}
            id={name}
            defaultValue={product ? product[name as keyof Product] as string : ''}
            placeholder={placeholder}
            onChange={handleChange}
            />
          </div>
          )}
        </div>
      ))}
      <div className='w-full flex justify-end pr-4'>
      <Button onClick={handleSubmit} className='' type="submit">Save</Button>
      </div>
      </form>

    </Form>
  );
};

