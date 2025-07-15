// components/ItemForm.tsx
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/aceternity/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputField from "@/components/primary/forms/InputField";
import SelectField from "@/components/primary/forms/SelectField";
import { Category, ItemType } from "@/lib/types/create-deal";

interface ItemFormProps {
  form: UseFormReturn<ItemType>;
  currencySymbol: string;
  onAddItem: () => void;
  categories: Category[];
}

const ItemForm: React.FC<ItemFormProps> = ({
  form,
  currencySymbol,
  onAddItem,
  categories,
}) => {
  return (
    <Form {...form}>
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-heading font-semibold">
          ახალი ნივთის დამატება
        </h3>

        <SelectField
          name="itemCategory"
          control={form.control}
          options={categories}
          placeholder="აირჩიეთ კატეგორია"
          label="კატეგორია"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            control={form.control}
            name="itemName"
            label="ნივთის დასახელება"
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ფასი {currencySymbol}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="itemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>დამატებითი დეტალები</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="მოგვიყევით ნივთისა და გარიგების შესახებ"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="button" onClick={onAddItem}>
            ნივთის დამატება
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ItemForm;
