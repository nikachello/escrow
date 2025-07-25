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
import { Control, FieldValues, Path } from "react-hook-form";

interface Option {
  id: string | number;
  name_ka: string;
  name_en?: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  options: Option[];
  control: Control<T>;
  onChange?: (value: string) => void; // external onChange callback (optional)
  disabled?: boolean;
}

const SelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  onChange,
  disabled,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              field.onBlur();
              if (onChange) onChange(value); // call external onChange if provided
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  {option.name_ka}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
