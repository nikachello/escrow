import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Option {
  id: string | number;
  name_ka: string;
  name_en?: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
  control: any;
}

const SelectField = ({
  name,
  label,
  placeholder,
  options,
  control,
}: SelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="w-full">{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              field.onBlur();
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => {
                return (
                  <SelectItem key={option.id} value={String(option.id)}>
                    {option.name_ka}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
