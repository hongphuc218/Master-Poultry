import React, { useEffect, useState } from 'react';
import { fields, Product } from '@/types/Types';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
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
  const [formState, setFormState] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      const foundProduct = data.find(p => p.id === productId);
      if (foundProduct) {
        setFormState(foundProduct); // Initialize form values with the found product
        setProduct(foundProduct);
      }
    }

    if (productId !== null) {
      fetchData();
    } else {
      setFormState({}); // Reset form values for new product entry
    }
  }, [productId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const newValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    setFormState(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form State:', formState);
  };

  return (
    <Form>
      <form action="" className="flex flex-wrap -mx-3 relative">
        {Object.entries(fields).map(([key, { name, type, placeholder, label, options }]) => (
        <div key={key} className="w-full md:w-1/2 px-3 mb-6">
          {type === 'select' ? (
            <>
            <Label htmlFor={name}>{label}</Label>
            <Select name={name}>
              <SelectTrigger >{placeholder}</SelectTrigger>
              <SelectContent >
              <SelectGroup >
                  <SelectLabel>{label}</SelectLabel>
                  {options?.map(option => (
                  <SelectItem className='hover:bg-muted' key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
              </SelectGroup>
              </SelectContent>

            </Select>
            </>

          ) : type === 'checkbox' ? (
            <div className="flex items-center">
                <input type="checkbox" id={name}  onChange={handleChange} className="hidden peer" />
                <label htmlFor={name} className="select-none cursor-pointer flex items-center justify-center rounded-lg border-2 border-gray-200
                  py-2 px-4 font-bold  transition-colors duration-200 ease-in-out peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-gray-200 hover:bg-slate-700">
                    <span>{label}</span>
              </label>
          </div>
          ) : type === 'number' ? (
            <div>
              <Label htmlFor={name}>{label}</Label>
              <Input
              type="number"
              name={name}
              id={name}
              placeholder={placeholder}
              value={formState[name] || ''}
              onChange={handleChange}
              className="input-number-style" // Apply specific styles for number input
            />
            </div>
          ) : (
            <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={formState[name] || ''}
            onChange={handleChange}
            />
          </div>
          )}
        </div>
      ))}
      <div className='w-full flex justify-end pr-4'>
      <Button className='' type="submit">Save</Button>
      </div>
      </form>

    </Form>
  );
};


