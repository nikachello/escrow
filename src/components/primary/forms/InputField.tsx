import { Input } from "@/components/ui/aceternity/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  control: Control<T>;
}

const InputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input type="text" placeholder={placeholder} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
