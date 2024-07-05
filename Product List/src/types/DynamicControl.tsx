import { useFormContext } from "react-hook-form";
import { DynamicFieldData } from "@/types/dynamic-control-types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";

export const DynamicControl = ({
  type,
  name,
  value,
  label,
  placeholder,
  options = [],
  config = {}
}: DynamicFieldData) => {
  const { register } = useFormContext();

  switch (type) {
    case "text":
      return (
        <Input
          type="text"
          {...register(name, config)}
          value={value}
          placeholder={placeholder}
        />
      );
    case "select": {
      return (
        <Select           
          {...register(name, config)}
          defaultValue={value}
          name={name}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>{label}</SelectLabel>
            {options.map((o, index) => (
              <SelectItem key={index} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    case "number":
      return (
        <Input
          type="number"
          {...register(name, config)}
          value={value}
        />
      );
    default:
      return <Input type="text" />;
  }
};