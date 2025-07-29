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
import TooltipCustom from "../ToolTipCustom";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  disabled?: boolean;
  tooltip?: string;
  type?: string;
}

const InputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  disabled,
  tooltip,
  type = "text",
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            <div className="flex items-center gap-1">
              {label}
              {tooltip && <TooltipCustom ButtonText="?" content={tooltip} />}
            </div>
          </FormLabel>

          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
